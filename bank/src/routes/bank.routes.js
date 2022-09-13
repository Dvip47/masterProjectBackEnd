const express = require("express");
const BankRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  bankC,
  verifyC,
  utrC,
  updateAdminBankC,
  addAdminBankC,
  verifyDepositeRecieptC,
} = require("../controllers/bank.controller");
BankRouter.post("/bank", bankC);
BankRouter.post("/verify", verifyC);
BankRouter.post("/utr", utrC);
BankRouter.post("/addAdminBank", addAdminBankC);
BankRouter.post("/updateAdminBank", updateAdminBankC);
BankRouter.post("/verifyDepositeReciept", verifyDepositeRecieptC);

module.exports = BankRouter;
