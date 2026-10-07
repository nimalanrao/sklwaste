import React from "react";
import { Star, ExternalLink, ShieldCheck, MapPin } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const ReviewsSummary: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section" aria-labelledby="reputation-title">
      <div className="container">
        <div className="reviews-card">
          <div className="reviews-grid">
            {/* Left: Overall Rating Hero */}
            <div className="reviews-score-col">
              <span className="eyebrow" style={{ alignSelf: "flex-start" }}>{t.reviews.eyebrow}</span>
              <h2 id="reputation-title" className="reviews-title">
                {t.reviews.title}
              </h2>
              <div className="reviews-score-hero">
                <span className="reviews-huge-num tabular-nums">
                  {businessData.googleProfile.rating.toFixed(1)}
                </span>
                <div className="reviews-stars-wrap">
                  <div className="reviews-stars-row" aria-label="Rating 4.5 out of 5 stars">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} size={22} className="star-icon" fill="currentColor" strokeWidth={0} />
                    ))}
                    {/* Half Star representation */}
                    <div className="half-star-wrap">
                      <Star size={22} className="star-icon star-faded" fill="currentColor" strokeWidth={0} />
                      <div className="half-star-inner">
                        <Star size={22} className="star-icon" fill="currentColor" strokeWidth={0} />
                      </div>
                    </div>
                  </div>
                  <span className="reviews-out-of">{t.reviews.ratingOutOf}</span>
                </div>
              </div>

              <p className="reviews-count-text">
                {t.reviews.countText}
              </p>
            </div>

            {/* Right: Verification & Transparency Notice */}
            <div className="reviews-detail-col">
              <div className="reputation-verification-box">
                <div className="verification-badge">
                  <ShieldCheck size={18} className="verification-icon" />
                  <span>{t.reviews.badgeTitle}</span>
                </div>
                <p className="verification-desc">
                  {t.reviews.badgeDesc}
                </p>
                <div className="verification-place-meta">
                  <MapPin size={15} />
                  <span>{t.reviews.placeIdLabel} {businessData.googleProfile.placeId}</span>
                </div>
              </div>

              <div className="reviews-cta-wrap">
                <a 
                  href={businessData.googleProfile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary reviews-google-btn"
                >
                  <span>{t.reviews.viewOnGoogle}</span>
                  <ExternalLink size={16} strokeWidth={2} />
                </a>
                <span className="reviews-disclaimer">
                  {t.reviews.disclaimer}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
