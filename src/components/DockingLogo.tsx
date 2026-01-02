import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent, LayoutGroup } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

interface DockingLogoProps {
  onDockComplete?: () => void;
  isReady?: boolean;
}

const DockingLogo = ({ onDockComplete, isReady = true }: DockingLogoProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [hasDocked, setHasDocked] = useState(false);

  // Track window size for accurate positioning
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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

  // ARC MOTION: Up first, then left
  // Phase 1 (0-30%): Move primarily UPWARD (clear the center stage)
  // Phase 2 (30-100%): Continue up + aggressive LEFT movement to navbar
  
  // Y-axis: Move up throughout the animation
  const y = useTransform(
    scrollYProgress, 
    [0, 0.08, 0.15], // Complete by 15% scroll
    [centerY, centerY * 0.4, navbarY] // Start center, move up aggressively first
  );
  
  // X-axis: Delayed movement, starts after initial upward motion
  const x = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.15], // Slight delay on X movement
    [centerX, centerX * 0.85, navbarX] // Stay center initially, then sweep left
  );
  
  // Scale: Gradual reduction throughout
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

  return (
    <LayoutGroup>
      <motion.div
        layoutId="creative-kult-logo"
        className="fixed z-50 pointer-events-none"
        style={{
          x,
          y,
          scale,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={!isReady ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 0.3 },
          layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        <Link to="/" className="pointer-events-auto block">
          <img
            src={logo}
            alt="Creative Kult"
            className="w-64 md:w-80 lg:w-[420px] h-auto"
          />
        </Link>
      </motion.div>
    </LayoutGroup>
  );
};

export default DockingLogo;