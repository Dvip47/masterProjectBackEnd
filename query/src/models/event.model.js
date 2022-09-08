// const { getResquest } = require("../api/api");
const User = require("../db/schema/User.schema");

const handleEvents = async (event, data) => {
  switch (event) {
    case "zxcvbnm":
      await User.create(data);
      break;
    case "sndlknva":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { verified: true },
        }
      );
      break;
    case "vnjksd":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { passward: data.passward },
        }
      );
      break;
    case "sdijspofij":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { ...data },
        }
      );
      break;
    case "difhjgvoda":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: { passward: data.passward },
        }
      );
      break;
    case "oareoie":
      await User.findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            pan: data.pan,
            adharFront: data.adharFront,
            adharBack: data.adharBack,
            uniqueNumber: data.uniqueNumber,
            kyc: "pending",
          },
        }
      );
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
