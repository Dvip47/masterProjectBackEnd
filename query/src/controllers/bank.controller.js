// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { getbanklistM } = require("../models/bank.model");
// get admin bank list
async function getbanklistC(req, res) {
  const result = await getbanklistM(req.body);
  logs(req.body, result, "get admin bank list");
  return res.json(result).status(200);
}
module.exports = {
  getbanklistC,
};
