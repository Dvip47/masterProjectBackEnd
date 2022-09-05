const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  passward: String,
  mobile: Number,
  code: Number,
  active: Boolean,
  kyc: Boolean,
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
