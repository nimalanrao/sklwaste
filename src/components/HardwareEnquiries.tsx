import React from "react";
import { Phone, Check, ArrowRight, HelpCircle } from "lucide-react";
import { businessData, hardwareCategories } from "../data/business";

export const HardwareEnquiries: React.FC = () => {
  return (
    <section id="hardware" className="section" aria-labelledby="hardware-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">HARDWARE SUPPLIES & ENQUIRIES</span>
          <h2 id="hardware-title" className="section-title">
            Looking for Hardware Supplies?
          </h2>
          <p className="section-desc">
            Contact the store to enquire about the products you need. Our team can check in-store stock availability directly before you head over.
          </p>
        </div>

        {/* Central Direct Phone Call Banner */}
        <div className="enquiry-banner">
          <div className="enquiry-banner-content">
            <div className="enquiry-banner-text">
              <h3 className="enquiry-banner-title">Need a specific size, part, or fitting?</h3>
              <p className="enquiry-banner-sub">
                Avoid unnecessary trips by confirming item availability via phone. We are ready to assist.
              </p>
            </div>
            <a 
              href={`tel:${businessData.phone.tel}`}
              className="btn btn-accent btn-lg enquiry-call-btn"
            >
              <Phone size={18} strokeWidth={2} />
              <span>Call Store: {businessData.phone.display}</span>
            </a>
          </div>
        </div>

        {/* Configurable Store Categories Architecture */}
        <div className="categories-header-row">
          <div>
            <h3 className="categories-block-title">Common Hardware Categories</h3>
            <p className="categories-block-desc">
              Categories supported by the store. Specific item brands and live inventory can be confirmed via phone enquiry.
            </p>
          </div>
          <div className="categories-note-pill">
            <HelpCircle size={14} />
            <span>Store owner can update items anytime</span>
          </div>
        </div>

        <div className="categories-grid">
          {hardwareCategories.map((category) => (
            <div key={category.id} className="card card-interactive category-card">
              <div className="category-card-header">
                <span className="category-card-subtitle">{category.subtitle}</span>
                <h4 className="category-card-title">{category.title}</h4>
              </div>

              <p className="category-card-desc">
                {category.description}
              </p>

              <div className="category-items-wrap">
                <span className="category-items-label">Common Supplies:</span>
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
                  <span>Enquire for {category.title.split("&")[0].trim()}</span>
                  <ArrowRight size={14} className="enquire-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Notice Note */}
        <div className="inventory-notice-card">
          <p>
            <strong>Note for customers:</strong> We are continuously organizing in-store stocks. If you require specialty fittings or larger bulk quantities for building works, please call <a href={`tel:${businessData.phone.tel}`} className="text-link phone-number">{businessData.phone.display}</a> in advance.
          </p>
        </div>
      </div>
    </section>
  );
};
