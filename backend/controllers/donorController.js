// controllers/donorController.js
const Donor = require('../models/Donor'); // Assuming you have a Donor model

// Get all donors
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donors', error });
  }
};

// Get donor by ID
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donor', error });
  }
};

// Create a new donor
exports.createDonor = async (req, res) => {
    try {
        const donor = await Donor.create(req.body);
        res.status(201).json(donor);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Update donor details
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating donor', error });
  }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json({ message: 'Donor deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donor', error });
  }
};
