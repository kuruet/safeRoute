import React from "react";

const formatDistance = (meters) => {
  return (meters / 1000).toFixed(1) + " km";
};

const formatDuration = (seconds) => {
  return Math.round(seconds / 60) + " min";
};

const RecommendedRouteCard = ({ route }) => {

  if (!route) return null;

  return (
    <div
      style={{
        background: "#ECFDF5",
        border: "1px solid #10B981",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "#065F46",
          marginBottom: "10px"
        }}
      >
        🛡 Recommended Route
      </div>

      <div style={{ fontSize: "16px", marginBottom: "6px" }}>
        Distance: {formatDistance(route.distance)}
      </div>

      <div style={{ fontSize: "16px", marginBottom: "6px" }}>
        Time: {formatDuration(route.duration)}
      </div>

      <div style={{ fontSize: "16px" }}>
        Risk Level: {route.riskLevel}
      </div>

    </div>
  );
};

export default RecommendedRouteCard;