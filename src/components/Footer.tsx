import React from "react";
import { Phone, MapPin } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";
import { assetUrl } from "../utils/asset";

interface FooterProps {
  onNavigate?: (view: "home" | "catalogue", hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate("home", hash);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="footer-brand-col">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="footer-brand-wrap"
            >
              <div className="footer-logo-box">
                <img
                  src={assetUrl("/logo.png")}
                  alt="SKL Waste Sdn Bhd Logo"
                  className="footer-brand-logo"
                />
              </div>
              <div>
                <div className="footer-brand-title">{businessData.fullName}</div>
                <div className="footer-brand-subtitle">{businessData.subtitle}</div>
              </div>
            </a>

            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="footer-col-heading">{t.footer.navigationHeading}</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleLinkClick(e, "#hero")}
                  className="footer-nav-link"
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "#about")}
                  className="footer-nav-link"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("catalogue")}
                  className="footer-nav-link"
                >
                  {t.nav.catalogue}
                </button>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => handleLinkClick(e, "#location")}
                  className="footer-nav-link"
                >
                  {t.nav.location}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="footer-nav-link"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Phone & Location */}
          <div>
            <h4 className="footer-col-heading">{t.footer.assistanceHeading}</h4>
            <div className="footer-contact-list">
              <a href={`tel:${businessData.phone.tel}`} className="footer-phone-card">
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
                <div className="footer-phone-meta">
                  <span className="footer-phone-shift tabular-nums">Mr. Saravanan (8:00 AM - 6:00 PM)</span>
                  <span className="footer-phone-num tabular-nums">{businessData.phone.display}</span>
                </div>
              </a>

              <a href={`tel:${businessData.phone.afterHoursTel}`} className="footer-phone-card">
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
                <div className="footer-phone-meta">
                  <span className="footer-phone-shift tabular-nums">Mr. Hari (24/7 Emergency)</span>
                  <span className="footer-phone-num tabular-nums">{businessData.phone.afterHoursDisplay}</span>
                </div>
              </a>

              <address className="footer-address-block">
                <MapPin size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia</span>
              </address>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 SKL Waste Sdn Bhd. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
