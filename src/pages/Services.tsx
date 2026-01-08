import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Target, Palette, Camera, Lightbulb, Newspaper, PenTool, FileText, Check, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [{
  id: "social-media",
  icon: Megaphone,
  title: "Social Media Marketing",
  description: "Crafting scroll-stopping content and strategies that grow your brand.",
  features: ["Content Strategy & Calendar", "Community Management", "Influencer Partnerships"]
}, {
  id: "performance",
  icon: Target,
  title: "Performance Marketing",
  description: "Data-driven campaigns that maximize ROI through targeted advertising.",
  features: ["PPC Campaign Management", "Conversion Rate Optimization", "A/B Testing & Analytics"]
}, {
  id: "branding",
  icon: Palette,
  title: "Offline Branding",
  description: "Tangible brand experiences through print, signage, and environmental design.",
  features: ["Print Collateral Design", "Signage & Environmental Graphics", "Packaging Design"]
}, {
  id: "photography",
  icon: Camera,
  title: "Photoshoot & Videography",
  description: "Professional visual content that captures your brand's essence.",
  features: ["Product Photography", "Corporate Video Production", "Social Media Content"]
}, {
  id: "strategy",
  icon: Lightbulb,
  title: "Brand Strategy",
  description: "Comprehensive brand positioning that differentiates you in the marketplace.",
  features: ["Brand Audit & Research", "Positioning & Messaging", "Visual Identity Systems"]
}, {
  id: "pr",
  icon: Newspaper,
  title: "Public Relations",
  description: "Strategic communications that build credibility and secure media coverage.",
  features: ["Media Relations & Outreach", "Press Release Writing", "Crisis Communications"]
}, {
  id: "design",
  icon: PenTool,
  title: "Creative Design",
  description: "Visually stunning designs that communicate your brand message.",
  features: ["Graphic Design", "UI/UX Design", "Motion Graphics"]
}, {
  id: "content",
  icon: FileText,
  title: "Content Production",
  description: "Compelling content that educates, entertains, and converts.",
  features: ["Copywriting & Editing", "Blog & Article Writing", "Script Writing"]
}];
const processSteps = [{
  number: "01",
  title: "Discovery",
  description: "Understanding your brand, goals, and audience"
}, {
  number: "02",
  title: "Strategy",
  description: "Crafting a tailored approach for maximum impact"
}, {
  number: "03",
  title: "Execute",
  description: "Bringing the strategy to life with precision"
}, {
  number: "04",
  title: "Optimize",
  description: "Continuous improvement based on real data"
}];

// Service Card Component with hover reveal
const ServiceCard = ({
  service,
  isExpanded,
  onToggle
}: {
  service: typeof services[0];
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = service.icon;
  return <motion.div className={`group relative flex flex-col border border-foreground/10 bg-background transition-all duration-500 overflow-hidden cursor-pointer h-56 sm:h-64 md:h-72
        ${isExpanded ? 'border-primary bg-foreground/5' : 'hover:border-primary hover:bg-foreground/5'}
      `} onClick={onToggle}>
      {/* Default State Content - Icon & Title centered */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-500 ease-out
        ${isExpanded ? 'opacity-0 -translate-y-full' : 'group-hover:opacity-0 group-hover:-translate-y-full md:opacity-100 md:translate-y-0'}
      `}>
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground transition-colors duration-300 group-hover:text-primary mb-3 sm:mb-4" strokeWidth={1.5} />
        <h3 className="text-foreground text-center font-serif text-sm sm:text-base md:text-lg font-medium transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
      </div>

      {/* Hover/Expanded State Content - Full details */}
      <div className={`absolute inset-0 flex flex-col p-4 sm:p-5 transition-all duration-500 ease-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0'}
      `}>
        {/* Icon & Title at top */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" strokeWidth={1.5} />
          <h3 className="text-primary font-serif text-xs sm:text-sm md:text-base font-medium leading-tight">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-1.5 sm:space-y-2 mt-auto">
          {service.features.map((feature, index) => <li key={index} className="flex items-start gap-2">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-foreground font-sans text-[10px] sm:text-xs leading-tight">{feature}</span>
            </li>)}
        </ul>
      </div>
    </motion.div>;
};
const Services = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return <Layout>
      {/* Page Header */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-10 md:pt-20 md:pb-14 bg-background">
        <div className="container-luxury">
          <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
            What We Do
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-foreground mb-3 sm:mb-6">
            Services Crafted for Impact
          </h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-sm sm:text-base lg:text-lg">
            From strategy to execution, we deliver comprehensive creative solutions.
          </p>
        </div>
      </section>

      {/* Premium Hover-Reveal Grid - Desktop Only */}
      <section className="bg-background pb-8 sm:pb-12 md:pb-24">
        <div className="container-luxury">
          {/* Desktop Grid - hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map(service => <ServiceCard key={service.id} service={service} isExpanded={expandedId === service.id} onToggle={() => handleToggle(service.id)} />)}
          </div>
          
          {/* Mobile Accordion - visible only on mobile */}
          <div className="block md:hidden">
            <Accordion type="single" collapsible className="w-full">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <AccordionItem 
                    key={service.id} 
                    value={service.id}
                    className="border-b border-foreground/10"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline group">
                      <div className="flex items-center gap-3 text-left">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-foreground font-serif text-sm font-medium group-hover:text-primary transition-colors">
                          {service.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="pl-8">
                        <p className="text-muted-foreground font-sans text-xs leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                              <span className="text-foreground font-sans text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
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
            {processSteps.map((step, index) => <div key={index} className="text-center">
                <span className="text-5xl md:text-6xl font-serif text-amber-700 dark:text-primary/20 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  {step.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="section-padding bg-background border-t border-border/30">
        <div className="container-luxury">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">
              Engagement Models
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
              Choose Your Path Forward
            </h2>
          </div>

          {/* Premium Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* The Strategy Tier */}
            <div className="flex flex-col p-6 sm:p-8 rounded-lg bg-white/80 dark:bg-white/5 border border-border/30 dark:border-amber-500/30 shadow-xl dark:shadow-none transition-all duration-300 hover:shadow-2xl dark:hover:border-amber-500/50">
              <span className="text-muted-foreground dark:text-muted-foreground font-sans text-xs uppercase tracking-[0.2em] mb-4">
                The Strategy
              </span>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-serif text-foreground">₹25,000</span>
                <span className="text-muted-foreground font-sans text-sm ml-2">/project</span>
              </div>
              <p className="text-muted-foreground font-sans text-sm mb-6">
                Perfect for brands seeking strategic clarity and direction.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Brand Audit & Analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Market Positioning Strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Content Calendar (1 Month)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Competitor Analysis Report</span>
                </li>
              </ul>
              <Link 
                to="/contact" 
                className="w-full text-center py-3 sm:py-4 rounded-full border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Choose Strategy
              </Link>
            </div>

            {/* The Growth Tier - Featured */}
            <div className="flex flex-col p-6 sm:p-8 rounded-lg bg-white/80 dark:bg-white/5 border-2 border-primary dark:border-primary shadow-xl dark:shadow-none transition-all duration-300 hover:shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground font-sans text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <span className="text-muted-foreground dark:text-muted-foreground font-sans text-xs uppercase tracking-[0.2em] mb-4">
                The Growth
              </span>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-serif text-foreground">₹50,000</span>
                <span className="text-muted-foreground font-sans text-sm ml-2">/month</span>
              </div>
              <p className="text-muted-foreground font-sans text-sm mb-6">
                For brands ready to scale with consistent creative output.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Everything in Strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Social Media Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">20 Custom Creatives/Month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Monthly Performance Reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Community Management</span>
                </li>
              </ul>
              <Link 
                to="/contact" 
                className="w-full text-center py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
              >
                Choose Growth
              </Link>
            </div>

            {/* The Domination Tier */}
            <div className="flex flex-col p-6 sm:p-8 rounded-lg bg-white/80 dark:bg-white/5 border border-border/30 dark:border-amber-500/30 shadow-xl dark:shadow-none transition-all duration-300 hover:shadow-2xl dark:hover:border-amber-500/50">
              <span className="text-muted-foreground dark:text-muted-foreground font-sans text-xs uppercase tracking-[0.2em] mb-4">
                The Domination
              </span>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-serif text-foreground">₹1,00,000</span>
                <span className="text-muted-foreground font-sans text-sm ml-2">/month</span>
              </div>
              <p className="text-muted-foreground font-sans text-sm mb-6">
                Full-service partnership for brands demanding market leadership.
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Everything in Growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Performance Marketing (Ads)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Influencer Collaborations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">PR & Media Outreach</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Dedicated Account Manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-foreground font-sans text-sm">Priority Support (24/7)</span>
                </li>
              </ul>
              <Link 
                to="/contact" 
                className="w-full text-center py-3 sm:py-4 rounded-full border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Choose Domination
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 sm:mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
            Let's discuss how our services can help you achieve your business goals.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300">JOIN THE KULT</Link>
        </div>
      </section>
    </Layout>;
};
export default Services;