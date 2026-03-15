import logging
from fastapi import APIRouter
from pydantic import BaseModel

logger = logging.getLogger("tradeagent.alerts")
router = APIRouter()


class AlertTestRequest(BaseModel):
    channel: str = "telegram"
    telegramToken: str = ""
    telegramChatId: str = ""
    waNumber: str = ""
    twilioSid: str = ""
    twilioToken: str = ""


@router.post("/test")
async def test_alert(req: AlertTestRequest):
    from app.services.notifier import AlertService
    config = {
        "alert_channel":        req.channel,
        "telegram_bot_token":   req.telegramToken,
        "telegram_chat_id":     req.telegramChatId,
        "whatsapp_number":      req.waNumber,
        "twilio_sid":           req.twilioSid,
        "twilio_token":         req.twilioToken,
    }
    svc = AlertService(config)
    result = await svc.test_connection()
    return result


@router.post("/save/{user_id}")
async def save_alert_config(user_id: str, req: AlertTestRequest):
    return {"status": "saved", "channel": req.channel, "user_id": user_id}
