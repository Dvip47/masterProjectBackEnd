// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { getDepositeDataM } = require("../models/deposite.model");
// get admin bank list
async function getDepositeDataC(req, res) {
  const result = await getDepositeDataM(req.body);
  logs(req.body, result, "get deposite amount");
  return res.json(result).status(200);
}
module.exports = {
  getDepositeDataC,
};
