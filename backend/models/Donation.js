const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);
