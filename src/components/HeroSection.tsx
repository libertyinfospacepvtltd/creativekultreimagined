import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";
import heroImage from "@/assets/victoria-memorial-hero.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.8]);
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.4]);
  const logoY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-120%"]);
  const logoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], ["30px", "0px"]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
      className="relative h-[200vh] w-full bg-background"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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

        {/* Center Logo with Scroll Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative text-center"
            style={{
              scale: logoScale,
              y: logoY,
              opacity: logoOpacity,
              x: mousePosition.x * 10,
            }}
          >
            <img
              src={logo}
              alt="Creative Kult"
              className="w-64 md:w-80 lg:w-[420px] h-auto mx-auto"
            />
            <div className="mt-8 space-y-3">
              <p className="text-foreground/90 font-serif text-xl md:text-2xl lg:text-3xl italic tracking-wide">
                Where Brands Break the Mold
              </p>
              <p className="text-muted-foreground font-sans text-sm md:text-base tracking-widest uppercase">
                Strategy • Rebellion • Results
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reveal Text - "Cultivating Digital Legacies" */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          <div className="text-center px-4">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight">
              Cultivating Digital
            </h1>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-primary italic mt-2">
              Legacies.
            </h1>
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div 
          className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-8"
          style={{ opacity: ctaOpacity }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/work"
              className="px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
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
