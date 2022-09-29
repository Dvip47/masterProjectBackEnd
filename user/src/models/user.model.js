const { setToken } = require("../auth/jwt/jwt");
const User = require("../db/schema/user.schema");
const bcrypt = require("bcrypt");
const sendEmail = require("../common/email.common");
const uploadDocs = require("../common/image.common");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
function generate(n) {
  var add = 1,
    max = 12 - add;
  if (n > max) generate(max) + generate(n - max);
  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return ("" + number).substring(add);
}
async function verify2fa(otp) {
  let result = speakeasy.totp.verify({
    secret: ">Nw>X%eWGWg?F#X3#@ZD1<O5/mm%N{p{",
    encoding: "ascii",
    token: otp,
  });
  return result;
}
async function enable2fa() {
  let secret = speakeasy.generateSecret({
    name: "RoundPay",
  });
  console.log(secret);
  let url = await qrcode.toDataURL(secret.otpauth_url);
  return url;
}
async function loginM({ email, passward }) {
  try {
    const user = await User.findOne({ email });
    if (user?.name) {
      const validatePassward = await bcrypt.compare(passward, user.passward);
      if (validatePassward) {
        if (user.security == "email") {
          let otp = generate(6);
          sendEmail(
            body.email,
            "Auth Change verification",
            `Your Auth verification OTP is ${otp}`,
            "#"
          );
          return { message: "OTP sent", success: true, token: null };
        } else if (user.security == "2fa") {
          return {
            message: "OTP sent to google Authenticator",
            success: true,
            token: null,
          };
        } else {
          const token = await setToken(user);
          return { message: user, success: true, token };
        }
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
    let token = await bcrypt.hash(body.email, 10);
    const data = {
      ...body,
      passward: hashedPassward,
      verified: false,
      token,
      security: "none",
      role: "user",
    };
    const user = await User.create(data);
    // sendEmail(
    //   body.email,
    //   "Verify your email",
    //   "Click here to verify email !",
    //   `http://localhost:5000/user/v1/verify?token=${token}`
    // );
    return { message: user, success: true, token: null };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function forgetM(body) {
  try {
    const user = await User.findOne({ email: body.email });
    if (user?.email) {
      let token = await bcrypt.hash(body.email, 10);
      const message = "Click on link to change passward !";
      const subject = "Reset Password";
      await sendEmail(
        body.email,
        subject,
        message,
        `http://localhost:3000/travelRxReset${token.slice(15)}`
      );
      await User.findOneAndUpdate(
        { email: body.email },
        { $set: { token: token.slice(15) } }
      );
      return { message: "mail sent", success: true, token: null };
    } else {
      return { message: "user not found", success: false, token: null };
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function verifyM(query) {
  try {
    const { token } = query;
    const user = await User.findOneAndUpdate(
      { token },
      {
        $set: { verified: true },
      }
    );
    return { message: "Verified", success: true, token: null };
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function resetM(body) {
  try {
    const user = await User.findOne({ token: body.token });
    if (user?.email) {
      let hashedPassward = await bcrypt.hash(body.passward, 10);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            passward: hashedPassward,
            token: "",
          },
        }
      );

      return {
        message: { ...updatedUser?._doc, passward: hashedPassward },
        success: true,
        token: null,
      };
    } else {
      return { message: "Invalid request", success: false, token: null };
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function updateProfileM(req) {
  try {
    let file = req.file;
    if (file?.fieldname) {
      const res = await uploadDocs(req);
      const profileImg = res.message;
      await User.findOneAndUpdate(
        { email: req.body.email },
        { ...req.body, profileImg },
        {
          returnDocument: "after",
          new: true,
        }
      );
      return {
        message: { ...req.body, profileImg },
        success: true,
        token: null,
      };
    } else {
      await User.findOneAndUpdate({ email: req.body.email }, req.body, {
        returnDocument: "after",
        new: true,
      });
      return { message: req.body, success: true, token: null };
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function updatePasswardM(body) {
  try {
    const user = await User.findOne({ email: body.email });
    const validatePassward = await bcrypt.compare(
      body.opassward,
      user.passward
    );
    if (validatePassward) {
      let hashedPassward = await bcrypt.hash(body.passward, 10);
      await User.findOneAndUpdate(
        { email: body.email },
        { passward: hashedPassward },
        {
          returnDocument: "after",
          new: true,
        }
      );
      sendEmail(
        body.email,
        "Reset Password",
        "Your Password is changed !",
        `If this action is not taken by you, Please contact customer service `
      );
      return {
        message: { email: body.email, passward: hashedPassward },
        success: true,
        token: null,
      };
    } else {
      return {
        message: "Wrong passward",
        success: false,
        token: null,
      };
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function securityM(body) {
  try {
    let message = "";
    let otp = generate(6);
    if (body.previous == "none") {
      message = `Your Auth verification OTP is ${otp}`;
    } else if (body.previous == "email") {
      message = `Your Auth verification OTP is ${otp}`;
    } else {
      message = "Someone trying to change your security settings";
    }
    sendEmail(body.email, "Auth Change verification", message, "#");
    await User.findOneAndUpdate(
      { email: body.email },
      { loginOtp: otp },
      {
        returnDocument: "after",
        new: true,
      }
    );
    return {
      message: "Otp sent",
      success: true,
      token: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function verifysecurityM(body) {
  try {
    if (body.previous == "email" || body.previous == "none") {
      let user = await User.findOne({ email: body.email });
      if (user.loginOtp == body.otp) {
        await User.findOneAndUpdate(
          { email: body.email },
          { security: body.security },
          {
            returnDocument: "after",
            new: true,
          }
        );
        if (body.security == "2fa") {
          let twoFA = await enable2fa();
          return {
            message: { email: body.email, security: body.security, url: twoFA },
            success: true,
            token: null,
          };
        } else {
          return {
            message: { email: body.email, security: body.security, url: "" },
            success: true,
            token: null,
          };
        }
      } else {
        return {
          message: "Invalid OTP",
          success: false,
          token: null,
        };
      }
    } else {
      let result = await verify2fa(String(body.otp));
      if (result) {
        await User.findOneAndUpdate(
          { email: body.email },
          { security: body.security },
          {
            returnDocument: "after",
            new: true,
          }
        );
        return {
          message: { email: body.email, security: body.security },
          success: true,
          token: null,
        };
      } else {
        return {
          message: "Invalid OTP",
          success: false,
          token: null,
        };
      }
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function verifyloginotpM(body) {
  try {
    const user = await User.findOne({ email: body.email });
    const token = await setToken(user);
    if (user.email) {
      if (user.security == "email") {
        if (user.loginOtp == body.otp) {
          return {
            message: user,
            success: true,
            token,
          };
        } else {
          return {
            message: "Invalid OTP",
            success: false,
            token: null,
          };
        }
      } else {
        let result = await verify2fa(body.otp);
        if (result) {
          return {
            message: user,
            success: true,
            token,
          };
        } else {
          return {
            message: "Invalid OTP",
            success: false,
            token: null,
          };
        }
      }
    } else {
      return {
        message: "User not Found",
        success: false,
        token: null,
      };
    }
  } catch (error) {
    return {
      message: error,
      success: false,
      token: null,
    };
  }
}
async function updateUserStatusM(body) {
  try {
    await User.findOneAndUpdate({ email: body.email }, body);
    return {
      message: "Detail updated",
      success: true,
      token: null,
    };
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
  forgetM,
  verifyM,
  resetM,
  updateProfileM,
  updatePasswardM,
  securityM,
  verifysecurityM,
  verifyloginotpM,
  updateUserStatusM,
};
