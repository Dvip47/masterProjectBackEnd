// calling log function
const logs = require("../common/logs.common");
// calling logic function
const {
  getbanklistM,
  getWalletM,
  getUserBankM,
} = require("../models/bank.model");
// get admin bank list
async function getbanklistC(req, res) {
  const result = await getbanklistM(req.body);
  logs(req.body, result, "get admin bank list");
  return res.json(result).status(200);
}
async function getWalletC(req, res) {
  const result = await getWalletM(req.body);
  logs(req.body, result, "get wallet list");
  return res.json(result).status(200);
}
async function getUserBankC(req, res) {
  const result = await getUserBankM(req.body);
  logs(req.body, result, "get users bank");
  return res.json(result).status(200);
}
module.exports = {
  getbanklistC,
  getWalletC,
  getUserBankC,
};
