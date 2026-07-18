"use client";

import { useEffect, useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  title: string;
  desc: string;
  imgSrc: string;
}

export default function HowToBuySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const contractAddress = "9fQdMbjsYg7vNjnXULwzdmoCS4napNoWya5Zf7YAfhaa";

  const steps: Step[] = [
    {
      id: 0,
      title: "GET YOUR WALLET READY",
      desc: "Download Phantom or your wallet of choice for free from the App Store or Google Play Store. Setup your secure seed phrase to grab a seat at the table.",
      imgSrc: "/roadmap1.png",
    },
    {
      id: 1,
      title: "LOAD UP ON SOL",
      desc: "Buy SOL inside Phantom, transfer from another wallet, or withdraw from an exchange to pay for your kitchen orders.",
      imgSrc: "/roadmap2.png",
    },
    {
      id: 2,
      title: "VISIT THE KITCHEN",
      desc: "Head over to Raydium.io or Jupiter (jup.ag) via your wallet's built-in browser. Paste the official $MCDOGE address to load the recipe.",
      imgSrc: "/roadmap3.png",
    },
    {
      id: 3,
      title: "ORDER YOUR $MCDOGE",
      desc: "Swap your SOL for $MCDOGE. Set slippage to auto/1% and accept the transaction. Welcome to the happiest restaurant in crypto!",
      imgSrc: "/roadmap4.png",
    },
  ];

  // Looping cycle spotlight animation: active card changes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="how-to-buy-section" id="buy">
      <div className="htb-inner">
        {/* Section Header */}
        <div className="htb-header">
          <h2 className="htb-section-title">
            HOW TO <span className="text-highlight">BUY</span>
          </h2>
          <p className="htb-section-subtitle">
            Follow these simple steps to order your fresh bag of $MCDOGE.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="htb-grid">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`htb-card ${isActive ? "active" : ""}`}
              >
                <div className="htb-card-content">
                  {/* Step Image (centered and bigger) */}
                  <div className="step-image-container">
                    <img
                      src={step.imgSrc}
                      alt={step.title}
                      className="step-image"
                    />
                    <div className="image-shadow" />
                  </div>

                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contract Address Copy Bar */}
        <div className="htb-ca-box">
          <div className="ca-label">OFFICIAL CONTRACT ADDRESS:</div>
          <div className="ca-value-container" onClick={handleCopy}>
            <span className="ca-address-text">{contractAddress}</span>
            <button className="ca-copy-button" aria-label="Copy Address">
              {copied ? (
                <CheckCircle2 size={18} className="copied-icon" />
              ) : (
                <Copy size={18} className="copy-icon" />
              )}
            </button>
          </div>
          {copied && <span className="copied-toast">Copied to Clipboard!</span>}
        </div>
      </div>

      <style jsx global>{`
        .how-to-buy-section {
          background-color: #000000;
          color: #ffffff;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 100px 6% 120px 6%;
          overflow: hidden;
        }

        .htb-inner {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .htb-header {
          margin-bottom: 70px;
          text-align: center;
        }

        .htb-section-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 3.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
        }

        .htb-section-title .text-highlight {
          color: #FFC700;
          text-shadow: 2px 2px 0px #8A1F0C, 4px 4px 0px rgba(0, 0, 0, 0.3);
        }

        .htb-section-subtitle {
          font-family: var(--font-body), sans-serif;
          font-size: 1.15rem;
          color: #a0a0a5;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* 4 Steps Grid layout */
        .htb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-bottom: 80px;
          position: relative;
        }

        .htb-card {
          position: relative;
          background-color: #050505;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 28px;
          padding: 50px 30px 40px 30px;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 440px;
        }

        .htb-card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        /* Active yellow spotlight card */
        .htb-card.active {
          background-color: #FFC700;
          border-color: #FFC700;
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(255, 199, 0, 0.15);
        }

        .step-image-container {
          position: relative;
          width: 170px;
          height: 170px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-image {
          width: 150px;
          height: 150px;
          object-fit: contain;
          z-index: 5;
          position: relative;
          animation: floatAnimation 4s ease-in-out infinite;
        }

        /* Staggered float effects */
        .htb-card:nth-child(2) .step-image {
          animation-delay: 0.7s;
        }
        .htb-card:nth-child(3) .step-image {
          animation-delay: 1.4s;
        }
        .htb-card:nth-child(4) .step-image {
          animation-delay: 2.1s;
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .image-shadow {
          position: absolute;
          bottom: 15px;
          width: 100px;
          height: 8px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          filter: blur(5px);
          z-index: 2;
          animation: shadowScale 4s ease-in-out infinite;
        }

        .htb-card:nth-child(2) .image-shadow {
          animation-delay: 0.7s;
        }
        .htb-card:nth-child(3) .image-shadow {
          animation-delay: 1.4s;
        }
        .htb-card:nth-child(4) .image-shadow {
          animation-delay: 2.1s;
        }

        @keyframes shadowScale {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(0.85);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        .step-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.4s ease;
        }

        .htb-card.active .step-title {
          color: #DD1021; /* Red title when card is yellow */
        }

        .step-desc {
          font-family: var(--font-body), sans-serif;
          font-size: 0.95rem;
          color: #a0a0a5;
          line-height: 1.5;
          margin: 0;
          transition: color 0.4s ease;
        }

        .htb-card.active .step-desc {
          color: #000000; /* Black body text when card is yellow for high contrast readability */
          font-weight: 500;
        }

        /* Contract Address Box */
        .htb-ca-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
          position: relative;
        }

        .htb-ca-box .ca-label {
          font-family: var(--font-display), sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          color: #DD1021;
          letter-spacing: 0.1em;
        }

        .ca-value-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 28px;
          border-radius: 16px;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
          box-sizing: border-box;
        }

        .ca-value-container:hover {
          border-color: #FFC700;
          background: rgba(255, 199, 0, 0.02);
        }

        .ca-address-text {
          font-family: var(--font-body), monospace;
          font-size: 1.05rem;
          color: #ffffff;
          letter-spacing: 0.05em;
          word-break: break-all;
        }

        .ca-copy-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          margin-left: 12px;
          transition: color 0.2s;
        }

        .ca-value-container:hover .ca-copy-button {
          color: #FFC700;
        }

        .copied-icon {
          color: #65b32e;
          animation: popScale 0.3s ease;
        }

        @keyframes popScale {
          0% { transform: scale(0.6); }
          100% { transform: scale(1); }
        }

        .copied-toast {
          font-family: var(--font-display), sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          color: #65b32e;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          position: absolute;
          top: calc(100% + 8px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .htb-grid {
            gap: 20px;
          }
          
          .htb-card {
            padding: 40px 20px;
            min-height: 460px;
          }

          .step-image-container {
            width: 150px;
            height: 150px;
          }

          .step-image {
            width: 130px;
            height: 130px;
          }
        }

        @media (max-width: 992px) {
          .htb-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .htb-card {
            min-height: auto;
          }
        }

        @media (max-width: 580px) {
          .how-to-buy-section {
            padding: 80px 24px;
          }

          .htb-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .htb-section-title {
            font-size: 2.8rem;
          }

          .ca-address-text {
            font-size: 0.9rem;
          }
          
          .ca-value-container {
            padding: 14px 20px;
          }
        }

        @media (max-width: 480px) {
          .how-to-buy-section {
            padding: 60px 16px;
          }

          .htb-section-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
