import { Link } from "react-router-dom";
import { Megaphone, Target, Palette, Camera } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Crafting scroll-stopping content and strategies that grow your brand and engage your audience where it matters most.",
  },
  {
    icon: Target,
    title: "Performance Marketing",
    description: "Data-driven ad campaigns focused on results—more clicks, more conversions, more ROI.",
  },
  {
    icon: Palette,
    title: "Offline Branding",
    description: "From print to packaging, we build bold offline identities that make your brand unforgettable in the real world.",
  },
  {
    icon: Camera,
    title: "Photoshoot & Videography",
    description: "High-quality visuals tailored to your brand—product shoots, lifestyle content, reels, and everything in between.",
  },
];

const ServicesPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            From Strategy to Execution
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            We deliver comprehensive creative solutions that drive real business results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-background p-8 md:p-12 group hover:bg-card transition-colors duration-500"
            >
              <service.icon 
                size={32} 
                className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" 
              />
              <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-block px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
