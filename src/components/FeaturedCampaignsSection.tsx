import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const campaigns = [
  {
    id: 1,
    title: "Taylor Swift Night",
    subtitle: "Event Strategy",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Mixtape Booze Fest",
    subtitle: "Brand Activation",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Experience Bengal",
    subtitle: "Tourism Campaign",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Club Kolkata",
    subtitle: "Social Media",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "The Black Cat",
    subtitle: "Launch Campaign",
    image: "/placeholder.svg",
  },
];

const FeaturedCampaignsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between px-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Featured Campaigns
          </h2>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex-shrink-0 w-[85vw] md:w-[350px] snap-start"
            >
              {/* Image Container */}
              <div className="rounded-2xl overflow-hidden bg-muted mb-4">
                <AspectRatio ratio={3 / 4}>
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              {/* Text Below Image */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {campaign.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {campaign.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaignsSection;
