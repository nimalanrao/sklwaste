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
          ref={sheetRef}
          className={`apple-modal-sheet ${isDragging ? "apple-modal-dragging" : ""}`} 
          onClick={(e) => e.stopPropagation()}
          {...contentProps}
        >
          {/* Apple Tactile Drag-Down Handle Bar for Mobile & Desktop */}
          <div 
            className="sheet-drag-handle-zone" 
            {...handleProps}
            title="Tarik ke bawah untuk tutup"
          >
            <div className="sheet-drag-pill" />
          </div>

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
              {/* Clickable Image Card with Zoom Hint (Strictly contained, no overflow!) */}
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
                <div className="apple-modal-zoom-hint">
                  <ZoomIn size={13} strokeWidth={2.4} />
                  <span>Besarkan</span>
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
                    <span>Penghantaran Siang & Malam</span>
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
                  {inCartQty > 0 && (
                    <span className="apple-incart-badge">
                      {inCartQty} dalam senarai
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
                    <span className="apple-metric-label">Unit Ukuran (UOM)</span>
                  </div>
                  <span className="apple-metric-value font-semibold text-blue-600">{(product.unit || "UNIT").toUpperCase()}</span>
                </div>
              </div>

              {/* Inset Grouped Card (Unified Details Container) */}
              <div className="apple-inset-grouped-container">
                {product.description && (
                  <div className="apple-inset-row">
                    <div className="apple-row-icon-squircle apple-squircle-blue">
                      <FileText size={15} strokeWidth={2} />
                    </div>
                    <div className="apple-row-content">
                      <h3 className="apple-row-heading">Penerangan Ringkas</h3>
                      <p className="apple-row-text">{product.description}</p>
                    </div>
                  </div>
                )}

                {product.application && (
                  <div className="apple-inset-row">
                    <div className="apple-row-icon-squircle apple-squircle-amber">
                      <Package size={15} strokeWidth={2} />
                    </div>
                    <div className="apple-row-content">
                      <h3 className="apple-row-heading">Aplikasi di Tapak Binaan</h3>
                      <p className="apple-row-text">{product.application}</p>
                    </div>
                  </div>
                )}

                <div className="apple-inset-row apple-row-guarantee">
                  <div className="apple-row-icon-squircle apple-squircle-green">
                    <ShieldCheck size={15} strokeWidth={2} />
                  </div>
                  <div className="apple-row-content">
                    <h3 className="apple-row-heading apple-heading-green">Logistik SKL Waste</h3>
                    <p className="apple-row-text">
                      Lori tipper & kargo sedia dihantar waktu siang atau syif malam 24/7 ke Bandar Seri Coalfields, Sungai Buloh & Puncak Alam.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Cart Action Panel Inside Modal */}
              <div className="apple-modal-cart-panel">
                <div className="apple-cart-stepper-row">
                  <span className="apple-cart-stepper-label">Pilih Kuantiti:</span>
                  <div className="checkout-stepper">
                    <button 
                      type="button"
                      onClick={() => setModalQty(prev => Math.max(1, prev - 1))}
                      className="checkout-stepper-btn"
                      aria-label="Kurangkan kuantiti"
                    >
                      <Minus size={13} strokeWidth={2.5} />
                    </button>
                    <span className="checkout-stepper-value tabular-nums">{modalQty}</span>
                    <button 
                      type="button"
                      onClick={() => setModalQty(prev => prev + 1)}
                      className="checkout-stepper-btn"
                      aria-label="Tambah kuantiti"
                    >
                      <Plus size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="apple-modal-cart-buttons">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`apple-modal-add-btn ${justAdded ? "btn-just-added" : ""}`}
                  >
                    {justAdded ? (
                      <>
                        <CheckCircle2 size={17} strokeWidth={2.4} />
                        <span>Dimasukkan ke Senarai!</span>
                      </>
                    ) : (
                      <>
                        <Plus size={17} strokeWidth={2.4} />
                        <span>Tambah ke Senarai Pesanan</span>
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
                    >
                      <ShoppingBag size={16} strokeWidth={2.2} />
                      <span>Lihat Senarai ({totalCount})</span>
                      <ArrowRight size={14} strokeWidth={2.2} />
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
                >
                  <MessageCircle size={17} strokeWidth={2.4} />
                  <span>Tanya WhatsApp (019-914 4743)</span>
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
            </div>
          </div>
        </div>
      </div>

      {/* Apple Full-Scale Interactive Image Lightbox Modal (Contained, no horizontal scroll leak!) */}
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
              <div className="apple-lightbox-zoom-bar">
                <button 
                  type="button" 
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="apple-lightbox-btn"
                  title="Kecilkan [-]"
                  aria-label="Kecilkan imej"
                >
                  <ZoomOut size={16} strokeWidth={2.2} />
                </button>
                <button 
                  type="button" 
                  onClick={handleZoomReset}
                  className="apple-lightbox-btn apple-lightbox-scale-indicator"
                  title="Set semula ke 100%"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
                <button 
                  type="button" 
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 2.5}
                  className="apple-lightbox-btn"
                  title="Besarkan [+]"
                  aria-label="Besarkan imej"
                >
                  <ZoomIn size={16} strokeWidth={2.2} />
                </button>
              </div>

              <button 
                type="button" 
                onClick={handleCloseLightbox}
                className="apple-lightbox-close-btn"
                title="Tutup (Esc)"
                aria-label="Tutup paparan imej besar"
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>
          </header>

          {/* Lightbox Center Viewport - Strictly Contained, No Horizontal Overflow */}
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
              title={zoomScale > 1 ? "Klik untuk kembali ke 100%" : "Klik untuk zum masuk"}
            >
              <img 
                src={assetUrl(product.localImage)} 
                alt={product.title} 
                className="apple-lightbox-img"
                style={{
                  transform: `scale(${zoomScale})`
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  const fb = assetUrl(product.fallbackImage);
                  if (target.src !== fb) {
                    target.src = fb;
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
              <span>Ketik imej untuk {zoomScale > 1 ? "kembali ke saiz asal" : "zum masuk"} • Tekan luar atau Esc untuk tutup</span>
            </span>
          </footer>
        </div>
      )}
    </>
  );
};
