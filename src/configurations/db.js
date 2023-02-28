require('dotenv').config();
const mysql = require('mysql2/promise');

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const connect = mysql.createConnection({
  host: DB_HOST || 'localhost',
  database: DB_NAME || 'dimytech',
  user: DB_USER || 'root',
  password: DB_PASSWORD || '',
});

module.exports = connect;
