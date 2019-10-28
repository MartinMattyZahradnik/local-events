import express from "express";

import {
  loginController,
  passwordResetController,
  setNewPasswordController
} from "../controllers/authController";

const router = express.Router();

// /auth
router.post("/login", loginController);
router.post("/password-reset", passwordResetController);
router.post("/set-new-password", setNewPasswordController);

export default router;
