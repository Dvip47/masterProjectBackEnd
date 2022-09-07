require("dotenv").config();
const gateway = require("fast-gateway");
const { isMaster, fork } = require("cluster");
const { cpus } = require("os");
const cors = require("cors");
const token = (req, res, next) => {
  if (req?.headers?.token !== "") {
    next();
  } else {
    res.setHeader("Content-type", "application/json");
    res.statusCode = 401;
    res.end(
      JSON.stringify({ message: "Auth failed", success: false, token: null })
    );
  }
};

const server = gateway({
  routes: [
    {
      prefix: "/user",
      target: "http://127.0.0.1:4000",
      middlewares: [token],
      methods: ["POST", "PATCH", "GET", "DELETE"],
    },
    {
      prefix: "/kyc",
      target: "http://127.0.0.1:4001",
      middlewares: [token],
      methods: ["POST", "PATCH", "GET", "DELETE"],
    },
  ],
});
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
async function startServer() {
  if (isMaster) {
    for (let i = 0; i < cpus().length; i++) {
      fork();
    }
    console.log("master started");
  } else {
    server
      .start(process.env.PORT)
      .then(() => {
        console.log("api gateway started", process.env.PORT);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
startServer();
