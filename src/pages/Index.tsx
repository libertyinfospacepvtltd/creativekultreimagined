import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import UnifiedTransitionSection from "@/components/UnifiedTransitionSection";
import StatsSection from "@/components/StatsSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesPreview from "@/components/ServicesPreview";
import DivisionsSection from "@/components/DivisionsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <UnifiedTransitionSection />
      <StatsSection />
      <MarqueeSection />
      <ServicesPreview />
      {/* <DivisionsSection /> */}{/* Hidden: re-enable by uncommenting */}
      <CTASection />
    </Layout>
  );
};

export default Index;
