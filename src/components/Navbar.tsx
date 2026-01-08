import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import logoDark from "@/assets/creative-kult-logo.png";
import logoLight from "@/assets/creative-kult-logo-black.png";
import { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

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

// Mobile menu overlay component - shared between home and non-home pages
const MobileMenuOverlay = ({ 
  isOpen, 
  onClose, 
  currentPath 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentPath: string;
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - full black with blur */}
          <motion.div
            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          {/* Menu Content - slides from top */}
          <motion.div 
            className="md:hidden fixed inset-0 bg-background z-[60]"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[70] p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <X size={28} />
            </button>
            
            <ul className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 pt-safe">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className={`text-2xl sm:text-3xl font-serif tracking-wide transition-colors duration-300 min-h-[44px] flex items-center ${
                      currentPath === link.href
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              
              {/* Theme Toggle at bottom of mobile menu */}
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.4 }}
                className="mt-4 pt-4 border-t border-border/20"
              >
                <ThemeToggle className="min-h-[44px] min-w-[44px]" />
              </motion.li>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ showNavbar = true }: NavbarProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = location.pathname === "/";
  const { theme } = useTheme();
  
  // For non-home pages, use theme-appropriate logo
  const logo = theme === "dark" ? logoDark : logoLight;

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

  const handleClose = useCallback(() => {
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
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <nav className="container-luxury flex items-center justify-between h-14 sm:h-16">
            {/* Logo - persistent */}
            <Link to="/" className="relative z-10">
              <img 
                src={logo} 
                alt="Creative Kult" 
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-8">
              {/* Theme Toggle - left of Home */}
              <li>
                <ThemeToggle />
              </li>
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
              className="md:hidden relative z-[65] p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>
          </nav>
        </header>
        
        {/* Mobile Navigation Overlay */}
        <MobileMenuOverlay 
          isOpen={isOpen} 
          onClose={handleClose} 
          currentPath={location.pathname} 
        />
      </>
    );
  }

  // Listen for handshake event from DockingLogo
  const [dockingComplete, setDockingComplete] = useState(false);
  
  useEffect(() => {
    const handleHandshake = (e: CustomEvent<{ complete: boolean }>) => {
      setDockingComplete(e.detail.complete);
    };
    
    window.addEventListener('docking-handshake', handleHandshake as EventListener);
    return () => window.removeEventListener('docking-handshake', handleHandshake as EventListener);
  }, []);

  // Chameleon navbar logo: white during hero view, switches to black after docking (in light mode)
  // During hero view (before docking), navbar bg is transparent over dark hero, so use white logo
  // After docking, navbar has its own bg, so use theme-appropriate logo
  const homeNavbarLogo = dockingComplete 
    ? (theme === "dark" ? logoDark : logoLight)
    : logoDark; // Always white before docking since hero is dark-styled

  // Home page - animated navbar that reveals after hero scroll
  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/20"
        style={{
          pointerEvents: showNavbar ? "auto" : "none",
        }}
      >
        {/* Animated background */}
        <motion.div 
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          style={{ opacity: navBgOpacity }}
        />
        
        {/* Border that fades in */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-border/20"
          style={{ opacity: navBgOpacity }}
        />
        
        <nav className="container-luxury flex items-center justify-between h-14 sm:h-16 relative">
          {/* Invisible Anchor Logo - opacity 0 by default, shows ONLY after handshake */}
          <Link 
            to="/" 
            id="navbar-logo-anchor"
            className="relative z-10"
            style={{ 
              opacity: dockingComplete ? 1 : 0, 
              pointerEvents: dockingComplete ? 'auto' : 'none',
              transition: 'opacity 0.05s ease-out'
            }}
          >
            <img 
              src={homeNavbarLogo} 
              alt="Creative Kult" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation - fades in after logo docks */}
          <motion.ul 
            className="hidden md:flex items-center gap-4 lg:gap-8"
            style={{ opacity: navOpacity }}
          >
            {/* Theme Toggle - left of Home */}
            <li>
              <ThemeToggle />
            </li>
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
            className="md:hidden relative z-[65] p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            style={{ opacity: navOpacity }}
          >
            <Menu size={24} />
          </motion.button>
        </nav>
      </motion.header>
      
      {/* Mobile Navigation Overlay */}
      <MobileMenuOverlay 
        isOpen={isOpen} 
        onClose={handleClose} 
        currentPath={location.pathname} 
      />
    </>
  );
};

export default Navbar;
