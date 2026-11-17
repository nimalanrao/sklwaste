import React, { useState, useEffect } from "react";
import { Menu, Phone, ShoppingBag, Layers } from "lucide-react";
import { businessData } from "../data/business";
import { MobileNav } from "./MobileNav";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/useLanguage";
import { useCart } from "../context/CartContext";
import { assetUrl } from "../utils/asset";

interface HeaderProps {
  currentView?: "home" | "catalogue";
  onNavigate?: (view: "home" | "catalogue", hash?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView = "home", onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const { totalCount, openCheckout } = useCart();
  const isMalay = language === "ms";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      if (currentView === "home") {
        const sections = ["hero", "about", "location", "contact"];
        const scrollPosition = window.scrollY + 140;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const el = document.getElementById(sectionId);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

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
        <div className="header-main-bar">
          <div className="container header-container">
            {/* Brand Logo & Corporate Wordmark */}
            <a 
              href="#hero" 
              onClick={(e) => handleNav(e, "home", "#hero")}
              className="brand-wordmark-wrap" 
              aria-label="SKL Waste Sdn Bhd (SKL Hardware) Home"
            >
              <div className="brand-logo-box">
                <img 
                  src={assetUrl("/logo.png")} 
                  alt="SKL Hardware Logo" 
                  className="header-brand-logo"
                />
              </div>
              <div className="brand-wordmark-text">
                <span className="brand-title">SKL Hardware</span>
                <span className="brand-category-badge">SKL Waste Sdn Bhd</span>
              </div>
            </a>

            {/* Desktop Navigation Links with Active Indicators */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <a 
                href="#hero" 
                onClick={(e) => handleNav(e, "home", "#hero")}
                className={`nav-link ${currentView === "home" && activeSection === "hero" ? "nav-link-active" : ""}`}
              >
                {t.nav.home}
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleNav(e, "home", "#about")}
                className={`nav-link ${currentView === "home" && activeSection === "about" ? "nav-link-active" : ""}`}
              >
                {t.nav.about}
              </a>
              <button 
                type="button"
                onClick={(e) => handleNav(e, "catalogue")}
                className={`nav-link ${currentView === "catalogue" ? "nav-link-active" : ""}`}
              >
                {t.nav.catalogue}
              </button>
              <a 
                href="#location" 
                onClick={(e) => handleNav(e, "home", "#location")}
                className={`nav-link ${currentView === "home" && activeSection === "location" ? "nav-link-active" : ""}`}
              >
                {t.nav.location}
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNav(e, "home", "#contact")}
                className={`nav-link ${currentView === "home" && activeSection === "contact" ? "nav-link-active" : ""}`}
              >
                {t.nav.contact}
              </a>
            </nav>

            {/* Right Header Action Controls */}
            <div className="header-actions">
              {/* Language Switcher */}
              <LanguageToggle />

              {/* Full Interactive Directory Button */}
              <button
                type="button"
                onClick={(e) => handleNav(e, currentView === "catalogue" ? "home" : "catalogue", currentView === "catalogue" ? "#hero" : undefined)}
                className={`btn btn-secondary btn-sm header-directory-btn ${currentView === "catalogue" ? "is-active-directory" : ""}`}
                title={isMalay ? "Buka Katalog Interaktif Penuh" : "Open Full Interactive Catalogue"}
              >
                <Layers size={15} strokeWidth={2} aria-hidden="true" />
                <span className="tabular-nums">{currentView === "catalogue" ? (isMalay ? "Laman Utama" : "Back Home") : (isMalay ? "9,974 Items" : "Full Directory")}</span>
              </button>

              {/* Cart Trigger if items exist */}
              {totalCount > 0 && (
                <button
                  type="button"
                  onClick={openCheckout}
                  className="header-cart-pill"
                  aria-label={isMalay ? "Buka Senarai Pesanan" : "Open Order Cart"}
                >
                  <ShoppingBag size={15} strokeWidth={2.2} aria-hidden="true" />
                  <span className="tabular-nums">{totalCount}</span>
                </button>
              )}

              {/* Prominent Call Now Button */}
              <a 
                href={`tel:${businessData.phone.tel}`} 
                className="btn btn-primary btn-sm header-call-cta phone-number"
                title={`Call ${businessData.phone.display} (${businessData.phone.bossName})`}
              >
                <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
                <span className="tabular-nums">{t.nav.callNow}: {businessData.phone.display}</span>
              </a>

              {/* Mobile Hamburger Menu Button */}
              <button 
                type="button"
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu size={22} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Full-Screen Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
        currentView={currentView}
      />
    </>
  );
};
