const { getResquest } = require("../api/api");
const User = require("../db/schema/User.schema");
async function profileM(body) {
  try {
    const pipeline = [
      {
        $match: {
          email: body.email,
        },
      },
    ];
    const user = await User.aggregate(pipeline);
    return { message: user, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}
async function getAllUserM(body) {
  try {
    const getAllUser = await User.find({});
    return { message: getAllUser, success: true, token: null };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  profileM,
  getAllUserM,
};
