const fs = require('fs');
const path = require('path');
const db = require('../../db/index');

module.exports = {
    getUserById: async (req, res, next) => {
        const { id } = req.params;
        const usersSqlResult = await db.query(`
            SELECT * FROM ${db.tableNames.users}
            WHERE id=$1;
        `, [id]);

        const user = usersSqlResult.rows && usersSqlResult.rows[0];

        if (user) {
            delete user.password;
            res.locals = {
                data: user,
                toastMessages: [],
                confirmMessage: '',
            };
            next();
        } else {
            next({ statusCode: 404, message: 'User not found' });
        }
    },
    getUsers: async (req, res, next) => {
        const usersSqlResult = await db.query(`
            SELECT id, username, email, isactive, currentproperty FROM ${db.tableNames.users}
            WHERE isactive=true
        `);

        res.locals = {
            data: usersSqlResult.rows,
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    getFullUsers: async (req, res, next) => {
        const usersSqlResult = await db.query(`
            SELECT * FROM ${db.tableNames.users}
            WHERE isactive=true
        `);

        res.locals = {
            data: usersSqlResult.rows,
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    updateUser: async (req, res, next) => {
        const { id } = req.auth.user;
        const { isactive, currentproperty } = req.body;
        const result = await db.query(`UPDATE ${db.tableNames.users} 
                                         SET isactive=$1,
                                             currentproperty=$2
                                         WHERE id=$3
                                       `, [isactive, currentproperty, id]);
        res.locals.data = {
            appLayout: result
        };

        next();
    },

    updateUserPois: async (req, res, next) => {
        const { id } = req.auth.user;
        const { pois } = req.body;
        const result = await db.query(`UPDATE ${db.tableNames.users} 
                                         SET pois=$1
                                         WHERE id=$2
                                       `, [pois, id]);
        res.locals.data = {
            appLayout: result
        };

        next();
    },

    updateUserRequestedProperties: async (req, res, next) => {
        const { id } = req.auth.user;
        const { requestedProperties } = req.body;
        const result = await db.query(`UPDATE ${db.tableNames.users} 
                                         SET requestedproperties=$1
                                         WHERE id=$2
                                       `, [requestedProperties, id]);
        res.locals.data = {
            appLayout: result
        };

        next();
    },
    deleteUser: async (req, res, next) => {
        const { id } = req.auth.user;
        const result = await db.query(`DELETE FROM ${db.tableNames.users}
                                         WHERE id=$1`, [id]);
        res.locals.data = {
            deleteResult: result
        };
        next();
    }
};
