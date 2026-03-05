import React from "react";

const SafetyWarningBanner = () => {

  return (
    <div
      style={{
        background: "#FEF3C7",
        border: "1px solid #F59E0B",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >

      <div
        style={{
          fontWeight: "bold",
          color: "#92400E",
          marginBottom: "6px"
        }}
      >
        ⚠ Safety Warning
      </div>

      <div style={{ color: "#78350F" }}>
        All available routes pass through reported unsafe areas.
        Proceed with caution.
      </div>

    </div>
  );

};

export default SafetyWarningBanner;