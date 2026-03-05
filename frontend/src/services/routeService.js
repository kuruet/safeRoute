export const fetchRoutes = async (origin, destination) => {
  try {
    const response = await fetch("http://localhost:5000/api/routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ origin, destination }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }

    const data = await response.json();

    return data.routes;

  } catch (error) {
    console.error("Route fetch error:", error);
    throw error;
  }
};