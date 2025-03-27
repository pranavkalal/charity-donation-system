const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

// Correct routes (already prefixed with /api/donors)
router.get('/', donorController.getDonors);
router.get('/:id', donorController.getDonorById);
router.post('/', donorController.createDonor);
router.put('/:id', donorController.updateDonor);
router.delete('/:id', donorController.deleteDonor);

module.exports = router;
