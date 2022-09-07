// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { profileM } = require("../models/profile.model");

// profile data
async function profileC(req, res) {
  const result = await profileM(req.body);
  logs(req.body, result, "profile data");
  return res.json(result).status(200);
}
module.exports = {
  profileC,
};
