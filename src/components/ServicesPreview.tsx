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

// Scatter deck cards data
const scatterCards = [
  {
    image: "https://canvas-kolkata-vibe.lovable.app/assets/12thpass-logo-DhXy1KrN.png",
    label: "12thPass.ai",
    rotation: -4,
    scatterX: -120,
    scatterY: -80,
  },
  {
    image: "https://canvas-kolkata-vibe.lovable.app/assets/easydo365-logo-CI69kmpV.png",
    label: "EasyDo 365",
    rotation: 3,
    scatterX: 150,
    scatterY: -60,
  },
  {
    image: "https://canvas-kolkata-vibe.lovable.app/assets/majorcolours-logo-C9dMwmvs.png",
    label: "Major Colors",
    rotation: -2,
    scatterX: -180,
    scatterY: 100,
  },
  {
    image: null, // Abstract card
    label: "Strategy",
    rotation: 5,
    scatterX: 200,
    scatterY: 120,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    image: null,
    label: "Creative",
    rotation: -3,
    scatterX: 0,
    scatterY: -140,
    gradient: "from-foreground/10 to-foreground/5",
  },
  {
    image: null,
    label: "Results",
    rotation: 4,
    scatterX: -100,
    scatterY: 150,
    gradient: "from-primary/15 to-transparent",
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
    offset: ["start start", "end start"]
  });

  // Transform for scatter animation (0-0.5 of scroll = scatter happens)
  const scatterProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const deckOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-background">
      {/* Header - Static at top */}
      <div className="sticky top-0 pt-20 md:pt-24 z-10 bg-background">
        <div className="container-luxury text-center pb-8 md:pb-12">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            From Strategy to Execution
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            Scroll to discover our comprehensive creative solutions
          </p>
        </div>
      </div>

      {/* Animation Container */}
      <div className="sticky top-32 md:top-40 h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="container-luxury relative h-full">
          
          {/* Layer A: Services Grid (revealed) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: gridOpacity }}
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
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: deckOpacity }}
          >
            <div className="relative w-72 h-96 md:w-96 md:h-[28rem]">
              {scatterCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl"
                  style={{
                    rotate: card.rotation,
                    x: useTransform(scatterProgress, [0, 1], [0, card.scatterX * 3]),
                    y: useTransform(scatterProgress, [0, 1], [0, card.scatterY * 3]),
                    scale: useTransform(scatterProgress, [0, 0.5, 1], [1, 1.1, 1.3]),
                    zIndex: scatterCards.length - index,
                  }}
                >
                  {card.image ? (
                    <div className="w-full h-full bg-white flex items-center justify-center p-12">
                      <img 
                        src={card.image} 
                        alt={card.label}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${card.gradient} backdrop-blur-sm flex items-center justify-center`}>
                      <span className="text-foreground/60 font-serif text-2xl md:text-3xl">
                        {card.label}
                      </span>
                    </div>
                  )}
                  
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
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
