const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pharmacy.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    manufacturer TEXT,
    source TEXT,
    source_id TEXT,
    country_code TEXT,
    barcode TEXT,
    composition TEXT,
    description TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS product_matches (
    m_source TEXT,
    m_source_id TEXT,
    c_source TEXT,
    c_source_id TEXT
  )`);
});

module.exports = db;
