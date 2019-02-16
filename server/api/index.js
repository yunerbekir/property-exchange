const express = require('express');

const api = express.Router();

api.use('/app-layout', require('./app-layout'));

module.exports = api;
