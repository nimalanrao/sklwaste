import React from "react";
import { Phone, Navigation, CheckCircle2, Store, HelpCircle } from "lucide-react";
import { businessData } from "../data/business";

export const About: React.FC = () => {
  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Authentic Editorial Profile */}
          <div className="about-editorial">
            <span className="eyebrow">ABOUT THE STORE</span>
            <h2 id="about-title" className="section-title">
              Serving Bandar Seri Coalfields with Practical Hardware Solutions.
            </h2>
            <p className="about-lead">
              {businessData.fullName} ({businessData.subtitle}) is a hardware store serving customers in Bandar Seri Coalfields, Selangor. Visit the store or get in touch for enquiries.
            </p>
            <p className="about-body">
              Whether you are undertaking DIY home repairs, general building maintenance, plumbing fixes, or commercial trade jobs, our storefront provides local access to essential equipment and everyday hardware materials along Jalan Kuala Selangor.
            </p>

            <div className="about-actions">
              <a 
                href={`tel:${businessData.phone.tel}`} 
                className="btn btn-primary"
              >
                <Phone size={16} strokeWidth={2} />
                <span>Call Store for Enquiries</span>
              </a>
              <a 
                href={businessData.googleProfile.directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <Navigation size={16} strokeWidth={2} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Highlights Cards */}
          <div className="about-features-container">
            <div className="about-feature-card">
              <div className="about-feature-icon-wrap">
                <Store size={22} strokeWidth={1.8} />
              </div>
              <div className="about-feature-content">
                <h3 className="about-feature-title">Local Community Hardware</h3>
                <p className="about-feature-desc">
                  Conveniently situated along Jalan Kuala Selangor to serve residents, property owners, and nearby worksites without unnecessary travel.
                </p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon-wrap">
                <HelpCircle size={22} strokeWidth={1.8} />
              </div>
              <div className="about-feature-content">
                <h3 className="about-feature-title">Direct Stock Enquiries</h3>
                <p className="about-feature-desc">
                  Call 019-914 4743 directly before your visit. We can confirm current availability for fasteners, plumbing parts, hand tools, or specific fittings.
                </p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon-wrap">
                <CheckCircle2 size={22} strokeWidth={1.8} />
              </div>
              <div className="about-feature-content">
                <h3 className="about-feature-title">Convenient Evening Hours</h3>
                <p className="about-feature-desc">
                  Open until 7:00 PM based on our verified Google listing, offering ample time to pick up necessary repair materials after work hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
