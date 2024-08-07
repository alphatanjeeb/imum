const db = require('./db');

const batchInsertProducts = (products) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO products (title, manufacturer, source, source_id, country_code, barcode, composition, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      products.forEach(product => {
        stmt.run(product.title, product.manufacturer, product.source, product.source_id, product.country_code, product.barcode, product.composition, product.description);
      });
      db.run('COMMIT');
      stmt.finalize();
      resolve();
    });
  });
};

const batchInsertProductMatches = (matches) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO product_matches (m_source, m_source_id, c_source, c_source_id) VALUES (?, ?, ?, ?)`);
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      matches.forEach(match => {
        stmt.run(match.m_source, match.m_source_id, match.c_source, match.c_source_id);
      });
      db.run('COMMIT');
      stmt.finalize();
      resolve();
    });
  });
};

const fetchAllProducts = (limit, offset) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const countProducts = () => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) AS count FROM products`, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count);
      }
    });
  });
};
module.exports = {
  batchInsertProducts,
  batchInsertProductMatches,
  fetchAllProducts,
  countProducts,
};
