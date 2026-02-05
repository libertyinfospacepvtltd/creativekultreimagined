import { useState } from "react";
import { Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = ["Marketing", "Branding", "Media Buying", "Web Development", "Events", "Others"];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    services: [] as string[],
    othersSpecify: "",
    message: ""
  });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service) 
        : [...prev.services, service],
      // Clear othersSpecify if "Others" is deselected
      othersSpecify: service === "Others" && prev.services.includes("Others") ? "" : prev.othersSpecify
    }));
  };

  const showOthersField = formData.services.includes("Others");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate "Others" field if selected
    if (showOthersField && !formData.othersSpecify.trim()) {
      toast({
        title: "Please specify",
        description: "Please provide details for 'Others' service.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours."
    });
    setFormData({
      name: "",
      email: "",
      mobile: "",
      company: "",
      services: [],
      othersSpecify: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 bg-background">
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
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
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
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
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
                    {serviceOptions.map(service => (
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

                {/* Conditional "Others" Specification Field */}
                {showOthersField && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-sans text-muted-foreground mb-2">
                      Please specify <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.othersSpecify}
                      onChange={e => setFormData({ ...formData, othersSpecify: e.target.value })}
                      className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Describe the service you need..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-sans text-muted-foreground mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border/50 px-4 py-3 text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full border-2 border-primary bg-transparent text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  href="https://wa.me/919073986777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div>
                    <h3 className="text-foreground font-sans font-medium mb-2 group-hover:text-primary transition-colors">
                      WhatsApp Us
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm">
                      +91 90739 86777
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
                      href="https://www.instagram.com/creativekult.agency/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/creativekult.agency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/102707935/admin/dashboard/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Section with Heading */}
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-serif text-foreground text-center mb-8">
                  Our Location
                </h2>
                <div className="w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] bg-card border border-border/30 overflow-hidden relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.8247772568364!2d88.33875!3d22.517897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277c8a4a45c2f%3A0xe9e6e9e9e9e9e9e9!2sSagar%20Trade%20Cube!5e0!3m2!1sen!2sin!4v1234567890"
                    className="absolute inset-0 w-full h-full"
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
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
