import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-padding bg-background border-t border-border/30">
      <div className="container-luxury text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 sm:mb-6">
          Join the Kult of Creativity
        </h2>
        <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base">
          Ready to transform your brand? Let's create something extraordinary together.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:animate-glitch transition-all duration-300 min-h-[44px]"
          >
            Join the Kult
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:animate-glitch transition-all duration-300 min-h-[44px]"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;