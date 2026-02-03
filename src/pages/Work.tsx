import { Link } from "react-router-dom";
import { Instagram, Facebook, Globe, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import FeaturedCampaignsSection from "@/components/FeaturedCampaignsSection";

const projects = [{
  id: "easydo365",
  name: "EasyDo 365",
  category: "HRMS App",
  description: "End-to-end creative strategy and content production for a productivity app, focusing on user engagement and app downloads.",
  tags: ["Content Production", "Social Media", "Video Marketing"],
  results: ["200% increase in app downloads", "4.5 star rating maintained", "Viral content reaching 1M+ views"],
  logo: "https://canvas-kolkata-vibe.lovable.app/assets/easydo365-logo-CI69kmpV.png",
  website: "https://easydo365.com/",
  instagram: "https://www.instagram.com/easydo_365/",
  facebook: "https://www.facebook.com/Easydo365app"
}, {
  id: "12thpass",
  name: "12thPass.ai",
  category: "Education Technology",
  description: "Complete brand identity, social media management, and performance marketing for an AI-powered education platform targeting students across India.",
  tags: ["Social Media", "Performance Marketing", "Brand Strategy"],
  results: ["300% increase in social engagement", "50K+ organic followers", "2x lead generation improvement"],
  logo: "https://canvas-kolkata-vibe.lovable.app/assets/12thpass-logo-DhXy1KrN.png",
  website: "https://www.12thpass.ai/",
  instagram: "https://www.instagram.com/12thpass.ai/",
  facebook: "https://www.facebook.com/12thPassAI"
}];
const trustedBy = [{
  name: "Liberty Infospace",
  url: "https://libertyinfospace.com/"
}, {
  name: "12thPass.ai",
  url: "https://www.12thpass.ai/"
}, {
  name: "EasyDo 365",
  url: "https://easydo365.com/"
}];
const Work = () => {
  return <Layout>
      {/* Page Header */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-10 md:pt-20 md:pb-14 bg-background">
        <div className="container-luxury">
          <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-foreground mb-3 sm:mb-6">
            ​Highlights 
          </h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-sm sm:text-base lg:text-lg">
            A curated collection of projects that showcase our creative capabilities.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section-padding bg-background my-0">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {projects.map(project => <div key={project.id} className="group relative h-80 lg:h-96 rounded-3xl bg-white/5 dark:bg-white/5 bg-card border border-border/30 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                {/* Logo - Centered */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className={`w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-90 group-hover:opacity-30 ${project.id === "12thpass" ? "p-0" : "p-4 lg:p-6"}`}>
                    <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-sans uppercase tracking-wider rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6">
                  {/* Project Name */}
                  <h3 className="text-white font-sans text-2xl lg:text-3xl font-semibold mb-2 text-center">
                    {project.name}
                  </h3>
                  <p className="text-white/60 font-sans text-sm mb-6 text-center">
                    {project.category}
                  </p>

                  {/* Social Icons */}
                  <div className="flex items-center gap-4 mb-6">
                    {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                        <Globe size={18} />
                      </a>}
                    {project.instagram && <a href={project.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                        <Instagram size={18} />
                      </a>}
                    {project.facebook && <a href={project.facebook} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                        <Facebook size={18} />
                      </a>}
                  </div>

                  {/* View Case Study Button */}
                  <Link to={`/work/${project.id}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    View Case Study
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <ClientLogosMarquee />

      {/* Featured Campaigns */}
      <FeaturedCampaignsSection />

      {/* Trusted By */}
      <section className="py-16 bg-card border-t border-border/30">
        <div className="container-luxury">
          <h3 className="text-center text-muted-foreground font-sans text-sm uppercase tracking-widest mb-8">
            Trusted By
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustedBy.map((brand, index) => <a key={index} href={brand.url} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary font-sans text-lg font-medium transition-colors">
                {brand.name}
              </a>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Want to Be Our Next Success Story?
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-10">
            Let's collaborate and create something extraordinary for your brand.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            JOIN THE KULT
          </Link>
        </div>
      </section>
    </Layout>;
};
export default Work;