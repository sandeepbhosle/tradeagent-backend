import logging
from typing import Dict
from app.agents.worker import AgentWorker

logger = logging.getLogger("tradeagent.manager")


class AgentManager:
    def __init__(self):
        self._workers: Dict[str, AgentWorker] = {}

    async def start_agent(self, user_id: str, ws_hub, config: dict = None):
        if user_id in self._workers:
            return
        if not config:
            config = self._default_config(user_id)
        worker = AgentWorker(user_id=user_id, config=config, ws_hub=ws_hub)
        self._workers[user_id] = worker
        await worker.start()
        logger.info(f"Agent started for {user_id}")

    async def stop_agent(self, user_id: str):
        worker = self._workers.pop(user_id, None)
        if worker:
            await worker.stop()

    async def stop_all(self):
        for uid in list(self._workers.keys()):
            await self.stop_agent(uid)

    def approve_signal(self, user_id: str):
        worker = self._workers.get(user_id)
        if worker:
            worker.approve_signal()

    def count(self) -> int:
        return len(self._workers)

    def _default_config(self, user_id: str) -> dict:
        return {
            "anthropic_key": "",
            "kite_api_key": "",
            "kite_access_token": "",
            "claude_model": "claude-sonnet-4-20250514",
            "trade_mode": "paper",
            "max_capital": 25000,
            "max_daily_loss": 5000,
            "max_positions": 3,
            "min_confidence": 75,
            "analysis_interval_minutes": 5,
            "squareoff_time": "15:10",
            "watchlist": ["NIFTY 50"],
            "primary_symbol": "NIFTY 50",
            "approval_mode": "always",
        }
