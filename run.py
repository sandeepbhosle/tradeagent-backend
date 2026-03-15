# run.py — entry point for Hostinger VPS
# Usage: python run.py
import uvicorn
import os

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        workers=2,
        reload=False,
    )
