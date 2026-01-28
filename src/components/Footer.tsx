import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoDark from "@/assets/creative-kult-logo.png";
import logoLight from "@/assets/creative-kult-logo-brown.png";
import { useTheme } from "./ThemeProvider";
const Footer = () => {
  const {
    theme
  } = useTheme();
  const logo = theme === "dark" ? logoDark : logoLight;
  return <footer className="bg-card border-t border-border/30">
      <div className="container-luxury py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/">
              <img src={logo} alt="Creative Kult" className="h-10 sm:h-12 w-auto mb-4 sm:mb-6" />
            </Link>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed max-w-md">
              A cutting-edge marketing agency from the heart of Kolkata, dedicated to transforming ideas into impactful campaigns.
            </p>
            <p className="mt-3 sm:mt-4 text-muted-foreground/60 text-xs font-sans">
              A{" "}
              <a href="https://libertyinfospace.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                Liberty Infospace
              </a>{" "}
              Division
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-4 sm:mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[{
              href: "/",
              label: "Home"
            }, {
              href: "/work",
              label: "Our Work"
            }, {
              href: "/services",
              label: "Services"
            }, {
              href: "/about",
              label: "About"
            }, {
              href: "/contact",
              label: "Contact"
            }].map(link => <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-sans min-h-[44px] py-1 inline-flex items-center">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-base sm:text-lg mb-4 sm:mb-6 text-foreground">Contact</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a href="mailto:contact@creativekult.com" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans py-1">
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="break-all">contact@creativekult.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/919831670284" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans py-1">
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  +91 98316 70284
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?cid=1054655378822672764" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans py-1">
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
        <div className="mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="https://www.instagram.com/creativekult.agency/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/creativekult.agency" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/company/102707935/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-muted-foreground/60 text-xs font-sans text-center sm:text-right">
            © 2026 Liberty Infospace. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;