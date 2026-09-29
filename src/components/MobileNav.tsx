import React, { useEffect, useRef } from "react";
import { X, Phone, Navigation, Clock, MapPin, ChevronRight } from "lucide-react";
import { businessData } from "../data/business";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/useLanguage";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div 
      className="mobile-nav-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div 
        className="mobile-nav-panel" 
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header inside drawer with Logo */}
        <div className="mobile-nav-header">
          <div className="mobile-nav-brand">
            <img 
              src="/logo.png" 
              alt="SKL Hardware Logo" 
              className="mobile-nav-logo-img" 
            />
            <div>
              <span className="mobile-nav-brand-title">{businessData.name}</span>
              <span className="mobile-nav-brand-subtitle">{businessData.subtitle}</span>
            </div>
          </div>
          <button 
            ref={closeButtonRef}
            className="mobile-nav-close" 
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Top Language Switcher Bar */}
        <div className="mobile-nav-lang-bar">
          <span className="mobile-lang-label">Language / Bahasa:</span>
          <LanguageToggle />
        </div>

        {/* Quick Status Pill */}
        <div className="mobile-nav-status">
          <span className="badge-open">
            <span className="badge-open-dot"></span>
            {t.nav.openStatus}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
          <a href="#hero" onClick={handleLinkClick} className="mobile-nav-link">
            <span>{t.nav.home}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a href="#about" onClick={handleLinkClick} className="mobile-nav-link">
            <span>{t.nav.about}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a href="#hardware" onClick={handleLinkClick} className="mobile-nav-link">
            <span>{t.nav.hardware}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a href="#gallery" onClick={handleLinkClick} className="mobile-nav-link">
            <span>{t.nav.gallery}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a href="#location" onClick={handleLinkClick} className="mobile-nav-link">
            <span>{t.nav.location}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a href="#contact" onClick={handleLinkClick} className="mobile-nav-link">
            <span>{t.nav.contact}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
        </nav>

        {/* Primary Action Buttons */}
        <div className="mobile-nav-actions">
          <a 
            href={businessData.googleProfile.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={handleLinkClick}
          >
            <Navigation size={18} strokeWidth={2} />
            {t.nav.getDirections}
          </a>
          <a 
            href={`tel:${businessData.phone.tel}`}
            className="btn btn-secondary"
            style={{ width: "100%" }}
          >
            <Phone size={18} strokeWidth={2} />
            {t.nav.callStore} ({businessData.phone.display})
          </a>
        </div>

        {/* Store Metadata info */}
        <div className="mobile-nav-footer">
          <div className="mobile-nav-footer-item">
            <MapPin size={16} className="mobile-nav-footer-icon" />
            <span>{businessData.address.area}, Selangor</span>
          </div>
          <div className="mobile-nav-footer-item">
            <Clock size={16} className="mobile-nav-footer-icon" />
            <span>Daily until {businessData.hours.closingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
