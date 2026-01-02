import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import DockingLogo from "./DockingLogo";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [preloaderComplete, setPreloaderComplete] = useState(!isHomePage);

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-background relative">
        {/* Preloader - only on home page, shares layoutId with DockingLogo */}
        <AnimatePresence mode="wait">
          {isHomePage && !preloaderComplete && (
            <Preloader onComplete={() => setPreloaderComplete(true)} />
          )}
        </AnimatePresence>
        
        {/* Film grain overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Docking Logo - shares layoutId with Preloader logo for seamless handoff */}
        {preloaderComplete && <DockingLogo />}
        
        <Navbar showNavbar={preloaderComplete} />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <CustomCursor />
      </div>
    </LayoutGroup>
  );
};

export default Layout;
