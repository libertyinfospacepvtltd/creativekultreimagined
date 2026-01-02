import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

interface PreloaderProps {
  onComplete: () => void;
  onLogoReady?: () => void;
}

const Preloader = ({ onComplete, onLogoReady }: PreloaderProps) => {
  const [phase, setPhase] = useState<"reveal" | "hold" | "dissolve">("reveal");

  useEffect(() => {
    // Phase timing:
    // Logo mask reveal: 2s
    // Hold: 0.8s
    // Dissolve: background fades, logo stays in place
    const timers = [
      setTimeout(() => setPhase("hold"), 2000),
      setTimeout(() => {
        setPhase("dissolve");
        onLogoReady?.(); // Signal that the shared logo is ready
      }, 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onLogoReady]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "dissolve" ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo with mask reveal animation - uses layoutId for shared transition */}
          <div className="relative flex items-center justify-center">
            <motion.div
              layoutId="creative-kult-logo"
              className="relative overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ 
                clipPath: phase === "reveal" 
                  ? ["inset(0 100% 0 0)", "inset(0 85% 0 0)", "inset(0 0% 0 0)"]
                  : "inset(0 0% 0 0)"
              }}
              transition={{
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
                times: [0, 0.15, 1],
                layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              <img
                src={logo}
                alt="Creative Kult"
                className="w-64 md:w-80 lg:w-[420px] h-auto"
              />
            </motion.div>
            
            {/* Subtle glow effect behind logo */}
            <motion.div
              className="absolute inset-0 -z-10 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "hold" ? 0.15 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-full bg-primary/30 rounded-full scale-150" />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // Dissolve phase: background fades out, logo remains with layoutId for handoff
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        >
          {/* Background fades out */}
          <motion.div 
            className="absolute inset-0 bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          
          {/* Logo stays visible during dissolve with layoutId */}
          <motion.div
            layoutId="creative-kult-logo"
            className="relative"
            transition={{ layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          >
            <img
              src={logo}
              alt="Creative Kult"
              className="w-64 md:w-80 lg:w-[420px] h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;