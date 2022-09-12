// calling log function
const logs = require("../common/logs.common");
// calling logic function
const {
  loginM,
  signupM,
  forgetM,
  verifyM,
  resetM,
  updateProfileM,
  updatePasswardM,
  securityM,
  verifysecurityM,
  verifyloginotpM,
} = require("../models/user.model");
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
// verify
async function verifyC(req, res) {
  const result = await verifyM(req.query);
  logs(req.body, result, "verify");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", { event: "sndlknva", data: result.message });
  }
}
// reset
async function resetC(req, res) {
  const result = await resetM(req.body);
  logs(req.body, result, "reset");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "vnjksd",
      data: result.message,
    });
  }
}
// update profile
async function updateProfileC(req, res) {
  const result = await updateProfileM(req);
  logs(req.body, result, "updateProfile");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "sdijspofij",
      data: result.message,
    });
  }
}
// update passward
async function updatePasswardC(req, res) {
  const result = await updatePasswardM(req.body);
  logs(req.body, result, "updatePassaward");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "difhjgvoda",
      data: result.message,
    });
  }
}
// security
async function securityC(req, res) {
  const result = await securityM(req.body);
  logs(req.body, result, "security");
  res.json(result).status(200);
}
// verify security
async function verifysecurityC(req, res) {
  const result = await verifysecurityM(req.body);
  logs(req.body, result, "security");
  res.json(result).status(200);
  if (result.success == true) {
    await postResquest("event", {
      event: "mdoifvjhvn",
      data: result.message,
    });
  }
}
// verify login otp
async function verifyloginotpC(req, res) {
  const result = await verifyloginotpM(req.body);
  logs(req.body, result, "verify login otp");
  res.json(result).status(200);
}

module.exports = {
  loginC,
  signupC,
  forgetC,
  verifyC,
  resetC,
  updateProfileC,
  updatePasswardC,
  securityC,
  verifysecurityC,
  verifyloginotpC,
};
