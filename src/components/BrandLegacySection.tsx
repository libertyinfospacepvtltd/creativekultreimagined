import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import brandLegacyImage from "@/assets/brand-legacy-head.png";

const BrandLegacySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    
    // Check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Phase A: Image fade in and scale settle (0 - 0.25)
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.7, 0.85],
    [0, 1, 1, 0.6]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1.08, 1]
  );

  // Phase B: Text merge effect (0.2 - 0.5)
  const textOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.7, 0.85],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.5],
    ["30px", "0px", "-10px"]
  );
  const textLetterSpacing = useTransform(
    scrollYProgress,
    [0.2, 0.4],
    ["0.1em", "0.02em"]
  );
  
  // Blend mode transition for merge effect
  const blendProgress = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.65, 0.75],
    [0, 1, 1, 0]
  );

  // Phase C: Exit (0.7 - 1.0)
  const containerY = useTransform(
    scrollYProgress,
    [0.75, 1],
    ["0%", "-10%"]
  );

  // For reduced motion, use simple fade
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full bg-background">
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="relative w-full max-w-6xl">
            <img
              src={brandLegacyImage}
              alt="Brand legacy visual"
              className="w-full h-auto object-contain opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-primary text-center tracking-wide">
                <span className="block">Sculpting Brand</span>
                <span className="block italic mt-2">Legacies.</span>
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-background"
      style={{ height: "200vh" }}
    >
      {/* Sticky container - pinned during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ y: containerY }}
        >
          {/* Image layer */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: imageOpacity,
              scale: imageScale,
            }}
          >
            <img
              src={brandLegacyImage}
              alt="Brand legacy visual - golden wire neural network head"
              className="w-full h-full object-contain object-center max-w-5xl mx-auto px-4 md:px-8"
              style={{
                filter: "contrast(1.1) brightness(0.95)",
              }}
            />
          </motion.div>

          {/* Dark overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />

          {/* Text layer with blend effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            {/* Text with blend mode for merge effect */}
            <motion.h2 
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-center px-4"
              style={{
                letterSpacing: textLetterSpacing,
              }}
            >
              {/* Normal text layer (base) */}
              <motion.span 
                className="block text-foreground"
                style={{
                  opacity: useTransform(blendProgress, [0, 0.5, 1], [1, 0.3, 1]),
                }}
              >
                Sculpting Brand
              </motion.span>
              <motion.span 
                className="block italic mt-1 sm:mt-2 text-primary"
                style={{
                  opacity: useTransform(blendProgress, [0, 0.5, 1], [1, 0.4, 1]),
                }}
              >
                Legacies.
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Blend mode overlay text - creates the "etched into gold" effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            style={{
              opacity: blendProgress,
            }}
          >
            <motion.h2 
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-center px-4"
              style={{
                letterSpacing: textLetterSpacing,
                mixBlendMode: isMobile ? "normal" : "overlay",
              }}
            >
              <span className="block text-white/90">
                Sculpting Brand
              </span>
              <span className="block italic mt-1 sm:mt-2 text-primary/90">
                Legacies.
              </span>
            </motion.h2>
          </motion.div>

          {/* Subtle vignette for cinematic feel */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandLegacySection;
