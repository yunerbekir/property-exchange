const fs = require('fs');
const path = require('path');
const db = require('../../db/index');

module.exports = {
    getLayout: async (req, res, next) => {
        const userSettingsSqlResult = await db.query(`
            SELECT * FROM ${db.tableNames.settings}
        `);

        let appLayout;
        if (userSettingsSqlResult.rows[0]) {
            appLayout = userSettingsSqlResult.rows[0].settings;
        }


        res.locals = {
            data: { ...appLayout },
            toastMessages: [],
            confirmMessage: '',
        };

        next();
    },

    updateLayout: async (req, res, next) => {
        if (process.env.isPlaygroundMode) {
            res.locals.data = {
                appLayout: { updated: true }
            };
        } else {
            const appLayout = req.body;
            const result = await db.query(`UPDATE ${db.tableNames.settings} 
                                         SET settings=$1
                                       `, [appLayout]);
            res.locals.data = {
                appLayout: result
            };
        }

        next();
    },
    uploadOfflineMap: async (req, res, next) => {
        if (!process.env.isPlaygroundMode) {
            fs.writeFileSync(path.resolve('resources/offline-map.jpg'), req.files.file.data);
        }

        res.locals.data = {
            updated: true
        };

        next();
    }
};
