const express = require("express");
const UserRouter = express.Router();
const { Segments, celebrate, Joi } = require("celebrate");
const multer = require("multer");
const upload = multer();
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
    otp: Joi.any().required(),
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
  updateProfileC,
  updatePasswardC,
  securityC,
  verifysecurityC,
  verifyloginotpC,
  updateUserStatusC,
} = require("../controllers/user.controller");
const { getToken } = require("../auth/jwt/jwt");
UserRouter.post("/signup", celebrate(signupCelebrate), signupC);
UserRouter.post("/login", celebrate(loginCelebrate), loginC);
UserRouter.post("/forget", celebrate(forgetCelebrate), forgetC);
UserRouter.get("/verify", celebrate(verifyCelebrate), verifyC);
UserRouter.post("/reset", celebrate(resetCelebrate), resetC);
UserRouter.post(
  "/updateProfile",
  upload.single("image"),
  getToken,
  updateProfileC
);
UserRouter.post("/updatePassward", getToken, updatePasswardC);
UserRouter.post("/security", getToken, securityC);
UserRouter.post("/verifysecurity", getToken, verifysecurityC);
UserRouter.post("/verifyloginotp", verifyloginotpC);
UserRouter.post("/updateUserStatus", getToken, updateUserStatusC);
module.exports = UserRouter;
