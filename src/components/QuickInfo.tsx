import React from "react";
import { Wrench, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { businessData } from "../data/business";

export const QuickInfo: React.FC = () => {
  return (
    <section className="quick-info-section" aria-label="Key Store Information">
      <div className="container">
        <div className="quick-info-grid">
          {/* 1. Business Category */}
          <div className="quick-info-item">
            <div className="quick-info-icon-wrap">
              <Wrench size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">Business Type</span>
              <span className="quick-info-val">{businessData.category}</span>
              <span className="quick-info-sub">{businessData.subtitle}</span>
            </div>
          </div>

          {/* 2. Location */}
          <a 
            href={businessData.googleProfile.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-info-item quick-info-link"
            title="Open address in Google Maps"
          >
            <div className="quick-info-icon-wrap">
              <MapPin size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">Location</span>
              <span className="quick-info-val">{businessData.address.area}</span>
              <span className="quick-info-sub">Jln Kuala Selangor, 47000</span>
            </div>
            <ArrowUpRight size={15} className="quick-info-arrow" />
          </a>

          {/* 3. Phone */}
          <a 
            href={`tel:${businessData.phone.tel}`}
            className="quick-info-item quick-info-link"
            title={`Call ${businessData.phone.display}`}
          >
            <div className="quick-info-icon-wrap">
              <Phone size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">Phone Enquiries</span>
              <span className="quick-info-val phone-number">{businessData.phone.display}</span>
              <span className="quick-info-sub">Direct store line</span>
            </div>
            <ArrowUpRight size={15} className="quick-info-arrow" />
          </a>

          {/* 4. Closing Time */}
          <div className="quick-info-item">
            <div className="quick-info-icon-wrap">
              <Clock size={20} strokeWidth={1.8} />
            </div>
            <div className="quick-info-body">
              <span className="quick-info-label">Store Hours</span>
              <div className="quick-info-status-row">
                <span className="quick-info-val">Closes at 7:00 PM</span>
              </div>
              <span className="quick-info-sub">Verified Google listing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
