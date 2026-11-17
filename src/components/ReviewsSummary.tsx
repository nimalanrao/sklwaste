import React from "react";
import {
  Clock,
  MapPin,
  Layers,
  HardHat,
  PhoneCall,
  Store
} from "lucide-react";
import { useLanguage } from "../context/useLanguage";

export const ReviewsSummary: React.FC = () => {
  const { t } = useLanguage();

  const getIcon = (id: string) => {
    switch (id) {
      case "emergency":
        return <Clock size={20} strokeWidth={2} aria-hidden="true" />;
      case "location":
        return <MapPin size={20} strokeWidth={2} aria-hidden="true" />;
      case "range":
        return <Layers size={20} strokeWidth={2} aria-hidden="true" />;
      case "contractors":
        return <HardHat size={20} strokeWidth={2} aria-hidden="true" />;
      case "direct":
        return <PhoneCall size={20} strokeWidth={2} aria-hidden="true" />;
      case "walkin":
      default:
        return <Store size={20} strokeWidth={2} aria-hidden="true" />;
    }
  };

  return (
    <section id="why-choose-us" className="section why-choose-section" aria-labelledby="why-choose-title">
      <div className="container">
        <div className="why-choose-header">
          <h2 id="why-choose-title" className="section-title">
            {t.whyChooseUs.title}
          </h2>
        </div>

        <div className="why-choose-grid">
          {t.whyChooseUs.items.map((item) => (
            <article key={item.id} className="why-feature-card">
              <div className="why-icon-squircle tone-blue">
                {getIcon(item.id)}
              </div>
              <h3 className="why-feature-title">{item.title}</h3>
              <p className="why-feature-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
