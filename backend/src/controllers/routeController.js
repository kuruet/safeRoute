import { fetchRoutesFromORS } from "../services/routingService.js";
import { calculateRouteRisk } from "../services/riskEngine.js";

export const getRoutes = async (req, res) => {
  try {
    // Safety check: ensure req exists
    if (!req || !req.body) {
      throw new Error("Request body is missing");
    }

    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        error: "Origin and destination are required",
      });
    }

    const routeData = await fetchRoutesFromORS(origin, destination);

/* Safety guard: if routing service returns no routes */
if (!routeData.routes || routeData.routes.length === 0) {
  return res.json({ routes: [] });
}

    /* Calculate raw risk for each route */
   const risks = await Promise.all(
  routeData.routes.map((route) => calculateRouteRisk(route.coordinates))
);

routeData.routes.forEach((route, index) => {
  route.rawRisk = risks[index];
});

    /* Find max risk among routes */
    const maxRisk = Math.max(...routeData.routes.map((r) => r.rawRisk), 1);

    /* Scale risk to 0–10 using logarithmic scaling */
    for (const route of routeData.routes) {
      const scaledRisk = (Math.log(1 + route.rawRisk) / Math.log(1 + maxRisk)) * 10;
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
    
    // Safety check: only send response if res exists
    if (res && typeof res.status === 'function') {
      res.status(500).json({
        error: "Route too long or routing service unavailable",
      });
    }
  }
};