import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Megaphone, Target, Palette, Camera, Lightbulb, 
  Newspaper, PenTool, FileText, Check
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    id: "social-media",
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Crafting scroll-stopping content and strategies that grow your brand.",
    features: ["Content Strategy", "Community Management", "Influencer Partnerships"]
  },
  {
    id: "performance",
    icon: Target,
    title: "Performance Marketing",
    description: "Data-driven campaigns that maximize ROI through targeted advertising.",
    features: ["PPC Campaigns", "Conversion Optimization", "A/B Testing"]
  },
  {
    id: "branding",
    icon: Palette,
    title: "Offline Branding",
    description: "Tangible brand experiences through print, signage, and environmental design.",
    features: ["Print Design", "Signage", "Packaging"]
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photoshoot & Videography",
    description: "Professional visual content that captures your brand's essence.",
    features: ["Product Photography", "Video Production", "Social Content"]
  },
  {
    id: "strategy",
    icon: Lightbulb,
    title: "Brand Strategy",
    description: "Comprehensive brand positioning that differentiates you in the marketplace.",
    features: ["Brand Audit", "Positioning", "Visual Identity"]
  },
  {
    id: "pr",
    icon: Newspaper,
    title: "Public Relations",
    description: "Strategic communications that build credibility and secure media coverage.",
    features: ["Media Relations", "Press Releases", "Crisis Comms"]
  },
  {
    id: "design",
    icon: PenTool,
    title: "Creative Design",
    description: "Visually stunning designs that communicate your brand message.",
    features: ["Graphic Design", "UI/UX", "Motion Graphics"]
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Production",
    description: "Compelling content that educates, entertains, and converts.",
    features: ["Copywriting", "Blog Writing", "Script Writing"]
  },
];

// Scatter deck cards with service headings
const scatterCards = [
  {
    label: "Brand Strategy",
    serviceNumber: "01",
    rotation: -4,
    scatterX: -180,
    scatterY: -120,
  },
  {
    label: "Performance Marketing",
    serviceNumber: "02",
    rotation: 3,
    scatterX: 200,
    scatterY: -100,
  },
  {
    label: "Creative Design",
    serviceNumber: "03",
    rotation: -2,
    scatterX: -220,
    scatterY: 140,
  },
  {
    label: "Social Media",
    serviceNumber: "04",
    rotation: 5,
    scatterX: 250,
    scatterY: 160,
  },
  {
    label: "Content Production",
    serviceNumber: "05",
    rotation: -3,
    scatterX: 0,
    scatterY: -180,
  },
];

// Service Card Component - Compact version with smooth hover animations
const ServiceCard = ({ service, isExpanded, onToggle, delay = 0 }: { 
  service: typeof services[0]; 
  isExpanded: boolean;
  onToggle: () => void;
  delay?: number;
}) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        scale: 1.05,
        y: -4,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
      className={`group relative flex flex-col border border-foreground/10 bg-background overflow-hidden cursor-pointer h-48 sm:h-32 md:h-36 w-full
        ${isExpanded ? 'border-primary bg-foreground/5' : ''}
      `}
      style={{
        transition: 'border-color 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), background-color 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
      onClick={onToggle}
    >
      {/* Default State */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-3
        ${isExpanded ? 'opacity-0 -translate-y-full' : 'group-hover:opacity-0 group-hover:-translate-y-full md:opacity-100 md:translate-y-0'}
      `}
      style={{
        transition: 'all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary mb-1 sm:mb-2" strokeWidth={1.5} style={{ transition: 'color 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
        <h3 className="text-foreground text-center font-serif text-[11px] sm:text-xs md:text-sm font-medium group-hover:text-primary leading-tight px-1" style={{ transition: 'color 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
          {service.title}
        </h3>
      </div>

      {/* Expanded State */}
      <div className={`absolute inset-0 flex flex-col p-2 sm:p-3
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0'}
      `}
      style={{
        transition: 'all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)'
      }}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2">
          <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
          <h3 className="text-primary font-serif text-[9px] sm:text-[10px] md:text-xs font-medium leading-tight">{service.title}</h3>
        </div>
        <p className="text-muted-foreground font-sans text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed mb-1 sm:mb-2 line-clamp-2">
          {service.description}
        </p>
        <ul className="space-y-0.5 sm:space-y-1 mt-auto">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-0.5 sm:gap-1">
              <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-foreground font-sans text-[8px] sm:text-[9px] leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ServicesPreview = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop: Transform for scatter animation - completes by 50% of 140vh track
  const scatterProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const deckOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Desktop: Grid fades in from 10% to 45% scroll
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.1, 0.45], [0.9, 1]);

  // Reduce scatter distance on mobile
  const scatterMultiplier = isMobile ? 2 : 4;

  // Desktop: 300vh for slower, cinematic animation | Mobile: auto (no scroll-based animation)
  const sectionHeight = isMobile ? "auto" : "h-[300vh]";

  return (
    <section ref={containerRef} className={`relative ${sectionHeight} bg-background`}>
      {/* Desktop Layout - Sticky with scatter animation */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
        <div className="h-full w-full flex flex-col">
          {/* Static Header */}
          <div className="relative z-50 bg-background pt-24 pb-6 flex-shrink-0">
            <div className="container-luxury text-center">
              <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
                Our Services
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
                From Strategy to Execution
              </h2>
              <p className="text-muted-foreground font-sans max-w-2xl mx-auto text-sm">
                Scroll to discover our comprehensive creative solutions
              </p>
            </div>
          </div>

          {/* Animation Area */}
          <div className="relative flex-1 w-full flex items-center justify-center">
            {/* Layer A: Services Grid - z-30 */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-30 pt-4"
              style={{
                opacity: gridOpacity,
                scale: gridScale,
              }}
            >
              <div className="w-full max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-4 gap-3">
                  {services.map((service, index) => (
                    <ServiceCard 
                      key={service.id} 
                      service={service}
                      isExpanded={expandedId === service.id}
                      onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
                      delay={index * 0.2}
                    />
                  ))}
                </div>
                
                {/* CTA */}
                <div className="text-center mt-8">
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-6 py-2.5 border border-primary text-primary font-sans text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-h-[44px]"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Layer B: Scatter Deck - z-40 */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
              style={{ opacity: deckOpacity }}
            >
              <div className="relative w-80 h-80">
                {scatterCards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
                    style={{
                      rotate: card.rotation,
                      x: useTransform(scatterProgress, [0, 1], [0, card.scatterX * scatterMultiplier]),
                      y: useTransform(scatterProgress, [0, 1], [0, card.scatterY * scatterMultiplier]),
                      scale: useTransform(scatterProgress, [0, 0.5, 1], [1, 1.15, 1.4]),
                      zIndex: scatterCards.length - index,
                    }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                      <span className="text-white/50 font-sans text-xs uppercase tracking-[0.3em] mb-3">
                        Service {card.serviceNumber}
                      </span>
                      <h3 className="text-white font-serif text-xl lg:text-2xl text-center leading-tight">
                        {card.label}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Diagonal Float Transition with compact list */}
      <div className="block md:hidden py-16 px-4 bg-background">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-primary font-sans text-xs uppercase tracking-widest mb-2 block">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-foreground mb-2">
            From Strategy to Execution
          </h2>
          <p className="text-muted-foreground font-sans text-xs max-w-sm mx-auto">
            Comprehensive creative solutions for your brand
          </p>
        </div>

        {/* Mobile Services Grid - Compact 2x4 with diagonal float animation */}
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="border border-foreground/10 bg-background/80 backdrop-blur-sm p-4 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-serif text-sm font-medium leading-tight">
                  {service.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - immediately after cards */}
        <div className="text-center mt-6">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-sans text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 min-h-[44px]"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;