import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    animation: "headerSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
  },
  headerInner: (scrolled) => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "0 28px",
    height: "64px",
    background: "linear-gradient(105deg, #38BDF8 0%, #818CF8 45%, #EC4899 100%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "box-shadow 0.3s ease",
    boxShadow: scrolled
      ? "0 4px 24px rgba(56,189,248,0.18), 0 1.5px 8px rgba(236,72,153,0.13)"
      : "0 1px 0 rgba(255,255,255,0.10)",
    position: "relative",
    overflow: "hidden",
  }),
  shimmer: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.0) 70%)",
    pointerEvents: "none",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
    userSelect: "none",
    textDecoration: "none",
    minWidth: 0,         // allows flex children to shrink below content size
    flexShrink: 1,       // let logo shrink if space is tight
  },
  logoSectionHover: {
    transform: "scale(1.025)",
  },
  shieldWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(6px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.35)",
    flexShrink: 0,       // shield icon never shrinks
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    minWidth: 0,         // allows text to truncate properly
  },
  logoText: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#F9FAFB",
    letterSpacing: "-0.3px",
    lineHeight: 1.2,
    textShadow: "0 1px 4px rgba(0,0,0,0.12)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tagline: {
    fontSize: "11.5px",
    color: "rgba(249,250,251,0.78)",
    fontWeight: 400,
    letterSpacing: "0.1px",
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  button: {
    background: "rgba(249,250,251,0.97)",
    color: "#be185d",
    border: "none",
    padding: "9px 20px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "13.5px",
    fontWeight: 600,
    fontFamily: "inherit",
    letterSpacing: "0.01em",
    boxShadow:
      "0 2px 12px rgba(236,72,153,0.22), 0 1px 4px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
    transition:
      "transform 0.17s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.17s ease, background 0.15s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  buttonHover: {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow:
      "0 6px 24px rgba(236,72,153,0.32), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
    background: "#ffffff",
  },
  buttonActive: {
    transform: "translateY(0px) scale(0.98)",
  },
};

const ShieldIcon = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9 1L2 4V9.5C2 13.36 5.02 16.97 9 18C12.98 16.97 16 13.36 16 9.5V4L9 1Z"
      fill="rgba(249,250,251,0.95)"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="0.5"
    />
    <path
      d="M6.5 9.5L8 11L11.5 7.5"
      stroke="#38BDF8"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 1.5L12.5 11H1.5L7 1.5Z"
      stroke="#EC4899"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="rgba(236,72,153,0.08)"
    />
    <line x1="7" y1="6" x2="7" y2="8.5" stroke="#EC4899" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="7" cy="10" r="0.6" fill="#EC4899" />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const logoStyle = {
    ...styles.logoSection,
    ...(logoHovered ? styles.logoSectionHover : {}),
  };

  const buttonStyle = {
    ...styles.button,
    ...(btnHovered ? styles.buttonHover : {}),
    ...(btnActive ? styles.buttonActive : {}),
    ...(isMobile ? { padding: "8px 15px", fontSize: "13px" } : {}),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        @keyframes headerSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Mobile: 320px – 480px ─────────────────────────────────────── */
        @media (max-width: 480px) {
          .saferoute-header-inner {
            padding: 0 14px !important;
            height: 56px !important;
          }
          .saferoute-logo-text {
            font-size: 17px !important;
          }
          .saferoute-shield-wrap {
            width: 30px !important;
            height: 30px !important;
            border-radius: 8px !important;
          }
          .saferoute-btn {
            padding: 7px 12px !important;
            font-size: 12px !important;
            gap: 4px !important;
          }
        }

        /* ─── Large Mobile: 481px – 768px ───────────────────────────────── */
        @media (min-width: 481px) and (max-width: 768px) {
          .saferoute-header-inner {
            padding: 0 20px !important;
            height: 60px !important;
          }
          .saferoute-logo-text {
            font-size: 18px !important;
          }
          .saferoute-btn {
            padding: 8px 16px !important;
            font-size: 13px !important;
          }
        }

        /* ─── Tablet: 769px – 1024px ─────────────────────────────────────  */
        @media (min-width: 769px) and (max-width: 1024px) {
          .saferoute-header-inner {
            padding: 0 24px !important;
          }
          .saferoute-logo-text {
            font-size: 19px !important;
          }
        }

        /* ─── Large Desktop: 1441px+ ─────────────────────────────────────  */
        @media (min-width: 1441px) {
          .saferoute-header-inner {
            padding: 0 48px !important;
            max-width: 1600px;
            margin: 0 auto;
          }
        }

        /* ─── Prevent overflow on all sizes ──────────────────────────────  */
        .saferoute-header-root {
          overflow-x: hidden;
        }

        /* Ensure button tap target is accessible on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .saferoute-btn {
            min-height: 40px;
            min-width: 40px;
          }
        }
      `}</style>

      <header style={styles.header} className="saferoute-header-root">
        <div
          style={styles.headerInner(scrolled)}
          className="saferoute-header-inner"
        >
          <div style={styles.shimmer} />

          {/* Logo Section */}
          <div
            style={logoStyle}
            onClick={() => navigate("/")}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            role="link"
            tabIndex={0}
            aria-label="SafeRoute home"
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            <div style={styles.shieldWrap} className="saferoute-shield-wrap">
              <ShieldIcon />
            </div>
            <div style={styles.textGroup}>
              <span style={styles.logoText} className="saferoute-logo-text">
                SafeRoute
              </span>
              {!isMobile && (
                <span style={styles.tagline}>Smarter navigation for safer travel</span>
              )}
            </div>
          </div>

          {/* Report Button */}
          <button
            onClick={() => navigate("/report")}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnActive(false); }}
            onMouseDown={() => setBtnActive(true)}
            onMouseUp={() => setBtnActive(false)}
            style={buttonStyle}
            className="saferoute-btn"
            aria-label="Report unsafe location"
          >
            <AlertIcon />
            Report Area
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;