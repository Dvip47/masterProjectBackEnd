const { postResquestForRP } = require("../api/api");
const AdminBank = require("../db/schema/AdminBank");
const Bank = require("../db/schema/Bank.schema");
const VerifyDeposite = require("../db/schema/VerifyDeposite.schema");
const uploadDocs = require("../common/image.common");
const Wallet = require("../db/schema/Wallet.schema");
const sendEmail = require("../common/email.common");
async function bankM(body) {
  try {
    await Bank.create(body);
    return {
      message: "Bank step 1 cleared",
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
async function updateAdminBankM(body) {
  try {
    await AdminBank.findOneAndUpdate({ accountNumber: body.ACNO }, body);
    return { message: "Bank Updated", success: true, token: null };
  } catch (error) {
    console.log(error);
    return { message: error, success: false, token: null };
  }
}
async function verifyDepositeRecieptM(req) {
  try {
    const res = await uploadDocs(req);
    await VerifyDeposite.create({
      ...req.body,
      reciept: res.message,
      type: "money",
      currency: "inr",
    });
    return {
      message: "Request Submitted",
      success: true,
      token: null,
      data: {
        ...req.body,
        reciept: res.message,
        type: "money",
        currency: "inr",
      },
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function updateDepositeRecieptM(body, ip) {
  try {
    let response = await VerifyDeposite.findOneAndUpdate(
      { utr: body.utr },
      {
        status: body.status,
        description: body.description,
        actionTaken: body.actionTaken,
        ip,
      }
    );
    let message = "";
    if (body.status == "approve") {
      let pipeline = [
        {
          $set: {
            balance: {
              $add: ["$balance", Number(body.balance)],
            },
            total: {
              $add: ["$total", Number(body.balance)],
            },
          },
        },
      ];
      await Wallet.updateOne(
        { email: body.email, currency: body.currency },
        pipeline
      );
      message = `Your amount of ${body.balance} is deposited`;
    } else {
      message = `Your amount of ${body.balance} is not deposited`;
    }
    // sendEmail(body.email, "Deposite Update", message);
    return {
      message: "Request updated",
      data: response,
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function createWalletM(body) {
  try {
    await Wallet.create({
      email: body.email,
      currency: "INR",
      balance: 0,
      freezeAmount: 0,
      total: 0,
      active: true,
    });
    return {
      message: "Wallet created",
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function transfferAmountFromAdminM(body) {
  try {
    let pipeline = [
      {
        $set: {
          balance: {
            $add: ["$balance", Number(body.amount)],
          },
          total: {
            $add: ["$total", Number(body.amount)],
          },
        },
      },
    ];

    await Wallet.updateOne(
      { email: body.email, currency: body.currency },
      pipeline
    );
    return {
      message: "Amount transfffered",
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function removeBankM(body) {
  try {
    await Bank.findOneAndUpdate(
      { email: body.email, accountNumber: body.accountNumber },
      {
        $set: {
          bankActive: false,
        },
      }
    );
    return {
      message: "Bank removed",
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  bankM,
  verifyM,
  utrM,
  addAdminBankM,
  updateAdminBankM,
  verifyDepositeRecieptM,
  updateDepositeRecieptM,
  createWalletM,
  transfferAmountFromAdminM,
  removeBankM,
};
