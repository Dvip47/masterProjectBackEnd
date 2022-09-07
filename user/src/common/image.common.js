const uploadDocs = async (req) => {
  try {
    let file = req.file;
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
    return {
      message: dataCall.data.result.variants[0],
      success: true,
      token: null,
    };
  } catch (error) {
    return { message: error.message, success: false, token: null };
  }
};
module.exports = uploadDocs;
