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

  //route to handle donation updates (used by MockPaymentForm)
router.post('/:id/donate', async (req, res) => {
  const { amount } = req.body;

  try {
    const campaign = await require('../models/Campaign').findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.raisedAmount += amount;
    await campaign.save();

    res.status(200).json({ message: 'Donation successful', updated: campaign });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ message: 'Failed to update donation amount' });
  }
});


module.exports = router;

