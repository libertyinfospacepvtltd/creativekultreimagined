import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  "Social Media Marketing",
  "Performance Marketing",
  "Offline Branding",
  "Photoshoot & Videography",
  "Web Design",
  "Strategy",
];

const budgetOptions = [
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000+",
  "Custom / Not sure",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    services: [] as string[],
    budget: "",
    message: "",
  });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      mobile: "",
      company: "",
      services: [],
      budget: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container-luxury">
          <span className="text-primary font-sans text-sm uppercase tracking-widest mb-4 block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Let's Create Together
          </h1>
          <p className="text-muted-foreground font-sans max-w-2xl text-lg">
            Ready to transform your brand? We'd love to hear about your project and explore how we can help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-card border-t border-border/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif text-foreground mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-sans text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-sans text-muted-foreground mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans text-muted-foreground mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans text-muted-foreground mb-3">
                    Services Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 ${
                          formData.services.includes(service)
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans text-muted-foreground mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-sans text-muted-foreground mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif text-foreground mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                {/* Office Location */}
                <a
                  href="https://maps.google.com/?cid=1054655378822672764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-foreground font-sans font-medium mb-2 group-hover:text-primary transition-colors">
                      Office Location
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                      3rd Floor, Room 304, Sagar Trade Cube,<br />
                      104, Shyama Prasad Mukherjee Rd,<br />
                      Kalighat, Kolkata, West Bengal 700026
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@creativekult.com"
                  className="flex items-start gap-4 group"
                >
                  <Mail size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-foreground font-sans font-medium mb-2 group-hover:text-primary transition-colors">
                      Email Us
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm">
                      contact@creativekult.com
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919831670284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <Phone size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-foreground font-sans font-medium mb-2 group-hover:text-primary transition-colors">
                      WhatsApp Us
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm">
                      +91 98316 70284
                    </p>
                  </div>
                </a>

                {/* Social Media */}
                <div>
                  <h3 className="text-foreground font-sans font-medium mb-4">
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://instagram.com/creativekult"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://facebook.com/creativekult"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://linkedin.com/company/creativekult"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Map Embed with overlay for cursor */}
              <div className="mt-12 aspect-video bg-card border border-border/30 overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.8247772568364!2d88.33875!3d22.517897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277c8a4a45c2f%3A0xe9e6e9e9e9e9e9e9!2sSagar%20Trade%20Cube!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Creative Kult Office Location"
                />
                {/* Transparent overlay to capture mouse events for custom cursor */}
                <div className="absolute inset-0 bg-transparent z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
