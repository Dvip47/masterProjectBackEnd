const express = require("express");
const KycRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { kycC } = require("../controllers/kyc.controller");
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
  kycC
);

module.exports = KycRouter;
