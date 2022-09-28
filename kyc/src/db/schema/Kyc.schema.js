const mongoose = require("mongoose");

const KycSchema = mongoose.Schema(
  {
    email: String,
    adharBack: String,
    adharFront: String,
    kyc: String,
    pan: String,
    uniqueNumber: String,
    panNumber: String,
    adharNumber: Number,
  },
  { timestamps: true }
);

const Kyc = mongoose.model("Kyc", KycSchema);

module.exports = Kyc;
