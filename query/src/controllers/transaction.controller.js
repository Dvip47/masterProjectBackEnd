// calling log function
// const logs = require("../common/logs.common");
// calling logic function
const { getAllDepositeTransactionM } = require("../models/transaction.model");
// get admin bank list
async function getAllDepositeTransactionC(req, res) {
  const result = await getAllDepositeTransactionM(req.body);
  //   logs(req.body, result, "get admin bank list");
  return res.json(result).status(200);
}

module.exports = {
  getAllDepositeTransactionC,
};
