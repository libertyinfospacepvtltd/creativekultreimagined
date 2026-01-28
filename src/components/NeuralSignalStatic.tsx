import { useMemo } from "react";

interface NeuralSignalStaticProps {
  className?: string;
}

const NeuralSignalStatic = ({ className = "" }: NeuralSignalStaticProps) => {
  // Generate static paths for SVG
  const paths = useMemo(() => {
    const convergence = { x: 52, y: 48 };
    
    const origins = [
      { x: 35, y: 15 },
      { x: 50, y: 10 },
      { x: 65, y: 12 },
      { x: 75, y: 18 },
      { x: 82, y: 32 },
      { x: 85, y: 48 },
      { x: 80, y: 62 },
      { x: 68, y: 78 },
      { x: 52, y: 82 },
      { x: 38, y: 75 },
      { x: 28, y: 58 },
      { x: 25, y: 40 },
      { x: 30, y: 25 },
      { x: 60, y: 25 },
      { x: 70, y: 40 },
      { x: 45, y: 65 },
    ];

    return origins.map((origin, i) => {
      const midX = (origin.x + convergence.x) / 2;
      const midY = (origin.y + convergence.y) / 2;
      const offset = ((i % 3) - 1) * 8;
      
      return {
        d: `M ${origin.x} ${origin.y} Q ${midX + offset} ${midY + offset} ${convergence.x} ${convergence.y}`,
        opacity: 0.15 + (i % 3) * 0.05,
      };
    });
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* Radial gradient for convergence glow */}
          <radialGradient id="convergenceGlow" cx="52%" cy="48%" r="15%">
            <stop offset="0%" stopColor="rgba(210, 175, 120, 0.4)" />
            <stop offset="50%" stopColor="rgba(177, 145, 93, 0.2)" />
            <stop offset="100%" stopColor="rgba(177, 145, 93, 0)" />
          </radialGradient>
          
          {/* Gradient for brain silhouette */}
          <radialGradient id="brainGradient" cx="52%" cy="48%" r="50%">
            <stop offset="0%" stopColor="rgba(40, 35, 28, 0.3)" />
            <stop offset="60%" stopColor="rgba(30, 26, 20, 0.5)" />
            <stop offset="100%" stopColor="rgba(20, 18, 14, 0.7)" />
          </radialGradient>
          
          {/* Gold gradient for paths */}
          <linearGradient id="pathGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(140, 115, 70, 0.3)" />
            <stop offset="100%" stopColor="rgba(210, 175, 120, 0.5)" />
          </linearGradient>
        </defs>
        
        {/* Brain silhouette */}
        <path
          d="M 25 50 
             Q 22 55, 20 62 Q 28 78, 40 85 Q 52 88, 65 85 Q 75 78, 82 65 
             Q 88 52, 88 38 Q 88 25, 75 12 Q 60 8, 48 10 
             Q 35 12, 28 20 Q 23 32, 25 50 Z"
          fill="url(#brainGradient)"
        />
        
        {/* Neural paths */}
        {paths.map((path, i) => (
          <path
            key={i}
            d={path.d}
            fill="none"
            stroke="url(#pathGold)"
            strokeWidth="0.3"
            opacity={path.opacity}
          />
        ))}
        
        {/* Static signal points along paths */}
        {paths.map((_, i) => {
          const origin = [
            { x: 35, y: 15 }, { x: 50, y: 10 }, { x: 65, y: 12 },
            { x: 75, y: 18 }, { x: 82, y: 32 }, { x: 85, y: 48 },
            { x: 80, y: 62 }, { x: 68, y: 78 }, { x: 52, y: 82 },
            { x: 38, y: 75 }, { x: 28, y: 58 }, { x: 25, y: 40 },
            { x: 30, y: 25 }, { x: 60, y: 25 }, { x: 70, y: 40 },
            { x: 45, y: 65 },
          ][i];
          const convergence = { x: 52, y: 48 };
          const progress = 0.3 + (i % 5) * 0.15;
          const x = origin.x + (convergence.x - origin.x) * progress;
          const y = origin.y + (convergence.y - origin.y) * progress;
          
          return (
            <circle
              key={`signal-${i}`}
              cx={x}
              cy={y}
              r="0.8"
              fill="rgba(210, 175, 120, 0.6)"
            />
          );
        })}
        
        {/* Convergence glow */}
        <circle cx="52" cy="48" r="10" fill="url(#convergenceGlow)" />
        <circle cx="52" cy="48" r="3" fill="rgba(230, 205, 160, 0.4)" />
      </svg>
    </div>
  );
};

export default NeuralSignalStatic;
