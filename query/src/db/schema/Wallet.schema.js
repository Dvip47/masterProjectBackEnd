const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    email: String,
    currency: String,
    active: Boolean,
    balance: Number,
    freezeAmount: Number,
    total: Number,
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
