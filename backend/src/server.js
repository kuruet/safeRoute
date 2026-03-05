import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routeRoutes from "./routes/routeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import connectDB from "./config/db.js";
import healthRoutes from "./routes/health.routes.js";

dotenv.config();

const app = express();

/* Connect Database */
connectDB();

/* Middleware */

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* Routes */

app.use("/api", healthRoutes);

/* NEW: Route generation API */
app.use("/api", routeRoutes);

app.use("/api/reports", reportRoutes);

/* Start Server */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});