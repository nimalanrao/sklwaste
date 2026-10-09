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
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  User,
  FileText,
  ClipboardCheck,
  CreditCard,
  Banknote,
  Building2,
  QrCode,
  Send,
  Sparkles
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
    paymentMethod,
    setPaymentMethod,
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    isCheckoutOpen, 
    closeCheckout 
  } = useCart();

  // Multi-step checkout state: 1 (Review) -> 2 (Transport) -> 3 (Payment) -> 4 (Send Order)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const [customerName, setCustomerName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const { sheetRef, handleProps, contentProps, isDragging } = useDragToDismiss({
    isOpen: isCheckoutOpen,
    onClose: closeCheckout,
    threshold: 80,
  });

  // Reset to Step 1 when opened, lock body scroll
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
      setCurrentStep(1);
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

  const transportLabel = transportMode === "night" ? "Night Transport (Syif Malam)" : "Day Transport (Syif Siang)";
  const paymentLabel = 
    paymentMethod === "cash" 
      ? "Tunai (Cash on Delivery / COD)" 
      : paymentMethod === "transfer" 
        ? "Pindahan Bank (Online Transfer)" 
        : "DuitNow QR Code";

  // Build the clean, formatted WhatsApp message
  const buildFormattedMessage = () => {
    const transportHeader = transportMode === "night" 
      ? "🌙 Night Transport (Syif Malam 24/7)" 
      : "☀️ Day Transport (Syif Siang: 8:00 AM - 6:00 PM)";

    const paymentHeader = 
      paymentMethod === "cash" 
        ? "💵 Tunai / Cash on Delivery (COD)" 
        : paymentMethod === "transfer" 
          ? "🏦 Pindahan Bank / Online Banking" 
          : "📱 Kod QR DuitNow (DuitNow QR)";

    const itemsList = items.map((item, idx) => {
      const uomText = item.unit ? ` ${item.unit}` : " Unit";
      return `${idx + 1}. *${item.title}*\n   └── Kuantiti: ${item.quantity}${uomText}`;
    }).join("\n\n");

    const nameText = customerName.trim() ? customerName.trim() : "Pelanggan Laman Web";
    const locText = deliveryLocation.trim() ? deliveryLocation.trim() : "Bandar Seri Coalfields / Sekitarnya";
    const noteText = customerNotes.trim() ? customerNotes.trim() : "Tiada catatan tambahan. Sila semak ketersediaan stok & sebut harga.";

    return (
`🏗️ *TEMPAHAN & SEBUT HARGA SKL WASTE*
=========================================
📦 *SENARAI BARANGAN (${totalCount} item):*
${itemsList}

🚚 *WAKTU PENGHANTARAN:*
${transportHeader}

💳 *KAEDAH PEMBAYARAN:*
${paymentHeader}

📍 *MAKLUMAT PENGHANTARAN:*
• Nama / Syarikat: ${nameText}
• Lokasi Tapak: ${locText}
• Catatan: ${noteText}
=========================================
_Dihantar melalui Sistem Pesanan Web SKL Waste_`
    );
  };

  const handleCheckoutSaravanan = () => {
    if (items.length === 0) return;
    const msg = encodeURIComponent(buildFormattedMessage());
    const url = `https://wa.me/${businessData.phone.whatsapp}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCheckoutHari = () => {
    if (items.length === 0) return;
    const msg = encodeURIComponent(buildFormattedMessage());
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
        className={`checkout-sheet checkout-sheet-stepped ${isDragging ? "checkout-sheet-dragging" : ""}`}
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
                Tempahan & Sebut Harga
              </h2>
              <span className="checkout-subtitle tabular-nums">
                Langkah {currentStep} daripada 4 • {totalCount} barangan dipilih
              </span>
            </div>
          </div>

          <div className="checkout-header-actions">
            {items.length > 0 && currentStep === 1 && (
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

        {/* 4-Step Progress Segment Bar with Distinct Icons */}
        {items.length > 0 && (
          <nav className="checkout-step-progress-bar" aria-label="Langkah Pesanan">
            {/* Step 1: Review */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`checkout-step-tab ${currentStep === 1 ? "step-active" : currentStep > 1 ? "step-completed" : ""}`}
              aria-current={currentStep === 1 ? "step" : undefined}
            >
              <div className="step-tab-icon">
                <ClipboardCheck size={16} strokeWidth={2.2} />
              </div>
              <span className="step-tab-text">1. Semak</span>
            </button>

            <div className={`checkout-step-line ${currentStep >= 2 ? "line-active" : ""}`} />

            {/* Step 2: Transport */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`checkout-step-tab ${currentStep === 2 ? "step-active" : currentStep > 2 ? "step-completed" : ""}`}
              aria-current={currentStep === 2 ? "step" : undefined}
            >
              <div className="step-tab-icon">
                <Truck size={16} strokeWidth={2.2} />
              </div>
              <span className="step-tab-text">2. Waktu</span>
            </button>

            <div className={`checkout-step-line ${currentStep >= 3 ? "line-active" : ""}`} />

            {/* Step 3: Payment */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`checkout-step-tab ${currentStep === 3 ? "step-active" : currentStep > 3 ? "step-completed" : ""}`}
              aria-current={currentStep === 3 ? "step" : undefined}
            >
              <div className="step-tab-icon">
                <CreditCard size={16} strokeWidth={2.2} />
              </div>
              <span className="step-tab-text">3. Bayaran</span>
            </button>

            <div className={`checkout-step-line ${currentStep >= 4 ? "line-active" : ""}`} />

            {/* Step 4: Send Order */}
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className={`checkout-step-tab ${currentStep === 4 ? "step-active" : ""}`}
              aria-current={currentStep === 4 ? "step" : undefined}
            >
              <div className="step-tab-icon">
                <Send size={16} strokeWidth={2.2} />
              </div>
              <span className="step-tab-text">4. Hantar</span>
            </button>
          </nav>
        )}

        {/* Main Step Body */}
        <div className="checkout-sheet-body">
          {items.length === 0 ? (
            /* Empty State */
            <div className="checkout-empty-state">
              <div className="checkout-empty-icon-wrap">
                <ShoppingBag size={36} strokeWidth={1.8} className="checkout-empty-icon" />
              </div>
              <h3 className="checkout-empty-title">Senarai anda masih kosong</h3>
              <p className="checkout-empty-desc">
                Pilih mana-mana perkakasan atau bahan binaan dari katalog kami dan tekan "+ Tambah" untuk menyusun tempahan anda.
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
              {/* =========================================================================
                  STEP 1: CONFIRMING ORDER (REVIEW ITEMS & DETAILS)
                  ========================================================================= */}
              {currentStep === 1 && (
                <div className="checkout-step-pane checkout-step-1">
                  <div className="checkout-step-header">
                    <div className="checkout-step-badge">
                      <ClipboardCheck size={18} strokeWidth={2.2} />
                      <span>Langkah 1: Semak Senarai Barangan</span>
                    </div>
                    <span className="checkout-step-hint">
                      Semak kuantiti dan unit ukuran (UOM) sebelum memilih waktu penghantaran.
                    </span>
                  </div>

                  {/* Items List Section */}
                  <section className="checkout-section checkout-items-section">
                    <div className="checkout-items-list">
                      {items.map((item) => {
                        const uomBadge = item.unit ? item.unit : "Unit";

                        return (
                          <article key={item.id} className="checkout-item-card">
                            {/* Contained image preview */}
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
                              <div className="checkout-item-meta-row">
                                <span className="checkout-item-cat">{item.category}</span>
                                <span className="checkout-item-uom-pill" title="Unit of Measurement (UOM)">
                                  UOM: {uomBadge}
                                </span>
                              </div>
                              <h4 className="checkout-item-title" title={item.title}>
                                {item.title}
                              </h4>
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
                                  {item.quantity} <small className="uom-label-abbr">{uomBadge}</small>
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
                        );
                      })}
                    </div>
                  </section>

                  {/* Customer Details Form (Frictionless / No login required) */}
                  <section className="checkout-section checkout-details-section">
                    <span className="checkout-section-label">Maklumat Tapak / Pemesan (Pilihan)</span>

                    <div className="checkout-form-grid">
                      <div className="checkout-field-wrap">
                        <label htmlFor="customer-name" className="checkout-field-label">
                          <User size={13} strokeWidth={2.2} />
                          <span>Nama / Nama Syarikat</span>
                        </label>
                        <input 
                          id="customer-name"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Cth: En. Ahmad / Kontraktor Aiman"
                          className="checkout-input"
                        />
                      </div>

                      <div className="checkout-field-wrap">
                        <label htmlFor="delivery-location" className="checkout-field-label">
                          <MapPin size={13} strokeWidth={2.2} />
                          <span>Lokasi Tapak Binaan / Alamat</span>
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
                          <span>Catatan Tambahan (Lori / Waktu)</span>
                        </label>
                        <input 
                          id="customer-notes"
                          type="text"
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          placeholder="Cth: Lori tipper perlu sampai sebelum 11 pagi / hubungi mandur"
                          className="checkout-input"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Bottom Navigation for Step 1 */}
                  <div className="checkout-step-actions-bar">
                    <div className="checkout-step-summary-chip">
                      <span>Jumlah:</span>
                      <strong>{totalCount} item dipilih</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="checkout-next-step-btn"
                    >
                      <span>Pilih Waktu Logistik</span>
                      <ArrowRight size={16} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 2: PICK TRANSPORT TIME (NIGHT OR DAY)
                  ========================================================================= */}
              {currentStep === 2 && (
                <div className="checkout-step-pane checkout-step-2">
                  <div className="checkout-step-header">
                    <div className="checkout-step-badge">
                      <Truck size={18} strokeWidth={2.2} />
                      <span>Langkah 2: Pilih Waktu Penghantaran Logistik</span>
                    </div>
                    <span className="checkout-step-hint">
                      Lori tipper dan lori kargo sedia beroperasi waktu siang dan syif malam 24/7.
                    </span>
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
                      aria-label="Pilih Day Transport (Syif Siang)"
                    >
                      <div className="checkout-transport-card-top">
                        <div className="checkout-transport-icon-wrap checkout-icon-day">
                          <Sun size={20} strokeWidth={2.2} />
                        </div>
                        <span className={`checkout-transport-radio ${transportMode === "day" ? "radio-checked" : ""}`}>
                          {transportMode === "day" && <CheckCircle2 size={16} strokeWidth={2.5} />}
                        </span>
                      </div>
                      <div className="checkout-transport-card-info">
                        <strong className="checkout-transport-name">Day Transport (Syif Siang)</strong>
                        <span className="checkout-transport-hours">🕒 8:00 AM – 6:00 PM</span>
                        <p className="checkout-transport-desc">
                          Penghantaran standard waktu operasi harian. Sesuai untuk bekalan tapak projek lazim.
                        </p>
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
                      aria-label="Pilih Night Transport (Syif Malam 24/7)"
                    >
                      <div className="checkout-transport-card-top">
                        <div className="checkout-transport-icon-wrap checkout-icon-night">
                          <Moon size={20} strokeWidth={2.2} />
                        </div>
                        <span className={`checkout-transport-radio ${transportMode === "night" ? "radio-checked" : ""}`}>
                          {transportMode === "night" && <CheckCircle2 size={16} strokeWidth={2.5} />}
                        </span>
                      </div>
                      <div className="checkout-transport-card-info">
                        <div className="checkout-night-badge-row">
                          <strong className="checkout-transport-name">Night Transport (Syif Malam)</strong>
                          <span className="checkout-night-live-tag">24/7 On-Call</span>
                        </div>
                        <span className="checkout-transport-hours">🌙 6:00 PM – 8:00 AM (Subuh)</span>
                        <p className="checkout-transport-desc">
                          Penghantaran kecemasan syif malam terus ke tapak binaan tanpa gangguan trafik siang.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-transport-badge-row">
                    <Truck size={14} className="checkout-badge-icon" />
                    <span>
                      Mod Dipilih: <strong>{transportLabel}</strong> • Meliputi Coalfields, Sg. Buloh & Puncak Alam.
                    </span>
                  </div>

                  {/* Bottom Navigation for Step 2 */}
                  <div className="checkout-step-actions-bar">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="checkout-back-step-btn"
                    >
                      <ArrowLeft size={16} strokeWidth={2.4} />
                      <span>Kembali ke Semakan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="checkout-next-step-btn"
                    >
                      <span>Pilih Kaedah Bayaran</span>
                      <ArrowRight size={16} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 3: PAYMENT METHOD (CASH, TRANSFER, QR CODE)
                  ========================================================================= */}
              {currentStep === 3 && (
                <div className="checkout-step-pane checkout-step-3">
                  <div className="checkout-step-header">
                    <div className="checkout-step-badge">
                      <CreditCard size={18} strokeWidth={2.2} />
                      <span>Langkah 3: Pilih Kaedah Pembayaran</span>
                    </div>
                    <span className="checkout-step-hint">
                      Pilih kaedah bayaran yang anda inginkan semasa pesanan dihantar atau diambil.
                    </span>
                  </div>

                  <div className="checkout-payment-cards-grid">
                    {/* Option 1: Cash / COD */}
                    <div 
                      className={`checkout-payment-card ${paymentMethod === "cash" ? "checkout-payment-active" : ""}`}
                      onClick={() => setPaymentMethod("cash")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPaymentMethod("cash");
                        }
                      }}
                      aria-label="Pilih Tunai / Cash on Delivery"
                    >
                      <div className="checkout-payment-icon-box pay-icon-cash">
                        <Banknote size={22} strokeWidth={2.2} />
                      </div>
                      <div className="checkout-payment-info">
                        <div className="checkout-payment-title-row">
                          <strong className="checkout-payment-title">Tunai (Cash on Delivery)</strong>
                          <span className={`checkout-transport-radio ${paymentMethod === "cash" ? "radio-checked" : ""}`}>
                            {paymentMethod === "cash" && <CheckCircle2 size={16} strokeWidth={2.5} />}
                          </span>
                        </div>
                        <span className="checkout-payment-desc">
                          Bayar tunai kepada pemandu lori semasa barangan sampai di tapak atau semasa ambil sendiri di kedai hardware.
                        </span>
                      </div>
                    </div>

                    {/* Option 2: Bank Transfer */}
                    <div 
                      className={`checkout-payment-card ${paymentMethod === "transfer" ? "checkout-payment-active" : ""}`}
                      onClick={() => setPaymentMethod("transfer")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPaymentMethod("transfer");
                        }
                      }}
                      aria-label="Pilih Pindahan Bank Online"
                    >
                      <div className="checkout-payment-icon-box pay-icon-bank">
                        <Building2 size={22} strokeWidth={2.2} />
                      </div>
                      <div className="checkout-payment-info">
                        <div className="checkout-payment-title-row">
                          <strong className="checkout-payment-title">Pindahan Bank (Online Transfer)</strong>
                          <span className={`checkout-transport-radio ${paymentMethod === "transfer" ? "radio-checked" : ""}`}>
                            {paymentMethod === "transfer" && <CheckCircle2 size={16} strokeWidth={2.5} />}
                          </span>
                        </div>
                        <span className="checkout-payment-desc">
                          Pindahan terus (Instant Transfer) ke akaun rasmi SKL Waste Sdn Bhd. Resit boleh dikongsi terus melalui WhatsApp.
                        </span>
                      </div>
                    </div>

                    {/* Option 3: DuitNow QR */}
                    <div 
                      className={`checkout-payment-card ${paymentMethod === "qr" ? "checkout-payment-active" : ""}`}
                      onClick={() => setPaymentMethod("qr")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPaymentMethod("qr");
                        }
                      }}
                      aria-label="Pilih Kod QR DuitNow"
                    >
                      <div className="checkout-payment-icon-box pay-icon-qr">
                        <QrCode size={22} strokeWidth={2.2} />
                      </div>
                      <div className="checkout-payment-info">
                        <div className="checkout-payment-title-row">
                          <strong className="checkout-payment-title">DuitNow QR Code</strong>
                          <span className={`checkout-transport-radio ${paymentMethod === "qr" ? "radio-checked" : ""}`}>
                            {paymentMethod === "qr" && <CheckCircle2 size={16} strokeWidth={2.5} />}
                          </span>
                        </div>
                        <span className="checkout-payment-desc">
                          Imbas kod QR DuitNow dengan mana-mana aplikasi perbankan atau e-Wallet (TNG eWallet, MAE, Boost) semasa lori tiba.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation for Step 3 */}
                  <div className="checkout-step-actions-bar">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="checkout-back-step-btn"
                    >
                      <ArrowLeft size={16} strokeWidth={2.4} />
                      <span>Kembali ke Waktu</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="checkout-next-step-btn checkout-btn-accent"
                    >
                      <span>Seterusnya: Semak & Hantar</span>
                      <ArrowRight size={16} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 4: SEND ORDER (WHATSAPP SUMMARY & CONFIRMATION)
                  ========================================================================= */}
              {currentStep === 4 && (
                <div className="checkout-step-pane checkout-step-4">
                  <div className="checkout-step-header">
                    <div className="checkout-step-badge">
                      <Send size={18} strokeWidth={2.2} />
                      <span>Langkah 4: Hantar Tempahan Terus ke WhatsApp</span>
                    </div>
                    <span className="checkout-step-hint">
                      Pesanan anda disusun dengan rapi berserta unit ukuran, waktu lori, dan pilihan bayaran.
                    </span>
                  </div>

                  {/* Summary Card */}
                  <div className="checkout-order-summary-card">
                    <div className="order-summary-header">
                      <span className="order-summary-tag">
                        <Sparkles size={13} strokeWidth={2.4} />
                        Ringkasan Pesanan Tapak
                      </span>
                      <span className="order-summary-count tabular-nums">{totalCount} item</span>
                    </div>

                    <div className="order-summary-grid">
                      <div className="order-summary-row">
                        <span className="order-summary-label">
                          <Truck size={14} /> Waktu Logistik:
                        </span>
                        <strong className="order-summary-value">{transportLabel}</strong>
                      </div>

                      <div className="order-summary-row">
                        <span className="order-summary-label">
                          <CreditCard size={14} /> Kaedah Bayaran:
                        </span>
                        <strong className="order-summary-value">{paymentLabel}</strong>
                      </div>

                      {customerName.trim() && (
                        <div className="order-summary-row">
                          <span className="order-summary-label">
                            <User size={14} /> Pelanggan:
                          </span>
                          <strong className="order-summary-value">{customerName}</strong>
                        </div>
                      )}

                      {deliveryLocation.trim() && (
                        <div className="order-summary-row">
                          <span className="order-summary-label">
                            <MapPin size={14} /> Lokasi Tapak:
                          </span>
                          <strong className="order-summary-value">{deliveryLocation}</strong>
                        </div>
                      )}
                    </div>

                    {/* Compact Items List Preview */}
                    <div className="order-summary-items-preview">
                      <span className="order-preview-label">Senarai Barangan & UOM:</span>
                      <ul className="order-preview-ul">
                        {items.map((it) => (
                          <li key={it.id} className="order-preview-li">
                            <span className="order-preview-title">{it.title}</span>
                            <span className="order-preview-qty tabular-nums">
                              <strong>{it.quantity}</strong> {it.unit || "Unit"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Live WhatsApp Message Preview Container */}
                  <div className="checkout-preview-box">
                    <div className="checkout-preview-box-header">
                      <MessageCircle size={14} />
                      <span>Format Mesej WhatsApp Yang Akan Dihantar:</span>
                    </div>
                    <pre className="checkout-preview-pre">{buildFormattedMessage()}</pre>
                  </div>

                  {/* Direct WhatsApp Send Buttons */}
                  <div className="checkout-final-buttons-stack">
                    <button 
                      type="button" 
                      onClick={handleCheckoutSaravanan}
                      className="checkout-btn-whatsapp-main"
                      title="Hantar Tempahan ke WhatsApp Saravanan"
                    >
                      <MessageCircle size={20} strokeWidth={2.4} />
                      <div className="btn-wa-text-group">
                        <span className="btn-wa-main-text">Hantar Tempahan ke WhatsApp</span>
                        <span className="btn-wa-sub-text">Saravanan (019-914 4743) • Respon Pantas</span>
                      </div>
                    </button>

                    <button 
                      type="button" 
                      onClick={handleCheckoutHari}
                      className="checkout-btn-whatsapp-sub"
                      title="Hantar kepada En. Hari (Syif Malam / 24/7)"
                    >
                      <Moon size={16} strokeWidth={2.2} />
                      <span>Hantar kepada En. Hari - Syif Malam (016-615 9365)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="checkout-back-step-btn checkout-back-step-btn-center"
                    >
                      <ArrowLeft size={15} strokeWidth={2.4} />
                      <span>Ubah Kaedah Bayaran / Senarai</span>
                    </button>
                  </div>

                  {/* Trust guarantees */}
                  <div className="checkout-trust-row">
                    <div className="checkout-trust-item">
                      <ShieldCheck size={14} className="checkout-trust-icon" />
                      <span>Tanpa perlu daftar akaun</span>
                    </div>
                    <span className="checkout-trust-dot">•</span>
                    <div className="checkout-trust-item">
                      <CheckCircle2 size={14} className="checkout-trust-icon" />
                      <span>Sebut harga terus dari pihak pengurusan SKL</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
