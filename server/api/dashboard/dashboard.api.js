const fs = require('fs');
const path = require('path');
const db = require('../../db/index');

module.exports = {
    getMyDashboard: async (req, res, next) => {
        const { id } = req.auth.user;
        const activeUsersSqlResult = await db.query(`
            SELECT id, username, email, isactive, currentproperty FROM ${db.tableNames.users}
            WHERE isactive=true
        `);

        const myMatchesSqlResult = await db.query(`
            SELECT * FROM ${db.tableNames.matches}
            WHERE $1 <@ userids
        `, [`{${id}}`]);

        res.locals = {
            data: {
                activeUsers: activeUsersSqlResult.rows,
                myMatches: myMatchesSqlResult.rows,
            },
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },
};
