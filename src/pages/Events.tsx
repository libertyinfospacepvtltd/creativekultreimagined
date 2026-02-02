import { useState } from "react";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import taylorSwiftNight from "@/assets/events/taylor-swift-night.jpg";
import aiburobhaat from "@/assets/events/aiburobhaat.jpg";

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
}

const events: Event[] = [
  {
    id: 1,
    title: "Taylor Swift Night x Lightroom",
    image: taylorSwiftNight,
    gallery: [
      { id: 1, type: "image", src: "/placeholder.svg" },
      { id: 2, type: "video", src: "", thumbnail: "/placeholder.svg" },
      { id: 3, type: "image", src: "/placeholder.svg" },
      { id: 4, type: "image", src: "/placeholder.svg" },
      { id: 5, type: "video", src: "", thumbnail: "/placeholder.svg" },
      { id: 6, type: "image", src: "/placeholder.svg" },
    ],
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
                  Gallery • {selectedEvent.gallery.length} items
                </p>
              </div>

              {/* Media Grid */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedEvent.gallery.map((item) => (
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
                              <Play className="w-6 h-6 text-primary-foreground ml-1" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary/0 group-hover/item:bg-primary/10 transition-colors duration-300" />
                    </div>
                  ))}
                </div>

                {/* Placeholder Notice */}
                <p className="text-center text-muted-foreground/60 text-sm mt-8 italic">
                  Gallery photos coming soon...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Events;
