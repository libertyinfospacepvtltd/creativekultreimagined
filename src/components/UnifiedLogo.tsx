import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

interface UnifiedLogoProps {
  showPreloaderOverlay: boolean;
  onPreloaderComplete: () => void;
}

const UnifiedLogo = ({ showPreloaderOverlay, onPreloaderComplete }: UnifiedLogoProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [phase, setPhase] = useState<"reveal" | "hold" | "done">("reveal");
  const [overlayVisible, setOverlayVisible] = useState(true);

  const { scrollY } = useScroll();

  // Animation: Arc motion with clamping
  // Y moves UP first (0-300px scroll), X moves LEFT after (100-500px scroll)
  // Using viewport percentages for exact positioning
  
  // Top: 50% (center) → 3.5% (navbar position ~24px from top)
  const topPercent = useTransform(
    scrollY,
    [0, 300],
    [50, 3.5],
    { clamp: true }
  );
  
  // Left: 50% (center) → 6% (left side with container padding)
  const leftPercent = useTransform(
    scrollY,
    [100, 500],
    [50, 6],
    { clamp: true }
  );
  
  // Scale: 1 → 0.3 (navbar logo size)
  const scale = useTransform(
    scrollY,
    [0, 500],
    [1, 0.3],
    { clamp: true }
  );

  // Preloader timing
  useEffect(() => {
    if (!showPreloaderOverlay) {
      setPhase("done");
      setOverlayVisible(false);
      return;
    }
    
    const timers = [
      setTimeout(() => setPhase("hold"), 2000),
      setTimeout(() => {
        setPhase("done");
        // Small delay before fading overlay
        setTimeout(() => {
          setOverlayVisible(false);
          onPreloaderComplete();
        }, 500);
      }, 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [showPreloaderOverlay, onPreloaderComplete]);

  // Only show on home page
  if (!isHomePage) {
    return null;
  }

  const isInPreloaderMode = showPreloaderOverlay && overlayVisible;

  return (
    <>
      {/* Black overlay that fades out - the logo sits on TOP of this */}
      <AnimatePresence>
        {isInPreloaderMode && (
          <motion.div
            className="fixed inset-0 bg-background"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Subtle glow effect during hold phase */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "hold" ? 0.15 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE SINGLE FIXED LOGO - never moves during preloader, only transforms on scroll */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          top: isInPreloaderMode ? "50%" : topPercent,
          left: isInPreloaderMode ? "50%" : leftPercent,
          x: "-50%",
          y: "-50%",
          scale: isInPreloaderMode ? 1 : scale,
          zIndex: 9999,
        }}
      >
        <Link to="/" className="pointer-events-auto block">
          <motion.div
            className="relative"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ 
              clipPath: phase === "reveal" && showPreloaderOverlay
                ? ["inset(0 100% 0 0)", "inset(0 85% 0 0)", "inset(0 0% 0 0)"]
                : "inset(0 0% 0 0)"
            }}
            transition={{
              clipPath: {
                duration: phase === "reveal" && showPreloaderOverlay ? 2 : 0,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.15, 1],
              },
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
    </>
  );
};

export default UnifiedLogo;