const DonationService = require('../services/DonationService');
const donationService = new DonationService();

const getDonations = async (req, res) => {
  try {
    const donations = await donationService.getAllDonations();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve donations', error: error.message });
  }
};

const getDonationById = async (req, res) => {
  try {
    const donation = await donationService.getDonationById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error: error.message });
  }
};

const createDonation = async (req, res) => {
  try {
    const donation = await donationService.createDonation(req.body, req.user.id);
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create donation', error: error.message });
  }
};

const updateDonation = async (req, res) => {
  try {
    const donation = await donationService.updateDonation(req.params.id, req.body);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update donation', error: error.message });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const donation = await donationService.deleteDonation(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete donation', error: error.message });
  }
};

const getUserDonations = async (req, res) => {
  try {
    const donations = await donationService.getUserDonations(req.user.id);
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user donations', error: error.message });
  }
};

const getDonationSummary = async (req, res) => {
  try {
    const summary = await donationService.getDonationSummary(req.user.id);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve donation summary', error: error.message });
  }
};

const getDonorLeaderboard = async (req, res) => {
  try {
    const leaderboard = await donationService.getDonorLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get donor leaderboard', error: error.message });
  }
};

module.exports = {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getUserDonations,
  getDonationSummary,
  getDonorLeaderboard,
};