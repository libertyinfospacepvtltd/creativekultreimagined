import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/creative-kult-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

interface NavbarProps {
  showNavbar?: boolean;
}

const Navbar = ({ showNavbar = true }: NavbarProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  // Scroll progress for navbar reveal (only on home page)
  const { scrollYProgress } = useScroll();
  
  // Navbar background and links fade in after hero scroll (around 50% of hero)
  const navOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const navBgOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

  // For non-home pages, always show full navbar
  if (!isHomePage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-border/20">
        <nav className="container-luxury flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <img 
              src={logo} 
              alt="Creative Kult" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`text-sm tracking-wide uppercase font-sans font-medium transition-colors duration-300 link-underline ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
              <ul className="flex flex-col items-center justify-center h-full gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-serif tracking-wide transition-colors duration-300 ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </header>
    );
  }

  // Home page - animated navbar that reveals after hero scroll
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/20"
      style={{
        pointerEvents: showNavbar ? "auto" : "none",
      }}
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-background/50 backdrop-blur-md"
        style={{ opacity: navBgOpacity }}
      />
      
      <nav className="container-luxury flex items-center justify-between h-16 relative">
        {/* Logo - fades in after hero scroll */}
        <motion.div style={{ opacity: navOpacity }}>
          <Link to="/" className="relative z-10">
            <img 
              src={logo} 
              alt="Creative Kult" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation - fades in after hero scroll */}
        <motion.ul 
          className="hidden md:flex items-center gap-8"
          style={{ opacity: navOpacity }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-sm tracking-wide uppercase font-sans font-medium transition-colors duration-300 link-underline ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button - fades in after hero scroll */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 p-2 text-foreground"
          aria-label="Toggle menu"
          style={{ opacity: navOpacity }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
            <ul className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-serif tracking-wide transition-colors duration-300 ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;
