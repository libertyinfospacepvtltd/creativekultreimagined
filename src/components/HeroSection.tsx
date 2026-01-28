import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-background.png";
import heroImageMobile from "@/assets/hero-background-mobile.png";
import brandLegacyHead from "@/assets/brand-legacy-head.png";

// Preload hero images immediately
const preloadImage = new Image();
preloadImage.src = heroImage;
const preloadImageMobile = new Image();
preloadImageMobile.src = heroImageMobile;
const preloadBrandHead = new Image();
preloadBrandHead.src = brandLegacyHead;

interface HeroSectionProps {
  preloaderComplete?: boolean;
}

const HeroSection = ({ preloaderComplete = true }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkMobile();
    checkReducedMotion();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-linked animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Phase A (0-25%): Normal hero
  // Phase B (25-70%): Image fade in + text merge
  // Phase C (70-100%): Exit scroll

  // Hero background transforms
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.8]);
  const heroBackgroundOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.3]);
  
  // Tagline opacity - fades out early
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // CTAs and radar fade out
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Brand Legacy Image - Phase B (25-70%)
  const brandImageOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.75, 0.9], [0, 1, 1, 0]);
  const brandImageScale = useTransform(scrollYProgress, [0.2, 0.5], [1.08, 1.0]);
  
  // Text merge effect - Phase B
  const mergeTextOpacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const textMaskProgress = useTransform(scrollYProgress, [0.25, 0.55], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const textTracking = useTransform(scrollYProgress, [0.3, 0.5], ["0.1em", "0.02em"]);
  const textY = useTransform(scrollYProgress, [0.22, 0.35], [40, 0]);
  
  // Clean text opacity - Phase B end
  const cleanTextOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  
  // Exit phase - Phase C (70-100%)
  const exitY = useTransform(scrollYProgress, [0.7, 1], [0, -100]);

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
      className="relative h-[220vh] w-full bg-[hsl(220,15%,8%)] z-10"
    >
      {/* Sticky Container */}
      <motion.div 
        className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden z-10"
        style={{ y: prefersReducedMotion ? 0 : exitY }}
      >
        {/* Original Hero Background with Parallax + Scroll Zoom */}
        <motion.div 
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{
            scale: prefersReducedMotion ? 1.1 : backgroundScale,
            x: isMobile ? 0 : mousePosition.x * -20,
            y: isMobile ? 0 : mousePosition.y * -20,
            opacity: prefersReducedMotion ? 1 : heroBackgroundOpacity,
          }}
        >
          {/* Mobile Image */}
          <img
            src={heroImageMobile}
            alt="Hero background"
            className="block md:hidden w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Desktop Image */}
          <img
            src={heroImage}
            alt="Hero background"
            className="hidden md:block w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-background/80" style={{ background: 'hsla(220, 15%, 8%, 0.8)' }} />
        </motion.div>

        {/* Brand Legacy Head Image - Fades in during Phase B */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            opacity: prefersReducedMotion ? 0.8 : brandImageOpacity,
            scale: prefersReducedMotion ? 1 : brandImageScale,
          }}
        >
          <img
            src={brandLegacyHead}
            alt="Brand legacy visualization"
            className="w-full h-full object-cover object-center md:object-[center_30%]"
            loading="eager"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,15%,8%)] via-transparent to-[hsl(220,15%,8%)/50]" />
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
              Where Insight Meets Impact.
            </p>
            <p className="text-muted-foreground font-sans text-xs sm:text-sm md:text-base tracking-widest uppercase mt-2 sm:mt-3">
              Strategy • Clarity • Results
            </p>
          </div>
        </motion.div>

        {/* Sculpting Brand Legacies - Merge Effect Text */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          style={{ opacity: mergeTextOpacity }}
        >
          {/* Solid background layer that covers hero content */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'hsla(220, 15%, 8%, 0.6)',
              opacity: mergeTextOpacity 
            }}
          />
          
          {/* Text Container - Positioned over the image focal point */}
          <motion.div 
            className="relative text-center md:text-left md:ml-[5%] lg:ml-[10%] px-4"
            style={{ y: prefersReducedMotion ? 0 : textY }}
          >
            {/* Layer 1: Base text with subtle opacity */}
            <div className="relative">
              <motion.h1 
                className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-foreground/30 tracking-tight"
                style={{ letterSpacing: isMobile ? '0.02em' : textTracking }}
              >
                Sculpting
              </motion.h1>
              <motion.h1 
                className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-primary/30 italic mt-1 sm:mt-2 md:ml-8 lg:ml-16"
                style={{ letterSpacing: isMobile ? '0.02em' : textTracking }}
              >
                Brand Legacies.
              </motion.h1>
            </div>
            
            {/* Layer 2: Image-filled text with clip mask (desktop only) */}
            {!isMobile && (
              <motion.div 
                className="absolute inset-0"
                style={{ clipPath: textMaskProgress }}
              >
                <motion.h1 
                  className="font-serif text-6xl lg:text-8xl tracking-tight"
                  style={{
                    background: `url(${brandLegacyHead}) center/cover`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStroke: '1px hsl(37 35% 53% / 0.3)',
                    letterSpacing: textTracking,
                  }}
                >
                  Sculpting
                </motion.h1>
                <motion.h1 
                  className="font-serif text-6xl lg:text-8xl italic mt-2 ml-8 lg:ml-16"
                  style={{
                    background: `url(${brandLegacyHead}) center/cover`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStroke: '1px hsl(37 35% 53% / 0.5)',
                    letterSpacing: textTracking,
                  }}
                >
                  Brand Legacies.
                </motion.h1>
              </motion.div>
            )}
            
            {/* Layer 3: Clean readable text overlay (appears after merge) */}
            <motion.div 
              className="absolute inset-0"
              style={{ opacity: cleanTextOpacity }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-foreground tracking-tight">
                Sculpting
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-primary italic mt-1 sm:mt-2 md:ml-8 lg:ml-16">
                Brand Legacies.
              </h1>
            </motion.div>
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
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              Explore Our Work
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              Join the Kult
            </Link>
          </div>
          
          {/* Scroll Indicator */}
          <div className="hidden sm:flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs font-sans uppercase tracking-widest">Scroll</span>
            <div className="w-px h-6 md:h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;