const { getResquest } = require("../api/api");
const AdminBank = require("../db/schema/AdminBank");
const User = require("../db/schema/User.schema");
async function getbanklistM() {
  try {
    const bankList = await AdminBank.find({});
    return { message: bankList, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  getbanklistM,
};
