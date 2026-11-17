import React from "react";
import { Clock, BrickWall, Wrench } from "lucide-react";
import { useLanguage } from "../context/useLanguage";
import { assetUrl } from "../utils/asset";

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-two-col-grid">
          {/* Left: Single Clean Hardware & Building Materials Photograph */}
          <div className="about-visual-col">
            <div className="about-photo-frame">
              <img
                src={assetUrl("/catalogue/pasir-batu-guni-collection.jpg")}
                alt="SKL Hardware building materials stock in Bandar Seri Coalfields"
                className="about-main-image"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fb = assetUrl("/hero-yard.jpg");
                  if (target.src !== fb) {
                    target.src = fb;
                  }
                }}
              />
            </div>
          </div>

          {/* Right: Headline, Description & Three Feature Cards */}
          <div className="about-content-col">
            <h2 id="about-title" className="section-title">
              {t.about.title}
            </h2>

            <p className="about-lead-copy">
              {t.about.lead}
            </p>

            <div className="about-features-stack">
              {/* 1. Building Materials */}
              <div className="about-feature-card">
                <div className="about-feature-icon accent-blue">
                  <BrickWall size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="about-feature-body">
                  <h3 className="about-feature-title">{t.about.feature1Title}</h3>
                  <p className="about-feature-desc">{t.about.feature1Desc}</p>
                </div>
              </div>

              {/* 2. Plumbing & Hardware */}
              <div className="about-feature-card">
                <div className="about-feature-icon accent-blue">
                  <Wrench size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="about-feature-body">
                  <h3 className="about-feature-title">{t.about.feature2Title}</h3>
                  <p className="about-feature-desc">{t.about.feature2Desc}</p>
                </div>
              </div>

              {/* 3. 24/7 Emergency Supply */}
              <div className="about-feature-card">
                <div className="about-feature-icon accent-blue">
                  <Clock size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="about-feature-body">
                  <h3 className="about-feature-title">{t.about.feature3Title}</h3>
                  <p className="about-feature-desc">{t.about.feature3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
