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
} = require("../controllers/bank.controller");
BankRouter.post("/bank", bankC);
BankRouter.post("/verify", verifyC);
BankRouter.post("/utr", utrC);
BankRouter.post("/addAdminBank", addAdminBankC);
BankRouter.post("/updateAdminBank", updateAdminBankC);
BankRouter.post(
  "/verifyDepositeReciept",
  upload.single("reciept"),
  verifyDepositeRecieptC
);
BankRouter.post("/updateDepositeReciept", updateDepositeRecieptC);

module.exports = BankRouter;
