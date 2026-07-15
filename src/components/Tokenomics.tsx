"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Tokenomics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Scroll reveal for the chart (draw segments)
      const segments = gsap.utils.toArray(".chart-segment");
      segments.forEach((seg: any) => {
        const length = 439.82;
        gsap.fromTo(
          seg,
          {
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: (i, target) => {
              // Read the offset from the attribute to preserve the gap calculations
              return parseFloat(target.getAttribute("data-offset") || "0");
            },
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      });

      // Stagger animate split rows
      gsap.fromTo(
        ".split-row",
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Section header animate
      gsap.fromTo(
        ".tokenomics-header",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const allocations = [
    {
      label: "Liquidity Pool (LP)",
      pct: "80%",
      color: "#22c55e",
      desc: "Locked and burned permanently. Zero rug risk, full degen safety.",
    },
    {
      label: "Marketing & CEX Listings",
      pct: "10%",
      color: "#f97316",
      desc: "Reserved for major tier-1 exchanges, media reach, and promotions.",
    },
    {
      label: "Community Airdrops",
      pct: "5%",
      color: "#eab308",
      desc: "Distributed back to our most active burgers, contributors, and loyal community.",
    },
    {
      label: "Core Development",
      pct: "5%",
      color: "#a855f7",
      desc: "Allocated for technology scaling, franchise system, and expansion funding.",
    },
  ];

  return (
    <section ref={containerRef} className="tokenomics-section container" id="tokenomics">
      {/* Background Glows */}
      <div className="tokenomics-orb orb-yellow" />
      <div className="tokenomics-orb orb-purple" />

      <div className="tokenomics-header">
        <span className="tokenomics-subtitle">// TOKENS SPLIT</span>
        <h2 className="tokenomics-title">Tokenomics</h2>
      </div>

      <div className="tokenomics-content">
        {/* Left Side: Flat Segmented Donut Chart */}
        <div className="tokenomics-chart-side">
          <div className="chart-flat-wrapper">
            <div className="chart-flat-container">
              
              <svg viewBox="0 0 200 200" className="donut-chart-svg">
                {/* LP Segment (80%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth={hoveredIdx === 0 ? 19 : 14}
                  opacity={hoveredIdx === null || hoveredIdx === 0 ? 1 : 0.4}
                  strokeDasharray="347.86 439.82"
                  strokeDashoffset="0"
                  data-offset="0"
                  className="chart-segment segment-lp"
                  onMouseEnter={() => setHoveredIdx(0)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transition: "stroke-width 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, stroke 0.3s ease",
                    filter: hoveredIdx === 0 ? "drop-shadow(0 0 8px #22c55e80)" : "none"
                  }}
                />

                {/* Marketing Segment (10%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth={hoveredIdx === 1 ? 19 : 14}
                  opacity={hoveredIdx === null || hoveredIdx === 1 ? 1 : 0.4}
                  strokeDasharray="39.98 439.82"
                  strokeDashoffset="-351.86"
                  data-offset="-351.86"
                  className="chart-segment segment-marketing"
                  onMouseEnter={() => setHoveredIdx(1)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transition: "stroke-width 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, stroke 0.3s ease",
                    filter: hoveredIdx === 1 ? "drop-shadow(0 0 8px #f9731680)" : "none"
                  }}
                />

                {/* Airdrops Segment (5%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#eab308"
                  strokeWidth={hoveredIdx === 2 ? 19 : 14}
                  opacity={hoveredIdx === null || hoveredIdx === 2 ? 1 : 0.4}
                  strokeDasharray="17.99 439.82"
                  strokeDashoffset="-395.84"
                  data-offset="-395.84"
                  className="chart-segment segment-airdrop"
                  onMouseEnter={() => setHoveredIdx(2)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transition: "stroke-width 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, stroke 0.3s ease",
                    filter: hoveredIdx === 2 ? "drop-shadow(0 0 8px #eab30880)" : "none"
                  }}
                />

                {/* Dev Segment (5%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth={hoveredIdx === 3 ? 19 : 14}
                  opacity={hoveredIdx === null || hoveredIdx === 3 ? 1 : 0.4}
                  strokeDasharray="17.99 439.82"
                  strokeDashoffset="-417.83"
                  data-offset="-417.83"
                  className="chart-segment segment-dev"
                  onMouseEnter={() => setHoveredIdx(3)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transition: "stroke-width 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, stroke 0.3s ease",
                    filter: hoveredIdx === 3 ? "drop-shadow(0 0 8px #a855f780)" : "none"
                  }}
                />
              </svg>

              {/* Center Face Image */}
              <div className="chart-center-face">
                <div className="face-glow-ring" />
                <img 
                  src="/face.png" 
                  alt="McGoogles Face Logo" 
                  className="face-img-center" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Total Supply & Allocation Breakdown list */}
        <div className="tokenomics-info-side">
          <div className="supply-card">
            <span className="supply-label">TOTAL SUPPLY</span>
            <div className="supply-value-wrapper">
              <h3 className="supply-value">1,000,000,000</h3>
              <span className="supply-ticker">$MCGOOGLES</span>
            </div>
          </div>

          <div className="split-list">
            {allocations.map((alloc, idx) => (
              <div 
                key={idx} 
                className={`split-row ${hoveredIdx === idx ? "split-row-hovered" : ""}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: hoveredIdx === idx ? "translateX(8px)" : "translateX(0)",
                  borderColor: hoveredIdx === idx ? `${alloc.color}35` : "rgba(255, 255, 255, 0.02)",
                  background: hoveredIdx === idx ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)",
                  transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                  cursor: "pointer"
                }}
              >
                <div className="split-bar-indicator" style={{ background: alloc.color }} />
                <div className="split-info">
                  <div className="split-meta">
                    <span className="split-label" style={{ color: hoveredIdx === idx ? alloc.color : "#ffffff", transition: "color 0.3s ease" }}>
                      {alloc.label}
                    </span>
                    <span className="split-pct font-neon" style={{ color: alloc.color, textShadow: hoveredIdx === idx ? `0 0 12px ${alloc.color}` : `0 0 10px ${alloc.color}30`, transition: "text-shadow 0.3s ease" }}>
                      {alloc.pct}
                    </span>
                  </div>
                  <p className="split-desc" style={{ color: hoveredIdx === idx ? "rgba(255, 255, 255, 0.9)" : "var(--text-secondary)", transition: "color 0.3s ease" }}>
                    {alloc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tokenomics-section {
          position: relative;
          z-index: 10;
          padding: var(--space-9) var(--space-5);
          margin-top: var(--space-4);
          margin-bottom: var(--space-4);
        }

        /* Ambient Glow Orbs */
        .tokenomics-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.12;
        }

        .orb-yellow {
          top: 30%;
          left: 5%;
          width: 320px;
          height: 320px;
          background: #FFC700;
        }

        .orb-purple {
          bottom: 10%;
          right: 15%;
          width: 380px;
          height: 380px;
          background: #9945FF;
        }

        .tokenomics-header {
          margin-bottom: var(--space-8);
          border-left: 2px solid #FFC700;
          padding-left: var(--space-4);
        }

        .tokenomics-subtitle {
          font-family: monospace;
          font-size: var(--font-size-caption);
          color: #FFC700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-weight: 700;
          display: block;
          margin-bottom: var(--space-1);
        }

        .tokenomics-title {
          font-family: var(--font-display), sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        /* Content Grid split */
        .tokenomics-content {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: var(--space-8);
          align-items: center;
        }

        /* Flat Chart wrapper styling */
        .tokenomics-chart-side {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .chart-flat-wrapper {
          position: relative;
          width: 100%;
          max-width: 340px;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chart-flat-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .donut-chart-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          transform: rotate(-90deg); /* Rotate to start segments at 12 o'clock */
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
        }

        .chart-segment {
          cursor: pointer;
        }

        /* Center Face image layout */
        .chart-center-face {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 124px;
          height: 124px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          background: #080808;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .chart-flat-container:hover .chart-center-face {
          transform: translate(-50%, -50%) scale(1.05);
        }

        .face-img-center {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .chart-flat-container:hover .face-img-center {
          transform: scale(1.08);
        }

        .face-glow-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
          pointer-events: none;
          z-index: 11;
        }

        /* Info column styles */
        .tokenomics-info-side {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        .supply-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          padding: var(--space-4) var(--space-5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        .supply-label {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: var(--space-1);
        }

        .supply-value-wrapper {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .supply-value {
          font-family: var(--font-body), sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: #FFC700;
          text-shadow: 0 0 15px rgba(255, 199, 0, 0.2);
          line-height: 1.1;
        }

        .supply-ticker {
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #ffffff;
        }

        .split-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .split-row {
          display: flex;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          padding: var(--space-4) var(--space-5);
        }

        .split-bar-indicator {
          width: 4px;
          border-radius: 4px;
          margin-right: var(--space-4);
          flex-shrink: 0;
        }

        .split-info {
          width: 100%;
        }

        .split-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .split-label {
          font-family: var(--font-body), sans-serif;
          font-size: 0.98rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.01em;
        }

        .split-pct {
          font-family: monospace;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .split-desc {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Responsive adaptations */
        @media (max-width: 992px) {
          .tokenomics-content {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .tokenomics-chart-side {
            order: -1; /* Display chart on top on mobile */
          }

          .tokenomics-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .tokenomics-section {
            padding: var(--space-8) var(--space-4);
          }
          
          .supply-value {
            font-size: 1.8rem;
          }

          .tokenomics-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
