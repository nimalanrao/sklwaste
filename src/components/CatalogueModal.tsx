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
  Maximize2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import type { CatalogueProduct } from "../data/catalogue";
import { businessData } from "../data/business";
import { assetUrl } from "../utils/asset";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/useLanguage";
import { useDragToDismiss } from "../hooks/useDragToDismiss";

interface CatalogueModalProps {
  product: CatalogueProduct | null;
  onClose: () => void;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({ product, onClose }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [modalQty, setModalQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart, getItemQuantity, openCheckout, totalCount } = useCart();
  const { language } = useLanguage();
  const isMalay = language === "ms";

  const { sheetRef, handleProps, contentProps, isDragging } = useDragToDismiss({
    isOpen: Boolean(product && !isLightboxOpen),
    onClose,
    threshold: 85,
  });

  const handleZoomIn = () => setZoomScale(prev => Math.min(2.5, +(prev + 0.4).toFixed(1)));
  const handleZoomOut = () => setZoomScale(prev => Math.max(1, +(prev - 0.4).toFixed(1)));
  const handleZoomReset = () => setZoomScale(1);

  const toggleZoom = () => {
    setZoomScale(prev => (prev === 1 ? 1.8 : 1));
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setZoomScale(1);
  };

  // Reset quantity when new product opens
  useEffect(() => {
    if (product) {
      setModalQty(1);
      setJustAdded(false);
    }
  }, [product]);

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

  const inCartQty = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product, modalQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  const whatsappMessage = encodeURIComponent(
    isMalay
      ? `Hello SKL Waste, saya ingin semak sebut harga dan stok untuk: ${product.title} (${product.unit || 'UNIT'})`
      : `Hello SKL Waste, I would like to check price and stock availability for: ${product.title} (${product.unit || 'UNIT'})`
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
          ref={sheetRef}
          className={`apple-modal-sheet ${isDragging ? "apple-modal-dragging" : ""}`} 
          onClick={(e) => e.stopPropagation()}
          {...contentProps}
        >
          {/* Apple Tactile Drag-Down Handle Bar for Mobile & Desktop */}
          <div 
            className="sheet-drag-handle-zone" 
            {...handleProps}
            title={isMalay ? "Tarik ke bawah untuk tutup" : "Drag down to close"}
          >
            <div className="sheet-drag-pill" />
          </div>

          {/* Apple Circular Dismiss Button */}
          <button 
            type="button"
            className="apple-modal-close-btn" 
            style={{ minWidth: 44, minHeight: 44 }}
            onClick={onClose}
            aria-label={isMalay ? "Tutup tetingkap produk" : "Close product details"}
            title={isMalay ? "Tutup (Esc)" : "Close (Esc)"}
          >
            <X size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>

          <div className="apple-modal-layout">
            {/* Left Column: Visual Showcase & Trust Badges */}
            <div className="apple-modal-stage-col">
              {/* Clickable Image Card with Zoom Hint */}
              <button
                type="button"
                className="apple-modal-image-card apple-modal-image-card-clickable"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setZoomScale(1);
                }}
                title={isMalay ? "Klik untuk besarkan imej" : "Click to enlarge image"}
                aria-label={isMalay ? `Besarkan imej ${product.title}` : `Enlarge image of ${product.title}`}
              >
                <img 
                  src={assetUrl(product.localImage)} 
                  alt={product.title} 
                  className="apple-modal-product-img"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fb = assetUrl(product.fallbackImage);
                    if (target.src !== fb) {
                      target.src = fb;
                    }
                  }}
                />

                {/* Floating Apple Zoom Hint Pill */}
                <span className="apple-modal-zoom-hint">
                  <ZoomIn size={13} strokeWidth={2.4} aria-hidden="true" />
                  <span>{isMalay ? "Besarkan" : "Zoom"}</span>
                </span>
              </button>
              
              {/* Apple Product Trust Indicators */}
              <div className="apple-modal-trust-box">
                <div className="apple-trust-pill apple-trust-stock">
                  <span className="apple-pulse-dot" aria-hidden="true" />
                  <span>{isMalay ? "Ada Stok di Kedai (Ready Stock)" : "In Stock (Ready for Site Delivery / Pickup)"}</span>
                </div>
                
                <div className="apple-trust-row">
                  <div className="apple-trust-item">
                    <CheckCircle2 size={14} className="apple-trust-icon-green" aria-hidden="true" />
                    <span>{isMalay ? "100% Tulen & Berkualiti" : "100% Genuine & Quality Assured"}</span>
                  </div>
                  <span className="apple-trust-dot" aria-hidden="true">•</span>
                  <div className="apple-trust-item">
                    <Truck size={14} className="apple-trust-icon-blue" aria-hidden="true" />
                    <span>{isMalay ? "Penghantaran Siang & Malam" : "Day & Night Site Delivery"}</span>
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
                    <Tag size={12} strokeWidth={2.2} aria-hidden="true" />
                    <span>{product.mainCategory}</span>
                  </span>
                  {product.brand && product.brand !== "SKL Hardware" && (
                    <span className="apple-brand-pill">{product.brand}</span>
                  )}
                  {inCartQty > 0 && (
                    <span className="apple-incart-badge tabular-nums">
                      {isMalay ? `${inCartQty} dalam senarai` : `${inCartQty} in cart`}
                    </span>
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
                    <Wrench size={12} className="apple-metric-icon" aria-hidden="true" />
                    <span className="apple-metric-label">{isMalay ? "Jenama" : "Brand"}</span>
                  </div>
                  <span className="apple-metric-value">{product.brand || "SKL Direct"}</span>
                </div>

                <div className="apple-metric-cell">
                  <div className="apple-metric-header">
                    <Layers size={12} className="apple-metric-icon" aria-hidden="true" />
                    <span className="apple-metric-label">{isMalay ? "Kategori" : "Category"}</span>
                  </div>
                  <span className="apple-metric-value">{product.subCategory || product.mainCategory}</span>
                </div>

                <div className="apple-metric-cell">
                  <div className="apple-metric-header">
                    <Package size={12} className="apple-metric-icon" aria-hidden="true" />
                    <span className="apple-metric-label">{isMalay ? "Pembungkusan" : "Packaging"}</span>
                  </div>
                  <span className="apple-metric-value">{(product.unit || "UNIT").toUpperCase()}</span>
                </div>
              </div>

              {/* Inset Grouped Card (Unified Details Container) */}
              <div className="apple-inset-grouped-container">
                {product.description && (
                  <div className="apple-inset-row">
                    <div className="apple-row-icon-squircle apple-squircle-blue" aria-hidden="true">
                      <FileText size={15} strokeWidth={2} />
                    </div>
                    <div className="apple-row-content">
                      <h3 className="apple-row-heading">{isMalay ? "Penerangan Ringkas" : "Product Overview & Specs"}</h3>
                      <p className="apple-row-text">{product.description}</p>
                    </div>
                  </div>
                )}

                {product.application && (
                  <div className="apple-inset-row">
                    <div className="apple-row-icon-squircle apple-squircle-amber" aria-hidden="true">
                      <Package size={15} strokeWidth={2} />
                    </div>
                    <div className="apple-row-content">
                      <h3 className="apple-row-heading">{isMalay ? "Aplikasi di Tapak Binaan" : "Site Applications"}</h3>
                      <p className="apple-row-text">{product.application}</p>
                    </div>
                  </div>
                )}

                <div className="apple-inset-row apple-row-guarantee">
                  <div className="apple-row-icon-squircle apple-squircle-green" aria-hidden="true">
                    <ShieldCheck size={15} strokeWidth={2} />
                  </div>
                  <div className="apple-row-content">
                    <h3 className="apple-row-heading apple-heading-green">{isMalay ? "Logistik SKL Waste" : "SKL Waste Logistics"}</h3>
                    <p className="apple-row-text">
                      {isMalay 
                        ? "Lori tipper & kargo sedia dihantar waktu siang atau syif malam 24/7 ke Bandar Seri Coalfields, Sungai Buloh & Puncak Alam." 
                        : "Tipper & cargo lorries ready for day or 24/7 night delivery across Bandar Seri Coalfields, Sungai Buloh & Puncak Alam."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Cart Action Panel Inside Modal */}
              <div className="apple-modal-cart-panel">
                <div className="apple-cart-stepper-row">
                  <span className="apple-cart-stepper-label">{isMalay ? "Pilih Kuantiti:" : "Quantity:"}</span>
                  <div className="checkout-stepper">
                    <button 
                      type="button"
                      onClick={() => setModalQty(prev => Math.max(1, prev - 1))}
                      className="checkout-stepper-btn"
                      style={{ minWidth: 44, minHeight: 44 }}
                      aria-label={isMalay ? "Kurangkan kuantiti" : "Decrease quantity"}
                    >
                      <Minus size={13} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                    <span className="checkout-stepper-value tabular-nums">{modalQty}</span>
                    <button 
                      type="button"
                      onClick={() => setModalQty(prev => prev + 1)}
                      className="checkout-stepper-btn"
                      style={{ minWidth: 44, minHeight: 44 }}
                      aria-label={isMalay ? "Tambah kuantiti" : "Increase quantity"}
                    >
                      <Plus size={13} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="apple-modal-cart-buttons">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`apple-modal-add-btn ${justAdded ? "btn-just-added" : ""}`}
                    style={{ minHeight: 44 }}
                  >
                    {justAdded ? (
                      <>
                        <CheckCircle2 size={17} strokeWidth={2.4} aria-hidden="true" />
                        <span>{isMalay ? "Dimasukkan ke Senarai" : "Added to Cart"}</span>
                      </>
                    ) : (
                      <>
                        <Plus size={17} strokeWidth={2.4} aria-hidden="true" />
                        <span>{isMalay ? "Tambah ke Senarai Pesanan" : "Add to Order Cart"}</span>
                      </>
                    )}
                  </button>

                  {totalCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openCheckout();
                      }}
                      className="apple-modal-view-cart-btn"
                      style={{ minHeight: 44 }}
                    >
                      <ShoppingBag size={16} strokeWidth={2.2} aria-hidden="true" />
                      <span className="tabular-nums">{isMalay ? `Lihat Senarai (${totalCount})` : `View Cart (${totalCount})`}</span>
                      <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {/* Secondary Instant WhatsApp & Direct Call */}
              <div className="apple-modal-actions">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-whatsapp"
                  style={{ minHeight: 44 }}
                >
                  <MessageCircle size={17} strokeWidth={2.4} aria-hidden="true" />
                  <span className="tabular-nums">{isMalay ? "Tanya WhatsApp (019-914 4743)" : "WhatsApp Quote (019-914 4743)"}</span>
                </a>

                <a 
                  href={`tel:${businessData.phone.tel}`}
                  className="apple-btn-call"
                  style={{ minHeight: 44 }}
                  title={isMalay ? `Panggil talian ${businessData.phone.display}` : `Call ${businessData.phone.display}`}
                >
                  <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
                  <span className="tabular-nums">{businessData.phone.display}</span>
                </a>
              </div>
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
          aria-label={isMalay ? `Paparan besar imej ${product.title}` : `Full size image view of ${product.title}`}
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
              <div className="apple-lightbox-zoom-bar">
                <button 
                  type="button" 
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="apple-lightbox-btn"
                  style={{ minWidth: 44, minHeight: 44 }}
                  title={isMalay ? "Kecilkan [-]" : "Zoom out [-]"}
                  aria-label={isMalay ? "Kecilkan imej" : "Zoom out image"}
                >
                  <ZoomOut size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <span className="apple-lightbox-zoom-text tabular-nums">{Math.round(zoomScale * 100)}%</span>
                <button 
                  type="button" 
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 2.5}
                  className="apple-lightbox-btn"
                  style={{ minWidth: 44, minHeight: 44 }}
                  title={isMalay ? "Besarkan [+]" : "Zoom in [+]"}
                  aria-label={isMalay ? "Besarkan imej" : "Zoom in image"}
                >
                  <ZoomIn size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <button 
                  type="button" 
                  onClick={handleZoomReset}
                  className="apple-lightbox-btn"
                  style={{ minWidth: 44, minHeight: 44 }}
                  title={isMalay ? "Reset saiz [0]" : "Reset zoom [0]"}
                  aria-label={isMalay ? "Reset saiz imej" : "Reset zoom"}
                >
                  <Maximize2 size={15} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>

              <button 
                type="button"
                onClick={handleCloseLightbox}
                className="apple-lightbox-close-btn"
                style={{ minWidth: 44, minHeight: 44 }}
                aria-label={isMalay ? "Tutup paparan imej" : "Close image viewer"}
                title={isMalay ? "Tutup (Esc)" : "Close (Esc)"}
              >
                <X size={20} strokeWidth={2.4} aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* Lightbox Stage */}
          <div 
            className="apple-lightbox-stage"
            onClick={toggleZoom}
          >
            <img 
              src={assetUrl(product.localImage)} 
              alt={product.title}
              className="apple-lightbox-image"
              style={{
                transform: `scale(${zoomScale})`,
                cursor: zoomScale === 1 ? "zoom-in" : "zoom-out",
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
