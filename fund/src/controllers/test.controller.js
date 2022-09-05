// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { TestM, GetDataM } = require("../models/test.model");
// test to get data
async function GetDataC(req, res) {
  console.log("Api name", req.body);
  const result = await GetDataM(req.body);
  console.log("Result--", result);
  logs(req.body, result, "Test -- File name");
  return res.json(result).status(200);
}
// test
async function TestC(req, res) {
  console.log("Api name", req.body);
  const result = await TestM();
  console.log("Result--", result);
  logs(req.body, result, "Test -- File name");
  return res.json(result).status(200);
}
module.exports = {
  TestC,
  GetDataC,
};
