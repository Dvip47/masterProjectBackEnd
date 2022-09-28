const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, index: true },
    passward: String,
    mobile: Number,
    code: Number,
    kyc: Boolean,
    verified: Boolean,
    profileImg: String,
    pan: String,
    adharFront: String,
    adharBack: String,
    uniqueNumber: String,
    kyc: String,
    security: String,
    role: String,
    balance: Number,
    active: Boolean,
    canDeposite: Boolean,
    canWithdraw: Boolean,
    panNumber: String,
    adharNumber: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;
