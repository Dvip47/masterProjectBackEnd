// calling log function
const logs = require("../common/logs.common");
// calling logic function
const {
  getAllCoinM,
  updatePermissionM,
  getCoinBalanceM,
} = require("../models/coin.model");
// get admin bank list
async function getAllCoinC(req, res) {
  const result = await getAllCoinM();
  //   logs(req.body, result, "coin list");
  return res.json(result).status(200);
}
// update coin permission
async function updatePermissionC(req, res) {
  const result = await updatePermissionM(req.body);
  logs(req.body, result, "update coin permission");
  return res.json(result).status(200);
}
// get coin balance
async function getCoinBalanceC(req, res) {
  const result = await getCoinBalanceM(req.body);
  logs(req.body, result, "update coin permission");
  return res.json(result).status(200);
}

module.exports = {
  getAllCoinC,
  updatePermissionC,
  getCoinBalanceC,
};
