import { Link } from "react-router-dom";
import { 
  Megaphone, Target, Palette, Camera, Lightbulb, 
  Newspaper, PenTool, FileText
} from "lucide-react";
import Layout from "@/components/Layout";

const services = [
  {
    id: "social-media",
    icon: Megaphone,
    title: "Social Media Marketing",
  },
  {
    id: "performance",
    icon: Target,
    title: "Performance Marketing",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Offline Branding",
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photoshoot & Videography",
  },
  {
    id: "strategy",
    icon: Lightbulb,
    title: "Brand Strategy",
  },
  {
    id: "pr",
    icon: Newspaper,
    title: "Public Relations",
  },
  {
    id: "design",
    icon: PenTool,
    title: "Creative Design",
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Production",
  },
];

const processSteps = [
  { number: "01", title: "Discovery", description: "Understanding your brand, goals, and audience" },
  { number: "02", title: "Strategy", description: "Crafting a tailored approach for maximum impact" },
  { number: "03", title: "Execute", description: "Bringing the strategy to life with precision" },
  { number: "04", title: "Optimize", description: "Continuous improvement based on real data" },
];

const Services = () => {
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
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col items-center justify-center py-10 px-6 border border-foreground/10 transition-all duration-300 hover:bg-foreground/5"
              >
                {/* Icon */}
                <service.icon 
                  className="w-8 h-8 text-muted-foreground transition-colors duration-300 group-hover:text-primary mb-4"
                  strokeWidth={1.5}
                />
                
                {/* Title */}
                <h3 className="text-foreground text-center font-serif text-base md:text-lg font-medium transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-card border-t border-border/30 mt-16">
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
