import React from "react";
import { Sun, Moon, Phone, Clock } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const ShiftsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isMalay = language === "ms";

  return (
    <section id="shifts" className="emergency-feature-section" aria-labelledby="shifts-title">
      <div className="emergency-bg-pattern" aria-hidden="true" />

      <div className="container emergency-container">
        <div className="emergency-header">
          <h2 id="shifts-title" className="emergency-headline">
            {t.shiftsSection.title}
          </h2>
          <p className="emergency-description">
            {t.shiftsSection.subtitle}
          </p>
        </div>

        {/* Two Contact Cards: DAY SHIFT & NIGHT SHIFT */}
        <div className="emergency-cards-grid">
          {/* Card 1: DAY SHIFT - Mr. Saravanan */}
          <article className="emergency-shift-card">
            <div className="shift-card-header-row">
              <span className="shift-badge-pill day-pill">
                <Sun size={14} strokeWidth={2} />
                <span>{t.shiftsSection.dayShiftBadge}</span>
              </span>
              <span className="shift-hours-chip tabular-nums">
                <Clock size={14} strokeWidth={2} />
                <span>{t.shiftsSection.dayShiftHours}</span>
              </span>
            </div>

            <div className="shift-person-block">
              <h3 className="shift-person-name">{t.shiftsSection.dayShiftName}</h3>
              <p className="shift-person-role">{t.shiftsSection.dayShiftRole}</p>
            </div>

            <div className="shift-phone-display">
              <span className="shift-phone-label">{isMalay ? "Telefon" : "Phone"}</span>
              <a
                href={`tel:${businessData.phone.tel}`}
                className="shift-phone-number tabular-nums"
              >
                {businessData.phone.display}
              </a>
            </div>

            <a
              href={`tel:${businessData.phone.tel}`}
              className="btn btn-primary btn-lg shift-primary-call-btn phone-number"
            >
              <Phone size={18} strokeWidth={2} />
              <span>{t.shiftsSection.dayShiftAction}</span>
            </a>
          </article>

          {/* Card 2: NIGHT SHIFT - Mr. Hari */}
          <article className="emergency-shift-card">
            <div className="shift-card-header-row">
              <span className="shift-badge-pill night-pill">
                <Moon size={14} strokeWidth={2} />
                <span>{t.shiftsSection.nightShiftBadge}</span>
              </span>
              <span className="shift-hours-chip tabular-nums">
                <Clock size={14} strokeWidth={2} />
                <span>{t.shiftsSection.nightShiftHours}</span>
              </span>
            </div>

            <div className="shift-person-block">
              <h3 className="shift-person-name">{t.shiftsSection.nightShiftName}</h3>
              <p className="shift-person-role">{t.shiftsSection.nightShiftRole}</p>
            </div>

            <div className="shift-phone-display night-phone">
              <span className="shift-phone-label">{isMalay ? "Telefon" : "Phone"}</span>
              <a
                href={`tel:${businessData.phone.afterHoursTel}`}
                className="shift-phone-number tabular-nums"
              >
                {businessData.phone.afterHoursDisplay}
              </a>
            </div>

            <a
              href={`tel:${businessData.phone.afterHoursTel}`}
              className="btn btn-accent btn-lg shift-primary-call-btn phone-number"
            >
              <Phone size={18} strokeWidth={2} />
              <span>{t.shiftsSection.nightShiftAction}</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};
