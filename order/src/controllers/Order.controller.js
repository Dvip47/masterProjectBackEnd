// calling log function
const { postResquest } = require("../api/api");
const logs = require("../common/logs.common");
// calling logic function
const { placeM } = require("../models/Order.model");

// test
async function placeC(req, res) {
  const result = await placeM(req?.body);
  logs(req.body, result, "place");
  res.json(result).status(200);
  if (result.success) {
    await postResquest("event", {
      event: "ewuychucs",
      data: req.body,
    });
  }
}
module.exports = {
  placeC,
};
