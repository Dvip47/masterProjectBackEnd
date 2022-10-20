const UserLedger = require("../db/schema/UserLedger.schema");
const VerifyDeposite = require("../db/schema/VerifyDepositeReciept.schema");

async function getAllDepositeTransactionM(body) {
  try {
    const ledger = await UserLedger.find({
      email: body.email,
      mode: "deposite",
    });
    return { message: ledger, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getAllCoinTransactionM(body) {
  try {
    let pipeline = [
      {
        $match: {
          email: body.email,
          symbol: body.symbol,
        },
      },
    ];
    const ledger = await UserLedger.aggregate(pipeline);
    return { message: ledger, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function adminLedgerM(body) {
  try {
    const ledger = await UserLedger.find({});
    return { message: ledger, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getAllDepositeDataM() {
  try {
    const ledger = await VerifyDeposite.find({});
    return { message: ledger, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getAllLedgerDataM() {
  try {
    const ledger = await UserLedger.find({});
    return { message: ledger, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  getAllDepositeTransactionM,
  getAllCoinTransactionM,
  adminLedgerM,
  getAllDepositeDataM,
  getAllLedgerDataM,
};
