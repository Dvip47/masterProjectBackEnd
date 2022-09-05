// calling log function
const logs = require("../common/logs.common");
// calling logic function
const { loginM, signupM, forgetM } = require("../models/user.model");
const { postResquest } = require("../api/api");
// login
async function loginC(req, res) {
  const result = await loginM(req.body);
  logs(req.body, result, "login");
  return res.json(result).status(200);
}
// signup
async function signupC(req, res) {
  const result = await signupM(req.body);
  logs(req.body, result, "signup");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", { event: "zxcvbnm", data: result.message });
  }
}
// forget
async function forgetC(req, res) {
  const result = await forgetM(req.body);
  logs(req.body, result, "forget");
  res.json(result).status(200);
}
module.exports = {
  loginC,
  signupC,
  forgetC,
};
