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

// Service Card Component
const ServiceCard = ({ service, isExpanded, onToggle }: { 
  service: typeof services[0]; 
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      className={`group relative flex flex-col border border-foreground/10 bg-background transition-all duration-500 overflow-hidden cursor-pointer
        ${isExpanded ? 'border-primary bg-foreground/5' : 'hover:border-primary hover:bg-foreground/5'}
      `}
      style={{ aspectRatio: '3/4' }}
      onClick={onToggle}
    >
      {/* Default State */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500 ease-out
        ${isExpanded ? 'opacity-0 -translate-y-full' : 'group-hover:opacity-0 group-hover:-translate-y-full md:opacity-100 md:translate-y-0'}
      `}>
        <Icon className="w-8 h-8 text-muted-foreground transition-colors duration-300 group-hover:text-primary mb-3" strokeWidth={1.5} />
        <h3 className="text-foreground text-center font-serif text-sm md:text-base font-medium transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
      </div>

      {/* Expanded State */}
      <div className={`absolute inset-0 flex flex-col p-4 transition-all duration-500 ease-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0'}
      `}>
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.5} />
          <h3 className="text-primary font-serif text-xs md:text-sm font-medium leading-tight">{service.title}</h3>
        </div>
        <p className="text-muted-foreground font-sans text-[10px] md:text-xs leading-relaxed mb-3 line-clamp-2">
          {service.description}
        </p>
        <ul className="space-y-1.5 mt-auto">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-1.5">
              <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-foreground font-sans text-[10px] leading-tight">{feature}</span>
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

  // Transform for scatter animation - slower progression over 300vh
  const scatterProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const deckOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.45, 0.65], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      {/* Sticky Container - Pins content to center during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className="absolute top-20 md:top-24 left-0 right-0 z-20">
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

        {/* Animation Layers Container */}
        <div className="relative w-full h-full flex items-center justify-center pt-32">
          
          {/* Layer A: Services Grid (revealed) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pt-20"
            style={{ 
              opacity: gridOpacity,
              scale: gridScale,
            }}
          >
            <div className="w-full max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
              <div className="text-center mt-8 md:mt-12">
                <Link
                  to="/services"
                  className="inline-block px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Layer B: Scatter Deck (covers grid initially) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none pt-20"
            style={{ opacity: deckOpacity }}
          >
            <div className="relative w-72 h-96 md:w-96 md:h-[28rem]">
              {scatterCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-xl overflow-hidden border border-foreground/20 shadow-2xl bg-background"
                  style={{
                    rotate: card.rotation,
                    x: useTransform(scatterProgress, [0, 1], [0, card.scatterX * 4]),
                    y: useTransform(scatterProgress, [0, 1], [0, card.scatterY * 4]),
                    scale: useTransform(scatterProgress, [0, 0.5, 1], [1, 1.15, 1.4]),
                    zIndex: scatterCards.length - index,
                  }}
                >
                  {/* Dark premium card background */}
                  <div className="w-full h-full bg-gradient-to-br from-foreground/95 to-foreground/80 flex flex-col items-center justify-center p-8">
                    {/* Service label */}
                    <span className="text-background/50 font-sans text-xs uppercase tracking-[0.3em] mb-4">
                      Service {card.serviceNumber}
                    </span>
                    {/* Service title */}
                    <h3 className="text-background font-serif text-xl md:text-2xl lg:text-3xl text-center leading-tight">
                      {card.label}
                    </h3>
                  </div>
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
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
