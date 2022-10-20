// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { getMyOrdersM, getFilterSymbolDataM } = require("../models/order.model");

async function getMyOrdersC(req, res) {
  const result = await getMyOrdersM(req.body);
  // logs(req.body, result, "myorders");
  return res.json(result).status(200);
}
async function getFilterSymbolDataC(req, res) {
  const result = await getFilterSymbolDataM(req.body);
  // logs(req.body, result, "myorders");
  return res.json(result).status(200);
}
module.exports = {
  getMyOrdersC,
  getFilterSymbolDataC,
};
