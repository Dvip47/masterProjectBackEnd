const express = require("express");
const TestRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { TestC, GetDataC } = require("../controllers/test.controller");

// Get game list

//  get token will validate your jwt token

TestRouter.get("/getData", GetDataC);
TestRouter.post("/test", getToken, TestC);

module.exports = TestRouter;
