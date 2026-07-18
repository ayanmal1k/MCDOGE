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
  const jumpsIconRef = useRef<boolean[]>([]);
  const jumpsLetterRef = useRef<boolean[]>([]);

  useEffect(() => {
    const ptsIcon = samplePoints(iconPath);
    const ptsLetter = samplePoints(letterPath);
    pointsIconRef.current = ptsIcon;
    pointsLetterRef.current = ptsLetter;

    // Detect jump indices separately for icon and letter to prevent cross-contamination distortion
    const jumpsIcon: boolean[] = [];
    const jumpsLetter: boolean[] = [];
    for (let i = 0; i < N_POINTS; i++) {
      if (i === 0) {
        jumpsIcon.push(false);
        jumpsLetter.push(false);
        continue;
      }
      const distIcon = ptsIcon.length > i ? Math.hypot(ptsIcon[i].x - ptsIcon[i - 1].x, ptsIcon[i].y - ptsIcon[i - 1].y) : 0;
      const distLetter = ptsLetter.length > i ? Math.hypot(ptsLetter[i].x - ptsLetter[i - 1].x, ptsLetter[i].y - ptsLetter[i - 1].y) : 0;

      jumpsIcon.push(distIcon > 20);
      jumpsLetter.push(distLetter > 20);
    }
    jumpsIconRef.current = jumpsIcon;
    jumpsLetterRef.current = jumpsLetter;
  }, [iconPath, letterPath]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointsIcon = pointsIconRef.current;
    const pointsLetter = pointsLetterRef.current;
    const jumpsIcon = jumpsIconRef.current;
    const jumpsLetter = jumpsLetterRef.current;
    if (pointsIcon.length === 0 || pointsLetter.length === 0) return;

    // Dynamically apply contour jumps depending on which shape we are closer to
    const jumps = progress < 0.5 ? jumpsIcon : jumpsLetter;

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
      if (jumps[i]) {
        ctx.moveTo(x * 0.48, y * 0.48);
      } else {
        ctx.lineTo(x * 0.48, y * 0.48);
      }
    }

    ctx.closePath();

    // Draw shape with styling
    ctx.fillStyle = isHovered ? "#FFE054" : "#FFC700";
    ctx.fill();

    // Add subtle border glow
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
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
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 14px;
          transition: all 0.3s ease;
        }

        .morph-canvas-container:hover {
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 199, 0, 0.4);
          box-shadow: 0 0 15px rgba(255, 199, 0, 0.2);
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
      title: "The Happiest Restaurant",
      text: "This isn't just another meme coin. This is the happiest restaurant in crypto, cooking up smiles and joy daily.",
    },
    {
      letter: "C",
      // Doge Head (represents Original Characters)
      iconPath: "M16.68,0c16.94,14.54,26.8,34.81,14.4,51.6c3.52,0.61,6.5,1.56,8.64,2.74c2.4,1.32,3.8,2.98,3.8,4.86l0,0.08 c0-0.03,0.01-0.05,0.02-0.08v49.99C43.53,127.65,0,127.2,0,109.31V59.19c0,0.03,0.01,0.05,0.02,0.08l0-0.08 c0-1.83,1.33-3.45,3.62-4.76c2-1.14,4.79-2.07,8.09-2.7C-3.86,31.7,21.34,9.83,16.68,0L16.68,0z M29.97,53.01 c-1.7,2.06-3.75,4.07-6.18,6v1.76c0,0.94-0.81,1.7-1.8,1.7c-1,0-1.8-0.76-1.8-1.7V43.34c0-0.94,0.81-1.7,1.8-1.7 c1,0,1.8,0.76,1.8,1.7v15.58C35.76,48.46,30.84,32.79,20.92,23c2.99,6.31-18.76,23.02-1.26,36.16c-2.74-1.97-4.96-3.98-6.75-6.01 c-0.04,0.02-0.08,0.03-0.13,0.04c-3.54,0.61-6.51,1.56-8.57,2.73c-1.81,1.03-2.85,2.16-2.85,3.28c0,1.68,2.18,3.3,5.7,4.56 c3.75,1.34,8.96,2.18,14.72,2.18c5.76,0,10.97-0.83,14.72-2.18c3.52-1.26,5.7-2.88,5.7-4.56c0-1.16-1.11-2.33-3.01-3.38 c-2.17-1.19-5.29-2.15-8.98-2.73C30.11,53.07,30.04,53.05,29.97,53.01L29.97,53.01z",
      letterPath: "M348.26 360.78L360 492.26c-32.87 13.56-74.09 20.35-123.65 20.35-49.57 0-89.35-5.22-119.35-15.65-29.99-10.44-53.61-26.87-70.82-49.3-17.22-22.45-29.22-48.79-36-79.05C3.39 338.35 0 301.04 0 256.7c0-44.35 3.39-81.78 10.18-112.3 6.78-30.52 18.78-57.01 36-79.44C79.56 21.66 140.87 0 230.09 0c19.82 0 43.17 1.96 70.04 5.87 26.86 3.92 46.83 8.74 59.87 14.48l-23.48 119.74c-33.91-7.3-64.96-10.95-93.13-10.95s-47.74 2.6-58.69 7.82c-10.96 5.22-16.44 15.65-16.44 31.3V373.3c20.35 4.18 40.96 6.26 61.83 6.26 44.35 0 83.73-6.26 118.17-18.78z",
      title: "Original Characters",
      text: "Meet our unique, custom-designed kitchen crew and restaurant characters that star in our daily episodes.",
    },
    {
      letter: "D",
      // Play Screen (represents Daily Episodes)
      iconPath: "M 15 20 H 85 C 90 20, 90 20, 90 25 V 65 C 90 70, 90 70, 85 70 H 15 C 10 70, 10 70, 10 65 V 25 C 10 20, 10 20, 15 20 Z M 45 35 V 55 L 65 45 Z",
      letterPath: "M0 511.95V0h229.36c92.29 0 155.63 19.66 190.04 58.98C453.8 98.3 471 163.96 471 255.97c0 92.02-17.2 157.69-51.6 197.01-34.41 39.32-97.75 58.97-190.04 58.97H0zm231.81-380.9h-67.98v249.84h67.98c22.4 0 38.64-2.59 48.75-7.78 10.1-5.18 15.16-17.06 15.16-35.63V174.47c0-18.56-5.06-30.44-15.16-35.63-10.11-5.19-26.35-7.79-48.75-7.79z",
      title: "Daily Episodes",
      text: "Every day, a new story begins. Tune in daily to watch the comedy, drama, and fun unfold in the MCDOGE kitchen.",
    },
    {
      letter: "O",
      // Happy Meal Box (represents Fresh Memes)
      iconPath: "M 20 85 V 45 L 30 35 C 35 25, 45 25, 50 35 C 55 25, 65 25, 70 35 L 80 45 V 85 Z",
      letterPath: "M0 256.29c0-89.08 16.68-154.06 50.01-194.95C83.35 20.45 143.51 0 230.5 0c87 0 147.16 20.45 180.5 61.34 33.33 40.89 50 105.87 50 194.95 0 44.27-3.52 81.52-10.55 111.73-7.03 30.22-19.14 56.52-36.33 78.92-17.18 22.4-40.89 38.81-71.1 49.23-30.21 10.42-67.72 15.62-112.52 15.62-44.79 0-82.3-5.2-112.51-15.62-30.22-10.42-53.92-26.83-71.11-49.23-17.18-22.4-29.3-48.7-36.33-78.92C3.52 337.81 0 300.56 0 256.29zm168-81.26v203.15h64.84c21.37 0 36.86-2.47 46.5-7.43 9.63-4.94 14.46-16.27 14.46-33.99V133.62h-65.64c-20.83 0-36.07 2.47-45.71 7.42-9.64 4.94-14.45 16.28-14.45 33.99z",
      title: "Fresh Memes",
      text: "We cook up the freshest memes in Web3. Join the family, share the laughs, and grab your seat at the table.",
    },
    {
      letter: "G",
      // Chair (represents A Seat at the Table)
      iconPath: "M 35 15 H 65 V 45 H 70 V 50 H 65 V 85 H 60 V 50 H 40 V 85 H 35 V 50 H 30 V 45 H 35 Z",
      letterPath: "M273.52 340.73v-21.1h-39.86V215.69H422V476.7c-62 23.45-126.08 35.17-192.24 35.17-89.09 0-150.31-21.62-183.65-64.86-17.19-22.41-29.17-48.71-35.95-78.93C3.39 337.86 0 300.48 0 255.94c0-44.55 3.52-81.8 10.55-111.75 7.03-29.96 19.67-56.14 37.91-78.54C82.84 21.88 149.27 0 247.73 0c20.32 0 46.76 2.09 79.32 6.26 32.56 4.16 56.4 8.85 71.51 14.06l-23.45 119.57c-42.2-7.29-80.36-10.94-114.49-10.94-34.12 0-58.1 2.6-71.89 7.81-13.8 5.2-20.71 15.64-20.71 31.26v205.53h51.58c18.75 0 32.43-1.96 41.02-5.86 8.6-3.9 12.9-12.89 12.9-26.96z",
      title: "A Seat at the Table",
      text: "A community where everyone has a seat at the table. We build together with transparency, execution, and zero hierarchies.",
    },
    {
      letter: "E",
      // House (represents Welcome Home)
      iconPath: "M 50 15 L 85 45 H 75 V 85 H 58 V 60 H 42 V 85 H 25 V 45 H 15 Z",
      letterPath: "M328.09 319.05H147.66v62.34H365v131.24H0V0h360.89l-20.5 131.22H147.66v68.9h180.43z",
      title: "Welcome Home",
      text: "Enjoy the ride, grab a seat, and join the MCDOGE family. Every builder, contributor, and guest matters.",
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
