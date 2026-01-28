import { useEffect, useRef, useCallback } from "react";
import goldBrainImage from "@/assets/gold-brain-neural.png";

interface NeuralFlowOverlayProps {
  className?: string;
  isStatic?: boolean;
}

interface Signal {
  pathIndex: number;
  progress: number;
  speed: number;
  opacity: number;
  size: number;
}

// Define neural paths that follow the golden lines in the image
// These paths converge toward the bright central focal point
const getNeuralPaths = (width: number, height: number) => {
  const centerX = width * 0.42; // Focal point (brain center)
  const centerY = height * 0.38;
  
  return [
    // Top-left flowing lines
    { start: { x: width * 0.05, y: height * 0.25 }, end: { x: centerX, y: centerY }, curve: 0.3 },
    { start: { x: width * 0.1, y: height * 0.18 }, end: { x: centerX, y: centerY }, curve: 0.25 },
    { start: { x: width * 0.15, y: height * 0.12 }, end: { x: centerX, y: centerY }, curve: 0.2 },
    
    // Top-right flowing lines
    { start: { x: width * 0.95, y: height * 0.22 }, end: { x: centerX, y: centerY }, curve: -0.35 },
    { start: { x: width * 0.88, y: height * 0.15 }, end: { x: centerX, y: centerY }, curve: -0.28 },
    { start: { x: width * 0.78, y: height * 0.1 }, end: { x: centerX, y: centerY }, curve: -0.2 },
    
    // Upper brain region paths
    { start: { x: width * 0.25, y: height * 0.22 }, end: { x: centerX, y: centerY }, curve: 0.15 },
    { start: { x: width * 0.6, y: height * 0.2 }, end: { x: centerX, y: centerY }, curve: -0.12 },
    { start: { x: width * 0.35, y: height * 0.28 }, end: { x: centerX, y: centerY }, curve: 0.08 },
    { start: { x: width * 0.55, y: height * 0.26 }, end: { x: centerX, y: centerY }, curve: -0.1 },
    
    // Lower brain paths
    { start: { x: width * 0.32, y: height * 0.52 }, end: { x: centerX, y: centerY }, curve: -0.12 },
    { start: { x: width * 0.28, y: height * 0.58 }, end: { x: centerX, y: centerY }, curve: -0.18 },
    { start: { x: width * 0.38, y: height * 0.48 }, end: { x: centerX, y: centerY }, curve: -0.06 },
    
    // Neck/spine region
    { start: { x: width * 0.35, y: height * 0.75 }, end: { x: centerX, y: centerY }, curve: 0.15 },
    { start: { x: width * 0.32, y: height * 0.68 }, end: { x: centerX, y: centerY }, curve: 0.1 },
    
    // Far outer streaming lines
    { start: { x: width * 0.02, y: height * 0.35 }, end: { x: centerX, y: centerY }, curve: 0.4 },
    { start: { x: width * 0.98, y: height * 0.32 }, end: { x: centerX, y: centerY }, curve: -0.42 },
  ];
};

const NeuralFlowOverlay = ({ className = "", isStatic = false }: NeuralFlowOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const signalsRef = useRef<Signal[]>([]);
  const lastTimeRef = useRef<number>(0);

  const initSignals = useCallback((pathCount: number) => {
    const signals: Signal[] = [];
    const signalsPerPath = 3;
    
    for (let i = 0; i < pathCount; i++) {
      for (let j = 0; j < signalsPerPath; j++) {
        signals.push({
          pathIndex: i,
          progress: Math.random(),
          speed: 0.0008 + Math.random() * 0.0012, // Varied speeds for organic feel
          opacity: 0.4 + Math.random() * 0.4,
          size: 1.5 + Math.random() * 2,
        });
      }
    }
    return signals;
  }, []);

  const getPointOnPath = (
    path: { start: { x: number; y: number }; end: { x: number; y: number }; curve: number },
    t: number
  ) => {
    const { start, end, curve } = path;
    
    // Quadratic bezier with control point offset
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const controlX = midX + (end.y - start.y) * curve;
    const controlY = midY - (end.x - start.x) * curve;
    
    // Quadratic bezier formula
    const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * end.x;
    const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * end.y;
    
    return { x, y };
  };

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const { width, height } = canvas;
    const paths = getNeuralPaths(width, height);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw signals along paths
    signalsRef.current.forEach((signal) => {
      if (!isStatic) {
        signal.progress += signal.speed * deltaTime;
        if (signal.progress > 1) {
          signal.progress = 0;
          signal.speed = 0.0008 + Math.random() * 0.0012;
        }
      }

      const path = paths[signal.pathIndex];
      if (!path) return;

      const point = getPointOnPath(path, signal.progress);
      
      // Signal glow with trail effect
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, signal.size * 4
      );
      
      // Brighter toward center of path (near focal point)
      const intensityBoost = signal.progress > 0.7 ? 1 + (signal.progress - 0.7) * 2 : 1;
      const opacity = signal.opacity * intensityBoost;
      
      gradient.addColorStop(0, `rgba(255, 215, 140, ${opacity})`);
      gradient.addColorStop(0.3, `rgba(220, 180, 100, ${opacity * 0.6})`);
      gradient.addColorStop(0.6, `rgba(180, 140, 70, ${opacity * 0.3})`);
      gradient.addColorStop(1, "rgba(180, 140, 70, 0)");

      ctx.beginPath();
      ctx.arc(point.x, point.y, signal.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core bright point
      ctx.beginPath();
      ctx.arc(point.x, point.y, signal.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 235, 180, ${opacity})`;
      ctx.fill();
    });

    // Draw subtle convergence glow at focal point
    const centerX = width * 0.42;
    const centerY = height * 0.38;
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, width * 0.08
    );
    glowGradient.addColorStop(0, "rgba(255, 220, 150, 0.15)");
    glowGradient.addColorStop(0.5, "rgba(220, 180, 100, 0.08)");
    glowGradient.addColorStop(1, "rgba(180, 140, 70, 0)");
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, width * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    if (!isStatic) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [isStatic]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Reinitialize signals with new dimensions
      const paths = getNeuralPaths(rect.width, rect.height);
      signalsRef.current = initSignals(paths.length);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    lastTimeRef.current = performance.now();
    
    if (isStatic) {
      // Draw single frame for static mode
      draw(performance.now());
    } else {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw, initSignals, isStatic]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Gold brain background image */}
      <img
        src={goldBrainImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />
      
      {/* Animated signals overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
      
      {/* Cinematic dark edges vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 42% 38%, transparent 0%, transparent 40%, hsl(220, 15%, 8%) 100%),
            linear-gradient(to bottom, hsl(220, 15%, 8%) 0%, transparent 15%, transparent 85%, hsl(220, 15%, 8%) 100%),
            linear-gradient(to right, hsl(220, 15%, 8%) 0%, transparent 20%, transparent 80%, hsl(220, 15%, 8%) 100%)
          `,
        }}
      />
    </div>
  );
};

export default NeuralFlowOverlay;
