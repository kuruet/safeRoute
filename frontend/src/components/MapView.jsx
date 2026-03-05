import React, { useEffect, useRef, useState } from "react";
import Map, { NavigationControl, Marker, Source, Layer } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";

const MapView = ({ destination, routes, selectedRouteIndex }) => {

  const mapRef = useRef(null);

  const [userLocation, setUserLocation] = useState({
    longitude: 77.2090,
    latitude: 28.6139
  });

  const [viewState, setViewState] = useState({
    longitude: 77.2090,
    latitude: 28.6139,
    zoom: 14
  });

  const [reportsFromDB, setReportsFromDB] = useState([]);

  const getRouteColor = (route) => {

    if (route.isSafest) return "#22c55e";
    if (route.riskLevel === "MEDIUM") return "#facc15";
    if (route.riskLevel === "HIGH") return "#ef4444";

    return "#3b82f6";
  };

  // Detect user location
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        const lon = position.coords.longitude;
        const lat = position.coords.latitude;

        setUserLocation({
          longitude: lon,
          latitude: lat
        });

        setViewState({
          longitude: lon,
          latitude: lat,
          zoom: 14
        });

      });

    }

  }, []);

  // Fetch safety reports
  useEffect(() => {

    const fetchReports = async () => {

      try {

        const response = await fetch("http://localhost:5000/api/reports");

        const data = await response.json();

        setReportsFromDB(data);

      } catch (error) {

        console.error("Failed to fetch reports:", error);

      }

    };

    fetchReports();

  }, []);

  // Fit map bounds when routes change
  useEffect(() => {

    if (!mapRef.current || routes.length === 0) return;

    const map = mapRef.current.getMap();

    let bounds = new maplibregl.LngLatBounds();

    routes.forEach((route) => {

      route.coordinates.forEach(([lng, lat]) => {

        bounds.extend([lng, lat]);

      });

    });

    map.fitBounds(bounds, {
      padding: 80,
      duration: 1000
    });

  }, [routes]);

  useEffect(() => {

  if (selectedRouteIndex === null) return;
  if (!mapRef.current) return;

  const map = mapRef.current.getMap();

  const route = routes[selectedRouteIndex];

  if (!route) return;

  const bounds = new maplibregl.LngLatBounds();

  route.coordinates.forEach(([lng, lat]) => {
    bounds.extend([lng, lat]);
  });

  map.fitBounds(bounds, {
    padding: 100,
    duration: 1200
  });

}, [selectedRouteIndex]);

  return (
    <Map
      ref={mapRef}
      longitude={viewState.longitude}
      latitude={viewState.latitude}
      zoom={viewState.zoom}
      onMoveEnd={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    >

      <NavigationControl position="top-right" />

      {/* User Marker */}
      <Marker
        longitude={userLocation.longitude}
        latitude={userLocation.latitude}
        anchor="center"
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            backgroundColor: "#3B82F6",
            borderRadius: "50%",
            border: "3px solid white",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
          }}
        />
      </Marker>

      {/* Destination Marker */}
      {destination && (
        <Marker
          longitude={destination.longitude}
          latitude={destination.latitude}
          anchor="bottom"
        >
          <div style={{ fontSize: "24px" }}>📍</div>
        </Marker>
      )}

      {/* Safety Report Markers */}
      {reportsFromDB.map((report) => {

        const [lng, lat] = report.location.coordinates;

        return (
          <Marker
            key={report._id}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
          >
            <div style={{ fontSize: "20px" }}>⚠️</div>
          </Marker>
        );

      })}

      {/* Routes Rendering */}
      {routes
  .filter((route, index) =>
    selectedRouteIndex === null || index === selectedRouteIndex
  )
  .map((route, index) => (
        <Source
          key={`route-source-${index}`}
          type="geojson"
          data={{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: route.coordinates
            }
          }}
        >
          <Layer
            id={`route-layer-${index}`}
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": getRouteColor(route),
              "line-width": route.isSafest ? 7 : 4,
              "line-opacity": route.isSafest ? 0.95 : 0.7
            }}
          />
        </Source>
      ))}

    </Map>
  );
};

export default MapView;