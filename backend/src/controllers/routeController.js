import { fetchRoutesFromORS } from "../services/routingService.js";
import { calculateRouteRisk } from "../services/riskEngine.js";

export const getRoutes = async (req, res) => {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        error: "Origin and destination are required",
      });
    }

    const routeData = await fetchRoutesFromORS(origin, destination);

    /* Calculate risk score for each route */
   /* Calculate raw risk for each route */
for (const route of routeData.routes) {
  const totalRisk = await calculateRouteRisk(route.coordinates);
  route.rawRisk = totalRisk;
}

/* Find max risk among routes */
const maxRisk = Math.max(...routeData.routes.map(r => r.rawRisk), 1);

/* Scale risk to 0–10 using logarithmic scaling */
for (const route of routeData.routes) {

  const scaledRisk =
    (Math.log(1 + route.rawRisk) / Math.log(1 + maxRisk)) * 10;

  route.riskScore = Number(scaledRisk.toFixed(2));

  if (route.riskScore <= 3) {
    route.riskLevel = "LOW";
  } else if (route.riskScore <= 7) {
    route.riskLevel = "MEDIUM";
  } else {
    route.riskLevel = "HIGH";
  }

  delete route.rawRisk;
}

    /* Identify safest route */
    let safestRoute = null;

    for (const route of routeData.routes) {
      if (!safestRoute || route.riskScore < safestRoute.riskScore) {
        safestRoute = route;
      }
    }

    /* Mark safest route */
    routeData.routes.forEach((route) => {
      route.isSafest = route === safestRoute;
    });

    res.json(routeData);

  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({
      error: "Route too long or routing service unavailable",
    });
  }
};