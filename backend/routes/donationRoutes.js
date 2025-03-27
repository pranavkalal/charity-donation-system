const express = require('express');
const router = express.Router();
const { getDonations, getDonationById, createDonation, updateDonation, deleteDonation } = require('../controllers/donationController');

// GET all donations & POST a new donation
router.route('/').get(getDonations).post(createDonation);

// GET, PUT, DELETE a donation by ID
router.route('/:id').get(getDonationById).put(updateDonation).delete(deleteDonation);

module.exports = router;
