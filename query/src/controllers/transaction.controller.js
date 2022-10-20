// calling log function
// const logs = require("../common/logs.common");
// calling logic function

const {
  getAllDepositeTransactionM,
  getAllCoinTransactionM,
  adminLedgerM,
  getAllDepositeDataM,
  getAllLedgerDataM,
} = require("../models/transaction.model");
// get all deposite transaction for users
async function getAllDepositeTransactionC(req, res) {
  const result = await getAllDepositeTransactionM(req.body);
  return res.json(result).status(200);
}
// get all ledger transaction for admin
async function adminLedgerC(req, res) {
  const result = await adminLedgerM(req.body);
  return res.json(result).status(200);
}
// get all currency transaction report
async function getAllCoinTransactionC(req, res) {
  const result = await getAllCoinTransactionM(req.body);
  return res.json(result).status(200);
}
// get all deposite transaction report
async function getAllDepositeDataC(req, res) {
  const result = await getAllDepositeDataM(req.body);
  return res.json(result).status(200);
}
// get all ledger report
async function getAllLedgerDataC(req, res) {
  const result = await getAllLedgerDataM(req.body);
  return res.json(result).status(200);
}

module.exports = {
  getAllDepositeTransactionC,
  getAllCoinTransactionC,
  adminLedgerC,
  getAllDepositeDataC,
  getAllLedgerDataC,
};
