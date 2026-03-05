import axios from "axios";
import polyline from "@mapbox/polyline";

export const fetchRoutesFromORS = async (origin, destination) => {
  try {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car";

    const response = await axios.post(
      url,
      {
        coordinates: [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat],
        ],
        alternative_routes: {
          target_count: 3,
        },
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const orsRoutes = response.data.routes;

    const formattedRoutes = orsRoutes.map((route) => {
      const decoded = polyline.decode(route.geometry);

      const coordinates = decoded.map(([lat, lng]) => [lng, lat]);

      return {
        distance: route.summary.distance,
        duration: route.summary.duration,
        coordinates,
      };
    });

    return { routes: formattedRoutes };

  } catch (error) {
    console.error("ORS API error:", error.response?.data || error.message);
    throw new Error("Routing service failed");
  }
};