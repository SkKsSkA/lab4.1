// Разовый перенос пользователей из старого data/users.json в PostgreSQL.
// Запуск: npm run import-json   (сессии не переносятся — пользователям нужно войти заново)
const fs = require('fs');
const path = require('path');
const db = require('../db');

async function main() {
  const file = path.join(__dirname, '..', 'data', 'users.json');
  if (!fs.existsSync(file)) {
    console.log('data/users.json не найден — переносить нечего.');
    return;
  }
  await db.init();
  const users = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const u of users) {
    const result = await db.query(
      `INSERT INTO users (id, name, email, password_hash, created_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT DO NOTHING`,
      [u.id, u.name, String(u.email).trim().toLowerCase(), u.passwordHash, u.createdAt]
    );
    added += result.rowCount;
  }
  console.log(`Перенесено пользователей: ${added} из ${users.length}`);
}

main()
  .catch(error => { console.error(error.message); process.exitCode = 1; })
  .finally(() => db.pool.end());
