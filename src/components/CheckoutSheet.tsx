import React, { useState, useEffect } from "react";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  Truck, 
  Sun, 
  Moon, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  User,
  FileText
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { businessData } from "../data/business";
import { assetUrl } from "../utils/asset";
import { useDragToDismiss } from "../hooks/useDragToDismiss";

export const CheckoutSheet: React.FC = () => {
  const { 
    items, 
    totalCount, 
    transportMode, 
    setTransportMode, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    isCheckoutOpen, 
    closeCheckout 
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const { sheetRef, handleProps, contentProps, isDragging } = useDragToDismiss({
    isOpen: isCheckoutOpen,
    onClose: closeCheckout,
    threshold: 80,
  });

  // Lock body scroll when open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCheckoutOpen) {
        closeCheckout();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCheckoutOpen, closeCheckout]);

  if (!isCheckoutOpen) return null;

  const transportLabel = transportMode === "night" ? "Night Transport" : "Day Transport";

  const generateWhatsAppMessage = () => {
    const transportHeader = transportMode === "night" 
      ? "🌙 Night Transport (Syif Malam 24/7)" 
      : "☀️ Day Transport (Syif Siang)";

    const itemsList = items.map((item, idx) => {
      const unitText = item.unit ? ` (${item.unit})` : "";
      return `${idx + 1}. ${item.title}${unitText} — Kuantiti: ${item.quantity}`;
    }).join("\n");

    const nameText = customerName.trim() ? customerName.trim() : "Pelanggan Laman Web";
    const locText = deliveryLocation.trim() ? deliveryLocation.trim() : "Bandar Seri Coalfields / Sekitarnya";
    const noteText = customerNotes.trim() ? customerNotes.trim() : "Sila semak ketersediaan stok dan sebut harga.";

    const message = 
`*TEMPAHAN & SEBUT HARGA SKL WASTE*
==================================
*PILIHAN PENGHANTARAN:*
${transportHeader}

*SENARAI BARANGAN:*
${itemsList}

*MAKLUMAT PELANGGAN:*
• Nama / Syarikat: ${nameText}
• Lokasi Penghantaran: ${locText}
• Nota Tambahan: ${noteText}
==================================
*PENGESAHAN MOD:* ${transportLabel}
Dihantar terus melalui Katalog SKL Waste.`;

    return encodeURIComponent(message);
  };

  const handleCheckoutSaravanan = () => {
    if (items.length === 0) return;
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/${businessData.phone.whatsapp}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCheckoutHari = () => {
    if (items.length === 0) return;
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/60166159365?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      className="checkout-backdrop" 
      onClick={closeCheckout}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-sheet-title"
    >
      <div 
        ref={sheetRef}
        className={`checkout-sheet ${isDragging ? "checkout-sheet-dragging" : ""}`}
        onClick={(e) => e.stopPropagation()}
        {...contentProps}
      >
        {/* Apple Tactile Drag-Down Handle Bar */}
        <div 
          className="sheet-drag-handle-zone" 
          {...handleProps}
          title="Tarik ke bawah untuk tutup"
        >
          <div className="sheet-drag-pill" />
        </div>

        {/* Top Header Bar */}
        <header className="checkout-sheet-header">
          <div className="checkout-header-left">
            <div className="checkout-icon-badge">
              <ShoppingBag size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h2 id="checkout-sheet-title" className="checkout-title">
                Senarai Tempahan
              </h2>
              <span className="checkout-subtitle tabular-nums">
                {totalCount} {totalCount === 1 ? "barangan dipilih" : "barangan dipilih"}
              </span>
            </div>
          </div>

          <div className="checkout-header-actions">
            {items.length > 0 && (
              <button 
                type="button" 
                onClick={clearCart}
                className="checkout-clear-btn"
                title="Kosongkan senarai"
              >
                Kosongkan
              </button>
            )}
            <button 
              type="button" 
              onClick={closeCheckout}
              className="checkout-close-btn"
              aria-label="Tutup tetingkap pesanan"
              title="Tutup (Esc)"
            >
              <X size={18} strokeWidth={2.4} />
            </button>
          </div>
        </header>

        {/* Main Sheet Body */}
        <div className="checkout-sheet-body">
          {items.length === 0 ? (
            /* Empty State */
            <div className="checkout-empty-state">
              <div className="checkout-empty-icon-wrap">
                <ShoppingBag size={36} strokeWidth={1.8} className="checkout-empty-icon" />
              </div>
              <h3 className="checkout-empty-title">Senarai anda masih kosong</h3>
              <p className="checkout-empty-desc">
                Pilih mana-mana perkakasan atau bahan binaan dari katalog kami dan tekan "Tambah ke Senarai" untuk menyusun tempahan anda.
              </p>
              <button 
                type="button" 
                onClick={closeCheckout}
                className="checkout-browse-btn"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <>
              {/* Items List Section */}
              <section className="checkout-section checkout-items-section">
                <span className="checkout-section-label">Barangan Dalam Senarai</span>
                <div className="checkout-items-list">
                  {items.map((item) => (
                    <article key={item.id} className="checkout-item-card">
                      {/* Contained image preview (No overflow!) */}
                      <div className="checkout-item-thumb-container">
                        <img 
                          src={assetUrl(item.localImage)} 
                          alt={item.title} 
                          className="checkout-item-img"
                          onError={(e) => {
                            if (item.fallbackImage) {
                              e.currentTarget.src = assetUrl(item.fallbackImage);
                            }
                          }}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="checkout-item-details">
                        <span className="checkout-item-cat">{item.category}</span>
                        <h4 className="checkout-item-title" title={item.title}>
                          {item.title}
                        </h4>
                        {item.unit && (
                          <span className="checkout-item-unit">Unit: {item.unit}</span>
                        )}
                      </div>

                      {/* Stepper & Remove Actions */}
                      <div className="checkout-item-actions">
                        <div className="checkout-stepper">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="checkout-stepper-btn"
                            aria-label={`Kurangkan kuantiti ${item.title}`}
                          >
                            <Minus size={13} strokeWidth={2.5} />
                          </button>
                          <span className="checkout-stepper-value tabular-nums">
                            {item.quantity}
                          </span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="checkout-stepper-btn"
                            aria-label={`Tambah kuantiti ${item.title}`}
                          >
                            <Plus size={13} strokeWidth={2.5} />
                          </button>
                        </div>

                        <button 
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="checkout-item-remove-btn"
                          title="Padam dari senarai"
                          aria-label={`Padam ${item.title}`}
                        >
                          <Trash2 size={15} strokeWidth={2} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* TRANSPORT MODE SELECTOR (Strict Requirement: Day Transport vs Night Transport) */}
              <section className="checkout-section checkout-transport-section">
                <div className="checkout-transport-header">
                  <span className="checkout-section-label">Pilihan Waktu Penghantaran (Logistik)</span>
                  <span className="checkout-required-pill">Wajib Pilih</span>
                </div>

                <div className="checkout-transport-cards-grid">
                  {/* Option 1: Day Transport */}
                  <div 
                    className={`checkout-transport-card ${transportMode === "day" ? "checkout-transport-active" : ""}`}
                    onClick={() => setTransportMode("day")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setTransportMode("day");
                      }
                    }}
                    aria-label="Pilih Day Transport (Penghantaran Siang)"
                  >
                    <div className="checkout-transport-card-top">
                      <div className="checkout-transport-icon-wrap checkout-icon-day">
                        <Sun size={18} strokeWidth={2.2} />
                      </div>
                      <span className={`checkout-transport-radio ${transportMode === "day" ? "radio-checked" : ""}`}>
                        {transportMode === "day" && <CheckCircle2 size={15} strokeWidth={2.5} />}
                      </span>
                    </div>
                    <div className="checkout-transport-card-info">
                      <strong className="checkout-transport-name">Day Transport</strong>
                      <span className="checkout-transport-desc">Penghantaran waktu operasi biasa (8:00 AM – 6:00 PM)</span>
                    </div>
                  </div>

                  {/* Option 2: Night Transport */}
                  <div 
                    className={`checkout-transport-card ${transportMode === "night" ? "checkout-transport-active" : ""}`}
                    onClick={() => setTransportMode("night")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setTransportMode("night");
                      }
                    }}
                    aria-label="Pilih Night Transport (Penghantaran Malam Syif 24/7)"
                  >
                    <div className="checkout-transport-card-top">
                      <div className="checkout-transport-icon-wrap checkout-icon-night">
                        <Moon size={18} strokeWidth={2.2} />
                      </div>
                      <span className={`checkout-transport-radio ${transportMode === "night" ? "radio-checked" : ""}`}>
                        {transportMode === "night" && <CheckCircle2 size={15} strokeWidth={2.5} />}
                      </span>
                    </div>
                    <div className="checkout-transport-card-info">
                      <strong className="checkout-transport-name">Night Transport</strong>
                      <span className="checkout-transport-desc">Penghantaran syif malam terus ke tapak binaan (6:00 PM – 8:00 AM)</span>
                    </div>
                  </div>
                </div>

                <div className="checkout-transport-badge-row">
                  <Truck size={14} className="checkout-badge-icon" />
                  <span>
                    Dipilih: <strong>{transportLabel}</strong> • Lori sedia dihantar ke Bandar Seri Coalfields, Sungai Buloh & Puncak Alam.
                  </span>
                </div>
              </section>

              {/* Customer Details Form (Frictionless / No login required) */}
              <section className="checkout-section checkout-details-section">
                <span className="checkout-section-label">Maklumat Tapak (Pilihan / Tanpa Perlu Daftar)</span>

                <div className="checkout-form-grid">
                  <div className="checkout-field-wrap">
                    <label htmlFor="customer-name" className="checkout-field-label">
                      <User size={13} strokeWidth={2.2} />
                      <span>Nama / Syarikat</span>
                    </label>
                    <input 
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Cth: En. Ahmad / Syarikat Pembinaan"
                      className="checkout-input"
                    />
                  </div>

                  <div className="checkout-field-wrap">
                    <label htmlFor="delivery-location" className="checkout-field-label">
                      <MapPin size={13} strokeWidth={2.2} />
                      <span>Lokasi Tapak / Alamat</span>
                    </label>
                    <input 
                      id="delivery-location"
                      type="text"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="Cth: Bandar Seri Coalfields / Puncak Alam"
                      className="checkout-input"
                    />
                  </div>

                  <div className="checkout-field-wrap checkout-field-full">
                    <label htmlFor="customer-notes" className="checkout-field-label">
                      <FileText size={13} strokeWidth={2.2} />
                      <span>Catatan / Kuantiti Tambahan</span>
                    </label>
                    <input 
                      id="customer-notes"
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Cth: Perlu sampai sebelum jam 10 pagi / lori 10 tan"
                      className="checkout-input"
                    />
                  </div>
                </div>
              </section>

              {/* Trust Badges */}
              <div className="checkout-trust-row">
                <div className="checkout-trust-item">
                  <ShieldCheck size={14} className="checkout-trust-icon" />
                  <span>Tanpa caj tersembunyi</span>
                </div>
                <span className="checkout-trust-dot">•</span>
                <div className="checkout-trust-item">
                  <CheckCircle2 size={14} className="checkout-trust-icon" />
                  <span>Sebut harga terus dari pihak pengurusan</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Action Bar */}
        {items.length > 0 && (
          <footer className="checkout-sheet-footer">
            <div className="checkout-footer-summary">
              <span className="checkout-summary-mode">
                Logistik: <strong>{transportLabel}</strong>
              </span>
              <span className="checkout-summary-count tabular-nums">
                Jumlah: <strong>{totalCount} item</strong>
              </span>
            </div>

            <div className="checkout-footer-buttons">
              <button 
                type="button" 
                onClick={handleCheckoutSaravanan}
                className="checkout-btn-primary"
              >
                <MessageCircle size={18} strokeWidth={2.4} />
                <span>Hantar Tempahan (019-914 4743)</span>
              </button>

              <button 
                type="button" 
                onClick={handleCheckoutHari}
                className="checkout-btn-secondary"
                title="Hantar juga kepada En. Hari"
              >
                <MessageCircle size={16} strokeWidth={2.2} />
                <span>WhatsApp En. Hari (016-615 9365)</span>
              </button>
            </div>

            <p className="checkout-footer-hint">
              Pesanan akan diformatkan terus ke WhatsApp berserta mod <strong>{transportLabel}</strong> untuk semakan segera.
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};
