import express from "express";
import { getRoutes } from "../controllers/routeController.js";

const router = express.Router();

router.post("/routes", async (req, res, next) => {
  const startTime = Date.now();

  console.log(
    `[${new Date().toISOString()}] /api/routes request received`
  );

  try {
    await getRoutes(req, res, next);
  } finally {
    const duration = Date.now() - startTime;

    console.log(
      `[${new Date().toISOString()}] /api/routes completed in ${duration} ms`
    );
  }
});

export default router;