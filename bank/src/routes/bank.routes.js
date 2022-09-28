const express = require("express");
const BankRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
const multer = require("multer");
const upload = multer();
// calling functions
const {
  bankC,
  verifyC,
  utrC,
  updateAdminBankC,
  addAdminBankC,
  verifyDepositeRecieptC,
  updateDepositeRecieptC,
  createWalletC,
  transfferAmountFromAdminC,
  removeBankC,
} = require("../controllers/bank.controller");
BankRouter.post("/bank", getToken, bankC);
BankRouter.post("/verify", getToken, verifyC);
BankRouter.post("/utr", getToken, utrC);
BankRouter.post("/addAdminBank", getToken, addAdminBankC);
BankRouter.post("/updateAdminBank", getToken, updateAdminBankC);
BankRouter.post(
  "/verifyDepositeReciept",
  upload.single("reciept"),
  getToken,
  verifyDepositeRecieptC
);
BankRouter.post("/updateDepositeReciept", getToken, updateDepositeRecieptC);
BankRouter.post("/createWallet", getToken, createWalletC);
BankRouter.post(
  "/transfferAmountFromAdmin",
  getToken,
  transfferAmountFromAdminC
);
BankRouter.post("/removeBank", getToken, removeBankC);

module.exports = BankRouter;
