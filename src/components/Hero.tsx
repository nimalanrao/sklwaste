import React from "react";
import { Navigation, Phone, MapPin, Clock, Star, ArrowUpRight } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Editorial Content */}
          <div className="hero-content">
            {/* Eyebrow Label with Dual Brand Accents */}
            <div className="hero-eyebrow-wrapper">
              <span className="eyebrow">{t.hero.eyebrow}</span>
              <span className="badge-open">
                <span className="badge-open-dot"></span>
                {t.nav.openStatus}
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-title">
              {t.hero.title}
            </h1>

            {/* Supporting Text */}
            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="hero-actions">
              <a 
                href={businessData.googleProfile.directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-lg hero-cta-btn"
              >
                <Navigation size={18} strokeWidth={2} />
                <span>{t.hero.getDirections}</span>
              </a>

              <a 
                href={`tel:${businessData.phone.tel}`} 
                className="btn btn-secondary btn-lg hero-phone-btn phone-number"
              >
                <Phone size={18} strokeWidth={2} />
                <span>{t.hero.callNow}</span>
              </a>
            </div>

            {/* Verified Trust Badges */}
            <div className="hero-trust-bar">
              <a 
                href={businessData.googleProfile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="trust-pill"
                title="View verified reviews on Google Maps"
              >
                <div className="trust-pill-rating">
                  <Star size={14} className="star-icon" fill="currentColor" strokeWidth={0} />
                  <span className="rating-num">4.5</span>
                </div>
                <span className="trust-pill-meta">{t.hero.ratingText}</span>
                <ArrowUpRight size={13} className="trust-pill-arrow" />
              </a>

              <div className="trust-pill-static">
                <MapPin size={14} className="trust-pill-icon" />
                <span>{t.hero.locationBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Anchor with Official Logo Tag */}
          <div className="hero-visual">
            <div className="hero-card-composite">
              {/* Primary Image Anchor */}
              <div className="hero-image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1000&q=85" 
                  alt={t.hero.photoCaptionText}
                  className="hero-main-img img-contained"
                  loading="eager"
                  fetchPriority="high"
                />
                
                {/* Official Brand Logo Plaque */}
                <div className="hero-logo-plaque">
                  <img 
                    src="/logo.png" 
                    alt="SKL Hardware Official Logo" 
                    className="hero-plaque-img"
                  />
                </div>

                <div className="hero-image-caption">
                  <span className="caption-tag">{t.hero.photoCaptionTag}</span>
                  <span className="caption-text">{t.hero.photoCaptionText}</span>
                </div>
              </div>

              {/* Floating Quick Store Fact Card */}
              <div className="hero-floating-card">
                <div className="floating-card-header">
                  <div className="floating-card-icon-wrap">
                    <Clock size={16} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="floating-card-label">{t.hero.hoursLabel}</span>
                    <strong className="floating-card-value">{t.hero.hoursValue}</strong>
                  </div>
                </div>
                <p className="floating-card-desc">
                  {t.hero.hoursDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
