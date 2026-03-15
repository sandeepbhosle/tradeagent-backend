# TradeAgent Backend — Deploy on Hostinger VPS
# Your frontend: https://stockbot.madcapmedia.in
# Your backend target: https://api.stockbot.madcapmedia.in

================================================================
PART 1 — DNS SETUP (do this first, takes 5 mins to propagate)
================================================================

In Hostinger hPanel → Domains → stockbot.madcapmedia.in → DNS Zone:

Add a new A record:
  Type:  A
  Name:  api
  Value: YOUR_VPS_IP_ADDRESS
  TTL:   3600

This creates api.stockbot.madcapmedia.in pointing to your VPS.

================================================================
PART 2 — UPLOAD ZIP TO VPS
================================================================

Option A — via Hostinger File Manager:
  1. hPanel → VPS → File Manager
  2. Navigate to /root/
  3. Upload tradeagent_backend.zip

Option B — via Terminal on your Mac (Catalina):
  Open Terminal and run:
    scp ~/Downloads/tradeagent_backend.zip root@YOUR_VPS_IP:/root/

================================================================
PART 3 — SSH INTO VPS AND RUN SETUP
================================================================

In Hostinger hPanel → VPS → click "SSH Terminal" (browser SSH)
OR on your Mac Terminal:
  ssh root@YOUR_VPS_IP

Then run:
  bash /root/tradeagent_backend/setup.sh

(The setup.sh script does everything automatically)

================================================================
PART 4 — CONFIGURE YOUR .env FILE
================================================================

nano /var/www/tradeagent_backend/.env

Fill in these values (minimum required to start):

  ENCRYPTION_KEY  →  Run this to generate:
                     python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"

  JWT_SECRET      →  Run this to generate:
                     python3 -c "import secrets; print(secrets.token_hex(32))"

  ANTHROPIC_API_KEY → Your key from console.anthropic.com

Save file: Ctrl+X → Y → Enter

================================================================
PART 5 — START THE BACKEND
================================================================

systemctl start tradeagent
systemctl status tradeagent    ← should show "active (running)"

Test it:
  curl http://localhost:8000/health
  # Should return: {"status":"ok","app":"TradeAgent API","active_agents":0}

================================================================
PART 6 — SSL CERTIFICATE (HTTPS)
================================================================

certbot --nginx -d api.stockbot.madcapmedia.in

Follow prompts → choose option 2 (redirect HTTP to HTTPS)

Test: curl https://api.stockbot.madcapmedia.in/health

================================================================
PART 7 — CONNECT FRONTEND TO BACKEND
================================================================

In Hostinger hPanel → Node.js App (stockbot.madcapmedia.in):
  → Environment Variables → Add:

  Name:  NEXT_PUBLIC_API_URL
  Value: https://api.stockbot.madcapmedia.in

Then click Redeploy / Restart the Node.js app.

================================================================
PART 8 — TEST EVERYTHING
================================================================

Visit these URLs in your browser:

  https://stockbot.madcapmedia.in/           ← Landing (already works)
  https://stockbot.madcapmedia.in/pricing    ← Pricing page
  https://stockbot.madcapmedia.in/login      ← Login
  https://stockbot.madcapmedia.in/signup     ← Signup
  https://stockbot.madcapmedia.in/dashboard  ← Dashboard
  https://api.stockbot.madcapmedia.in/health ← Backend health check
  https://api.stockbot.madcapmedia.in/docs   ← Auto API docs (FastAPI)

================================================================
USEFUL COMMANDS (run on VPS via SSH)
================================================================

View live logs:      journalctl -u tradeagent -f
Restart backend:     systemctl restart tradeagent
Stop backend:        systemctl stop tradeagent
Check Nginx:         systemctl status nginx
Nginx error log:     tail -f /var/log/nginx/error.log
