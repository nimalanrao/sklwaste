import React from "react";
import { Navigation, Phone, MapPin, Clock, Star, ArrowUpRight } from "lucide-react";
import { businessData } from "../data/business";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Editorial Content */}
          <div className="hero-content">
            {/* Eyebrow Label */}
            <div className="hero-eyebrow-wrapper">
              <span className="eyebrow">YOUR LOCAL HARDWARE STORE</span>
              <span className="badge-open">
                <span className="badge-open-dot"></span>
                {businessData.hours.status} · Closes at {businessData.hours.closingTime}
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-title">
              Hardware for the Work Ahead.
            </h1>

            {/* Supporting Text */}
            <p className="hero-subtitle">
              Find your local hardware store in Bandar Seri Coalfields, Selangor. Get in touch for supplies or plan your in-store visit.
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
                <span>Get Directions</span>
              </a>

              <a 
                href={`tel:${businessData.phone.tel}`} 
                className="btn btn-secondary btn-lg hero-phone-btn"
              >
                <Phone size={18} strokeWidth={2} />
                <span>Call {businessData.phone.display}</span>
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
                <span className="trust-pill-meta">9 Google Reviews</span>
                <ArrowUpRight size={13} className="trust-pill-arrow" />
              </a>

              <div className="trust-pill-static">
                <MapPin size={14} className="trust-pill-icon" />
                <span>Bandar Seri Coalfields</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Anchor */}
          <div className="hero-visual">
            <div className="hero-card-composite">
              {/* Primary Image Anchor */}
              <div className="hero-image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1000&q=85" 
                  alt="High quality workshop tools and precision hardware equipment"
                  className="hero-main-img img-contained"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="hero-image-caption">
                  <span className="caption-tag">Tools & Workshop Gear</span>
                  <span className="caption-text">Everyday essentials for home maintenance & trades</span>
                </div>
              </div>

              {/* Floating Quick Store Fact Card */}
              <div className="hero-floating-card">
                <div className="floating-card-header">
                  <div className="floating-card-icon-wrap">
                    <Clock size={16} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="floating-card-label">Store Hours</span>
                    <strong className="floating-card-value">Open until 7:00 PM</strong>
                  </div>
                </div>
                <p className="floating-card-desc">
                  Based on verified listing. Call ahead for holiday operating hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
