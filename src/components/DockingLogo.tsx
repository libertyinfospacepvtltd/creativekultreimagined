import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import logoDark from "@/assets/creative-kult-logo.png";

interface DockingLogoProps {
  onDockComplete?: () => void;
  isPreloading?: boolean;
  onRevealComplete?: () => void;
}

// ID for the navbar logo anchor element
export const NAVBAR_LOGO_ID = "navbar-logo-anchor";

const DockingLogo = ({ onDockComplete, isPreloading = false, onRevealComplete }: DockingLogoProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const logo = logoDark;
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [hasDocked, setHasDocked] = useState(false);
  const [handshakeComplete, setHandshakeComplete] = useState(false);
  const [revealPhase, setRevealPhase] = useState<"reveal" | "hold" | "complete">(
    isPreloading ? "reveal" : "complete"
  );
  
  // Store the navbar logo's exact measurements for pixel-perfect positioning
  const [navbarLogoRect, setNavbarLogoRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  
  const measurementRef = useRef<number>(0);

  // Track window size for accurate positioning
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Precisely measure the navbar logo's position with RAF for accuracy
  const measureNavbarLogo = useCallback(() => {
    cancelAnimationFrame(measurementRef.current);
    measurementRef.current = requestAnimationFrame(() => {
      const navbarLogo = document.getElementById(NAVBAR_LOGO_ID);
      if (navbarLogo) {
        const rect = navbarLogo.getBoundingClientRect();
        // Store the CENTER position and dimensions
        setNavbarLogoRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        });
      }
    });
  }, []);

  // Get the navbar logo's bounding rect using getBoundingClientRect
  useEffect(() => {
    // Initial measurement with delay to ensure navbar is rendered
    const timeout = setTimeout(measureNavbarLogo, 150);
    
    // Re-measure on resize
    window.addEventListener("resize", measureNavbarLogo);
    
    // Also measure on scroll start to catch any layout shifts
    let scrollTimeout: number;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(measureNavbarLogo, 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("resize", measureNavbarLogo);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(measurementRef.current);
    };
  }, [measureNavbarLogo, windowSize.width]);

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
  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 768;
  
  // Initial logo size (hero state) - matches img class "w-64 md:w-80 lg:w-[420px]"
  const heroLogoWidth = windowSize.width < 768 ? 256 : windowSize.width < 1024 ? 320 : 420;
  
  // Final logo dimensions from navbar anchor (pixel-perfect from measurement)
  const navLogoWidth = navbarLogoRect?.width ?? (isMobile ? 144 : isTablet ? 180 : 216);
  const navLogoHeight = navbarLogoRect?.height ?? (isMobile ? 32 : isTablet ? 40 : 48);
  
  // Scale factor: ratio of navbar logo width to hero logo width
  const scaleFactor = navLogoWidth / heroLogoWidth;

  // Center position (hero state) - slightly above center
  const centerX = windowSize.width / 2;
  const centerY = (windowSize.height / 2) - (isMobile ? 40 : 60);

  // Navbar position (docked state) - exact center of navbar logo
  const navbarX = navbarLogoRect?.x ?? (isMobile ? 16 : windowSize.width >= 1024 ? 32 : 24) + (navLogoWidth / 2);
  const navbarY = navbarLogoRect?.y ?? 32;

  // Scroll-linked transforms with standard ease-out (no spring/bounce)
  // Animation completes at 15% scroll progress
  const x = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [centerX, navbarX],
    { clamp: true }
  );
  
  const y = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [centerY, navbarY],
    { clamp: true }
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.15], 
    [1, scaleFactor],
    { clamp: true }
  );

  // Track when docking completes and trigger handshake
  useMotionValueEvent(scrollYProgress, "change", useCallback((latest: number) => {
    // Use a slightly higher threshold to ensure animation is FULLY complete
    const dockThreshold = 0.15;
    
    if (latest >= dockThreshold && !hasDocked) {
      setHasDocked(true);
      // Small delay to ensure the animation has visually settled
      requestAnimationFrame(() => {
        setHandshakeComplete(true);
        onDockComplete?.();
      });
    } else if (latest < dockThreshold - 0.01 && hasDocked) {
      // Small hysteresis to prevent flicker at threshold
      setHasDocked(false);
      setHandshakeComplete(false);
    }
  }, [hasDocked, onDockComplete]));

  // Expose handshake state via custom event for Navbar to listen
  useEffect(() => {
    const event = new CustomEvent('docking-handshake', { detail: { complete: handshakeComplete } });
    window.dispatchEvent(event);
  }, [handshakeComplete]);

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
        // Instant fade when handshake completes - no delay
        opacity: handshakeComplete ? 0 : 1,
      }}
      // Use CSS transition for smooth positioning without spring bounce
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0,
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
