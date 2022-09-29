const mongoose = require("mongoose");

const UserLedgerSchema = mongoose.Schema(
  {
    email: String,
    symbol: String,
    amount: Number,
    Status: String,
    utrDeduction: Number,
    finalAmount: Number,
    description: String,
    oldBalance: Number,
    newBalance: Number,
    type: String,
    utr: Number,
    mode: String,
  },
  { timestamps: true }
);

const UserLedger = mongoose.model("UserLedger", UserLedgerSchema);

module.exports = UserLedger;
