import React, { useState } from "react";
import { MapPin, Navigation, Copy, Check, Truck, Clock } from "lucide-react";
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

  const fullAddress = "Bandar Seri Coalfields, Jalan Kuala Selangor, 47000 Selangor, Malaysia.";

  const handleCopyAddress = async () => {
    const addressText = `${businessData.fullName}, ${fullAddress}`;
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="location" className="section location-section" aria-labelledby="location-title">
      <div className="container">
        <div className="location-header-centered">
          <h2 id="location-title" className="section-title">
            {t.location.title}
          </h2>
          <p className="section-desc">
            {t.location.desc}
          </p>
        </div>

        <div className="location-unified-card">
          {/* Left: Details & Get Directions */}
          <div className="location-info-panel">
            <div className="location-details-list">
              <div className="location-detail-item">
                <div className="location-detail-icon">
                  <MapPin size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="location-detail-body">
                  <span className="location-detail-label">{t.location.landmarkTitle}</span>
                  <address className="location-address-text">
                    {fullAddress}
                  </address>
                </div>
              </div>

              <div className="location-detail-item">
                <div className="location-detail-icon">
                  <Truck size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="location-detail-body">
                  <span className="location-detail-label">{t.location.lorryAccessTitle}</span>
                  <p className="location-access-text">
                    {t.location.lorryAccessDesc}
                  </p>
                </div>
              </div>

              <div className="location-detail-item">
                <div className="location-detail-icon">
                  <Clock size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="location-detail-body">
                  <span className="location-detail-label">{t.location.hoursHeader}</span>
                  <p className="location-access-text">
                    {t.location.hoursNotice}
                  </p>
                </div>
              </div>
            </div>

            <div className="location-actions-grid">
              <a
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary location-action-btn"
              >
                <Navigation size={16} strokeWidth={2} aria-hidden="true" />
                <span>{t.location.getDirections}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="btn btn-secondary location-action-btn"
              >
                {copied ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : <Copy size={16} strokeWidth={2} aria-hidden="true" />}
                <span>{copied ? t.location.addressCopied : t.location.copyAddress}</span>
              </button>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="location-map-panel">
            <div className="location-map-canvas">
              <iframe
                title="SKL Waste Sdn Bhd (SKL Hardware) Location Map"
                src="https://maps.google.com/maps?q=SKL+Waste+Sdn+Bhd+Bandar+Seri+Coalfields+Jalan+Kuala+Selangor+47000+Selangor+Malaysia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="google-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
