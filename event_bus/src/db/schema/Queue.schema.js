const mongoose = require("mongoose");
const QueueSchema = mongoose.Schema({
  data: {},
  event: {},
});
const Queue = mongoose.model("Queue", QueueSchema);
module.exports = Queue;
