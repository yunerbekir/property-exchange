const express = require('express');
const { getUserById, getUsers, updateUser, deleteUser } = require('./users.api');
const baseRouteHandler = require('../base-route-handler.api');

const api = express.Router();


api.get('/:id', (req, res, next) => baseRouteHandler(req, res, next, getUserById));
api.get('/', (req, res, next) => baseRouteHandler(req, res, next, getUsers));
api.put('/', (req, res, next) => baseRouteHandler(req, res, next, updateUser));
api.delete('/', (req, res, next) => baseRouteHandler(req, res, next, deleteUser));

module.exports = api;
