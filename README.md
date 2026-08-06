<div align="center">

# 🔐 MESH-TECH-SESSION

### *WhatsApp Session ID Generator for MESH-TECH-V2*

[![Version](https://img.shields.io/badge/Version-2.0.0-blue.svg)](https://github.com/mesh057/MESH-TECH-SESSION)
[![Node](https://img.shields.io/badge/Node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org)

<img src="https://i.postimg.cc/vHZz7VWG/bot-logo.png" alt="MESH-TECH Logo" width="150"/>

**Generate Session IDs for MESH-TECH-V2 Bot**

📢 [Channel](https://whatsapp.com/channel/0029VbDeTrNEKyZ9GlUude2R) | 💬 [Group](https://chat.whatsapp.com/DM1JxxnOJFp0vsTHpej89M) | 📦 [Bot Repo](https://github.com/mesh057/MESH-TECH-V2)

</div>

---

## ✨ Features

- 🔢 **Pairing Code** — Link your WhatsApp without scanning QR
- 📷 **QR Code** — Traditional QR scan method
- 🔐 **Mesh~ Prefix** — Session IDs start with `Mesh~` for bot compatibility
- 🌐 **Web Interface** — Beautiful, responsive UI
- ⚡ **Instant Delivery** — Session ID sent directly to your WhatsApp DM

---

## 🚀 Quick Start

### Local
```bash
git clone https://github.com/mesh057/MESH-TECH-SESSION.git
cd MESH-TECH-SESSION
npm install
npm start
```
Visit `http://localhost:8000`

---

## 🌐 Deployment

### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mesh057/MESH-TECH-SESSION)

### Render
1. Fork this repo
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your forked repo
4. Set **Start Command**: `npm start`
5. Deploy!

### Railway
1. Fork this repo
2. Go to [railway.app](https://railway.app)
3. New Project → Deploy from GitHub repo
4. Deploy!

### Koyeb
1. Fork this repo
2. Go to [koyeb.com](https://koyeb.com)
3. Deploy from GitHub
4. Set port to `8000`

---

## 📁 Structure

```
MESH-TECH-SESSION/
├── index.js          # Express server
├── meshqr.js         # QR Code generator
├── meshpair.js       # Pairing code generator
├── id.js             # Random ID generator
├── pair.html         # Pairing code web UI
├── meshpage.html     # Main landing page
├── package.json
├── app.json          # Heroku config
├── render.yaml       # Render config
├── railway.toml      # Railway config
├── koyeb.yaml        # Koyeb config
└── assets/
    └── logo.png      # Bot logo
```

---

## 🔐 How It Works

1. User visits your deployed site
2. Enters their WhatsApp number (with country code)
3. Gets a pairing code OR scans QR
4. Links their device
5. Receives `Mesh~<base64>` in their WhatsApp DM
6. Copies it to the bot's `.env` as `SESSION_ID`

---

## ⚠️ Important

- **Never share** your Session ID publicly
- Session IDs are **base64-encoded** `creds.json`
- The `Mesh~` prefix is **required** for MESH-TECH-V2 bot
- Each session is valid until you log out from linked devices

---

**Made with ❤️ by Mesh**
