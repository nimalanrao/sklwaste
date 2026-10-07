import React from "react";
import { Phone, MapPin, Navigation, ArrowUp } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Row */}
        <div className="footer-top-grid">
          {/* Brand & Category Column with Logo */}
          <div className="footer-brand-col">
            <a href="#hero" className="footer-wordmark">
              <img 
                src="/logo.png" 
                alt="SKL Hardware Logo" 
                className="footer-brand-logo" 
              />
              <div>
                <span className="footer-brand-title">{businessData.fullName}</span>
                <span className="footer-brand-badge">{businessData.subtitle}</span>
              </div>
            </a>
            <p className="footer-desc">
              {t.footer.tagline}
            </p>
            <div className="footer-location-line">
              <MapPin size={16} className="footer-pin-icon" />
              <span>{businessData.address.area}, {businessData.address.state}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">{t.footer.navigationHeading}</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-nav-link">{t.nav.home}</a></li>
              <li><a href="#about" className="footer-nav-link">{t.nav.about}</a></li>
              <li><a href="#catalogue" className="footer-nav-link">{t.nav.catalogue}</a></li>
              <li><a href="#location" className="footer-nav-link">{t.nav.location}</a></li>
              <li><a href="#contact" className="footer-nav-link">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Direct Access & Contact Column */}
          <div className="footer-contact-col">
            <h4 className="footer-col-heading">{t.footer.assistanceHeading}</h4>
            <div className="footer-contact-items">
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="footer-contact-item phone-number"
                title={`Call ${businessData.phone.bossName}`}
              >
                <Phone size={16} className="footer-item-icon" />
                <span>Day: {businessData.phone.display} ({businessData.phone.bossName})</span>
              </a>

              <a 
                href={`tel:${businessData.phone.afterHoursTel}`}
                className="footer-contact-item phone-number"
                title={`Call ${businessData.phone.afterHoursName} for after-hours supply`}
              >
                <Phone size={16} className="footer-item-icon footer-item-purple" />
                <span>After 6 PM: {businessData.phone.afterHoursDisplay} ({businessData.phone.afterHoursName})</span>
              </a>

              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <Navigation size={16} className="footer-item-icon" />
                <span>{t.footer.directionsAction}</span>
              </a>
            </div>

            <div className="footer-hours-pill">
              <span>{t.footer.verifiedHoursText}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {CURRENT_YEAR} {businessData.fullName} ({businessData.subtitle}). {t.footer.copyright}
          </p>

          <button 
            type="button" 
            onClick={handleScrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top of page"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
};
