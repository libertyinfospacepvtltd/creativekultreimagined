import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logoImage from "@/assets/creative-kult-logo.png";

interface CardScatterSectionProps {
  children: React.ReactNode;
}

// Card configurations with random rotations and scatter directions
const scatterCards = [
  { id: 1, rotation: -5, exitX: -120, exitY: -80, label: "12thPass" },
  { id: 2, rotation: 3, exitX: 100, exitY: -100, label: "EasyDo" },
  { id: 3, rotation: -3, exitX: -140, exitY: 60, label: "Major Colors" },
  { id: 4, rotation: 6, exitX: 130, exitY: 80, label: "Creative Kult" },
  { id: 5, rotation: -4, exitX: 0, exitY: -120, label: "Brand Works" },
];

const CardScatterSection = ({ children }: CardScatterSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background content (services) animations
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.3, 0.7], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Background - Services Content */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ 
            opacity: contentOpacity,
            scale: contentScale
          }}
        >
          {children}
        </motion.div>

        {/* Layer 2: Foreground - Card Stack */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {scatterCards.map((card, index) => (
            <ScatterCard
              key={card.id}
              card={card}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ScatterCardProps {
  card: typeof scatterCards[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const ScatterCard = ({ card, index, scrollProgress }: ScatterCardProps) => {
  // Staggered animation start for each card
  const staggerOffset = index * 0.05;
  
  // Card animations
  const x = useTransform(
    scrollProgress, 
    [0.1 + staggerOffset, 0.5 + staggerOffset], 
    ["0%", `${card.exitX}vw`]
  );
  const y = useTransform(
    scrollProgress, 
    [0.1 + staggerOffset, 0.5 + staggerOffset], 
    ["0%", `${card.exitY}vh`]
  );
  const scale = useTransform(
    scrollProgress, 
    [0.1 + staggerOffset, 0.4 + staggerOffset], 
    [1, 2]
  );
  const opacity = useTransform(
    scrollProgress, 
    [0.1 + staggerOffset, 0.45 + staggerOffset], 
    [1, 0]
  );
  const rotate = useTransform(
    scrollProgress, 
    [0, 0.5], 
    [card.rotation, card.rotation * 3]
  );

  return (
    <motion.div
      className="absolute w-48 md:w-64 lg:w-72"
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex: 20 - index,
      }}
    >
      <div 
        className="relative w-full bg-card/80 backdrop-blur-xl border border-primary/20 rounded-lg overflow-hidden shadow-2xl"
        style={{ 
          aspectRatio: "3/4",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(var(--primary-rgb), 0.1)"
        }}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10" />
        
        {/* Card content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {/* Logo */}
          <div className="w-20 h-20 md:w-24 md:h-24 mb-4 relative">
            <img 
              src={logoImage} 
              alt={card.label}
              className="w-full h-full object-contain filter brightness-0 invert opacity-80"
            />
          </div>
          
          {/* Label */}
          <span className="text-foreground/80 font-serif text-sm md:text-base tracking-wide text-center">
            {card.label}
          </span>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-lg border border-primary/10" />
      </div>
    </motion.div>
  );
};

export default CardScatterSection;
