import express from "express";
import { submitReport, getReports } from "../controllers/reportController.js";

const router = express.Router();

/* GET all reports */
router.get("/", getReports);

/* POST new report */
router.post("/", submitReport);

export default router;