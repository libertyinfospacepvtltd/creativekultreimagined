import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

const insightTabs: InsightTab[] = [
  {
    id: "who-we-are",
    label: "Who We Are",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          Creative Kult is a branding and marketing agency for businesses that think long-term.
        </p>
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          We work at the intersection of strategy, creativity, and intelligence, building brand systems designed to scale with the business.
        </p>
        <p className="text-primary font-medium italic text-sm sm:text-base">
          We don't build visibility.<br />We build clarity.
        </p>
      </div>
    ),
  },
  {
    id: "ai-first",
    label: "AI-First, By Design",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          AI isn't an add-on.<br />It's our foundation.
        </p>
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          We use AI to analyse markets, decode competition, and remove guesswork from brand and marketing decisions — so creativity is sharper and strategy is smarter.
        </p>
        <p className="text-primary font-medium italic text-sm sm:text-base">
          Human insight leads.<br />AI strengthens.
        </p>
      </div>
    ),
  },
  {
    id: "how-we-work",
    label: "How We Work",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          We start with thinking.
        </p>
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          Before design or campaigns, we define positioning, messaging, and direction. Everything we create is built to support growth, consistency, and long-term value.
        </p>
        <p className="text-primary font-medium italic text-sm sm:text-base">
          No trends.<br />No templates.<br />Only frameworks that last.
        </p>
      </div>
    ),
  },
  {
    id: "partnerships",
    label: "Partnerships",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          We work with businesses ready to evolve — brands that value structure, intent, and strategic depth.
        </p>
        <p className="text-primary font-medium italic text-sm sm:text-base">
          Selective by design.
        </p>
      </div>
    ),
  },
];

const InsightTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Detect mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 
                  window.matchMedia("(hover: none)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveTab(null);
        setIsLocked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveTab(null);
        setIsLocked(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleMouseEnter = (tabId: string) => {
    if (!isMobile && !isLocked) {
      setActiveTab(tabId);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isLocked) {
      setActiveTab(null);
    }
  };

  const handleClick = (tabId: string) => {
    if (activeTab === tabId && isLocked) {
      // Clicking same locked tab closes it
      setActiveTab(null);
      setIsLocked(false);
    } else {
      // Lock on this tab
      setActiveTab(tabId);
      setIsLocked(true);
    }
  };

  const handleClose = () => {
    setActiveTab(null);
    setIsLocked(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(tabId);
    }
  };

  const activeContent = insightTabs.find((tab) => tab.id === activeTab);

  return (
    <section className="section-padding bg-background border-t border-border/30 py-12 sm:py-16">
      <div className="container-luxury">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-primary font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">
            About Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground">
            Explore Our Philosophy
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Tablet Buttons Row */}
          <div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            role="tablist"
            aria-label="Company information tabs"
          >
            {insightTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={0}
                onMouseEnter={() => handleMouseEnter(tab.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={cn(
                  "px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 font-sans text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <AnimatePresence mode="wait">
            {activeTab && activeContent && (
              <motion.div
                ref={panelRef}
                key={activeTab}
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={activeTab}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-6 sm:mt-8 relative"
              >
                <div className="relative bg-card border border-border/50 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg">
                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    aria-label="Close panel"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <X size={18} />
                  </button>

                  {/* Tab title */}
                  <h3 className="text-lg sm:text-xl font-serif text-foreground mb-4 pr-8">
                    {activeContent.label}
                  </h3>

                  {/* Tab content */}
                  {activeContent.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InsightTabs;
