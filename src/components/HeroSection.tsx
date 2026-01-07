import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/victoria-memorial-hero.jpg";

// Preload hero image immediately
const preloadImage = new Image();
preloadImage.src = heroImage;

interface HeroSectionProps {
  preloaderComplete?: boolean;
}

const HeroSection = ({ preloaderComplete = true }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.8]);
  
  // Tagline opacity - fades out as scroll begins
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // Reveal text - only appears AFTER logo has docked (scroll > 0.15)
  const textOpacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.22, 0.35], ["50px", "0px"]);
  const textScale = useTransform(scrollYProgress, [0.22, 0.35], [0.9, 1]);
  
  // CTAs and radar
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position relative to center (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] w-full bg-background z-10"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden z-10">
        {/* Background Image with Parallax + Scroll Zoom */}
        <motion.div 
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{
            scale: backgroundScale,
            x: isMobile ? 0 : mousePosition.x * -20,
            y: isMobile ? 0 : mousePosition.y * -20,
          }}
        >
          <img
            src={heroImage}
            alt="Victoria Memorial Kolkata"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-background/80" />
        </motion.div>

        {/* Rotating Radar Circles - smaller on mobile */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: radarOpacity }}
        >
          <div className="animate-radar-rotate">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
                style={{
                  width: `${i * (isMobile ? 80 : 150)}px`,
                  height: `${i * (isMobile ? 80 : 150)}px`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Pulsing Radar Circles - smaller on mobile */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: radarOpacity }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: isMobile ? "60px" : "100px",
                height: isMobile ? "60px" : "100px",
                animation: `radar-pulse 4s linear infinite`,
                animationDelay: `${i * 1.3}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Center Tagline (below the docking logo) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
          style={{ opacity: taglineOpacity }}
        >
          <div className="text-center mt-16 sm:mt-40 md:mt-48 lg:mt-56">
            <p className="text-foreground/90 font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl italic tracking-wide">
              Where Brands Break the Mold
            </p>
            <p className="text-muted-foreground font-sans text-xs sm:text-sm md:text-base tracking-widest uppercase mt-2 sm:mt-3">
              Strategy • Rebellion • Results
            </p>
          </div>
        </motion.div>

        {/* Reveal Text - "Cultivating Digital Legacies" - appears AFTER logo docks */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          style={{
            opacity: textOpacity,
          }}
        >
          {/* Solid background layer that covers hero content */}
          <motion.div 
            className="absolute inset-0 bg-background"
            style={{ opacity: textOpacity }}
          />
          <motion.div 
            className="relative text-center px-4"
            style={{ 
              y: textY,
              scale: textScale,
            }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight">
              Cultivating Digital
            </h1>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-primary italic mt-1 sm:mt-2">
              Legacies.
            </h1>
          </motion.div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div 
          className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-0 right-0 flex flex-col items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto px-4"
          style={{ opacity: ctaOpacity }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/work"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 rounded-full border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              Join the Kult
            </Link>
          </div>
          
          {/* Scroll Indicator - hide on very small screens */}
          <div className="hidden sm:flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs font-sans uppercase tracking-widest">Scroll</span>
            <div className="w-px h-6 md:h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;