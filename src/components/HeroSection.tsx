import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/creative-kult-logo.png";
import heroImage from "@/assets/victoria-memorial-hero.jpg";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position relative to center (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(1.1)`,
        }}
      >
        <img
          src={heroImage}
          alt="Victoria Memorial Kolkata"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Rotating Radar Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-radar-rotate">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
              style={{
                width: `${i * 150}px`,
                height: `${i * 150}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Pulsing Radar Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: "100px",
              height: "100px",
              animation: `radar-pulse 4s linear infinite`,
              animationDelay: `${i * 1.3}s`,
            }}
          />
        ))}
      </div>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        >
          <img
            src={logo}
            alt="Creative Kult"
            className="w-48 md:w-64 lg:w-80 h-auto animate-float"
          />
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/work"
            className="px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Explore Our Work
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
          >
            Join the Kult
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-xs font-sans uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
