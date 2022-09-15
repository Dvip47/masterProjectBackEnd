const mongoose = require("mongoose");
const VerifyDepositeSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
    utr: Number,
    reciept: String,
    deposite: Number,
    accountNumber: Number,
    bankName: String,
    status: String,
    type: String,
    currency: String,
  },
  { timestamps: true }
);
const VerifyDeposite = mongoose.model("VerifyDeposite", VerifyDepositeSchema);
module.exports = VerifyDeposite;
