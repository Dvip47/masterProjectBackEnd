const { postResquestForRP } = require("../api/api");
const AdminBank = require("../db/schema/AdminBank");
const Bank = require("../db/schema/Bank.schema");

async function bankM(body) {
  try {
    await Bank.create(body);
    return {
      message: body,
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function verifyM(body) {
  try {
    let user = await Bank.findOne({ email: body.email });
    if (!user.email) {
      return { message: `User not found.`, flag: false };
    }
    let userBankInfo = {
      BeneID: "",
      Amount: 0,
      BeneName: "",
      BeneMobile: null,
      BeneAccountNumber: user.accountNumber,
      BankName: "STATE BANK OF INDIA",
      IFSC: user.ifscCode,
      BankID: 68,
      TransMode: 1,
      SenderMobile: body.mobile,
      ReferenceID: null,
      OTP: null,
      SPKey: "DMT",
      APIRequestID: user._id,
      UserID: 449,
      Token: process.env.BANK_TOKEN,
      Format: 0,
      OutletID: 11462,
      PartnerID: 0,
      LoginType: 0,
    };
    const dataCall = await postResquestForRP("VerifyAccount", userBankInfo);
    if (!dataCall.data || dataCall.data.statusCode === -1) {
      return {
        message: dataCall.data.message,
        success: false,
        token: null,
      };
    }
    let status = dataCall.data.status;
    if (status !== 2) {
      if (status === 1 || status === 5) {
        return {
          message: "We are unable to verify your bank, retry after sometime.",
          success: false,
          token: null,
        };
      } else if (status === 3) {
        let message = dataCall.data.message;
        if (message.includes("sufficient")) {
          return {
            message: "Failed due to technical glitch.",
            success: false,
            token: null,
          };
        } else {
          return { message: message, success: false, token: null };
        }
      } else {
        return { message: dataCall.data.message, success: false, token: null };
      }
    }
    let obj = {
      accountHolderName: dataCall.data.beneName,
      bankStatus: "pending",
      userBankUniqueId: process.env.USER_BANK_PREFIX + new Date().getTime(),
      utr: dataCall.data.liveID,
      bankActive: true,
    };
    let userBank = await Bank.findOneAndUpdate(
      {
        email: body.email,
        accountNumber: body.accountNumber,
      },
      obj,
      {
        upsert: true,
        returnDocument: "after",
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    if (!userBank.email) {
      return {
        message: "Failed to create Bank Entry.",
        success: false,
        token: null,
      };
    }
    return { message: userBank, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function utrM(body) {
  try {
    const user = await Bank.findOne({
      email: body.email,
      accountNumber: body.accountNumber,
    });
    if (user.utr == body.utr) {
      await Bank.findOneAndUpdate(
        { email: user.email, accountNumber: user.accountNumber },
        {
          $set: {
            bankStatus: "success",
          },
        }
      );
      return {
        message: {
          email: body.email,
          accountNumber: user.accountNumber,
          bankStatus: "success",
        },
        success: true,
        token: null,
      };
    } else {
      return {
        message: "Invalid UTR Number",
        success: false,
        token: null,
      };
    }
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function addAdminBankM(body) {
  try {
    await AdminBank.create(body);
    return { message: "bank added", success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  bankM,
  verifyM,
  utrM,
  addAdminBankM,
};
