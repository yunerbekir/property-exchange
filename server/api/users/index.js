const express = require('express');
const { getUserById, getUsers, getFullUsers, updateUser, updateUserPois, updateUserRequestedProperties, deleteUser } = require('./users.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();


api.get('/:id', (req, res, next) => baseRouteHandler(req, res, next, getUserById));
api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getUsers));
api.get('/full', (req, res, next) => baseRouteHandler(req, res, next, getFullUsers));
api.put('/', (req, res, next) => baseRouteHandler(req, res, next, updateUser));
api.put('/pois', (req, res, next) => baseRouteHandler(req, res, next, updateUserPois));
api.put('/requestedProperties', (req, res, next) => baseRouteHandler(req, res, next, updateUserRequestedProperties));
api.delete('/', (req, res, next) => baseRouteHandler(req, res, next, deleteUser));

module.exports = api;
