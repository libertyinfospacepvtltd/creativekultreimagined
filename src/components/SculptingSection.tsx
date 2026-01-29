import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SculptingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Text rises from below and settles in center
  const textY = useTransform(scrollYProgress, [0, 0.3], ["80px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section 
      ref={containerRef}
      className="relative h-[100vh] w-full bg-background z-20"
    >
      {/* Sticky Container for the text */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          className="text-center px-4"
          style={{ 
            y: prefersReducedMotion ? 0 : textY,
            opacity: prefersReducedMotion ? 1 : textOpacity,
            scale: prefersReducedMotion ? 1 : textScale,
          }}
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight">
            Sculpting Brand
          </h1>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-primary italic mt-1 sm:mt-2">
            Legacies.
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default SculptingSection;
