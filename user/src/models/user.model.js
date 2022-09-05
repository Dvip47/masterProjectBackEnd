const { postResquest } = require("../api/api");
const { setToken } = require("../auth/jwt/jwt");
const User = require("../db/schema/user.schema");
const bcrypt = require("bcrypt");
async function loginM(body) {
  try {
    // const validatePassward = await bcrypt.compare(userPassword, dbPasssward);
    const validatePassward = "";
    if (validatePassward) {
      return { message: data, success: true, token: null };
    } else {
      return { message: "Invalid passward", success: true, token: null };
    }
  } catch (error) {
    return {
      message: error?.response?.statusText,
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

module.exports = {
  loginM,
  signupM,
};

// // compare password
// async function comparePassword(plaintextPassword, hash) {
//   const result = await bcrypt.compare(plaintextPassword, hash);
//   return result;
// }
