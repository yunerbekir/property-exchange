const express = require('express');
const { getLayout, updateLayout, uploadOfflineMap } = require('./app-layout.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();


api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getLayout));
api.put('/', (req, res, next) => baseRouteHandler(req, res, next, updateLayout));
api.post('/offline-map', (req, res, next) => baseRouteHandler(req, res, next, uploadOfflineMap));

module.exports = api;
