// routes/donorRoutes.js
const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

// Routes
router.get('/donors', donorController.getAllDonors);
router.get('/donors/:id', donorController.getDonorById);
router.post('/donors', donorController.createDonor);
router.put('/donors/:id', donorController.updateDonor);
router.delete('/donors/:id', donorController.deleteDonor);

module.exports = router;
