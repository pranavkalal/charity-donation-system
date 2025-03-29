const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users/:id → fetch profile
router.get('/:id', userController.getUserById);

// PUT /api/users/:id → update profile
router.put('/:id', userController.updateUser);

module.exports = router;
