"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Phase {
  id: number;
  number: string;
  title: string;
  videoSrc: string;
  goals: string[];
}

export default function RoadmapSection() {
  const [activePhase, setActivePhase] = useState(0);

  const phases: Phase[] = [
    {
      id: 0,
      number: "PHASE 1",
      title: "ORDER UP! 🍔",
      videoSrc: "/Roadmap/1.webm",
      goals: [
        "Fair launch on Solana with 100% burned LP.",
        "DEX listings & verification (DexScreener, DEXTools, Solscan).",
        "Kitchen preparations: Launching original characters and social portals.",
        "Welcoming the first 1,000+ guests to their seats.",
      ],
    },
    {
      id: 1,
      number: "PHASE 2",
      title: "KITCHEN EXPANSION 🚀",
      videoSrc: "/Roadmap/2.webm",
      goals: [
        "Strategic marketing integrations & aggressive publicity loops.",
        "CoinGecko and CoinMarketCap listings.",
        "Debut of daily animated episodes and custom character memes.",
        "Filling the dining room: Reaching 5,000+ active table guests.",
      ],
    },
    {
      id: 2,
      number: "PHASE 3",
      title: "FRANCHISING THE BRAND 📈",
      videoSrc: "/Roadmap/3.webm",
      goals: [
        "First wave of Centralized Exchange (CEX) listings.",
        "Real-world community campaigns with official MCDOGE restaurant merch.",
        "Custom NFT membership passes representing the MCDOGE kitchen crew.",
        "Growing our global family to 15,000+ active seats at the table.",
      ],
    },
    {
      id: 3,
      number: "PHASE 4",
      title: "GLOBAL FRANCHISE DOMINATION 🌕",
      videoSrc: "/Roadmap/4.webm",
      goals: [
        "Mainstream animated episodes and narrative takeover.",
        "Integrating MCDOGE into crypto payment gateways for food & beverages.",
        "Tier 1 Centralized Exchange integrations.",
        "Spreading financial freedom smiles to dining rooms worldwide.",
      ],
    },
  ];

  return (
    <section className="roadmap-section" id="roadmap">
      <div className="roadmap-inner">
        {/* Section Header */}
        <div className="roadmap-header">
          <h2 className="roadmap-section-title">
            MCDOGE <span className="text-highlight">ROADMAP</span>
          </h2>
          <p className="roadmap-section-subtitle">
            All kitchen preparation phases. Click any phase to expand the recipe.
          </p>
        </div>

        {/* Interactive Expanding Grid Container */}
        <div className="roadmap-accordion-grid">
          {phases.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <div
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`roadmap-card ${isActive ? "active" : ""}`}
              >
                {/* Background WebM Video Loop */}
                <video
                  src={phase.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="card-bg-video"
                />

                {/* Dark Overlay to maintain text contrast */}
                <div className="card-overlay" />

                {/* Card Content */}
                <div className="card-content">
                  {/* Top Bar: Number + Timeline Connector */}
                  <div className="card-top">
                    <span className="card-phase-num">{phase.number}</span>
                    <div className="card-indicator">
                      <span className="indicator-dot" />
                    </div>
                  </div>

                  {/* Bottom Bar: Title + Goals */}
                  <div className="card-bottom">
                    <h3 className="card-phase-title">{phase.title}</h3>

                    {/* Expandable Goals list */}
                    <div className="card-goals-wrapper">
                      <div className="goals-divider" />
                      <ul className="goals-list">
                        {phase.goals.map((goal, idx) => (
                          <li key={idx} className="goal-item">
                            <span className="goal-bullet" />
                            <span className="goal-text">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .roadmap-section {
          background-color: #000000;
          color: #ffffff;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 100px 6% 120px 6%;
          overflow: hidden;
        }

        .roadmap-inner {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .roadmap-header {
          margin-bottom: 60px;
          text-align: center;
        }

        .roadmap-section-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 3.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
        }

        .roadmap-section-title .text-highlight {
          color: #FFC700;
          text-shadow: 2px 2px 0px #8A1F0C, 4px 4px 0px rgba(0, 0, 0, 0.3);
        }

        .roadmap-section-subtitle {
          font-family: var(--font-body), sans-serif;
          font-size: 1.15rem;
          color: #a0a0a5;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* Accordion Grid styling */
        .roadmap-accordion-grid {
          display: flex;
          gap: 20px;
          width: 100%;
          height: 580px;
          margin-top: 20px;
        }

        .roadmap-card {
          flex: 1;
          min-width: 0;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background-color: #050505;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: flex 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        /* Hover effects */
        .roadmap-card:hover:not(.active) {
          border-color: rgba(255, 199, 0, 0.3);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        /* Active expanded state */
        .roadmap-card.active {
          flex: 2.8;
          border-color: #FFC700;
          box-shadow: 0 15px 40px rgba(255, 199, 0, 0.05), inset 0 0 40px rgba(0,0,0,0.8);
        }

        /* Background Video */
        .card-bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.12;
          transform: scale(1.08);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .roadmap-card.active .card-bg-video {
          opacity: 0.35;
          transform: scale(1);
        }

        /* Ambient Dark Gradients */
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0.4) 100%);
          transition: background 0.75s ease;
        }

        .roadmap-card.active .card-overlay {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0.2) 100%);
        }

        /* Card Content Layer */
        .card-content {
          position: relative;
          z-index: 3;
          padding: 36px;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .card-phase-num {
          font-family: var(--font-display), sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #DD1021;
          letter-spacing: 0.08em;
          transition: color 0.4s ease;
        }

        .roadmap-card.active .card-phase-num {
          color: #FFC700;
        }

        .card-indicator {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.4s ease, background-color 0.4s ease;
        }

        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: transparent;
          transition: background-color 0.4s ease, transform 0.4s ease;
        }

        .roadmap-card.active .card-indicator {
          border-color: #FFC700;
          background-color: rgba(255, 199, 0, 0.1);
        }

        .roadmap-card.active .indicator-dot {
          background-color: #FFC700;
          transform: scale(1.2);
        }

        .card-bottom {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .card-phase-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 2.1rem;
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: color 0.4s ease, font-size 0.4s ease;
        }

        .roadmap-card.active .card-phase-title {
          color: #FFC700;
        }

        /* Expanding Goals list container */
        .card-goals-wrapper {
          opacity: 0;
          max-height: 0;
          width: 440px;
          overflow: hidden;
          transition: opacity 0.4s ease, max-height 0.85s cubic-bezier(0.16, 1, 0.3, 1), margin-top 0.4s ease;
        }

        .roadmap-card.active .card-goals-wrapper {
          opacity: 1;
          max-height: 380px;
          margin-top: 24px;
        }

        .goals-divider {
          width: 40px;
          height: 2px;
          background-color: #DD1021;
          margin-bottom: 20px;
        }

        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .goal-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .goal-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #FFC700;
          margin-top: 7px;
          flex-shrink: 0;
        }

        .goal-text {
          font-family: var(--font-body), sans-serif;
          font-size: 0.95rem;
          color: #d1d1d6;
          line-height: 1.45;
        }

        /* Responsive Layout styles */
        @media (max-width: 1024px) {
          .roadmap-section {
            padding: 80px 24px;
          }

          .roadmap-section-title {
            font-size: 2.8rem;
          }

          .roadmap-accordion-grid {
            flex-direction: column;
            height: auto;
            gap: 16px;
          }

          .roadmap-card {
            flex: none;
            width: 100%;
            height: 100px;
            transition: height 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.4s ease;
          }

          .roadmap-card.active {
            flex: none;
            height: 380px;
          }

          .card-content {
            padding: 24px;
          }

          .card-phase-title {
            font-size: 1.6rem;
            margin-top: 8px;
          }

          .roadmap-card.active .card-phase-title {
            font-size: 1.8rem;
          }

          .card-goals-wrapper {
            width: 100% !important;
          }

          .roadmap-card.active .card-goals-wrapper {
            max-height: 280px;
            margin-top: 16px;
          }
          
          .card-bg-video {
            opacity: 0.08;
            transform: scale(1.04);
            transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .roadmap-card.active .card-bg-video {
            opacity: 0.25;
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          .roadmap-section {
            padding: 60px 16px;
          }

          .roadmap-section-title {
            font-size: 2.2rem;
          }

          .roadmap-card.active {
            height: 420px;
          }

          .goal-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
