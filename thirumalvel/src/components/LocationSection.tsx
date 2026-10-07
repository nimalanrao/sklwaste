import React, { useState } from "react";
import { MapPin, Navigation, Copy, Check, Phone, ExternalLink, Clock, Star } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const WazeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M19.8 10.74c-.26-3.8-3.41-6.8-7.3-6.8-4.08 0-7.4 3.3-7.47 7.37-.87.42-1.48 1.3-1.48 2.34 0 1.45 1.17 2.63 2.62 2.63.4 0 .78-.09 1.12-.25 1.07 1.52 2.82 2.52 4.8 2.57.2.49.68.84 1.24.84.75 0 1.36-.61 1.36-1.36 0-.08-.01-.16-.03-.23 2.06-.32 3.82-1.69 4.67-3.52.68-.21 1.18-.84 1.18-1.59 0-.82-.6-1.5-1.39-1.61l-.32-.44zm-11.3-.24c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5.74 3.65a.75.75 0 0 1 1.03-.26c.45.26 1.01.41 1.71.41.7 0 1.26-.15 1.71-.41a.75.75 0 1 1 .76 1.3c-.66.39-1.46.61-2.47.61-1.01 0-1.81-.22-2.47-.61a.75.75 0 0 1-.27-1.04z"/>
    <circle cx="8" cy="18.5" r="1.5" />
    <circle cx="15.5" cy="18.5" r="1.5" />
  </svg>
);

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyAddress = async () => {
    const addressText = `${businessData.fullName}, ${businessData.address.full}`;
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = addressText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const wazeUrl = "https://www.waze.com/ul?q=Thirumal+Vel+Enterprise+Bandar+Seri+Coalfields&navigate=yes";

  return (
    <section id="location" className="section section-alt location-section" aria-labelledby="location-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header scroll-reveal">
          <span className="eyebrow">{t.location.eyebrow}</span>
          <h2 id="location-title" className="section-title">
            {t.location.title}
          </h2>
          <p className="section-desc">
            {t.location.desc}
          </p>
        </div>

        {/* Ultra-Clean Unified 2-Column Location Card */}
        <div className="location-unified-card scroll-reveal">
          {/* Left Column: Essential Store Info & Direct Actions */}
          <div className="location-info-panel">
            {/* Store Header & Inline Rating Badge */}
            <div className="location-store-header">
              <div>
                <span className="location-store-badge">{businessData.subtitle}</span>
                <h3 className="location-store-name">{businessData.fullName}</h3>
              </div>
              <a 
                href={businessData.googleProfile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-rating-chip"
                title="View reviews on Google Maps"
              >
                <div className="location-rating-stars">
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                  <span className="location-rating-num">{businessData.googleProfile.rating.toFixed(1)}</span>
                </div>
                <span className="location-rating-reviews">({businessData.googleProfile.reviewCount} Google reviews)</span>
                <ExternalLink size={12} className="location-rating-external" />
              </a>
            </div>

            {/* Essential Information Items */}
            <div className="location-details-list">
              {/* Address */}
              <div className="location-detail-item">
                <div className="location-detail-icon">
                  <MapPin size={18} strokeWidth={2} />
                </div>
                <div className="location-detail-body">
                  <strong className="location-detail-title">{t.location.landmarkTitle}</strong>
                  <p className="location-detail-text">
                    {businessData.address.full}
                  </p>
                  <span className="location-detail-subtext">
                    {t.location.landmarkDesc}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="location-detail-item">
                <div className="location-detail-icon icon-green">
                  <Clock size={18} strokeWidth={2} />
                </div>
                <div className="location-detail-body">
                  <div className="location-hours-row">
                    <strong className="location-detail-title">{t.location.hoursHeader}</strong>
                    <span className="badge-open-sm">Open 24/7</span>
                  </div>
                  <p className="location-detail-text">
                    8:00 AM – 6:00 PM walk-in shifts daily with Mr. Saravanan (Boss).
                  </p>
                  <span className="location-detail-subtext">
                    After 6:00 PM: 24/7 on-call emergency supply with Mr. Hari.
                  </span>
                </div>
              </div>

              {/* Phones */}
              <div className="location-detail-item">
                <div className="location-detail-icon icon-blue">
                  <Phone size={18} strokeWidth={2} />
                </div>
                <div className="location-detail-body">
                  <strong className="location-detail-title">Direct Enquiries</strong>
                  <p className="location-detail-text">
                    Day: <a href={`tel:${businessData.phone.tel}`} className="location-phone-link">{businessData.phone.display}</a> · Night: <a href={`tel:${businessData.phone.afterHoursTel}`} className="location-phone-link">{businessData.phone.afterHoursDisplay}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: 2x2 Clean Grid */}
            <div className="location-actions-grid">
              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary location-action-btn"
                title="Get driving directions via Google Maps"
              >
                <Navigation size={16} strokeWidth={2} />
                <span>Google Maps</span>
              </a>

              <a 
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-waze location-action-btn"
                title="Open navigation in Waze"
              >
                <WazeIcon size={16} />
                <span>Waze</span>
              </a>

              <button 
                type="button"
                onClick={handleCopyAddress}
                className={`btn btn-secondary location-action-btn ${copied ? "btn-copied" : ""}`}
                aria-label="Copy address to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={16} strokeWidth={2.5} className="check-success-icon" />
                    <span>{t.location.addressCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} strokeWidth={2} />
                    <span>{t.location.copyAddress}</span>
                  </>
                )}
              </button>

              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-secondary location-action-btn phone-number"
                title="Call store directly"
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t.location.callStore}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Map */}
          <div className="location-map-panel">
            <iframe
              title="Thirumal Vel Enterprise Kedai Hardware Location Map"
              src="https://maps.google.com/maps?q=Thirumal+Vel+Enterprise+Bandar+Seri+Coalfields+Jln+Kuala+Selangor+47000+Selangor&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="location-map-embed"
            />
            <div className="location-map-overlay-bar">
              <div className="location-map-pin-info">
                <MapPin size={14} className="location-map-pin-icon" />
                <span>Jalan Kuala Selangor, Bandar Seri Coalfields</span>
              </div>
              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-map-overlay-link"
              >
                <span>Navigate</span>
                <Navigation size={12} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
