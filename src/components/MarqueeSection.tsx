import { Link } from "react-router-dom";

const MarqueeSection = () => {
  const text = "CREATIVE • KULT • KOLKATA • VIBE • ";
  const repeatedText = text.repeat(10);

  return (
    <section className="py-4 sm:py-6 bg-card border-y border-border/30 overflow-hidden">
      <Link to="/contact" className="block">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-primary font-serif text-base sm:text-xl md:text-2xl tracking-wider inline-block">
            {repeatedText}
          </span>
          <span className="text-primary font-serif text-base sm:text-xl md:text-2xl tracking-wider inline-block">
            {repeatedText}
          </span>
        </div>
      </Link>
    </section>
  );
};

export default MarqueeSection;