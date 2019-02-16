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
        delete user.password;

        res.locals = {
            data: user,
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },
    getUsers: async (req, res, next) => {
        const usersSqlResult = await db.query(`
            SELECT id, username, email, isactive, currentproperty FROM ${db.tableNames.users}
        `);

        res.locals = {
            data: usersSqlResult.rows,
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    updateUser: async (req, res, next) => {
        const { id } = req.auth;
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
    deleteUser: async (req, res, next) => {
        const { id } = req.auth;
        const result = await db.query(`DELETE FROM ${db.tableNames.users}
                                         WHERE id=$1`, [id]);
        res.locals.data = {
            intersection: result
        };
        next();
    }
};
