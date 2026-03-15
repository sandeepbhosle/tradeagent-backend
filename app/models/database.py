import os
import logging
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, Text
from datetime import datetime

logger = logging.getLogger("tradeagent.db")
Base = declarative_base()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite+aiosqlite:///./tradeagent.db"   # SQLite fallback — no setup needed
)

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class User(Base):
    __tablename__ = "users"
    id              = Column(String, primary_key=True)
    email           = Column(String, unique=True, nullable=False)
    name            = Column(String)
    hashed_password = Column(String)
    plan            = Column(String, default="free")
    stripe_customer = Column(String)
    created_at      = Column(DateTime, default=datetime.utcnow)
    is_active       = Column(Boolean, default=True)


class UserKeys(Base):
    __tablename__ = "user_keys"
    user_id              = Column(String, primary_key=True)
    anthropic_key_enc    = Column(Text)
    kite_key_enc         = Column(Text)
    kite_secret_enc      = Column(Text)
    kite_token_enc       = Column(Text)
    news_key_enc         = Column(Text)
    trade_config_json    = Column(Text)
    updated_at           = Column(DateTime, default=datetime.utcnow)


class Signal(Base):
    __tablename__ = "signals"
    id          = Column(String, primary_key=True)
    user_id     = Column(String, nullable=False)
    symbol      = Column(String)
    action      = Column(String)
    entry       = Column(Float)
    target      = Column(Float)
    sl          = Column(Float)
    qty         = Column(Integer)
    confidence  = Column(Integer)
    reasoning   = Column(Text)
    executed    = Column(Boolean, default=False)
    created_at  = Column(DateTime, default=datetime.utcnow)


class Trade(Base):
    __tablename__ = "trades"
    id          = Column(String, primary_key=True)
    user_id     = Column(String, nullable=False)
    signal_id   = Column(String)
    symbol      = Column(String)
    action      = Column(String)
    entry       = Column(Float)
    exit_price  = Column(Float)
    qty         = Column(Integer)
    pnl         = Column(Float)
    mode        = Column(String)
    order_id    = Column(String)
    status      = Column(String, default="open")
    created_at  = Column(DateTime, default=datetime.utcnow)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables initialised")
