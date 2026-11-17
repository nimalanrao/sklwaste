import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";
import { assetUrl } from "../utils/asset";

interface HeroProps {
  onExploreCatalogue?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalogue }) => {
  const { t } = useLanguage();

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onExploreCatalogue) {
      onExploreCatalogue();
    }
  };

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-container">
        <div className="hero-split-layout">
          {/* Left Column: Clean Headline, Supporting Text & Two CTAs */}
          <div className="hero-copy-col">
            <h1 id="hero-title" className="hero-display-title">
              {t.hero.title}
            </h1>

            <p className="hero-supporting-text">
              {t.hero.subtitle}
            </p>

            <div className="hero-cta-group">
              <a
                href="#catalogue-showcase"
                onClick={handleExploreClick}
                className="btn btn-primary btn-lg hero-primary-cta"
              >
                <span>{t.hero.exploreCatalogue}</span>
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>

              <a
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-secondary btn-lg hero-secondary-cta phone-number"
                title={`Call ${businessData.phone.bossName} (${businessData.phone.display})`}
              >
                <Phone size={18} strokeWidth={2} aria-hidden="true" />
                <span>{t.hero.callUsNow}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hardware Photography & Caption Bar */}
          <div className="hero-visual-col">
            <div className="hero-showcase-frame">
              <div className="hero-main-photo-card">
                <img
                  src={assetUrl("/hero-yard.jpg")}
                  alt="SKL Waste Sdn Bhd (SKL Hardware) building materials yard in Bandar Seri Coalfields"
                  className="hero-main-photo"
                />
                <div className="hero-photo-caption-bar">
                  <span>Bandar Seri Coalfields, Jalan Kuala Selangor</span>
                  <span className="tabular-nums">8:00 AM - 6:00 PM Daily · 24/7 On-Call</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
