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
import lightroom from "@/assets/clients/lightroom.png";
import rawat from "@/assets/clients/rawat.png";
import parnicaa from "@/assets/clients/parnicaa.png";
import mBar from "@/assets/clients/m-bar.jpg";
import thatPlace from "@/assets/clients/that-place.png";
import thePark from "@/assets/clients/the-park.png";
import clubKolkataMixtape from "@/assets/clients/club-kolkata-mixtape.png";
import norlingRetreat from "@/assets/clients/norling-retreat.png";
import lenskart from "@/assets/clients/lenskart.png";

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
    { id: 11, name: "Lightroom", logo: lightroom },
    { id: 12, name: "Rawat", logo: rawat },
    { id: 13, name: "Parnicaa", logo: parnicaa },
    { id: 14, name: "M Bar", logo: mBar },
    { id: 15, name: "That Place", logo: thatPlace },
    { id: 16, name: "The Park Kolkata", logo: thePark },
    { id: 17, name: "Club Kolkata Mixtape", logo: clubKolkataMixtape },
    { id: 18, name: "Norling Retreat Hotel", logo: norlingRetreat },
    { id: 19, name: "Lenskart", logo: lenskart },
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
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full aspect-square overflow-hidden bg-muted/50 border border-white/20 flex items-center justify-center p-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full"
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
