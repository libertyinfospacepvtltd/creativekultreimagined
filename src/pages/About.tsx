import { Link } from "react-router-dom";
import { Heart, Users, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
const values = [{
  icon: Heart,
  title: "Passion-Driven",
  description: "We pour our heart into every project, treating your brand as our own."
}, {
  icon: Users,
  title: "Collaborative",
  description: "We believe the best work comes from true partnerships with our clients."
}, {
  icon: Award,
  title: "Excellence",
  description: "We set the bar high and consistently deliver beyond expectations."
}, {
  icon: MapPin,
  title: "Rooted in Kolkata",
  description: "We draw inspiration from our city's rich artistic heritage and cultural depth."
}];
const team = [{
  name: "Payel Das",
  role: "Creative Head",
  specialty: "Vision & Strategy",
  description: "A creative visionary with 4+ years of experience crafting compelling brand narratives.",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face"
}, {
  name: "Sreyash Banerjee",
  role: "Marketing Head",
  specialty: "Growth & Performance",
  description: "Data-driven strategist turning insights into measurable business outcomes.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
}, {
  name: "Palash Kanti Giri",
  role: "Design Head",
  specialty: "Visual Excellence",
  description: "Crafting stunning visual identities that capture brand essence.",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
}];
const About = () => {
  return <Layout>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 md:pt-40 md:pb-20 bg-background py-[20px]">
        <div className="container-luxury">
          <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Our Story</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4 sm:mb-6">Born in Kolkata,<br />Built for the World</h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-base sm:text-lg">Creative Kult is the creative powerhouse behind Liberty Infospace's digital ventures.</p>
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-4 sm:mb-6">The Creative Kult Story</h2>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
                <p>Founded as the creative arm of Liberty Infospace Pvt. Ltd., Creative Kult emerged from a simple belief: that great ideas deserve exceptional execution.</p>
                <p>Our roots in Kolkata—the City of Joy—infuse our work with a unique blend of artistic sensibility and cultural depth.</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img src="https://canvas-kolkata-vibe.lovable.app/assets/creative-kult-story-logo-BWnpSHrr.png" alt="Creative Kult Logo" className="w-48 sm:w-72 md:w-96 lg:w-[480px] h-auto opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 sm:mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => <div key={index} className="text-center p-6 sm:p-8 border border-border/30 hover:border-primary/30 transition-colors duration-300 px-[25px] py-[15px]">
                <value.icon size={28} className="text-primary mx-auto mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-serif text-foreground mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-muted-foreground font-sans text-xs sm:text-sm">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[hsl(220,15%,8%)] border-t border-border/30">
        <div className="container-luxury">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 sm:mb-4 block">The Team</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 sm:mb-4">Creative Minds United</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {team.map((member, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.15
          }} viewport={{
            once: true
          }} className="group relative">
                <div className="relative h-72 sm:h-80 lg:h-[420px] overflow-hidden rounded-sm border border-foreground/10 bg-[hsl(220,15%,6%)] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]">
                  {/* Portrait image - always visible */}
                  <div className="absolute inset-0 z-10">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" onError={e => {
                  // Fallback to placeholder avatar if image fails
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=1a1a1a&color=d4af37&font-size=0.4`;
                }} />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,15%,6%)] via-[hsl(220,15%,6%)]/40 to-transparent" />
                  </div>
                  
                  {/* Text content - positioned at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end items-center p-6 sm:p-8 text-center z-20">
                    <span className="text-primary/80 font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-2 sm:mb-3">{member.specialty}</span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-foreground mb-1 sm:mb-2">{member.name}</h3>
                    <p className="text-muted-foreground font-sans text-xs sm:text-sm">{member.role}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 sm:mb-6">Ready to Join the Kult?</h2>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 min-h-[44px]">Get in Touch</Link>
        </div>
      </section>
    </Layout>;
};
export default About;