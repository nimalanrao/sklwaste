import React from "react";
import { Wrench, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const QuickInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="quick-info-section" aria-label="Key Store Information">
      <div className="container">
        <div className="quick-info-grid">
          {/* 1. Business Category */}
          <div className="quick-info-item scroll-reveal">
            <div className="quick-info-icon-wrap quick-info-icon-green">
              <Wrench size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">{t.quickInfo.typeLabel}</span>
              <span className="quick-info-val">{t.quickInfo.typeVal}</span>
              <span className="quick-info-sub">{t.quickInfo.typeSub}</span>
            </div>
          </div>

          {/* 2. Location */}
          <a 
            href={businessData.googleProfile.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-info-item quick-info-link scroll-reveal reveal-delay-1"
            title="Open address in Google Maps"
          >
            <div className="quick-info-icon-wrap quick-info-icon-blue">
              <MapPin size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">{t.quickInfo.locationLabel}</span>
              <span className="quick-info-val">{t.quickInfo.locationVal}</span>
              <span className="quick-info-sub">{t.quickInfo.locationSub}</span>
            </div>
            <ArrowUpRight size={15} className="quick-info-arrow" />
          </a>

          {/* 3. Phone */}
          <a 
            href={`tel:${businessData.phone.tel}`}
            className="quick-info-item quick-info-link scroll-reveal reveal-delay-2"
            title={`Call ${businessData.phone.display}`}
          >
            <div className="quick-info-icon-wrap quick-info-icon-green">
              <Phone size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">{t.quickInfo.phoneLabel}</span>
              <span className="quick-info-val phone-number">{businessData.phone.display}</span>
              <span className="quick-info-sub">{t.quickInfo.phoneSub}</span>
            </div>
            <ArrowUpRight size={15} className="quick-info-arrow" />
          </a>

          {/* 4. Closing Time */}
          <div className="quick-info-item scroll-reveal reveal-delay-3">
            <div className="quick-info-icon-wrap quick-info-icon-blue">
              <Clock size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">{t.quickInfo.hoursLabel}</span>
              <div className="quick-info-status-row">
                <span className="quick-info-val">{t.quickInfo.hoursVal}</span>
              </div>
              <span className="quick-info-sub">{t.quickInfo.hoursSub}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
