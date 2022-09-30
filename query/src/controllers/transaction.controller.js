// calling log function
// const logs = require("../common/logs.common");
// calling logic function
const {
  getAllDepositeTransactionM,
  getAllCoinTransactionM,
} = require("../models/transaction.model");
// get all deposite transaction
async function getAllDepositeTransactionC(req, res) {
  const result = await getAllDepositeTransactionM(req.body);
  return res.json(result).status(200);
}
// get all currency transaction report
async function getAllCoinTransactionC(req, res) {
  const result = await getAllCoinTransactionM(req.body);
  return res.json(result).status(200);
}

module.exports = {
  getAllDepositeTransactionC,
  getAllCoinTransactionC,
};
