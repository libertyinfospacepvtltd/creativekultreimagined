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

  // Supporting text reveals as user scrolls (Layer B content)
  const supportingTextOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    [0, 1]
  );
  const supportingTextY = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    [40, 0]
  );

  // AI visibility - stays visible until near end, then fades
  const aiOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  // Background opacity for canvas
  const [canvasOpacity, setCanvasOpacity] = useState(0.5);
  
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0.3, 1, 1, 0]
  );

  useEffect(() => {
    const unsubscribe = bgOpacity.on("change", (v) => {
      setCanvasOpacity(v);
    });
    return () => unsubscribe();
  }, [bgOpacity]);

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
      {/* Layer: Scrolling Background - NOT sticky, scrolls with section */}
      <div className="absolute inset-0 w-full h-full">
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
      </div>

      {/* Layer A: Pinned "AI" - stays fixed in center */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        {/* Light vignette overlay for readability */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: bgOpacity,
            background: `
              radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, hsl(220, 15%, 6%, 0.5) 70%)
            `
          }}
        />

        <motion.div
          className="relative z-10 text-center"
          style={{
            opacity: aiOpacity,
            transform: 'translateZ(0)',
          }}
        >
          <h2 
            className="font-serif text-primary font-bold tracking-tight"
            style={{
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              lineHeight: 1,
              textShadow: '0 0 60px rgba(177, 145, 93, 0.3)',
            }}
          >
            AI
          </h2>
        </motion.div>
      </div>

      {/* Layer B: Scrolling supporting text - in normal flow, appears below pinned AI */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ zIndex: 15 }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <motion.div
            className="text-center px-4 sm:px-6"
            style={{
              opacity: supportingTextOpacity,
              y: supportingTextY,
              marginTop: isMobile ? '8rem' : '10rem', // Position below pinned AI
              willChange: 'transform, opacity',
            }}
          >
            <span 
              className="font-serif text-foreground/80 tracking-wide block"
              style={{
                fontSize: 'clamp(1rem, 3vw, 2rem)',
              }}
            >
              -first branding and marketing agency
            </span>
          </motion.div>
        </div>
      </div>

      {/* Subtle scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: bgOpacity,
          zIndex: 10,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(177, 145, 93, 0.01) 2px, rgba(177, 145, 93, 0.01) 4px)",
          }}
        />
      </motion.div>

      {/* Reduced motion static fallback */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 25 }}>
          <div className="text-center">
            <h2 
              className="font-serif text-primary font-bold"
              style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
            >
              AI
            </h2>
            <p className="font-serif text-foreground/80 text-[clamp(1rem,3vw,2rem)] mt-4">
              -first branding and marketing agency
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AITransitionSection;
