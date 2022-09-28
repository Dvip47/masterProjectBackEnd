// calling log function
const { postResquest } = require("../api/api");
const logs = require("../common/logs.common");
// calling logic function
const { kycM, updateKycM } = require("../models/kyc.model");
// kyc
async function kycC(req, res) {
  const result = await kycM(req);
  logs(req.body, result, "kyc");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "oareoie",
      data: result.message,
    });
  }
}
// update kyc
async function updateKycC(req, res) {
  const result = await updateKycM(req.body);
  logs(req.body, result, "update Kyc");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "eoiruencw",
      data: req.body,
    });
  }
}

module.exports = {
  kycC,
  updateKycC,
};
