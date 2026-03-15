"""
TradeAgent SaaS — FastAPI Backend
Claude × Kite Connect Agentic Trading Platform
Run with: uvicorn app.main:app --host 0.0.0.0 --port 8000
"""

import asyncio
import json
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, users, agents, billing, signals, alerts
from app.services.agent_manager import AgentManager
from app.services.websocket_hub import WebSocketHub
from app.models.database import init_db

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s"
)
logger = logging.getLogger("tradeagent")

agent_manager = AgentManager()
ws_hub = WebSocketHub()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("TradeAgent starting up...")
    await init_db()
    yield
    logger.info("TradeAgent shutting down...")
    await agent_manager.stop_all()


app = FastAPI(
    title="TradeAgent API",
    description="LLM-agentic trading — Claude × Kite Connect",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://stockbot.madcapmedia.in",
        "https://www.stockbot.madcapmedia.in",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ────────────────────────────────────────────────
app.include_router(auth.router,    prefix="/api/auth",    tags=["Auth"])
app.include_router(users.router,   prefix="/api/users",   tags=["Users"])
app.include_router(agents.router,  prefix="/api/agents",  tags=["Agents"])
app.include_router(billing.router, prefix="/api/billing", tags=["Billing"])
app.include_router(signals.router, prefix="/api/signals", tags=["Signals"])
app.include_router(alerts.router,  prefix="/api/alerts",  tags=["Alerts"])


# ── WebSocket ──────────────────────────────────────────────
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await ws_hub.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            if msg.get("action") == "start_agent":
                await agent_manager.start_agent(user_id, ws_hub)
            elif msg.get("action") == "stop_agent":
                await agent_manager.stop_agent(user_id)
            elif msg.get("action") == "approve_signal":
                agent_manager.approve_signal(user_id)
    except WebSocketDisconnect:
        ws_hub.disconnect(user_id)
        logger.info(f"User {user_id} disconnected")


# ── Health check ───────────────────────────────────────────
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "app": "TradeAgent API",
        "active_agents": agent_manager.count(),
    }


@app.get("/")
async def root():
    return {"message": "TradeAgent API is running. Visit /docs for API reference."}
