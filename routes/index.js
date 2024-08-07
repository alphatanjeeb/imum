const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadCSV, uploadProductMatchCSV } = require('../controllers/productController');
const productController = require('../controllers/productController');
// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/products', productController.displayAllProducts);

router.post('/upload', upload.single('file'), uploadCSV);
router.post('/upload-match', upload.single('file'), uploadProductMatchCSV);

module.exports = router;
