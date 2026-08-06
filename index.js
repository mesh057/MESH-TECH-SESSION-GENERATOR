const express = require('express');
const app = express();
const __path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

let qrServer = require('./meshqr.js');
let pairServer = require('./meshpair.js');

require('events').EventEmitter.defaultMaxListeners = 500;

app.use('/qr', qrServer);
app.use('/code', pairServer);
app.use('/pair', async (req, res, next) => {
  res.sendFile(__path + '/pair.html');
});
app.use('/', async (req, res, next) => {
  res.sendFile(__path + '/meshpage.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║       🤖 MESH-TECH-V2 SESSION GEN            ║
║                                              ║
║   Server running on http://localhost:${PORT}    ║
║                                              ║
╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
