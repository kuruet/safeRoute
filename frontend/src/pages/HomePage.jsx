import React, { useState } from "react";
import Header from "../components/Header";
import HeroSearch from "../components/HeroSearch";
import MapSection from "../components/MapSection";
import RoutesSection from "../components/RoutesSection";
import ReportModal from "../components/ReportModal";
import Footer from "../components/Footer";

import { fetchRoutes } from "../services/routeService";

const HomePage = () => {

  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);

  const analyzeRoutes = async (origin, dest) => {

    try {

      const routesData = await fetchRoutes(origin, dest);

      setRoutes(routesData);
      setSelectedRouteIndex(null);

    } catch (error) {

      console.error("Route analysis failed", error);

    }

  };

  return (
    <div>

      <Header onReportClick={() => setReportOpen(true)} />

      <HeroSearch
        setDestination={setDestination}
        analyzeRoutes={analyzeRoutes}
      />

      <MapSection
        destination={destination}
        routes={routes}
        selectedRouteIndex={selectedRouteIndex}
      />

      <RoutesSection
        routes={routes}
        selectedRouteIndex={selectedRouteIndex}
        setSelectedRouteIndex={setSelectedRouteIndex}
      />

      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
      />

      <Footer/>

    </div>
  );
};

export default HomePage;