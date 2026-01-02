import { ReactNode, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnRouteChange from "./ScrollToTopOnRouteChange";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import DockingLogo from "./DockingLogo";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [preloaderVisible, setPreloaderVisible] = useState(isHomePage);
  const [preloaderComplete, setPreloaderComplete] = useState(!isHomePage);

  // Called when logo reveal animation finishes - instant transition
  const handleRevealComplete = useCallback(() => {
    setPreloaderVisible(false);
    setPreloaderComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Black Overlay - Middle Layer (z-40) */}
      <Preloader isVisible={preloaderVisible} />
      
      {/* Film grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Docking Logo - Top Layer (z-50) - Always present on homepage, handles both preloader animation and scroll docking */}
      {isHomePage && (
        <DockingLogo 
          isPreloading={!preloaderComplete}
          onRevealComplete={handleRevealComplete}
        />
      )}
      
      <Navbar showNavbar={preloaderComplete} />
      <main className="pt-14 sm:pt-16 md:pt-0">{children}</main>
      <Footer />
      <ScrollToTop />
      <ScrollToTopOnRouteChange />
      <CustomCursor />
    </div>
  );
};

export default Layout;
