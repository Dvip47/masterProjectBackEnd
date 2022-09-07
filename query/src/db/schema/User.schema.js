const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: { type: String, index: true },
  passward: String,
  mobile: Number,
  code: Number,
  active: Boolean,
  kyc: Boolean,
  verified: Boolean,
  profileImg: String,
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
