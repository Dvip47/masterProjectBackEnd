const express = require("express");
const UserRouter = express.Router();
const { Segments, celebrate, Joi } = require("celebrate");

const signupCelebrate = {
  [Segments.BODY]: Joi.object().keys({
    mobile: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    passward: Joi.string().required(),
    code: Joi.number().required(),
  }),
};
const loginCelebrate = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    passward: Joi.string().required(),
  }),
};
const forgetCelebrate = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
  }),
};
const resetCelebrate = {
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().required(),
    passward: Joi.string().required(),
  }),
};
const verifyCelebrate = {
  [Segments.QUERY]: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

// calling functions
const {
  loginC,
  signupC,
  forgetC,
  verifyC,
  resetC,
} = require("../controllers/user.controller");
UserRouter.post("/signup", celebrate(signupCelebrate), signupC);
UserRouter.post("/login", celebrate(loginCelebrate), loginC);
UserRouter.post("/forget", celebrate(forgetCelebrate), forgetC);
UserRouter.get("/verify", celebrate(verifyCelebrate), verifyC);
UserRouter.post("/reset", celebrate(resetCelebrate), resetC);
module.exports = UserRouter;
