const express = require("express");
const KycRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { kycC, updateKycC } = require("../controllers/kyc.controller");
const multer = require("multer");
const upload = multer();

KycRouter.post(
  "/kyc",
  upload.fields([
    { name: "pan" },
    { name: "adharFront" },
    { name: "adharBack" },
    { name: "uniqueNumber" },
  ]),
  getToken,
  kycC
);
KycRouter.post("/updateKyc", getToken, updateKycC);

module.exports = KycRouter;
