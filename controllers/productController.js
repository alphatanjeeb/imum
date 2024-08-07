const path = require('path');
const { batchInsertProducts, batchInsertProductMatches, fetchAllProducts,countProducts  } = require('../models/productModel');
const csvParser = require('csv-parser');
const fs = require('fs');
const fuzzy = require('fuzzy');

// Function to process CSV in batches
const processCSV = (filePath, batchSize) => {
  const results = [];
  let batch = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', (data) => {
        batch.push(data);
        if (batch.length >= batchSize) {
          results.push(batch);
          batch = [];
        }
      })
      .on('end', () => {
        if (batch.length > 0) {
          results.push(batch);
        }
        resolve(results);
      })
      .on('error', reject);
  });
};



// Controller methods
const uploadCSV = async (req, res) => {
  if (req.file) {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const batches = await processCSV(filePath, 10000);

    for (const batch of batches) {
      await batchInsertProducts(batch);
    }

    res.render('success', { message: 'CSV data successfully uploaded and processed' });
  } else {
    res.status(400).render('error', { message: 'No file uploaded' });
  }
};

const uploadProductMatchCSV = async (req, res) => {
  if (req.file) {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const batches = await processCSV(filePath, 10000);

    for (const batch of batches) {
      await batchInsertProductMatches(batch);
    }

    res.render('success', { message: 'Product match CSV data successfully uploaded and processed' });
  } else {
    res.status(400).render('error', { message: 'No file uploaded' });
  }
};

const displayAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; 
  const offset = (page - 1) * limit;

  try {
    const [products, totalCount] = await Promise.all([
      fetchAllProducts(limit, offset),
      countProducts()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.render('products', {
      products,
      currentPage: page,
      totalPages,
      limit,  
    });
  } catch (err) {
    res.status(500).send(`Error retrieving products: ${err.message}`);
  }
};

module.exports = {
  uploadCSV,
  uploadProductMatchCSV,
  displayAllProducts,
};
