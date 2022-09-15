const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    email: String,
    wallet: [],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
