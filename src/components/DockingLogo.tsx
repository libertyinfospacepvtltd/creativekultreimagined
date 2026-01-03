import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

interface DockingLogoProps {
  onDockComplete?: () => void;
  isPreloading?: boolean;
  onRevealComplete?: () => void;
}

const DockingLogo = ({ onDockComplete, isPreloading = false, onRevealComplete }: DockingLogoProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [hasDocked, setHasDocked] = useState(false);
  const [revealPhase, setRevealPhase] = useState<"reveal" | "hold" | "complete">(
    isPreloading ? "reveal" : "complete"
  );

  // Track window size for accurate positioning
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Handle preloader animation phases - fast and fluid
  useEffect(() => {
    if (!isPreloading || revealPhase === "complete") return;

    const timers = [
      setTimeout(() => setRevealPhase("hold"), 1200),
      setTimeout(() => {
        setRevealPhase("complete");
        onRevealComplete?.();
      }, 1400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isPreloading, revealPhase, onRevealComplete]);

  const { scrollYProgress } = useScroll();

  // Calculate positions
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  
  // Initial logo size (hero state) - matches img class "w-64 md:w-80 lg:w-[420px]"
  const heroLogoWidth = isMobile ? 256 : isTablet ? 320 : 420;
  
  // Final logo size (navbar state) - MUST match Navbar.tsx exactly: "h-8 sm:h-10 md:h-12"
  // h-8 = 32px (mobile), h-10 = 40px (sm/tablet), h-12 = 48px (md+/desktop)
  const navLogoHeight = isMobile ? 32 : isTablet ? 40 : 48;
  
  // Calculate width from height using actual logo aspect ratio (approx 4.5:1 based on common logo proportions)
  const logoAspectRatio = 4.5;
  const navLogoWidth = navLogoHeight * logoAspectRatio;
  
  // Scale factor to shrink hero logo to exact navbar logo size
  const scaleFactor = navLogoWidth / heroLogoWidth;

  // Center position (hero state)
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  // Navbar position (docked state) - matches container-luxury padding exactly
  // container-luxury uses: px-4 sm:px-6 lg:px-8 (16px, 24px, 32px)
  const navPadding = isMobile ? 16 : windowSize.width >= 1024 ? 32 : 24;
  // Logo should be anchored at left edge, so center = padding + half width
  const navbarX = navPadding + (navLogoWidth / 2);
  const navbarY = 32; // Center of 64px navbar

  // Scroll-linked transforms - animation completes at ~15% scroll progress
  const x = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [centerX, navbarX]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [centerY, navbarY]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [1, scaleFactor]
  );

  // Track when docking completes
  useMotionValueEvent(scrollYProgress, "change", useCallback((latest: number) => {
    if (latest >= 0.15 && !hasDocked) {
      setHasDocked(true);
      onDockComplete?.();
    } else if (latest < 0.15 && hasDocked) {
      setHasDocked(false);
    }
  }, [hasDocked, onDockComplete]));

  // Only render on home page
  if (!isHomePage || windowSize.width === 0) {
    return null;
  }

  // During preloading, disable scroll-linked transforms
  const isAnimatingPreloader = revealPhase !== "complete";

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        x: isAnimatingPreloader ? centerX : x,
        y: isAnimatingPreloader ? centerY : y,
        scale: isAnimatingPreloader ? 1 : scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <Link to="/" className="pointer-events-auto block">
        {/* Logo with mask reveal animation during preload */}
        <motion.div
          className="relative overflow-hidden"
          initial={isPreloading ? { clipPath: "inset(0 100% 0 0)" } : { clipPath: "inset(0 0% 0 0)" }}
          animate={{ 
            clipPath: revealPhase === "reveal" 
              ? ["inset(0 100% 0 0)", "inset(0 85% 0 0)", "inset(0 0% 0 0)"]
              : "inset(0 0% 0 0)"
          }}
          transition={{
            duration: isPreloading && revealPhase === "reveal" ? 1.2 : 0,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.15, 1],
          }}
        >
          <img
            src={logo}
            alt="Creative Kult"
            className="w-64 md:w-80 lg:w-[420px] h-auto will-change-transform"
            style={{ transformOrigin: 'center center' }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DockingLogo;
