import express from "express";

import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  loginController,
  passwordResetController,
  setNewPasswordController
} from "../controllers/userController";

const router = express.Router();

// /user
router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

router.post("/login", loginController);
router.post("/password-reset", passwordResetController);
router.post("/set-new-password", setNewPasswordController);

export default router;
