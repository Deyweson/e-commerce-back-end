const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'e_commerce',
    password: '0512',
    port: 5432,
    // ssl: {rejectUnauthorized: false}
});

module.exports = pool;