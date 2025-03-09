const express = require('express');
const { protect, wholesalerOnly } = require('../middleware/authMiddleware');
const { uploadProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

router.post('/upload', protect, wholesalerOnly, uploadProduct);
router.get('/', getProducts);

module.exports = router;