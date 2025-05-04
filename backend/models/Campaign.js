const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  currency: { type: String, default: "USD" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  mediaUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);
