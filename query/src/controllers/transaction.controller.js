// calling log function
// const logs = require("../common/logs.common");
// calling logic function
const {
  getAllDepositeTransactionM,
  getAllCoinTransactionM,
  getAllDepositeTransactionMForAdminM,
} = require("../models/transaction.model");
// get all deposite transaction for users
async function getAllDepositeTransactionC(req, res) {
  const result = await getAllDepositeTransactionM(req.body);
  return res.json(result).status(200);
}
// get all deposite transaction for admin
async function getAllDepositeTransactionMForAdminC(req, res) {
  const result = await getAllDepositeTransactionMForAdminM(req.body);
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
  getAllDepositeTransactionMForAdminC,
};
