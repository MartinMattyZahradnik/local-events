import express from "express";
import { body } from "express-validator/check";

import {
  getEventsController,
  createEventController,
  deleteEventController
} from "../controllers/eventsController";

const router = express.Router();

// GET /events
router.get("/", getEventsController);
router.post("/", createEventController);
router.delete("/:eventId", deleteEventController);

export default router;
