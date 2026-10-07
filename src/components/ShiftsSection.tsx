import React from "react";
import { Sun, Moon, Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const ShiftsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isMalay = language === "ms";

  const waNightMsg = encodeURIComponent(
    isMalay 
      ? "Salam Mr. Hari, saya nak buat pesanan hardware kecemasan selepas waktu kerja."
      : "Hello Mr. Hari, I need urgent after-hours hardware or materials supply."
  );

  return (
    <section id="shifts" className="shifts-section" aria-labelledby="shifts-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header shifts-section-header scroll-reveal">
          <div className="shifts-section-badge">
            <span className="shifts-section-pulse" />
            <span className="eyebrow">{t.shiftsSection.eyebrow}</span>
          </div>
          <h2 id="shifts-title" className="section-title">
            {(() => {
              const parts = t.shiftsSection.title.split(/(Only|only|Satu-satunya|SATU-SATUNYA)/);
              if (parts.length <= 1) return t.shiftsSection.title;
              return parts.map((part, idx) => {
                if (/^(Only|only|Satu-satunya|SATU-SATUNYA)$/i.test(part)) {
                  return (
                    <span key={idx} className="title-highlight-wrap">
                      <span className="title-highlight-badge">
                        <span className="title-highlight-text">{part}</span>
                      </span>
                      <svg
                        className="title-highlight-stroke"
                        viewBox="0 0 100 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 3 9.5 C 28 3.5, 72 3.5, 97 8"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  );
                }
                return <React.Fragment key={idx}>{part}</React.Fragment>;
              });
            })()}
          </h2>
          <p className="section-desc">
            {t.shiftsSection.subtitle}
          </p>
        </div>

        {/* 2-Card Direct Shift Schedule Grid */}
        <div className="shifts-section-grid">
          {/* 1. Day Shifts: Normal Store Hours with Boss */}
          <div className="card shift-section-card shift-section-day scroll-reveal">
            <div className="shift-card-top">
              <div className="shift-card-icon-wrap shift-card-icon-day">
                <Sun size={24} strokeWidth={2} />
              </div>
              <div className="shift-card-badge-wrap">
                <span className="shift-card-badge badge-day">
                  <Clock size={12} strokeWidth={2.5} />
                  <span>{t.shiftsSection.dayShiftHours}</span>
                </span>
              </div>
            </div>

            <div className="shift-card-person">
              <h3 className="shift-card-person-name">{t.shiftsSection.dayShiftName}</h3>
              <span className="shift-card-role-tag role-day">{t.shiftsSection.dayShiftRole}</span>
            </div>

            <p className="shift-card-desc">
              {t.shiftsSection.dayShiftDesc}
            </p>

            <div className="shift-card-actions">
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-primary btn-lg shift-card-btn phone-number"
                title={`Call ${businessData.phone.bossName}`}
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t.shiftsSection.dayShiftAction}</span>
              </a>
            </div>
          </div>

          {/* 2. Night Shift: After 6:00 PM On-Call with Mr. Hari */}
          <div className="card shift-section-card shift-section-night scroll-reveal reveal-delay-1">
            <div className="shift-card-top">
              <div className="shift-card-icon-wrap shift-card-icon-night">
                <Moon size={24} strokeWidth={2} />
              </div>
              <div className="shift-card-badge-wrap">
                <span className="shift-card-badge badge-night">
                  <Clock size={12} strokeWidth={2.5} />
                  <span>{t.shiftsSection.nightShiftHours}</span>
                </span>
              </div>
            </div>

            <div className="shift-card-person">
              <h3 className="shift-card-person-name">{t.shiftsSection.nightShiftName}</h3>
              <span className="shift-card-role-tag role-night">{t.shiftsSection.nightShiftRole}</span>
            </div>

            <p className="shift-card-desc">
              {t.shiftsSection.nightShiftDesc}
            </p>

            <div className="shift-card-actions shift-dual-btns">
              <a 
                href={`tel:${businessData.phone.afterHoursTel}`}
                className="btn btn-secondary btn-lg shift-card-btn phone-number shift-card-night-btn"
                title={`Call ${businessData.phone.afterHoursName}`}
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t.shiftsSection.nightShiftAction}</span>
              </a>

              <a 
                href={`https://wa.me/${businessData.phone.afterHoursWhatsapp}?text=${waNightMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg shift-card-btn shift-card-wa-btn"
                title="WhatsApp Mr. Hari"
              >
                <MessageCircle size={16} strokeWidth={2} />
                <span>{t.shiftsSection.whatsappAction}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="shifts-section-footer">
          <ShieldCheck size={18} className="shifts-footer-shield" />
          <span>{t.shiftsSection.notice}</span>
        </div>
      </div>
    </section>
  );
};
