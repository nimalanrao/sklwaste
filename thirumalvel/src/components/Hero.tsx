import React from "react";
import { Phone, Star, MapPin, Navigation, ArrowDown } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const isMalay = language === "ms";

  return (
    <section id="hero" className="hero-section hero-section-ambient" aria-labelledby="hero-title">
      {/* Authentic Store Yard Background with Clean White Opacity Wash */}
      <div className="hero-bg-layer" aria-hidden="true">
        <div className="hero-bg-image" />
        <div className="hero-bg-wash" />
      </div>

      <div className="container hero-container">
        <div className="hero-content-center">
          {/* Eyebrow Pill with Animated "ONLY" Highlight */}
          <div className="hero-badge-wrap">
            <span className="hero-status-pill">
              <span className="hero-status-dot" aria-hidden="true" />
              {(() => {
                const parts = t.hero.eyebrow.split(/(ONLY|Only|SATU-SATUNYA|Satu-satunya)/);
                if (parts.length <= 1) return <span>{t.hero.eyebrow}</span>;
                return parts.map((part, idx) => {
                  if (/^(ONLY|Only|SATU-SATUNYA|Satu-satunya)$/i.test(part)) {
                    return (
                      <span key={idx} className="hero-pill-highlight">
                        <span>{part}</span>
                      </span>
                    );
                  }
                  return <span key={idx}>{part}</span>;
                });
              })()}
            </span>
          </div>

          {/* Main Headline: Bold, Optical Sizing, High Contrast */}
          <h1 id="hero-title" className="hero-title">
            {t.hero.title}
          </h1>

          {/* Concise, Concrete Subtitle — Zero AI fluff */}
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>

          {/* Tactile Direct Contact Actions */}
          <div className="hero-action-buttons">
            <a 
              href={`tel:${businessData.phone.tel}`} 
              className="btn btn-primary hero-btn-day phone-number"
              title={`Call ${businessData.phone.bossName}`}
            >
              <Phone size={15} strokeWidth={2.2} />
              <span>{t.hero.callBoss}</span>
            </a>

            <a 
              href={`tel:${businessData.phone.afterHoursTel}`} 
              className="btn btn-secondary hero-btn-night phone-number"
              title={`Contact ${businessData.phone.afterHoursName} after 6:00 PM`}
            >
              <Phone size={15} strokeWidth={2.2} className="night-btn-icon" />
              <span>{t.hero.callNight}</span>
            </a>
          </div>

          {/* Clean Trust & Location Badges */}
          <div className="hero-trust-row">
            <a 
              href={businessData.googleProfile.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-trust-chip chip-rating"
              title="View reviews on Google Maps"
            >
              <Star size={14} className="star-icon" fill="currentColor" strokeWidth={0} />
              <strong>4.5</strong>
              <span>{isMalay ? "Ulasan Google (9 Ulasan)" : "Google Rating (9 Reviews)"}</span>
            </a>

            <div className="hero-trust-chip chip-location">
              <MapPin size={13} strokeWidth={2} />
              <span>{t.hero.locationBadge}</span>
            </div>

            <a 
              href={businessData.googleProfile.directionsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-trust-chip chip-directions"
              title="Get driving directions"
            >
              <Navigation size={13} strokeWidth={2} />
              <span>{t.hero.getDirections}</span>
            </a>
          </div>

          {/* Scroll Cue Link */}
          <div className="hero-scroll-cue">
            <a href="#shifts" className="hero-scroll-link">
              <span>{t.hero.scrollCue}</span>
              <ArrowDown size={13} className="hero-scroll-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
