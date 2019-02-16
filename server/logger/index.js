const fs = require('fs');
const path = require('path');
const winston = require('winston');
const moment = require('moment');

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

module.exports = winston.createLogger({
    silent: false,
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, moment().format('YYYY-MMM-DD-dddd')) })
    ]
});
