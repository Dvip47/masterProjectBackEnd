const { postResquest } = require("../api/api");
const Queue = require("../db/schema/Queue.schema");
async function eventM_P({ event, data }) {
  try {
    const res = await postResquest("event", { event, data });
    if (res.data?.success) {
      return { message: "done", success: true, token: null };
    } else {
      await Queue.create({ event, data });
      return {
        message: "Query service has been stopped , but data stored in queue",
        success: true,
        token: null,
      };
    }
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function eventM() {
  try {
    const queue = await Queue.find({});
    return { message: queue, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
module.exports = {
  eventM_P,
  eventM,
};
