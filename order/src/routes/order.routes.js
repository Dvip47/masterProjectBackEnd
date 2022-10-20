const express = require("express");
const OrderRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { placeC } = require("../controllers/Order.controller");

// Get game list

//  get token will validate your jwt token

OrderRouter.post("/place", getToken, placeC);

module.exports = OrderRouter;
