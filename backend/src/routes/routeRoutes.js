import express from "express";
import { getRoutes } from "../controllers/routeController.js";

const router = express.Router();

router.post("/routes", getRoutes);
console.time("route-total")

console.time("openroute")
const routes = await getRoutes()
console.timeEnd("openroute")

console.time("reports")
const reports = await getReports()
console.timeEnd("reports")

console.time("risk-score")
const scoredRoutes = calculateRisk(routes, reports)
console.timeEnd("risk-score")

console.timeEnd("route-total")

export default router;