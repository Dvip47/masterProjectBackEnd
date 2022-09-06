const express = require("express");
const UserRouter = express.Router();
const celebrate = require("celebrate");
// calling functions
const {
  loginC,
  signupC,
  forgetC,
  verifyC,
  resetC,
} = require("../controllers/user.controller");
UserRouter.post("/login", loginC);
UserRouter.post("/signup", signupC);
UserRouter.post("/forget", forgetC);
UserRouter.get("/verify", verifyC);
UserRouter.post("/reset", resetC);
module.exports = UserRouter;
