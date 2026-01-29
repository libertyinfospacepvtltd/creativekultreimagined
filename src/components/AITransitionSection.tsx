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

  // Background opacity - fades in smoothly, stays, then fades out at exit
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0.5, 1, 1, 0]
  );

  // Phase 1 (0-15%): Full "Artificial Intelligence" visible
  // Phase 2 (15-35%): Fade out "rtificial" and "ntelligence", keep A and I in place
  // Phase 3 (35-50%): Slide A right and I left to form "AI"
  // Phase 4 (50-70%): Fade in "-first branding and marketing agency"
  // Phase 5 (70-100%): Hold, then allow scroll out

  // Fade out "rtificial" (letters after A in "Artificial")
  const rtificialOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    [1, 0]
  );

  // Fade out "ntelligence" (letters after I in "Intelligence")
  const ntelligenceOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    [1, 0]
  );

  // After fade complete, slide "A" right toward center
  const aSlideX = useTransform(
    scrollYProgress,
    [0.35, 0.50],
    [0, isMobile ? 45 : 90]
  );

  // After fade complete, slide "I" left toward center  
  const iSlideX = useTransform(
    scrollYProgress,
    [0.35, 0.50],
    [0, isMobile ? -45 : -90]
  );

  // Supporting text "-first branding..." fade in after AI locks
  const restTextOpacity = useTransform(
    scrollYProgress,
    [0.50, 0.65],
    [0, 1]
  );
  const restTextY = useTransform(
    scrollYProgress,
    [0.50, 0.65],
    [30, 0]
  );

  // Background opacity for canvas
  const [canvasOpacity, setCanvasOpacity] = useState(0.5);
  
  useEffect(() => {
    const unsubscribe = bgOpacity.on("change", (v) => {
      setCanvasOpacity(v);
    });
    return () => unsubscribe();
  }, [bgOpacity]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ 
        height: '160vh',
        background: "hsl(220, 15%, 6%)",
        zIndex: 5,
      }}
    >
      {/* Sticky container - pins text to center */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {/* PCB Circuit Background */}
        {!prefersReducedMotion && (
          <CircuitBackground isMobile={isMobile} opacity={canvasOpacity} />
        )}

        {/* Static fallback for reduced motion */}
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

        {/* Dark vignette overlay for text readability */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: bgOpacity,
            background: `
              radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, hsl(220, 15%, 6%) 75%),
              linear-gradient(to bottom, hsl(220, 15%, 6%) 0%, transparent 20%, transparent 80%, hsl(220, 15%, 6%) 100%)
            `
          }}
        />

        {/* Text Content - centered and pinned */}
        <div 
          className="relative z-10 text-center px-4 sm:px-6"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {prefersReducedMotion ? (
            // Static version for reduced motion
            <div className="flex flex-col items-center">
              <h2 className="font-serif text-foreground flex items-baseline gap-2">
                <span className="text-primary font-bold text-[clamp(3rem,10vw,7rem)]">AI</span>
                <span className="text-[clamp(1.5rem,4vw,3rem)] text-foreground/90">-first</span>
              </h2>
              <p className="text-[clamp(1.25rem,3vw,2rem)] text-foreground/80 mt-2">
                branding and marketing agency
              </p>
            </div>
          ) : (
            <>
              {/* Phase 1-3: "Artificial Intelligence" with subtractive fade and slide */}
              <div className="relative flex flex-col items-center justify-center">
                {/* Main text container */}
                <div 
                  className="flex items-baseline justify-center font-serif text-[clamp(2.5rem,8vw,6rem)] text-foreground/90 tracking-wide"
                  style={{
                    gap: '0.25em',
                  }}
                >
                  {/* "Artificial" - A stays visible, "rtificial" fades */}
                  <motion.span 
                    className="relative inline-flex items-baseline"
                    style={{ 
                      x: aSlideX,
                      transform: 'translateZ(0)',
                    }}
                  >
                    <span className="text-primary font-semibold">A</span>
                    <motion.span 
                      className="inline-block"
                      style={{ 
                        opacity: rtificialOpacity,
                        willChange: 'opacity',
                      }}
                    >
                      rtificial
                    </motion.span>
                  </motion.span>

                  {/* "Intelligence" - I stays visible, "ntelligence" fades */}
                  <motion.span 
                    className="relative inline-flex items-baseline"
                    style={{ 
                      x: iSlideX,
                      transform: 'translateZ(0)',
                    }}
                  >
                    <span className="text-primary font-semibold">I</span>
                    <motion.span 
                      className="inline-block"
                      style={{ 
                        opacity: ntelligenceOpacity,
                        willChange: 'opacity',
                      }}
                    >
                      ntelligence
                    </motion.span>
                  </motion.span>
                </div>

                {/* Phase 4: Supporting line - fades in after AI locks */}
                <motion.div
                  className="mt-4 sm:mt-6"
                  style={{
                    opacity: restTextOpacity,
                    y: restTextY,
                    willChange: 'transform, opacity',
                  }}
                >
                  <span className="font-serif text-[clamp(1.25rem,3.5vw,2.5rem)] text-foreground/80 tracking-wide">
                    -first branding and marketing agency
                  </span>
                </motion.div>
              </div>
            </>
          )}
        </div>

        {/* Subtle scan line effect for digital texture */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: bgOpacity }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(177, 145, 93, 0.015) 2px, rgba(177, 145, 93, 0.015) 4px)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AITransitionSection;
