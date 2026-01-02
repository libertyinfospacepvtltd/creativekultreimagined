import { Instagram, Facebook, Globe } from "lucide-react";

const divisions = [
  {
    name: "EasyDo 365",
    description: "Productivity & lifestyle app",
    website: "https://easydo365.com/",
    instagram: "https://www.instagram.com/easydo_365/",
    facebook: "https://www.facebook.com/Easydo365app",
    logo: "https://canvas-kolkata-vibe.lovable.app/assets/easydo365-logo-CI69kmpV.png",
  },
  {
    name: "12thPass.ai",
    description: "AI-powered education platform",
    website: "https://www.12thpass.ai/",
    instagram: "https://www.instagram.com/12thpass.ai/",
    facebook: "https://www.facebook.com/12thPassAI",
    logo: "https://canvas-kolkata-vibe.lovable.app/assets/12thpass-logo-DhXy1KrN.png",
  },
  {
    name: "Major Colors",
    description: "Premium design solutions",
    website: "https://majorcolors.com/",
    logo: "https://canvas-kolkata-vibe.lovable.app/assets/majorcolours-logo-C9dMwmvs.png",
  },
];

const DivisionsSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
            Divisions We Power
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            We drive the creative vision for Liberty Infospace's innovative digital products.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <div 
              key={index}
              className="group bg-background border border-border/30 p-8 text-center hover:border-primary/30 transition-all duration-500"
            >
              {/* Circular white logo container */}
              <div className="bg-white rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center p-6">
                <a 
                  href={division.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full flex items-center justify-center"
                >
                  <img
                    src={division.logo}
                    alt={division.name}
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">
                {division.name}
              </h3>
              <p className="text-muted-foreground font-sans text-sm mb-6">
                {division.description}
              </p>
              <div className="flex items-center justify-center gap-4">
                {division.website && (
                  <a
                    href={division.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Visit ${division.name} website`}
                  >
                    <Globe size={18} />
                  </a>
                )}
                {division.instagram && (
                  <a
                    href={division.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Visit ${division.name} Instagram`}
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {division.facebook && (
                  <a
                    href={division.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Visit ${division.name} Facebook`}
                  >
                    <Facebook size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
