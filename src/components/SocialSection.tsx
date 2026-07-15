"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.74 3.88-1.69 6.47-2.8 7.77-3.32 3.7-1.47 4.47-1.73 4.97-1.74.11 0 .36.03.52.16.14.11.18.27.2.38-.01.07-.01.17-.02.26z" />
    </svg>
  );
}

function PumpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M19.07 4.93a6.002 6.002 0 0 0-8.49 0l-5.65 5.66a6.002 6.002 0 0 0 0 8.49 6.002 6.002 0 0 0 8.49 0l5.65-5.66a6.002 6.002 0 0 0 0-8.49zM9.54 17.66a4.001 4.001 0 0 1-5.66-5.66l2.12-2.12c1.78.89 3.54 2.66 4.43 4.43l-2.89 3.35zm7.07-7.07l-2.12 2.12c-.89-.89-2.66-2.66-3.54-4.43l2.83-2.83a4.001 4.001 0 0 1 5.66 5.66l-2.83 2.83z" />
    </svg>
  );
}

export default function SocialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Section animations
      gsap.fromTo(
        ".social-left-col",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".social-right-col",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="social-section container" id="social">
      {/* Background Orbs */}
      <div className="social-orb orb-red-glow" />
      <div className="social-orb orb-yellow-glow" />

      <div className="social-content-grid">
        {/* Left Column: Social channels and solana info */}
        <div className="social-left-col">
          <span className="social-tag">// TELEGRAM & TWITTER</span>
          <h2 className="social-heading">Join MCGOOGLES</h2>
          <p className="social-description">
            Be part of the restaurant franchise revolution. Follow our official accounts 
            for live updates, meme contests, and token swap drops.
          </p>

          <div className="social-buttons-wrapper">
            <a href="https://x.com/mcgooglescoin?s=11&t=9A8TB5U2jYixpYBhO1V8Fg" target="_blank" rel="noopener noreferrer" className="social-btn btn-x" aria-label="X Twitter">
              <XIcon />
              <span>TWITTER</span>
            </a>
            <a href="https://t.me/Mcgooglescoin" target="_blank" rel="noopener noreferrer" className="social-btn btn-tg" aria-label="Telegram">
              <TelegramIcon />
              <span>TELEGRAM</span>
            </a>
            <a href="https://pump.fun/coin/6RAJbAeVHc1qNXYmMi9jj4q2PrWPfPkqQQVuCTScpump" target="_blank" rel="noopener noreferrer" className="social-btn btn-pump" aria-label="Pump.fun">
              <PumpIcon />
              <span>PUMP.FUN</span>
            </a>
          </div>

          {/* Solana Line separator */}
          <div className="solana-divider-container">
            <div className="solana-line" />
            <div className="solana-branding-row">
              <span className="solana-lbl">POWERED BY SOLANA</span>
              <img 
                src="/solana-sol-logo.png" 
                alt="Solana Logo" 
                className="solana-logo-img"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sleeping McGoogles Image */}
        <div className="social-right-col">
          <div className="sleep-image-frame">
            <div className="sleep-glow" />
            <img 
              src="/sleep.png" 
              alt="McGoogles Frog sleeping on cash" 
              className="sleep-frog-asset"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .social-section {
          position: relative;
          z-index: 10;
          padding: var(--space-9) var(--space-5);
          margin-top: var(--space-6);
          margin-bottom: var(--space-6);
        }

        /* Ambient Glow Orbs */
        .social-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.12;
        }

        .orb-red-glow {
          top: 15%;
          left: 10%;
          width: 320px;
          height: 320px;
          background: #DD1021;
        }

        .orb-yellow-glow {
          bottom: 15%;
          right: 15%;
          width: 350px;
          height: 350px;
          background: #FFC700;
        }

        /* Grid System */
        .social-content-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: var(--space-8);
          align-items: center;
        }

        /* Left Side styles */
        .social-left-col {
          display: flex;
          flex-direction: column;
        }

        .social-tag {
          font-family: monospace;
          font-size: var(--font-size-caption);
          color: #FFC700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 700;
          margin-bottom: var(--space-1);
        }

        .social-heading {
          font-family: var(--font-display), sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }

        .social-description {
          font-size: 1.02rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 540px;
          margin-bottom: var(--space-5);
        }

        /* Social buttons */
        .social-buttons-wrapper {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
          margin-bottom: var(--space-6);
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          font-family: var(--font-body), sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          letter-spacing: 0.05em;
        }

        .btn-x:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .btn-tg:hover {
          background: rgba(0, 136, 204, 0.08);
          border-color: rgba(0, 136, 204, 0.4);
          color: #0088cc;
          box-shadow: 0 10px 25px rgba(0, 136, 204, 0.15);
          transform: translateY(-2px);
        }

        .btn-pump:hover {
          background: rgba(20, 241, 149, 0.08);
          border-color: rgba(20, 241, 149, 0.4);
          color: #14F195;
          box-shadow: 0 10px 25px rgba(20, 241, 149, 0.15);
          transform: translateY(-2px);
        }

        /* Divider line with Solana label & logo */
        .solana-divider-container {
          margin-top: var(--space-4);
          width: 100%;
          max-width: 540px;
        }

        .solana-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%);
          width: 100%;
          margin-bottom: var(--space-3);
        }

        .solana-branding-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .solana-lbl {
          font-family: monospace;
          font-size: 0.72rem;
          color: var(--text-secondary);
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .solana-logo-img {
          height: 12px;
          width: auto;
          object-fit: contain;
          opacity: 0.8;
          filter: drop-shadow(0 0 4px rgba(20, 241, 149, 0.25));
        }

        /* Right Side: Sleeping McGoogles */
        .social-right-col {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .sleep-image-frame {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1 / 1;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .sleep-image-frame:hover {
          transform: translateY(-5px) scale(1.02);
        }

        .sleep-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(255, 199, 0, 0.08), transparent 70%);
          z-index: 1;
          pointer-events: none;
        }

        .sleep-frog-asset {
          width: 90%;
          height: 90%;
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5));
          transition: transform 0.4s ease;
        }

        .sleep-image-frame:hover .sleep-frog-asset {
          transform: scale(1.05);
        }

        /* Responsive */
        @media (max-width: 992px) {
          .social-content-grid {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .social-right-col {
            order: -1; /* Display sleep image on top on tablet/mobile */
          }

          .social-heading {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .social-section {
            padding: var(--space-8) var(--space-4);
          }

          .social-heading {
            font-size: 2.2rem;
          }

          .social-buttons-wrapper {
            flex-direction: column;
            gap: var(--space-2);
          }

          .social-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
