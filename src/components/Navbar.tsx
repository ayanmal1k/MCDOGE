"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Inline Magnetic Wrapper for Nav buttons ---
function Magnetic({ children }: { children: React.ReactElement }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const centerX = boundingRect.left + boundingRect.width / 2;
    const centerY = boundingRect.top + boundingRect.height / 2;

    const factor = 0.25;
    setPosition({
      x: (clientX - centerX) * factor,
      y: (clientY - centerY) * factor
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={`navbar-wrapper ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="navbar-inner">
          {/* Logo + Name */}
          <div className="navbar-logo-container" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src="/logo.png"
              alt="MCDOGE Logo"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            />
            <span className="navbar-logo-text">
              MCDOGE
            </span>
          </div>

          {/* Nav Links */}
          <nav className="nav-links">
            <a href="#" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#roadmap" className="nav-link">Roadmap</a>
            <a href="#chart" className="nav-link">Chart</a>
            <a href="#community" className="nav-link">Community</a>
          </nav>

          {/* Buy Button */}
          <div className="nav-buy-desktop">
            <Magnetic>
              <a href="https://dexscreener.com/solana/9ZMuy8RsLo4PjTCmnVcCAg5M2ADfNNWLSGaqzKvqHpDZ" target="_blank" rel="noopener noreferrer" className="btn-buy-nav">
                BUY $MCDOGE
              </a>
            </Magnetic>
          </div>

          {/* Hamburger Trigger */}
          <button
            className="nav-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line line-top" />
            <span className="hamburger-line line-bottom" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="nav-mobile-dropdown"
            >
              <nav className="nav-links-mobile">
                <a href="#" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="#about" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                <a href="#roadmap" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Roadmap</a>
                <a href="#chart" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Chart</a>
                <a href="#community" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Community</a>
                <a href="https://dexscreener.com/solana/9ZMuy8RsLo4PjTCmnVcCAg5M2ADfNNWLSGaqzKvqHpDZ" target="_blank" rel="noopener noreferrer" className="btn-buy-nav-mobile" onClick={() => setIsMobileMenuOpen(false)}>
                  BUY $MCDOGE
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Navbar Styles */}
      <style jsx>{`
        .navbar-wrapper {
          position: relative;
          width: 100%;
          z-index: 1000;
          background-color: #000000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 18px 6%;
          transition: background-color 0.3s ease;
        }

        .navbar-wrapper.is-open {
          background-color: #050505;
        }

        .navbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .navbar-logo-container {
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .navbar-logo-container:hover {
          transform: scale(1.04);
        }

        .navbar-logo-text {
          color: #ffffff;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          gap: 36px;
          align-items: center;
        }

        .nav-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 700;
          color: #86868b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
          padding: 6px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #FFC700;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn-buy-nav {
          display: inline-flex;
          align-items: center;
          background: #DD1021;
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(221, 16, 33, 0.2);
        }

        .btn-buy-nav:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(250, 93, 41, 0.4);
          color: #FFC700;
        }

        /* Hamburger styles */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 14px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .hamburger-line {
          width: 100%;
          height: 2px;
          background-color: #ffffff;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .navbar-wrapper.is-open .line-top {
          transform: translateY(6px) rotate(45deg);
        }

        .navbar-wrapper.is-open .line-bottom {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile Dropdown Menu */
        .nav-mobile-dropdown {
          width: 100%;
          overflow: hidden;
        }

        .nav-links-mobile {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 24px;
          padding-bottom: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
        }

        .nav-link-mobile {
          font-size: 1rem;
          font-weight: 600;
          color: #86868b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 8px 0;
          transition: color 0.2s;
        }

        .nav-link-mobile:hover {
          color: #FFC700;
        }

        .btn-buy-nav-mobile {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #DD1021;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.02em;
          text-align: center;
          margin-top: 12px;
          box-shadow: 0 4px 15px rgba(221, 16, 33, 0.3);
        }

        @media (max-width: 992px) {
          .nav-links,
          .nav-buy-desktop {
            display: none;
          }

          .nav-hamburger {
            display: flex;
          }
          
          .navbar-wrapper {
            padding: 14px 24px;
          }
        }
      `}</style>
    </>
  );
}
