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

const CaseStudy12thPass = () => {
  const campaignCreatives = [
    { id: 1, image: slide01, alt: "Go To Market Case Study" },
    { id: 2, image: slide02, alt: "The Context - Students Were Stuck" },
    { id: 3, image: slide03, alt: "The Pattern - 120 Mark Ceiling" },
    { id: 4, image: slide04, alt: "The Real Problem - Feedback" },
    { id: 5, image: slide05, alt: "The Insight - Preparation Shatters" },
    { id: 6, image: slide06, alt: "The Strategy - Serious Conversation" },
    { id: 7, image: slide07, alt: "The Anti-Ad - Designed to Engage" },
    { id: 8, image: slide08, alt: "On Social - Better Decisions" },
    { id: 9, image: slide09, alt: "The Results - Momentum Measured" },
    { id: 10, image: slide10, alt: "Beyond Visibility" },
  ];

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

        {/* Section 1: Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-center">
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
            How We Helped 12thPass.ai Break the{" "}
            <span className="text-primary">120-Mark Plateau</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-white/60 text-lg tracking-wide"
          >
            Agency: Creative Kult | Client: 12thPass.ai
          </motion.p>
        </section>

        {/* Section 2: The Problem */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-20"
          >
            The Problem:{" "}
            <span className="text-primary">Why Hard Work Wasn't Enough</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto mb-20">
            {/* Left Column - Context */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                In India's hyper-competitive JEE ecosystem, we noticed a troubling pattern. 
                Students weren't lazy. They weren't underprepared. They were exhausted — and stuck.
              </p>
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                Despite solving more questions and collecting endless PDFs, a large segment of 
                aspirants kept plateauing around 120 marks. Progress had stalled, not due to 
                lack of effort, but due to a deeper structural flaw.
              </p>
            </motion.div>

            {/* Right Column - Insight */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                The real issue was a <span className="text-primary font-semibold">feedback bottleneck</span>. 
                Textbooks are excellent teachers — until a student needs clarity at 2 AM. 
                PDFs don't respond. Coaching notes don't adapt.
              </p>
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed">
                When doubt resolution slows down, confidence collapses.
              </p>
            </motion.div>
          </div>

          {/* The Hook */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-primary font-bold italic">
              "Because textbooks don't text back."
            </p>
          </motion.div>
        </section>

        {/* Section 3: The Strategy */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-16"
          >
            The Strategy:{" "}
            <span className="text-primary">The 'Obsidian' Pivot</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed text-center">
                Most EdTech brands speak to students like children — bright blues, mascots, 
                and exaggerated optimism. For a high-stakes exam like JEE, that tone felt 
                disconnected from reality. We chose to treat the aspirant not as a kid, but 
                as a <span className="text-primary font-semibold">high-performance athlete</span> preparing 
                for the most important exam of their life.
              </p>
            </div>
          </motion.div>

          {/* LaTeX Equation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 md:p-12 border border-primary/30">
              <p className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-wide">
                C<sub className="text-primary text-2xl md:text-3xl">p</sub> − C<sub className="text-primary text-2xl md:text-3xl">v</sub> = <span className="text-primary">R</span>
              </p>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-white/60 text-center mb-20 text-lg"
          >
            The Aesthetic: <span className="text-primary">Obsidian Tech</span>. No stock photos. No fake smiles. We made the mathematics the hero.
          </motion.p>

          {/* Anti-Ad Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="border-2 border-primary/50 rounded-2xl p-8 md:p-10 text-center bg-primary/5">
              <p className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
                "This hoarding won't help you crack JEE. But the QR code might."
              </p>
              <p className="font-sans text-white/60 text-sm uppercase tracking-widest">
                Honest. Disarming. Impossible to ignore.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 4: The Execution */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-20"
          >
            The Execution:{" "}
            <span className="text-primary">Cutting Through the Noise</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Column 1 - On Ground */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-colors duration-300"
            >
              <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
                On Ground
              </span>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                Brutalist typography billboards placed strategically near institutes like 
                Allen and Bansal Classes — designed to disrupt visual monotony.
              </p>
            </motion.div>

            {/* Column 2 - On Social */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-colors duration-300"
            >
              <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
                On Social
              </span>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                A series of 'Better Decisions' videos that challenged aspirants to stop 
                collecting random advice and start optimizing for accuracy and feedback.
              </p>
            </motion.div>

            {/* Column 3 - Thought Leadership */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-colors duration-300"
            >
              <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
                Thought Leadership
              </span>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                Instead of feature dumps, our director shared empathetic reflections on 
                LinkedIn — shifting the narrative from 'apps' to student well-being and cognitive load.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 5: The Win */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-8"
          >
            The Win:{" "}
            <span className="text-primary">Moving the Needle</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-white/70 text-center text-lg mb-20 max-w-3xl mx-auto"
          >
            The campaign didn't just change how 12thPass.ai looked. It changed how it was 
            perceived — and chosen. In just <span className="text-primary font-semibold">50 days</span>:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Stat 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="text-center"
            >
              <p className="font-numbers text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-4">
                15M
              </p>
              <p className="font-sans text-white/60 uppercase tracking-widest text-sm">
                Awareness / Impressions
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center"
            >
              <p className="font-numbers text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-4">
                1.14M
              </p>
              <p className="font-sans text-white/60 uppercase tracking-widest text-sm">
                Action / Click-throughs
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <p className="font-numbers text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-4">
                15K+
              </p>
              <p className="font-sans text-white/60 uppercase tracking-widest text-sm">
                Trust / Aspirants Switched
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Final Word */}
        <section className="py-32 px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light leading-relaxed italic">
              "We didn't just build an app. We built an{" "}
              <span className="text-primary font-semibold not-italic">unfair advantage</span>{" "}
              for the next generation of Indian engineers."
            </blockquote>
          </motion.div>
        </section>

        {/* Section 7: Campaign Creatives Gallery */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-16"
          >
            The <span className="text-primary">Campaign Journey</span>
          </motion.h2>

          {/* 2-column grid for creatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {campaignCreatives.map((creative, index) => (
              <motion.div
                key={creative.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index % 2 * 0.1 }}
                className="rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={creative.image} 
                    alt={creative.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </motion.div>
            ))}
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
