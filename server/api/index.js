const express = require('express');

const api = express.Router();

api.use('/app-layout', require('./app-layout'));
api.use('/users', require('./users'));

module.exports = api;
