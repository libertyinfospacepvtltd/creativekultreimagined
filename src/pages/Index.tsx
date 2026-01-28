import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BrandLegacySection from "@/components/BrandLegacySection";
import StatsSection from "@/components/StatsSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesPreview from "@/components/ServicesPreview";
import DivisionsSection from "@/components/DivisionsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandLegacySection />
      <StatsSection />
      <MarqueeSection />
      <ServicesPreview />
      <DivisionsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
