import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AITransitionSection from "@/components/AITransitionSection";
import SculptingSection from "@/components/SculptingSection";
import StatsSection from "@/components/StatsSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesPreview from "@/components/ServicesPreview";
import DivisionsSection from "@/components/DivisionsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AITransitionSection />
      <SculptingSection />
      <StatsSection />
      <MarqueeSection />
      <ServicesPreview />
      <DivisionsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
