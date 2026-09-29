import React from "react";
import { Phone, Navigation, Clock, MapPin } from "lucide-react";
import { businessData } from "../data/business";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-box">
          <div className="contact-header">
            <span className="eyebrow">CONTACT & ENQUIRIES</span>
            <h2 id="contact-title" className="section-title">
              Get in Touch with Our Hardware Team
            </h2>
            <p className="section-desc">
              Have questions regarding tool specifications, building hardware, or stock in Bandar Seri Coalfields? Reach out directly via telephone or plan your route.
            </p>
          </div>

          <div className="contact-details-grid">
            {/* Direct Phone Card */}
            <div className="contact-info-card">
              <div className="contact-icon-wrapper">
                <Phone size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">Telephone Assistance</h3>
              <p className="contact-info-desc">
                Speak directly with staff for item enquiries, fitting dimensions, or availability.
              </p>
              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-accent btn-lg contact-action-btn phone-number"
              >
                <Phone size={18} strokeWidth={2} />
                <span>Call {businessData.phone.display}</span>
              </a>
            </div>

            {/* In-Store Location Card */}
            <div className="contact-info-card">
              <div className="contact-icon-wrapper">
                <MapPin size={24} strokeWidth={1.8} />
              </div>
              <h3 className="contact-info-title">Storefront Visit</h3>
              <p className="contact-info-desc">
                {businessData.address.full}
              </p>
              <div className="contact-timing-row">
                <Clock size={15} />
                <span>Open · Closes at {businessData.hours.closingTime}</span>
              </div>
              <a 
                href={businessData.googleProfile.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg contact-action-btn"
              >
                <Navigation size={18} strokeWidth={2} />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
