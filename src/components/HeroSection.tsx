import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";
import heroImage from "@/assets/victoria-memorial-hero.jpg";

interface HeroSectionProps {
  preloaderComplete?: boolean;
}

const HeroSection = ({ preloaderComplete = true }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.8]);
  
  // Logo docking animation - from center to top-left navbar position
  // Scale: starts at 1, shrinks to navbar size (roughly 0.15 of original)
  const logoScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.15]);
  
  // Position: move from center (0,0) to top-left corner
  // We need to calculate the exact positions
  const logoX = useTransform(scrollYProgress, [0, 0.25], ["0%", "-42vw"]);
  const logoY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-42vh"]);
  
  // Logo opacity - fade out after docking to let navbar logo take over
  const logoOpacity = useTransform(scrollYProgress, [0.2, 0.28], [1, 0]);
  
  // Tagline opacity - fades out as scroll begins
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // Reveal text
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5], ["30px", "0px"]);
  
  // CTAs and radar
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
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
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] w-full bg-background z-10"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        {/* Background Image with Parallax + Scroll Zoom */}
        <motion.div 
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{
            scale: backgroundScale,
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
        >
          <img
            src={heroImage}
            alt="Victoria Memorial Kolkata"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-background/80" />
        </motion.div>

        {/* Rotating Radar Circles */}
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
                  width: `${i * 150}px`,
                  height: `${i * 150}px`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Pulsing Radar Circles */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: radarOpacity }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: "100px",
                height: "100px",
                animation: `radar-pulse 4s linear infinite`,
                animationDelay: `${i * 1.3}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Center Logo with Docking Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative text-center"
            style={{
              scale: logoScale,
              x: logoX,
              y: logoY,
              opacity: logoOpacity,
            }}
            initial={{ opacity: preloaderComplete ? 1 : 0 }}
          >
            <img
              src={logo}
              alt="Creative Kult"
              className="w-64 md:w-80 lg:w-[420px] h-auto mx-auto"
            />
            {/* Tagline - fades out quickly */}
            <motion.div 
              className="mt-8 space-y-3"
              style={{ opacity: taglineOpacity }}
            >
              <p className="text-foreground/90 font-serif text-xl md:text-2xl lg:text-3xl italic tracking-wide">
                Where Brands Break the Mold
              </p>
              <p className="text-muted-foreground font-sans text-sm md:text-base tracking-widest uppercase">
                Strategy • Rebellion • Results
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Reveal Text - "Cultivating Digital Legacies" - with solid background */}
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
            style={{ y: textY }}
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight">
              Cultivating Digital
            </h1>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-primary italic mt-2">
              Legacies.
            </h1>
          </motion.div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div 
          className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-8 pointer-events-auto"
          style={{ opacity: ctaOpacity }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/work"
              className="px-8 py-3 rounded-full border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
            >
              Join the Kult
            </Link>
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs font-sans uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
