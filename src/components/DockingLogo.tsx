import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [hasDocked, setHasDocked] = useState(false);
  const [handshakeComplete, setHandshakeComplete] = useState(false);
  const [revealPhase, setRevealPhase] = useState<"reveal" | "hold" | "complete">(
    isPreloading ? "reveal" : "complete"
  );
  
  // Store the navbar logo's bounding rect for pixel-perfect positioning
  const [navbarLogoRect, setNavbarLogoRect] = useState<DOMRect | null>(null);

  // Track window size for accurate positioning
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Get the navbar logo's bounding rect using getBoundingClientRect
  useEffect(() => {
    const getNavbarLogoPosition = () => {
      const navbarLogo = document.getElementById(NAVBAR_LOGO_ID);
      if (navbarLogo) {
        const rect = navbarLogo.getBoundingClientRect();
        setNavbarLogoRect(rect);
      }
    };
    
    // Initial measurement
    getNavbarLogoPosition();
    
    // Re-measure on resize and scroll (navbar might reposition)
    window.addEventListener("resize", getNavbarLogoPosition);
    
    // Use a small delay to ensure navbar is rendered
    const timeout = setTimeout(getNavbarLogoPosition, 100);
    
    return () => {
      window.removeEventListener("resize", getNavbarLogoPosition);
      clearTimeout(timeout);
    };
  }, [windowSize.width]); // Re-run when window size changes

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
  const isMobile = windowSize.width < 640; // sm breakpoint
  const isTablet = windowSize.width >= 640 && windowSize.width < 768; // between sm and md
  
  // Initial logo size (hero state) - matches img class "w-64 md:w-80 lg:w-[420px]"
  const heroLogoWidth = windowSize.width < 768 ? 256 : windowSize.width < 1024 ? 320 : 420;
  
  // Final logo dimensions from navbar anchor (pixel-perfect)
  // Fallback values if navbar logo not yet measured: h-8=32px, sm:h-10=40px, md:h-12=48px
  const navLogoWidth = navbarLogoRect?.width ?? (isMobile ? 144 : isTablet ? 180 : 216);
  const navLogoHeight = navbarLogoRect?.height ?? (isMobile ? 32 : isTablet ? 40 : 48);
  
  // Scale factor to shrink hero logo to exact navbar logo size
  const scaleFactor = navLogoWidth / heroLogoWidth;

  // Center position (hero state)
  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  // Navbar position (docked state) - use getBoundingClientRect for pixel-perfect positioning
  // Calculate center of navbar logo bounding box
  const navbarX = navbarLogoRect 
    ? navbarLogoRect.left + (navbarLogoRect.width / 2)
    : (isMobile ? 16 : windowSize.width >= 1024 ? 32 : 24) + (navLogoWidth / 2);
  const navbarY = navbarLogoRect 
    ? navbarLogoRect.top + (navbarLogoRect.height / 2)
    : 32; // Center of navbar

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

  // Track when docking completes and trigger handshake
  useMotionValueEvent(scrollYProgress, "change", useCallback((latest: number) => {
    if (latest >= 0.15 && !hasDocked) {
      setHasDocked(true);
      // Handshake: DockingLogo is now at exact position, signal navbar to show its logo
      setHandshakeComplete(true);
      onDockComplete?.();
    } else if (latest < 0.15 && hasDocked) {
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
        opacity: handshakeComplete ? 0 : 1,
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
