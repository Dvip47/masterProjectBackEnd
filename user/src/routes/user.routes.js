const express = require("express");
const UserRouter = express.Router();
const celebrate = require("celebrate");
// calling functions
const { loginC, signupC } = require("../controllers/user.controller");
UserRouter.post("/login", loginC);
UserRouter.post("/signup", signupC);
module.exports = UserRouter;
