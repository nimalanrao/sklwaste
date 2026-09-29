import React, { useState, useEffect } from "react";
import { Menu, Navigation, Phone } from "lucide-react";
import { businessData } from "../data/business";
import { MobileNav } from "./MobileNav";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {/* Typographic Wordmark (Strict Rule: No artificial invented logo) */}
          <a href="#hero" className="brand-wordmark" aria-label="SKL Waste Kedai Hardware Home">
            <span className="brand-title">{businessData.name}</span>
            <span className="brand-divider" aria-hidden="true">/</span>
            <span className="brand-category">{businessData.subtitle}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <a href="#about" className="nav-link">About</a>
            <a href="#hardware" className="nav-link">Hardware</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#location" className="nav-link">Location & Hours</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <a 
              href={`tel:${businessData.phone.tel}`} 
              className="btn btn-secondary btn-sm header-phone-btn"
              title={`Call ${businessData.phone.display}`}
            >
              <Phone size={14} strokeWidth={2} />
              <span>{businessData.phone.display}</span>
            </a>

            <a 
              href={businessData.googleProfile.directionsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm header-directions-btn"
            >
              <Navigation size={14} strokeWidth={2} />
              <span>Get Directions</span>
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

      {/* Accessible Mobile Nav Sheet */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};
