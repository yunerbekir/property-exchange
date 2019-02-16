const fs = require('fs');
const path = require('path');

const db = require('./');
db.createInitialTables().then(() => {
    console.log('Created initial db-schema structure!');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
