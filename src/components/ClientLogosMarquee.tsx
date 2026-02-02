const ClientLogosMarquee = () => {
  // Placeholder logos - will be replaced with actual client logos
  const clientLogos = [
    { id: 1, name: "Client 1", logo: "/placeholder.svg" },
    { id: 2, name: "Client 2", logo: "/placeholder.svg" },
    { id: 3, name: "Client 3", logo: "/placeholder.svg" },
    { id: 4, name: "Client 4", logo: "/placeholder.svg" },
    { id: 5, name: "Client 5", logo: "/placeholder.svg" },
    { id: 6, name: "Client 6", logo: "/placeholder.svg" },
    { id: 7, name: "Client 7", logo: "/placeholder.svg" },
    { id: 8, name: "Client 8", logo: "/placeholder.svg" },
    { id: 9, name: "Client 9", logo: "/placeholder.svg" },
    { id: 10, name: "Client 10", logo: "/placeholder.svg" },
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
              <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 aspect-square rounded-full bg-background border border-border/30 flex items-center justify-center p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
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
