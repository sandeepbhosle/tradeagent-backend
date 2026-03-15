#!/bin/bash
# ================================================================
# TradeAgent Backend — Hostinger VPS Setup Script
# Run this ONCE after SSH-ing into your VPS:
#   bash setup.sh
# ================================================================
set -e

echo ""
echo "=== TradeAgent Backend Setup ==="
echo ""

# 1. System packages
echo "[1/7] Installing system packages..."
apt-get update -qq
apt-get install -y python3 python3-pip python3-venv nginx certbot python3-certbot-nginx curl unzip -qq

# 2. App directory
echo "[2/7] Creating app directory..."
mkdir -p /var/www/tradeagent_backend
cd /var/www/tradeagent_backend

# 3. Copy files (assumes you've already uploaded the ZIP)
echo "[3/7] Extracting app files..."
if [ -f /root/tradeagent_backend.zip ]; then
    unzip -o /root/tradeagent_backend.zip -d /var/www/tradeagent_backend/
    echo "Files extracted from ZIP."
else
    echo "WARNING: /root/tradeagent_backend.zip not found."
    echo "Upload the ZIP first, then re-run this script."
fi

# 4. Python virtual environment
echo "[4/7] Setting up Python environment..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo "Python packages installed."

# 5. Environment file
echo "[5/7] Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ""
    echo "*** ACTION NEEDED: Edit your .env file ***"
    echo "    nano /var/www/tradeagent_backend/.env"
    echo "    Fill in ENCRYPTION_KEY, JWT_SECRET, etc."
    echo ""
fi

# 6. Systemd service
echo "[6/7] Creating systemd service..."
cat > /etc/systemd/system/tradeagent.service << 'SERVICE'
[Unit]
Description=TradeAgent FastAPI Backend
After=network.target

[Service]
User=root
WorkingDirectory=/var/www/tradeagent_backend
EnvironmentFile=/var/www/tradeagent_backend/.env
ExecStart=/var/www/tradeagent_backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 2
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable tradeagent

# 7. Nginx config
echo "[7/7] Configuring Nginx..."
cat > /etc/nginx/sites-available/tradeagent << 'NGINX'
server {
    listen 80;
    server_name api.stockbot.madcapmedia.in;

    location / {
        proxy_pass         http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/tradeagent /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo ""
echo "=== Setup Complete ==="
echo ""
echo "NEXT STEPS:"
echo "  1. Edit .env:      nano /var/www/tradeagent_backend/.env"
echo "  2. Start backend:  systemctl start tradeagent"
echo "  3. Check status:   systemctl status tradeagent"
echo "  4. View logs:      journalctl -u tradeagent -f"
echo "  5. Add SSL:        certbot --nginx -d api.stockbot.madcapmedia.in"
echo ""
