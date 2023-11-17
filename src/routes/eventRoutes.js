const express = require("express");
const createEvent = require("../useCases/events/createEvent");
const updateEvent = require("../useCases/events/updateEvent");
const deleteEvent = require("../useCases/events/deleteEvent");
const getAllEvents = require("../useCases/events/getAllEvents");
const getEventById = require("../useCases/events/getEventById");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/event", verifyToken, getAllEvents);

router.get("/event/:id", verifyToken, getEventById);

router.post("/event", createEvent);

router.put("/event", verifyToken, updateEvent);

router.delete("/event/:id", verifyToken, deleteEvent);

module.exports = router;
