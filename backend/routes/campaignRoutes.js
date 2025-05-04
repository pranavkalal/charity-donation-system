const express = require('express');
const router = express.Router();
const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Public routes
router.route('/').get(getCampaigns);
router.route('/:id').get(getCampaignById);

// Admin-only routes
router.route('/').post(protect, adminOnly, createCampaign);
router.route('/:id')
  .put(protect, adminOnly, updateCampaign)
  .delete(protect, adminOnly, deleteCampaign);

module.exports = router;
