import { Link } from "react-router-dom";
import { Heart, Users, Award, MapPin } from "lucide-react";
import Layout from "@/components/Layout";

const values = [
  {
    icon: Heart,
    title: "Passion-Driven",
    description: "We pour our heart into every project, treating your brand as our own.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We believe the best work comes from true partnerships with our clients.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We set the bar high and consistently deliver beyond expectations.",
  },
  {
    icon: MapPin,
    title: "Rooted in Kolkata",
    description: "We draw inspiration from our city's rich artistic heritage and cultural depth.",
  },
];

const team = [
  {
    name: "Payel Das",
    role: "Creative Head",
    specialty: "Vision & Strategy",
    description: "A creative visionary with 4+ years of experience crafting compelling brand narratives and innovative campaigns.",
    image: "https://canvas-kolkata-vibe.lovable.app/assets/creative-head-Bz-5M7Qu.jpg",
  },
  {
    name: "Sreyash Banerjee",
    role: "Marketing Head",
    specialty: "Growth & Performance",
    description: "Data-driven strategist turning insights into measurable business outcomes.",
    image: "https://canvas-kolkata-vibe.lovable.app/assets/marketing-lead-CXJaitgf.jpg",
  },
  {
    name: "Palash Kanti Giri",
    role: "Design Head",
    specialty: "Visual Excellence",
    description: "Crafting stunning visual identities that capture brand essence.",
    image: "https://canvas-kolkata-vibe.lovable.app/assets/design-head-w392veiT.jpg",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container-luxury">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Born in Kolkata,<br />Built for the World
          </h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-lg">
            Creative Kult is the creative powerhouse behind Liberty Infospace's digital ventures. We blend Kolkata's artistic heritage with cutting-edge marketing strategies.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-card border-t border-border/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                The Creative Kult Story
              </h2>
              <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
                <p>
                  Founded as the creative arm of Liberty Infospace Pvt. Ltd., Creative Kult emerged from a simple belief: that great ideas deserve exceptional execution.
                </p>
                <p>
                  Our roots in Kolkata—the City of Joy—infuse our work with a unique blend of artistic sensibility and cultural depth. From the hand-pulled rickshaws to the grand Victoria Memorial, our city inspires us to create work that's both timeless and contemporary.
                </p>
                <p>
                  Today, we power the creative strategies for multiple divisions including 12thPass.ai, EasyDo 365, and Major Colors, while expanding our services to external clients who share our vision for impactful, meaningful marketing.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end" style={{ perspective: "1000px" }}>
              <div className="p-8 group">
                <img
                  src="https://canvas-kolkata-vibe.lovable.app/assets/creative-kult-story-logo-BWnpSHrr.png"
                  alt="Creative Kult Logo"
                  className="w-72 md:w-96 lg:w-[480px] h-auto opacity-90 animate-spin-slow-3d group-hover:[animation-play-state:paused] group-hover:scale-105 transition-transform duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto">
              The principles that guide every campaign, every design, every strategy we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-8 border border-border/30 hover:border-primary/30 transition-colors duration-300"
              >
                <value.icon size={32} className="text-primary mx-auto mb-6" />
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-card border-t border-border/30">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
              The Team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
              Creative Minds United
            </h2>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto">
              A passion for exceptional work drives everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-background border border-border/30 overflow-hidden group"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="p-4">
                  <span className="text-primary font-sans text-[10px] uppercase tracking-widest block mb-1">
                    {member.specialty}
                  </span>
                  <h3 className="text-base font-serif text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground font-sans text-xs">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Ready to Join the Kult?
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-10">
            Let's create something extraordinary together.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
