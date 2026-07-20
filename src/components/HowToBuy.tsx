"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HowToBuy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const ca = "6RAJbAeVHc1qNXYmMi9jj4q2PrWPfPkqQQVuCTScpump";

  const handleCopyCA = () => {
    navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: "01",
      badge: "PREPARE YOUR TRAY",
      title: "Create a Wallet",
      desc: "Download Phantom or your preferred Solana wallet app from the App Store or Google Play for free. For desktop users, install the Google Chrome extension.",
      video: "/Roadmap/1.webm",
    },
    {
      num: "02",
      badge: "DEPOSIT THE FUNDS",
      title: "Get Some SOL",
      desc: "Buy SOL directly inside your wallet app, or purchase it on a centralized exchange like Coinbase, Binance, or Kraken and transfer it to your secure wallet address.",
      video: "/Roadmap/2.webm",
    },
    {
      num: "03",
      badge: "ENTER THE DRIVE-THRU",
      title: "Connect to a DEX",
      desc: "Open your wallet browser or head over to Jupiter (jup.ag) or Raydium (raydium.io) on desktop. Connect your wallet to the exchange to swap your tokens.",
      video: "/Roadmap/3.webm",
    },
    {
      num: "04",
      badge: "PLACE THE ORDER",
      title: "Swap SOL for $MCDOGE",
      desc: "Paste the official contract address (CA) in the token search field. Enter the amount of SOL you want to swap, adjust slippage, and confirm the order.",
      video: "/Roadmap/4.webm",
      hasCA: true,
    },
    {
      num: "05",
      badge: "SECURE THE BURGER",
      title: "Enjoy Your Yield",
      desc: "Transaction complete! You are now a proud shareholder in the MCDOGE restaurant franchise. Keep your tokens safe and watch the fries stack up.",
      video: "/Roadmap/5.webm",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // ScrollTrigger setup for desktop sticky columns
      const stepElements = gsap.utils.toArray(".buy-step-card");
      
      stepElements.forEach((step: any, index: number) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveStep(index);
            }
          },
        });

        // Slide/fade reveal step cards on scroll
        gsap.fromTo(
          step,
          {
            opacity: 0.3,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "bottom 75%",
              scrub: true,
            },
          }
        );
      });

      // Animate section header
      gsap.fromTo(
        ".how-to-buy-header",
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

  return (
    <section ref={containerRef} className="how-to-buy-section container" id="roadmap">
      {/* Background Glows */}
      <div className="buy-orb buy-orb-1" />
      <div className="buy-orb buy-orb-2" />

      <div className="how-to-buy-header">
        <span className="buy-subtitle">// ORDER FLOW</span>
        <h2 className="buy-title">How To Buy $MCDOGE</h2>
      </div>

      <div className="how-to-buy-content">
        {/* Left Side: Sticky Visual device mock */}
        <div className="how-to-buy-visual-column">
          <div className="sticky-device-container">
            <div className="device-outer">
              <div className="device-screen">
                {/* Spotlight effects inside the screen */}
                <div className="screen-spotlight" />
                
                {/* Stacked Videos */}
                {steps.map((step, idx) => (
                  <video
                    key={idx}
                    src={step.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`step-video-player ${activeStep === idx ? "active" : ""}`}
                  />
                ))}

                {/* Video HUD status bar overlay */}
                <div className="hud-overlay">
                  <span className="hud-label">LOOPING_3D_ITEM</span>
                  <span className="hud-value">STEP_0{activeStep + 1}_ACTIVE</span>
                </div>
              </div>
              <div className="device-glow-ring" />
            </div>
            {/* Ambient shadow reflection below device */}
            <div className="device-shadow" />
          </div>
        </div>

        {/* Right Side: Step Text content scrolling */}
        <div className="how-to-buy-steps-column">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              id={`step-${idx}`}
              className={`buy-step-card ${activeStep === idx ? "step-highlighted" : ""}`}
            >
              <div className="step-number-container">
                <span className="step-num">{step.num}</span>
                <span className="step-badge">{step.badge}</span>
              </div>
              
              <h3 className="step-heading">{step.title}</h3>
              <p className="step-description">{step.desc}</p>

              {/* Mobile Video rendering (displays only on small screens) */}
              <div className="mobile-video-preview">
                <video
                  src={step.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              {step.hasCA && (
                <div className="ca-container">
                  <span className="ca-label">OFFICIAL CONTRACT ADDRESS:</span>
                  <div className="ca-box">
                    <code className="ca-code">{ca}</code>
                    <button className="ca-copy-btn" onClick={handleCopyCA}>
                      {copied ? (
                        <span className="copied-text">
                          <span className="material-symbols-outlined check-icon">check</span>
                          COPIED
                        </span>
                      ) : (
                        <span className="copy-text">
                          <span className="material-symbols-outlined copy-icon">content_copy</span>
                          COPY
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .how-to-buy-section {
          position: relative;
          z-index: 10;
          padding: var(--space-10) var(--space-5);
          margin-top: var(--space-6);
        }

        /* Ambient Glow Orbs */
        .buy-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(150px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.12;
        }

        .buy-orb-1 {
          top: 20%;
          right: 15%;
          width: 350px;
          height: 350px;
          background: #FFC700;
        }

        .buy-orb-2 {
          bottom: 10%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: #DD1021;
        }

        .how-to-buy-header {
          margin-bottom: var(--space-8);
          border-left: 2px solid #FFC700;
          padding-left: var(--space-4);
        }

        .buy-subtitle {
          font-family: monospace;
          font-size: var(--font-size-caption);
          color: #FFC700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-weight: 700;
          display: block;
          margin-bottom: var(--space-1);
        }

        .buy-title {
          font-family: var(--font-display), sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        /* Grid Layout */
        .how-to-buy-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-8);
          align-items: start;
        }

        /* Sticky Column styles */
        .how-to-buy-visual-column {
          position: sticky;
          top: 80px;
          height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .sticky-device-container {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 16 / 16;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .device-outer {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(15, 15, 15, 0.6);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 36px;
          padding: 12px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .device-screen {
          position: relative;
          width: 100%;
          height: 100%;
          background: #050505;
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .screen-spotlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 10%, rgba(255, 199, 0, 0.08), transparent 60%);
          z-index: 5;
          pointer-events: none;
        }

        /* Step Video player styling */
        .step-video-player {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 1;
        }

        .step-video-player.active {
          opacity: 0.9;
          transform: scale(1);
          z-index: 2;
        }

        /* HUD overlay display */
        .hud-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          justify-content: space-between;
          font-family: monospace;
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.4);
          z-index: 10;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          letter-spacing: 0.05em;
        }

        .device-glow-ring {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 38px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(255, 199, 0, 0.2), transparent, rgba(221, 16, 33, 0.2)) border-box;
          pointer-events: none;
          z-index: -1;
        }

        .device-shadow {
          position: absolute;
          bottom: -40px;
          width: 80%;
          height: 20px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, transparent 70%);
          filter: blur(10px);
          pointer-events: none;
        }

        /* Right column: Steps list */
        .how-to-buy-steps-column {
          display: flex;
          flex-direction: column;
          gap: 15vh;
          padding-bottom: 20vh;
        }

        .buy-step-card {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          padding: var(--space-6) var(--space-7);
          transition: background-color 0.4s ease, border-color 0.4s ease;
        }

        .buy-step-card.step-highlighted {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 199, 0, 0.15);
        }

        .step-number-container {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .step-num {
          font-family: var(--font-display), sans-serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: #FFC700;
          text-shadow: 0 0 15px rgba(255, 199, 0, 0.25);
          line-height: 1;
        }

        .step-badge {
          font-family: monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.15em;
        }

        .buy-step-card.step-highlighted .step-badge {
          color: #FFC700;
        }

        .step-heading {
          font-family: var(--font-body), sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: var(--space-2);
          text-transform: uppercase;
          letter-spacing: 0.01em;
        }

        .step-description {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .buy-step-card.step-highlighted .step-description {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Mobile video view - hidden by default */
        .mobile-video-preview {
          display: none;
          width: 100%;
          aspect-ratio: 16 / 16;
          border-radius: 18px;
          overflow: hidden;
          margin-top: var(--space-4);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-video-preview video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Copy Contract Address elements */
        .ca-container {
          margin-top: var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          width: 100%;
        }

        .ca-label {
          font-family: monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #FFC700;
          letter-spacing: 0.05em;
        }

        .ca-box {
          display: flex;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
        }

        .ca-code {
          flex: 1;
          font-family: monospace;
          font-size: 0.85rem;
          color: #ffffff;
          padding: 12px var(--space-4);
          overflow-x: auto;
          white-space: nowrap;
          display: flex;
          align-items: center;
          scrollbar-width: none;
        }
        
        .ca-code::-webkit-scrollbar {
          display: none;
        }

        .ca-copy-btn {
          background: #FFC700;
          color: #000000;
          border: none;
          font-family: var(--font-body), sans-serif;
          font-weight: 800;
          font-size: 0.78rem;
          padding: 0 var(--space-5);
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ca-copy-btn:hover {
          background: #FFE054;
        }

        .ca-copy-btn:active {
          transform: scale(0.97);
        }

        .copy-text, .copied-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .copied-text {
          color: #1b801b;
        }

        .copy-icon, .check-icon {
          font-size: 16px !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .how-to-buy-content {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          /* Disable sticky container and hide the left column device on tablet/mobile */
          .how-to-buy-visual-column {
            display: none;
          }

          .how-to-buy-steps-column {
            gap: var(--space-6);
            padding-bottom: 0;
          }

          .buy-step-card {
            background: rgba(12, 12, 12, 0.45);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-color: rgba(255, 255, 255, 0.05);
          }

          /* Display the video inside the steps directly on mobile */
          .mobile-video-preview {
            display: block;
          }

          .buy-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .how-to-buy-section {
            padding: var(--space-8) var(--space-4);
          }
          .buy-step-card {
            padding: var(--space-5) var(--space-4);
          }
          .buy-title {
            font-size: 2.2rem;
          }
          .ca-box {
            flex-direction: column;
          }
          .ca-code {
            padding: var(--space-3) var(--space-3) var(--space-2) var(--space-3);
            font-size: 0.78rem;
          }
          .ca-copy-btn {
            padding: 10px 0;
            border-radius: 0 0 10px 10px;
          }
        }
      `}</style>
    </section>
  );
}
