const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const DEFAULT_URL = 'postgresql://postgres:postgres@localhost:5432/lab3';

const pool = new Pool({ connectionString: process.env.DATABASE_URL || DEFAULT_URL });

// Не даём необработанной ошибке соединения уронить процесс
pool.on('error', error => console.error('Ошибка соединения с PostgreSQL:', error.message));

async function init() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(sql);
}

module.exports = { pool, init, query: (text, params) => pool.query(text, params) };
