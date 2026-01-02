import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  isVisible: boolean;
}

const Preloader = ({ isVisible }: PreloaderProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-40 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 2.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default Preloader;
