const Donation = require('../models/Donation');

// Get all donations
// const getDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find();
//     res.status(200).json(donations);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve donations', error: error.message });
//   }
// };
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'name email')         // only show name/email
      .populate('campaign', 'title description'); // only show title/desc
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve donations', error: error.message });
  }
};

// Get donation by ID
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error: error.message });
  }
};

// Create a new donation
const createDonation = async (req, res) => {
  try {
    const { amount, campaign } = req.body;

    if (!amount || !campaign) {
      return res.status(400).json({ message: 'Amount and campaign are required' });
    }

    const donation = await Donation.create({
      amount,
      campaign,
      donor: req.user.id  // Automatically set from logged-in user
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create donation', error: error.message });
  }
};


// Update a donation
const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update donation', error: error.message });
  }
};

// Delete a donation
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete donation', error: error.message });
  }
};
// Get donations by current user
const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .populate('campaign', 'title description') // for user donations, no need for donor field
      .sort({ date: -1 });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user donations', error: error.message });
  }
};

module.exports = {
  getDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getUserDonations
};
