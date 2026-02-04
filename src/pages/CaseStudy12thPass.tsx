import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

// Import campaign creatives
import slide01 from "@/assets/campaigns/12thpass/slide-01.png";
import slide02 from "@/assets/campaigns/12thpass/slide-02.png";
import slide03 from "@/assets/campaigns/12thpass/slide-03.png";
import slide04 from "@/assets/campaigns/12thpass/slide-04.png";
import slide05 from "@/assets/campaigns/12thpass/slide-05.png";
import slide06 from "@/assets/campaigns/12thpass/slide-06.png";
import slide07 from "@/assets/campaigns/12thpass/slide-07.png";
import slide08 from "@/assets/campaigns/12thpass/slide-08.png";
import slide09 from "@/assets/campaigns/12thpass/slide-09.png";
import slide10 from "@/assets/campaigns/12thpass/slide-10.png";

interface ContentSection {
  id: string;
  label: string;
  title: string;
  highlightedWord?: string;
  description: string;
  image: string;
}

const CaseStudy12thPass = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const contentSections: ContentSection[] = [
    {
      id: "intro",
      label: "Go To Market Case Study",
      title: "15,000+ ASPIRANTS CHANGED HOW THEY PREPED FOR",
      highlightedWord: "JEE.",
      description: "How We Shaped Brand Strategy · Identity · Presence",
      image: slide01
    },
    {
      id: "context",
      label: "The Context",
      title: "STUDENTS WEREN'T SLACKING. THEY WERE",
      highlightedWord: "STUCK.",
      description: "JEE aspirants were working harder than ever before. Yet despite more practice and more material, their scores refused to move.",
      image: slide02
    },
    {
      id: "pattern",
      label: "The Pattern",
      title: "THE 120-MARK",
      highlightedWord: "CEILING",
      description: "Across coaching hubs, we saw the same invisible wall appear repeatedly. Effort was increasing, but outcomes had completely plateaued.",
      image: slide03
    },
    {
      id: "problem",
      label: "The Real Problem",
      title: "IT WASN'T CONTENT IT WAS",
      highlightedWord: "FEEDBACK",
      description: "Students didn't lack material—they lacked timely explanations. When doubts went unresolved, confidence and momentum quietly collapsed.",
      image: slide04
    },
    {
      id: "insight",
      label: "The Insight",
      title: "PREPARATION SHATTERS WHEN FEEDBACK",
      highlightedWord: "SLOWS DOWN",
      description: "Textbooks are excellent for reading, but they cannot respond in moments of confusion. This gap became the emotional and strategic core of the brand.",
      image: slide05
    },
    {
      id: "strategy",
      label: "The Strategy",
      title: "A MORE SERIOUS",
      highlightedWord: "CONVERSATION",
      description: "Most EdTech brands speak to students like children. We chose to respect the stakes and speak to aspirants like high-performance athletes.",
      image: slide06
    },
    {
      id: "antiad",
      label: "The Anti-Ad",
      title: "DESIGNED TO",
      highlightedWord: "ENGAGE",
      description: "In Ed-Tech's overcrowded advertising landscape, louder messaging felt pointless. We acknowledged student frustration and offered clarity instead.",
      image: slide07
    },
    {
      id: "social",
      label: "On Social",
      title: "BETTER DECISIONS, NOT MORE",
      highlightedWord: "NOISE",
      description: "We launched a content series that challenged impulsive preparation habits. The focus shifted from hoarding advice to improving accuracy and intent.",
      image: slide08
    },
    {
      id: "results",
      label: "The Results",
      title: "MOMENTUM",
      highlightedWord: "MEASURED",
      description: "Within 50 days, the campaign reached millions and drove meaningful action. More importantly, it earned trust from serious aspirants, including AIRs.",
      image: slide09
    },
    {
      id: "beyond",
      label: "Beyond Visibility",
      title: "BEYOND",
      highlightedWord: "VISIBILITY",
      description: "This wasn't about visibility alone. It was about building long-term confidence for the next generation of JEE Aspirants.",
      image: slide10
    }
  ];

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(index);
              }
            });
          },
          { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
        {/* Back Navigation */}
        <div className="fixed top-24 left-8 z-50">
          <Link 
            to="/work" 
            className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 font-sans text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back to Work
          </Link>
        </div>

        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-center pt-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-sans text-sm uppercase tracking-[0.3em] mb-8"
          >
            Case Study
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mb-8"
          >
            12thPass <span className="text-primary">AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-white/60 text-lg tracking-wide"
          >
            EdTech • Brand Identity • Performance Marketing • Social Media Strategy
          </motion.p>
        </section>

        {/* Main Content: Sticky Split Layout */}
        <section className="px-6 md:px-12 lg:px-24 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              
              {/* Left Column - Sticky Creative (desktop only) */}
              <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start h-[calc(100vh-8rem)]">
                <div className="relative w-full h-full flex items-center justify-center">
                  {contentSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeSection === index ? 1 : 0,
                        scale: activeSection === index ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-full max-w-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                          src={section.image} 
                          alt={section.label}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column - Scrolling Content */}
              <div className="space-y-32 lg:space-y-48">
                {contentSections.map((section, index) => (
                  <div 
                    key={section.id}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="min-h-[60vh] lg:min-h-[80vh] flex flex-col justify-center"
                  >
                    {/* Mobile: Show image inline */}
                    <div className="lg:hidden mb-8">
                      <div className="w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-white/10">
                        <img 
                          src={section.image} 
                          alt={section.label}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>

                    {/* Label Pill */}
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary font-sans text-sm uppercase tracking-widest mb-6 w-fit"
                    >
                      {section.label}
                    </motion.span>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                    >
                      {section.title}{" "}
                      {section.highlightedWord && (
                        <span className="text-primary">{section.highlightedWord}</span>
                      )}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="font-sans text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
                    >
                      {section.description}
                    </motion.p>

                    {/* Results Stats - only for results section */}
                    {section.id === "results" && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mt-12 grid grid-cols-3 gap-6"
                      >
                        <div className="text-center">
                          <p className="text-3xl md:text-4xl font-bold text-primary mb-2">15M</p>
                          <p className="text-white/50 text-sm">Impressions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl md:text-4xl font-bold text-primary mb-2">1.14M</p>
                          <p className="text-white/50 text-sm">Clicks</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl md:text-4xl font-bold text-primary mb-2">15K+</p>
                          <p className="text-white/50 text-sm">Switched</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-white/60 text-lg mb-8">
              Ready to build your unfair advantage?
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default CaseStudy12thPass;
