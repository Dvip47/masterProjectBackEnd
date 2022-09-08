// calling log function
const { postResquest } = require("../api/api");
const logs = require("../common/logs.common");
// calling logic function
const { kycM } = require("../models/kyc.model");
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

module.exports = {
  kycC,
};
