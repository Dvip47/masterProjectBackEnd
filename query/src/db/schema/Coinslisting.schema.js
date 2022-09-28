const mongoose = require("mongoose");

const CoinSchema = mongoose.Schema(
  {
    symbol: { type: String, index: true },
    askPrice: Number,
    bidPrice: Number,
    canDeposit: Boolean,
    canWithdrawal: Boolean,
    closePrice: Number,
    contractAddress: String,
    highPrice: Number,
    imgUrl: String,
    lowPrice: Number,
    network: String,
    openPrice: Number,
    status: String,
    percentageChange: String,
    charge: Number,
    maxDeposit: Number,
    maxWithdrawal: Number,
    minDeposit: Number,
    minWithdrawal: Number,
    quoteVolume: String,
    volume: String,
    listed: Number,
  },
  { timestamps: true }
);

const Coinlisting = mongoose.model("Coinlisting", CoinSchema);

module.exports = Coinlisting;
