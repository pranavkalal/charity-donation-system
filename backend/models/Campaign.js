const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    endDate: { type: Date }
});

module.exports = mongoose.model("Campaign", campaignSchema);
