const { getResquest } = require("../api/api");
const AdminBank = require("../db/schema/AdminBank");
const Bank = require("../db/schema/Bank.schema");
const User = require("../db/schema/User.schema");
const Wallet = require("../db/schema/Wallet.schema");
async function getbanklistM() {
  try {
    const bankList = await AdminBank.find({});
    return { message: bankList, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getWalletM(body) {
  try {
    const walletList = await Wallet.find({ email: body.email });
    return { message: walletList, success: true, token: null };
  } catch (error) {
    console.log(error);
    return { message: error, success: false, token: null };
  }
}
async function getUserBankM(body) {
  try {
    const bankList = await Bank.find({ email: body.email });
    return { message: bankList, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  getbanklistM,
  getWalletM,
  getUserBankM,
};
