import React from "react";
import { Star, ExternalLink, ShieldCheck, MapPin } from "lucide-react";
import { businessData } from "../data/business";

export const ReviewsSummary: React.FC = () => {
  return (
    <section className="section" aria-labelledby="reputation-title">
      <div className="container">
        <div className="reviews-card">
          <div className="reviews-grid">
            {/* Left: Overall Rating Hero */}
            <div className="reviews-score-col">
              <span className="eyebrow" style={{ alignSelf: "flex-start" }}>REPUTATION</span>
              <h2 id="reputation-title" className="reviews-title">
                Google Business Profile Rating
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
                  <span className="reviews-out-of">out of 5.0 rating</span>
                </div>
              </div>

              <p className="reviews-count-text">
                Based on <strong className="tabular-nums">{businessData.googleProfile.reviewCount} customer reviews</strong> submitted on Google Maps.
              </p>
            </div>

            {/* Right: Verification & Transparency Notice */}
            <div className="reviews-detail-col">
              <div className="reputation-verification-box">
                <div className="verification-badge">
                  <ShieldCheck size={18} className="verification-icon" />
                  <span>Public Listing Data</span>
                </div>
                <p className="verification-desc">
                  This score is recorded directly from the official Google Business Profile for <strong>{businessData.fullName}</strong> in Bandar Seri Coalfields, Selangor.
                </p>
                <div className="verification-place-meta">
                  <MapPin size={15} />
                  <span>Place ID: {businessData.googleProfile.placeId}</span>
                </div>
              </div>

              <div className="reviews-cta-wrap">
                <a 
                  href={businessData.googleProfile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary reviews-google-btn"
                >
                  <span>View Reviews on Google Maps</span>
                  <ExternalLink size={16} strokeWidth={2} />
                </a>
                <span className="reviews-disclaimer">
                  We respect authentic customer feedback. Review text and profile details are maintained and verified directly on Google.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
