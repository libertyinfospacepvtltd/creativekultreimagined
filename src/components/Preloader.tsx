import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"reveal" | "hold" | "exit">("reveal");

  useEffect(() => {
    // Phase timing:
    // Logo mask reveal: 2s
    // Hold: 0.8s
    // Exit: triggers onComplete
    const timers = [
      setTimeout(() => setPhase("hold"), 2000),
      setTimeout(() => setPhase("exit"), 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center overflow-hidden bg-background"
          style={{ zIndex: 10000 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo container - fixed center position matching DockingLogo start */}
          <motion.div
            className="fixed"
            style={{
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 10001,
            }}
          >
            {/* Logo with mask reveal animation - shares layoutId with DockingLogo */}
            <motion.div
              layoutId="creative-kult-logo"
              className="relative"
              style={{ overflow: "hidden" }}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ 
                clipPath: phase === "reveal" 
                  ? ["inset(0 100% 0 0)", "inset(0 85% 0 0)", "inset(0 0% 0 0)"]
                  : "inset(0 0% 0 0)"
              }}
              transition={{
                clipPath: {
                  duration: 2,
                  ease: [0.25, 0.1, 0.25, 1],
                  times: [0, 0.15, 1],
                },
                layout: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }
              }}
            >
              <img
                src={logo}
                alt="Creative Kult"
                className="w-64 md:w-80 lg:w-[420px] h-auto"
              />
            </motion.div>
          </motion.div>
          
          {/* Subtle glow effect behind logo */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "hold" ? 0.15 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-96 h-96 bg-primary/30 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
