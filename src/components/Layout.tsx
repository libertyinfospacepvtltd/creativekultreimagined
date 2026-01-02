import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [preloaderComplete, setPreloaderComplete] = useState(!isHomePage);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Preloader - only on home page */}
      {isHomePage && !preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}
      
      {/* Film grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <Navbar showNavbar={preloaderComplete} />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <CustomCursor />
    </div>
  );
};

export default Layout;
