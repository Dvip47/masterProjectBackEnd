const mongoose = require("mongoose");

const AdminBankSchema = mongoose.Schema({
  bankName: String,
  accountNumber: Number,
  ifscCode: String,
  bankStatus: Boolean,
});

const AdminBank = mongoose.model("AdminBank", AdminBankSchema);

module.exports = AdminBank;
