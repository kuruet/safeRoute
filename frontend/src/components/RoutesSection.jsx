import React from "react";
import RecommendedRouteCard from "./RecommendedRouteCard";
import RouteCard from "./RouteCard";
import SafetyWarningBanner from "./SafetyWarningBanner";

const RoutesSection = ({ routes, selectedRouteIndex, setSelectedRouteIndex }) => {

    

  if (!routes || routes.length === 0) {
    return null;
  }

  const recommended = routes.find(route => route.isSafest);

  const allRoutesHighRisk =
  routes.length > 0 &&
  routes.every(route => route.riskLevel === "HIGH");

  return (
    <div
      style={{
        width: "100%",
        padding: "40px 20px",
        background: "#F9FAFB",
        maxWidth: "700px",
        margin: "0 auto"
      }}
    >

    {allRoutesHighRisk && <SafetyWarningBanner />}

<RecommendedRouteCard route={recommended} />

      {routes.map((route, index) => (

  <RouteCard
    key={index}
    route={route}
    index={index}
    isSelected={selectedRouteIndex === index}
    onClick={() => setSelectedRouteIndex(index)}
  />

))}

    </div>
  );
};

export default RoutesSection;