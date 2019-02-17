const fs = require('fs');
const path = require('path');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/index');
const logger = require('./logger');
const authMiddleware = require('./auth/verify-is-logged');
const fileUpload = require('express-fileupload');
const matchUsers = require('./match-users');

process.env.NODE_ENV === 'production' ?
    console.log('Running on PRODUCTION mode') :
    console.log('Running on DEVELOPMENT mode');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Cache-control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return next();
});
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is up and running.');
});

app.use('/api/auth', require('./auth/auth.api'));
app.use('/api', authMiddleware, require('./api'));
app.use('/resources', express.static('resources'));

// Last point, before sending the data to the client
app.use((req, res) => {
    // each api call should return data property in locals, otherwise it will be considered as not found
    const { data, toastMessages, confirmMessage } = res.locals;
    if (typeof data === 'undefined') {
        logger.log({
            level: 'error',
            message: `${req.uri} not found`
        });
        res.status(404).send({ error: 'Api Endpoint Not Found' });
        return;
    }

    if (req.originalUrl.indexOf('users') > -1) {
        matchUsers();
    }

    const response = {
        toastMessages: toastMessages || [],
        confirmMessage: confirmMessage || '',
        result: data,
    };

    res.json(response);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);
});

app.use((err, req, res, next) => {
    const { statusCode, message, stack } = err;

    logger.log({
        level: 'error',
        message: `${statusCode || 500} ${message || 'Something failed!'}`
    });

    !statusCode && process.env.NODE_ENV === 'production'
        ? res.status(500).send({ error: 'Something failed!' })
        : res.status(statusCode || 500).send({
            error: message || 'Something failed!',
            stack
        });
});


(async () => {
    const port = process.env.serverport || 1234;

    try {
        if (process.env.NODE_ENV !== 'production') {
            await db.createInitialTables();
        }

        const server = http.createServer(app);
        server.listen(port, () => {
            console.log('\x1b[32m', `2. Server is running on port ${port}!`, '\x1b[0m');
        });
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
})();


