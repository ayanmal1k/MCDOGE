"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Scroll reveal entrance for the cards
      gsap.fromTo(
        ".feature-card-premium",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Scroll reveal header
      gsap.fromTo(
        ".features-header",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const featureList = [
    {
      title: "Free Burger",
      desc: "Community events and giveaways.",
      img: "/features/burger.png",
      glowColor: "rgba(255, 199, 0, 0.25)",
      borderColor: "rgba(255, 199, 0, 0.15)",
    },
    {
      title: "Rewards",
      desc: "Holders earn through community rewards.",
      img: "/features/gift.png",
      glowColor: "rgba(239, 68, 68, 0.25)",
      borderColor: "rgba(239, 68, 68, 0.15)",
    },
    {
      title: "Marketing",
      desc: "Aggressive marketing to the moon.",
      img: "/features/marketing.png",
      glowColor: "rgba(59, 130, 246, 0.25)",
      borderColor: "rgba(59, 130, 246, 0.15)",
    },
  ];

  return (
    <section ref={containerRef} className="features-section container" id="perks">
      {/* Background ambient lighting */}
      <div className="features-orb orb-red" />
      <div className="features-orb orb-yellow" />

      <div className="features-header">
        <span className="features-subtitle">// HOLDER UTILITY</span>
        <h2 className="features-title">Perks & Features</h2>
      </div>

      <div className="features-grid-premium">
        {featureList.map((item, idx) => (
          <div key={idx} className="feature-card-premium">
            {/* Spotlight and Grid Pattern overlays */}
            <div className="feature-card-spotlight" />
            
            <div className="feature-card-content">
              {/* Left Column: Image with glow backdrop */}
              <div className="feature-img-wrapper">
                <div 
                  className="feature-glow-source" 
                  style={{ background: item.glowColor }} 
                />
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="feature-asset-img"
                />
              </div>

              {/* Right Column: Text details */}
              <div className="feature-text-wrapper">
                <h3 className="feature-card-heading">{item.title}</h3>
                <p className="feature-card-desc">{item.desc}</p>
              </div>
            </div>
            
            {/* Custom styled neon outline border */}
            <div 
              className="feature-card-border" 
              style={{ borderColor: item.borderColor }}
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        .features-section {
          position: relative;
          z-index: 10;
          padding: var(--space-8) var(--space-5);
          margin-top: var(--space-4);
          margin-bottom: var(--space-4);
        }

        /* Ambient Glow Orbs */
        .features-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.1;
        }

        .orb-red {
          top: 10%;
          right: 5%;
          width: 350px;
          height: 350px;
          background: #DD1021;
        }

        .orb-yellow {
          bottom: 10%;
          left: 5%;
          width: 300px;
          height: 300px;
          background: #FFC700;
        }

        .features-header {
          margin-bottom: var(--space-7);
          border-left: 2px solid #FFC700;
          padding-left: var(--space-4);
        }

        .features-subtitle {
          font-family: monospace;
          font-size: var(--font-size-caption);
          color: #FFC700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-weight: 700;
          display: block;
          margin-bottom: var(--space-1);
        }

        .features-title {
          font-family: var(--font-display), sans-serif;
          font-size: 3.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        /* Grid Composition */
        .features-grid-premium {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
        }

        /* Premium Feature Card */
        .feature-card-premium {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border-radius: 20px;
          padding: var(--space-5) var(--space-6);
          overflow: hidden;
          display: flex;
          align-items: center;
          transition: background-color 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .feature-card-premium:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        /* Inner Content layout */
        .feature-card-content {
          display: flex;
          align-items: center;
          gap: var(--space-5);
          width: 100%;
          z-index: 2;
        }

        /* Image Wrapper with glowing source */
        .feature-img-wrapper {
          position: relative;
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-glow-source {
          position: absolute;
          width: 130%;
          height: 130%;
          border-radius: 50%;
          filter: blur(15px);
          opacity: 0.6;
          pointer-events: none;
          z-index: 1;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .feature-card-premium:hover .feature-glow-source {
          transform: scale(1.15);
          opacity: 0.85;
        }

        .feature-asset-img {
          width: 64px;
          height: 64px;
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.4));
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .feature-card-premium:hover .feature-asset-img {
          transform: scale(1.1) translateY(-3px);
        }

        /* Text area wrapper */
        .feature-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feature-card-heading {
          font-family: var(--font-body), sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          transition: color 0.3s ease;
        }

        .feature-card-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .feature-card-premium:hover .feature-card-desc {
          color: rgba(255, 255, 255, 0.85);
        }

        /* Background grid overlay */
        .feature-card-spotlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0);
          background-size: 16px 16px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
        }

        /* Border element */
        .feature-card-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid transparent;
          border-radius: 20px;
          pointer-events: none;
          z-index: 3;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .feature-card-premium:hover .feature-card-border {
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.01), 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .features-grid-premium {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }

          .features-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 576px) {
          .features-section {
            padding: var(--space-8) var(--space-4);
          }
          
          .feature-card-premium {
            padding: var(--space-4) var(--space-5);
          }

          .features-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
