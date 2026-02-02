import { useState, useCallback, useEffect } from "react";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import taylorSwiftNight from "@/assets/events/taylor-swift-night.jpg";
import aiburobhaat from "@/assets/events/aiburobhaat.jpg";

// Taylor Swift Night media imports
import taylorSwiftVideo from "@/assets/events/taylor-swift-video.mp4";
import carousel1 from "@/assets/events/carousel-1.png";
import carousel2 from "@/assets/events/carousel-2.png";
import carousel3 from "@/assets/events/carousel-3.png";
import carousel4 from "@/assets/events/carousel-4.png";
import carousel5 from "@/assets/events/carousel-5.png";
import carousel6 from "@/assets/events/carousel-6.png";
import posterSaif from "@/assets/events/taylor-swift-poster-saif.jpg";
import poster23Jun from "@/assets/events/taylor-swift-poster-23jun.jpg";

interface MediaItem {
  id: number;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
}

interface Event {
  id: number;
  title: string;
  image: string;
  gallery: MediaItem[];
  // Bento-specific layout for Taylor Swift Night
  bentoLayout?: {
    verticalVideo: string;
    carouselImages: string[];
    squarePhotos: string[];
  };
}

const events: Event[] = [
  {
    id: 1,
    title: "Taylor Swift Night x Lightroom",
    image: taylorSwiftNight,
    gallery: [],
    bentoLayout: {
      verticalVideo: taylorSwiftVideo,
      carouselImages: [
        carousel1,
        carousel2,
        carousel3,
        carousel4,
        carousel5,
        carousel6,
      ],
      squarePhotos: [posterSaif, poster23Jun],
    },
  },
  {
    id: 2,
    title: "Aiburobhaat",
    image: aiburobhaat,
    gallery: [
      { id: 1, type: "image", src: "/placeholder.svg" },
      { id: 2, type: "image", src: "/placeholder.svg" },
      { id: 3, type: "video", src: "", thumbnail: "/placeholder.svg" },
      { id: 4, type: "image", src: "/placeholder.svg" },
      { id: 5, type: "image", src: "/placeholder.svg" },
      { id: 6, type: "video", src: "", thumbnail: "/placeholder.svg" },
    ],
  },
];

// Carousel component for the photo carousel
const PhotoCarousel = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-full w-full group/carousel">
      <div className="overflow-hidden h-full rounded-2xl" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-contain bg-black"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-primary w-4"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Bento Grid layout for Taylor Swift Night
const TaylorSwiftBentoGrid = ({ layout }: { layout: NonNullable<Event["bentoLayout"]> }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Column 1: Vertical Video (9:16, row-span-2) */}
      <div className="md:row-span-2 aspect-[9/16] md:aspect-auto rounded-2xl overflow-hidden bg-black">
        <video
          src={layout.verticalVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Column 2: Photo Carousel (3:4, row-span-2) */}
      <div className="md:row-span-2 aspect-[3/4] md:aspect-auto rounded-2xl overflow-hidden bg-black relative">
        <PhotoCarousel images={layout.carouselImages} />
      </div>

      {/* Column 3: Two stacked square photos */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative group/square">
        <img
          src={layout.squarePhotos[0]}
          alt="Taylor Swift Event Poster - Saif Ahmed"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/square:scale-110"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover/square:bg-primary/10 transition-colors" />
      </div>

      <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative group/square">
        <img
          src={layout.squarePhotos[1]}
          alt="Taylor Swift Event Poster - 23 Jun"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/square:scale-110"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover/square:bg-primary/10 transition-colors" />
      </div>
    </div>
  );
};

// Standard grid layout for other events
const StandardGalleryGrid = ({ gallery }: { gallery: MediaItem[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {gallery.map((item) => (
        <div
          key={item.id}
          className="relative aspect-square rounded-xl overflow-hidden bg-muted group/item cursor-pointer"
        >
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={`Gallery item ${item.id}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={`Video thumbnail ${item.id}`}
                className="w-full h-full object-cover"
              />
              {/* Video Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/item:bg-black/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover/item:bg-primary/10 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <Layout>
      <section className="min-h-screen py-20 md:py-32">
        <div className="container-luxury">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-foreground mb-6">
              Our Events
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the culture, creativity, and community we bring to life.
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => setSelectedEvent(event)}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-white drop-shadow-lg">
                    {event.title}
                  </h2>
                  <p className="text-white/70 mt-2 text-sm md:text-base">
                    Click to view gallery
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedEvent(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background/95 rounded-2xl border border-primary/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-primary hover:bg-black/70 transition-colors duration-200"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-primary/10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-foreground">
                  {selectedEvent.title}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {selectedEvent.bentoLayout
                    ? `Gallery • ${selectedEvent.bentoLayout.carouselImages.length + selectedEvent.bentoLayout.squarePhotos.length + 1} items`
                    : `Gallery • ${selectedEvent.gallery.length} items`}
                </p>
              </div>

              {/* Media Grid - Bento or Standard */}
              <div className="p-6 md:p-8">
                {selectedEvent.bentoLayout ? (
                  <TaylorSwiftBentoGrid layout={selectedEvent.bentoLayout} />
                ) : (
                  <StandardGalleryGrid gallery={selectedEvent.gallery} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Events;
