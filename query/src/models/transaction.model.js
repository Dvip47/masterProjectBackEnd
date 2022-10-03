const UserLedger = require("../db/schema/UserLedger.schema");

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

async function getAllDepositeTransactionMForAdminM(body) {
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
  getAllDepositeTransactionMForAdminM,
};
