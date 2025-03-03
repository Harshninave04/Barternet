const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.send('User Registration Route!');
});

router.post('/login', (req, res) => {
    res.send('User Login Route!');
});

module.exports = router;
