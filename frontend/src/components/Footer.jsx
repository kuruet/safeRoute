import React, { useState } from "react";

const styles = {
  footer: {
    width: "100%",
    background: "linear-gradient(135deg, #1e1b4b 0%, #0c1a2e 60%, #1a0a1e 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflow: "hidden",
    marginTop: "auto",        // ← pushes footer to bottom when page content is short
    flexShrink: 0,            // ← prevents footer from shrinking inside flex column layout
  },
  gradientAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #EC4899 0%, #818CF8 50%, #38BDF8 100%)",
  },
  glow: {
    position: "absolute",
    top: "-120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "300px",
    background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 24px 40px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
    gap: "40px",
    marginBottom: "48px",
  },
  brandLogoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  shieldWrap: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(236,72,153,0.20))",
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  brandName: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#F9FAFB",
    letterSpacing: "-0.3px",
  },
  brandDesc: {
    fontSize: "14px",
    color: "rgba(249,250,251,0.55)",
    lineHeight: 1.65,
    maxWidth: "260px",
    marginBottom: "20px",
  },
  badgeRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "rgba(56,189,248,0.1)",
    border: "1px solid rgba(56,189,248,0.2)",
    color: "#38BDF8",
    letterSpacing: "0.02em",
  },
  linkColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  columnTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(249,250,251,0.4)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "14px",
  },
  link: {
    fontSize: "14px",
    color: "rgba(249,250,251,0.7)",
    textDecoration: "none",
    padding: "5px 0",
    transition: "color 0.2s, padding-left 0.2s",
    cursor: "pointer",
    display: "inline-block",
  },
  socialRow: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginBottom: "40px",
  },
  socialBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s",
    color: "rgba(249,250,251,0.75)",
  },
  socialBtnHover: {
    transform: "scale(1.13)",
    background: "rgba(255,255,255,0.15)",
    boxShadow: "0 0 16px rgba(56,189,248,0.25)",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.35) 30%, rgba(236,72,153,0.35) 70%, transparent)",
    marginBottom: "28px",
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    textAlign: "center",
  },
  copyright: {
    fontSize: "13px",
    color: "rgba(249,250,251,0.35)",
  },
  devCredit: {
    fontSize: "12px",
    color: "rgba(249,250,251,0.3)",
  },
  devName: {
    fontWeight: 600,
    transition: "color 0.2s",
    cursor: "default",
  },
};

const ShieldIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <path d="M9 1L2 4V9.5C2 13.36 5.02 16.97 9 18C12.98 16.97 16 13.36 16 9.5V4L9 1Z"
      fill="rgba(249,250,251,0.9)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
    <path d="M6.5 9.5L8 11L11.5 7.5" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LinkItem = ({ href = "#", children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{
        ...styles.link,
        ...(hovered ? { color: "#F9FAFB", paddingLeft: "4px" } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
};

const SocialButton = ({ icon, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...styles.socialBtn, ...(hovered ? styles.socialBtnHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

const Footer = () => {
  const [devHovered, setDevHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Global box-sizing safety net ──────────────────────────────── */
        .sr-footer *,
        .sr-footer *::before,
        .sr-footer *::after {
          box-sizing: border-box;
        }

        /* ─── Tablet: 769px – 1024px — two-column grid ───────────────────  */
        @media (max-width: 1024px) and (min-width: 769px) {
          .sr-footer-grid {
            grid-template-columns: 1.2fr 1fr !important;
            gap: 32px !important;
          }
        }

        /* ─── Large Mobile + small tablet: 481px – 768px ────────────────── */
        @media (max-width: 768px) and (min-width: 481px) {
          .sr-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .sr-footer-container {
            padding: 48px 20px 32px !important;
          }
        }

        /* ─── Mobile: 320px – 480px — single column ─────────────────────── */
        @media (max-width: 480px) {
          .sr-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            text-align: center;
            margin-bottom: 32px !important;
          }
          .sr-footer-container {
            padding: 40px 16px 28px !important;
          }
          .sr-brand-desc {
            max-width: 100% !important;
            margin-left: auto;
            margin-right: auto;
          }
          .sr-badge-row {
            justify-content: center;
          }
          .sr-brand-logo-row {
            justify-content: center;
          }
          .sr-link-column {
            align-items: center;
          }
          .sr-link-column a {
            padding-left: 0 !important; /* neutralise hover indent on touch */
          }
          .sr-social-row {
            gap: 10px !important;
          }
          .sr-copyright {
            font-size: 12px !important;
          }
          .sr-dev-credit {
            font-size: 11px !important;
          }
        }

        /* ─── Large Desktop: 1441px+ ──────────────────────────────────────  */
        @media (min-width: 1441px) {
          .sr-footer-container {
            max-width: 1400px !important;
            padding-left: 48px !important;
            padding-right: 48px !important;
          }
        }

        /* ─── Prevent horizontal overflow on all sizes ───────────────────  */
        .sr-footer {
          overflow-x: hidden;
        }

        /* ─── Touch: larger social button tap targets ────────────────────  */
        @media (hover: none) and (pointer: coarse) {
          .sr-social-btn {
            width: 46px !important;
            height: 46px !important;
          }
        }
      `}</style>

      <footer style={styles.footer} className="sr-footer">
        <div style={styles.gradientAccent} />
        <div style={styles.glow} />
        <div style={styles.container} className="sr-footer-container">

          {/* Top Grid */}
          <div className="sr-footer-grid" style={styles.grid}>

            {/* Brand */}
            <div>
              <div style={styles.brandLogoRow} className="sr-brand-logo-row">
                <div style={styles.shieldWrap}><ShieldIcon /></div>
                <span style={styles.brandName}>SafeRoute</span>
              </div>
              <p className="sr-brand-desc" style={styles.brandDesc}>
                Smarter navigation for safer travel.<br />
                Risk-aware routing for modern cities.
              </p>
              <div className="sr-badge-row" style={styles.badgeRow}>
                <span style={styles.badge}>
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" fill="#38BDF8" opacity="0.3"/>
                    <circle cx="5" cy="5" r="2" fill="#38BDF8"/>
                  </svg>
                  Live Safety Data
                </span>
                <span style={{ ...styles.badge, background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", color: "#EC4899" }}>
                  Risk-Aware
                </span>
              </div>
            </div>

            {/* Product */}
            <div style={styles.linkColumn} className="sr-link-column">
              <div style={styles.columnTitle}>Product</div>
              <LinkItem>How SafeRoute Works</LinkItem>
              <LinkItem>Risk Engine</LinkItem>
              <LinkItem>Report System</LinkItem>
            </div>

            {/* Resources */}
            <div style={styles.linkColumn} className="sr-link-column">
              <div style={styles.columnTitle}>Resources</div>
              <LinkItem>Docs</LinkItem>
              <LinkItem>Blog</LinkItem>
              <LinkItem>Support</LinkItem>
            </div>

            {/* Company */}
            <div style={styles.linkColumn} className="sr-link-column">
              <div style={styles.columnTitle}>Company</div>
              <LinkItem>About SafeRoute</LinkItem>
              <LinkItem>Privacy Policy</LinkItem>
              <LinkItem>Terms of Service</LinkItem>
            </div>
          </div>

          {/* Social Row */}
          <div style={styles.socialRow} className="sr-social-row">
            <SocialButton label="GitHub" icon={<GitHubIcon />} />
            <SocialButton label="Twitter" icon={<TwitterIcon />} />
            <SocialButton label="LinkedIn" icon={<LinkedInIcon />} />
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Bottom */}
          <div style={styles.bottom}>
            <p style={styles.copyright} className="sr-copyright">© 2026 SafeRoute. All rights reserved.</p>
            <p style={styles.devCredit} className="sr-dev-credit">
              Designed &amp; Developed by{" "}
              <span
                style={{
                  ...styles.devName,
                  color: devHovered ? "#EC4899" : "rgba(249,250,251,0.5)",
                }}
                onMouseEnter={() => setDevHovered(true)}
                onMouseLeave={() => setDevHovered(false)}
              >
                KURUET
              </span>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;