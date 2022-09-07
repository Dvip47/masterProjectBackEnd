// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { ProfileM } = require("../models/kyc.model");
// test to get data
async function ProfileC(req, res) {
  const result = await ProfileM(req);
  logs(req.body, result, "profile");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "oareoie",
      data: result.message,
    });
  }
}

module.exports = {
  ProfileC,
};
