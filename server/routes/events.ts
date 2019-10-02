import express from "express";
import { body } from "express-validator/check";

import {
  getEventsController,
  createEventController,
  getEventDetailController,
  deleteEventController,
  getSimilarEventsController
} from "../controllers/eventsController";

const router = express.Router();

// GET /events
router.get("/", getEventsController);
router.post("/", createEventController);
router.get("/:eventId", getEventDetailController);
router.delete("/:eventId", deleteEventController);

// GET /events/eventId/similar
router.get("/:eventId/similar", getSimilarEventsController);

export default router;
