const express = require('express');
const { getMyDashboard } = require('./dashboard.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();


api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getMyDashboard));

module.exports = api;
