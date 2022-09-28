const express = require("express");
const ProfileRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { profileC, getAllUserC } = require("../controllers/profile.controller");

// Get game list

//  get token will validate your jwt token

ProfileRouter.post("/profile", getToken, profileC);
ProfileRouter.get("/getAllUser", getToken, getAllUserC);

module.exports = ProfileRouter;
