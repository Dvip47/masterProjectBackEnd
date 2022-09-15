const express = require("express");
const BankRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { getbanklistC, getWalletC } = require("../controllers/bank.controller");

// Get game list

//  get token will validate your jwt token

BankRouter.get("/getbanklist", getbanklistC);
BankRouter.post("/getWallet", getWalletC);

module.exports = BankRouter;
