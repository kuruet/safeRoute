import React, { useState, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";

const ReportMap = ({ location, setLocation }) => {

  const [viewState, setViewState] = useState({
    longitude: 77.2090,
    latitude: 28.6139,
    zoom: 13
  });

  // Detect user location
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        const lon = position.coords.longitude;
        const lat = position.coords.latitude;

        setViewState({
          longitude: lon,
          latitude: lat,
          zoom: 14
        });

      });

    }

  }, []);

  // When user clicks map
  const handleMapClick = (event) => {

    const { lng, lat } = event.lngLat;

    setLocation({
      longitude: lng,
      latitude: lat
    });

  };

  // When location changes (e.g. from search)
  useEffect(() => {

    if (!location) return;

    setViewState((prev) => ({
      ...prev,
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 15
    }));

  }, [location]);

  return (

    <div
      style={{
        width: "100%",
        height: "40vh",
        borderRadius: "10px",
        overflow: "hidden"
      }}
    >

      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >

        <NavigationControl position="top-right" />

        {location && (

          <Marker
            longitude={location.longitude}
            latitude={location.latitude}
            draggable
            onDragEnd={(e) => {

              setLocation({
                longitude: e.lngLat.lng,
                latitude: e.lngLat.lat
              });

            }}
          >
            <div style={{ fontSize: "26px" }}>📍</div>
          </Marker>

        )}

      </Map>

    </div>

  );

};

export default ReportMap;