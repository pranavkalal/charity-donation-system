const Donation = require('../models/Donation');

class DonationService {
  async getDonations() {
    return await Donation.find()
      .populate('donor', 'name email')
      .populate('campaign', 'title description');
  }

  async getDonationById(id) {
    return await Donation.findById(id);
  }

  async createDonation(data, userId) {
    const { amount, campaign } = data;
    if (!amount || !campaign) {
      throw new Error('Amount and campaign are required');
    }

    return await Donation.create({
      amount,
      campaign,
      donor: userId,
      status: 'completed',
      date: new Date(),
    });
  }

  async updateDonation(id, data) {
    return await Donation.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteDonation(id) {
    return await Donation.findByIdAndDelete(id);
  }

  async getUserDonations(userId) {
    return await Donation.find({ donor: userId })
      .populate('campaign', 'title description')
      .sort({ date: -1 });
  }

  async getDonationSummary(userId) {
    const donations = await Donation.find({ donor: userId }).sort({ date: -1 });

    if (!donations || donations.length === 0) {
      return {
        totalDonated: '$0.00',
        donationsCount: 0,
        lastDonationDate: 'N/A',
      };
    }

    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const totalDonated = `$${totalAmount.toFixed(2)}`;
    const donationsCount = donations.length;
    const lastDonationDate = donations[0].date
      ? new Date(donations[0].date).toLocaleDateString()
      : 'N/A';

    return {
      totalDonated,
      donationsCount,
      lastDonationDate,
    };
  }

  async getDonorLeaderboard() {
    return await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaign',
          foreignField: '_id',
          as: 'campaignInfo',
        },
      },
      { $unwind: { path: '$campaignInfo', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$donor',
          totalDonated: { $sum: '$amount' },
          donationCount: { $sum: 1 },
          lastCampaign: { $last: '$campaignInfo' },
          lastDonation: { $last: '$date' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'donor',
        },
      },
      { $unwind: '$donor' },
      {
        $project: {
          _id: 0,
          name: '$donor.name',
          email: '$donor.email',
          totalDonated: 1,
          donationCount: 1,
          campaign: { $ifNull: ['$lastCampaign.title', 'Unknown Campaign'] },
          lastDonation: 1,
        },
      },
      { $sort: { totalDonated: -1 } },
    ]);
  }
}

module.exports = DonationService;