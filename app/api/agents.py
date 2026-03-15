import logging
from fastapi import APIRouter
from pydantic import BaseModel

logger = logging.getLogger("tradeagent.agents")
router = APIRouter()


class AgentStartRequest(BaseModel):
    symbol: str = "NIFTY 50"
    timeframe: str = "5min"
    mode: str = "paper"


@router.post("/start/{user_id}")
async def start_agent(user_id: str, req: AgentStartRequest):
    return {"status": "started", "user_id": user_id, "mode": req.mode}


@router.post("/stop/{user_id}")
async def stop_agent(user_id: str):
    return {"status": "stopped", "user_id": user_id}


@router.post("/approve/{user_id}")
async def approve_signal(user_id: str):
    return {"status": "approved", "user_id": user_id}


@router.get("/status/{user_id}")
async def agent_status(user_id: str):
    return {
        "running": False,
        "last_signal": None,
        "pnl_today": 0.0,
        "trades_today": 0,
    }
