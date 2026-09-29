import React, { useState, useEffect } from "react";
import { Menu, Navigation, Phone } from "lucide-react";
import { businessData } from "../data/business";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/useLanguage";

export const Header: React.FC = () => {
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

  return (
    <>
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="container header-container">
          {/* Brand Logo & Wordmark */}
          <a href="#hero" className="brand-wordmark-wrap" aria-label="SKL Waste Kedai Hardware Home">
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
            <a href="#about" className="nav-link">{t.nav.about}</a>
            <a href="#hardware" className="nav-link">{t.nav.hardware}</a>
            <a href="#gallery" className="nav-link">{t.nav.gallery}</a>
            <a href="#location" className="nav-link">{t.nav.location}</a>
            <a href="#contact" className="nav-link">{t.nav.contact}</a>
          </nav>

          {/* Right Header Controls: Language Switcher & Action Buttons */}
          <div className="header-actions">
            {/* Prominent Language Switcher at Top */}
            <LanguageToggle />

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
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};
