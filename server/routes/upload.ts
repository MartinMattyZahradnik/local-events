import express from "express";
import { uploadFileController } from "../controllers/uploadController";

const router = express.Router();

// /upload routes
router.post("/", uploadFileController);

export default router;
