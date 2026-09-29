import React from "react";
import { Phone, MapPin, Navigation, ArrowUp } from "lucide-react";
import { businessData } from "../data/business";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Row */}
        <div className="footer-top-grid">
          {/* Brand & Category Column */}
          <div className="footer-brand-col">
            <a href="#hero" className="footer-wordmark">
              <span className="footer-brand-title">{businessData.fullName}</span>
              <span className="footer-brand-badge">{businessData.subtitle}</span>
            </a>
            <p className="footer-desc">
              Your local hardware store in Bandar Seri Coalfields, Selangor. Supplying everyday tools, plumbing parts, fasteners, and maintenance supplies.
            </p>
            <div className="footer-location-line">
              <MapPin size={16} className="footer-pin-icon" />
              <span>{businessData.address.area}, {businessData.address.state}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Store Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-nav-link">Home</a></li>
              <li><a href="#about" className="footer-nav-link">About Store</a></li>
              <li><a href="#hardware" className="footer-nav-link">Hardware Supplies</a></li>
              <li><a href="#gallery" className="footer-nav-link">Product Gallery</a></li>
              <li><a href="#location" className="footer-nav-link">Location & Schedule</a></li>
              <li><a href="#contact" className="footer-nav-link">Contact</a></li>
            </ul>
          </div>

          {/* Direct Access & Contact Column */}
          <div className="footer-contact-col">
            <h4 className="footer-col-heading">Customer Assistance</h4>
            <div className="footer-contact-items">
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="footer-contact-item phone-number"
              >
                <Phone size={16} className="footer-item-icon" />
                <span>{businessData.phone.display}</span>
              </a>

              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <Navigation size={16} className="footer-item-icon" />
                <span>Get Driving Directions</span>
              </a>
            </div>

            <div className="footer-hours-pill">
              <span>Verified Hours: Open until {businessData.hours.closingTime}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {CURRENT_YEAR} {businessData.fullName} ({businessData.subtitle}). All rights reserved.
          </p>

          <button 
            type="button" 
            onClick={handleScrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
};
