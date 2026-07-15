"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// --- Types ---
interface FeatureRow {
  letter: string;
  iconPath: string;
  letterPath: string;
  title: string;
  text: string;
}

// --- Helper to sample N points from an SVG path string and normalize to 100x100 space ---
const N_POINTS = 100;
const samplePoints = (pathStr: string): { x: number; y: number }[] => {
  if (typeof window === "undefined") return [];
  const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathEl.setAttribute("d", pathStr);
  const len = pathEl.getTotalLength();
  const pts = [];
  for (let i = 0; i < N_POINTS; i++) {
    const p = pathEl.getPointAtLength((i / N_POINTS) * len);
    pts.push({ x: p.x, y: p.y });
  }

  // Auto-normalize points to fit within a unified 100x100 space with margin, preserving aspect ratio
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  pts.forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  });

  const w = maxX - minX;
  const h = maxY - minY;
  const maxDim = Math.max(w, h) || 1;

  // Scale uniformly to fit within 80x80 area
  const scale = 80 / maxDim;

  // Calculate centered offsets inside the 100x100 box
  const offsetX = 10 + (80 - w * scale) / 2;
  const offsetY = 10 + (80 - h * scale) / 2;

  return pts.map(p => ({
    x: offsetX + (p.x - minX) * scale,
    y: offsetY + (p.y - minY) * scale
  }));
};

// --- Morphing Canvas Icon Component ---
function CanvasMorphIcon({
  letter,
  iconPath,
  letterPath,
  progress,
}: {
  letter: string;
  iconPath: string;
  letterPath: string;
  progress: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pointsIconRef = useRef<{ x: number; y: number }[]>([]);
  const pointsLetterRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    pointsIconRef.current = samplePoints(iconPath);
    pointsLetterRef.current = samplePoints(letterPath);
  }, [iconPath, letterPath]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointsIcon = pointsIconRef.current;
    const pointsLetter = pointsLetterRef.current;
    if (pointsIcon.length === 0 || pointsLetter.length === 0) return;

    const width = 48;
    const height = 48;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    // Calculate interpolated point coordinates scaled to 48x48 (0.48 factor)
    const startX = pointsIcon[0].x + (pointsLetter[0].x - pointsIcon[0].x) * progress;
    const startY = pointsIcon[0].y + (pointsLetter[0].y - pointsIcon[0].y) * progress;
    ctx.moveTo(startX * 0.48, startY * 0.48);

    for (let i = 1; i < N_POINTS; i++) {
      const x = pointsIcon[i].x + (pointsLetter[i].x - pointsIcon[i].x) * progress;
      const y = pointsIcon[i].y + (pointsLetter[i].y - pointsIcon[i].y) * progress;
      ctx.lineTo(x * 0.48, y * 0.48);
    }

    ctx.closePath();

    // Draw shape with styling
    ctx.fillStyle = isHovered ? "#FFE054" : "#FFC700";
    ctx.fill();

    // Add subtle border glow
    ctx.strokeStyle = "rgba(221, 16, 33, 0.3)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }, [progress, isHovered]);

  return (
    <div
      className="morph-canvas-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} width={48} height={48} className="morph-canvas" />
      <style jsx>{`
        .morph-canvas-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          transition: all 0.3s ease;
        }

        .morph-canvas-container:hover {
          background: rgba(255, 199, 0, 0.06);
          border-color: rgba(255, 199, 0, 0.3);
          box-shadow: 0 0 15px rgba(255, 199, 0, 0.1);
          transform: scale(1.05);
        }

        .morph-canvas {
          width: 48px;
          height: 48px;
        }
      `}</style>
    </div>
  );
}

export default function AboutSection() {
  const [morphProgress, setMorphProgress] = useState(0);

  useEffect(() => {
    const animObj = { t: 0 };
    const tween = gsap.to(animObj, {
      t: 1,
      duration: 1.6,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      repeatDelay: 1.8,
      onUpdate: () => {
        setMorphProgress(animObj.t);
      }
    });
    return () => {
      tween.kill();
    };
  }, []);

  // SVG Paths defined in 100x100 grid coordinates
  const features: FeatureRow[] = [
    {
      letter: "M",
      // McDonald's Arches
      iconPath: "M48.134 39.985c-.212-10.311-1.873-20.235-4.679-27.943C40.627 4.277 37.097 0 33.518 0c-2.224 0-4.313 1.618-6.212 4.812-1.176 1.981-2.272 4.582-3.225 7.643-.956-3.061-2.05-5.662-3.228-7.643C18.956 1.618 16.866 0 14.642 0c-3.582 0-7.11 4.277-9.937 12.042C1.9 19.75.238 29.674.026 39.984L0 41.194h7.187l.014-1.168c.279-21.542 5.41-35.205 7.5-35.205 1.408 0 5.006 9.461 5.552 32.885l.028 1.154h7.598l.027-1.154C28.451 14.282 32.05 4.82 33.458 4.82c2.091 0 7.22 13.663 7.5 35.205l.015 1.169h7.184z",
      letterPath: "M138.58 420.5H0L25.56 0h175.6l50.45 213.95h8.78L310.83 0h175.61L512 420.5H373.42l-8.08-203.86h-6.74L307.47 420.5H204.53l-51.81-203.86h-6.07z",
      title: "McDonald's x DOGE",
      text: "MCDOGE is a community-driven meme token built on Solana, inspired by one of the most iconic narratives in crypto: McDonald's x DOGE.",
    },
    {
      letter: "C",
      // Solana Coin (Diagonal Solana symbol)
      iconPath: "M42.85,22.45L77.49,8l29.87,30.77L93.42,73.3c-23.64,6.55-45.66,16.11-66.45,27.96l-4.22-5.24l41.23-40.88 c0.83,0.38,1.73,0.57,2.64,0.57c0,0,0.01,0,0.01,0c3.56,0,6.44-2.88,6.44-6.44c0-3.55-2.88-6.44-6.44-6.44 c-3.55,0-6.44,2.88-6.44,6.44c0,1.15,0.3,2.23,0.83,3.16L20.22,92.97l-5.66-5.17C27.01,67.42,36.53,45.69,42.85,22.45L42.85,22.45z M87.36,0l28.93,29.64l-2.64,2.57l-2.64,2.57L82.08,5.13l2.64-2.57L87.36,0L87.36,0z M18.99,107.36 c13.56,12.48,21.54,7.04,32.83-0.68c9.34-6.38,20.63-14.09,37.75-16.64c1.22-4.1,5.02-7.09,9.51-7.09c5.48,0,9.92,4.44,9.92,9.92 c0,5.48-4.44,9.92-9.92,9.92c-3.85,0-7.19-2.19-8.83-5.4c-15.32,2.43-25.69,9.51-34.28,15.37c-14.47,9.88-24.58,16.78-42.3-0.24 c-1.19,0.48-2.46,0.73-3.74,0.73c0,0-0.01,0-0.01,0c-5.48,0-9.92-4.44-9.92-9.92c0-5.48,4.44-9.92,9.92-9.92 c5.48,0,9.92,4.44,9.92,9.92c0,0,0,0.01,0,0.01C19.84,104.73,19.55,106.09,18.99,107.36L18.99,107.36L18.99,107.36z",
      letterPath: "M348.26 360.78L360 492.26c-32.87 13.56-74.09 20.35-123.65 20.35-49.57 0-89.35-5.22-119.35-15.65-29.99-10.44-53.61-26.87-70.82-49.3-17.22-22.45-29.22-48.79-36-79.05C3.39 338.35 0 301.04 0 256.7c0-44.35 3.39-81.78 10.18-112.3 6.78-30.52 18.78-57.01 36-79.44C79.56 21.66 140.87 0 230.09 0c19.82 0 43.17 1.96 70.04 5.87 26.86 3.92 46.83 8.74 59.87 14.48l-23.48 119.74c-33.91-7.3-64.96-10.95-93.13-10.95s-47.74 2.6-58.69 7.82c-10.96 5.22-16.44 15.65-16.44 31.3V373.3c20.35 4.18 40.96 6.26 61.83 6.26 44.35 0 83.73-6.26 118.17-18.78z",
      title: "How It Started",
      text: "Years ago, Elon Musk said he would eat a Happy Meal on live TV if McDonald's accepted Dogecoin.",
    },
    {
      letter: "D",
      // Doge Head
      iconPath: "M16.68,0c16.94,14.54,26.8,34.81,14.4,51.6c3.52,0.61,6.5,1.56,8.64,2.74c2.4,1.32,3.8,2.98,3.8,4.86l0,0.08 c0-0.03,0.01-0.05,0.02-0.08v49.99C43.53,127.65,0,127.2,0,109.31V59.19c0,0.03,0.01,0.05,0.02,0.08l0-0.08 c0-1.83,1.33-3.45,3.62-4.76c2-1.14,4.79-2.07,8.09-2.7C-3.86,31.7,21.34,9.83,16.68,0L16.68,0z M29.97,53.01 c-1.7,2.06-3.75,4.07-6.18,6v1.76c0,0.94-0.81,1.7-1.8,1.7c-1,0-1.8-0.76-1.8-1.7V43.34c0-0.94,0.81-1.7,1.8-1.7 c1,0,1.8,0.76,1.8,1.7v15.58C35.76,48.46,30.84,32.79,20.92,23c2.99,6.31-18.76,23.02-1.26,36.16c-2.74-1.97-4.96-3.98-6.75-6.01 c-0.04,0.02-0.08,0.03-0.13,0.04c-3.54,0.61-6.51,1.56-8.57,2.73c-1.81,1.03-2.85,2.16-2.85,3.28c0,1.68,2.18,3.3,5.7,4.56 c3.75,1.34,8.96,2.18,14.72,2.18c5.76,0,10.97-0.83,14.72-2.18c3.52-1.26,5.7-2.88,5.7-4.56c0-1.16-1.11-2.33-3.01-3.38 c-2.17-1.19-5.29-2.15-8.98-2.73C30.11,53.07,30.04,53.05,29.97,53.01L29.97,53.01z",
      letterPath: "M0 511.95V0h229.36c92.29 0 155.63 19.66 190.04 58.98C453.8 98.3 471 163.96 471 255.97c0 92.02-17.2 157.69-51.6 197.01-34.41 39.32-97.75 58.97-190.04 58.97H0zm231.81-380.9h-67.98v249.84h67.98c22.4 0 38.64-2.59 48.75-7.78 10.1-5.18 15.16-17.06 15.16-35.63V174.47c0-18.56-5.06-30.44-15.16-35.63-10.11-5.19-26.35-7.79-48.75-7.79z",
      title: "Memorable Narrative",
      text: "That single statement became one of the most memorable memes in crypto history.",
    },
    {
      letter: "O",
      // Happy Meal Box
      iconPath: "M 20 85 V 45 L 30 35 C 35 25, 45 25, 50 35 C 55 25, 65 25, 70 35 L 80 45 V 85 Z",
      letterPath: "M0 256.29c0-89.08 16.68-154.06 50.01-194.95C83.35 20.45 143.51 0 230.5 0c87 0 147.16 20.45 180.5 61.34 33.33 40.89 50 105.87 50 194.95 0 44.27-3.52 81.52-10.55 111.73-7.03 30.22-19.14 56.52-36.33 78.92-17.18 22.4-40.89 38.81-71.1 49.23-30.21 10.42-67.72 15.62-112.52 15.62-44.79 0-82.3-5.2-112.51-15.62-30.22-10.42-53.92-26.83-71.11-49.23-17.18-22.4-29.3-48.7-36.33-78.92C3.52 337.81 0 300.56 0 256.29zm168-81.26v203.15h64.84c21.37 0 36.86-2.47 46.5-7.43 9.63-4.94 14.46-16.27 14.46-33.99V133.62h-65.64c-20.83 0-36.07 2.47-45.71 7.42-9.64 4.94-14.45 16.28-14.45 33.99z",
      title: "Iconic Community",
      text: "MCDOGE was created to build a community around that iconic narrative and take it to the next level.",
    },
    {
      letter: "G",
      // Delivery Shield
      iconPath: "M61.439,0c33.928,0,61.44,27.513,61.44,61.439c0,33.929-27.513,61.44-61.44,61.44 C27.512,122.88,0,95.368,0,61.439C0,27.513,27.512,0,61.439,0L61.439,0z M78.314,6.495c20.618,6.853,36.088,24.997,39.068,47.101 l-1.953-0.209c-0.347,1.495-0.666,1.533-0.666,3.333c0,1.588,2,2.651,2,6.003c0,0.898-2.109,2.694-2.202,3.007l-3.132-3.674v4.669 l-0.476-0.018l-0.844-8.615l-1.749,0.551l-2.081-6.409l-6.855,7.155l-0.082,5.239l-2.238,1.501l-2.377-13.438l-1.422,1.039 l-3.22-4.345l-4.813,0.143l-1.844-2.107l-1.887,0.519l-3.712-4.254l-0.717,0.488l2.3,5.878h2.669v-1.334h1.333 c0.962,2.658,2.001,1.084,2.001,2.669c0,5.547-6.851,9.625-11.339,10.669c0.24,1.003,0.147,2.003,1.333,2.003 c2.513,0,1.264-0.44,4.003-0.667c-0.127,5.667-6.5,12.435-9.221,16.654l1.218,8.69c0.321,1.887-3.919,3.884-5.361,6.009 l0.692,3.329l-1.953,0.789c-0.342,3.42-3.662,7.214-7.386,7.214h-4c0-4.683-3.336-11.366-3.336-14.675 c0-2.81,1.333-3.188,1.333-6.669c0-3.216-3.333-7.828-3.333-8.67v-5.336h-2.669c-0.396-1.487-0.154-2-2-2h-0.667 c-2.914,0-2.422,1.333-5.336,1.333h-2.669c-2.406,0-6.669-7.721-6.669-8.671v-8.003c0-3.454,3.161-7.214,5.336-8.672v-3.333 l3.002-3.052l1.667-0.284c3.579,0,3.154-2,5.336-2H49.4v4.669L56,43.532l0.622-2.848c2.991,0.701,3.769,2.032,7.454,2.032h1.333 c2.531,0,2.667-3.358,2.667-6.002l-5.343,0.528l-2.324-5.064l-2.311,0.615c0.415,1.812,0.642,1.059,0.642,2.587 c0,0.9-0.741,1-1.335,1.334l-2.311-5.865l-4.969-3.549l-0.66,0.648l4.231,4.452c-0.562,1.597-0.628,6.209-2.961,2.979l2.182-1.05 l-5.438-5.699l-3.258,1.274l-3.216,3.08c-0.336,2.481-1.012,3.729-3.608,3.729c-1.728,0-0.685-0.447-3.336-0.667v-6.669h6.002 l-1.945-4.442l-0.721,0.44V24.04l9.747-4.494c-0.184-1.399-0.408-0.649-0.408-2.175c0-0.091,0.655-1.322,0.667-1.336l2.521,1.565 l-0.603-2.871l-3.889,0.8l-0.722-3.49c3.084-1.624,9.87-7.34,12.028-7.34h2.002c2.107,0,7.751,2.079,8.669,3.333L62.057,7.49 l3.971,3.271l0.381-1.395l2.964-0.812l0.036-1.855h1.336v2L78.314,6.495L78.314,6.495z",
      letterPath: "M273.52 340.73v-21.1h-39.86V215.69H422V476.7c-62 23.45-126.08 35.17-192.24 35.17-89.09 0-150.31-21.62-183.65-64.86-17.19-22.41-29.17-48.71-35.95-78.93C3.39 337.86 0 300.48 0 255.94c0-44.55 3.52-81.8 10.55-111.75 7.03-29.96 19.67-56.14 37.91-78.54C82.84 21.88 149.27 0 247.73 0c20.32 0 46.76 2.09 79.32 6.26 32.56 4.16 56.4 8.85 71.51 14.06l-23.45 119.57c-42.2-7.29-80.36-10.94-114.49-10.94-34.12 0-58.1 2.6-71.89 7.81-13.8 5.2-20.71 15.64-20.71 31.26v205.53h51.58c18.75 0 32.43-1.96 41.02-5.86 8.6-3.9 12.9-12.89 12.9-26.96z",
      title: "Execution & Transparency",
      text: "We believe strong communities are built through consistency, transparency, and execution—not empty promises.",
    },
    {
      letter: "E",
      // Speed Flame
      iconPath: "M20.416,17.743c46.635-32.238,50.118,31.566,95.917-8.271v65.01 c-43.681,39.279-53.104-24.185-95.917,8.068V17.743L20.416,17.743z M8.898,0c4.915,0,8.899,3.986,8.899,8.898 c0,3.263-1.758,6.114-4.375,7.663h0.42v7.624v74.512v7.624h-0.42c2.617,1.549,4.375,3.574,4.375,7.662 c0,4.087-3.984,8.896-8.899,8.896c-4.914,0-8.898-4.81-8.898-8.896c0-4.088,1.757-6.113,4.374-7.662H3.955v-7.624V24.185v-7.624 h0.419C1.757,15.012,0,12.162,0,8.898C0,3.986,3.984,0,8.898,0L8.898,0z",
      letterPath: "M328.09 319.05H147.66v62.34H365v131.24H0V0h360.89l-20.5 131.22H147.66v68.9h180.43z",
      title: "Our Mission",
      text: "To build one of the strongest and most recognized meme communities on Solana. Every holder matters. Every builder matters. Every day we move forward.",
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-grid">
        {/* Left Column - 6 Features in 6 Rows */}
        <div className="about-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-title"
          >
            ABOUT <span className="text-highlight">MCDOGE</span>
          </motion.h2>

          <div className="features-list">
            {features.map((feature, idx) => (
              <motion.div 
                key={`feature-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="feature-row"
              >
                <div className="feature-icon-col">
                  <CanvasMorphIcon 
                    letter={feature.letter}
                    iconPath={feature.iconPath}
                    letterPath={feature.letterPath}
                    progress={morphProgress}
                  />
                </div>
                <div className="feature-text-col">
                  <h3 className="feature-row-title">{feature.title}</h3>
                  <p className="feature-row-text">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Full Bleed MCDelivery Video */}
        <div className="about-right">
          <video 
            src="/mcdelivery.webm"
            autoPlay 
            loop 
            muted 
            playsInline
            className="about-video"
          />
        </div>
      </div>

      <style jsx global>{`
        .about-section {
          background-color: #000000;
          color: #ffffff;
          min-height: 100vh;
          height: 100vh;
          width: 100%;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          width: 100%;
          height: 100%;
          max-width: 100%;
          padding: 0;
        }

        .about-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          padding: 40px 6% 40px 10%;
          height: 100%;
          overflow-y: auto;
        }

        .about-title {
          font-family: var(--font-mazin), var(--font-display), sans-serif;
          font-size: 3.2rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .about-title .text-highlight {
          color: #FFC700;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-row {
          display: flex;
          gap: 20px;
          align-items: center;
          transition: transform 0.2s ease;
        }

        .feature-row:hover {
          transform: translateX(6px);
        }

        .feature-icon-col {
          flex-shrink: 0;
        }

        .feature-text-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .feature-row-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #FFC700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .feature-row-text {
          font-family: var(--font-body), sans-serif;
          font-size: 0.95rem;
          color: #a0a0a5;
          line-height: 1.45;
          max-width: 580px;
        }

        .about-right {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background-color: #000000;
        }

        .about-video {
          max-width: 100%;
          max-height: calc(100vh - 32px);
          width: auto;
          height: auto;
          display: block;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 199, 0, 0.05);
        }

        @media (max-width: 1024px) {
          .about-section {
            height: auto;
            min-height: auto;
            overflow: visible;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }

          .about-left {
            height: auto;
            padding: 80px 24px;
          }

          .about-right {
            height: 50vh;
            padding: 20px;
          }

          .about-title {
            text-align: center;
          }

          .feature-row {
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .about-left {
            padding: 60px 16px;
          }

          .about-right {
            height: 40vh;
            padding: 12px;
          }

          .about-title {
            font-size: 2.2rem;
          }

          .feature-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
