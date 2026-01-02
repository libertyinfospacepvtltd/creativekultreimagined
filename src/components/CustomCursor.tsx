import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Spring config for the trailing circle
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const trailX = useSpring(0, springConfig);
  const trailY = useSpring(0, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hovering over clickable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        !!target.closest('a') || 
        !!target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(Boolean(isClickable));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
      document.body.style.cursor = 'auto';
    };
  }, [trailX, trailY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div 
          className={`rounded-full bg-primary transition-transform duration-200 ${
            isHovering ? "w-3 h-3 scale-150" : "w-2 h-2"
          }`}
          style={{
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
          }}
        />
      </div>

      {/* Trailing circle */}
      <motion.div
        className={`fixed pointer-events-none z-[9998] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div 
          className={`rounded-full border transition-all duration-300 ${
            isHovering 
              ? "w-12 h-12 border-primary/60" 
              : "w-8 h-8 border-foreground/30"
          }`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
