import React from "react";
import { Phone, Navigation, Clock, MapPin, MessageCircle, Sun, Moon } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isMalay = language === "ms";

  const waDayText = encodeURIComponent(
    isMalay
      ? "Hello SKL Hardware (Mr. Saravanan), saya ingin bertanya tentang bekalan bahan binaan."
      : "Hello SKL Hardware (Mr. Saravanan), I would like to enquire about hardware supplies."
  );

  const waNightText = encodeURIComponent(
    isMalay
      ? "Hello SKL Hardware (Mr. Hari), saya memerlukan bekalan perkakasan kecemasan."
      : "Hello SKL Hardware (Mr. Hari), I need after-hours emergency hardware supply."
  );

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-header">
          <h2 id="contact-title" className="section-title">
            {t.contact.title}
          </h2>
        </div>

        <div className="contact-two-cards-grid">
          {/* Option 1: Day Enquiries - Mr. Saravanan */}
          <article className="contact-option-card card-day-option">
            <div className="contact-card-top">
              <span className="contact-shift-tag tag-blue">
                <Sun size={15} strokeWidth={2} aria-hidden="true" />
                <span>{t.contact.phoneCardTitle}</span>
              </span>
              <span className="contact-hours-pill tabular-nums">
                <Clock size={14} strokeWidth={2} aria-hidden="true" />
                <span>8:00 AM - 6:00 PM</span>
              </span>
            </div>

            <div className="contact-person-meta">
              <h3 className="contact-person-title">Mr. Saravanan</h3>
              <span className="contact-person-sub">{t.contact.phoneCardRole}</span>
            </div>

            <a
              href={`tel:${businessData.phone.tel}`}
              className="contact-number-banner tabular-nums"
            >
              <Phone size={18} strokeWidth={2} aria-hidden="true" />
              <span>{businessData.phone.display}</span>
            </a>

            <div className="contact-buttons-row">
              <a
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-primary btn-lg contact-btn-main phone-number"
              >
                <Phone size={17} strokeWidth={2} aria-hidden="true" />
                <span>{t.contact.phoneCardAction}</span>
              </a>

              <a
                href={`https://wa.me/${businessData.phone.whatsapp}?text=${waDayText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg contact-btn-wa"
              >
                <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                <span>{t.contact.whatsappAction}</span>
              </a>
            </div>
          </article>

          {/* Option 2: Emergency Enquiries - Mr. Hari */}
          <article className="contact-option-card card-night-option">
            <div className="contact-card-top">
              <span className="contact-shift-tag tag-green">
                <Moon size={15} strokeWidth={2} aria-hidden="true" />
                <span>{t.contact.afterHoursCardTitle}</span>
              </span>
              <span className="contact-hours-pill tabular-nums">
                <Clock size={14} strokeWidth={2} aria-hidden="true" />
                <span>6:00 PM - 8:00 AM</span>
              </span>
            </div>

            <div className="contact-person-meta">
              <h3 className="contact-person-title">Mr. Hari</h3>
              <span className="contact-person-sub">{t.contact.afterHoursCardRole}</span>
            </div>

            <a
              href={`tel:${businessData.phone.afterHoursTel}`}
              className="contact-number-banner night-banner tabular-nums"
            >
              <Phone size={18} strokeWidth={2} aria-hidden="true" />
              <span>{businessData.phone.afterHoursDisplay}</span>
            </a>

            <div className="contact-buttons-row">
              <a
                href={`tel:${businessData.phone.afterHoursTel}`}
                className="btn btn-accent btn-lg contact-btn-main phone-number"
              >
                <Phone size={17} strokeWidth={2} aria-hidden="true" />
                <span>{t.contact.afterHoursCardAction}</span>
              </a>

              <a
                href={`https://wa.me/${businessData.phone.afterHoursWhatsapp}?text=${waNightText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg contact-btn-wa"
              >
                <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
                <span>{t.contact.whatsappAction}</span>
              </a>
            </div>
          </article>
        </div>

        <div className="contact-storefront-strip">
          <div className="storefront-strip-info">
            <div className="storefront-strip-icon">
              <MapPin size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <h3 className="storefront-strip-title">{t.contact.visitCardDesc}</h3>
              <p className="storefront-strip-address">{t.contact.visitCardTiming}</p>
            </div>
          </div>

          <div className="storefront-strip-actions">
            <a
              href={businessData.googleProfile.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Navigation size={16} strokeWidth={2} aria-hidden="true" />
              <span>{t.contact.visitCardAction}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
