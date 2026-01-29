import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Canvas component for PCB circuit animation
const CircuitBackground = ({ 
  isMobile, 
  opacity 
}: { 
  isMobile: boolean; 
  opacity: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Generate circuit paths
  const generateCircuitPaths = useCallback((width: number, height: number) => {
    const paths: { points: { x: number; y: number }[]; width: number }[] = [];
    const gridSize = isMobile ? 60 : 40;
    const numPaths = isMobile ? 15 : 30;

    for (let i = 0; i < numPaths; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const pathPoints: { x: number; y: number }[] = [{ x: startX, y: startY }];
      
      let currentX = startX;
      let currentY = startY;
      const segments = Math.floor(Math.random() * 6) + 3;
      
      for (let j = 0; j < segments; j++) {
        // Move in grid-aligned directions (horizontal or vertical)
        const isHorizontal = Math.random() > 0.5;
        const distance = (Math.random() * 3 + 1) * gridSize;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        if (isHorizontal) {
          currentX += distance * direction;
        } else {
          currentY += distance * direction;
        }
        
        // Keep within bounds
        currentX = Math.max(0, Math.min(width, currentX));
        currentY = Math.max(0, Math.min(height, currentY));
        
        pathPoints.push({ x: currentX, y: currentY });
      }
      
      paths.push({ 
        points: pathPoints, 
        width: Math.random() * 0.5 + 0.3
      });
    }
    
    return paths;
  }, [isMobile]);

  // Signal class for animated pulses
  interface Signal {
    pathIndex: number;
    progress: number;
    speed: number;
    length: number;
    opacity: number;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let circuitPaths = generateCircuitPaths(width, height);
    
    // Initialize signals
    const numSignals = isMobile ? 8 : 20;
    const signals: Signal[] = [];
    
    for (let i = 0; i < numSignals; i++) {
      signals.push({
        pathIndex: Math.floor(Math.random() * circuitPaths.length),
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        length: 0.08 + Math.random() * 0.06,
        opacity: 0.6 + Math.random() * 0.4
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      circuitPaths = generateCircuitPaths(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Get point along path
    const getPointAlongPath = (
      path: { x: number; y: number }[], 
      progress: number
    ) => {
      const totalSegments = path.length - 1;
      const segmentProgress = progress * totalSegments;
      const segmentIndex = Math.floor(segmentProgress);
      const localProgress = segmentProgress - segmentIndex;
      
      if (segmentIndex >= totalSegments) {
        return path[path.length - 1];
      }
      
      const start = path[segmentIndex];
      const end = path[segmentIndex + 1];
      
      return {
        x: start.x + (end.x - start.x) * localProgress,
        y: start.y + (end.y - start.y) * localProgress
      };
    };

    const animate = () => {
      if (prefersReducedMotion) {
        // Static frame
        ctx.clearRect(0, 0, width, height);
        
        // Draw static circuit traces
        ctx.strokeStyle = "rgba(177, 145, 93, 0.15)";
        ctx.lineWidth = 0.5;
        
        circuitPaths.forEach(path => {
          ctx.beginPath();
          ctx.moveTo(path.points[0].x, path.points[0].y);
          path.points.slice(1).forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.stroke();
        });
        
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw circuit traces
      circuitPaths.forEach(path => {
        ctx.strokeStyle = `rgba(177, 145, 93, ${0.12 * opacity})`;
        ctx.lineWidth = path.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        path.points.slice(1).forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
        
        // Draw nodes at intersections
        path.points.forEach(point => {
          ctx.fillStyle = `rgba(177, 145, 93, ${0.2 * opacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Animate signals
      signals.forEach(signal => {
        const path = circuitPaths[signal.pathIndex];
        if (!path) return;
        
        signal.progress += signal.speed;
        if (signal.progress > 1) {
          signal.progress = 0;
          signal.pathIndex = Math.floor(Math.random() * circuitPaths.length);
        }
        
        // Draw signal pulse
        const headPos = getPointAlongPath(path.points, signal.progress);
        const tailProgress = Math.max(0, signal.progress - signal.length);
        const tailPos = getPointAlongPath(path.points, tailProgress);
        
        // Create gradient for signal
        const gradient = ctx.createLinearGradient(
          tailPos.x, tailPos.y, headPos.x, headPos.y
        );
        gradient.addColorStop(0, `rgba(177, 145, 93, 0)`);
        gradient.addColorStop(0.5, `rgba(177, 145, 93, ${0.4 * signal.opacity * opacity})`);
        gradient.addColorStop(1, `rgba(255, 215, 140, ${0.8 * signal.opacity * opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        
        // Draw signal line segment
        ctx.beginPath();
        ctx.moveTo(tailPos.x, tailPos.y);
        ctx.lineTo(headPos.x, headPos.y);
        ctx.stroke();
        
        // Glow at head
        ctx.beginPath();
        ctx.arc(headPos.x, headPos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 140, ${0.6 * signal.opacity * opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, opacity, prefersReducedMotion, generateCircuitPaths]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
};

const AITransitionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkMobile();
    checkReducedMotion();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ========== PHASE TIMING ==========
  // Phase 1 (0-15%): Full "Artificial Intelligence" visible
  // Phase 2 (15-35%): Fade out "rtificial" and "ntelligence"
  // Phase 3 (35-55%): Slide A and I together to form "AI"
  // Phase 4 (55-75%): Fade in supporting text
  // Phase 5 (75-100%): Hold and exit

  // Layer 2: Transitional letters fade out
  const rtificialOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    [1, 0]
  );
  const ntelligenceOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    [1, 0]
  );

  // Layer 1: A and I slide together after fade completes
  const slideDistance = isMobile ? 60 : 120;
  const aSlideX = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [0, slideDistance]
  );
  const iSlideX = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [0, -slideDistance]
  );

  // Layer 3: Supporting text reveals after lock-in
  const supportingTextOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.70],
    [0, 1]
  );
  const supportingTextY = useTransform(
    scrollYProgress,
    [0.55, 0.70],
    [30, 0]
  );

  // Overall content visibility
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 0.98],
    [0, 1, 1, 0]
  );

  // Background opacity
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0.3, 1, 1, 0]
  );

  const [canvasOpacity, setCanvasOpacity] = useState(0.5);
  useEffect(() => {
    const unsubscribe = bgOpacity.on("change", (v) => {
      setCanvasOpacity(v);
    });
    return () => unsubscribe();
  }, [bgOpacity]);

  // Font size for the main text
  const mainFontSize = isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(4rem, 10vw, 8rem)';

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ 
        height: '160vh',
        background: "hsl(220, 15%, 6%)",
        zIndex: 5,
      }}
    >
      {/* Scrolling Background Layer - NOT pinned */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!prefersReducedMotion && (
          <CircuitBackground isMobile={isMobile} opacity={canvasOpacity} />
        )}
        
        {prefersReducedMotion && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                linear-gradient(90deg, transparent 49%, rgba(177, 145, 93, 0.1) 50%, transparent 51%),
                linear-gradient(0deg, transparent 49%, rgba(177, 145, 93, 0.1) 50%, transparent 51%)
              `,
              backgroundSize: "40px 40px"
            }}
          />
        )}

        {/* Subtle scan lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(177, 145, 93, 0.008) 2px, rgba(177, 145, 93, 0.008) 4px)",
            }}
          />
        </motion.div>
      </div>

      {/* Vignette overlay for text readability */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          background: `
            radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, hsl(220, 15%, 6%, 0.6) 80%)
          `,
          zIndex: 5,
        }}
      />

      {/* PINNED CONTENT CONTAINER - All text layers pinned together */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        {prefersReducedMotion ? (
          // Static fallback for reduced motion
          <div className="text-center px-4">
            <h2 
              className="font-serif text-primary font-bold"
              style={{ fontSize: mainFontSize, lineHeight: 1 }}
            >
              AI
            </h2>
            <p 
              className="font-serif text-foreground/80 mt-4"
              style={{ fontSize: isMobile ? '1rem' : '1.5rem' }}
            >
              -first branding and marketing agency
            </p>
          </div>
        ) : (
          <motion.div
            className="text-center px-4"
            style={{ opacity: contentOpacity }}
          >
            {/* Main text container with all three layers */}
            <div className="relative flex flex-col items-center">
              
              {/* Layer 1 + Layer 2: "Artificial Intelligence" with pinned A and I */}
              <div 
                className="flex items-baseline justify-center font-serif tracking-wide"
                style={{ 
                  fontSize: mainFontSize,
                  lineHeight: 1,
                  gap: isMobile ? '0.15em' : '0.2em',
                }}
              >
                {/* "Artificial" - A is pinned, "rtificial" fades */}
                <motion.span 
                  className="relative inline-flex items-baseline"
                  style={{ 
                    x: aSlideX,
                    willChange: 'transform',
                  }}
                >
                  <span 
                    className="text-primary font-semibold"
                    style={{ textShadow: '0 0 40px rgba(177, 145, 93, 0.4)' }}
                  >
                    A
                  </span>
                  <motion.span 
                    className="text-foreground/90"
                    style={{ 
                      opacity: rtificialOpacity,
                      willChange: 'opacity',
                    }}
                  >
                    rtificial
                  </motion.span>
                </motion.span>

                {/* "Intelligence" - I is pinned, "ntelligence" fades */}
                <motion.span 
                  className="relative inline-flex items-baseline"
                  style={{ 
                    x: iSlideX,
                    willChange: 'transform',
                  }}
                >
                  <span 
                    className="text-primary font-semibold"
                    style={{ textShadow: '0 0 40px rgba(177, 145, 93, 0.4)' }}
                  >
                    I
                  </span>
                  <motion.span 
                    className="text-foreground/90"
                    style={{ 
                      opacity: ntelligenceOpacity,
                      willChange: 'opacity',
                    }}
                  >
                    ntelligence
                  </motion.span>
                </motion.span>
              </div>

              {/* Layer 3: Supporting text - fades and slides in below */}
              <motion.div
                className="mt-4 sm:mt-6"
                style={{
                  opacity: supportingTextOpacity,
                  y: supportingTextY,
                  willChange: 'transform, opacity',
                }}
              >
                <span 
                  className="font-serif text-foreground/80 tracking-wide"
                  style={{ 
                    fontSize: isMobile ? 'clamp(0.9rem, 4vw, 1.25rem)' : 'clamp(1.25rem, 2.5vw, 2rem)',
                  }}
                >
                  -first branding and marketing agency
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AITransitionSection;
