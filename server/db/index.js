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
    requestedProperties: schemaName + '.requested_properties',
    pois: schemaName + '.pois',
    matches: schemaName + '.matches',
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
            await insertRequestedPropertiesData(tableNames.requestedProperties);
            await insertPoisData(tableNames.pois);
            await insertMatchesData(tableNames.matches);
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
                     isactive boolean,
                     currentproperty jsonb
                     )`
    );

    await pool.query(`INSERT INTO ${tableName}(id, username, password, email, isactive, currentproperty) VALUES($1, $2, $3, $4, $5, $6)`, [
        '0',
        'fatih',
        encript(Buffer.from('fatih', 'binary').toString('base64')),
        'f.hyuseinov@gmail.com',
        true,
        {
            'address': 'Sofia bul. Bulgaria 56',
            'rent': 500,
            'size': 56,
        }
    ]);
}

async function insertRequestedPropertiesData(tableName) {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${tableName}(
                     id varchar PRIMARY KEY,
                     user_id varchar,
                     specs jsonb
                     )`
    );

    await pool.query(`INSERT INTO ${tableName}(id, user_id, specs) VALUES($1, $2, $3)`, [
        '0',
        '0',
        {
            'address': 'Sofia bul. Al. Malinov 11',
            'rent': 300,
            'size': 56,
        }
    ]);
}

async function insertPoisData(tableName) {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${tableName}(
                     id varchar PRIMARY KEY,
                     user_id varchar,
                     location varchar,
                     hourrange varchar
                     )`
    );

    await pool.query(`INSERT INTO ${tableName}(id, user_id, location, hourrange) VALUES($1, $2, $3, $4)`, [
        '0',
        '0',
        'Sofia bul. Al. Malinov 11',
        '08-09'
    ]);
}

async function insertMatchesData(tableName) {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS ${tableName}(
                     id varchar PRIMARY KEY,
                     userids varchar[]
                     )`
    );

    await pool.query(`INSERT INTO ${tableName}(id, userids) VALUES($1, $2)`, [
        '0',
        ['0', '1'],
    ]);
}

