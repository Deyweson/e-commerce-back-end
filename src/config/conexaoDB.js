const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    database: process.env.DATABASE,
    password: process.env.PASSDB,
    port: process.env.PORTDB,
    // ssl: {rejectUnauthorized: false}
});

module.exports = pool;