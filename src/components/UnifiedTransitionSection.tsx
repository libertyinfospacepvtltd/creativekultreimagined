import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// PCB / Circuit Background Component
const CircuitBackground = () => {
  return (
    <div className="absolute inset-0 bg-background overflow-hidden">
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for signal flow animation */}
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base grid pattern */}
        <g stroke="hsl(var(--primary))" strokeOpacity="0.08" strokeWidth="0.5" fill="none">
          {/* Horizontal lines */}
          {[...Array(20)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={54 * (i + 1)} x2="1920" y2={54 * (i + 1)} />
          ))}
          {/* Vertical lines */}
          {[...Array(30)].map((_, i) => (
            <line key={`v-${i}`} x1={64 * (i + 1)} y1="0" x2={64 * (i + 1)} y2="1080" />
          ))}
        </g>

        {/* Circuit traces - main paths */}
        <g stroke="hsl(var(--primary))" strokeOpacity="0.15" strokeWidth="1" fill="none">
          {/* Left side traces */}
          <path d="M 0 300 H 200 V 400 H 350 V 540 H 500" />
          <path d="M 0 500 H 150 V 600 H 300" />
          <path d="M 0 700 H 250 V 580 H 400" />
          
          {/* Right side traces */}
          <path d="M 1920 350 H 1700 V 450 H 1550 V 540 H 1400" />
          <path d="M 1920 550 H 1750 V 620 H 1600" />
          <path d="M 1920 750 H 1650 V 600 H 1500" />
          
          {/* Top traces */}
          <path d="M 600 0 V 150 H 750 V 300" />
          <path d="M 960 0 V 200 H 1100 V 350" />
          <path d="M 1300 0 V 180 H 1150 V 280" />
          
          {/* Bottom traces */}
          <path d="M 700 1080 V 900 H 850 V 750" />
          <path d="M 960 1080 V 880 H 1080 V 700" />
          <path d="M 1200 1080 V 920 H 1050 V 780" />
        </g>

        {/* Circuit nodes/dots */}
        <g fill="hsl(var(--primary))" fillOpacity="0.3">
          {/* Left nodes */}
          <circle cx="200" cy="300" r="3" />
          <circle cx="350" cy="400" r="3" />
          <circle cx="500" cy="540" r="4" />
          <circle cx="150" cy="500" r="3" />
          <circle cx="300" cy="600" r="3" />
          <circle cx="250" cy="700" r="3" />
          <circle cx="400" cy="580" r="3" />
          
          {/* Right nodes */}
          <circle cx="1700" cy="350" r="3" />
          <circle cx="1550" cy="450" r="3" />
          <circle cx="1400" cy="540" r="4" />
          <circle cx="1750" cy="550" r="3" />
          <circle cx="1600" cy="620" r="3" />
          <circle cx="1650" cy="750" r="3" />
          <circle cx="1500" cy="600" r="3" />
          
          {/* Top nodes */}
          <circle cx="600" cy="150" r="3" />
          <circle cx="750" cy="300" r="3" />
          <circle cx="960" cy="200" r="3" />
          <circle cx="1100" cy="350" r="3" />
          <circle cx="1300" cy="180" r="3" />
          <circle cx="1150" cy="280" r="3" />
          
          {/* Bottom nodes */}
          <circle cx="700" cy="900" r="3" />
          <circle cx="850" cy="750" r="3" />
          <circle cx="960" cy="880" r="3" />
          <circle cx="1080" cy="700" r="3" />
          <circle cx="1200" cy="920" r="3" />
          <circle cx="1050" cy="780" r="3" />
        </g>

        {/* Animated signal pulses */}
        <g filter="url(#glow)">
          {/* Signal on left path */}
          <circle r="4" fill="hsl(var(--primary))">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#signalPath1" />
            </animateMotion>
          </circle>
          
          {/* Signal on right path */}
          <circle r="4" fill="hsl(var(--primary))">
            <animateMotion dur="5s" repeatCount="indefinite" begin="1s">
              <mpath href="#signalPath2" />
            </animateMotion>
          </circle>
          
          {/* Signal on top path */}
          <circle r="3" fill="hsl(var(--primary))">
            <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#signalPath3" />
            </animateMotion>
          </circle>
          
          {/* Signal on bottom path */}
          <circle r="3" fill="hsl(var(--primary))">
            <animateMotion dur="4.5s" repeatCount="indefinite" begin="2s">
              <mpath href="#signalPath4" />
            </animateMotion>
          </circle>
        </g>

        {/* Hidden paths for signal animation */}
        <defs>
          <path id="signalPath1" d="M 0 300 H 200 V 400 H 350 V 540 H 500" />
          <path id="signalPath2" d="M 1920 350 H 1700 V 450 H 1550 V 540 H 1400" />
          <path id="signalPath3" d="M 600 0 V 150 H 750 V 300" />
          <path id="signalPath4" d="M 700 1080 V 900 H 850 V 750" />
        </defs>

        {/* Center area highlight - subtle radial */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <rect x="0" y="0" width="1920" height="1080" fill="url(#centerGlow)" />
      </svg>
    </div>
  );
};

const UnifiedTransitionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Phase breakdown (normalized 0-1):
  // 0.00 - 0.10: Entry - "Artificial Intelligence" slides up
  // 0.10 - 0.25: Subtractive fade - "rtificial " and "ntelligence" fade out (letters stay put)
  // 0.25 - 0.40: Letter shift - A and I slide together horizontally
  // 0.40 - 0.50: Reveal tagline
  // 0.50 - 0.58: Hold AI + tagline pinned (tighter)
  // 0.58 - 0.78: Handoff - AI moves up, Sculpting enters from bottom
  // 0.78 - 0.88: Hold sculpting in center
  // 0.88 - 1.00: Exit

  // PCB Background
  const circuitOpacity = useTransform(scrollYProgress, [0, 0.05, 0.90, 1.0], [0, 0.9, 0.9, 0]);

  // AI Text Entry - slide up from bottom
  const aiEntryY = useTransform(scrollYProgress, [0, 0.10], ["100vh", "0vh"]);
  const aiEntryOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // Subtractive fade - "rtificial " and "ntelligence" fade out (no movement)
  const extraLettersOpacity = useTransform(scrollYProgress, [0.12, 0.25], [1, 0]);
  
  // Letter shift - converge toward centered "AI" position
  // "A" starts left, moves right toward center (small movement)
  // "I" starts right (after invisible "rtificial "), moves left to close the gap
  // ORDER GUARANTEE: I always stays to the right of A (gap shrinks, never inverts)
  const letterAShift = useTransform(scrollYProgress, [0.25, 0.40], ["0em", "1.8em"]);
  const letterIShift = useTransform(scrollYProgress, [0.25, 0.40], ["0em", "-2.8em"]);
  
  // Hide faded text containers after letters merge (cleanup)
  const fadedTextDisplay = useTransform(scrollYProgress, (value) => value > 0.40 ? 0 : 1);

  // Reveal supporting line
  const taglineOpacity = useTransform(scrollYProgress, [0.40, 0.50], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.40, 0.50], [30, 0]);

  // HANDOFF: AI group moves upward as Sculpting enters
  const aiGroupY = useTransform(scrollYProgress, [0.58, 0.73], ["0vh", "-50vh"]);
  const aiGroupOpacity = useTransform(scrollYProgress, [0.58, 0.70], [1, 0]);

  // Sculpting scrolls up from bottom naturally (no fade, pure position)
  const sculptingY = useTransform(scrollYProgress, [0.58, 0.78], ["100vh", "0vh"]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section 
      ref={containerRef}
      className="relative h-[250vh] w-full bg-background z-20"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* PCB Circuit Background */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: prefersReducedMotion ? 0.9 : circuitOpacity }}
        >
          <CircuitBackground />
        </motion.div>

        {/* AI Text Container */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10 px-4"
          style={{ 
            y: prefersReducedMotion ? 0 : aiGroupY,
            opacity: prefersReducedMotion ? 0 : aiGroupOpacity,
          }}
        >
          {/* Entry wrapper */}
          <motion.div 
            className="flex flex-col items-center justify-center"
            style={{ 
              y: prefersReducedMotion ? 0 : aiEntryY,
              opacity: prefersReducedMotion ? 1 : aiEntryOpacity,
            }}
          >
            {/* "Artificial Intelligence" with sliding A and I */}
            <div className="relative font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl tracking-tight flex items-baseline justify-center">
              {/* "A" - slides right toward center */}
              <motion.span 
                className="text-primary inline-block"
                style={{ 
                  x: prefersReducedMotion ? "1.8em" : letterAShift,
                }}
              >
                A
              </motion.span>
              
              {/* "rtificial " - fades out, stays in place */}
              <motion.span 
                className="text-foreground inline-block"
                style={{ 
                  opacity: prefersReducedMotion ? 0 : extraLettersOpacity,
                  pointerEvents: 'none',
                }}
              >
                rtificial{' '}
              </motion.span>
              
              {/* "I" - slides left toward center */}
              <motion.span 
                className="text-primary inline-block"
                style={{ 
                  x: prefersReducedMotion ? "-2.8em" : letterIShift,
                }}
              >
                I
              </motion.span>
              
              {/* "ntelligence" - fades out, stays in place */}
              <motion.span 
                className="text-foreground inline-block"
                style={{ 
                  opacity: prefersReducedMotion ? 0 : extraLettersOpacity,
                  pointerEvents: 'none',
                }}
              >
                ntelligence
              </motion.span>
            </div>

            {/* Supporting Line */}
            <motion.p 
              className="mt-4 md:mt-6 font-serif text-xl sm:text-2xl md:text-3xl lg:text-5xl text-foreground/80 tracking-wide"
              style={{ 
                opacity: prefersReducedMotion ? 1 : taglineOpacity,
                y: prefersReducedMotion ? 0 : taglineY,
              }}
            >
              - first branding and marketing agency
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Sculpting Text Container - scrolls up naturally from bottom, no fade */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10 px-4"
          style={{ 
            y: prefersReducedMotion ? 0 : sculptingY,
          }}
        >
          <div className="text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight">
              Sculpting Brand
            </h1>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-primary italic mt-1 sm:mt-2">
              Legacies.
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedTransitionSection;
