"use client";

import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-inner">
        {/* Left Column: Brand Name & Logo */}
        <div className="footer-left">
          <div className="footer-brand">
            <img
              src="/logo.png"
              alt="MCDOGE Logo"
              className="footer-logo"
            />
            <span className="footer-brand-name footer-bouncy-logo-wrapper">
              {"MCDOGE".split("").map((letter, idx) => (
                <span
                  key={`footer-char-${idx}`}
                  className="footer-bouncy-letter"
                  style={{ transitionDelay: `${idx * 0.02}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Middle Column: Social Buttons */}
        <div className="footer-middle">
          <div className="footer-socials">
            {/* Telegram */}
            <a
              href="https://t.me/ysctop"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Telegram"
            >
              <Send size={16} />
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/mcdogecryprest"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Twitter / X"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* DexScreener */}
            <a
              href="https://dexscreener.com/solana/9zmuy8rslo4pjtcmnvccag5m2adfnnwlsgaqzkvqhpdz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn dex-btn"
              aria-label="DexScreener"
            >
              <img
                src="/decscreenr logo.png"
                alt="DexScreener"
                className="footer-dex-logo"
              />
            </a>
          </div>
        </div>

        {/* Right Column: Copyright */}
        <div className="footer-right">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} MCDOGE. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .footer-section {
          background-color: #050505;
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px 6%;
          position: relative;
          z-index: 10;
        }

        .footer-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        /* Left Side: Brand Logo and Text */
        .footer-left {
          display: flex;
          align-items: center;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bouncy-logo-wrapper {
          display: inline-block;
          white-space: nowrap;
          cursor: pointer;
          transform: rotate(-3deg) skewX(-6deg);
          transform-origin: left center;
        }

        .footer-bouncy-letter {
          display: inline-block;
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 1.35rem;
          font-weight: 950;
          color: #ffffff;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.35), color 0.3s ease;
        }

        .footer-bouncy-logo-wrapper:hover .footer-bouncy-letter {
          transform: translateY(-4px) scale(1.08) rotate(4deg);
          color: #FFE054;
        }

        .footer-bouncy-letter:hover {
          transform: translateY(-8px) scale(1.22) rotate(-6deg) !important;
          color: #DD1021 !important;
        }

        /* Middle Side: Social Circles */
        .footer-middle {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.04);
          color: #a0a0a5;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, border-color 0.3s ease;
          outline: none;
          text-decoration: none !important;
          -webkit-tap-highlight-color: transparent;
        }

        .footer-social-btn *,
        .footer-social-btn:focus,
        .footer-social-btn:active {
          outline: none !important;
          box-shadow: none !important;
          text-decoration: none !important;
        }

        .footer-social-btn:hover {
          background-color: #FFC700;
          color: #000000;
          border-color: #FFC700;
          transform: scale(1.08);
        }

        .footer-dex-logo {
          width: 16px;
          height: 16px;
          object-fit: contain;
          transition: filter 0.3s ease;
        }

        .footer-social-btn.dex-btn:hover .footer-dex-logo {
          filter: brightness(0);
        }

        /* Right Side: Copyright text */
        .footer-right {
          text-align: right;
        }

        .footer-copyright {
          font-family: var(--font-body), sans-serif;
          font-size: 0.85rem;
          color: #707075;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }

          .footer-left,
          .footer-middle,
          .footer-right {
            justify-content: center;
            text-align: center;
          }

          .footer-right {
            order: 3;
          }
        }
      `}</style>
    </footer>
  );
}
