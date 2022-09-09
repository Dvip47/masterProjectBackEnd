// const { getResquest } = require("../api/api");
const Bank = require("../db/schema/Bank.schema");
const User = require("../db/schema/User.schema");
const handleEvents = async (event, data) => {
  switch (event) {
    case "zxcvbnm":
      await User.create(data);
      break;
    case "sndlknva":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { verified: true },
        }
      );
      break;
    case "vnjksd":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { passward: data.passward },
        }
      );
      break;
    case "sdijspofij":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { ...data },
        }
      );
      break;
    case "difhjgvoda":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { passward: data.passward },
        }
      );
      break;
    case "oareoie":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            pan: data.pan,
            adharFront: data.adharFront,
            adharBack: data.adharBack,
            uniqueNumber: data.uniqueNumber,
            kyc: "pending",
          },
        }
      );
      break;
    case "fseifjwo":
      await Bank.create(data);
      break;
    case "sdjfisosopd":
      await Bank.findOneAndUpdate(
        { email: data.email, accountNumber: data.accountNumber },
        {
          $set: {
            accountHolderName: data.accountHolderName,
            bankStatus: data.bankStatus,
            userBankUniqueId: data.userBankUniqueId,
            bankActive: data.bankActive,
            utr: data.utr,
          },
        }
      );
      break;
    case "skmohiasta":
      await Bank.findOneAndUpdate(
        { email: data.email, accountNumber: data.accountNumber },
        {
          $set: {
            bankStatus: data.bankStatus,
          },
        }
      );
      break;
    case "mdoifvjhvn":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            security: data.security,
          },
        }
      );
      break;
    default:
      break;
  }
};
async function eventM_P({ event, data }) {
  try {
    await handleEvents(event, data);
    return { message: "OK", success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function eventM() {
  try {
    return { message: data, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  eventM_P,
  eventM,
};
