import express from "express";
import { verifyToken } from "../middleware/verifyToken";

import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  getUserEventsController
} from "../controllers/userController";

const router = express.Router();

// /user
router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserController);
router.put("/:id", verifyToken, updateUserController);
router.delete("/:id", deleteUserController);

// /user/:id/events
router.get("/:id/events", verifyToken, getUserEventsController);

export default router;
