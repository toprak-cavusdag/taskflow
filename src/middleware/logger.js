const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'requests.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  console.log(line);
  fs.appendFile(LOG_FILE, line + '\n', (err) => {
    if (err) console.error('Log dosyasina yazilamadi:', err.message);
  });

  next();
}

module.exports = logger;
