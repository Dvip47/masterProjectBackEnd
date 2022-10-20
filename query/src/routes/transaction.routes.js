const express = require("express");
const TransactionRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  getAllDepositeTransactionC,
  getAllCoinTransactionC,
  adminLedgerC,
  getAllDepositeDataC,
  getAllLedgerDataC,
} = require("../controllers/transaction.controller");

TransactionRouter.post(
  "/getAllDepositeTransaction",
  getToken,
  getAllDepositeTransactionC
);
TransactionRouter.get("/adminLedger", getToken, adminLedgerC);
TransactionRouter.post(
  "/getAllCoinTransaction",
  getToken,
  getAllCoinTransactionC
);
TransactionRouter.get("/getAllDepositeData", getToken, getAllDepositeDataC);
TransactionRouter.get("/getAllLedgerData", getToken, getAllLedgerDataC);
module.exports = TransactionRouter;
