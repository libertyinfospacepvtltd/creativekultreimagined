import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Spline from '@splinetool/react-spline';

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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // === SUBTITLE-DRIVEN COLLAPSE ===
  // The AI collapse is triggered by the subtitle's visibility in the viewport
  const isSubtitleInView = useInView(subtitleRef, { 
    amount: 0.5, // Trigger when 50% of subtitle is visible
    margin: "-10% 0px -10% 0px" // Add some margin for smoother triggering
  });

  // Phase breakdown (normalized 0-1):
  // 0.00 - 0.08: Entry - "Artificial Intelligence" slides up into view
  // 0.35 - 0.42: Reveal tagline (subtitle visibility triggers collapse)
  // 0.42 - 0.50: Hold AI + tagline pinned
  // 0.50 - 0.62: Handoff - AI moves up, Sculpting enters from bottom
  // 0.62 - 0.82: EXTENDED HOLD - Sculpting stays centered
  // 0.82 - 1.00: Exit

  // PCB Background
  const circuitOpacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1.0], [0, 0.9, 0.9, 0]);

  // AI Text Entry - slide up from bottom
  const aiEntryY = useTransform(scrollYProgress, [0, 0.08], ["100vh", "0vh"]);
  const aiEntryOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  
  // Subtle scale increase as AI locks in - gives a "settling" emphasis
  const aiScale = useTransform(scrollYProgress, [0.22, 0.35], [1, 1.15]);

  // Reveal supporting line
  const taglineOpacity = useTransform(scrollYProgress, [0.35, 0.42], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.35, 0.42], [20, 0]);

  // HANDOFF: AI group moves upward as Sculpting enters
  const aiGroupY = useTransform(scrollYProgress, [0.50, 0.60], ["0vh", "-50vh"]);
  const aiGroupOpacity = useTransform(scrollYProgress, [0.50, 0.58], [1, 0]);

  // Sculpting scrolls up from bottom naturally (no fade, pure position)
  const sculptingY = useTransform(scrollYProgress, [0.50, 0.62], ["100vh", "0vh"]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Collapse state driven by subtitle visibility
  const isCollapsed = isSubtitleInView;

  return (
    <section 
      ref={containerRef}
      className="relative h-[260vh] w-full bg-background z-20 overflow-x-clip"
    >
      {/* Sticky Container - overflow-visible on inner elements for text */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        
        {/* PCB Circuit Background */}
        {/* Spline Particles Background - for AI-first branding section */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none bg-black"
          style={{ opacity: prefersReducedMotion ? 0 : circuitOpacity }}
        >
          <Spline 
            scene="https://prod.spline.design/particles-SJt3xTTmBjP4Xa2UYp1HbpXV/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        {/* PCB Circuit Background - kept as overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ opacity: prefersReducedMotion ? 0.9 : circuitOpacity }}
        >
          <CircuitBackground />
        </motion.div>

        {/* AI Text Container - max-w-[95vw] and px-8 to prevent edge clipping */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10 px-8"
          style={{ 
            y: prefersReducedMotion ? 0 : aiGroupY,
            opacity: prefersReducedMotion ? 0 : aiGroupOpacity,
          }}
        >
          {/* Entry wrapper - centers everything */}
          <motion.div 
            className="flex flex-col items-center justify-center w-full max-w-[95vw]"
            style={{ 
              y: prefersReducedMotion ? 0 : aiEntryY,
              opacity: prefersReducedMotion ? 1 : aiEntryOpacity,
            }}
          >
            {/* 
              SINGLE TEXT LAYER: "Artificial Intelligence"
              - Tight layout with no gap - max-width collapse creates the merge
              - Collapse is synced to subtitle visibility via useInView
            */}
            <div 
              className="font-serif tracking-tight flex flex-row items-center justify-center whitespace-nowrap w-full max-w-[95vw] text-center text-[clamp(1.5rem,4.5vw,6rem)] sm:text-4xl md:text-6xl lg:text-8xl overflow-visible"
            >
              <motion.div
                className="flex flex-row items-center justify-center"
                style={{
                  scale: prefersReducedMotion ? 1.15 : aiScale,
                }}
              >
                {/* "A" - primary letter, stays in document flow position */}
                <span className="text-primary inline-block">
                  A
                </span>
                
                {/* "rtificial " - max-width collapses to 0 when subtitle is visible */}
                <span 
                  className="text-foreground inline-block overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-1000 ease-in-out"
                  style={{ 
                    opacity: prefersReducedMotion ? 0 : (isCollapsed ? 0 : 1),
                    maxWidth: prefersReducedMotion ? '0px' : (isCollapsed ? '0px' : '500px'),
                  }}
                >
                  rtificial
                </span>
                
                {/* Small gap between A and I when collapsed */}
                <span className="inline-block w-1 md:w-2" />
                
                {/* "I" - primary letter, stays in document flow position */}
                <span className="text-primary inline-block">
                  I
                </span>
                
                {/* "ntelligence" - max-width collapses to 0 when subtitle is visible */}
                <span 
                  className="text-foreground inline-block overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-1000 ease-in-out"
                  style={{ 
                    opacity: prefersReducedMotion ? 0 : (isCollapsed ? 0 : 1),
                    maxWidth: prefersReducedMotion ? '0px' : (isCollapsed ? '0px' : '500px'),
                  }}
                >
                  ntelligence
                </span>
              </motion.div>
            </div>

            {/* Supporting Line - Premium brand typography - THIS DRIVES THE COLLAPSE */}
            <motion.p 
              ref={subtitleRef}
              className="mt-4 md:mt-6 font-serif italic text-lg sm:text-xl md:text-2xl text-foreground/70 tracking-wide"
              style={{ 
                opacity: prefersReducedMotion ? 1 : taglineOpacity,
                y: prefersReducedMotion ? 0 : taglineY,
              }}
            >
              — first branding and marketing agency
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Sculpting Text Container - scrolls up naturally from bottom */}
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
