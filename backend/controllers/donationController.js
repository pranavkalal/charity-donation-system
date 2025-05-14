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
      donor: req.user.id,  // Automatically set from logged-in user
      status: 'completed',
      date: new Date()
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

// Get donation summary for current user
const getDonationSummary = async (req, res) => {
  try {
    // Get all donations for the current user
    const donations = await Donation.find({ donor: req.user.id })
      .sort({ date: -1 });
    
    if (!donations || donations.length === 0) {
      return res.status(200).json({
        totalDonated: "$0.00",
        donationsCount: 0,
        lastDonationDate: "N/A"
      });
    }
    
    // Calculate total amount donated
    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
    
    // Format as currency
    const totalDonated = "$" + totalAmount.toFixed(2);
    
    // Count of donations
    const donationsCount = donations.length;
    
    // Most recent donation date
    const lastDonationDate = donations[0].date 
      ? new Date(donations[0].date).toLocaleDateString() 
      : "N/A";
    
    res.status(200).json({
      totalDonated,
      donationsCount,
      lastDonationDate
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to retrieve donation summary', 
      error: error.message 
    });
  }
};

// Get donor leaderboard
const getDonorLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Donation.aggregate([
      {
        $match: { status: 'completed' } // Only include completed donations
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaign',
          foreignField: '_id',
          as: 'campaignInfo'
        }
      },
      {
        $unwind: {
          path: '$campaignInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$donor',
          totalDonated: { $sum: '$amount' },
          donationCount: { $sum: 1 },
          // Store campaign info from the last donation
          lastCampaign: { $last: '$campaignInfo' },
          // Store the date of the last donation
          lastDonation: { $last: '$date' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'donor'
        }
      },
      {
        $unwind: '$donor'
      },
      {
        $project: {
          _id: 0,
          name: '$donor.name',
          email: '$donor.email',
          totalDonated: 1,
          donationCount: 1,
          campaign: { $ifNull: ['$lastCampaign.title', 'Unknown Campaign'] },
          lastDonation: 1
        }
      },
      {
        $sort: { totalDonated: -1 }
      }
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
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
  getDonorLeaderboard
};
