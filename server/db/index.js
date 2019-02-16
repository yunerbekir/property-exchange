const { Pool } = require('pg');
const { encript } = require('../auth/pass-encription.util');

const pool = new Pool({
    host: process.env.dbhost || 'manny.db.elephantsql.com',
    port: process.env.dbport || 5432,
    database: process.env.database || 'wdxcudcb',
    user: process.env.dbuser || 'wdxcudcb',
    password: process.env.dbpassword || 'KMx-B3XcEf9L93IwjVPxAwVYZ5JeL1YM',
    max: 60,
    idleTimeoutMillis: 30000
});

const schemaName = 'public';
const tableNames = {
    users: schemaName + '.users',
};

module.exports = {
    tableNames,
    query: (text, params) => pool.query(text, params),
    createInitialTables: async () => {
        try {
            await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

            for (let tableName of Object.values(tableNames)) {
                await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
            }

            await insertUsersData(tableNames.users);
        }
        catch (e) {
            throw e;
        }
    }
};

async function insertUsersData(tableName) {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${tableName}(
                     id varchar PRIMARY KEY,
                     username varchar,
                     password varchar,
                     email varchar,
                     currentproperty jsonb
                     )`
    );

    await pool.query(`INSERT INTO ${tableName}(id, username, password, email, currentproperty) VALUES($1, $2, $3, $4, $5)`, [
        '0',
        'prop',
        encript(Buffer.from('prop', 'binary').toString('base64')),
        'prop@gmail.com',
        {
            'address': 'Sofia bul. Bulgaria 56',
            'rent': 500,
            'size': 56,
        }
    ]);
}
