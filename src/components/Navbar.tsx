import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on tap outside (backdrop click)
  const handleBackdropClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Scroll progress for navbar reveal (only on home page)
  const { scrollYProgress } = useScroll();
  
  // Navbar background and links fade in only after logo has docked (at scroll 0.15)
  const navOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);
  const navBgOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  // For non-home pages, always show full navbar
  if (!isHomePage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
        <nav className="container-luxury flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <img 
              src={logo} 
              alt="Creative Kult" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`text-xs lg:text-sm tracking-wide uppercase font-sans font-medium transition-colors duration-300 link-underline ${
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
            className="md:hidden relative z-[60] p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation - Fullscreen Overlay */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="md:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleBackdropClick}
                />
                {/* Menu Content */}
                <motion.div 
                  className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-50"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ul className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
                    {navLinks.map((link, index) => (
                      <motion.li 
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-2xl sm:text-3xl font-serif tracking-wide transition-colors duration-300 min-h-[44px] flex items-center ${
                            location.pathname === link.href
                              ? "text-primary"
                              : "text-foreground/70 hover:text-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
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
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        style={{ opacity: navBgOpacity }}
      />
      
      {/* Border that fades in */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-border/20"
        style={{ opacity: navBgOpacity }}
      />
      
      <nav className="container-luxury flex items-center justify-between h-14 sm:h-16 relative">
        {/* Empty space for logo - the DockingLogo component handles this */}
        <div className="h-8 sm:h-10 md:h-12 w-24 sm:w-32 md:w-40" />

        {/* Desktop Navigation - fades in after logo docks */}
        <motion.ul 
          className="hidden md:flex items-center gap-4 lg:gap-8"
          style={{ opacity: navOpacity }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-xs lg:text-sm tracking-wide uppercase font-sans font-medium transition-colors duration-300 link-underline ${
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

        {/* Mobile Menu Button - fades in after logo docks */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[60] p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          style={{ opacity: navOpacity }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Navigation - Fullscreen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleBackdropClick}
              />
              {/* Menu Content */}
              <motion.div 
                className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ul className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-2xl sm:text-3xl font-serif tracking-wide transition-colors duration-300 min-h-[44px] flex items-center ${
                          location.pathname === link.href
                            ? "text-primary"
                            : "text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;