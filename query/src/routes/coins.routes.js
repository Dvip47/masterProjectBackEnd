const express = require("express");
const CoinRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  getAllCoinC,
  updatePermissionC,
} = require("../controllers/coin.controller");

// Get game list

//  get token will validate your jwt token

CoinRouter.get("/getAllCoin", getToken, getAllCoinC);
CoinRouter.post("/updatePermission", getToken, updatePermissionC);
module.exports = CoinRouter;
