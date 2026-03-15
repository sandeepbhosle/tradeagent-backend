"""
TradeAgent Alert Notifier
=========================
Sends trading signals via:
  - Telegram Bot API  (free, instant, markdown formatting)
  - WhatsApp Cloud API via Meta (official, requires approved template)
  - WhatsApp via Twilio (easiest for testing)
  - Email fallback via SendGrid

Each user chooses their preferred channel in their profile.
Alerts fire when:
  1. Claude generates a BUY/SELL signal above confidence threshold
  2. A stop-loss is triggered
  3. Target is hit / position closed
  4. Daily P&L summary (9:15 PM IST)
  5. Market-hours start reminder (9:10 AM IST)
"""

import asyncio
import logging
import os
from datetime import datetime
from typing import Optional
import httpx

logger = logging.getLogger("tradeagent.alerts")


# ─────────────────────────────────────────────
# Message templates
# ─────────────────────────────────────────────

def format_signal_telegram(signal: dict, user_name: str = "Trader") -> str:
    action = signal.get("action", "HOLD")
    symbol = signal.get("symbol", "—")
    entry  = signal.get("entry", 0)
    target = signal.get("target", 0)
    sl     = signal.get("sl", 0)
    qty    = signal.get("qty", 0)
    conf   = signal.get("confidence", 0)
    reason = signal.get("reasoning", "")
    mode   = signal.get("mode", "paper").upper()
    now    = datetime.now().strftime("%H:%M:%S IST")

    emoji = {"BUY": "🟢", "SELL": "🔴", "HOLD": "🟡"}.get(action, "⚪")
    rr = "—"
    try:
        risk   = abs(entry - sl)
        reward = abs(target - entry)
        if risk > 0:
            rr = f"1:{reward/risk:.1f}"
    except Exception:
        pass

    return f"""{emoji} *TradeAgent Signal* [{mode}]
━━━━━━━━━━━━━━━━━━━━
*{action}* `{symbol}`
⏰ {now}

📌 Entry:      ₹`{entry:,.2f}`
🎯 Target:     ₹`{target:,.2f}`
🛑 Stop-Loss:  ₹`{sl:,.2f}`
📦 Qty:        `{qty}` shares
⚖️ Risk/Reward: `{rr}`
🧠 Confidence: `{conf}%`

💬 _{reason[:200]}_

[TradeAgent](https://tradeagent.app) · _Not SEBI advice_"""


def format_signal_whatsapp(signal: dict) -> str:
    """Plain text for WhatsApp (no markdown)."""
    action = signal.get("action", "HOLD")
    symbol = signal.get("symbol", "—")
    entry  = signal.get("entry", 0)
    target = signal.get("target", 0)
    sl     = signal.get("sl", 0)
    conf   = signal.get("confidence", 0)
    now    = datetime.now().strftime("%H:%M IST")
    mode   = signal.get("mode", "paper").upper()

    return (
        f"TradeAgent Signal [{mode}]\n"
        f"{action} {symbol} @ Rs.{entry:,.2f}\n"
        f"Target: Rs.{target:,.2f} | SL: Rs.{sl:,.2f}\n"
        f"Confidence: {conf}% | Time: {now}\n"
        f"tradeagent.app | Not SEBI advice"
    )


def format_pnl_telegram(pnl: float, trades: int, win_rate: float) -> str:
    sign  = "+" if pnl >= 0 else ""
    emoji = "🟢" if pnl >= 0 else "🔴"
    return f"""{emoji} *Daily P&L Summary*
━━━━━━━━━━━━━━━━━━━━
Net P&L:    `{sign}₹{pnl:,.2f}`
Trades:     `{trades}`
Win rate:   `{win_rate:.0f}%`
Date:       `{datetime.now().strftime('%d %b %Y')}`

_TradeAgent · Not SEBI advice_"""


def format_squareoff_telegram(positions_closed: int, pnl: float) -> str:
    return (f"⏹ *Auto Square-Off Complete*\n"
            f"Positions closed: `{positions_closed}`\n"
            f"Session P&L: `₹{pnl:+,.2f}`\n"
            f"_All intraday positions closed at 15:10 IST_")


# ─────────────────────────────────────────────
# Telegram
# ─────────────────────────────────────────────

class TelegramNotifier:
    """
    Setup:
    1. Message @BotFather on Telegram → /newbot → get BOT_TOKEN
    2. User starts your bot and sends /start
    3. Fetch their chat_id: GET https://api.telegram.org/bot{TOKEN}/getUpdates
    4. Store chat_id in user profile
    """

    BASE = "https://api.telegram.org/bot{token}"

    def __init__(self, bot_token: str):
        self.token = bot_token
        self.base  = f"https://api.telegram.org/bot{bot_token}"

    async def send_message(self, chat_id: str, text: str,
                            parse_mode: str = "Markdown") -> bool:
        url = f"{self.base}/sendMessage"
        payload = {
            "chat_id":    chat_id,
            "text":       text,
            "parse_mode": parse_mode,
            "disable_web_page_preview": True,
        }
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    logger.info(f"Telegram sent to {chat_id}")
                    return True
                else:
                    logger.warning(f"Telegram error {resp.status_code}: {resp.text[:200]}")
                    return False
        except Exception as e:
            logger.error(f"Telegram send failed: {e}")
            return False

    async def send_signal(self, chat_id: str, signal: dict) -> bool:
        text = format_signal_telegram(signal)
        return await self.send_message(chat_id, text)

    async def send_pnl_summary(self, chat_id: str, pnl: float,
                                trades: int, win_rate: float) -> bool:
        text = format_pnl_telegram(pnl, trades, win_rate)
        return await self.send_message(chat_id, text)

    async def get_chat_id(self, update_offset: int = 0) -> list[dict]:
        """Poll for new messages — use once during user setup to get chat_id."""
        url = f"{self.base}/getUpdates?offset={update_offset}"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(url)
            updates = resp.json().get("result", [])
        return [
            {
                "chat_id":  u["message"]["chat"]["id"],
                "username": u["message"]["from"].get("username", ""),
                "text":     u["message"].get("text", ""),
            }
            for u in updates if "message" in u
        ]

    async def set_webhook(self, webhook_url: str) -> bool:
        """
        Set webhook so Telegram POSTs to your server instead of polling.
        webhook_url example: https://api.tradeagent.app/api/telegram/webhook
        """
        url = f"{self.base}/setWebhook"
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json={"url": webhook_url})
            return resp.status_code == 200


# ─────────────────────────────────────────────
# WhatsApp — Meta Cloud API (official)
# ─────────────────────────────────────────────

class WhatsAppMetaNotifier:
    """
    Meta WhatsApp Cloud API.

    Setup:
    1. Create Facebook Developer account → New App → WhatsApp product
    2. Get Phone Number ID + permanent access token from Meta dashboard
    3. Create a message template (name: 'trade_signal') — must be approved by Meta
       Template body example:
         "{{1}} {{2}} @ ₹{{3}} | Target ₹{{4}} | SL ₹{{5}} | Confidence {{6}}%"
    4. Once template approved, use send_template() below
    5. For free-form text, user must message you first (24-hr window)

    Note: Template approval takes 24–72 hours. Use Twilio below for faster testing.
    """

    BASE = "https://graph.facebook.com/v19.0"

    def __init__(self, phone_number_id: str, access_token: str):
        self.phone_id = phone_number_id
        self.token    = access_token

    async def send_template(self, to_number: str, signal: dict) -> bool:
        """
        Send approved WhatsApp template message.
        'to_number' format: '919876543210' (country code + number, no +)
        """
        url = f"{self.BASE}/{self.phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type":  "application/json",
        }
        action = signal.get("action", "HOLD")
        payload = {
            "messaging_product": "whatsapp",
            "to":                to_number,
            "type":              "template",
            "template": {
                "name":     "trade_signal",      # your approved template name
                "language": {"code": "en"},
                "components": [{
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": action},
                        {"type": "text", "text": signal.get("symbol", "")},
                        {"type": "text", "text": str(signal.get("entry", 0))},
                        {"type": "text", "text": str(signal.get("target", 0))},
                        {"type": "text", "text": str(signal.get("sl", 0))},
                        {"type": "text", "text": str(signal.get("confidence", 0))},
                    ],
                }],
            },
        }
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(url, headers=headers, json=payload)
                if resp.status_code == 200:
                    logger.info(f"WhatsApp Meta sent to {to_number}")
                    return True
                logger.warning(f"WhatsApp Meta error: {resp.text[:300]}")
                return False
        except Exception as e:
            logger.error(f"WhatsApp Meta send failed: {e}")
            return False

    async def send_text(self, to_number: str, text: str) -> bool:
        """Free-form text — only works within 24-hr customer-initiated window."""
        url = f"{self.BASE}/{self.phone_id}/messages"
        headers = {"Authorization": f"Bearer {self.token}", "Content-Type": "application/json"}
        payload = {
            "messaging_product": "whatsapp",
            "to":   to_number,
            "type": "text",
            "text": {"body": text},
        }
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, headers=headers, json=payload)
            return resp.status_code == 200


# ─────────────────────────────────────────────
# WhatsApp — Twilio (easiest for testing)
# ─────────────────────────────────────────────

class WhatsAppTwilioNotifier:
    """
    Twilio WhatsApp Sandbox — fastest to get running.

    Setup:
    1. Create Twilio account → Console → Messaging → WhatsApp Sandbox
    2. User sends "join <sandbox-keyword>" to +1 415 523 8886
    3. Use account_sid + auth_token below
    4. Upgrade to Twilio production WhatsApp for real customers
       (requires Meta business verification, 1–2 weeks)
    Cost: ~$0.005 per message outbound
    """

    BASE = "https://api.twilio.com/2010-04-01/Accounts"

    def __init__(self, account_sid: str, auth_token: str,
                 from_number: str = "whatsapp:+14155238886"):
        self.sid    = account_sid
        self.token  = auth_token
        self.from_  = from_number

    async def send(self, to_number: str, text: str) -> bool:
        """to_number format: 'whatsapp:+919876543210'"""
        if not to_number.startswith("whatsapp:"):
            to_number = f"whatsapp:{to_number}"
        url = f"{self.BASE}/{self.sid}/Messages.json"
        data = {"From": self.from_, "To": to_number, "Body": text}
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(url, data=data, auth=(self.sid, self.token))
                if resp.status_code in (200, 201):
                    logger.info(f"WhatsApp Twilio sent to {to_number}")
                    return True
                logger.warning(f"Twilio error {resp.status_code}: {resp.text[:200]}")
                return False
        except Exception as e:
            logger.error(f"Twilio send failed: {e}")
            return False

    async def send_signal(self, to_number: str, signal: dict) -> bool:
        text = format_signal_whatsapp(signal)
        return await self.send(to_number, text)


# ─────────────────────────────────────────────
# Unified AlertService — used by AgentWorker
# ─────────────────────────────────────────────

class AlertService:
    """
    Single interface that AgentWorker calls.
    Reads user's alert_channel preference and routes accordingly.
    Falls back gracefully if a channel is not configured.
    """

    def __init__(self, user_config: dict):
        self.config  = user_config
        self.channel = user_config.get("alert_channel", "telegram")  # telegram|whatsapp_meta|whatsapp_twilio|none

        # Telegram
        tg_token = user_config.get("telegram_bot_token") or os.getenv("TELEGRAM_BOT_TOKEN", "")
        self.tg  = TelegramNotifier(tg_token) if tg_token else None
        self.tg_chat_id = user_config.get("telegram_chat_id", "")

        # WhatsApp Meta
        wa_phone_id = user_config.get("wa_phone_number_id") or os.getenv("WA_PHONE_NUMBER_ID", "")
        wa_token    = user_config.get("wa_access_token") or os.getenv("WA_ACCESS_TOKEN", "")
        self.wa_meta = WhatsAppMetaNotifier(wa_phone_id, wa_token) if (wa_phone_id and wa_token) else None
        self.wa_number = user_config.get("whatsapp_number", "")

        # WhatsApp Twilio
        tw_sid   = user_config.get("twilio_sid") or os.getenv("TWILIO_ACCOUNT_SID", "")
        tw_token = user_config.get("twilio_token") or os.getenv("TWILIO_AUTH_TOKEN", "")
        self.wa_twilio = WhatsAppTwilioNotifier(tw_sid, tw_token) if (tw_sid and tw_token) else None

    async def send_signal_alert(self, signal: dict) -> bool:
        if signal.get("action") == "HOLD":
            return True  # Don't alert on HOLD

        if self.channel == "telegram" and self.tg and self.tg_chat_id:
            return await self.tg.send_signal(self.tg_chat_id, signal)

        elif self.channel == "whatsapp_meta" and self.wa_meta and self.wa_number:
            return await self.wa_meta.send_template(self.wa_number, signal)

        elif self.channel == "whatsapp_twilio" and self.wa_twilio and self.wa_number:
            return await self.wa_twilio.send_signal(self.wa_number, signal)

        else:
            logger.info("No alert channel configured — signal not sent")
            return False

    async def send_squareoff_alert(self, positions_closed: int, pnl: float) -> bool:
        text = format_squareoff_telegram(positions_closed, pnl)
        if self.channel == "telegram" and self.tg and self.tg_chat_id:
            return await self.tg.send_message(self.tg_chat_id, text)
        elif self.channel.startswith("whatsapp") and self.wa_twilio and self.wa_number:
            plain = f"Auto Square-Off: {positions_closed} positions closed. P&L: Rs.{pnl:+,.2f}"
            return await self.wa_twilio.send(f"whatsapp:{self.wa_number}", plain)
        return False

    async def send_daily_summary(self, pnl: float, trades: int, win_rate: float) -> bool:
        if self.channel == "telegram" and self.tg and self.tg_chat_id:
            return await self.tg.send_pnl_summary(self.tg_chat_id, pnl, trades, win_rate)
        return False

    async def test_connection(self) -> dict:
        """Send a test message to verify alert setup."""
        test_signal = {
            "action": "BUY", "symbol": "TEST", "entry": 100.0,
            "target": 106.0, "sl": 97.0, "qty": 1, "confidence": 99,
            "reasoning": "This is a test alert from TradeAgent.", "mode": "paper",
        }
        ok = await self.send_signal_alert(test_signal)
        return {"success": ok, "channel": self.channel}


# ─────────────────────────────────────────────
# FastAPI webhook endpoint (Telegram → your server)
# ─────────────────────────────────────────────
# Add to app/api/telegram.py and include in main.py

TELEGRAM_WEBHOOK_ROUTER_CODE = '''
from fastapi import APIRouter, Request
router = APIRouter()

@router.post("/webhook")
async def telegram_webhook(request: Request):
    """
    Telegram posts updates here.
    Used to capture user chat_ids when they /start your bot.
    """
    data = await request.json()
    message = data.get("message", {})
    chat_id = message.get("chat", {}).get("id")
    text    = message.get("text", "")
    user    = message.get("from", {})

    if text.startswith("/start"):
        # Save chat_id to user profile in DB
        # The /start command can include user_id: /start USER_ID_HERE
        parts = text.split()
        platform_user_id = parts[1] if len(parts) > 1 else None
        if platform_user_id and chat_id:
            # await db.save_telegram_chat_id(platform_user_id, str(chat_id))
            # Send confirmation
            tg = TelegramNotifier(os.getenv("TELEGRAM_BOT_TOKEN", ""))
            await tg.send_message(str(chat_id),
                "✅ *TradeAgent alerts activated!*\\n\\n"
                "You will receive trading signals here.\\n"
                "Go back to your dashboard to configure your strategy.",
                parse_mode="Markdown"
            )
    return {"ok": True}
'''
