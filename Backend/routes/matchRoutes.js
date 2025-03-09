const express = require('express');
const { protect, retailerOnly } = require('../middleware/authMiddleware');
const { matchProducts } = require('../controllers/matchController');

const router = express.Router();

router.get('/', protect, retailerOnly, matchProducts);

module.exports = router;
