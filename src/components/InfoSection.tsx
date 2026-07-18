"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function InfoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight position
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D Tilt calculation
    const width = rect.width;
    const height = rect.height;
    const rotateX = ((y - height / 2) / height) * -12; // tilt max 12 degrees
    const rotateY = ((width / 2 - x) / width) * 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.025,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Stagger animate cards with 3D rotation on scroll entrance
      const cards = gsap.utils.toArray(".info-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          rotationX: -20,
          rotationY: 5,
          scale: 0.93,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate SVG path (Exposure chart line)
      gsap.fromTo(
        ".chart-path",
        {
          strokeDashoffset: 240,
        },
        {
          strokeDashoffset: 0,
          duration: 2.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".info-card-chart",
            start: "top 80%",
          },
        }
      );

      // Animate section header
      gsap.fromTo(
        ".info-section-header",
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
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="info-section container">
      {/* Glow Ambient Orbs */}
      <div className="info-orb orb-1" />
      <div className="info-orb orb-2" />

      <div className="info-section-header">
        <span className="info-subtitle">// Welcome Home</span>
        <h2 className="info-title">Inside the Kitchen</h2>
      </div>

      <div className="info-grid">
        {/* Card 1: Strong Community (Bento Large col-span-2) */}
        <div
          className="info-card col-span-2"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-grid-pattern" />
          <div className="info-card-inner">
            <div className="icon-wrapper icon-community">
              <span className="material-symbols-outlined">table_restaurant</span>
            </div>
            <div className="card-badge-glow community-badge">/ THE FAMILY TABLE</div>
            <h3 className="card-heading">A Seat at the Table</h3>
            <p className="card-text" style={{ maxWidth: "680px" }}>
              A community where everyone has a seat at the table. We build together with transparency, 
              execution, and zero hierarchies. Grab a seat, enjoy the ride, and join the MCDOGE family.
            </p>
          </div>
        </div>

        {/* Card 2: Unique Meme Narrative (Bento Small col-span-1) */}
        <div
          className="info-card col-span-1"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-grid-pattern" />
          <div className="info-card-inner">
            <div className="icon-wrapper icon-meme">
              <span className="material-symbols-outlined">face</span>
            </div>
            <div className="card-badge-glow meme-badge">/ THE CREW</div>
            <h3 className="card-heading">Original Characters</h3>
            <p className="card-text">
              Meet our unique, custom-designed kitchen crew starring in our daily episodes and fresh restaurant memes.
            </p>
          </div>
        </div>

        {/* Card 3: Growing Exposure (Bento Small col-span-1 info-card-chart) */}
        <div
          className="info-card col-span-1 info-card-chart"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-grid-pattern" />
          <div className="info-card-inner">
            <div className="icon-wrapper icon-exposure">
              <span className="material-symbols-outlined">smart_display</span>
            </div>
            <div className="card-badge-glow exposure-badge">/ DAILY EPISODES</div>
            <h3 className="card-heading">Daily Episodes</h3>
            <p className="card-text">
              Every day, a new story begins. Tune in daily to watch the comedy, drama, and fun unfold in the MCDOGE kitchen.
            </p>

            {/* Premium Animated SVG Line Chart */}
            <div className="chart-container">
              <svg viewBox="0 0 200 80" className="trend-chart">
                <defs>
                  <linearGradient id="chart-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FFC700" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 70 Q 50 68 85 45 T 160 25 T 190 10"
                  fill="none"
                  stroke="url(#chart-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="chart-path"
                />
                <circle cx="190" cy="10" r="4.5" fill="#FFC700" className="chart-dot" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Built on Solana (Bento Large col-span-2) */}
        <div
          className="info-card col-span-2"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-grid-pattern" />
          <div className="info-card-inner flex-row-layout">
            <div className="card-text-side">
              <div className="card-badge-glow solana-badge">/ THE RESTAURANT ENGINE</div>
              <h3 className="card-heading">Solana Kitchen Base</h3>
              <p className="card-text">
                Fast. Cheap. Scalable. Solana powers our restaurant infrastructure, enabling 
                lightning-fast trades and sub-cent transaction fees.
              </p>
            </div>

            <div className="card-graphic-side">
              {/* Solana Premium Portal Widget */}
              <div className="solana-widget-premium">
                <div className="logo-box-large">
                  <div className="solana-glow-effect" />
                  <img
                    src="/solana-sol-logo.png"
                    alt="Solana Logo"
                    className="solana-logo-img-premium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styled JSX specifically for InfoSection components */}
      <style jsx global>{`
        /* Ecosystem Pillars Section */
        .info-section {
          position: relative;
          z-index: 10;
          padding: var(--space-9) var(--space-5);
          margin-top: var(--space-6);
          margin-bottom: var(--space-8);
        }

        /* Ambient Glow Orbs */
        .info-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.15;
        }

        .orb-1 {
          top: 0%;
          left: 10%;
          width: 300px;
          height: 300px;
          background: #FFC700;
        }

        .orb-2 {
          bottom: 10%;
          right: 5%;
          width: 400px;
          height: 400px;
          background: #FA5D29;
        }

        .info-section-header {
          margin-bottom: var(--space-7);
          text-align: left;
          border-left: 2px solid #FFC700;
          padding-left: var(--space-4);
        }

        .info-subtitle {
          font-family: monospace;
          font-size: var(--font-size-caption);
          color: #FFC700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 700;
          display: block;
          margin-bottom: var(--space-1);
        }

        .info-title {
          font-family: var(--font-display), sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        /* Bento Grid Setup */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          width: 100%;
        }

        .info-card {
          position: relative;
          background: rgba(12, 12, 12, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 28px;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }

        .info-card.col-span-2 {
          grid-column: span 2;
        }

        .info-card.col-span-1 {
          grid-column: span 1;
        }

        /* Dotted grid pattern overlay */
        .card-grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1.5px, transparent 1.5px);
          background-size: 20px 20px;
          z-index: 1;
          pointer-events: none;
        }

        /* Spotlight tracking glow */
        .info-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            260px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(255, 199, 0, 0.07),
            transparent 80%
          );
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .info-card:hover::before {
          opacity: 1;
        }

        .info-card:hover {
          border-color: rgba(255, 199, 0, 0.2);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
        }

        .info-card-inner {
          position: relative;
          z-index: 3;
          padding: var(--space-6) var(--space-7);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
          transform: translateZ(30px);
          justify-content: space-between;
        }

        .flex-row-layout {
          flex-direction: row;
          align-items: center;
          gap: var(--space-6);
        }

        .card-text-side {
          flex: 1.2;
        }

        .card-graphic-side {
          flex: 0.8;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .card-badge-glow {
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: var(--space-3);
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .community-badge {
          background: rgba(34, 197, 94, 0.08);
          border: 1.5px solid rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .meme-badge {
          background: rgba(234, 179, 8, 0.08);
          border: 1.5px solid rgba(234, 179, 8, 0.15);
          color: #eab308;
        }

        .exposure-badge {
          background: rgba(249, 115, 22, 0.08);
          border: 1.5px solid rgba(249, 115, 22, 0.15);
          color: #f97316;
        }

        .solana-badge {
          background: rgba(153, 69, 255, 0.08);
          border: 1.5px solid rgba(153, 69, 255, 0.15);
          color: #a855f7;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 16px;
          margin-bottom: var(--space-4);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .info-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg) translateZ(15px);
        }

        .icon-wrapper .material-symbols-outlined {
          font-size: 28px;
        }

        /* Community Avatars stacked widget */
        .community-widget {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          padding: var(--space-4) var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          align-items: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 240px;
        }

        .avatar-stack {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #080808;
          overflow: hidden;
          margin-left: -12px;
          background: #111;
        }

        .avatar-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-circle-more {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #080808;
          background: #FFC700;
          color: #000;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -12px;
          box-shadow: 0 4px 15px rgba(255, 199, 0, 0.25);
        }

        .member-ticker {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ticker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse 1.5s infinite;
        }

        .ticker-label {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .ticker-value {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff;
        }

        /* Chart visual styling */
        .chart-container {
          width: 100%;
          margin-top: var(--space-4);
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 8px;
          border: 1.5px solid rgba(255, 255, 255, 0.02);
        }

        .trend-chart {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .chart-path {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
        }

        .chart-dot {
          filter: drop-shadow(0 0 8px #FFC700);
          animation: pulse 2s infinite;
        }

        /* Solana widget styling */
        .solana-widget {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          padding: var(--space-4) var(--space-5);
          display: flex;
          gap: var(--space-4);
          align-items: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 250px;
        }

        .logo-box {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .solana-glow-effect {
          position: absolute;
          width: 130%;
          height: 130%;
          background: radial-gradient(circle, rgba(20, 241, 149, 0.25) 0%, transparent 60%);
          animation: rotation 8s linear infinite;
        }

        .solana-logo-img-premium {
          width: 28px;
          height: 28px;
          object-fit: contain;
          z-index: 2;
        }

        .solana-metrics {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .metric-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 2px;
        }

        .metric-label {
          font-family: monospace;
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .metric-value {
          font-family: monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: #ffffff;
        }

        .font-neon {
          color: #14F195;
          text-shadow: 0 0 8px rgba(20, 241, 149, 0.45);
        }

        /* General card typography */
        .card-heading {
          font-family: var(--font-body), sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: var(--space-2);
          text-transform: uppercase;
          letter-spacing: 0.01em;
          transform: translateZ(15px);
        }

        .card-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          transform: translateZ(10px);
        }

        /* Icon gradient fills */
        .icon-community {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(234, 179, 8, 0.15));
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #22c55e;
        }

        .icon-meme {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(249, 115, 22, 0.15));
          border: 1px solid rgba(234, 179, 8, 0.25);
          color: #eab308;
        }

        .icon-exposure {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(239, 68, 68, 0.15));
          border: 1px solid rgba(249, 115, 22, 0.25);
          color: #f97316;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.85;
          }
        }

        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 992px) {
          .info-section {
            padding: var(--space-8) var(--space-4);
            margin-top: var(--space-4);
            margin-bottom: var(--space-4);
          }
          .info-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-4);
          }
          .info-card.col-span-2 {
            grid-column: span 2;
          }
          .flex-row-layout {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-5);
          }
          .card-graphic-side {
            justify-content: flex-start;
          }
          .info-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          .info-card.col-span-2 {
            grid-column: span 1;
          }
          .desktop-break {
            display: none;
          }
          .info-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
