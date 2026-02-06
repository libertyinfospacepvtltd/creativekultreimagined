import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

// Animated text component for fade-in effect
const AnimatedText = ({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 40
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 40
  }} transition={{
    duration: 0.8,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94]
  }} className={className}>
      {children}
    </motion.div>;
};

// Gold accent text
const GoldText = ({
  children
}: {
  children: React.ReactNode;
}) => <span className="text-[#D4AF37]">{children}</span>;

// Sticky section component - alternating left/right
interface StickySectionProps {
  image: string;
  imageAlt: string;
  children: React.ReactNode;
  imageOnLeft: boolean;
}
const StickySection = ({
  image,
  imageAlt,
  children,
  imageOnLeft
}: StickySectionProps) => {
  return <section className="relative min-h-screen h-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {imageOnLeft ? <>
            {/* Left sticky image */}
            <div className="relative lg:sticky lg:top-24 lg:self-start p-6 lg:p-12">
              <div className="w-full max-w-lg mx-auto">
                <img src={image} alt={imageAlt} className="w-full h-auto rounded-3xl object-cover shadow-[0_0_80px_rgba(212,175,55,0.15)]" />
              </div>
            </div>
            {/* Right scrolling content */}
            <div className="flex flex-col justify-start px-6 lg:px-16 py-12 lg:py-32 pb-24">
              {children}
            </div>
          </> : <>
            {/* Left scrolling content */}
            <div className="flex flex-col justify-start px-6 lg:px-16 py-12 lg:py-32 pb-24 order-2 lg:order-1">
              {children}
            </div>
            {/* Right sticky image */}
            <div className="relative lg:sticky lg:top-24 lg:self-start p-6 lg:p-12 order-1 lg:order-2">
              <div className="w-full max-w-lg mx-auto">
                <img src={image} alt={imageAlt} className="w-full h-auto rounded-3xl object-cover shadow-[0_0_80px_rgba(212,175,55,0.15)]" />
              </div>
            </div>
          </>}
      </div>
    </section>;
};

// LaTeX equation display
const LatexEquation = () => <div className="my-12 py-8 flex justify-center">
    <div className="text-[#D4AF37] font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide italic font-light">
      C<sub className="text-3xl md:text-5xl lg:text-6xl align-sub">p</sub> − C<sub className="text-3xl md:text-5xl lg:text-6xl align-sub">v</sub> = R
    </div>
  </div>;

// Stats display component
const StatsDisplay = () => <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="font-numbers text-2xl md:text-3xl font-bold text-[#D4AF37]">15M</div>
      <div className="text-white/60 mt-3 text-sm uppercase tracking-widest">Impressions</div>
    </div>
    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="font-numbers text-2xl md:text-3xl font-bold text-[#D4AF37]">1.14M</div>
      <div className="text-white/60 mt-3 text-sm uppercase tracking-widest">Clicks</div>
    </div>
    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="font-numbers text-2xl md:text-3xl font-bold text-[#D4AF37]">15,000+</div>
      <div className="text-white/60 mt-3 text-sm uppercase tracking-widest">Aspirants</div>
    </div>
  </div>;

// Section label pill component
const SectionLabel = ({
  children
}: {
  children: React.ReactNode;
}) => <span className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 text-[#D4AF37] font-sans text-xs uppercase tracking-[0.2em] mb-8">
    {children}
  </span>;
const CaseStudy12thPass = () => {
  return <Layout>
      <div className="bg-[#000000] min-h-screen text-white">
        {/* Back Navigation */}
        <div className="fixed top-24 left-6 lg:left-12 z-50">
          <Link to="/work" className="flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors duration-300 font-sans text-xs uppercase tracking-widest">
            <ArrowLeft size={14} />
            Back to Work
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="max-w-5xl mx-auto text-center">
            <AnimatedText>
              <SectionLabel>Case Study</SectionLabel>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                How We Helped 12thPass.ai Break the{" "}
                <GoldText>120-Mark Plateau</GoldText>
              </h1>
            </AnimatedText>
            <AnimatedText className="mt-10" delay={0.2}>
              <p className="text-white/50 text-lg md:text-xl font-sans">
                Agency: <span className="text-white">Creative Kult</span>
              </p>
              <p className="text-white/30 text-sm mt-3 font-sans">
                The Branding Vertical of Liberty Infospace
              </p>
            </AnimatedText>
            
            {/* Scroll indicator */}
            <AnimatedText className="mt-16" delay={0.4}>
              <div className="flex flex-col items-center gap-2 text-white/30">
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <motion.div animate={{
                y: [0, 8, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </div>
            </AnimatedText>
          </div>
        </section>

        {/* Section 1: Intro - Left Sticky */}
        <StickySection image={slide01} imageAlt="12thPass.ai Campaign Hero" imageOnLeft={true}>
          <AnimatedText>
            <SectionLabel>Go To Market Case Study</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              <GoldText>15,000+</GoldText> Aspirants Changed How They Preped for <GoldText>JEE</GoldText>.
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans">
              How We Shaped Brand Strategy · Identity · Presence
            </p>
          </AnimatedText>
        </StickySection>

        {/* Section 2: The Context - Right Sticky */}
        <StickySection image={slide02} imageAlt="Students weren't slacking" imageOnLeft={false}>
          <AnimatedText>
            <SectionLabel>The Context</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Students Weren't <GoldText>Slacking</GoldText>. They Were <GoldText>Stuck</GoldText>.
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              JEE aspirants were working harder than ever before. Yet despite more practice and more material, their scores refused to move.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans">
              In India's hyper-competitive JEE ecosystem, we noticed a troubling pattern. Students weren't lazy. They weren't underprepared. They were exhausted — and stuck.
            </p>
          </AnimatedText>
        </StickySection>

        {/* Section 3: The Pattern - Left Sticky */}
        <StickySection image={slide03} imageAlt="The 120-Mark Ceiling" imageOnLeft={true}>
          <AnimatedText>
            <SectionLabel>The Pattern</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              The <GoldText>120-Mark</GoldText> Ceiling
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              Across coaching hubs, we saw the same invisible wall appear repeatedly. Effort was increasing, but outcomes had completely plateaued.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans">
              Despite solving more questions and collecting endless PDFs, a large segment of aspirants kept plateauing around 120 marks. Progress had stalled, not due to lack of effort, but due to a deeper structural flaw.
            </p>
          </AnimatedText>
        </StickySection>

        {/* Section 4: The Real Problem - Right Sticky */}
        <StickySection image={slide04} imageAlt="It wasn't content, it was feedback" imageOnLeft={false}>
          <AnimatedText>
            <SectionLabel>The Real Problem</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              It Wasn't <GoldText>Content</GoldText>. It Was <GoldText>Feedback</GoldText>.
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              Students didn't lack material—they lacked timely explanations. When doubts went unresolved, confidence and momentum quietly collapsed.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans">
              The real issue was a feedback bottleneck. Textbooks are excellent teachers — until a student needs clarity at 2 AM. PDFs don't respond. Coaching notes don't adapt.
            </p>
          </AnimatedText>
        </StickySection>

        {/* Section 5: The Insight - Left Sticky */}
        <StickySection image={slide05} imageAlt="Preparation shatters when feedback slows down" imageOnLeft={true}>
          <AnimatedText>
            <SectionLabel>The Insight</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Preparation <GoldText>Shatters</GoldText> When Feedback <GoldText>Slows Down</GoldText>
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              Textbooks are excellent for reading, but they cannot respond in moments of confusion. This gap became the emotional and strategic core of the brand.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans mb-10">
              This insight became our north star. We anchored the brand around one simple, human truth:
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-[#D4AF37] leading-snug">
                "Because textbooks don't text back."
              </p>
            </blockquote>
          </AnimatedText>
        </StickySection>

        {/* Section 6: The Strategy - Right Sticky */}
        <StickySection image={slide06} imageAlt="A more serious conversation" imageOnLeft={false}>
          <AnimatedText>
            <SectionLabel>The Strategy</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              A More <GoldText>Serious</GoldText> Conversation
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              Most EdTech brands speak to students like children. We chose to respect the stakes and speak to aspirants like high-performance athletes.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans mb-8">
              We made a deliberate pivot — treating the aspirant not as a kid, but as a high-performance athlete preparing for the most important exam of their life.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-4 font-sans">The Aesthetic: Obsidian Tech</h3>
              <p className="text-white/60 text-base leading-relaxed font-sans">
                A premium, dark-mode visual language built with charcoal gradients and restrained gold accents — signalling seriousness, depth, and precision.
              </p>
            </div>
          </AnimatedText>
        </StickySection>

        {/* Section 7: The Anti-Ad - Left Sticky */}
        <StickySection image={slide07} imageAlt="Designed to engage" imageOnLeft={true}>
          <AnimatedText>
            <SectionLabel>The Anti-Ad</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              <GoldText>Designed</GoldText> To Engage
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              In Ed-Tech's overcrowded advertising landscape, louder messaging felt pointless. We acknowledged student frustration and offered clarity instead.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans mb-8">
              The Hero: The Mathematics Itself. No stock photos. No fake smiles. We made the subject the hero.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <LatexEquation />
            <p className="text-white/40 text-center text-sm italic font-sans mt-4">
              The message was clear: this is real prep for real ranks.
            </p>
          </AnimatedText>
        </StickySection>

        {/* Section 8: On Social - Right Sticky */}
        <StickySection image={slide08} imageAlt="Better decisions, not more noise" imageOnLeft={false}>
          <AnimatedText>
            <SectionLabel>On Social</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Better <GoldText>Decisions</GoldText>, Not More <GoldText>Noise</GoldText>
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-6">
              We launched a content series that challenged impulsive preparation habits. The focus shifted from hoarding advice to improving accuracy and intent.
            </p>
            <p className="text-white/60 text-lg leading-relaxed font-sans mb-10">
              A series of "Better Decisions" videos challenged aspirants to stop collecting random advice and start optimizing for accuracy and feedback.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-4">
              <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed">
                "This hoarding won't help you crack JEE. But the QR code might."
              </p>
              <footer className="text-white/40 mt-4 text-sm font-sans">Honest. Disarming. Impossible to ignore.</footer>
            </blockquote>
          </AnimatedText>
        </StickySection>

        {/* Section 9: The Results - Left Sticky */}
        <StickySection image={slide09} imageAlt="Momentum measured" imageOnLeft={true}>
          <AnimatedText>
            <SectionLabel>The Results</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Momentum Measured
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-4">
              Within <GoldText>50 days</GoldText>, the campaign reached millions and drove meaningful action. More importantly, it earned trust from serious aspirants, including AIRs.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <StatsDisplay />
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <p className="text-white/60 text-lg leading-relaxed font-sans">
              The campaign didn't just change how 12thPass.ai looked. It changed how it was perceived — and chosen.
            </p>
          </AnimatedText>
        </StickySection>

        {/* Section 10: Final Word - Right Sticky */}
        <StickySection image={slide10} imageAlt="Beyond visibility" imageOnLeft={false}>
          <AnimatedText>
            <SectionLabel>Final Word</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Beyond Visibility
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-sans mb-10">
              This wasn't about visibility alone. It was about building long-term <GoldText>confidence</GoldText> for the next generation of <GoldText>JEE Aspirants</GoldText>.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-6">
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-white leading-relaxed">
                "We didn't just build an app. We built an <span className="text-[#D4AF37]">unfair advantage</span> for the next generation of Indian engineers."
              </p>
            </blockquote>
          </AnimatedText>
        </StickySection>

        {/* Footer CTA */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText>
              <p className="text-white/40 text-lg font-sans mb-10">Want to create an unfair advantage for your brand?</p>
              <Link to="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold font-sans text-sm uppercase tracking-widest rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:animate-glitch">
                Join the Kult
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimatedText>
          </div>
        </section>
      </div>
    </Layout>;
};
export default CaseStudy12thPass;