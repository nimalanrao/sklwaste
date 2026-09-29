import React from "react";
import { Phone, Navigation, Clock, MapPin } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-box">
          <div className="contact-header">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 id="contact-title" className="section-title">
              {t.contact.title}
            </h2>
            <p className="section-desc">
              {t.contact.desc}
            </p>
          </div>

          <div className="contact-details-grid">
            {/* Direct Phone Card */}
            <div className="contact-info-card">
              <div className="contact-icon-wrapper contact-icon-green">
                <Phone size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">{t.contact.phoneCardTitle}</h3>
              <p className="contact-info-desc">
                {t.contact.phoneCardDesc}
              </p>
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-accent btn-lg contact-action-btn phone-number"
              >
                <Phone size={18} strokeWidth={2} />
                <span>{t.contact.phoneCardAction}</span>
              </a>
            </div>

            {/* In-Store Location Card */}
            <div className="contact-info-card">
              <div className="contact-icon-wrapper contact-icon-blue">
                <MapPin size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">{t.contact.visitCardTitle}</h3>
              <p className="contact-info-desc">
                {businessData.address.full}
              </p>
              <div className="contact-timing-row">
                <Clock size={15} />
                <span>{t.nav.openStatus}</span>
              </div>
              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg contact-action-btn"
              >
                <Navigation size={18} strokeWidth={2} />
                <span>{t.contact.visitCardAction}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
