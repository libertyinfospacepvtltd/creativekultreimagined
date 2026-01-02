import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";
import heroImage from "@/assets/victoria-memorial-hero.jpg";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"k" | "typing" | "flourish" | "background" | "exit">("k");

  useEffect(() => {
    // Phase timing:
    // K fades in: 0.6s
    // Typing "Creative Kult": 1.2s
    // Logo flourish fades in: 0.8s
    // Background reveal: 0.6s
    // Hold + Exit: 0.5s
    const timers = [
      setTimeout(() => setPhase("typing"), 600),
      setTimeout(() => setPhase("flourish"), 1800),
      setTimeout(() => setPhase("background"), 2600),
      setTimeout(() => setPhase("exit"), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const fullText = "Creative Kult";
  
  // Letter-by-letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Black background */}
          <div className="absolute inset-0 bg-background" />
          
          {/* Background image - fades in during background phase */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "background" ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src={heroImage}
              alt="Victoria Memorial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/80" />
          </motion.div>

          {/* Content container - centered */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Phase 1 & 2: The "K" and typewriter text */}
            {(phase === "k" || phase === "typing") && (
              <div className="text-center">
                {phase === "k" ? (
                  // Just the "K" fading in
                  <motion.span
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    K
                  </motion.span>
                ) : (
                  // Typewriter effect for full text
                  <div className="flex justify-center">
                    {fullText.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={letterVariants}
                        style={{ display: char === " " ? "inline-block" : "inline-block", width: char === " " ? "0.3em" : "auto" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Phase 3: Logo flourish - full logo fades over the typed text */}
            {(phase === "flourish" || phase === "background") && (
              <motion.img
                src={logo}
                alt="Creative Kult"
                className="w-64 md:w-80 lg:w-[420px] h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
