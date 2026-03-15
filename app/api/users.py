import os
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from cryptography.fernet import Fernet

logger = logging.getLogger("tradeagent.users")
router = APIRouter()

# In-memory key store — replace with DB in production
_user_keys: dict = {}


def get_cipher() -> Fernet:
    key = os.getenv("ENCRYPTION_KEY")
    if not key:
        # Auto-generate for dev — in prod always set ENCRYPTION_KEY
        key = Fernet.generate_key().decode()
        logger.warning("ENCRYPTION_KEY not set — using ephemeral key. Set this in env vars!")
    return Fernet(key.encode() if isinstance(key, str) else key)


class KeyConfig(BaseModel):
    anthropic_key: str = ""
    kite_api_key: str = ""
    kite_api_secret: str = ""
    kite_access_token: str = ""
    news_api_key: str = ""
    trade_mode: str = "paper"
    claude_model: str = "claude-sonnet-4-20250514"
    max_capital: float = 25000
    max_daily_loss: float = 5000
    max_positions: int = 3
    min_confidence: int = 75
    squareoff_time: str = "15:10"
    analysis_interval_minutes: int = 5
    approval_mode: str = "always"
    alert_channel: str = "telegram"
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""
    whatsapp_number: str = ""


@router.post("/keys/{user_id}")
async def save_keys(user_id: str, config: KeyConfig):
    cipher = get_cipher()
    encrypted = {}
    for field, value in config.model_dump().items():
        if isinstance(value, str) and value:
            encrypted[field] = cipher.encrypt(value.encode()).decode()
        else:
            encrypted[field] = value
    _user_keys[user_id] = encrypted
    return {"status": "keys_saved", "user_id": user_id}


@router.get("/keys/{user_id}")
async def get_keys_status(user_id: str):
    keys = _user_keys.get(user_id, {})
    return {
        "anthropic_key": bool(keys.get("anthropic_key")),
        "kite_api_key":  bool(keys.get("kite_api_key")),
        "kite_access_token": bool(keys.get("kite_access_token")),
        "trade_mode": keys.get("trade_mode", "paper"),
        "alert_channel": keys.get("alert_channel", "none"),
    }


@router.get("/profile/{user_id}")
async def get_profile(user_id: str):
    return {
        "user_id": user_id,
        "plan": "pro",
        "analyses_today": 0,
        "analyses_limit": -1,
        "trades_today": 0,
        "pnl_today": 0.0,
    }
