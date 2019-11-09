import express from "express";

import { getCountriesController } from "../controllers/applicationController";

const router = express.Router();

// /auth
router.get("/countries", getCountriesController);

export default router;
