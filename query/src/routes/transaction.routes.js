const express = require("express");
const TransactionRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  getAllDepositeTransactionC,
  getAllCoinTransactionC,
  getAllDepositeTransactionMForAdminC,
} = require("../controllers/transaction.controller");

TransactionRouter.post(
  "/getAllDepositeTransaction",
  getToken,
  getAllDepositeTransactionC
);
TransactionRouter.get(
  "/getAllDepositeTransactionMForAdmin",
  getToken,
  getAllDepositeTransactionMForAdminC
);
TransactionRouter.post(
  "/getAllCoinTransaction",
  getToken,
  getAllCoinTransactionC
);

module.exports = TransactionRouter;
