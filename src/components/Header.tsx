import React, { useState, useEffect } from "react";
import { Menu, Navigation, Phone, Clock, MapPin } from "lucide-react";
import { businessData } from "../data/business";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/useLanguage";

interface HeaderProps {
  currentView?: "home" | "catalogue";
  onNavigate?: (view: "home" | "catalogue", hash?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView = "home", onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent, view: "home" | "catalogue", hash?: string) => {
    e.preventDefault();
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
    <>
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        {/* Top Utility Bar: Verified Store Hours, Location & Language Switcher */}
        <div className="header-top-bar">
          <div className="container header-top-container">
            <div className="top-bar-left">
              <span className="top-status-badge">
                <span className="status-dot-pulse" aria-hidden="true" />
                <Clock size={13} className="top-icon" aria-hidden="true" />
                <span className="top-status-text">{t.nav.openStatus}</span>
              </span>
              <span className="top-bar-sep" aria-hidden="true">·</span>
              <span className="top-location-text">
                <MapPin size={13} className="top-icon" aria-hidden="true" />
                <span>Bandar Seri Coalfields</span>
              </span>
            </div>

            <div className="top-bar-right">
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="top-phone-link phone-number"
                title={`Call ${businessData.phone.display}`}
              >
                <Phone size={13} aria-hidden="true" />
                <span>{businessData.phone.display}</span>
              </a>
              <span className="top-bar-sep top-bar-sep-lang" aria-hidden="true">|</span>
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="header-main-bar">
          <div className="container header-container">
            {/* Brand Logo & Wordmark */}
            <a 
              href="#hero" 
              onClick={(e) => handleNav(e, "home", "#hero")}
              className="brand-wordmark-wrap" 
              aria-label="SKL Waste Kedai Hardware Home"
            >
              <img 
                src="/logo.png" 
                alt="SKL Hardware Logo" 
                className="header-brand-logo"
              />
              <div className="brand-wordmark-text">
                <span className="brand-title">{businessData.name}</span>
                <span className="brand-category-badge">{businessData.subtitle}</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <a 
                href="#about" 
                onClick={(e) => handleNav(e, "home", "#about")}
                className="nav-link"
              >
                {t.nav.about}
              </a>
              <a 
                href="#catalogue" 
                onClick={(e) => handleNav(e, "catalogue")}
                className={`nav-link ${currentView === "catalogue" ? "nav-link-active" : ""}`}
              >
                <span>{t.nav.catalogue}</span>
                <span className="nav-badge-count">15</span>
              </a>
              <a 
                href="#hardware" 
                onClick={(e) => handleNav(e, "home", "#hardware")}
                className="nav-link"
              >
                {t.nav.hardware}
              </a>
              <a 
                href="#gallery" 
                onClick={(e) => handleNav(e, "home", "#gallery")}
                className="nav-link"
              >
                {t.nav.gallery}
              </a>
              <a 
                href="#location" 
                onClick={(e) => handleNav(e, "home", "#location")}
                className="nav-link"
              >
                {t.nav.location}
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNav(e, "home", "#contact")}
                className="nav-link"
              >
                {t.nav.contact}
              </a>
            </nav>

            {/* Right Header Action Buttons */}
            <div className="header-actions">
              {/* Quick Call Button */}
              <a 
                href={`tel:${businessData.phone.tel}`} 
                className="btn btn-secondary btn-sm header-phone-btn phone-number"
                title={`Call ${businessData.phone.display}`}
              >
                <Phone size={14} strokeWidth={2} />
                <span>{businessData.phone.display}</span>
              </a>

              {/* Get Directions Action Button */}
              <a 
                href={businessData.googleProfile.directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-sm header-directions-btn"
              >
                <Navigation size={14} strokeWidth={2} />
                <span>{t.nav.getDirections}</span>
              </a>

              {/* Mobile Menu Hamburger Toggle */}
              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu size={22} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
