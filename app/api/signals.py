import logging
from fastapi import APIRouter

logger = logging.getLogger("tradeagent.signals")
router = APIRouter()

_signals_store: dict = {}
_trades_store: dict  = {}


@router.get("/history/{user_id}")
async def signal_history(user_id: str, limit: int = 50):
    signals = _signals_store.get(user_id, [])
    return {"signals": signals[-limit:], "total": len(signals)}


@router.get("/trades/{user_id}")
async def trade_history(user_id: str, limit: int = 50):
    trades = _trades_store.get(user_id, [])
    return {"trades": trades[-limit:], "total": len(trades)}
