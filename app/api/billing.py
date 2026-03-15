import os
import logging
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

logger = logging.getLogger("tradeagent.billing")
router = APIRouter()

PRICE_IDS = {
    "starter": os.getenv("STRIPE_PRICE_STARTER", "price_starter"),
    "pro":     os.getenv("STRIPE_PRICE_PRO",     "price_pro"),
}


class CheckoutRequest(BaseModel):
    plan: str
    user_id: str = ""


@router.post("/create-checkout")
async def create_checkout(req: CheckoutRequest):
    stripe_key = os.getenv("STRIPE_SECRET_KEY", "")
    if not stripe_key:
        raise HTTPException(status_code=503, detail="Stripe not configured. Add STRIPE_SECRET_KEY.")
    try:
        import stripe
        stripe.api_key = stripe_key
        session = stripe.checkout.Session.create(
            mode="subscription",
            line_items=[{"price": PRICE_IDS.get(req.plan, ""), "quantity": 1}],
            success_url=f"{os.getenv('APP_URL', 'https://stockbot.madcapmedia.in')}/dashboard?subscribed=1",
            cancel_url=f"{os.getenv('APP_URL', 'https://stockbot.madcapmedia.in')}/pricing",
            client_reference_id=req.user_id,
        )
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    if not webhook_secret:
        return {"received": True}
    try:
        import stripe
        stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")
        event = stripe.Webhook.construct_event(payload, sig, webhook_secret)
        if event["type"] == "checkout.session.completed":
            logger.info(f"Subscription activated: {event['data']['object'].get('client_reference_id')}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"received": True}
