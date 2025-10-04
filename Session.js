const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "your-session-id",
    SUDO: process.env.SUDO ? process.env.SUDO.split(",") : ["94717775628"],
    PORT: process.env.PORT || "8000",
    SESSION_DIR: process.env.SESSION_DIR || "session",
    FOOTER: process.env.FOOTER || "> SENUZ-MD | Developed by Senuz\n© 2025 SENUZ-MD. All rights reserved."
};
