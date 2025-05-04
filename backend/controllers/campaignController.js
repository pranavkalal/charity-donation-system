const Campaign = require('../models/Campaign');

// Get all campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve campaigns', error: error.message });
  }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error: error.message });
  }
};

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      goalAmount,
      currency,
      startDate,
      endDate,
      status,
      mediaUrl
    } = req.body;

    if (!title || !description || !goalAmount || !startDate || !endDate) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      currency: currency || "USD",
      startDate,
      endDate,
      status: status || "Active",
      mediaUrl
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create campaign', error: error.message });
  }
};

// Update a campaign
const updateCampaign = async (req, res) => {
  try {
    const updatedData = req.body;

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update campaign', error: error.message });
  }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete campaign', error: error.message });
  }
};

module.exports = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
};
