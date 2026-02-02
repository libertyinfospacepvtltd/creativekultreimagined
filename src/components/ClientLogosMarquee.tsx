import sakshiHandloom from "@/assets/clients/sakshi-handloom.png";
import waterViewResidency from "@/assets/clients/water-view-residency.png";
import royalPalacePuri from "@/assets/clients/royal-palace-puri.png";
import emptyHead from "@/assets/clients/empty-head.png";
import straightUpWithShree from "@/assets/clients/straight-up-with-shree.png";
import clubPavilion from "@/assets/clients/club-pavilion.png";
import ogByTheLake from "@/assets/clients/og-by-the-lake.png";
import carLogo from "@/assets/clients/car-logo.png";
import poach from "@/assets/clients/poach.png";
import debaarun from "@/assets/clients/debaarun.png";

const ClientLogosMarquee = () => {
  const clientLogos = [
    { id: 1, name: "Sakshi Handloom", logo: sakshiHandloom },
    { id: 2, name: "Water View Residency", logo: waterViewResidency },
    { id: 3, name: "Royal Palace Puri", logo: royalPalacePuri },
    { id: 4, name: "Empty Head", logo: emptyHead },
    { id: 5, name: "Straight Up With Shree", logo: straightUpWithShree },
    { id: 6, name: "Club Pavilion", logo: clubPavilion },
    { id: 7, name: "OG By The Lake", logo: ogByTheLake },
    { id: 8, name: "Car Service", logo: carLogo },
    { id: 9, name: "Poach", logo: poach },
    { id: 10, name: "Debaarun", logo: debaarun },
  ];

  // Duplicate the list for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-12 sm:py-16 bg-card border-y border-border/30 overflow-hidden">
      <div className="container-luxury mb-8">
        <h3 className="text-center text-muted-foreground font-sans text-xs sm:text-sm uppercase tracking-widest">
          Brands We've Worked With
        </h3>
      </div>
      
      <div className="relative group">
        <div className="flex animate-scroll-logos group-hover:[animation-play-state:paused]">
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 mx-4 sm:mx-6"
            >
              <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 aspect-square rounded-full bg-background border border-border/30 flex items-center justify-center p-3 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
