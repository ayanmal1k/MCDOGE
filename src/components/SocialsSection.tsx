"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Send, MessageCircle } from "lucide-react";

interface SocialChannel {
  id: number;
  name: string;
  subtitle: string;
  url: string;
  colorClass: string;
  icon: React.ReactNode;
}

export default function SocialsSection() {
  const socials: SocialChannel[] = [
    {
      id: 0,
      name: "TELEGRAM",
      subtitle: "Join the official crew chatroom",
      url: "https://t.me/ysctop",
      colorClass: "telegram",
      icon: <Send size={22} />,
    },
    {
      id: 1,
      name: "X / TWITTER",
      subtitle: "Follow us for viral fast-food memes",
      url: "https://x.com/mcdogecryprest",
      colorClass: "twitter",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "DEXSCREENER",
      subtitle: "Watch the trading chart live",
      url: "https://dexscreener.com/solana/9ZMuy8RsLo4PjTCmnVcCAg5M2ADfNNWLSGaqzKvqHpDZ",
      colorClass: "dex",
      icon: (
        <img
          src="/decscreenr logo.png"
          alt="DexScreener Icon"
          style={{ width: 22, height: 22, objectFit: "contain" }}
        />
      ),
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="socials-section" id="community">
      <div className="socials-inner">
        <div className="socials-grid">
          {/* Left Column: Looping Video */}
          <motion.div
            className="socials-video-column"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="video-card-container">
              <video
                src="/socia-loop.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="socials-loop-video"
              />
              <div className="video-card-overlay" />
            </div>
          </motion.div>

          {/* Right Column: Title + Social Action Cards */}
          <div className="socials-content-column">
            <h2 className="socials-section-title">
              JOIN THE <span className="text-highlight">MCDOGE CREW</span>
            </h2>
            <p className="socials-section-subtitle">
              Get your uniform ready and join the delivery fleet. Follow our channels and never miss a delivery!
            </p>

            <motion.div
              className="social-cards-list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-action-card ${social.colorClass}`}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                >
                  <div className="social-card-inner">
                    <div className="social-icon-wrapper">{social.icon}</div>
                    <div className="social-card-text">
                      <span className="social-name">{social.name}</span>
                      <span className="social-desc">{social.subtitle}</span>
                    </div>
                    <ArrowUpRight size={20} className="arrow-icon" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .socials-section {
          background-color: #FFC700;
          color: #000000;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: 100px 6% 120px 6%;
          overflow: hidden;
        }

        .socials-inner {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        /* Split-screen layout */
        .socials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* Left Side: Video container */
        .socials-video-column {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .video-card-container {
          position: relative;
          width: 100%;
          max-width: 540px;
          border-radius: 28px;
          overflow: hidden;
          background-color: transparent;
          border: none;
          box-shadow: none;
        }

        .socials-loop-video {
          width: 100%;
          height: auto;
          display: block;
        }

        .video-card-overlay {
          display: none;
        }

        /* Right Side: Content Column */
        .socials-content-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .socials-section-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 3.2rem;
          font-weight: 900;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 16px;
        }

        .socials-section-title .text-highlight {
          color: #DD1021;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
        }

        .socials-section-subtitle {
          font-family: var(--font-body), sans-serif;
          font-size: 1.15rem;
          color: rgba(0, 0, 0, 0.85);
          max-width: 580px;
          line-height: 1.55;
          margin-bottom: 40px;
        }

        /* Social Action Cards List */
        .social-cards-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .social-action-card {
          display: block;
          background-color: #0A0A0A;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 20px;
          padding: 24px 30px;
          cursor: pointer;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease;
          position: relative;
          overflow: hidden;
          outline: none;
          text-decoration: none !important;
          -webkit-tap-highlight-color: transparent;
        }

        .social-action-card *,
        .social-action-card:focus,
        .social-action-card:active {
          outline: none !important;
          box-shadow: none !important;
          text-decoration: none !important;
        }

        .social-card-inner {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 20px;
        }

        .social-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.04);
          color: #ffffff;
          flex-shrink: 0;
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }

        .social-card-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-grow: 1;
        }

        .social-name {
          font-family: var(--font-display), sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }

        .social-desc {
          font-family: var(--font-body), sans-serif;
          font-size: 0.88rem;
          color: #8a8a8f;
          transition: color 0.3s ease;
        }

        .arrow-icon {
          color: #55555a;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        /* Hover states - solid red background */
        .social-action-card:hover {
          border-color: #DD1021 !important;
          background-color: #DD1021 !important;
          box-shadow: 0 10px 30px rgba(221, 16, 33, 0.3) !important;
        }

        .social-action-card:hover .social-icon-wrapper {
          background-color: #FFC700 !important;
          color: #000000 !important;
          transform: rotate(15deg) scale(1.05) !important;
        }

        .social-action-card:hover .social-name {
          color: #ffffff !important;
        }

        .social-action-card:hover .social-desc {
          color: rgba(255, 255, 255, 0.85) !important;
        }

        .social-action-card:hover .arrow-icon {
          color: #ffffff !important;
          transform: translate(3px, -3px) !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .socials-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .video-card-container {
            max-width: 100%;
          }

          .socials-content-column {
            align-items: center;
            text-align: center;
          }

          .social-action-card {
            text-align: left;
          }
        }

        @media (max-width: 580px) {
          .socials-section {
            padding: 80px 24px;
          }

          .socials-section-title {
            font-size: 2.5rem;
          }

          .social-action-card {
            padding: 20px;
          }

          .social-icon-wrapper {
            width: 42px;
            height: 42px;
          }

          .social-name {
            font-size: 1rem;
          }

          .social-desc {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .socials-section {
            padding: 60px 16px;
          }

          .socials-section-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
