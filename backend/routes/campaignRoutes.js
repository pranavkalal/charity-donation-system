const campaignController = require('../controllers/campaignController');

const express = require('express');
const router = express.Router();
const { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign } = require('../controllers/campaignController');

// GET all campaigns & POST a new campaign
router.route('/').get(getCampaigns).post(createCampaign);

// GET, PUT, DELETE a campaign by ID
router.route('/:id').get(getCampaignById).put(updateCampaign).delete(deleteCampaign);

// Update campaign
router.put('/:id', campaignController.updateCampaign);

// Delete campaign
router.delete('/:id', campaignController.deleteCampaign);


module.exports = router;
