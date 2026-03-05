import React, { useState, useRef } from "react";

const styles = {
  wrapper: {
    width: "100%",
    padding: "48px 20px 56px",
    background: "#F9FAFB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    boxSizing: "border-box",
    overflowX: "hidden",   // prevent horizontal scroll at wrapper level
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow:
      "0 4px 24px rgba(56,189,248,0.10), 0 1px 4px rgba(0,0,0,0.07)",
    padding: "32px 20px 20px",
    boxSizing: "border-box",
    animation: "heroSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both",
    position: "relative",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #E5E7EB",
    borderRadius: "12px",
    padding: "0 12px",
    background: "#F9FAFB",
    gap: "8px",
    transition: "border-color 0.2s, box-shadow 0.2s",
    position: "relative",
    width: "100%",        // ensure it never bleeds out of card
    boxSizing: "border-box",
  },
  inputRowFocus: {
    borderColor: "#38BDF8",
    boxShadow: "0 0 0 3px rgba(56,189,248,0.13)",
    background: "#ffffff",
  },
  inputRowSelected: {
    borderColor: "#EC4899",
    boxShadow: "0 0 0 3px rgba(236,72,153,0.10)",
    background: "#ffffff",
  },
  searchIconWrap: {
    display: "flex",
    alignItems: "center",
    color: "#9CA3AF",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "16px",       // keep at 16px — prevents iOS auto-zoom
    color: "#111827",
    padding: "13px 0",
    fontFamily: "inherit",
    minWidth: 0,            // allows input to shrink inside flex
    width: "100%",
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F3F4F6",
    border: "none",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    cursor: "pointer",
    color: "#6B7280",
    flexShrink: 0,
    fontSize: "14px",
    lineHeight: 1,
    padding: 0,
    transition: "background 0.15s",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #E5E7EB",
    borderTopColor: "#38BDF8",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow:
      "0 8px 32px rgba(56,189,248,0.13), 0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden",
    zIndex: 50,
    border: "1px solid rgba(229,231,235,0.8)",
    animation: "dropdownFade 0.18s ease both",
    maxHeight: "220px",     // scrollable on small viewports
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",  // smooth momentum scroll on iOS
    boxSizing: "border-box",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "11px 14px",
    cursor: "pointer",
    borderBottom: "1px solid #F3F4F6",
    transition: "background 0.13s, padding-left 0.13s",
    fontSize: "14px",
    color: "#374151",
    lineHeight: 1.4,
    wordBreak: "break-word",  // long place names wrap instead of overflowing
    boxSizing: "border-box",
  },
  dropdownItemHover: {
    background: "#F0F9FF",
    paddingLeft: "18px",
  },
  dropdownItemLast: {
    borderBottom: "none",
  },
  pinIcon: {
    color: "#38BDF8",
    flexShrink: 0,
    marginTop: "2px",
  },
  emptyMsg: {
    padding: "18px 16px",
    textAlign: "center",
    fontSize: "14px",
    color: "#9CA3AF",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "10px",
    padding: "5px 12px",
    background: "rgba(236,72,153,0.08)",
    border: "1px solid rgba(236,72,153,0.2)",
    borderRadius: "999px",
    fontSize: "12px",
    color: "#be185d",
    fontWeight: 500,
    animation: "heroSlideUp 0.25s ease both",
    maxWidth: "100%",       // never overflow card on small screens
    flexWrap: "wrap",       // allow text to wrap if needed
    wordBreak: "break-word",
  },
  analyzeBtn: {
    marginTop: "14px",
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(105deg, #38BDF8 0%, #818CF8 50%, #EC4899 100%)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    letterSpacing: "0.01em",
    boxShadow: "0 2px 16px rgba(56,189,248,0.22), 0 1px 4px rgba(236,72,153,0.12)",
    transition: "transform 0.17s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.17s ease, opacity 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxSizing: "border-box",
    minHeight: "44px",      // accessible touch target on mobile
  },
  analyzeBtnHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 24px rgba(56,189,248,0.28), 0 2px 8px rgba(236,72,153,0.18)",
  },
  analyzeBtnDisabled: {
    opacity: 0.72,
    cursor: "not-allowed",
    transform: "none",
  },
  btnSpinner: {
    width: "15px",
    height: "15px",
    border: "2px solid rgba(255,255,255,0.35)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  },
  womenBadge: {
    position: "absolute",
    top: "-12px",
    right: "16px",
    background: "linear-gradient(135deg, #EC4899, #F472B6)",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.02em",
    boxShadow: "0 6px 16px rgba(236,72,153,0.35)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    zIndex: 20,
    whiteSpace: "nowrap",   // keep badge text on one line
    maxWidth: "calc(100% - 32px)",  // never bleed past card edge
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="#9CA3AF" strokeWidth="1.6"/>
    <path d="M11.5 11.5L15 15" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4Z" fill="#38BDF8"/>
    <circle cx="7" cy="5" r="1.4" fill="white"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M2 5.5L4.5 8L9 3" stroke="#be185d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeroSearch = ({ setDestination, analyzeRoutes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [analyzingRoutes, setAnalyzingRoutes] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [focused, setFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const searchTimeoutRef = useRef(null);

  const searchLocation = (query) => {
    if (!query) {
      setSearchResults([]);
      setErrorState(null);
      setLoadingSearch(false);
      return;
    }
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    setLoadingSearch(true);
    setErrorState(null);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();
        setSearchResults(data);
        if (data.length === 0) setErrorState("no_results");
      } catch {
        setErrorState("api_error");
      } finally {
        setLoadingSearch(false);
      }
    }, 400);
  };

  const handleAnalyze = () => {
    if (!selectedDestination) {
      alert("Please select a destination first");
      return;
    }
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setAnalyzingRoutes(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const origin = { lat: position.coords.latitude, lng: position.coords.longitude };
      const dest = { lat: selectedDestination.latitude, lng: selectedDestination.longitude };
      Promise.resolve(analyzeRoutes(origin, dest)).finally(() => setAnalyzingRoutes(false));
    }, () => setAnalyzingRoutes(false));
  };

  const inputRowStyle = {
    ...styles.inputRow,
    ...(focused && !selectedDestination ? styles.inputRowFocus : {}),
    ...(selectedDestination ? styles.inputRowSelected : {}),
  };

  const analyzeBtnStyle = {
    ...styles.analyzeBtn,
    ...(btnHovered && !analyzingRoutes ? styles.analyzeBtnHover : {}),
    ...(analyzingRoutes ? styles.analyzeBtnDisabled : {}),
  };

  const showDropdown = focused && (searchResults.length > 0 || errorState);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ─── Global box-sizing safety net ──────────────────────────────── */
        .sr-herosearch-root *,
        .sr-herosearch-root *::before,
        .sr-herosearch-root *::after {
          box-sizing: border-box;
        }

        /* ─── Mobile: 320px – 480px ─────────────────────────────────────── */
        @media (max-width: 480px) {
          .sr-wrapper {
            padding: 36px 12px 40px !important;
          }
          .sr-card {
            padding: 28px 14px 16px !important;
            border-radius: 16px !important;
          }
          .sr-women-badge {
            font-size: 11px !important;
            padding: 5px 10px !important;
            right: 12px !important;
          }
          .sr-input {
            font-size: 16px !important; /* stays 16px to prevent iOS zoom */
            padding: 11px 0 !important;
          }
          .sr-input-row {
            padding: 0 10px !important;
            gap: 6px !important;
          }
          .sr-dropdown {
            max-height: 180px !important;
            border-radius: 10px !important;
          }
          .sr-dropdown-item {
            padding: 10px 12px !important;
            font-size: 13px !important;
          }
          .sr-analyze-btn {
            font-size: 14px !important;
            padding: 12px !important;
            min-height: 46px !important;
          }
          .sr-badge {
            font-size: 11px !important;
            padding: 4px 10px !important;
          }
        }

        /* ─── Large Mobile: 481px – 768px ───────────────────────────────── */
        @media (min-width: 481px) and (max-width: 768px) {
          .sr-wrapper {
            padding: 40px 16px 48px !important;
          }
          .sr-card {
            padding: 30px 18px 18px !important;
          }
          .sr-dropdown {
            max-height: 200px !important;
          }
          .sr-analyze-btn {
            font-size: 14.5px !important;
          }
        }

        /* ─── Tablet: 769px – 1024px ─────────────────────────────────────  */
        @media (min-width: 769px) and (max-width: 1024px) {
          .sr-wrapper {
            padding: 44px 24px 52px !important;
          }
          .sr-card {
            max-width: 480px !important;
          }
        }

        /* ─── Large Desktop: 1441px+ ─────────────────────────────────────  */
        @media (min-width: 1441px) {
          .sr-card {
            max-width: 560px !important;
          }
        }

        /* ─── Touch device: ensure tap targets are large enough ──────────  */
        @media (hover: none) and (pointer: coarse) {
          .sr-analyze-btn {
            min-height: 48px !important;
          }
          .sr-clear-btn {
            width: 28px !important;
            height: 28px !important;
          }
          .sr-dropdown-item {
            padding: 13px 14px !important;
          }
        }
      `}</style>

      <div style={styles.wrapper} className="sr-herosearch-root sr-wrapper">
        <div style={styles.card} className="sr-card">

          <div style={styles.womenBadge} className="sr-women-badge">
            ♀ Built for Women's Safety
          </div>

          {/* Input Row */}
          <div style={inputRowStyle} className="sr-input-row">
            <span style={styles.searchIconWrap}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search destination..."
              value={searchQuery}
              aria-label="Search destination"
              style={styles.input}
              className="sr-input"
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 160)}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                setSelectedDestination(null);
                setSelectedName("");
                searchLocation(value);
              }}
            />
            {loadingSearch && <div style={styles.spinner} />}
            {!loadingSearch && searchQuery.length > 0 && (
              <button
                style={styles.clearBtn}
                className="sr-clear-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setSelectedDestination(null);
                  setSelectedName("");
                  setErrorState(null);
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            {/* Dropdown */}
            {showDropdown && (
              <div style={styles.dropdown} className="sr-dropdown">
                {errorState === "no_results" && (
                  <div style={styles.emptyMsg}>No locations found</div>
                )}
                {errorState === "api_error" && (
                  <div style={styles.emptyMsg}>Search unavailable. Please try again.</div>
                )}
                {!errorState && searchResults.map((place, idx) => (
                  <div
                    key={place.place_id}
                    style={{
                      ...styles.dropdownItem,
                      ...(hoveredItem === place.place_id ? styles.dropdownItemHover : {}),
                      ...(idx === searchResults.length - 1 ? styles.dropdownItemLast : {}),
                    }}
                    className="sr-dropdown-item"
                    onMouseEnter={() => setHoveredItem(place.place_id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const lon = parseFloat(place.lon);
                      const lat = parseFloat(place.lat);
                      const destination = { longitude: lon, latitude: lat };
                      setDestination(destination);
                      setSelectedDestination({ longitude: lon, latitude: lat });
                      setSelectedName(place.display_name);
                      setSearchQuery(place.display_name);
                      setSearchResults([]);
                      setErrorState(null);
                    }}
                  >
                    <span style={styles.pinIcon}><PinIcon /></span>
                    <span>{place.display_name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected badge */}
          {selectedDestination && (
            <div>
              <span style={styles.badge} className="sr-badge">
                <CheckIcon />
                Destination selected
              </span>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzingRoutes}
            aria-label="Analyze safest routes"
            style={analyzeBtnStyle}
            className="sr-analyze-btn"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            {analyzingRoutes ? (
              <>
                <div style={styles.btnSpinner} />
                Processing Safe Routes...
              </>
            ) : (
              "Analyze Safe Route"
            )}
          </button>

        </div>
      </div>
    </>
  );
};

export default HeroSearch;