import React from "react";
import { Phone, Check, ArrowRight, HelpCircle, Layers } from "lucide-react";
import { businessData } from "../data/business";
import { useLanguage } from "../context/useLanguage";

interface HardwareEnquiriesProps {
  onOpenCatalogue?: () => void;
}

export const HardwareEnquiries: React.FC<HardwareEnquiriesProps> = ({ onOpenCatalogue }) => {
  const { t } = useLanguage();

  return (
    <section id="hardware" className="section" aria-labelledby="hardware-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">{t.hardware.eyebrow}</span>
          <h2 id="hardware-title" className="section-title">
            {t.hardware.title}
          </h2>
          <p className="section-desc">
            {t.hardware.desc}
          </p>
        </div>

        {/* Featured Building Materials Catalogue Callout */}
        <div className="catalogue-promo-banner">
          <div className="catalogue-promo-content">
            <div className="catalogue-promo-tag">
              <Layers size={14} />
              <span>Full Product Inventory</span>
            </div>
            <h3 className="catalogue-promo-title">
              Brick, Block & Paver Online Catalogue
            </h3>
            <p className="catalogue-promo-desc">
              Browse 15+ verified building materials: PBM Batu Angin, Uni Paver, Grass Pavers, AAC Lightweight Blocks, Sand Bricks & Common Bricks with exact dimensions and technical specs.
            </p>
          </div>
          <button 
            type="button"
            onClick={onOpenCatalogue}
            className="btn btn-primary btn-lg catalogue-promo-btn"
          >
            <span>Browse Full Catalogue (15 Items)</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Central Direct Phone Call Banner with Brand Green & Blue */}
        <div className="enquiry-banner">
          <div className="enquiry-banner-content">
            <div className="enquiry-banner-text">
              <h3 className="enquiry-banner-title">{t.hardware.bannerTitle}</h3>
              <p className="enquiry-banner-sub">
                {t.hardware.bannerSub}
              </p>
            </div>
            <a 
              href={`tel:${businessData.phone.tel}`}
              className="btn btn-accent btn-lg enquiry-call-btn phone-number"
            >
              <Phone size={18} strokeWidth={2} />
              <span>{t.hardware.bannerButton}</span>
            </a>
          </div>
        </div>

        {/* Configurable Store Categories Architecture */}
        <div className="categories-header-row">
          <div>
            <h3 className="categories-block-title">{t.hardware.categoriesTitle}</h3>
            <p className="categories-block-desc">
              {t.hardware.categoriesDesc}
            </p>
          </div>
          <div className="categories-note-pill">
            <HelpCircle size={14} />
            <span>{t.hardware.categoriesNote}</span>
          </div>
        </div>

        <div className="categories-grid">
          {t.hardware.categories.map((category) => (
            <div key={category.id} className="card card-interactive category-card">
              <div className="category-card-header">
                <span className="category-card-subtitle">{category.subtitle}</span>
                <h4 className="category-card-title">{category.title}</h4>
              </div>

              <p className="category-card-desc">
                {category.description}
              </p>

              <div className="category-items-wrap">
                <span className="category-items-label">{t.hardware.commonSuppliesLabel}</span>
                <ul className="category-items-list" aria-label={`Examples of ${category.title}`}>
                  {category.commonItems.map((item, idx) => (
                    <li key={idx} className="category-item-tag">
                      <Check size={12} className="tag-check-icon" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="category-card-footer">
                <a 
                  href={`tel:${businessData.phone.tel}`}
                  className="category-enquire-link"
                  aria-label={`Enquire about ${category.title} by calling store`}
                >
                  <span>{t.hardware.enquireAction} {category.title.split("&")[0].trim()}</span>
                  <ArrowRight size={14} className="enquire-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Notice Note */}
        <div className="inventory-notice-card">
          <h4 className="inventory-notice-title">{t.hardware.customerNoticeTitle}</h4>
          <p className="inventory-notice-text">
            {t.hardware.customerNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
