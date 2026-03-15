import json
import logging
from typing import Dict
from fastapi import WebSocket

logger = logging.getLogger("tradeagent.wshub")


class WebSocketHub:
    def __init__(self):
        self._connections: Dict[str, WebSocket] = {}

    async def connect(self, user_id: str, ws: WebSocket):
        await ws.accept()
        self._connections[user_id] = ws
        logger.info(f"WS connected: {user_id}")

    def disconnect(self, user_id: str):
        self._connections.pop(user_id, None)

    async def send(self, user_id: str, payload: dict):
        ws = self._connections.get(user_id)
        if ws:
            try:
                await ws.send_text(json.dumps(payload))
            except Exception as e:
                logger.warning(f"WS send failed for {user_id}: {e}")
                self.disconnect(user_id)

    async def broadcast(self, payload: dict):
        dead = []
        for uid, ws in self._connections.items():
            try:
                await ws.send_text(json.dumps(payload))
            except Exception:
                dead.append(uid)
        for uid in dead:
            self.disconnect(uid)
