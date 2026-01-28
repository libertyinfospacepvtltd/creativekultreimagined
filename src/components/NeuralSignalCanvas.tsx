import { useEffect, useRef, useCallback } from "react";

interface NeuralSignalCanvasProps {
  opacity?: number;
  scale?: number;
  className?: string;
}

interface Signal {
  progress: number;
  speed: number;
  pathIndex: number;
  opacity: number;
  size: number;
}

interface Path {
  points: { x: number; y: number }[];
  controlPoints: { cx1: number; cy1: number; cx2: number; cy2: number }[];
}

const NeuralSignalCanvas = ({ opacity = 1, scale = 1, className = "" }: NeuralSignalCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const signalsRef = useRef<Signal[]>([]);
  const pathsRef = useRef<Path[]>([]);
  const lastTimeRef = useRef<number>(0);

  // Convergence point (center of brain, slightly offset)
  const convergencePoint = { x: 0.52, y: 0.48 };

  // Generate curved paths from various brain regions to the convergence point
  const generatePaths = useCallback((width: number, height: number) => {
    const paths: Path[] = [];
    
    // Origin points around the brain silhouette (normalized 0-1)
    const origins = [
      // Top of brain
      { x: 0.35, y: 0.15 },
      { x: 0.50, y: 0.10 },
      { x: 0.65, y: 0.12 },
      { x: 0.75, y: 0.18 },
      // Right side
      { x: 0.82, y: 0.32 },
      { x: 0.85, y: 0.48 },
      { x: 0.80, y: 0.62 },
      // Bottom
      { x: 0.68, y: 0.78 },
      { x: 0.52, y: 0.82 },
      { x: 0.38, y: 0.75 },
      // Left side (face side - fewer signals)
      { x: 0.28, y: 0.58 },
      { x: 0.25, y: 0.40 },
      { x: 0.30, y: 0.25 },
      // Additional interior paths for density
      { x: 0.60, y: 0.25 },
      { x: 0.70, y: 0.40 },
      { x: 0.45, y: 0.65 },
      { x: 0.62, y: 0.58 },
      { x: 0.40, y: 0.35 },
    ];

    origins.forEach((origin) => {
      // Create curved path with control points
      const midX = (origin.x + convergencePoint.x) / 2;
      const midY = (origin.y + convergencePoint.y) / 2;
      
      // Add organic curve variation
      const curveOffset = (Math.random() - 0.5) * 0.15;
      const perpX = -(origin.y - convergencePoint.y);
      const perpY = origin.x - convergencePoint.x;
      const len = Math.sqrt(perpX * perpX + perpY * perpY);
      
      const cx1 = midX + (perpX / len) * curveOffset + (Math.random() - 0.5) * 0.08;
      const cy1 = midY + (perpY / len) * curveOffset + (Math.random() - 0.5) * 0.08;
      
      paths.push({
        points: [
          { x: origin.x * width, y: origin.y * height },
          { x: convergencePoint.x * width, y: convergencePoint.y * height },
        ],
        controlPoints: [{
          cx1: cx1 * width,
          cy1: cy1 * height,
          cx2: (cx1 * 0.6 + convergencePoint.x * 0.4) * width,
          cy2: (cy1 * 0.6 + convergencePoint.y * 0.4) * height,
        }],
      });
    });

    return paths;
  }, []);

  // Get point along bezier curve
  const getPointOnCurve = useCallback((path: Path, t: number) => {
    const p0 = path.points[0];
    const p3 = path.points[1];
    const cp = path.controlPoints[0];
    
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    
    return {
      x: mt3 * p0.x + 3 * mt2 * t * cp.cx1 + 3 * mt * t2 * cp.cx2 + t3 * p3.x,
      y: mt3 * p0.y + 3 * mt2 * t * cp.cy1 + 3 * mt * t2 * cp.cy2 + t3 * p3.y,
    };
  }, []);

  // Initialize signals
  const initSignals = useCallback((pathCount: number) => {
    const signals: Signal[] = [];
    const signalsPerPath = 2;
    
    for (let i = 0; i < pathCount * signalsPerPath; i++) {
      signals.push({
        progress: Math.random(),
        speed: 0.0008 + Math.random() * 0.0006, // Slow, calm movement
        pathIndex: i % pathCount,
        opacity: 0.4 + Math.random() * 0.4,
        size: 2 + Math.random() * 2,
      });
    }
    
    return signals;
  }, []);

  // Draw brain silhouette
  const drawBrainSilhouette = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    
    // Create gradient for silhouette
    const gradient = ctx.createRadialGradient(
      width * 0.52, height * 0.48, 0,
      width * 0.52, height * 0.48, width * 0.5
    );
    gradient.addColorStop(0, 'rgba(40, 35, 28, 0.2)');
    gradient.addColorStop(0.5, 'rgba(30, 26, 20, 0.4)');
    gradient.addColorStop(1, 'rgba(20, 18, 14, 0.6)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    // Simplified brain/head silhouette path
    ctx.moveTo(width * 0.25, height * 0.50);
    
    // Face profile (left side)
    ctx.bezierCurveTo(
      width * 0.22, height * 0.55,
      width * 0.20, height * 0.62,
      width * 0.28, height * 0.70
    );
    ctx.bezierCurveTo(
      width * 0.32, height * 0.78,
      width * 0.40, height * 0.85,
      width * 0.52, height * 0.88
    );
    
    // Bottom curve
    ctx.bezierCurveTo(
      width * 0.65, height * 0.85,
      width * 0.75, height * 0.78,
      width * 0.82, height * 0.65
    );
    
    // Right side of brain
    ctx.bezierCurveTo(
      width * 0.88, height * 0.52,
      width * 0.88, height * 0.38,
      width * 0.82, height * 0.25
    );
    
    // Top of brain
    ctx.bezierCurveTo(
      width * 0.75, height * 0.12,
      width * 0.60, height * 0.08,
      width * 0.48, height * 0.10
    );
    
    // Left top
    ctx.bezierCurveTo(
      width * 0.35, height * 0.12,
      width * 0.28, height * 0.20,
      width * 0.25, height * 0.32
    );
    
    // Back to start
    ctx.bezierCurveTo(
      width * 0.23, height * 0.40,
      width * 0.24, height * 0.45,
      width * 0.25, height * 0.50
    );
    
    ctx.closePath();
    ctx.fill();
    
    // Add subtle brain folds as decorative lines
    ctx.strokeStyle = 'rgba(177, 145, 93, 0.08)';
    ctx.lineWidth = 1;
    
    // Draw some brain fold curves
    const folds = [
      { start: { x: 0.35, y: 0.25 }, mid: { x: 0.45, y: 0.35 }, end: { x: 0.55, y: 0.30 } },
      { start: { x: 0.55, y: 0.20 }, mid: { x: 0.65, y: 0.32 }, end: { x: 0.72, y: 0.28 } },
      { start: { x: 0.40, y: 0.40 }, mid: { x: 0.50, y: 0.50 }, end: { x: 0.45, y: 0.58 } },
      { start: { x: 0.60, y: 0.45 }, mid: { x: 0.70, y: 0.52 }, end: { x: 0.75, y: 0.48 } },
      { start: { x: 0.50, y: 0.60 }, mid: { x: 0.58, y: 0.68 }, end: { x: 0.55, y: 0.75 } },
    ];
    
    folds.forEach(fold => {
      ctx.beginPath();
      ctx.moveTo(fold.start.x * width, fold.start.y * height);
      ctx.quadraticCurveTo(
        fold.mid.x * width, fold.mid.y * height,
        fold.end.x * width, fold.end.y * height
      );
      ctx.stroke();
    });
    
    ctx.restore();
  }, []);

  // Draw convergence glow
  const drawConvergenceGlow = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const cx = convergencePoint.x * width;
    const cy = convergencePoint.y * height;
    const maxRadius = width * 0.12;
    
    // Outer soft glow
    const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
    outerGlow.addColorStop(0, 'rgba(177, 145, 93, 0.25)');
    outerGlow.addColorStop(0.4, 'rgba(177, 145, 93, 0.10)');
    outerGlow.addColorStop(1, 'rgba(177, 145, 93, 0)');
    
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner warm glow
    const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * 0.4);
    innerGlow.addColorStop(0, 'rgba(210, 175, 120, 0.35)');
    innerGlow.addColorStop(0.5, 'rgba(177, 145, 93, 0.15)');
    innerGlow.addColorStop(1, 'rgba(177, 145, 93, 0)');
    
    ctx.fillStyle = innerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // Draw signal paths (faint)
  const drawPaths = useCallback((ctx: CanvasRenderingContext2D, paths: Path[]) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(177, 145, 93, 0.06)';
    ctx.lineWidth = 1;
    
    paths.forEach((path) => {
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      ctx.bezierCurveTo(
        path.controlPoints[0].cx1,
        path.controlPoints[0].cy1,
        path.controlPoints[0].cx2,
        path.controlPoints[0].cy2,
        path.points[1].x,
        path.points[1].y
      );
      ctx.stroke();
    });
    
    ctx.restore();
  }, []);

  // Draw signals
  const drawSignals = useCallback((ctx: CanvasRenderingContext2D, signals: Signal[], paths: Path[]) => {
    signals.forEach((signal) => {
      const path = paths[signal.pathIndex];
      if (!path) return;
      
      const point = getPointOnCurve(path, signal.progress);
      
      // Trail effect - draw a few points behind
      const trailLength = 5;
      for (let i = trailLength; i >= 0; i--) {
        const trailProgress = Math.max(0, signal.progress - i * 0.02);
        const trailPoint = getPointOnCurve(path, trailProgress);
        const trailOpacity = signal.opacity * (1 - i / trailLength) * 0.6;
        const trailSize = signal.size * (1 - i / trailLength * 0.5);
        
        // Gold gradient based on progress (muted at start, warm at end)
        const warmth = signal.progress;
        const r = Math.floor(160 + warmth * 50);
        const g = Math.floor(130 + warmth * 30);
        const b = Math.floor(70 + warmth * 20);
        
        ctx.beginPath();
        ctx.arc(trailPoint.x, trailPoint.y, trailSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailOpacity})`;
        ctx.fill();
      }
      
      // Main signal point with glow
      const glowGradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, signal.size * 3
      );
      glowGradient.addColorStop(0, `rgba(210, 175, 120, ${signal.opacity * 0.8})`);
      glowGradient.addColorStop(0.5, `rgba(177, 145, 93, ${signal.opacity * 0.3})`);
      glowGradient.addColorStop(1, 'rgba(177, 145, 93, 0)');
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, signal.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Core bright point
      ctx.beginPath();
      ctx.arc(point.x, point.y, signal.size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230, 205, 160, ${signal.opacity})`;
      ctx.fill();
    });
  }, [getPointOnCurve]);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw layers
    drawBrainSilhouette(ctx, canvas.width, canvas.height);
    drawPaths(ctx, pathsRef.current);
    drawConvergenceGlow(ctx, canvas.width, canvas.height);
    
    // Update and draw signals
    signalsRef.current.forEach((signal) => {
      signal.progress += signal.speed * deltaTime;
      if (signal.progress >= 1) {
        signal.progress = 0;
        signal.speed = 0.0008 + Math.random() * 0.0006;
        signal.opacity = 0.4 + Math.random() * 0.4;
      }
    });
    
    drawSignals(ctx, signalsRef.current, pathsRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
  }, [drawBrainSilhouette, drawPaths, drawConvergenceGlow, drawSignals]);

  // Initialize and handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
      
      // Regenerate paths for new dimensions
      pathsRef.current = generatePaths(rect.width, rect.height);
      
      // Initialize signals if not already
      if (signalsRef.current.length === 0) {
        signalsRef.current = initSignals(pathsRef.current.length);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Start animation
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generatePaths, initSignals, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    />
  );
};

export default NeuralSignalCanvas;
