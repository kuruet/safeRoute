import React from "react";

const formatDistance = (meters) => {
  return (meters / 1000).toFixed(1) + " km";
};

const formatDuration = (seconds) => {
  return Math.round(seconds / 60) + " min";
};

const getRiskColor = (riskLevel) => {

  if (riskLevel === "LOW") return "#22c55e";
  if (riskLevel === "MEDIUM") return "#facc15";
  if (riskLevel === "HIGH") return "#ef4444";

  return "#6B7280";
};

const RouteCard =  ({ route, index, onClick, isSelected }) => {

  return (
  <div
  onClick={onClick}
  style={{
    background: isSelected ? "#ECFDF5" : "white",
    border: isSelected ? "2px solid #10B981" : "1px solid #eee",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  }}
>

      <div
        style={{
          fontWeight: "bold",
          marginBottom: "8px"
        }}
      >
        Route {String.fromCharCode(65 + index)}
      </div>

      <div style={{ marginBottom: "4px" }}>
        Distance: {formatDistance(route.distance)}
      </div>

      <div style={{ marginBottom: "4px" }}>
        Time: {formatDuration(route.duration)}
      </div>

      <div
        style={{
          color: getRiskColor(route.riskLevel),
          fontWeight: "bold"
        }}
      >
        Risk: {route.riskScore?.toFixed(2)} ({route.riskLevel})
      </div>

    </div>
  );
};

export default RouteCard;