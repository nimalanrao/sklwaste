import React from "react";
import { Phone, Navigation, Clock, Store, Wrench } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Authentic Editorial Profile */}
          <div className="about-editorial scroll-reveal">
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2 id="about-title" className="section-title">
              {t.about.title}
            </h2>
            <p className="about-lead">
              {t.about.lead}
            </p>
            <p className="about-body">
              {t.about.body}
            </p>

            <div className="about-actions">
              <a 
                href={`tel:${businessData.phone.tel}`} 
                className="btn btn-primary"
              >
                <Phone size={16} strokeWidth={2} />
                <span>{t.about.callAction}</span>
              </a>
              <a 
                href={businessData.googleProfile.directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <Navigation size={16} strokeWidth={2} />
                <span>{t.about.directionsAction}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Highlights Cards */}
          <div className="about-features-container">
            <div className="about-feature-card scroll-reveal">
              <div className="about-feature-icon-wrap about-icon-green">
                <Store size={22} strokeWidth={1.8} />
              </div>
              <div className="about-feature-content">
                <h3 className="about-feature-title">{t.about.feature1Title}</h3>
                <p className="about-feature-desc">{t.about.feature1Desc}</p>
              </div>
            </div>

            <div className="about-feature-card scroll-reveal reveal-delay-1">
              <div className="about-feature-icon-wrap about-icon-blue">
                <Wrench size={22} strokeWidth={1.8} />
              </div>
              <div className="about-feature-content">
                <h3 className="about-feature-title">{t.about.feature2Title}</h3>
                <p className="about-feature-desc">{t.about.feature2Desc}</p>
              </div>
            </div>

            <div className="about-feature-card scroll-reveal reveal-delay-2">
              <div className="about-feature-icon-wrap about-icon-green">
                <Clock size={22} strokeWidth={1.8} />
              </div>
              <div className="about-feature-content">
                <h3 className="about-feature-title">{t.about.feature3Title}</h3>
                <p className="about-feature-desc">{t.about.feature3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
