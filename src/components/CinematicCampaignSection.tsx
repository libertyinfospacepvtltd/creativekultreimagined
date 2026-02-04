import { motion } from "framer-motion";
import easydo365 from "@/assets/campaigns/easydo365-logo.png";
import easydo365Detail from "@/assets/campaigns/easydo365-detail.jpg";
import twelfthpassSpotlight from "@/assets/campaigns/12thpass-spotlight.png";
import kolkataIsCooking from "@/assets/campaigns/kolkata-is-cooking.png";
import cadburyMishti from "@/assets/campaigns/cadbury-mishti.png";
import timesParaGames from "@/assets/campaigns/times-para-games.png";
import rawatHero from "@/assets/campaigns/rawat/rawat-hero.png";
import rawat1 from "@/assets/campaigns/rawat/rawat-1.jpeg";
import rawat2 from "@/assets/campaigns/rawat/rawat-2.jpeg";
import rawat3 from "@/assets/campaigns/rawat/rawat-3.jpeg";
import rawat4 from "@/assets/campaigns/rawat/rawat-4.jpeg";
import rawat5 from "@/assets/campaigns/rawat/rawat-5.jpeg";
import rawat6 from "@/assets/campaigns/rawat/rawat-6.jpeg";
import debaarunHero from "@/assets/campaigns/debaarun/debaarun-hero.webp";
import debaarun1 from "@/assets/campaigns/debaarun/debaarun-1.webp";
import debaarun2 from "@/assets/campaigns/debaarun/debaarun-2.webp";
import debaarun3 from "@/assets/campaigns/debaarun/debaarun-3.jpg";
import debaarun4 from "@/assets/campaigns/debaarun/debaarun-4.jpg";
import debaarun5 from "@/assets/campaigns/debaarun/debaarun-5.jpg";
import debaarun6 from "@/assets/campaigns/debaarun/debaarun-6.webp";
import chowringheeBanner from "@/assets/campaigns/debaarun/chowringhee-banner.jpg";
import chowringheeGrid from "@/assets/campaigns/debaarun/chowringhee-grid.png";
import sylvanHero from "@/assets/campaigns/sylvan-ply/sylvan-hero.png";
import sylvanWildCampaign from "@/assets/campaigns/sylvan-ply/sylvan-wild-campaign.png";
import sylvanWishLab from "@/assets/campaigns/sylvan-ply/sylvan-wish-lab.png";
import sylvanBrandLaunch from "@/assets/campaigns/sylvan-ply/sylvan-brand-launch.png";
import sylvanPinned1 from "@/assets/campaigns/sylvan-ply/sylvan-pinned-1.png";
import sylvanPinned2 from "@/assets/campaigns/sylvan-ply/sylvan-pinned-2.png";
import sylvanPinned3 from "@/assets/campaigns/sylvan-ply/sylvan-pinned-3.png";
import sylvanPinned4 from "@/assets/campaigns/sylvan-ply/sylvan-pinned-4.png";

interface SpotlightCampaign {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
}
interface DeepDiveCampaign {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  heroAspectRatio?: string;
  pinnedImages?: string[];
  gallery: string[];
  galleryTitle?: string;
  galleryLayout?: 'grid' | 'carousel' | 'placeholder' | 'single';
  galleryPlaceholderRatio?: string;
  additionalGalleries?: {
    title: string;
    image?: string;
    layout: 'single' | 'placeholder';
    placeholderRatio?: string;
  }[];
  results: string[];
}
const spotlightCampaigns: SpotlightCampaign[] = [{
  id: "campaign-00b",
  title: "12thPass AI",
  subtitle: "EdTech • Brand Identity • Performance Marketing • Social Media Strategy",
  backgroundImage: twelfthpassSpotlight
}, {
  id: "campaign-00",
  title: "EasyDo 365",
  subtitle: "HRMS App • Brand Identity • Digital Marketing • Content Strategy",
  backgroundImage: easydo365
}, {
  id: "campaign-01",
  title: "Coca Cola - Kolkata Is Cooking",
  subtitle: "Influencer Onboarding • Copy Writing • Content Comms • On-Ground Support",
  backgroundImage: kolkataIsCooking
}, {
  id: "campaign-02",
  title: "Cadbury Mishti Shera Shrishti",
  subtitle: "Influencer Marketing • Conceptualised Digital Ideas • Copy Writing • On-Ground Execution",
  backgroundImage: cadburyMishti
}, {
  id: "campaign-03",
  title: "Times Para Games 2023",
  subtitle: "Shoots • Ideation • Copywriting • On-Ground Execution",
  backgroundImage: timesParaGames
}];
const deepDiveCampaigns: DeepDiveCampaign[] = [{
  id: "campaign-04",
  title: "Sylvan Ply",
  description: "A brand launch campaign for Sylvan Ply, showcasing their commitment to quality and craftsmanship. The 'Kuch Bhi Socho, Sylvan Ply Se Banalo' campaign captures the versatility and strength of their premium plywood products through creative visual storytelling.",
  heroImage: sylvanHero,
  heroAspectRatio: "1920 / 600",
  pinnedImages: [sylvanPinned1, sylvanPinned2, sylvanPinned3, sylvanPinned4],
  gallery: [sylvanBrandLaunch],
  galleryTitle: "Brand Launch Campaign",
  galleryLayout: 'single',
  additionalGalleries: [
    {
      title: "Plywood, But Make It Wild Campaign",
      image: sylvanWildCampaign,
      layout: 'single',
    },
    {
      title: "The Wish Lab Campaign",
      image: sylvanWishLab,
      layout: 'single',
    }
  ],
  results: ["Successful brand launch campaign", "Established brand identity in market", "Creative concept development and execution"]
}, {
  id: "campaign-05",
  title: "Rawat Jewellers",
  description: "A luxury jewelry brand campaign showcasing exquisite craftsmanship and timeless elegance. We created stunning visual content that captures the intricate details and heritage of Rawat's handcrafted pieces, positioning the brand as a symbol of refined taste and artistry.",
  heroImage: rawatHero,
  gallery: [rawat1, rawat2, rawat3, rawat4, rawat5, rawat6],
  results: ["Premium visual content for social media", "Increased brand engagement by 45%", "Elevated brand perception in luxury market"]
}, {
  id: "campaign-06",
  title: "House of Debaarun",
  description: "A high-fashion campaign for House of Debaarun, showcasing the designer's signature blend of traditional craftsmanship and contemporary elegance. We created a series of stunning editorial visuals that capture the essence of Kolkata's luxury fashion scene, from the iconic Chowringhee backdrop to intimate studio portraits.",
  heroImage: debaarunHero,
  gallery: [debaarun1, debaarun2, debaarun3, debaarun4, debaarun5, debaarun6, chowringheeBanner, chowringheeGrid],
  results: ["Editorial content for seasonal collections", "Social media engagement increased by 60%", "Brand visibility in luxury fashion segment"]
}];
const CinematicCampaignSection = () => {
  return <section className="bg-background py-16 lg:py-24">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-primary font-sans text-2xl sm:text-3xl lg:text-4xl uppercase tracking-widest mb-2 sm:mb-4 block text-center">CAMPAIGNS</h2>
        </div>

        {/* Part A: Spotlight Trio - Full Width Cards */}
        <div className="space-y-8 lg:space-y-12 mb-24 lg:mb-32">
          <h3 className="text-sm font-sans uppercase tracking-widest text-muted-foreground text-center">
            Spotlight
          </h3>
          {spotlightCampaigns.map((campaign, index) => (
            <div key={campaign.id}>
              <motion.div 
                initial={{ opacity: 0, y: 60 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: index * 0.1 }} 
                viewport={{ once: true, margin: "-100px" }} 
                className="relative w-full aspect-video md:aspect-[3240/1350] rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image */}
                <img src={campaign.backgroundImage} alt={campaign.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute bottom-10 left-10 right-10">
                  <h4 className="text-2xl sm:text-3xl text-white mb-2 font-sans lg:text-4xl">
                    {campaign.title}
                  </h4>
                  <p className="text-white/70 font-sans text-sm lg:text-base">
                    {campaign.subtitle}
                  </p>
                </div>
              </motion.div>

              {/* EasyDo 365 Detail Section - appears after EasyDo spotlight card */}
              {campaign.id === "campaign-00" && (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start"
                >
                  {/* Left Column - Creative Image (scaled to match text height) */}
                  <div className="w-full max-w-[200px] lg:max-w-[220px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border/30">
                    <img 
                      src={easydo365Detail} 
                      alt="EasyDo 365 Campaign Creative" 
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Right Column - Results */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                      Results
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Complete brand identity and visual language development",
                        "HRMS app marketing strategy and execution",
                        "Digital-first content for MSME audience",
                        "Increased app downloads and user engagement"
                      ].map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground font-sans">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Part B: Deep Dives - Sticky Split Layouts */}
        <div className="space-y-24 lg:space-y-32">
          <h3 className="text-sm font-sans uppercase tracking-widest text-muted-foreground text-center">
            Other Campaigns
          </h3>
          {deepDiveCampaigns.map((campaign, index) => <div key={campaign.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Sticky Visual (desktop only) */}
              <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                <div 
                  className="w-full max-w-[500px] mx-auto"
                  style={{ aspectRatio: campaign.heroAspectRatio || '1 / 1' }}
                >
                  <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-cover rounded-3xl border border-border/30" />
                </div>
                
                {/* Additional Pinned Images */}
                {campaign.pinnedImages && campaign.pinnedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
                    {campaign.pinnedImages.map((pinnedImg, pinnedIndex) => (
                      <motion.div
                        key={pinnedIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: pinnedIndex * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="aspect-square rounded-2xl overflow-hidden border border-border/30"
                      >
                        <img src={pinnedImg} alt={`${campaign.title} pinned ${pinnedIndex + 1}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - The Story (Scrollable) */}
              <div className="space-y-8 lg:space-y-12">
                {/* Title & Description */}
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-foreground">
                    {campaign.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-base lg:text-lg leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                {/* Gallery Grid or Carousel */}
                <div className="space-y-6">
                  <h4 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                    {campaign.galleryTitle || "Creative Gallery"}
                  </h4>
                  
                  {campaign.galleryLayout === 'placeholder' ? (
                    // Single placeholder with exact dimensions
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="w-full rounded-2xl overflow-hidden border border-border/30 bg-muted/20 flex items-center justify-center"
                      style={{ aspectRatio: campaign.galleryPlaceholderRatio || '16 / 9' }}
                    >
                      <span className="text-muted-foreground/40 text-sm font-sans">Coming Soon</span>
                    </motion.div>
                  ) : campaign.galleryLayout === 'single' && campaign.gallery[0] ? (
                    // Single full-width image
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="w-full rounded-2xl overflow-hidden border border-border/30"
                    >
                      <img src={campaign.gallery[0]} alt={`${campaign.title} creative`} className="w-full h-auto object-cover" />
                    </motion.div>
                  ) : (
                    // Default grid layout
                    <div className="space-y-4">
                      {/* Regular 2-column grid for first 6 images */}
                      <div className="grid grid-cols-2 gap-4">
                        {campaign.gallery.slice(0, 6).map((image, imgIndex) => (
                          <motion.div 
                            key={imgIndex} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: imgIndex * 0.08 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/30"
                          >
                            <img src={image} alt={`${campaign.title} creative ${imgIndex + 1}`} className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Banner image - full width with 1500:788 aspect ratio */}
                      {campaign.gallery[6] && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.48 }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="rounded-2xl overflow-hidden border border-border/30"
                          style={{ aspectRatio: '1500 / 788' }}
                        >
                          <img src={campaign.gallery[6]} alt={`${campaign.title} creative 7`} className="w-full h-full object-cover" />
                        </motion.div>
                      )}
                      
                      {/* Square grid image - 1:1 aspect ratio */}
                      {campaign.gallery[7] && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.56 }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="aspect-square rounded-2xl overflow-hidden border border-border/30"
                        >
                          <img src={campaign.gallery[7]} alt={`${campaign.title} creative 8`} className="w-full h-full object-cover" />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* Additional Galleries */}
                {campaign.additionalGalleries && campaign.additionalGalleries.map((gallery, galleryIndex) => (
                  <div key={galleryIndex} className="space-y-6">
                    <h4 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                      {gallery.title}
                    </h4>
                    
                    {gallery.layout === 'single' && gallery.image ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="w-full rounded-2xl overflow-hidden border border-border/30"
                      >
                        <img src={gallery.image} alt={`${campaign.title} - ${gallery.title}`} className="w-full h-auto object-cover" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="w-full rounded-2xl overflow-hidden border border-border/30 bg-muted/20 flex items-center justify-center"
                        style={{ aspectRatio: gallery.placeholderRatio || '16 / 9' }}
                      >
                        <span className="text-muted-foreground/40 text-sm font-sans">Coming Soon</span>
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Results */}
                <div className="space-y-6 pt-8">
                  <h4 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                    Results
                  </h4>
                  <ul className="space-y-4">
                    {campaign.results.map((result, resultIndex) => <li key={resultIndex} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground font-sans">
                          {result}
                        </span>
                      </li>)}
                  </ul>
                </div>

                {/* Extra Spacer for Sticky Effect */}
                <div className="h-24 lg:h-32" />
              </div>
            </div>)}
        </div>

      </div>
    </section>;
};
export default CinematicCampaignSection;