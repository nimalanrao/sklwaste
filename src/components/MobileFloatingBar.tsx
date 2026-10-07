import React from "react";
import { Phone, Navigation, Moon, Layers } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

interface MobileFloatingBarProps {
  currentView: "home" | "catalogue";
  onNavigate: (view: "home" | "catalogue", hash?: string) => void;
}

export const MobileFloatingBar: React.FC<MobileFloatingBarProps> = ({ 
  currentView, 
  onNavigate 
}) => {
  const { language } = useLanguage();
  const isMalay = language === "ms";

  return (
    <nav 
      className="mobile-floating-bar" 
      aria-label="Mobile Quick Action Bar"
      role="navigation"
    >
      <div className="mobile-floating-bar-inner">
        {/* 1. Call Boss (Day Shift) */}
        <a 
          href={`tel:${businessData.phone.tel}`}
          className="mobile-float-item mobile-float-call"
          title={`Call ${businessData.phone.bossName}`}
          aria-label={`Call Boss ${businessData.phone.bossName}`}
        >
          <div className="mobile-float-icon-wrap icon-boss">
            <Phone size={18} strokeWidth={2.2} />
          </div>
          <span className="mobile-float-label">
            {isMalay ? "Tuan Kedai" : "Call Boss"}
          </span>
        </a>

        {/* 2. Night Shift / Mr. Hari On-Call */}
        <a 
          href={`tel:${businessData.phone.afterHoursTel}`}
          className="mobile-float-item mobile-float-night"
          title={`Call Mr. Hari (After-hours / 24/7 on-call)`}
          aria-label="Call Mr. Hari After Hours"
        >
          <div className="mobile-float-icon-wrap icon-night">
            <Moon size={18} strokeWidth={2.2} />
            <span className="mobile-float-badge-dot" />
          </div>
          <span className="mobile-float-label">
            {isMalay ? "Malam 24/7" : "Night Shift"}
          </span>
        </a>

        {/* 3. Catalogue Quick Toggle */}
        <button
          type="button"
          onClick={() => onNavigate(currentView === "catalogue" ? "home" : "catalogue", currentView === "catalogue" ? "#hero" : undefined)}
          className={`mobile-float-item mobile-float-cat ${currentView === "catalogue" ? "mobile-float-active" : ""}`}
          aria-label={currentView === "catalogue" ? "Go to Home Page" : "Open Hardware Catalogue"}
        >
          <div className="mobile-float-icon-wrap icon-cat">
            <Layers size={18} strokeWidth={2.2} />
          </div>
          <span className="mobile-float-label">
            {currentView === "catalogue" ? (isMalay ? "Laman Utama" : "Home") : (isMalay ? "Katalog" : "Catalogue")}
          </span>
        </button>

        {/* 4. Directions Navigation */}
        <a 
          href={businessData.googleProfile.directionsUrl}
          target="_blank" 
          rel="noopener noreferrer" 
          className="mobile-float-item mobile-float-directions"
          title="Open Directions in Google Maps"
          aria-label="Get Directions in Google Maps"
        >
          <div className="mobile-float-icon-wrap icon-directions">
            <Navigation size={18} strokeWidth={2.2} />
          </div>
          <span className="mobile-float-label">
            {isMalay ? "Arah Jalan" : "Directions"}
          </span>
        </a>
      </div>
    </nav>
  );
};
