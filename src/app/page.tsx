"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import RoadmapSection from "@/components/RoadmapSection";
import HowToBuySection from "@/components/HowToBuySection";
import ChartSection from "@/components/ChartSection";
import SocialsSection from "@/components/SocialsSection";
import Footer from "@/components/Footer";

// --- Inline Social SVGs ---
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.74 3.88-1.69 6.47-2.8 7.77-3.32 3.7-1.47 4.47-1.73 4.97-1.74.11 0 .36.03.52.16.14.11.18.27.2.38-.01.07-.01.17-.02.26z" />
    </svg>
  );
}

function PumpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19.07 4.93a6.002 6.002 0 0 0-8.49 0l-5.65 5.66a6.002 6.002 0 0 0 0 8.49 6.002 6.002 0 0 0 8.49 0l5.65-5.66a6.002 6.002 0 0 0 0-8.49zM9.54 17.66a4.001 4.001 0 0 1-5.66-5.66l2.12-2.12c1.78.89 3.54 2.66 4.43 4.43l-2.89 3.35zm7.07-7.07l-2.12 2.12c-.89-.89-2.66-2.66-3.54-4.43l2.83-2.83a4.001 4.001 0 0 1 5.66 5.66l-2.83 2.83z" />
    </svg>
  );
}

// --- Sub-component: Ambient Particle Canvas ---
function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 120 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 0.5;
        this.density = Math.random() * 20 + 8;
        this.color = `rgba(255, 199, 0, ${Math.random() * 0.08 + 0.02})`; // Yellow particles for MCDOGE
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dxOrig = this.x - this.baseX;
            this.x -= dxOrig / 15;
          }
          if (this.y !== this.baseY) {
            const dyOrig = this.y - this.baseY;
            this.y -= dyOrig / 15;
          }
        }
      }
    }

    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(80, Math.floor((width * height) / 20000));

    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particlesArray.push(new Particle(x, y));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle grids
      ctx.strokeStyle = "rgba(255, 255, 255, 0.008)";
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 3,
        pointerEvents: "none",
      }}
    />
  );
}

// --- Sub-component: Magnetic Wrapper ---
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    if (!boundingRect) return;

    const { left, top, width, height } = boundingRect;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const factor = 0.25;
    const x = (clientX - centerX) * factor;
    const y = (clientY - centerY) * factor;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isCaHovered, setIsCaHovered] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText("9fQdMbjsYg7vNjnXULwzdmoCS4napNoWya5Zf7YAfhaa");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVideoEnded = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const enterTimer = setTimeout(() => {
      setIsEntering(false);
    }, 1200);

    // Safety fallback timer (8 seconds max)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 8000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(loadTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const loaderLetterVariants = {
    initial: {
      y: 80,
      opacity: 0,
      scale: 0.8,
      rotate: -10,
      color: "#FFC700",
    },
    enter: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      color: "#FFC700",
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 12,
        delay: i * 0.06,
      }
    }),
    wave: (i: number) => ({
      y: [0, -16, 0],
      scale: [1, 1.22, 1],
      rotate: [0, -6, 0],
      color: ["#FFC700", "#DD1021", "#FFC700"],
      transition: {
        duration: 1.0,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatDelay: 1.5,
        delay: i * 0.08,
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  } as const;

  return (
    <>
      {/* Page Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="loader-overlay"
          >
            <div className="loader-video-wrapper">
              <video
                src="/takeaway.webm"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
                className="loader-video"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar component */}
      <Navbar />

      {/* Hero Wrapper */}
      <section className="hero-wrapper">
        {/* Ambient Interactive Particle Canvas */}
        <AmbientBackground />

        {/* Content Area - Grid */}
        <div className="hero-grid-container container">
          <div className="hero-grid">
            {/* Left Column (Content) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoading ? "hidden" : "show"}
              className="hero-content"
            >
              {/* Main Headline */}
              <motion.h1 variants={itemVariants} className="hero-title">
                <span className="text-highlight hero-bouncy-logo-wrapper">
                  {!isLoading && "MCDOGE".split("").map((letter, idx) => (
                    <motion.span
                      key={`hero-char-${idx}`}
                      layoutId={`char-${idx}`}
                      className="hero-bouncy-letter"
                      style={{ transitionDelay: `${idx * 0.02}s` }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 18,
                        mass: 0.6,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Subheadline (THE HAPPIEST RESTAURANT IN CRYPTO) */}
              <motion.h2 variants={itemVariants} className="hero-subheadline-mcdoge">
                THE HAPPIEST<br />
                <span className="text-yellow">RESTAURANT</span> IN CRYPTO
              </motion.h2>

              {/* Description */}
              <motion.p variants={itemVariants} className="hero-description-mcdoge">
                This isn't just another meme coin. This is the happiest restaurant in crypto. Original characters, daily episodes, fresh memes, and a community where everyone has a seat at the table. Every day, a new story begins. Welcome home. Grab a seat, enjoy the ride, and join the MCDOGE family.
              </motion.p>

              {/* Buttons Row */}
              <motion.div variants={itemVariants} className="hero-buttons">
                <Magnetic>
                  <a href="#community" className="btn-primary">
                    JOIN COMMUNITY
                    <ArrowUpRight size={18} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#chart" className="btn-secondary">
                    CHART
                  </a>
                </Magnetic>
              </motion.div>

              {/* Clipboard CA Copier */}
              <div style={{ position: "relative", alignSelf: "flex-start" }}>
                <AnimatePresence>
                  {isCaHovered && !copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 10, x: "-50%" }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="ca-tooltip"
                    >
                      Click to Copy
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  variants={itemVariants}
                  onMouseEnter={() => setIsCaHovered(true)}
                  onMouseLeave={() => setIsCaHovered(false)}
                  onClick={copyCA}
                  whileHover={{ scale: 1.02, borderColor: "rgba(255, 199, 0, 0.3)", boxShadow: "0 0 15px rgba(255, 199, 0, 0.1)" }}
                  animate={copied ? { scale: [1, 0.98, 1.02, 1], borderColor: "#FFC700", boxShadow: "0 0 25px rgba(255, 199, 0, 0.3)" } : {}}
                  transition={{ duration: 0.3 }}
                  className="hero-ca-container"
                >
                  <span className="ca-label">CA:</span>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied-text"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="copied-msg"
                      >
                        Copied to clipboard!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="ca-text"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="ca-address"
                      >
                        9fQdMbjsYg7vNjnXULwzdmoCS4napNoWya5Zf7YAfhaa
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <button className="ca-copy-btn" aria-label="Copy contract address" onClick={(e) => e.stopPropagation()}>
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          style={{ display: "inline-flex" }}
                        >
                          <CheckCircle2 size={16} style={{ color: "#FFC700" }} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          whileHover={{ scale: 1.2, color: "#FFC700" }}
                          whileTap={{ scale: 0.9 }}
                          style={{ display: "inline-flex" }}
                        >
                          <Copy size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </div>

              {/* Social Circle Links */}
              <motion.div variants={itemVariants} className="social-links">
                <a href="https://x.com/mcdogecryprest" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="X (Twitter)">
                  <XIcon />
                </a>
                <a href="https://t.me/ysctop" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Telegram">
                  <TelegramIcon />
                </a>
                <a href="https://dexscreener.com/solana/9zmuy8rslo4pjtcmnvccag5m2adfnnwlsgaqzkvqhpdz" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Dexscreener">
                  <img src="/decscreenr logo.png" alt="Dexscreener" style={{ width: 22, height: 22, objectFit: "contain" }} />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column (Spacer so that the winking Doge shows through on desktop) */}
            <div className="hero-image-container" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* How To Buy Section */}
      <HowToBuySection />

      {/* Live Chart & Stats Section */}
      <ChartSection />

      {/* Social Links Section */}
      <SocialsSection />

      {/* Footer Section */}
      <Footer />

      {/* CSS Styles */}
      <style jsx global>{`
        .hero-wrapper {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          background: #080808 url('/hero-bg.png') no-repeat center center;
          background-size: cover;
        }



        .hero-grid-container {
          position: relative;
          z-index: 10;
          flex-grow: 1;
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
          padding: 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          align-items: stretch;
          width: 100%;
          min-height: 100vh;
        }

        .hero-image-container {
          position: relative;
          z-index: 5;
          width: 100%;
          height: 100%;
          min-height: 100vh;
        }

        .hero-content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-4);
          padding: 80px 6% var(--space-8) 12%;
        }

        .hero-badge {
          align-self: flex-start;
          border: 1px solid rgb(101, 179, 46);
          color: rgb(101, 179, 46);
          font-size: 0.9rem;
          font-weight: var(--font-weight-bold);
          padding: 8px 16px;
          border-radius: 9999px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 9.5rem;
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.01em;
          color: #FFC700;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-title .text-highlight {
          color: #FFC700;
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 10.3rem;
          font-weight: 950;
          text-shadow: 3px 3px 0px #8A1F0C, 6px 6px 0px rgba(0, 0, 0, 0.3);
        }

        .hero-bouncy-logo-wrapper {
          display: inline-block;
          white-space: nowrap;
          cursor: pointer;
          transform: rotate(-3deg) skewX(-6deg);
          transform-origin: left center;
        }

        .hero-bouncy-letter {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.35), color 0.3s ease;
        }

        .hero-bouncy-logo-wrapper:hover .hero-bouncy-letter {
          transform: translateY(-8px) scale(1.08) rotate(4deg);
          color: #FFE054;
        }

        .hero-bouncy-letter:hover {
          transform: translateY(-16px) scale(1.22) rotate(-6deg) !important;
          color: #DD1021 !important;
        }

        .hero-subheadline-mcdoge {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: 0.02em;
          color: #ffffff;
          text-transform: uppercase;
          transform: rotate(-3deg) skewX(-6deg);
          transform-origin: left center;
          margin-bottom: 24px;
        }

        .hero-subheadline-mcdoge .text-yellow {
          color: #FFC700;
        }

        .hero-description-mcdoge {
          font-family: var(--font-body), sans-serif;
          font-size: 1.18rem;
          font-weight: 400;
          color: #a0a0ab;
          line-height: 1.65;
          margin-top: 4px;
          max-width: 640px;
        }

        .hero-buttons {
          display: flex;
          gap: var(--space-4);
          margin-top: var(--space-2);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background-color: #FFC700;
          color: #000000;
          padding: 16px 36px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .btn-primary:hover {
          background-color: #FFE054;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          background-color: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          padding: 16px 36px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .btn-secondary:hover {
          border-color: #ffffff;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .hero-ca-container {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 28px;
          border-radius: 12px;
          font-family: var(--font-body), monospace;
          font-size: 1.05rem;
          color: #ffffff;
          align-self: flex-start;
          margin-top: 16px;
          cursor: pointer;
          transition: border-color 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
          z-index: 10;
          user-select: none;
        }

        .ca-tooltip {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: #FFC700;
          color: #000000;
          font-weight: 850;
          font-size: 0.8rem;
          padding: 6px 14px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(255, 199, 0, 0.35);
          pointer-events: none;
          z-index: 25;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ca-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: #FFC700 transparent transparent transparent;
        }

        .copied-msg {
          color: #FFC700;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .ca-label {
          color: #FA5D29;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .ca-address {
          word-break: break-all;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .ca-copy-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          margin-left: 8px;
        }

        .social-links {
          display: flex;
          gap: var(--space-3);
          margin-top: var(--space-4);
          z-index: 10;
        }

        .social-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .social-circle:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: scale(1.1);
          color: #FFC700;
        }

        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          pointer-events: all;
          overflow: hidden;
        }

        .loader-video-wrapper {
          width: auto;
          height: 70vh;
          border-radius: 0px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-video {
          width: auto;
          height: 70vh;
          max-height: 70vh;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 992px) {
          .hero-wrapper {
            background: #080808 url('/hero-bg-mobile.png') no-repeat center center;
            background-size: cover;
          }



          .hero-grid-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            min-height: auto;
            display: flex;
            align-items: flex-start;
          }

          .hero-content {
            max-width: 100%;
            padding: 24px var(--space-5) var(--space-8) var(--space-5);
            align-items: center;
            text-align: center;
          }

          .hero-badge {
            align-self: center;
          }

          .hero-ca-container {
            align-self: center;
          }

          .hero-image-container {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 5.5rem;
            margin-bottom: 18px;
          }
          .hero-title .text-highlight {
            font-size: 6.0rem;
            text-shadow: 2px 2px 0px #8A1F0C, 4px 4px 0px rgba(0, 0, 0, 0.3);
          }
          .hero-subheadline-mcdoge {
            font-size: 2.2rem;
            margin-bottom: 18px;
          }
          .hero-description-mcdoge {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 4.3rem;
            margin-bottom: 14px;
          }
          .hero-title .text-highlight {
            font-size: 4.7rem;
          }
          .hero-subheadline-mcdoge {
            font-size: 1.85rem;
            margin-bottom: 14px;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
            gap: var(--space-3);
            width: 100%;
          }
          .btn-primary, .btn-secondary {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
