import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Megaphone, Target, Palette, Camera, Lightbulb, 
  Newspaper, PenTool, FileText, Check 
} from "lucide-react";
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
      "Platform-Specific Optimization",
    ],
  },
  {
    id: "performance",
    icon: Target,
    title: "Performance Marketing",
    description: "Data-driven ad campaigns focused on results—more clicks, more conversions, more ROI.",
    features: [
      "Google & Meta Ads",
      "Conversion Tracking",
      "A/B Testing & Optimization",
      "ROI-Focused Campaigns",
    ],
  },
  {
    id: "branding",
    icon: Palette,
    title: "Offline Branding",
    description: "From print to packaging, we build bold offline identities that make your brand unforgettable in the real world.",
    features: [
      "Logo & Visual Identity",
      "Print Collateral Design",
      "Packaging Design",
      "Environmental Graphics",
    ],
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photoshoot & Videography",
    description: "High-quality visuals tailored to your brand—product shoots, lifestyle content, reels, and everything in between.",
    features: [
      "Product Photography",
      "Lifestyle & Brand Shoots",
      "Video Production",
      "Reels & Short-Form Content",
    ],
  },
  {
    id: "strategy",
    icon: Lightbulb,
    title: "Brand Strategy",
    description: "Building strong brand foundations through research, positioning, and strategic planning.",
    features: [
      "Market Research",
      "Brand Positioning",
      "Competitor Analysis",
      "Growth Strategy",
    ],
  },
  {
    id: "pr",
    icon: Newspaper,
    title: "Public Relations",
    description: "Amplifying your brand's voice through strategic media relations and storytelling.",
    features: [
      "Press Releases",
      "Media Outreach",
      "Crisis Management",
      "Event PR",
    ],
  },
  {
    id: "design",
    icon: PenTool,
    title: "Creative Design",
    description: "Stunning visual solutions that capture attention and communicate your brand story effectively.",
    features: [
      "Graphic Design",
      "UI/UX Design",
      "Motion Graphics",
      "Illustration",
    ],
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Production",
    description: "End-to-end content creation from ideation to execution across all formats.",
    features: [
      "Copywriting",
      "Blog & Article Writing",
      "Script Writing",
      "Social Media Content",
    ],
  },
];

const processSteps = [
  { number: "01", title: "Discovery", description: "Understanding your brand, goals, and audience" },
  { number: "02", title: "Strategy", description: "Crafting a tailored approach for maximum impact" },
  { number: "03", title: "Execute", description: "Bringing the strategy to life with precision" },
  { number: "04", title: "Optimize", description: "Continuous improvement based on real data" },
];

const Services = () => {
  const [activeService, setActiveService] = useState(services[0].id);
  const currentService = services.find(s => s.id === activeService) || services[0];

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

      {/* Service Tabs */}
      <section className="py-4 bg-card border-y border-border/30 overflow-x-auto scrollbar-hide">
        <div className="container-luxury">
          <div className="flex items-center gap-6 min-w-max">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 py-4 px-3 font-sans text-sm transition-all duration-300 border-b-2 ${
                  activeService === service.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <service.icon size={18} />
                <span className="hidden sm:inline">{service.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-fade-in" key={activeService}>
            {/* Left - Info */}
            <div>
              <currentService.icon 
                size={48} 
                className="text-primary mb-8" 
              />
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {currentService.title}
              </h2>
              <p className="text-muted-foreground font-sans leading-relaxed text-lg">
                {currentService.description}
              </p>
            </div>

            {/* Right - Features */}
            <div className="bg-card border border-border/30 p-8 md:p-12">
              <h4 className="text-primary font-sans text-xs uppercase tracking-widest mb-8">
                What's Included
              </h4>
              <ul className="space-y-4">
                {currentService.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 text-foreground font-sans"
                  >
                    <Check size={18} className="text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
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
