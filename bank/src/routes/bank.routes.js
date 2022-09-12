const express = require("express");
const BankRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  bankC,
  verifyC,
  utrC,
  addAdminBankC,
} = require("../controllers/bank.controller");
BankRouter.post("/bank", bankC);
BankRouter.post("/verify", verifyC);
BankRouter.post("/utr", utrC);
BankRouter.post("/addAdminBank", addAdminBankC);

module.exports = BankRouter;
