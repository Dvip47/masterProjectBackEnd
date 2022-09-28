const express = require("express");
const BankRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  getbanklistC,
  getWalletC,
  getUserBankC,
} = require("../controllers/bank.controller");

// Get game list

//  get token will validate your jwt token

BankRouter.get("/getbanklist", getToken, getbanklistC);
BankRouter.post("/getWallet", getToken, getWalletC);
BankRouter.post("/getUserBank", getToken, getUserBankC);

module.exports = BankRouter;
