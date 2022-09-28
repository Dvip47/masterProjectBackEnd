const bodyParser = require("body-parser");
const Coinlisting = require("../db/schema/Coinslisting.schema");
async function getAllCoinM() {
  try {
    const coinList = await Coinlisting.find({});
    return { message: coinList, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function updatePermissionM(body) {
  try {
    await Coinlisting.findOneAndUpdate({ symbol: body.symbol }, body);
    return { message: "Permission Updated", success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  getAllCoinM,
  updatePermissionM,
};
