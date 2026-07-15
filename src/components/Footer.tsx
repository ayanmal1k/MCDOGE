"use client";

export default function Footer() {
  const links = [
    { label: "Home", href: "#" },
    { label: "Ecosystem", href: "#roadmap" }, // Anchor link to top InfoSection / perks
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Utility", href: "#perks" },
    { label: "Order Flow", href: "#roadmap" },
  ];

  const logoLetters = "MCGOOGLES".split("");

  return (
    <footer className="bouncy-footer">
      <div className="footer-line-top" />
      
      <div className="container footer-content">
        {/* Left Side: Bouncy Logo */}
        <div className="footer-logo-block">
          <div className="bouncy-logo-wrapper">
            {logoLetters.map((letter, idx) => (
              <span 
                key={idx} 
                className="bouncy-letter"
                style={{ transitionDelay: `${idx * 0.02}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
          <span className="logo-badge-caption">THE BURGER EMPIRE</span>
        </div>

        {/* Right Side: Navigation links with bounce transitions */}
        <div className="footer-links-block">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="bouncy-footer-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Row: Copyright text and design credits */}
      <div className="footer-bottom-bar container">
        <p className="copyright-text">
          &copy; 2026 MCGOOGLES. All rights reserved.
        </p>
        <span className="disclaimer-text">
          DISCLAIMER: $MCGOOGLES is a meme token for entertainment purposes. No financial yields guaranteed.
        </span>
      </div>

      <style jsx global>{`
        .bouncy-footer {
          position: relative;
          z-index: 10;
          padding-top: var(--space-8);
          padding-bottom: var(--space-6);
          background: #040404;
          width: 100%;
        }

        .footer-line-top {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.05) 80%, transparent 100%);
          width: 100%;
          margin-bottom: var(--space-6);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
          gap: var(--space-5);
        }

        /* Bouncy Logo styling */
        .footer-logo-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .bouncy-logo-wrapper {
          display: flex;
          cursor: pointer;
        }

        .bouncy-letter {
          display: inline-block;
          font-family: var(--font-display), sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.35), color 0.3s ease;
        }

        .bouncy-logo-wrapper:hover .bouncy-letter {
          transform: translateY(-8px) scale(1.1) rotate(4deg);
          color: #FFC700;
        }

        /* Delay letter bounce effect to create a waving wave */
        .bouncy-letter:hover {
          transform: translateY(-12px) scale(1.25) rotate(-6deg) !important;
          color: #DD1021 !important;
        }

        .logo-badge-caption {
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--text-secondary);
          letter-spacing: 0.35em;
          font-weight: 700;
          margin-top: 4px;
        }

        /* Navigation links */
        .footer-links-block {
          display: flex;
          gap: var(--space-5);
          flex-wrap: wrap;
        }

        .bouncy-footer-link {
          font-family: var(--font-body), sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.35), color 0.3s ease;
        }

        .bouncy-footer-link:hover {
          transform: translateY(-4px) scale(1.05);
          color: #FFC700;
        }

        /* Bottom Copyright row */
        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: var(--space-4);
        }

        .copyright-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .disclaimer-text {
          font-family: monospace;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.2);
          max-width: 500px;
          text-align: right;
        }

        /* Responsive adaptations */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-6);
          }

          .footer-links-block {
            flex-direction: column;
            gap: var(--space-3);
          }

          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
          }

          .disclaimer-text {
            text-align: left;
            max-width: 100%;
            word-break: break-word;
          }
        }

        @media (max-width: 576px) {
          .bouncy-letter {
            font-size: 1.8rem;
          }
          .disclaimer-text {
            font-size: 0.6rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </footer>
  );
}
