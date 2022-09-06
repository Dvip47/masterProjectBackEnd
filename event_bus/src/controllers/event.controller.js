// calling log function
// const logs = require("../common/logs.common");
// calling logic function
const { eventM_P, eventM } = require("../models/event.model");
// test to get data
async function eventC_P(req, res) {
  const result = await eventM_P(req.body);
  return res.json(result).status(200);
}
// test
async function eventC(req, res) {
  const result = await eventM(req.body);
  return res.json(result).status(200);
}
module.exports = {
  eventC_P,
  eventC,
};
