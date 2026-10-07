import React, { useEffect, useRef } from "react";
import { X, Phone, Navigation, ChevronRight, Layers } from "lucide-react";
import { businessData } from "../data/business";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/useLanguage";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: "home" | "catalogue", hash?: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onNavigate }) => {
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

  const handleLinkClick = (e: React.MouseEvent, view: "home" | "catalogue", hash?: string) => {
    e.preventDefault();
    onClose();
    if (onNavigate) {
      onNavigate(view, hash);
    } else {
      if (view === "catalogue") {
        window.location.hash = "#catalogue";
      } else if (hash) {
        window.location.hash = hash;
      }
    }
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
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, "home", "#hero")} 
            className="mobile-nav-link"
          >
            <span>{t.nav.home}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleLinkClick(e, "home", "#about")} 
            className="mobile-nav-link"
          >
            <span>{t.nav.about}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          {/* New Catalogue Link */}
          <a 
            href="#catalogue" 
            onClick={(e) => handleLinkClick(e, "catalogue")} 
            className="mobile-nav-link mobile-nav-catalogue-link"
          >
            <span className="mobile-nav-cat-label">
              <Layers size={16} className="mobile-nav-cat-icon" />
              <strong>{t.nav.catalogue}</strong>
            </span>
          </a>
          <a 
            href="#location" 
            onClick={(e) => handleLinkClick(e, "home", "#location")} 
            className="mobile-nav-link"
          >
            <span>{t.nav.location}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, "home", "#contact")} 
            className="mobile-nav-link"
          >
            <span>{t.nav.contact}</span>
            <ChevronRight size={16} className="mobile-nav-chevron" />
          </a>
        </nav>

        {/* Primary Action Buttons */}
        <div className="mobile-nav-actions">
          <a 
            href={`tel:${businessData.phone.tel}`} 
            className="btn btn-secondary w-full mobile-action-btn phone-number"
          >
            <Phone size={16} strokeWidth={2} />
            <span>Call {businessData.phone.display}</span>
          </a>

          <a 
            href={businessData.googleProfile.directionsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary w-full mobile-action-btn"
          >
            <Navigation size={16} strokeWidth={2} />
            <span>{t.nav.getDirections}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
