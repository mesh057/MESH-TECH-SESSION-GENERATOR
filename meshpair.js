const express = require('express');
const fs = require('fs');
const { makeid } = require('./id');
const pino = require("pino");

const {
  default: Mesh_Tech,
  useMultiFileAuthState,
  delay,
  makeCacheableSignalKeyStore,
  Browsers
} = require("@whiskeysockets/baileys");

let router = express.Router();

function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) return false;
  fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
  const id = makeid();
  let num = req.query.number;

  async function MESH_TECH_PAIR() {
    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

    try {
      let Mesh_Pair = Mesh_Tech({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        printQRInTerminal: false,
        logger: pino({ level: "fatal" }).child({ level: "fatal" }),
        browser: ["Chrome (Linux)", "", ""]
      });

      if (!Mesh_Pair.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, '');
        const code = await Mesh_Pair.requestPairingCode(num);
        if (!res.headersSent) {
          await res.send({ code });
        }
      }

      Mesh_Pair.ev.on('creds.update', saveCreds);

      Mesh_Pair.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;

        if (connection == "open") {
          await delay(5000);
          let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
          await delay(800);
          let b64data = Buffer.from(data).toString('base64');
          let sessionId = 'Mesh~' + b64data;

          let session = await Mesh_Pair.sendMessage(Mesh_Pair.user.id, {
            text: sessionId
          });

          let MESH_TEXT = `
╔════════════════════════════════════════════╗
║  ✅ *MESH-TECH-V2 PAIR CODE CONNECTED*      ║
╚════════════════════════════════════════════╝

🤖 *Bot Name:* MESH-TECH-V2
👤 *Owner:* Mesh
📱 *Number:* ${Mesh_Pair.user.id.split(':')[0]}
🔐 *Session ID:* Sent above (starts with Mesh~)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *NEXT STEPS:*
1️⃣ Copy the Session ID above (the long text starting with Mesh~)
2️⃣ Paste it in your bot's .env file as SESSION_ID
3️⃣ Deploy your bot and enjoy!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 *Links:*
📢 Channel: https://whatsapp.com/channel/0029VbDeTrNEKyZ9GlUude2R
💬 Group: https://chat.whatsapp.com/DM1JxxnOJFp0vsTHpej89M
📦 Repo: https://github.com/mesh057/MESH-TECH-V2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_⭐ Don't forget to star the repo!_
          `.trim();

          await Mesh_Pair.sendMessage(Mesh_Pair.user.id, {
            text: MESH_TEXT
          }, { quoted: session });

          await delay(100);
          await Mesh_Pair.ws.close();
          return await removeFile('./temp/' + id);

        } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
          await delay(10000);
          MESH_TECH_PAIR();
        }
      });

    } catch (err) {
      console.log("service restarted");
      await removeFile('./temp/' + id);
      if (!res.headersSent) {
        await res.send({ code: "Service Unavailable" });
      }
    }
  }

  return await MESH_TECH_PAIR();
});

module.exports = router;
