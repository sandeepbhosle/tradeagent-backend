"""
AgentWorker — the heart of TradeAgent.

One instance runs per active user. It:
1. Opens a Kite Connect WebSocket for live tick data
2. Maintains a rolling OHLCV candle buffer per subscribed symbol
3. Every N minutes (per user's schedule), calls Claude with price + news context
4. Parses the structured JSON signal from Claude's response
5. Enforces risk rules, then places order via Kite REST API (or paper-trades)
6. Streams every step to the user's WebSocket via the hub
"""

import asyncio
import json
import logging
import time
from datetime import datetime, timedelta
from collections import deque
from typing import Optional

import anthropic
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from kiteconnect import KiteTicker, KiteConnect

logger = logging.getLogger("tradeagent.worker")


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

class Candle:
    """Aggregates ticks into OHLCV candles for a given interval."""

    def __init__(self, interval_seconds: int = 300):
        self.interval = interval_seconds
        self.open = self.high = self.low = self.close = self.volume = 0.0
        self.start_time: Optional[float] = None
        self._closed_candles: deque = deque(maxlen=200)

    def tick(self, price: float, volume: int = 0):
        now = time.time()
        if self.start_time is None:
            self.start_time = now
            self.open = self.high = self.low = self.close = price
            self.volume = volume
            return

        elapsed = now - self.start_time
        if elapsed >= self.interval:
            # Close current candle
            self._closed_candles.append({
                "time": datetime.fromtimestamp(self.start_time).isoformat(),
                "open": round(self.open, 2),
                "high": round(self.high, 2),
                "low":  round(self.low, 2),
                "close": round(self.close, 2),
                "volume": int(self.volume),
            })
            # Start new candle
            self.start_time = now
            self.open = self.high = self.low = price
            self.volume = volume
        else:
            self.high = max(self.high, price)
            self.low  = min(self.low,  price)
            self.close = price
            self.volume += volume

    def last_n(self, n: int = 50) -> list:
        return list(self._closed_candles)[-n:]


class RiskGuard:
    """Per-user intraday risk enforcement."""

    def __init__(self, max_capital: float, max_daily_loss: float,
                 max_positions: int, min_rr: float = 1.5):
        self.max_capital = max_capital
        self.max_daily_loss = max_daily_loss
        self.max_positions = max_positions
        self.min_rr = min_rr
        self.daily_loss = 0.0
        self.open_positions = 0

    def can_trade(self) -> tuple[bool, str]:
        now = datetime.now()
        # Block first 15 minutes after open
        if now.hour == 9 and now.minute < 30:
            return False, "No trades in first 15 min after open (9:15–9:30)"
        # Block last 15 minutes before close
        if now.hour == 15 and now.minute >= 10:
            return False, "Too close to market close — auto square-off window"
        if self.daily_loss >= self.max_daily_loss:
            return False, f"Daily loss limit reached: ₹{self.daily_loss:.0f}"
        if self.open_positions >= self.max_positions:
            return False, f"Max open positions reached: {self.open_positions}"
        return True, "ok"

    def validate_signal(self, signal: dict) -> tuple[bool, str]:
        entry = float(signal.get("entry", 0))
        target = float(signal.get("target", 0))
        sl = float(signal.get("sl", 0))
        if entry <= 0 or target <= 0 or sl <= 0:
            return False, "Invalid price levels in signal"
        # Avoid divide-by-zero
        risk = abs(entry - sl)
        reward = abs(target - entry)
        if risk == 0:
            return False, "Stop-loss equals entry — invalid"
        rr = reward / risk
        if rr < self.min_rr:
            return False, f"Risk/reward {rr:.2f} below minimum {self.min_rr}"
        qty = int(signal.get("qty", 0))
        if qty <= 0:
            return False, "Invalid quantity"
        capital_needed = entry * qty
        if capital_needed > self.max_capital:
            return False, f"Capital needed ₹{capital_needed:.0f} exceeds limit ₹{self.max_capital:.0f}"
        return True, "ok"

    def record_pnl(self, pnl: float):
        if pnl < 0:
            self.daily_loss += abs(pnl)

    def reset_daily(self):
        self.daily_loss = 0.0
        self.open_positions = 0


# ---------------------------------------------------------------------------
# Technical indicator helpers (no external TA library needed)
# ---------------------------------------------------------------------------

def ema(prices: list[float], period: int) -> float:
    if len(prices) < period:
        return prices[-1] if prices else 0.0
    k = 2 / (period + 1)
    val = prices[0]
    for p in prices[1:]:
        val = p * k + val * (1 - k)
    return round(val, 2)


def rsi(prices: list[float], period: int = 14) -> float:
    if len(prices) < period + 1:
        return 50.0
    gains, losses = [], []
    for i in range(1, len(prices)):
        d = prices[i] - prices[i - 1]
        gains.append(max(d, 0))
        losses.append(max(-d, 0))
    avg_g = sum(gains[-period:]) / period
    avg_l = sum(losses[-period:]) / period
    if avg_l == 0:
        return 100.0
    rs = avg_g / avg_l
    return round(100 - (100 / (1 + rs)), 1)


def vwap(candles: list[dict]) -> float:
    total_tv, total_v = 0.0, 0
    for c in candles:
        tp = (c["high"] + c["low"] + c["close"]) / 3
        total_tv += tp * c["volume"]
        total_v += c["volume"]
    return round(total_tv / total_v, 2) if total_v else 0.0


# ---------------------------------------------------------------------------
# Claude reasoning call
# ---------------------------------------------------------------------------

async def call_claude(
    anthropic_key: str,
    model: str,
    system_prompt: str,
    symbol: str,
    candles: list,
    indicators: dict,
    news_context: str,
    capital: float,
) -> dict:
    """
    Send structured market data to Claude. Returns parsed signal dict.
    """
    client = anthropic.AsyncAnthropic(api_key=anthropic_key)

    user_content = f"""Symbol: {symbol}
Current time (IST): {datetime.now().strftime('%H:%M:%S')}
Last price: {candles[-1]['close'] if candles else 'N/A'}

Technical indicators:
  EMA 9:   {indicators.get('ema9', 'N/A')}
  EMA 21:  {indicators.get('ema21', 'N/A')}
  VWAP:    {indicators.get('vwap', 'N/A')}
  RSI(14): {indicators.get('rsi', 'N/A')}

Last 10 candles (OHLCV, 5-min):
{json.dumps(candles[-10:], indent=2)}

Market context / news:
{news_context}

Available capital: ₹{capital:,.0f}

Provide your analysis and decision. End with valid JSON:
{{"action":"BUY|SELL|HOLD","entry":0.0,"target":0.0,"sl":0.0,"qty":1,"confidence":0,"reasoning":"brief summary"}}"""

    message = await client.messages.create(
        model=model,
        max_tokens=800,
        system=system_prompt,
        messages=[{"role": "user", "content": user_content}],
    )

    raw = message.content[0].text
    # Extract JSON block from Claude's response
    import re
    json_match = re.search(r'\{[^{}]*"action"[^{}]*\}', raw, re.DOTALL)
    if json_match:
        try:
            signal = json.loads(json_match.group())
            signal["raw_reasoning"] = raw
            return signal
        except json.JSONDecodeError:
            pass

    # Fallback: best-effort parse
    action = re.search(r'\b(BUY|SELL|HOLD)\b', raw)
    return {
        "action": action.group(1) if action else "HOLD",
        "entry": candles[-1]["close"] if candles else 0,
        "target": 0, "sl": 0, "qty": 0, "confidence": 40,
        "reasoning": raw[:300],
        "raw_reasoning": raw,
    }


# ---------------------------------------------------------------------------
# Main AgentWorker class
# ---------------------------------------------------------------------------

class AgentWorker:
    """
    Runs one per active user. Manages their Kite WebSocket connection,
    candle aggregation, scheduled Claude calls, and order placement.
    """

    def __init__(self, user_id: str, config: dict, ws_hub=None):
        self.user_id = user_id
        self.config = config          # decrypted user config from DB
        self.ws_hub = ws_hub
        self.scheduler = AsyncIOScheduler()
        self.candles: dict[str, Candle] = {}  # symbol → Candle
        self.last_signal: Optional[dict] = None
        self.running = False
        self.ticker: Optional[KiteTicker] = None
        self.kite: Optional[KiteConnect] = None
        self.risk = RiskGuard(
            max_capital=config.get("max_capital", 25000),
            max_daily_loss=config.get("max_daily_loss", 5000),
            max_positions=config.get("max_positions", 3),
        )

    # --- Streaming helpers ---

    async def emit(self, event: str, data: dict):
        """Push update to user's WebSocket."""
        if self.ws_hub:
            await self.ws_hub.send(self.user_id, {"event": event, "data": data})

    async def emit_step(self, step_type: str, label: str, text: str):
        await self.emit("reasoning_step", {
            "type": step_type, "label": label, "text": text,
            "ts": datetime.now().isoformat(),
        })

    # --- Kite WebSocket setup ---

    def _init_kite(self):
        api_key   = self.config["kite_api_key"]
        token     = self.config["kite_access_token"]
        self.kite = KiteConnect(api_key=api_key)
        self.kite.set_access_token(token)
        self.ticker = KiteTicker(api_key, token)

        symbols = self.config.get("watchlist", ["NSE:NIFTY 50"])
        # Resolve instrument tokens
        try:
            instruments = self.kite.instruments("NSE")
            token_map = {
                f"NSE:{i['tradingsymbol']}": i["instrument_token"]
                for i in instruments
            }
            instrument_tokens = [
                token_map[s] for s in symbols if s in token_map
            ]
        except Exception as e:
            logger.warning(f"[{self.user_id}] Could not fetch instruments: {e}")
            instrument_tokens = []

        def on_ticks(ws, ticks):
            for tick in ticks:
                sym = tick.get("tradingsymbol", str(tick["instrument_token"]))
                price = tick.get("last_price", 0)
                vol   = tick.get("volume_traded", 0)
                if sym not in self.candles:
                    interval = self.config.get("candle_interval_seconds", 300)
                    self.candles[sym] = Candle(interval)
                self.candles[sym].tick(price, vol)
                # Fire-and-forget emit to WS
                asyncio.run_coroutine_threadsafe(
                    self.emit("tick", {"symbol": sym, "price": price, "volume": vol}),
                    asyncio.get_event_loop(),
                )

        def on_connect(ws, response):
            logger.info(f"[{self.user_id}] Kite ticker connected")
            ws.subscribe(instrument_tokens)
            ws.set_mode(ws.MODE_FULL, instrument_tokens)

        def on_error(ws, code, reason):
            logger.error(f"[{self.user_id}] Kite ticker error {code}: {reason}")

        def on_close(ws, code, reason):
            logger.info(f"[{self.user_id}] Kite ticker closed: {reason}")

        self.ticker.on_ticks     = on_ticks
        self.ticker.on_connect   = on_connect
        self.ticker.on_error     = on_error
        self.ticker.on_close     = on_close

    # --- Scheduled analysis ---

    async def run_analysis(self, symbol: str = None):
        """
        Main analysis cycle — called by APScheduler every N minutes.
        Builds context, calls Claude, validates signal, places order.
        """
        if not self.running:
            return

        symbol = symbol or self.config.get("primary_symbol", "NIFTY 50")
        logger.info(f"[{self.user_id}] Starting analysis for {symbol}")

        await self.emit_step("think", "INIT", f"Starting analysis for {symbol}")

        # 1. Check risk gate
        can_trade, reason = self.risk.can_trade()
        if not can_trade:
            await self.emit_step("warn", "RISK", f"Trade blocked: {reason}")
            return

        # 2. Build candle data
        candle_obj = self.candles.get(symbol)
        if candle_obj:
            candle_data = candle_obj.last_n(50)
        else:
            # No live data yet — use Kite historical API as fallback
            candle_data = await self._fetch_historical(symbol)

        if not candle_data:
            await self.emit_step("warn", "DATA", "No candle data available. Skipping.")
            return

        # 3. Compute indicators
        closes = [c["close"] for c in candle_data]
        indicators = {
            "ema9":  ema(closes, 9),
            "ema21": ema(closes, 21),
            "vwap":  vwap(candle_data),
            "rsi":   rsi(closes),
        }
        await self.emit_step("data", "INDICATORS",
            f"EMA9={indicators['ema9']} EMA21={indicators['ema21']} "
            f"VWAP={indicators['vwap']} RSI={indicators['rsi']}")

        # 4. Fetch news context (optional — NewsAPI)
        news_text = await self._fetch_news(symbol)
        await self.emit_step("data", "NEWS", news_text[:200] + "...")

        # 5. Call Claude
        await self.emit_step("think", "CLAUDE",
            f"Sending to {self.config.get('claude_model', 'claude-sonnet-4-20250514')}...")

        try:
            signal = await call_claude(
                anthropic_key=self.config["anthropic_key"],
                model=self.config.get("claude_model", "claude-sonnet-4-20250514"),
                system_prompt=self.config.get("system_prompt", DEFAULT_SYSTEM_PROMPT),
                symbol=symbol,
                candles=candle_data,
                indicators=indicators,
                news_context=news_text,
                capital=self.config.get("max_capital", 25000),
            )
        except Exception as e:
            await self.emit_step("warn", "ERROR", f"Claude API error: {e}")
            logger.error(f"[{self.user_id}] Claude call failed: {e}")
            return

        signal["symbol"] = symbol
        self.last_signal = signal

        await self.emit_step("decide", "SIGNAL",
            f"{signal['action']} @ ₹{signal['entry']} | "
            f"T: ₹{signal['target']} | SL: ₹{signal['sl']} | "
            f"Confidence: {signal['confidence']}%")

        await self.emit("signal", signal)

        # 6. Check confidence threshold
        min_conf = self.config.get("min_confidence", 75)
        if signal["confidence"] < min_conf:
            await self.emit_step("warn", "FILTER",
                f"Confidence {signal['confidence']}% < threshold {min_conf}%. Skipped.")
            return

        # 7. Validate risk/reward
        valid, reason = self.risk.validate_signal(signal)
        if not valid:
            await self.emit_step("warn", "RISK", f"Signal rejected: {reason}")
            return

        # 8. Place order (or paper trade)
        await self._execute_signal(signal)

    async def _execute_signal(self, signal: dict):
        mode = self.config.get("trade_mode", "paper")
        action = signal["action"]

        if action == "HOLD":
            await self.emit_step("exec", "HOLD", "No trade — holding current position.")
            return

        approval_mode = self.config.get("approval_mode", "always")

        if approval_mode == "always":
            # Push to frontend for human approval — don't place yet
            await self.emit("awaiting_approval", signal)
            await self.emit_step("exec", "PENDING",
                "Signal queued — awaiting your approval in dashboard.")
            return

        if mode == "paper":
            await self._paper_trade(signal)
        else:
            await self._live_trade(signal)

    async def _paper_trade(self, signal: dict):
        logger.info(f"[{self.user_id}] PAPER TRADE: {signal['action']} "
                    f"{signal['symbol']} x{signal['qty']} @ {signal['entry']}")
        self.risk.open_positions += 1
        await self.emit_step("exec", "PAPER",
            f"[PAPER] {signal['action']} {signal['symbol']} "
            f"× {signal['qty']} @ ₹{signal['entry']}")
        await self.emit("trade_executed", {
            **signal, "mode": "paper",
            "timestamp": datetime.now().isoformat(),
        })

    async def _live_trade(self, signal: dict):
        """Place real order via Kite REST API."""
        if not self.kite:
            await self.emit_step("warn", "ERROR", "Kite not initialized.")
            return
        try:
            tx_type = (
                self.kite.TRANSACTION_TYPE_BUY
                if signal["action"] == "BUY"
                else self.kite.TRANSACTION_TYPE_SELL
            )
            order_id = self.kite.place_order(
                variety=self.kite.VARIETY_REGULAR,
                exchange=self.kite.EXCHANGE_NSE,
                tradingsymbol=signal["symbol"],
                transaction_type=tx_type,
                quantity=int(signal["qty"]),
                product=self.kite.PRODUCT_MIS,       # Intraday
                order_type=self.kite.ORDER_TYPE_LIMIT,
                price=signal["entry"],
                trigger_price=None,
                tag=f"tradeagent_{self.user_id[:8]}",
            )
            logger.info(f"[{self.user_id}] LIVE ORDER placed: {order_id}")
            self.risk.open_positions += 1
            await self.emit_step("exec", "LIVE",
                f"Order placed: {order_id} — "
                f"{signal['action']} {signal['symbol']} x{signal['qty']} @ ₹{signal['entry']}")
            await self.emit("trade_executed", {
                **signal, "order_id": order_id, "mode": "live",
                "timestamp": datetime.now().isoformat(),
            })
            # Set SL-M order
            await self._place_stoploss(signal, tx_type)
        except Exception as e:
            logger.error(f"[{self.user_id}] Order placement failed: {e}")
            await self.emit_step("warn", "ERROR", f"Order failed: {e}")

    async def _place_stoploss(self, signal: dict, original_tx_type):
        """Place opposite SL-Market order for risk management."""
        try:
            sl_tx = (
                self.kite.TRANSACTION_TYPE_SELL
                if original_tx_type == self.kite.TRANSACTION_TYPE_BUY
                else self.kite.TRANSACTION_TYPE_BUY
            )
            self.kite.place_order(
                variety=self.kite.VARIETY_REGULAR,
                exchange=self.kite.EXCHANGE_NSE,
                tradingsymbol=signal["symbol"],
                transaction_type=sl_tx,
                quantity=int(signal["qty"]),
                product=self.kite.PRODUCT_MIS,
                order_type=self.kite.ORDER_TYPE_SLM,
                trigger_price=signal["sl"],
            )
        except Exception as e:
            logger.warning(f"[{self.user_id}] SL order failed: {e}")

    async def _fetch_historical(self, symbol: str) -> list:
        """Fallback: fetch OHLCV from Kite historical API."""
        if not self.kite:
            return []
        try:
            instruments = self.kite.instruments("NSE")
            token_map = {i["tradingsymbol"]: i["instrument_token"] for i in instruments}
            if symbol not in token_map:
                return []
            to_date   = datetime.now()
            from_date = to_date - timedelta(hours=4)
            candle_data = self.kite.historical_data(
                instrument_token=token_map[symbol],
                from_date=from_date,
                to_date=to_date,
                interval="5minute",
            )
            return [{
                "time":   str(c["date"]),
                "open":   c["open"],
                "high":   c["high"],
                "low":    c["low"],
                "close":  c["close"],
                "volume": c["volume"],
            } for c in candle_data[-50:]]
        except Exception as e:
            logger.warning(f"[{self.user_id}] Historical fetch failed: {e}")
            return []

    async def _fetch_news(self, symbol: str) -> str:
        """Fetch relevant headlines via NewsAPI (optional)."""
        news_key = self.config.get("news_api_key")
        if not news_key:
            return "No news API configured."
        try:
            import httpx
            query = f"{symbol} NSE stock India"
            url = (f"https://newsapi.org/v2/everything?q={query}"
                   f"&language=en&sortBy=publishedAt&pageSize=5&apiKey={news_key}")
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.get(url)
                articles = resp.json().get("articles", [])
            lines = [f"- {a['title']} ({a['source']['name']})" for a in articles[:5]]
            return "\n".join(lines) if lines else "No recent news found."
        except Exception as e:
            return f"News fetch failed: {e}"

    async def _auto_squareoff(self):
        """Called at user's configured square-off time (default 15:10 IST)."""
        logger.info(f"[{self.user_id}] Auto square-off triggered")
        await self.emit_step("exec", "SQUAREOFF", "Auto square-off — closing all intraday positions")
        if self.config.get("trade_mode") == "live" and self.kite:
            try:
                positions = self.kite.positions()
                for pos in positions.get("day", []):
                    if pos["quantity"] != 0:
                        tx = (self.kite.TRANSACTION_TYPE_SELL
                              if pos["quantity"] > 0
                              else self.kite.TRANSACTION_TYPE_BUY)
                        self.kite.place_order(
                            variety=self.kite.VARIETY_REGULAR,
                            exchange=pos["exchange"],
                            tradingsymbol=pos["tradingsymbol"],
                            transaction_type=tx,
                            quantity=abs(pos["quantity"]),
                            product=self.kite.PRODUCT_MIS,
                            order_type=self.kite.ORDER_TYPE_MARKET,
                        )
            except Exception as e:
                logger.error(f"[{self.user_id}] Square-off failed: {e}")
        self.risk.reset_daily()

    # --- Lifecycle ---

    async def start(self):
        self.running = True
        logger.info(f"[{self.user_id}] Agent worker starting")

        # Start Kite WebSocket in background thread
        if self.config.get("kite_api_key") and self.config.get("kite_access_token"):
            self._init_kite()
            self.ticker.connect(threaded=True)

        # Schedule analysis every N minutes during market hours
        interval = self.config.get("analysis_interval_minutes", 5)
        self.scheduler.add_job(
            self.run_analysis,
            trigger=CronTrigger(
                hour="9-15", minute=f"*/{interval}",
                timezone="Asia/Kolkata",
            ),
            id=f"analysis_{self.user_id}",
        )

        # Schedule auto square-off
        squareoff_time = self.config.get("squareoff_time", "15:10")
        sq_h, sq_m = squareoff_time.split(":")
        self.scheduler.add_job(
            self._auto_squareoff,
            trigger=CronTrigger(
                hour=sq_h, minute=sq_m,
                timezone="Asia/Kolkata",
            ),
            id=f"squareoff_{self.user_id}",
        )

        self.scheduler.start()
        await self.emit("agent_started", {
            "message": "Agent worker running",
            "interval_minutes": interval,
            "mode": self.config.get("trade_mode", "paper"),
        })

    async def stop(self):
        self.running = False
        self.scheduler.shutdown(wait=False)
        if self.ticker:
            self.ticker.close()
        logger.info(f"[{self.user_id}] Agent worker stopped")
        await self.emit("agent_stopped", {"message": "Agent stopped"})

    def approve_signal(self):
        """Called from API when user clicks 'Approve' in dashboard."""
        if self.last_signal:
            asyncio.create_task(self._execute_signal_approved(self.last_signal))

    async def _execute_signal_approved(self, signal: dict):
        if self.config.get("trade_mode") == "paper":
            await self._paper_trade(signal)
        else:
            await self._live_trade(signal)


# ---------------------------------------------------------------------------
# Default Claude system prompt
# ---------------------------------------------------------------------------

DEFAULT_SYSTEM_PROMPT = """You are an expert intraday trading agent for Indian equity markets (NSE/BSE).

Your role: Analyse the given OHLCV data, technical indicators, and market news. 
Make a clear BUY / SELL / HOLD decision with specific parameters.

Rules you must follow:
- Never trade within the first 15 minutes after market open (9:15–9:30 AM IST)
- Avoid trades 30 minutes before major scheduled events (RBI, Budget, CPI)
- Risk/reward ratio must be at least 1:1.5
- Stop-loss must be based on recent support/resistance, not arbitrary
- Be conservative — when in doubt, HOLD

Response format: Explain your reasoning in 3–5 sentences, then end with EXACTLY this JSON:
{"action":"BUY|SELL|HOLD","entry":0.0,"target":0.0,"sl":0.0,"qty":1,"confidence":0,"reasoning":"one-line summary"}

Confidence scale: 0-100. Only recommend live trades above 70."""
