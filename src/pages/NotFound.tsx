import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="container-luxury text-center">
          <span className="text-8xl md:text-9xl font-serif text-primary/20 block mb-6">
            404
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground font-sans mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
