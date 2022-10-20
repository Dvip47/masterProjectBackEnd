const { getResquest } = require("../api/api");
const Order = require("../db/schema/Order.schema");

async function placeM(body) {
  try {
    await Order.create(body);
    return { message: "Order Placed", success: true, token: null };
  } catch (error) {
    console.log(error);
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  placeM,
};
