const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { uploadProduct, getProducts } = require('../controllers/productController');

router.post('/upload', protect, uploadProduct);
router.get('/', getProducts);

module.exports = router;