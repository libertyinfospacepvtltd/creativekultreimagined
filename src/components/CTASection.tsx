import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-padding bg-background border-t border-border/30">
      <div className="container-luxury text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
          Join the Kult of Creativity
        </h2>
        <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-10">
          Ready to transform your brand? Let's create something extraordinary together.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-block px-10 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
          >
            Join the Kult
          </Link>
          <Link
            to="/services"
            className="inline-block px-10 py-4 rounded-full border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
