const express = require('express');
const router = express.Router();

// ✅ FIX: Make sure all handlers are imported properly
const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaignController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// ✅ FIXED: Combined route and made sure all functions exist
router.route('/')
  .get(getCampaigns)
  .post(protect, adminOnly, createCampaign);

router.route('/:id')
  .get(getCampaignById)
  .put(protect, adminOnly, updateCampaign)
  .delete(protect, adminOnly, deleteCampaign);

module.exports = router;
