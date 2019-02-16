const fs = require('fs');
const path = require('path');
const db = require('../../db/index');

module.exports = {
    getMyDashboard: async (req, res, next) => {
        const { id } = req.auth.user;
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
};
