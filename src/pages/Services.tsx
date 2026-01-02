import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Megaphone, Target, Palette, Camera, Lightbulb, 
  Newspaper, PenTool, FileText, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";

const services = [
  {
    id: "social-media",
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Crafting scroll-stopping content and strategies that grow your brand and engage your audience where it matters most.",
    features: [
      "Content Strategy & Calendar",
      "Community Management",
      "Influencer Partnerships",
      "Platform-Specific Optimization"
    ]
  },
  {
    id: "performance",
    icon: Target,
    title: "Performance Marketing",
    description: "Data-driven campaigns that maximize ROI through targeted advertising and continuous optimization across all digital channels.",
    features: [
      "PPC Campaign Management",
      "Conversion Rate Optimization",
      "A/B Testing & Analytics",
      "Retargeting Strategies"
    ]
  },
  {
    id: "branding",
    icon: Palette,
    title: "Offline Branding",
    description: "Tangible brand experiences through print, signage, and environmental design that leave lasting impressions.",
    features: [
      "Print Collateral Design",
      "Signage & Environmental Graphics",
      "Packaging Design",
      "Exhibition & Event Branding"
    ]
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photoshoot & Videography",
    description: "Professional visual content creation that captures your brand's essence and tells compelling stories.",
    features: [
      "Product Photography",
      "Corporate Video Production",
      "Social Media Content",
      "Event Coverage"
    ]
  },
  {
    id: "strategy",
    icon: Lightbulb,
    title: "Brand Strategy",
    description: "Comprehensive brand positioning and identity development that differentiates you in the marketplace.",
    features: [
      "Brand Audit & Research",
      "Positioning & Messaging",
      "Visual Identity Systems",
      "Brand Guidelines"
    ]
  },
  {
    id: "pr",
    icon: Newspaper,
    title: "Public Relations",
    description: "Strategic communications that build credibility, manage reputation, and secure meaningful media coverage.",
    features: [
      "Media Relations & Outreach",
      "Press Release Writing",
      "Crisis Communications",
      "Thought Leadership"
    ]
  },
  {
    id: "design",
    icon: PenTool,
    title: "Creative Design",
    description: "Visually stunning designs that communicate your brand message and captivate your target audience.",
    features: [
      "Graphic Design",
      "UI/UX Design",
      "Motion Graphics",
      "Illustration"
    ]
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Production",
    description: "Compelling content that educates, entertains, and converts across all platforms and formats.",
    features: [
      "Copywriting & Editing",
      "Blog & Article Writing",
      "Script Writing",
      "Content Strategy"
    ]
  },
];

const processSteps = [
  { number: "01", title: "Discovery", description: "Understanding your brand, goals, and audience" },
  { number: "02", title: "Strategy", description: "Crafting a tailored approach for maximum impact" },
  { number: "03", title: "Execute", description: "Bringing the strategy to life with precision" },
  { number: "04", title: "Optimize", description: "Continuous improvement based on real data" },
];

const Services = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container-luxury">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Services Crafted for Impact
          </h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-lg">
            From strategy to execution, we deliver comprehensive creative solutions that transform brands and drive measurable business results.
          </p>
        </div>
      </section>

      {/* Premium Editorial Grid */}
      <section className="bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-foreground/10">
            {services.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`group flex flex-col items-center justify-center py-12 px-6 border-r border-b border-foreground/10 transition-all duration-300 hover:bg-foreground/5 cursor-pointer ${
                    isActive ? "border-b-2 border-b-primary bg-foreground/5" : ""
                  }`}
                >
                  {/* Icon */}
                  <service.icon 
                    className={`w-8 h-8 transition-colors duration-300 mb-4 ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    }`}
                    strokeWidth={1.5}
                  />
                  
                  {/* Title */}
                  <h3 className={`text-center font-serif text-base md:text-lg font-medium transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}>
                    {service.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-luxury">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            >
              {/* Left Column - Description */}
              <div className="flex flex-col">
                <activeService.icon 
                  className="w-12 h-12 text-primary mb-6"
                  strokeWidth={1.5}
                />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
                  {activeService.title}
                </h2>
                <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Right Column - What's Included */}
              <div className="flex flex-col">
                <span className="text-primary font-sans text-sm uppercase tracking-widest mb-6">
                  What's Included
                </span>
                <ul className="space-y-4">
                  {activeService.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
                      <span className="text-foreground font-sans text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-card border-t border-border/30">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
              A Streamlined Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <span className="text-5xl md:text-6xl font-serif text-primary/20 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-10">
            Let's discuss how our services can help you achieve your business goals.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
