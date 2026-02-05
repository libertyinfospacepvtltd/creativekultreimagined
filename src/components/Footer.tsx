import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, MapPin } from "lucide-react";
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
                <a href="https://wa.me/919073986777" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm font-sans py-1">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  +91 90739 86777
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