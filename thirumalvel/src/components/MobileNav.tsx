import React, { useEffect, useRef } from "react";
import { 
  X, 
  Phone, 
  Navigation, 
  ChevronRight, 
  Layers, 
  Home, 
  Building2, 
  MapPin, 
  PhoneCall,
  Sparkles
} from "lucide-react";
import { businessData } from "../data/business";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/useLanguage";
import { assetUrl } from "../utils/asset";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: "home" | "catalogue", hash?: string) => void;
  currentView?: "home" | "catalogue";
}

export const MobileNav: React.FC<MobileNavProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate,
  currentView = "home" 
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t, language } = useLanguage();

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

  const navItems = [
    {
      id: "home",
      label: t.nav.home,
      subtitle: language === "ms" ? "Laman Utama & Info Pantas" : "Homepage & Overview",
      icon: Home,
      iconClass: "nav-icon-home",
      view: "home" as const,
      hash: "#hero",
      isActive: currentView === "home",
    },
    {
      id: "about",
      label: t.nav.about,
      subtitle: language === "ms" ? "Pusat Perkakasan Sejak 2012" : "Hardware Center Since 2012",
      icon: Building2,
      iconClass: "nav-icon-about",
      view: "home" as const,
      hash: "#about",
      isActive: false,
    },
    {
      id: "catalogue",
      label: t.nav.catalogue,
      subtitle: language === "ms" ? "Simen, Pasir Guni, Paip & Alatan" : "Cement, Sand, Pipes & Tools",
      icon: Layers,
      iconClass: "nav-icon-catalogue",
      view: "catalogue" as const,
      hash: undefined,
      badge: "1,081+ Produk",
      isSpecial: true,
      isActive: currentView === "catalogue",
    },
    {
      id: "location",
      label: t.nav.location,
      subtitle: language === "ms" ? "Bandar Seri Coalfields (24 Jam)" : "Bandar Seri Coalfields (24 Hours)",
      icon: MapPin,
      iconClass: "nav-icon-location",
      view: "home" as const,
      hash: "#location",
      isActive: false,
    },
    {
      id: "contact",
      label: t.nav.contact,
      subtitle: language === "ms" ? "WhatsApp & Pertanyaan Sebut Harga" : "WhatsApp & Quotation Inquiries",
      icon: PhoneCall,
      iconClass: "nav-icon-contact",
      view: "home" as const,
      hash: "#contact",
      isActive: false,
    },
  ];

  return (
    <div 
      className="mobile-nav-fullscreen-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div 
        className="mobile-nav-fullscreen-content" 
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Logo, Language Toggle & Close Button */}
        <header className="mobile-nav-top-bar">
          <div className="mobile-nav-brand-group">
            <img 
              src={assetUrl("/logo.png")} 
              alt="SKL Hardware Logo" 
              className="mobile-nav-brand-logo" 
            />
            <div className="mobile-nav-brand-titles">
              <span className="mobile-nav-brand-name">{businessData.name}</span>
              <span className="mobile-nav-brand-sub">{businessData.subtitle}</span>
            </div>
          </div>

          <div className="mobile-nav-controls-group">
            <LanguageToggle className="mobile-nav-lang-pill" />
            <button 
              ref={closeButtonRef}
              className="mobile-nav-close-circle" 
              onClick={onClose}
              aria-label="Tutup menu navigasi"
              title="Tutup (Esc)"
            >
              <X size={20} strokeWidth={2.4} />
            </button>
          </div>
        </header>

        {/* Live 24/7 Status Badge */}
        <div className="mobile-nav-live-bar">
          <div className="mobile-nav-live-pill">
            <span className="live-pulse-dot" />
            <span className="live-pulse-text">{t.nav.openStatus}</span>
          </div>
        </div>

        {/* Navigation Items Hub */}
        <nav className="mobile-nav-items-grid" aria-label="Pautan Menu Navigasi">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.hash || "#catalogue"}
                onClick={(e) => handleLinkClick(e, item.view, item.hash)}
                className={`mobile-nav-card ${item.isSpecial ? "is-catalogue-special" : ""} ${item.isActive ? "is-active-page" : ""}`}
                style={{ animationDelay: `${50 + index * 35}ms` }}
              >
                <div className={`mobile-nav-icon-box ${item.iconClass}`}>
                  <Icon size={20} strokeWidth={2.2} />
                </div>

                <div className="mobile-nav-card-info">
                  <div className="mobile-nav-card-title-row">
                    <span className="mobile-nav-card-title">{item.label}</span>
                    {item.badge && (
                      <span className="mobile-nav-card-badge">
                        <Sparkles size={11} strokeWidth={2.5} />
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mobile-nav-card-sub">{item.subtitle}</span>
                </div>

                <div className="mobile-nav-card-arrow">
                  <ChevronRight size={18} strokeWidth={2.4} />
                </div>
              </a>
            );
          })}
        </nav>

        {/* Bottom Quick Actions Hub */}
        <footer className="mobile-nav-footer-hub">
          <div className="mobile-nav-actions-stack">
            <a 
              href={`tel:${businessData.phone.tel}`} 
              className="mobile-nav-btn-call phone-number"
              title={`Hubungi ${businessData.phone.display}`}
            >
              <Phone size={17} strokeWidth={2.2} />
              <span>Call {businessData.phone.display}</span>
            </a>

            <a 
              href={businessData.googleProfile.directionsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-nav-btn-directions"
              title="Buka Google Maps"
            >
              <Navigation size={17} strokeWidth={2.2} />
              <span>{t.nav.getDirections}</span>
            </a>
          </div>

          <div className="mobile-nav-trust-stamp">
            <span>SKL Waste Hardware & Transport • Beroperasi 24 Jam</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
