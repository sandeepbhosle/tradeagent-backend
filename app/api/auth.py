import os
import uuid
import logging
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt

logger = logging.getLogger("tradeagent.auth")
router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

JWT_SECRET    = os.getenv("JWT_SECRET", "changeme-use-strong-secret-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_H  = int(os.getenv("JWT_EXPIRE_HOURS", "24"))

# In-memory user store — replace with DB in production
_users: dict = {}


def make_token(user_id: str, email: str, plan: str) -> str:
    exp = datetime.utcnow() + timedelta(hours=JWT_EXPIRE_H)
    return jwt.encode(
        {"sub": user_id, "email": email, "plan": plan, "exp": exp},
        JWT_SECRET, algorithm=JWT_ALGORITHM
    )


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    plan: str = "free"


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
async def register(req: RegisterRequest):
    if req.email in _users:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = str(uuid.uuid4())
    _users[req.email] = {
        "id": user_id,
        "email": req.email,
        "name": req.name,
        "hashed_password": pwd_context.hash(req.password),
        "plan": req.plan,
        "created_at": datetime.utcnow().isoformat(),
    }
    token = make_token(user_id, req.email, req.plan)
    logger.info(f"New user registered: {req.email} plan={req.plan}")
    return {"token": token, "plan": req.plan, "user_id": user_id, "name": req.name}


@router.post("/login")
async def login(req: LoginRequest):
    user = _users.get(req.email)
    if not user or not pwd_context.verify(req.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = make_token(user["id"], req.email, user["plan"])
    return {"token": token, "plan": user["plan"], "user_id": user["id"], "name": user["name"]}
