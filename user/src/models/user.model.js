const { setToken } = require("../auth/jwt/jwt");
const User = require("../db/schema/user.schema");
const bcrypt = require("bcrypt");
const sendEmail = require("../common/email.common");
async function loginM({ email, passward }) {
  try {
    const user = await User.findOne({ email });
    if (user?.name) {
      const validatePassward = await bcrypt.compare(passward, user.passward);
      if (validatePassward) {
        const token = await setToken(user);
        return { message: "User indentified", success: true, token };
      } else {
        return { message: "Invalid details", success: true, token: null };
      }
    } else {
      return { message: "User not found", success: true, token: null };
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function signupM(body) {
  try {
    let hashedPassward = await bcrypt.hash(body.passward, 10);
    const data = {
      ...body,
      passward: hashedPassward,
      verified: false,
    };
    const user = await User.create(data);
    return { message: user, success: true, token: null };
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function forgetM(body) {
  try {
    const message = "Click on link to change passward ";
    const subject = "Reset Password";
    await sendEmail(body.email, subject, message);
    return { message: "mail sent", success: true, token: null };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
module.exports = {
  loginM,
  signupM,
  forgetM,
};
