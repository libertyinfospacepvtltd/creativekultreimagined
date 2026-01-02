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

  // Handle preloader animation phases
  useEffect(() => {
    if (!isPreloading || revealPhase === "complete") return;

    const timers = [
      setTimeout(() => setRevealPhase("hold"), 2000),
      setTimeout(() => {
        setRevealPhase("complete");
        onRevealComplete?.();
      }, 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isPreloading, revealPhase, onRevealComplete]);

  const { scrollYProgress } = useScroll();

  // Calculate positions
  const isMobile = windowSize.width < 768;
  
  // Initial logo size (hero state)
  const heroLogoWidth = isMobile ? 256 : 420; // w-64 = 256px, lg:w-[420px]
  
  // Final logo size (navbar state) - h-10 = 40px, h-12 = 48px
  const navLogoHeight = isMobile ? 40 : 48;
  // Approximate width based on aspect ratio (logo is roughly 3.5:1)
  const navLogoWidth = navLogoHeight * 3.5;
  
  // Scale factor
  const scaleFactor = navLogoWidth / heroLogoWidth;

  // Center position (hero state)
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  // Navbar position (docked state) - matches container-luxury padding
  const navPadding = isMobile ? 16 : windowSize.width >= 1024 ? 32 : 24;
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
            duration: isPreloading && revealPhase === "reveal" ? 2 : 0,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.15, 1], // Slow start on "K", then smooth reveal
          }}
        >
          <img
            src={logo}
            alt="Creative Kult"
            className="w-64 md:w-80 lg:w-[420px] h-auto"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DockingLogo;
