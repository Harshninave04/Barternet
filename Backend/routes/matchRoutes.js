const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { matchProducts } = require('../controllers/matchController');

const router = express.Router();

router.get('/', protect, matchProducts);

module.exports = router;
