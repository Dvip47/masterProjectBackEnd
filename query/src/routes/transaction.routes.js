const express = require("express");
const TransactionRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  getAllDepositeTransactionC,
} = require("../controllers/transaction.controller");

// Get game list

//  get token will validate your jwt token

TransactionRouter.post(
  "/getAllDepositeTransaction",
  getToken,
  getAllDepositeTransactionC
);

module.exports = TransactionRouter;
