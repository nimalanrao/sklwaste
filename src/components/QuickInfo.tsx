import React from "react";
import { Star, MessageSquareQuote, ShieldAlert, Store } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

export const QuickInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="stats-strip-section" aria-label="Trust and Business Statistics">
      <div className="container">
        <div className="stats-strip-card">
          {/* 1. 4.5/5 Google Rating */}
          <a
            href={businessData.googleProfile.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-item"
          >
            <div className="stat-icon-wrap stat-blue" aria-hidden="true">
              <Star size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="stat-body">
              <span className="stat-figure tabular-nums">{t.stats.ratingValue}</span>
              <span className="stat-label tabular-nums">{t.stats.ratingLabel}</span>
            </div>
          </a>

          <div className="stat-divider" aria-hidden="true" />

          {/* 2. 9 Google Reviews */}
          <a
            href={businessData.googleProfile.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-item"
          >
            <div className="stat-icon-wrap stat-green" aria-hidden="true">
              <MessageSquareQuote size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="stat-body">
              <span className="stat-figure tabular-nums">{t.stats.reviewsValue}</span>
              <span className="stat-label tabular-nums">{t.stats.reviewsLabel}</span>
            </div>
          </a>

          <div className="stat-divider" aria-hidden="true" />

          {/* 3. 24/7 Emergency Supply */}
          <a
            href={`tel:${businessData.phone.afterHoursTel}`}
            className="stat-item"
          >
            <div className="stat-icon-wrap stat-blue" aria-hidden="true">
              <ShieldAlert size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="stat-body">
              <span className="stat-figure tabular-nums">{t.stats.emergencyValue}</span>
              <span className="stat-label tabular-nums">{t.stats.emergencyLabel}</span>
            </div>
          </a>

          <div className="stat-divider" aria-hidden="true" />

          {/* 4. Daily Walk-In Service */}
          <a
            href="#location"
            className="stat-item"
          >
            <div className="stat-icon-wrap stat-green" aria-hidden="true">
              <Store size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="stat-body">
              <span className="stat-figure tabular-nums">{t.stats.walkInValue}</span>
              <span className="stat-label tabular-nums">{t.stats.walkInLabel}</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
