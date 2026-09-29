import React, { useState } from "react";
import { MapPin, Navigation, Copy, Check, Phone, ExternalLink, Clock } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(businessData.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = businessData.address.full;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="location" className="section section-alt" aria-labelledby="location-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">{t.location.eyebrow}</span>
          <h2 id="location-title" className="section-title">
            {t.location.title}
          </h2>
          <p className="section-desc">
            {t.location.desc}
          </p>
        </div>

        <div className="location-grid">
          {/* Left: Store Address & Interactive Action Panel */}
          <div className="card location-card">
            <div className="location-header-row">
              <div className="location-pin-wrap">
                <MapPin size={24} strokeWidth={2} />
              </div>
              <div>
                <span className="location-tag">{businessData.subtitle}</span>
                <h3 className="location-name">{businessData.fullName}</h3>
              </div>
            </div>

            {/* Address Box */}
            <div className="location-address-box">
              <span className="address-label">{t.location.storefrontLabel}</span>
              <address className="address-content">
                <strong>{businessData.address.area}</strong><br />
                {businessData.address.street}<br />
                {businessData.address.postcode}, {businessData.address.state}, {businessData.address.country}
              </address>
              
              <div className="location-place-id-tag">
                <span>Google Maps Place ID:</span>
                <code>{businessData.googleProfile.placeId}</code>
              </div>
            </div>

            {/* Hours & Status */}
            <div className="location-hours-box">
              <div className="location-hours-header">
                <Clock size={16} strokeWidth={2} />
                <span className="location-hours-title">{t.location.hoursHeader}</span>
              </div>
              <p className="location-hours-text">
                <strong className="badge-open">
                  <span className="badge-open-dot"></span>
                  {t.nav.openStatus}
                </strong>
              </p>
              <span className="location-hours-notice">{t.location.hoursNotice}</span>
            </div>

            {/* Interactive Location Action Buttons with Logo-Inspired Styling */}
            <div className="location-buttons-grid">
              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Navigation size={17} strokeWidth={2} />
                <span>{t.location.getDirections}</span>
              </a>

              <a 
                href={businessData.googleProfile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <ExternalLink size={17} strokeWidth={2} />
                <span>{t.location.openInGoogle}</span>
              </a>

              <button 
                type="button"
                onClick={handleCopyAddress}
                className={`btn btn-secondary ${copied ? "btn-copied" : ""}`}
                aria-label="Copy full store address to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={17} strokeWidth={2.5} className="check-success-icon" />
                    <span>{t.location.addressCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={17} strokeWidth={2} />
                    <span>{t.location.copyAddress}</span>
                  </>
                )}
              </button>

              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-secondary"
              >
                <Phone size={17} strokeWidth={2} />
                <span>{t.location.callStore}</span>
              </a>
            </div>

            <div aria-live="polite" className="sr-only">
              {copied ? t.location.addressCopied : ""}
            </div>
          </div>

          {/* Right: Map Destination Frame with Direct Satellite / Road Orientation */}
          <div className="card map-preview-card">
            <div className="map-frame-wrapper">
              <iframe
                title="SKL Waste Sdn Bhd Kedai Hardware Location Map"
                src={`https://maps.google.com/maps?q=SKL+Waste+Sdn+Bhd+Bandar+Seri+Coalfields+Jln+Kuala+Selangor+47000+Selangor&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe"
              ></iframe>
            </div>

            {/* Map Card Footer Bar */}
            <div className="map-card-footer">
              <div className="map-footer-info">
                <MapPin size={16} className="map-footer-pin" />
                <span className="map-footer-text">
                  {t.location.mapFooterText}
                </span>
              </div>

              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-open-link"
              >
                <span>{t.location.navigate}</span>
                <Navigation size={14} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
