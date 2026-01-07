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
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 sm:mb-6">
            Divisions We Power
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto text-sm sm:text-base">
            We drive the creative vision for Liberty Infospace's innovative digital products.
          </p>
        </div>

        {/* Desktop Grid - unchanged */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <div 
              key={index}
              className="group bg-background border border-border/30 p-8 text-center hover:border-primary/30 transition-all duration-500"
            >
              {/* Circular white logo container */}
              <div className={`bg-white rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center overflow-hidden ${
                division.name === "12thPass.ai" ? "p-0" : "p-6"
              }`}>
                <a 
                  href={division.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full flex items-center justify-center"
                >
                  <img
                    src={division.logo}
                    alt={division.name}
                    className="object-contain w-full h-full"
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
                    className="text-muted-foreground hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    className="text-muted-foreground hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    className="text-muted-foreground hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Visit ${division.name} Facebook`}
                  >
                    <Facebook size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Compact Cards - stacked vertically */}
        <div className="flex md:hidden flex-col gap-4">
          {divisions.map((division, index) => (
            <div 
              key={index}
              className="group bg-background border border-border/30 rounded-2xl overflow-hidden flex items-center gap-4 p-4 text-left hover:border-primary/30 transition-all duration-500"
            >
              {/* Circular white logo container */}
              <div className={`bg-white rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center overflow-hidden ${
                division.name === "12thPass.ai" ? "p-0" : "p-3"
              }`}>
                <a 
                  href={division.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full flex items-center justify-center"
                >
                  <img
                    src={division.logo}
                    alt={division.name}
                    className="object-contain w-full h-full"
                  />
                </a>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-serif text-foreground mb-1">
                  {division.name}
                </h3>
                <p className="text-muted-foreground font-sans text-xs mb-2">
                  {division.description}
                </p>
                <div className="flex items-center gap-3">
                  {division.website && (
                    <a
                      href={division.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Visit ${division.name} website`}
                    >
                      <Globe size={16} />
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
                      <Instagram size={16} />
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
                      <Facebook size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;