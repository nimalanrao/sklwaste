import React from "react";
import { Phone, Navigation, Clock, MapPin } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-box scroll-reveal">
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
            {/* 1. Day Shifts: Mr. Saravanan (Boss) */}
            <div className="contact-info-card scroll-reveal">
              <div className="contact-icon-wrapper contact-icon-green">
                <Phone size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">{t.contact.phoneCardTitle}</h3>
              <p className="contact-info-desc">
                {t.contact.phoneCardDesc}
              </p>
              <div className="contact-timing-row">
                <Clock size={15} />
                <span>8:00 AM – 6:00 PM</span>
              </div>
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-accent contact-action-btn phone-number"
                title={`Call ${businessData.phone.bossName}`}
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t.contact.phoneCardAction}</span>
              </a>
            </div>

            {/* 2. After 6:00 PM & 24/7 On-Call: Mr. Hari */}
            <div className="contact-info-card contact-info-card-night scroll-reveal reveal-delay-1">
              <div className="contact-icon-wrapper contact-icon-purple">
                <Clock size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">{t.contact.afterHoursCardTitle}</h3>
              <p className="contact-info-desc">
                {t.contact.afterHoursCardDesc}
              </p>
              <div className="contact-timing-row contact-timing-night">
                <span className="badge-open-dot"></span>
                <span>24/7 On-Call Supply</span>
              </div>
              <a 
                href={`tel:${businessData.phone.afterHoursTel}`}
                className="btn btn-secondary contact-action-btn phone-number"
                title={`Call ${businessData.phone.afterHoursName}`}
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t.contact.afterHoursCardAction}</span>
              </a>
            </div>

            {/* 3. In-Store Location Card (Fixed height & clean alignment) */}
            <div className="contact-info-card scroll-reveal reveal-delay-2">
              <div className="contact-icon-wrapper contact-icon-blue">
                <MapPin size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">{t.contact.visitCardTitle}</h3>
              <p className="contact-info-desc">
                {t.contact.visitCardDesc}
              </p>
              <div className="contact-timing-row">
                <Clock size={15} />
                <span>{t.contact.visitCardTiming}</span>
              </div>
              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary contact-action-btn"
                title="Get driving directions to the store"
              >
                <Navigation size={16} strokeWidth={2} />
                <span>{t.contact.visitCardAction}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
