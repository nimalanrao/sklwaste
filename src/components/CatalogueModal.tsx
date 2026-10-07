import React, { useState, useEffect, useCallback } from "react";
import { 
  X, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  Package, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Tag, 
  Layers, 
  Wrench,
  ZoomIn,
  ZoomOut,
  Maximize2
} from "lucide-react";
import type { CatalogueProduct } from "../data/catalogue";
import { businessData } from "../data/business";

interface CatalogueModalProps {
  product: CatalogueProduct | null;
  onClose: () => void;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({ product, onClose }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const handleZoomIn = () => setZoomScale(prev => Math.min(3, +(prev + 0.5).toFixed(1)));
  const handleZoomOut = () => setZoomScale(prev => Math.max(1, +(prev - 0.5).toFixed(1)));
  const handleZoomReset = () => setZoomScale(1);

  const toggleZoom = () => {
    setZoomScale(prev => (prev === 1 ? 2 : 1));
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setZoomScale(1);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          handleCloseLightbox();
        } else {
          onClose();
        }
      } else if (isLightboxOpen) {
        if (e.key === "+" || e.key === "=") {
          handleZoomIn();
        } else if (e.key === "-") {
          handleZoomOut();
        } else if (e.key === "0") {
          handleZoomReset();
        }
      }
    },
    [isLightboxOpen, onClose]
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
    `Hello SKL Waste, saya ingin semak sebut harga dan stok untuk: ${product.title} (${product.unit || 'Lori / Guni / Pail'})`
  );
  const whatsappUrl = `https://wa.me/${businessData.phone.whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <div 
        className="apple-modal-backdrop" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apple-modal-title"
      >
        <div 
          className="apple-modal-sheet" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Apple Circular Dismiss Button */}
          <button 
            type="button"
            className="apple-modal-close-btn" 
            onClick={onClose}
            aria-label="Tutup tetingkap produk"
            title="Tutup (Esc)"
          >
            <X size={18} strokeWidth={2.4} />
          </button>

          <div className="apple-modal-layout">
            {/* Left Column: Visual Showcase & Trust Badges */}
            <div className="apple-modal-stage-col">
              {/* Clickable Image Card with Zoom Hint */}
              <div 
                className="apple-modal-image-card apple-modal-image-card-clickable"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setZoomScale(1);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsLightboxOpen(true);
                    setZoomScale(1);
                  }
                }}
                title="Klik untuk besarkan imej"
                aria-label={`Besarkan imej ${product.title}`}
              >
                <img 
                  src={product.localImage} 
                  alt={product.title} 
                  className="apple-modal-product-img"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== product.fallbackImage) {
                      target.src = product.fallbackImage;
                    }
                  }}
                />

                {/* Floating Apple Zoom Hint Pill */}
                <div className="apple-modal-zoom-hint">
                  <ZoomIn size={13} strokeWidth={2.4} />
                  <span>Klik untuk besarkan</span>
                </div>
              </div>
              
              {/* Apple Product Trust Indicators */}
              <div className="apple-modal-trust-box">
                <div className="apple-trust-pill apple-trust-stock">
                  <span className="apple-pulse-dot" aria-hidden="true" />
                  <span>Ada Stok di Kedai (Ready Stock)</span>
                </div>
                
                <div className="apple-trust-row">
                  <div className="apple-trust-item">
                    <CheckCircle2 size={14} className="apple-trust-icon-green" />
                    <span>100% Tulen & Berkualiti</span>
                  </div>
                  <span className="apple-trust-dot">•</span>
                  <div className="apple-trust-item">
                    <Truck size={14} className="apple-trust-icon-blue" />
                    <span>Penghantaran Lori Disediakan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Craft Hierarchy & Inset Grouped Specs */}
            <div className="apple-modal-details-col">
              {/* Header & Category Eyebrow */}
              <div className="apple-modal-header">
                <div className="apple-eyebrow-row">
                  <span className="apple-cat-pill">
                    <Tag size={12} strokeWidth={2.2} />
                    <span>{product.mainCategory}</span>
                  </span>
                  {product.brand && product.brand !== "SKL Hardware" && (
                    <span className="apple-brand-pill">{product.brand}</span>
                  )}
                </div>

                <h2 id="apple-modal-title" className="apple-modal-title">
                  {product.title}
                </h2>
              </div>

              {/* Apple Inset Metrics Grid (3 Key Specs) */}
              <div className="apple-metric-grid">
                <div className="apple-metric-cell">
                  <div className="apple-metric-header">
                    <Wrench size={12} className="apple-metric-icon" />
                    <span className="apple-metric-label">Jenama</span>
                  </div>
                  <span className="apple-metric-value">{product.brand || "SKL Direct"}</span>
                </div>

                <div className="apple-metric-cell">
                  <div className="apple-metric-header">
                    <Layers size={12} className="apple-metric-icon" />
                    <span className="apple-metric-label">Kategori</span>
                  </div>
                  <span className="apple-metric-value">{product.subCategory || product.mainCategory}</span>
                </div>

                <div className="apple-metric-cell">
                  <div className="apple-metric-header">
                    <Package size={12} className="apple-metric-icon" />
                    <span className="apple-metric-label">Pilihan Saiz</span>
                  </div>
                  <span className="apple-metric-value">{product.unit || "Guni / Ton / Unit"}</span>
                </div>
              </div>

              {/* Apple Inset Grouped Card (Unified Details Container) */}
              <div className="apple-inset-grouped-container">
                {/* Row 1: Technical Overview */}
                {product.description && (
                  <div className="apple-inset-row">
                    <div className="apple-row-icon-squircle apple-squircle-blue">
                      <FileText size={15} strokeWidth={2} />
                    </div>
                    <div className="apple-row-content">
                      <h3 className="apple-row-heading">Penerangan & Ciri Teknikal</h3>
                      <p className="apple-row-text">{product.description}</p>
                    </div>
                  </div>
                )}

                {/* Row 2: Site Application */}
                {product.application && (
                  <div className="apple-inset-row">
                    <div className="apple-row-icon-squircle apple-squircle-amber">
                      <Package size={15} strokeWidth={2} />
                    </div>
                    <div className="apple-row-content">
                      <h3 className="apple-row-heading">Aplikasi & Penggunaan di Tapak</h3>
                      <p className="apple-row-text">{product.application}</p>
                    </div>
                  </div>
                )}

                {/* Row 3: SKL Guarantee & Logistics Commitment */}
                <div className="apple-inset-row apple-row-guarantee">
                  <div className="apple-row-icon-squircle apple-squircle-green">
                    <ShieldCheck size={15} strokeWidth={2} />
                  </div>
                  <div className="apple-row-content">
                    <h3 className="apple-row-heading apple-heading-green">Jaminan Pembekal & Logistik SKL Waste</h3>
                    <p className="apple-row-text">
                      Khidmat penghantaran lori (tipper / kargo) terus ke tapak binaan di Bandar Seri Coalfields, Sungai Buloh, Puncak Alam, Ijok, Kundang & Shah Alam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="apple-modal-actions">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-whatsapp"
                >
                  <MessageCircle size={17} strokeWidth={2.4} />
                  <span>Tanya Sebut Harga (WhatsApp)</span>
                </a>

                <a 
                  href={`tel:${businessData.phone.tel}`}
                  className="apple-btn-call"
                  title={`Panggil talian ${businessData.phone.display}`}
                >
                  <Phone size={15} strokeWidth={2.2} />
                  <span>{businessData.phone.display}</span>
                </a>
              </div>

              <p className="apple-modal-micro-note">
                Pesanan boleh dibuat secara terus atau melalui penghantaran lori. Hubungi juruteknik kami untuk sebut harga pukal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apple Full-Scale Interactive Image Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="apple-lightbox-backdrop"
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Paparan besar imej ${product.title}`}
        >
          {/* Frosted Header Bar */}
          <header 
            className="apple-lightbox-header"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="apple-lightbox-header-info">
              <span className="apple-lightbox-badge">{product.brand || product.mainCategory}</span>
              <span className="apple-lightbox-title" title={product.title}>{product.title}</span>
            </div>

            <div className="apple-lightbox-controls">
              {/* Zoom Segmented Controls */}
              <div className="apple-lightbox-zoom-bar">
                <button 
                  type="button" 
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="apple-lightbox-btn"
                  title="Kecilkan (Zoom Out) [-]"
                  aria-label="Kecilkan imej"
                >
                  <ZoomOut size={16} strokeWidth={2.2} />
                </button>
                <button 
                  type="button" 
                  onClick={handleZoomReset}
                  className="apple-lightbox-btn apple-lightbox-scale-indicator"
                  title="Set semula ke 100% [0]"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
                <button 
                  type="button" 
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3}
                  className="apple-lightbox-btn"
                  title="Besarkan (Zoom In) [+]"
                  aria-label="Besarkan imej"
                >
                  <ZoomIn size={16} strokeWidth={2.2} />
                </button>
              </div>

              {/* Close Lightbox Button */}
              <button 
                type="button" 
                onClick={handleCloseLightbox}
                className="apple-lightbox-close-btn"
                title="Tutup Paparan Besar (Esc)"
                aria-label="Tutup paparan imej besar"
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>
          </header>

          {/* Lightbox Center Viewport */}
          <div 
            className="apple-lightbox-stage"
            onClick={handleCloseLightbox}
          >
            <div 
              className="apple-lightbox-canvas"
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              style={{
                cursor: zoomScale > 1 ? "zoom-out" : "zoom-in"
              }}
              title={zoomScale > 1 ? "Klik untuk kembali ke saiz normal (100%)" : "Klik untuk zum masuk 2x"}
            >
              <img 
                src={product.localImage} 
                alt={product.title} 
                className="apple-lightbox-img"
                style={{
                  transform: `scale(${zoomScale})`
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== product.fallbackImage) {
                    target.src = product.fallbackImage;
                  }
                }}
              />
            </div>
          </div>

          {/* Lightbox Bottom Instructional Hint */}
          <footer 
            className="apple-lightbox-footer"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="apple-lightbox-hint-pill">
              <Maximize2 size={12} strokeWidth={2} />
              <span>Klik imej untuk {zoomScale > 1 ? "kembali ke 100%" : "zum masuk 2x"} • Tekan Esc untuk keluar</span>
            </span>
          </footer>
        </div>
      )}
    </>
  );
};
