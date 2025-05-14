const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

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
router.post('/:id/donate', protect, async (req, res) => {
  const { amount } = req.body;
  const campaignId = req.params.id;

  try {
    // Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // 1. Create the donation record
    const donation = await Donation.create({
      amount: parseFloat(amount),
      campaign: campaignId,
      donor: req.user.id,  // This comes from the protect middleware
      status: 'completed',
      date: new Date()
    });

    // 2. Update the campaign's raised amount
    campaign.raisedAmount += parseFloat(amount);
    await campaign.save();

    res.status(200).json({ message: 'Donation successful', donation, campaign });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ message: 'Failed to update donation amount', error: error.message });
  }
});


module.exports = router;

