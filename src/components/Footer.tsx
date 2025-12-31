import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/creative-kult-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/30">
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img 
                src={logo} 
                alt="Creative Kult" 
                className="h-12 w-auto mb-6"
              />
            </Link>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed max-w-md">
              A cutting-edge marketing agency from the heart of Kolkata, dedicated to transforming ideas into impactful campaigns.
            </p>
            <p className="mt-4 text-muted-foreground/60 text-xs font-sans">
              A{" "}
              <a 
                href="https://libertyinfospace.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Liberty Infospace
              </a>{" "}
              Division
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Our Work" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:contact@creativekult.com"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  contact@creativekult.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/919831670284"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  +91 98316 70284
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?cid=1054655378822672764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans"
                >
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    3rd Floor, Room 304, Sagar Trade Cube,<br />
                    104, Shyama Prasad Mukherjee Rd,<br />
                    Kalighat, Kolkata 700026
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a 
              href="https://instagram.com/creativekult" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://facebook.com/creativekult" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://linkedin.com/company/creativekult" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-muted-foreground/60 text-xs font-sans">
            © {new Date().getFullYear()} Creative Kult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
