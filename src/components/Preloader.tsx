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
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo with mask reveal animation */}
          <div className="relative flex items-center justify-center">
            <motion.div
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
                times: [0, 0.15, 1], // Slow start on "K", then smooth reveal
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
      )}
    </AnimatePresence>
  );
};

export default Preloader;
