import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

const DockingLogo = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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
  // Center position: 50% of viewport
  // Navbar position: ~24px from left (container padding), ~8px from top (centered in 64px navbar)
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
  // container-luxury has px-4 md:px-6 lg:px-8, and navbar h-16 (64px)
  const navPadding = isMobile ? 16 : windowSize.width >= 1024 ? 32 : 24;
  const navbarX = navPadding + (navLogoWidth / 2);
  const navbarY = 32; // Center of 64px navbar

  // Scroll-linked transforms - animation completes at ~25% scroll progress
  const x = useTransform(
    scrollYProgress, 
    [0, 0.25], 
    [centerX, navbarX]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [0, 0.25], 
    [centerY, navbarY]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.25], 
    [1, scaleFactor]
  );

  // Only render on home page
  if (!isHomePage || windowSize.width === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        x,
        y,
        scale,
        translateX: "-50%",
        translateY: "-50%",
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
  );
};

export default DockingLogo;
