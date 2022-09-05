const Log = require("../db/schema/Log.schema");

// saving logs
async function logs(data1, data2, data3) {
  const logData = {
    request: JSON.stringify(data1),
    method: data3,
    response: JSON.stringify(data2),
  };
  await Log.create(logData);
}
module.exports = logs;
