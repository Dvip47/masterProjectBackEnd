const express = require("express");
const EventRouter = express.Router();
const celebrate = require("celebrate");
const { getToken } = require("../auth/jwt/jwt");
// calling functions
const { eventC, eventC_P } = require("../controllers/event.controller");

// Get game list

//  get token will validate your jwt token

EventRouter.get("/event", eventC);
EventRouter.post("/event", eventC_P);

module.exports = EventRouter;
