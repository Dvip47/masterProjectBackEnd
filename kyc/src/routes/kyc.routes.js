const express = require("express");
const ProfileRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { ProfileC } = require("../controllers/kyc.controller");
const multer = require("multer");
const upload = multer();
// Get game list

//  get token will validate your jwt token

ProfileRouter.post("/profile", upload.single("image"), ProfileC);

module.exports = ProfileRouter;
