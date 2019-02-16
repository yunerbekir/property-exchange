const db = require('../db');
const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./verify-is-logged');

const { encript } = require('./pass-encription.util');

const api = express.Router();

api.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (typeof username === 'undefined' || typeof password === 'undefined') {
        next({ statusCode: 400, message: 'Username and password can not be empty!' });
    } else {
        const { rows } = await db.query(`
            SELECT id, username, email
                     FROM ${db.tableNames.users}
                     WHERE username=$1 AND password=$2
        `, [username, encript(password)]);

        if (rows && rows[0]) {
            const user = rows[0];
            res.locals = {
                data: {
                    token: jwt.sign({
                        user,
                        role: 66
                    }, process.env.login_key || 'shhhhh')
                },
                toastMessages: [],
                confirmMessage: '',
            };

            next();
        } else {
            next({ statusCode: 400, message: 'Wrong username or password!' });
        }
    }
});

api.post('/register', async (req, res, next) => {
    const { id, username, password, email } = req.body;


    if (typeof id === 'undefined' || typeof email === 'undefined' || typeof username === 'undefined' || typeof password === 'undefined') {
        next({ statusCode: 400, message: 'Username and password can not be empty!' });
    } else {
        const { rows } = await db.query(`
                    SELECT id, username, email
                     FROM ${db.tableNames.users}
                     WHERE username=$1 OR email=$2
        `, [username, email]);

        if (rows && rows[0]) {
            next({ statusCode: 400, message: 'Username or Email is already taken!' });

        } else {
            try {
                await db.query(`INSERT INTO ${db.tableNames.users}(
                     id,
                     username,
                     password,
                     email,
                     isActive,
                     currentProperty,
                     pois,
                     requestedProperties
                     ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [
                    id,
                    username,
                    encript(password),
                    email,
                    true,
                    {
                        'address': null,
                        'rent': null,
                        'size': null,
                    },
                    [],
                    [
                        {
                            'address': null,
                            'rent': null,
                            'size': null,
                        },
                        {
                            'address': null,
                            'rent': null,
                            'size': null,
                        },
                        {
                            'address': null,
                            'rent': null,
                            'size': null,
                        }
                    ],
                ]);

                const user = { username };
                res.locals = {
                    data: {
                        token: jwt.sign({
                            user,
                            role: 66
                        }, process.env.login_key || 'shhhhh')
                    },
                    toastMessages: [],
                    confirmMessage: '',
                };
                next();
            } catch (e) {
                next({ statusCode: 400, message: 'Could not register!' });
            }
        }
    }
});

api.post('/change-password', authMiddleware, async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    const result = await db.query(`UPDATE ${db.tableNames.users} 
                                         SET password=$1
                                         WHERE username=$2 AND password=$3`, [
        encript(newPassword),
        req.auth.user.username,
        encript(oldPassword)
    ]);

    if (result.rowCount > 0) {
        res.locals.data = {
            passwordUpdated: true
        };
        next();
    } else {
        next({ statusCode: 400, message: 'Could not change the password. Check if you typed correct the old one!' });
    }
});

api.post('/logout', async (req, res, next) => {
    res.locals.data = {
        loggedOut: true
    };
    next();
});

module.exports = api;
