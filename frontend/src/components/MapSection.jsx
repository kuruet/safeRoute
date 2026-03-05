import React, { useState, useEffect } from "react";
import MapView from "./MapView";

const styles = {
  section: {
    width: "100%",
    padding: "60px 20px",
    background: "rgba(56,189,248,0.05)",
    boxSizing: "border-box",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    animation: "mapFadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "16px",
    textAlign: "left",
    letterSpacing: "-0.2px",
  },
  card: {
    position: "relative",
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow:
      "0 8px 32px rgba(56,189,248,0.18), 0 2px 8px rgba(0,0,0,0.08)",
    height: "50vh",
    minHeight: "420px",
    maxHeight: "620px",
  },
  mapWrapper: {
    width: "100%",
    height: "100%",
  },
  loadingOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #E5E7EB",
    borderTopColor: "#38BDF8",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

const MapSection = ({ destination, routes, selectedRouteIndex }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        @keyframes mapFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .saferoute-map-section { padding: 40px 16px !important; }
          .saferoute-map-card { height: 45vh !important; }
        }
      `}</style>
      <section
        className="saferoute-map-section"
        style={styles.section}
        role="region"
        aria-label="Route analysis map"
      >
        <div style={styles.container}>
          <h2 style={styles.title}>Route Analysis Map</h2>
          <div className="saferoute-map-card" style={styles.card}>
            {loading && (
              <div style={styles.loadingOverlay}>
                <div style={styles.spinner} />
              </div>
            )}
            <div style={styles.mapWrapper}>
              <MapView
                destination={destination}
                routes={routes}
                selectedRouteIndex={selectedRouteIndex}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapSection;