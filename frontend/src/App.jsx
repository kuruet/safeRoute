import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSearch from "./components/HeroSearch";
import MapSection from "./components/MapSection";
import RoutesSection from "./components/RoutesSection";
import ReportModal from "./components/ReportModal";
import Footer from "./components/Footer";

import ReportPage from "./pages/ReportPage";
import { fetchRoutes } from "./services/routeService";

function HomePage() {

  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

  const analyzeRoutes = async (origin, dest) => {

    try {

      const routesData = await fetchRoutes(origin, dest);

      setRoutes(routesData);

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
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomePage />} />

         <Route path="/report" element={<ReportPage />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;