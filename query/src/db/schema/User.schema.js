const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, index: true },
    passward: String,
    mobile: Number,
    code: Number,
    active: Boolean,
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
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;
