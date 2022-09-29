const mongoose = require("mongoose");

const UserLedgerSchema = mongoose.Schema(
  {
    email: String,
    symbol: String,
    amount: Number,
    Status: Boolean,
    utrDeduction: Number,
    finalAmount: Number,
    description: String,
    oldBalance: Number,
    newBalance: Number,
    type: String,
  },
  { timestamps: true }
);

const UserLedger = mongoose.model("UserLedger", UserLedgerSchema);

module.exports = UserLedger;
