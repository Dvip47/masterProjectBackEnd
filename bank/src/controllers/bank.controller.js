// calling log function
const { postResquest } = require("../api/api");
const logs = require("../common/logs.common");
// calling logic function
const {
  bankM,
  utrM,
  verifyM,
  addAdminBankM,
  updateAdminBankM,
  verifyDepositeRecieptM,
  updateDepositeRecieptM,
  createWalletM,
} = require("../models/bank.model");
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
// update admin bank
async function updateAdminBankC(req, res) {
  const result = await updateAdminBankM(req.body);
  logs(req.body, result, "update admin bank");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "asaewepdov",
      data: req.body,
    });
  }
}
// update admin bank
async function verifyDepositeRecieptC(req, res) {
  const result = await verifyDepositeRecieptM(req);
  logs(req.body, result, "verify reciept");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "paisbvecmso",
      data: result.data,
    });
  }
}
// update desposite recipt
async function updateDepositeRecieptC(req, res) {
  const result = await updateDepositeRecieptM(req.body);
  logs(req.body, result, "update reciept");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "pasmcwpocyus",
      data: req.body,
    });
  }
}
// update desposite recipt
async function createWalletC(req, res) {
  const result = await createWalletM(req.body);
  logs(req.body, result, "create wallet");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "csjoiwpjo",
      data: req.body,
    });
  }
}

module.exports = {
  bankC,
  verifyC,
  utrC,
  addAdminBankC,
  updateAdminBankC,
  verifyDepositeRecieptC,
  updateDepositeRecieptC,
  createWalletC,
};
