const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    email: String,
    symbol: String,
    pair: String,
    quantity: Number,
    bidPrice: Number,
    marketPrice: Number,
    total: Number,
    status: String,
    orderType: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
