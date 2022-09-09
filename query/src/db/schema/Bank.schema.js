const mongoose = require("mongoose");

const BankSchema = mongoose.Schema({
  email: { type: String, index: true },
  bankName: String,
  accountNumber: Number,
  ifscCode: String,
  utr: String,
  accountHolderName: String,
  bankStatus: String,
  userBankUniqueId: String,
  bankActive: Boolean,
});

const Bank = mongoose.model("Bank", BankSchema);

module.exports = Bank;
