import React, { useEffect, useCallback } from "react";
import { X, CheckCircle2, MessageCircle, Phone, Package, Layers, ShieldCheck } from "lucide-react";
import type { CatalogueProduct } from "../data/catalogue";
import { useLanguage } from "../context/useLanguage";
import { businessData } from "../data/business";

interface CatalogueModalProps {
  product: CatalogueProduct | null;
  onClose: () => void;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({ product, onClose }) => {
  const { t } = useLanguage();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, handleKeyDown]);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello SKL Waste, saya ingin semak sebut harga dan stok untuk: ${product.title}`
  );
  const whatsappUrl = `https://wa.me/${businessData.phone.whatsapp}?text=${whatsappMessage}`;

  return (
    <div 
      className="catalogue-modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-modal-title"
    >
      <div 
        className="catalogue-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="catalogue-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="catalogue-modal-grid">
          {/* Product Image Frame */}
          <div className="catalogue-modal-media">
            <img 
              src={product.localImage} 
              alt={product.title} 
              className="catalogue-modal-img"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== product.fallbackImage) {
                  target.src = product.fallbackImage;
                }
              }}
            />
            <div className="catalogue-modal-badges">
              <span className="badge badge-brand">{product.brand}</span>
              <span className="badge badge-stock">
                <CheckCircle2 size={13} />
                <span>{t.catalogue.inStock}</span>
              </span>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="catalogue-modal-info">
            <div className="catalogue-modal-header">
              <span className="catalogue-cat-tag">{product.category}</span>
              <h2 id="catalogue-modal-title" className="catalogue-modal-title">
                {product.title}
              </h2>
            </div>

            {/* Specifications Section */}
            <div className="catalogue-detail-box">
              <h3 className="catalogue-detail-heading">
                <Layers size={16} />
                <span>{t.catalogue.specTitle}</span>
              </h3>
              <p className="catalogue-detail-text">{product.spec}</p>
            </div>

            {/* Application Section */}
            <div className="catalogue-detail-box">
              <h3 className="catalogue-detail-heading">
                <Package size={16} />
                <span>{t.catalogue.appTitle}</span>
              </h3>
              <p className="catalogue-detail-text">{product.application}</p>
            </div>

            {/* Supply Guarantee */}
            <div className="catalogue-detail-box catalogue-delivery-box">
              <h3 className="catalogue-detail-heading">
                <ShieldCheck size={16} />
                <span>SKL Waste Guarantee</span>
              </h3>
              <p className="catalogue-delivery-text">
                {t.catalogue.siteDeliveryNotice}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="catalogue-modal-actions">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary catalogue-wa-btn"
              >
                <MessageCircle size={16} />
                <span>{t.catalogue.enquireWhatsapp}</span>
              </a>

              <a 
                href={`tel:${businessData.phone.tel}`}
                className="btn btn-secondary catalogue-call-btn phone-number"
              >
                <Phone size={16} />
                <span>{businessData.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
