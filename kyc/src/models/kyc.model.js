const { getResquest } = require("../api/api");
const axios = require("axios");
const FormData = require("form-data");
const Kyc = require("../db/schema/Kyc.schema");
const uploadDocs = async (req) => {
  try {
    let AllFile = req.files;
    let imageOutput = {};
    for (const fileData of Object.keys(AllFile)) {
      let file = AllFile[fileData][0];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      req["uploadPath"] =
        file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
      let data = new FormData();
      data.append("file", file.buffer);
      data.append("id", req["uploadPath"]);
      let requestConfig = {
        baseURL: "https://api.cloudflare.com/client/v4/accounts/",
        url: `6c4afda85081ab443403605f7b5c1523/images/v1`,
        method: "post",
        headers: {
          Authorization: "Bearer MNe58YHKbeNtqI4j7HnPBuhHZjkGHlYCEAB1Dbig",
          ...data.getHeaders(),
        },
        data: data,
      };

      let dataCall = await axios(requestConfig);
      if (!dataCall.data || !dataCall.data.success) {
        this.logger.error(dataCall.data.message);
        return { message: dataCall.data.message, flag: false };
      }
      imageOutput[fileData] = dataCall.data.result.variants[0];
    }
    return {
      message: imageOutput,
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
};
async function kycM(req) {
  try {
    let res = await uploadDocs(req);
    await Kyc.create({ email: req.body.email, ...res.message });
    return {
      message: { email: req.body.email, ...res.message },
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error, success: false, token: null };
  }
}

module.exports = {
  kycM,
};
