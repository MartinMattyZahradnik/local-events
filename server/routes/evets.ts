import express from "express";
import { body } from "express-validator/check";

import {
  getEventsController,
  createEventController
} from "../controllers/eventsController";

const router = express.Router();

// GET /events
router.get("/", getEventsController);

router.post("/", createEventController);

export default router;
