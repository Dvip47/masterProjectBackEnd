const { getResquest } = require("../api/api");
const User = require("../db/schema/User.schema");

const handleEvents = async (event, data) => {
  switch (event) {
    case "zxcvbnm":
      await User.create(data);
      break;
    default:
      break;
  }
};
async function eventM_P({ event, data }) {
  try {
    await handleEvents(event, data);
    return { message: "OK", success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function eventM() {
  try {
    return { message: data, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  eventM_P,
  eventM,
};