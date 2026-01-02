import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";
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
            <div className="flex justify-center lg:justify-end">
              <div className="p-8 group overflow-hidden">
                <img
                  src="https://canvas-kolkata-vibe.lovable.app/assets/creative-kult-story-logo-BWnpSHrr.png"
                  alt="Creative Kult Logo"
                  className="w-72 md:w-96 lg:w-[480px] h-auto opacity-90 transition-all duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
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
      <section className="section-padding bg-[hsl(220,15%,8%)] border-t border-border/30 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-sans text-sm uppercase tracking-[0.3em] mb-4 block">
              The Team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 tracking-wide">
              Creative Minds United
            </h2>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto">
              A passion for exceptional work drives everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-80 lg:h-96 overflow-hidden rounded-sm border border-foreground/10 bg-[hsl(220,15%,6%)] backdrop-blur-sm transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  {/* Portrait image - hidden by default, reveals on hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top opacity-0 blur-sm scale-105 transition-all duration-700 ease-out group-hover:opacity-40 group-hover:blur-0 group-hover:scale-100"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,15%,6%)] via-[hsl(220,15%,6%)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Glassmorphism inner border */}
                  <div className="absolute inset-[1px] rounded-sm border border-foreground/5 pointer-events-none" />

                  {/* Text content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center transition-all duration-500 ease-out group-hover:justify-end group-hover:pb-12">
                    {/* Specialty label */}
                    <span className="text-primary/80 font-sans text-[10px] uppercase tracking-[0.25em] mb-3 transition-all duration-500 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                      {member.specialty}
                    </span>
                    
                    {/* Name */}
                    <h3 className="text-xl lg:text-2xl font-serif text-foreground mb-2 tracking-wide transition-all duration-500">
                      {member.name}
                    </h3>
                    
                    {/* Role */}
                    <p className="text-muted-foreground font-sans text-sm tracking-wide">
                      {member.role}
                    </p>
                  </div>

                  {/* Subtle corner accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-foreground/10 transition-colors duration-500 group-hover:border-primary/40" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-foreground/10 transition-colors duration-500 group-hover:border-primary/40" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-foreground/10 transition-colors duration-500 group-hover:border-primary/40" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-foreground/10 transition-colors duration-500 group-hover:border-primary/40" />
                </div>
              </motion.div>
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
            className="inline-block px-10 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
