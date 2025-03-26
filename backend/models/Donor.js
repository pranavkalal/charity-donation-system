const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    donationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }]
});

module.exports = mongoose.model("Donor", donorSchema);
