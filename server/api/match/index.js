const express = require('express');
const { getMatches } = require('./match.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();


api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getMatches));

module.exports = api;
