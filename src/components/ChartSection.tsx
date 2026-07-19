"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, RefreshCw, BarChart2 } from "lucide-react";

interface PairData {
  priceUsd: string;
  fdv: number;
  liquidity: {
    usd: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h24: number;
  };
}

export default function ChartSection() {
  const [stats, setStats] = useState<PairData | null>(null);
  const [loading, setLoading] = useState(true);
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);
  const prevPriceRef = useRef<string | null>(null);
  
  const pairAddress = "9ZMuy8RsLo4PjTCmnVcCAg5M2ADfNNWLSGaqzKvqHpDZ";
  const apiEndpoint = `https://api.dexscreener.com/latest/dex/pairs/solana/${pairAddress}`;
  const embedUrl = `https://dexscreener.com/solana/${pairAddress}?embed=1&theme=dark&trades=0&info=0`;

  const fetchStats = async () => {
    try {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      if (data && data.pairs && data.pairs.length > 0) {
        const pair: PairData = data.pairs[0];
        
        // Price flashing logic
        if (prevPriceRef.current !== null) {
          const prev = parseFloat(prevPriceRef.current);
          const curr = parseFloat(pair.priceUsd);
          if (curr > prev) {
            setPriceFlash("up");
            setTimeout(() => setPriceFlash(null), 1000);
          } else if (curr < prev) {
            setPriceFlash("down");
            setTimeout(() => setPriceFlash(null), 1000);
          }
        }
        
        prevPriceRef.current = pair.priceUsd;
        setStats(pair);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch DexScreener data:", err);
    }
  };

  useEffect(() => {
    fetchStats();

    // 10 second update interval
    const interval = setInterval(() => {
      fetchStats();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPrice = (priceStr: string | undefined) => {
    if (!priceStr) return "$0.00000000";
    const priceNum = parseFloat(priceStr);
    if (priceNum === 0) return "$0.00000000";
    
    // Display up to 8 decimal places for small tokens
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    }).format(priceNum);
  };

  return (
    <section className="chart-stats-section" id="chart">
      <div className="cs-inner">
        {/* Section Title */}
        <div className="cs-header">
          <h2 className="cs-section-title">
            LIVE <span className="text-highlight">CHARTS & STATS</span>
          </h2>
          <p className="cs-section-subtitle">
            Track $MCDOGE market activity and liquidity pools in real time.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="cs-grid">
          {/* Left Column: Iframe Chart (Only Chart, No Info) */}
          <div className="cs-chart-container">
            <iframe
              src={embedUrl}
              className="cs-iframe"
              title="DexScreener Live Trading Chart"
              allow="clipboard-write"
              loading="lazy"
            />
          </div>

          {/* Right Column: Live Statistics panel */}
          <div className="cs-stats-panel">
            {/* Live Indicator */}
            <div className="stats-live-indicator">
              <span className="live-pulse-dot" />
              <span className="live-text">LIVE STATS</span>
            </div>

            {loading ? (
              <div className="stats-loader-container">
                <div className="stats-spinner" />
                <span className="loader-label">Fetching live data...</span>
              </div>
            ) : (
              <div className="stats-cards-list">
                {/* Price Display */}
                <div className={`stats-card price-card ${priceFlash ? `flash-${priceFlash}` : ""}`}>
                  <span className="stat-label">CURRENT PRICE</span>
                  <div className="price-wrapper">
                    <span className="price-value">
                      {formatPrice(stats?.priceUsd)}
                    </span>
                  </div>
                  {stats?.priceChange && (
                    <div className="price-changes-row">
                      <span className={`change-badge ${stats.priceChange.m5 >= 0 ? "positive" : "negative"}`}>
                        5m: {stats.priceChange.m5 >= 0 ? "+" : ""}{stats.priceChange.m5}%
                      </span>
                      <span className={`change-badge ${stats.priceChange.h1 >= 0 ? "positive" : "negative"}`}>
                        1h: {stats.priceChange.h1 >= 0 ? "+" : ""}{stats.priceChange.h1}%
                      </span>
                      <span className={`change-badge ${stats.priceChange.h24 >= 0 ? "positive" : "negative"}`}>
                        24h: {stats.priceChange.h24 >= 0 ? "+" : ""}{stats.priceChange.h24}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Market Cap Display */}
                <div className="stats-card">
                  <span className="stat-label">MARKET CAP</span>
                  <span className="stat-value text-yellow">
                    {formatNumber(stats?.fdv)}
                  </span>
                  <span className="stat-subtext">Based on circulating supply</span>
                </div>

                {/* Liquidity Display */}
                <div className="stats-card">
                  <span className="stat-label">TOTAL POOL LIQUIDITY</span>
                  <span className="stat-value text-red">
                    {formatNumber(stats?.liquidity?.usd)}
                  </span>
                  <span className="stat-subtext">100% Locked & Burned Liquidity</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .chart-stats-section {
          background-color: #050505;
          color: #ffffff;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 100px 6% 120px 6%;
          overflow: hidden;
        }

        .cs-inner {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .cs-header {
          margin-bottom: 60px;
          text-align: center;
        }

        .cs-section-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 3.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
        }

        .cs-section-title .text-highlight {
          color: #FFC700;
          text-shadow: 2px 2px 0px #8A1F0C, 4px 4px 0px rgba(0, 0, 0, 0.3);
        }

        .cs-section-subtitle {
          font-family: var(--font-body), sans-serif;
          font-size: 1.15rem;
          color: #a0a0a5;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* 2-Column layout grid */
        .cs-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 40px;
          align-items: stretch;
          width: 100%;
        }

        /* Iframe container */
        .cs-chart-container {
          background-color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          overflow: hidden;
          height: 520px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          position: relative;
        }

        .cs-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        /* Stats Panel */
        .cs-stats-panel {
          background-color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          min-height: 520px;
          box-sizing: border-box;
        }

        /* Live Indicator Top */
        .stats-live-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }

        .live-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #65b32e;
          box-shadow: 0 0 10px #65b32e;
          animation: livePulse 1.8s infinite;
        }

        @keyframes livePulse {
          0% {
            transform: scale(0.9);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.9);
            opacity: 1;
          }
        }

        .live-text {
          font-family: var(--font-display), sans-serif;
          font-size: 0.9rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .refresh-countdown {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
          font-family: var(--font-body), sans-serif;
          font-size: 0.8rem;
          color: #8a8a8f;
        }

        .refresh-icon-spin {
          color: #FFC700;
          animation: spinIcon 10s linear infinite;
        }

        @keyframes spinIcon {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Loader */
        .stats-loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          gap: 16px;
        }

        .stats-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #FFC700;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loader-label {
          font-family: var(--font-body), sans-serif;
          font-size: 0.9rem;
          color: #a0a0a5;
        }

        /* Stats Cards List */
        .stats-cards-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          flex-grow: 1;
          justify-content: center;
        }

        .stats-card {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: background-color 0.5s ease, border-color 0.5s ease, transform 0.3s ease;
        }

        .stats-card:hover {
          background-color: rgba(255, 255, 255, 0.04);
          transform: translateX(4px);
        }

        .stat-label {
          font-family: var(--font-display), sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          color: #8a8a8f;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .stat-value {
          font-family: var(--font-display), sans-serif;
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.01em;
        }

        .text-yellow {
          color: #FFC700;
        }

        .text-red {
          color: #DD1021;
        }

        .stat-subtext {
          font-family: var(--font-body), sans-serif;
          font-size: 0.8rem;
          color: #55555a;
        }

        /* Price display specific formatting */
        .price-card {
          border-left: 3px solid rgba(255, 255, 255, 0.1);
        }

        .price-wrapper {
          display: flex;
          align-items: center;
        }

        .price-value {
          font-family: var(--font-body), monospace;
          font-size: 1.7rem;
          font-weight: 700;
          color: #ffffff;
          transition: color 0.3s ease;
        }

        /* Flashing price indicators */
        .price-card.flash-up {
          border-left-color: #65b32e;
          background-color: rgba(101, 179, 70, 0.05);
        }
        .price-card.flash-up .price-value {
          color: #65b32e;
        }

        .price-card.flash-down {
          border-left-color: #DD1021;
          background-color: rgba(221, 16, 33, 0.05);
        }
        .price-card.flash-down .price-value {
          color: #DD1021;
        }

        .price-changes-row {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }

        .change-badge {
          font-family: var(--font-body), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .change-badge.positive {
          background-color: rgba(101, 179, 70, 0.12);
          color: #65b32e;
        }

        .change-badge.negative {
          background-color: rgba(221, 16, 33, 0.12);
          color: #DD1021;
        }

        /* Status bar footer */
        .stats-status-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
          margin-top: 20px;
        }

        .text-green {
          color: #65b32e;
        }

        .status-message {
          font-family: var(--font-display), sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          color: #65b32e;
          letter-spacing: 0.05em;
        }

        /* Breakpoints */
        @media (max-width: 1024px) {
          .cs-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .cs-chart-container {
            height: 420px;
          }

          .cs-stats-panel {
            min-height: auto;
            padding: 24px;
          }
        }

        @media (max-width: 580px) {
          .chart-stats-section {
            padding: 80px 24px;
          }

          .cs-section-title {
            font-size: 2.8rem;
          }

          .cs-chart-container {
            height: 360px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .price-value {
            font-size: 1.45rem;
          }
        }

        @media (max-width: 480px) {
          .chart-stats-section {
            padding: 60px 16px;
          }

          .cs-section-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
