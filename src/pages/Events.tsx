import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import taylorSwiftNight from "@/assets/events/taylor-swift-night.jpg";
import aiburobhaat from "@/assets/events/aiburobhaat.jpg";

const events = [
  {
    id: 1,
    title: "Taylor Swift Night x Lightroom",
    image: taylorSwiftNight,
  },
  {
    id: 2,
    title: "Aiburobhaat",
    image: aiburobhaat,
  },
];

const Events = () => {
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
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-light text-white drop-shadow-lg tracking-wide">
                    {event.title}
                  </h2>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
