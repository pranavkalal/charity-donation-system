const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

// Example: Admin Dashboard API
router.get('/dashboard', protect, adminOnly, (req, res) => {
  res.json({ message: 'Welcome Admin. Secure data goes here.' });
});

module.exports = router;
