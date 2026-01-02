import { useState, useRef } from "react";
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

// Service Card Component - Compact version
const ServiceCard = ({ service, isExpanded, onToggle }: { 
  service: typeof services[0]; 
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      className={`group relative flex flex-col border border-foreground/10 bg-background transition-all duration-500 overflow-hidden cursor-pointer min-h-[120px] md:min-h-[140px]
        ${isExpanded ? 'border-primary bg-foreground/5' : 'hover:border-primary hover:bg-foreground/5'}
      `}
      onClick={onToggle}
    >
      {/* Default State */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-all duration-500 ease-out
        ${isExpanded ? 'opacity-0 -translate-y-full' : 'group-hover:opacity-0 group-hover:-translate-y-full md:opacity-100 md:translate-y-0'}
      `}>
        <Icon className="w-6 h-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary mb-2" strokeWidth={1.5} />
        <h3 className="text-foreground text-center font-serif text-xs md:text-sm font-medium transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
      </div>

      {/* Expanded State */}
      <div className={`absolute inset-0 flex flex-col p-3 transition-all duration-500 ease-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0'}
      `}>
        <div className="flex items-center gap-1.5 mb-2">
          <Icon className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={1.5} />
          <h3 className="text-primary font-serif text-[10px] md:text-xs font-medium leading-tight">{service.title}</h3>
        </div>
        <p className="text-muted-foreground font-sans text-[9px] md:text-[10px] leading-relaxed mb-2 line-clamp-2">
          {service.description}
        </p>
        <ul className="space-y-1 mt-auto">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-1">
              <Check className="w-2.5 h-2.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-foreground font-sans text-[9px] leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ServicesPreview = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform for scatter animation - completes by 60% of shorter 180vh track
  const scatterProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const deckOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  
  // Grid fades in from 15% to 50% scroll
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[180vh] bg-background">
      {/* Static Header - Always visible above the animation */}
      <div className="sticky top-0 z-50 bg-background pt-20 md:pt-24 pb-6">
        <div className="container-luxury text-center">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            From Strategy to Execution
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto text-sm">
            Scroll to discover our comprehensive creative solutions
          </p>
        </div>
      </div>

      {/* Scroll Animation Container - Pinned below header with proper gap */}
      <div className="sticky top-32 md:top-36 h-[60vh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Animation Layers Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Layer A: Services Grid (revealed) - z-10 for lower stacking */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              opacity: gridOpacity,
              scale: gridScale,
            }}
          >
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {services.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service}
                    isExpanded={expandedId === service.id}
                    onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
                  />
                ))}
              </div>
              
              {/* CTA */}
              <div className="text-center mt-6 md:mt-8">
                <Link
                  to="/services"
                  className="inline-block px-6 py-2.5 border border-primary text-primary font-sans text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Layer B: Scatter Deck (covers grid initially) - z-50 for top stacking */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
            style={{ opacity: deckOpacity }}
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96">
              {scatterCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
                  style={{
                    rotate: card.rotation,
                    x: useTransform(scatterProgress, [0, 1], [0, card.scatterX * 4]),
                    y: useTransform(scatterProgress, [0, 1], [0, card.scatterY * 4]),
                    scale: useTransform(scatterProgress, [0, 0.5, 1], [1, 1.15, 1.4]),
                    zIndex: scatterCards.length - index,
                  }}
                >
                  {/* Dark glass card content */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    {/* Service label */}
                    <span className="text-white/50 font-sans text-xs uppercase tracking-[0.3em] mb-3">
                      Service {card.serviceNumber}
                    </span>
                    {/* Service title */}
                    <h3 className="text-white font-serif text-lg md:text-xl lg:text-2xl text-center leading-tight">
                      {card.label}
                    </h3>
                  </div>
                  
                  {/* Subtle gradient overlay for glass effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
