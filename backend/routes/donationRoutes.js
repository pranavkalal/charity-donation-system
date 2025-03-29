const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getUserDonations
} = require('../controllers/donationController');

// GET all donations (optional, admin-only) & POST a donation
router.route('/').get(getDonations).post(protect, createDonation);

// GET current user's donations
router.get('/my', protect, getUserDonations);

// GET, PUT, DELETE donation by ID
router.route('/:id').get(getDonationById).put(updateDonation).delete(deleteDonation);

module.exports = router;
