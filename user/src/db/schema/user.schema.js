const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: { type: Number, unique: true },
    code: Number,
    token: { type: String, index: true },
    passward: String,
    verified: Boolean,
    profileImg: String,
    security: String,
    loginOtp: Number,
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
