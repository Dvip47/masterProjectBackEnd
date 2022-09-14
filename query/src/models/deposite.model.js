const VerifyDeposite = require("../db/schema/VerifyDepositeReciept.schema");
async function getDepositeDataM() {
  try {
    const deposite = await VerifyDeposite.find({});
    return { message: deposite, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  getDepositeDataM,
};
