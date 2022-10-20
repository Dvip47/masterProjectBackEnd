const express = require("express");
const OrderRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const {
  getMyOrdersC,
  getFilterSymbolDataC,
} = require("../controllers/order.controller");

OrderRouter.post("/getMyOrders", getToken, getMyOrdersC);
OrderRouter.post("/getFilterSymbolData", getToken, getFilterSymbolDataC);

module.exports = OrderRouter;
