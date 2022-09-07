const { setToken } = require("../auth/jwt/jwt");
const User = require("../db/schema/user.schema");
const bcrypt = require("bcrypt");
const sendEmail = require("../common/email.common");
const uploadDocs = require("../common/image.common");
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
    let token = await bcrypt.hash(body.email, 10);

    const data = {
      ...body,
      passward: hashedPassward,
      verified: false,
      token,
    };
    const user = await User.create(data);
    sendEmail(
      body.email,
      "Verify your email",
      "Click here to verify email !",
      `http://localhost:5000/user/v1/verify?token=${token}`
    );
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
    return { message: user, success: true, token: null };
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

module.exports = {
  loginM,
  signupM,
  forgetM,
  verifyM,
  resetM,
  updateProfileM,
  updatePasswardM,
};
