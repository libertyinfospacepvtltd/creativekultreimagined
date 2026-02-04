import { motion } from "framer-motion";
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
  gallery: string[];
  results: string[];
}
const spotlightCampaigns: SpotlightCampaign[] = [{
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
  title: "Rawat Jewellers",
  description: "A luxury jewelry brand campaign showcasing exquisite craftsmanship and timeless elegance. We created stunning visual content that captures the intricate details and heritage of Rawat's handcrafted pieces, positioning the brand as a symbol of refined taste and artistry.",
  heroImage: rawatHero,
  gallery: [rawat1, rawat2, rawat3, rawat4, rawat5, rawat6],
  results: ["Premium visual content for social media", "Increased brand engagement by 45%", "Elevated brand perception in luxury market"]
}, {
  id: "campaign-05",
  title: "Campaign 05 Name",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  heroImage: "/placeholder.svg",
  gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  results: ["Placeholder result metric #1", "Placeholder result metric #2", "Placeholder result metric #3"]
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
          <h3 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
            Spotlight
          </h3>
          {spotlightCampaigns.map((campaign, index) => <motion.div key={campaign.id} initial={{
          opacity: 0,
          y: 60
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: index * 0.1
        }} viewport={{
          once: true,
          margin: "-100px"
        }} className="relative w-full aspect-video md:aspect-[3240/1350] rounded-3xl overflow-hidden group cursor-pointer">
              {/* Background Image */}
              <img src={campaign.backgroundImage} alt={campaign.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text Overlay */}
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-primary font-sans text-xs uppercase tracking-widest mb-2 block">
                  Campaign {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-2xl sm:text-3xl lg:text-5xl font-serif text-white mb-2">
                  {campaign.title}
                </h4>
                <p className="text-white/70 font-sans text-sm lg:text-base">
                  {campaign.subtitle}
                </p>
              </div>
            </motion.div>)}
        </div>

        {/* Part B: Deep Dives - Sticky Split Layouts */}
        <div className="space-y-24 lg:space-y-32">
          <h3 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
            Other Campaigns
          </h3>
          {deepDiveCampaigns.map((campaign, index) => <div key={campaign.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Sticky Visual (desktop only) */}
              <div className="lg:sticky lg:top-24 flex items-start justify-center">
                <div className="aspect-square w-full max-w-[500px] lg:max-w-none">
                  <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-contain rounded-3xl border border-border/30" />
                </div>
              </div>

              {/* Right Column - The Story (Scrollable) */}
              <div className="space-y-8 lg:space-y-12">
                {/* Title & Description */}
                <div className="space-y-6">
                  <span className="text-primary font-sans text-xs uppercase tracking-widest">
                    Campaign {String(index + 4).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-foreground">
                    {campaign.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-base lg:text-lg leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                {/* Gallery Grid */}
                <div className="space-y-6">
                  <h4 className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                    Creative Gallery
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {campaign.gallery.map((image, imgIndex) => <motion.div key={imgIndex} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.5,
                  delay: imgIndex * 0.08
                }} viewport={{
                  once: true,
                  margin: "-50px"
                }} className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/30">
                        <img src={image} alt={`${campaign.title} creative ${imgIndex + 1}`} className="w-full h-full object-cover" />
                      </motion.div>)}
                  </div>
                </div>

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