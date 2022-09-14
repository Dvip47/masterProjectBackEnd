const express = require("express");
const DepositeRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { getDepositeDataC } = require("../controllers/deposite.controller");

// Get game list

//  get token will validate your jwt token

DepositeRouter.get("/getDepositeData", getDepositeDataC);

module.exports = DepositeRouter;
