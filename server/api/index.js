const express = require('express');

const api = express.Router();

api.use('/dashboard', require('./dashboard'));
api.use('/users', require('./users'));
api.use('/match', require('./match'));

module.exports = api;
