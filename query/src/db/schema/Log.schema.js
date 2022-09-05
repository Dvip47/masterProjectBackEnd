const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  request: String,
  method: String,
  response: String,
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
