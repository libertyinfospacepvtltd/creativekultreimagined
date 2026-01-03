import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Globe } from "lucide-react";
import Layout from "@/components/Layout";
const projects = [{
  id: "easydo365",
  name: "EasyDo 365",
  category: "Productivity App",
  description: "End-to-end creative strategy and content production for a lifestyle and productivity app, focusing on user engagement and app downloads.",
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
}, {
  id: "majorcolors",
  name: "Major Colors",
  category: "Design Studio",
  description: "Brand positioning and digital presence for a premium design solutions company, establishing thought leadership in the creative industry.",
  tags: ["Brand Strategy", "Digital Presence", "Content Marketing"],
  results: ["Premium brand positioning", "Industry recognition", "High-value client acquisition"],
  logo: "https://canvas-kolkata-vibe.lovable.app/assets/majorcolours-logo-C9dMwmvs.png",
  website: "https://majorcolors.com/"
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
}, {
  name: "Major Colors",
  url: "https://majorcolors.com/"
}];
const Work = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  return <Layout>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background py-[15px]">
        <div className="container-luxury">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            The Showreel
          </h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-lg">
            A curated collection of campaigns and projects that showcase our creative capabilities and deliver measurable results.
          </p>
        </div>
      </section>

      {/* Project Tabs */}
      <section className="py-4 bg-card border-y border-border/30 overflow-x-auto scrollbar-hide">
        <div className="container-luxury">
          <div className="flex items-center gap-8 min-w-max">
            {projects.map(project => <button key={project.id} onClick={() => setActiveProject(project.id)} className={`flex items-center gap-3 py-4 transition-all duration-300 ${activeProject === project.id ? "opacity-100" : "opacity-50 hover:opacity-75"}`}>
                <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden ${project.id === "12thpass" ? "p-0" : "p-2"}`}>
                  <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="block text-foreground font-sans text-sm font-medium">
                    {project.name}
                  </span>
                  <span className="block text-muted-foreground font-sans text-xs">
                    {project.category}
                  </span>
                </div>
              </button>)}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {projects.map(project => <div key={project.id} className={`${activeProject === project.id ? "block animate-fade-in" : "hidden"}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left - Info */}
                <div>
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-block mb-8">
                    <div className={`w-40 h-40 bg-white rounded-full flex items-center justify-center overflow-hidden ${project.id === "12thpass" ? "p-0" : "p-6"}`}>
                      <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                    </div>
                  </a>
                  <span className="text-primary font-sans text-xs uppercase tracking-widest mb-4 block">
                    Case Study
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                    {project.name}
                  </h2>
                  <p className="text-muted-foreground font-sans leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-card border border-border/30 text-muted-foreground font-sans text-xs">
                        {tag}
                      </span>)}
                  </div>
                  <div className="flex items-center gap-4">
                    {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Globe size={20} />
                      </a>}
                    {project.instagram && <a href={project.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram size={20} />
                      </a>}
                    {project.facebook && <a href={project.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Facebook size={20} />
                      </a>}
                  </div>
                </div>

                {/* Right - Results */}
                <div className="bg-card border border-border/30 p-8 md:p-12">
                  <h4 className="text-primary font-sans text-xs uppercase tracking-widest mb-8">
                    Key Results
                  </h4>
                  <ul className="space-y-6">
                    {project.results.map((result, index) => <li key={index} className="text-foreground font-serif text-xl md:text-2xl border-b border-border/30 pb-6 last:border-0 last:pb-0">
                        {result}
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>)}
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-card border-t border-border/30">
        <div className="container-luxury">
          <h3 className="text-center text-muted-foreground font-sans text-sm uppercase tracking-widest mb-8">
            Trusted By
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustedBy.map((brand, index) => <a key={index} href={brand.url} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary font-serif text-lg transition-colors">
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
          <Link to="/contact" className="inline-block px-10 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300">JOIN THE KULT</Link>
        </div>
      </section>
    </Layout>;
};
export default Work;