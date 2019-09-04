import express from "express";

import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController
} from "../controllers/userController";

const router = express.Router();

// /user
router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
