const express = require("express");
const UserRouter = express.Router();
const celebrate = require("celebrate");
// calling functions
const { loginC, signupC, forgetC } = require("../controllers/user.controller");
UserRouter.post("/login", loginC);
UserRouter.post("/signup", signupC);
UserRouter.post("/forget", forgetC);
module.exports = UserRouter;
