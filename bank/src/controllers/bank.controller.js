// calling log function
const { postResquest } = require("../api/api");
const logs = require("../common/logs.common");
// calling logic function
const { bankM, utrM, verifyM, addAdminBankM } = require("../models/bank.model");
// kyc
async function bankC(req, res) {
  const result = await bankM(req.body);
  logs(req.body, result, "bank");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "fseifjwo",
      data: result.message,
    });
  }
}
async function verifyC(req, res) {
  const result = await verifyM(req.body);
  logs(req.body, result, "verify");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "sdjfisosopd",
      data: result.message,
    });
  }
}
async function utrC(req, res) {
  const result = await utrM(req.body);
  logs(req.body, result, "utr");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "skmohiasta",
      data: result.message,
    });
  }
}
// add admin bank
async function addAdminBankC(req, res) {
  const result = await addAdminBankM(req.body);
  logs(req.body, result, "add admin bank");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "pakmvapoev",
      data: req.body,
    });
  }
}

module.exports = {
  bankC,
  verifyC,
  utrC,
  addAdminBankC,
};
