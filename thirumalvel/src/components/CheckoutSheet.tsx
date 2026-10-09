import React, { useState, useEffect, useRef } from "react";
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
  CheckCircle2, 
  MapPin, 
  User, 
  FileText, 
  CreditCard, 
  Banknote, 
  Building2, 
  QrCode, 
  Send, 
  Sparkles, 
  ClipboardCheck, 
  ChevronRight, 
  RotateCcw 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { businessData } from "../data/business";
import { assetUrl } from "../utils/asset";

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

  const { language } = useLanguage();
  const isMalay = language === "ms";

  // 5-Step Kiosk Workflow: 1 (Pesanan) -> 2 (Maklumat Tapak) -> 3 (Waktu) -> 4 (Bayaran) -> 5 (Hantar)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [customerName, setCustomerName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Lock body scroll and handle smooth exit animation
  const [isRendered, setIsRendered] = useState(isCheckoutOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isCheckoutOpen) {
      if (closingTimeoutRef.current) clearTimeout(closingTimeoutRef.current);
      setIsRendered(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
      setCurrentStep(1);
    } else if (isRendered && !isClosing) {
      setIsClosing(true);
      closingTimeoutRef.current = window.setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
        document.body.style.overflow = "";
      }, 230);
    }
    return () => {
      if (closingTimeoutRef.current) clearTimeout(closingTimeoutRef.current);
    };
  }, [isCheckoutOpen]);

  const handleKioskClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    closingTimeoutRef.current = window.setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
      document.body.style.overflow = "";
      closeCheckout();
    }, 210);
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCheckoutOpen && !isClosing) {
        handleKioskClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCheckoutOpen, isClosing]);

  if (!isRendered) return null;

  const transportLabel = transportMode === "night" 
    ? (isMalay ? "Night Transport (Syif Malam)" : "Night Transport (Night Shift 24/7)") 
    : (isMalay ? "Day Transport (Syif Siang)" : "Day Transport (Day Shift: 8am-6pm)");

  const paymentLabel = 
    paymentMethod === "cash" 
      ? (isMalay ? "Tunai (Cash on Delivery)" : "Cash on Delivery (COD)") 
      : paymentMethod === "transfer" 
        ? (isMalay ? "Pindahan Bank (Online Transfer)" : "Online Bank Transfer") 
        : "DuitNow QR Code";

  // Build clean formatted message for WhatsApp
  const buildFormattedMessage = () => {
    const transportHeader = transportMode === "night" 
      ? (isMalay ? "🌙 Night Transport (Syif Malam 24/7)" : "🌙 Night Transport (Night Shift 24/7 On-Call)") 
      : (isMalay ? "☀️ Day Transport (Syif Siang: 8:00 AM - 6:00 PM)" : "☀️ Day Transport (Day Shift: 8:00 AM - 6:00 PM)");

    const paymentHeader = 
      paymentMethod === "cash" 
        ? (isMalay ? "💵 Tunai / Cash on Delivery (COD)" : "💵 Cash on Delivery (COD)") 
        : paymentMethod === "transfer" 
          ? (isMalay ? "🏦 Pindahan Bank / Online Banking" : "🏦 Online Bank Transfer") 
          : (isMalay ? "📱 Kod QR DuitNow (DuitNow QR)" : "📱 DuitNow QR");

    const itemsList = items.map((item, idx) => {
      const uomText = ` ${(item.unit || "UNIT").toUpperCase()}`;
      const qtyLabel = isMalay ? "Kuantiti" : "Quantity";
      return `${idx + 1}. *${item.title}*\n   └── ${qtyLabel}: ${item.quantity}${uomText}`;
    }).join("\n\n");

    const defaultName = isMalay ? "Pelanggan Laman Web" : "Website Customer";
    const defaultLoc = isMalay ? "Bandar Seri Coalfields / Sekitarnya" : "Bandar Seri Coalfields & Vicinity";
    const defaultNote = isMalay 
      ? "Tiada catatan tambahan. Sila semak ketersediaan stok & sebut harga." 
      : "No additional notes. Please verify stock availability and quotation.";

    const nameText = customerName.trim() ? customerName.trim() : defaultName;
    const locText = deliveryLocation.trim() ? deliveryLocation.trim() : defaultLoc;
    const noteText = customerNotes.trim() ? customerNotes.trim() : defaultNote;

    if (isMalay) {
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
    }

    return (
`🏗️ *SKL WASTE HARDWARE ORDER & QUOTATION*
=========================================
📦 *ORDER ITEMS (${totalCount} ${totalCount === 1 ? "item" : "items"}):*
${itemsList}

🚚 *DELIVERY SCHEDULE:*
${transportHeader}

💳 *PAYMENT METHOD:*
${paymentHeader}

📍 *DELIVERY DETAILS:*
• Customer / Company: ${nameText}
• Job Site Location: ${locText}
• Notes: ${noteText}
=========================================
_Sent via SKL Waste Web Order System_`
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

  const goNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
      const body = document.querySelector(".kiosk-main-scroll");
      if (body) body.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
      const body = document.querySelector(".kiosk-main-scroll");
      if (body) body.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleKioskClose();
    }
  };

  const commonLocations = [
    "Bandar Seri Coalfields",
    "Puncak Alam",
    "Saujana Utama",
    "Ijok",
    "Sungai Buloh",
    "Kundang"
  ];

  return (
    <div 
      className={`checkout-kiosk-fullscreen ${isClosing ? "kiosk-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="kiosk-step-heading"
    >
      {/* =========================================================================
          TOP KIOSK HEADER: Navigation, 5-Step Segmented Bar, Language, Dismiss
          ========================================================================= */}
      <header className="kiosk-top-header">
        <div className="kiosk-header-inner">
          {/* Back / Exit Button */}
          <button 
            type="button" 
            onClick={goBack} 
            className="kiosk-header-back-btn"
            title={currentStep > 1 ? (isMalay ? "Kembali ke langkah sebelumnya" : "Back to previous step") : (isMalay ? "Tutup kiosk" : "Close kiosk")}
          >
            {currentStep > 1 ? (
              <>
                <ArrowLeft size={18} strokeWidth={2.4} />
                <span className="kiosk-back-label">{isMalay ? "Undur" : "Back"}</span>
              </>
            ) : (
              <>
                <X size={18} strokeWidth={2.4} />
                <span className="kiosk-back-label">{isMalay ? "Batal" : "Cancel"}</span>
              </>
            )}
          </button>

          {/* McDonald's Style 5-Step Progress Pills */}
          <nav className="kiosk-steps-nav" aria-label={isMalay ? "Langkah Kiosk" : "Kiosk Steps"}>
            <button 
              type="button" 
              onClick={() => setCurrentStep(1)} 
              className={`kiosk-step-pill ${currentStep === 1 ? "is-active" : currentStep > 1 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">1</span>
              <span className="kiosk-step-name">{isMalay ? "Pesanan" : "Items"}</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 2 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(2)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 2 ? "is-active" : currentStep > 2 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">2</span>
              <span className="kiosk-step-name">{isMalay ? "Info Tapak" : "Site Info"}</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 3 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(3)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 3 ? "is-active" : currentStep > 3 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">3</span>
              <span className="kiosk-step-name">{isMalay ? "Waktu" : "Timing"}</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 4 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(4)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 4 ? "is-active" : currentStep > 4 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">4</span>
              <span className="kiosk-step-name">{isMalay ? "Bayaran" : "Payment"}</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 5 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(5)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 5 ? "is-active" : ""}`}
            >
              <span className="kiosk-step-num">5</span>
              <span className="kiosk-step-name">{isMalay ? "Hantar" : "Send"}</span>
            </button>
          </nav>

          {/* Right Header: Language Switcher + Clear + Close Button */}
          <div className="kiosk-header-right">
            <LanguageToggle className="kiosk-lang-toggle" />
            
            {items.length > 0 && currentStep === 1 && (
              <button 
                type="button"
                onClick={clearCart}
                className="kiosk-clear-all-btn"
                title={isMalay ? "Kosongkan semua" : "Clear all"}
              >
                <RotateCcw size={14} />
                <span>{isMalay ? "Kosongkan" : "Clear"}</span>
              </button>
            )}

            <button 
              type="button" 
              onClick={handleKioskClose}
              className="kiosk-close-btn"
              aria-label={isMalay ? "Tutup checkout" : "Close checkout"}
              title={isMalay ? "Tutup (Esc)" : "Close (Esc)"}
            >
              <X size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          KIOSK MAIN SCROLLABLE CONTENT BODY
          ========================================================================= */}
      <main className="kiosk-main-scroll">
        <div className="kiosk-content-wrapper">
          {items.length === 0 ? (
            /* Empty State */
            <div className="kiosk-empty-box">
              <div className="kiosk-empty-icon-circle">
                <ShoppingBag size={42} strokeWidth={1.8} />
              </div>
              <h2 className="kiosk-empty-title">
                {isMalay ? "Pesanan Kosong" : "Cart is Empty"}
              </h2>
              <p className="kiosk-empty-sub">
                {isMalay 
                  ? "Pilih perkakasan atau bahan binaan dari katalog kami untuk memulakan pesanan." 
                  : "Select hardware or building materials from our catalogue to start your order."}
              </p>
              <button 
                type="button" 
                onClick={handleKioskClose} 
                className="kiosk-btn-browse"
              >
                <span>{isMalay ? "Lihat Katalog Produk" : "Browse Product Catalogue"}</span>
                <ArrowRight size={18} strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <>
              {/* ===================================================================
                  STEP 1: SEMAK PESANAN (REVIEW ITEMS & QUANTITIES WITH UOMS)
                  =================================================================== */}
              {currentStep === 1 && (
                <section className="kiosk-step-pane" aria-labelledby="kiosk-step-1-title">
                  <header className="kiosk-pane-banner">
                    <div className="kiosk-pane-badge">
                      <ClipboardCheck size={20} strokeWidth={2.4} />
                      <span className="kiosk-pane-step-tag">
                        {isMalay ? "Langkah 1 / 5" : "Step 1 of 5"}
                      </span>
                    </div>
                    <h1 id="kiosk-step-1-title" className="kiosk-pane-heading">
                      {isMalay ? "Semak Barangan" : "Review Order Items"}
                    </h1>
                    <p className="kiosk-pane-caption">
                      {isMalay 
                        ? "Laraskan kuantiti setiap unit mengikut keperluan tapak anda." 
                        : "Adjust quantities for each item according to your job site requirements."}
                    </p>
                  </header>

                  <div className="kiosk-items-stack">
                    {items.map((item) => {
                      const uomBadge = (item.unit || "UNIT").toUpperCase();

                      return (
                        <article key={item.id} className="kiosk-item-row">
                          <div className="kiosk-item-thumb">
                            <img 
                              src={assetUrl(item.localImage)} 
                              alt={item.title} 
                              className="kiosk-item-img"
                              onError={(e) => {
                                if (item.fallbackImage) {
                                  e.currentTarget.src = assetUrl(item.fallbackImage);
                                }
                              }}
                            />
                          </div>

                          <div className="kiosk-item-meta">
                            <div className="kiosk-item-tags">
                              <span className="kiosk-uom-tag">UOM: {uomBadge}</span>
                              <span className="kiosk-cat-tag">{item.category}</span>
                            </div>
                            <h2 className="kiosk-item-title">{item.title}</h2>
                          </div>

                          <div className="kiosk-item-controls">
                            <div className="kiosk-stepper-box">
                              <button 
                                type="button" 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="kiosk-stepper-btn"
                                aria-label={isMalay ? `Kurangkan ${item.title}` : `Decrease ${item.title}`}
                              >
                                <Minus size={15} strokeWidth={2.8} />
                              </button>

                              <div className="kiosk-stepper-count">
                                <span className="kiosk-stepper-val tabular-nums">{item.quantity}</span>
                                <span className="kiosk-stepper-uom">{uomBadge}</span>
                              </div>

                              <button 
                                type="button" 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="kiosk-stepper-btn"
                                aria-label={isMalay ? `Tambah ${item.title}` : `Increase ${item.title}`}
                              >
                                <Plus size={15} strokeWidth={2.8} />
                              </button>
                            </div>

                            <button 
                              type="button" 
                              onClick={() => removeFromCart(item.id)}
                              className="kiosk-item-del-btn"
                              title={isMalay ? "Padam barangan" : "Remove item"}
                              aria-label={isMalay ? `Padam ${item.title}` : `Remove ${item.title}`}
                            >
                              <Trash2 size={16} strokeWidth={2.2} />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ===================================================================
                  STEP 2: MAKLUMAT TAPAK & PEMESAN (NAME N INFO ONE SECTION)
                  =================================================================== */}
              {currentStep === 2 && (
                <section className="kiosk-step-pane" aria-labelledby="kiosk-step-2-title">
                  <header className="kiosk-pane-banner">
                    <div className="kiosk-pane-badge">
                      <User size={20} strokeWidth={2.4} />
                      <span className="kiosk-pane-step-tag">
                        {isMalay ? "Langkah 2 / 5" : "Step 2 of 5"}
                      </span>
                    </div>
                    <h1 id="kiosk-step-2-title" className="kiosk-pane-heading">
                      {isMalay ? "Maklumat & Lokasi Tapak" : "Site Location & Details"}
                    </h1>
                    <p className="kiosk-pane-caption">
                      {isMalay 
                        ? "Untuk kemudahan pemandu lori menghantar bekalan terus ke tapak binaan anda." 
                        : "Helps our lorry drivers deliver supplies straight to your job site or address."}
                    </p>
                  </header>

                  <div className="kiosk-card-section">
                    <div className="kiosk-field-block">
                      <label htmlFor="kiosk-name" className="kiosk-field-label">
                        <User size={16} strokeWidth={2.2} />
                        <span>{isMalay ? "Nama / Nama Syarikat" : "Your Name / Company Name"}</span>
                      </label>
                      <input 
                        id="kiosk-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={isMalay ? "Cth: En. Ahmad / Mega Bina Enterprise" : "e.g. Mr. David / Bina Jaya Enterprise"}
                        className="kiosk-input-large"
                        autoFocus
                      />
                    </div>

                    <div className="kiosk-field-block">
                      <label htmlFor="kiosk-location" className="kiosk-field-label">
                        <MapPin size={16} strokeWidth={2.2} />
                        <span>{isMalay ? "Lokasi Tapak Binaan / Alamat" : "Job Site Location / Delivery Address"}</span>
                      </label>
                      <input 
                        id="kiosk-location"
                        type="text"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder={isMalay ? "Cth: Bandar Seri Coalfields / Puncak Alam" : "e.g. Bandar Seri Coalfields / Puncak Alam"}
                        className="kiosk-input-large"
                      />

                      {/* Rewarding 1-tap fast location chips */}
                      <div className="kiosk-quick-chips-row">
                        <span className="kiosk-chips-hint">
                          {isMalay ? "Pilih Pantas:" : "Quick Select:"}
                        </span>
                        {commonLocations.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => setDeliveryLocation(loc)}
                            className={`kiosk-chip-btn ${deliveryLocation === loc ? "is-selected" : ""}`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="kiosk-field-block">
                      <label htmlFor="kiosk-notes" className="kiosk-field-label">
                        <FileText size={16} strokeWidth={2.2} />
                        <span>{isMalay ? "Catatan Tambahan (Pilihan)" : "Additional Notes (Optional)"}</span>
                      </label>
                      <input 
                        id="kiosk-notes"
                        type="text"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder={isMalay ? "Cth: Lori tipper masuk ikut pintu belakang / hubungi mandur" : "e.g. Tipper lorry enter back gate / call site supervisor"}
                        className="kiosk-input-large"
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* ===================================================================
                  STEP 3: WAKTU LOGISTIK (DAY TRANSPORT VS NIGHT TRANSPORT)
                  =================================================================== */}
              {currentStep === 3 && (
                <section className="kiosk-step-pane" aria-labelledby="kiosk-step-3-title">
                  <header className="kiosk-pane-banner">
                    <div className="kiosk-pane-badge">
                      <Truck size={20} strokeWidth={2.4} />
                      <span className="kiosk-pane-step-tag">
                        {isMalay ? "Langkah 3 / 5" : "Step 3 of 5"}
                      </span>
                    </div>
                    <h1 id="kiosk-step-3-title" className="kiosk-pane-heading">
                      {isMalay ? "Waktu Penghantaran" : "Delivery Schedule"}
                    </h1>
                    <p className="kiosk-pane-caption">
                      {isMalay 
                        ? "Pilih waktu yang paling sesuai untuk penerimaan barangan di tapak." 
                        : "Choose the delivery timing that fits your site schedule best."}
                    </p>
                  </header>

                  <div className="kiosk-grid-choices">
                    {/* Day Transport Card */}
                    <div 
                      className={`kiosk-choice-card ${transportMode === "day" ? "is-chosen" : ""}`}
                      onClick={() => setTransportMode("day")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setTransportMode("day");
                        }
                      }}
                    >
                      <div className="kiosk-choice-top">
                        <div className="kiosk-choice-icon-wrap day-icon-theme">
                          <Sun size={26} strokeWidth={2.2} />
                        </div>
                        <span className={`kiosk-radio-circle ${transportMode === "day" ? "is-checked" : ""}`}>
                          {transportMode === "day" && <CheckCircle2 size={20} strokeWidth={2.5} />}
                        </span>
                      </div>

                      <div className="kiosk-choice-body">
                        <div className="kiosk-choice-header-row">
                          <h2 className="kiosk-choice-name">Day Transport</h2>
                          <span className="kiosk-choice-pill">
                            {isMalay ? "Syif Siang" : "Day Shift"}
                          </span>
                        </div>
                        <span className="kiosk-choice-time">🕒 8:00 AM – 6:00 PM</span>
                        <p className="kiosk-choice-sub">
                          {isMalay 
                            ? "Waktu penghantaran harian biasa." 
                            : "Standard daytime site delivery schedule."}
                        </p>
                      </div>
                    </div>

                    {/* Night Transport Card */}
                    <div 
                      className={`kiosk-choice-card ${transportMode === "night" ? "is-chosen" : ""}`}
                      onClick={() => setTransportMode("night")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setTransportMode("night");
                        }
                      }}
                    >
                      <div className="kiosk-choice-top">
                        <div className="kiosk-choice-icon-wrap night-icon-theme">
                          <Moon size={26} strokeWidth={2.2} />
                        </div>
                        <span className={`kiosk-radio-circle ${transportMode === "night" ? "is-checked" : ""}`}>
                          {transportMode === "night" && <CheckCircle2 size={20} strokeWidth={2.5} />}
                        </span>
                      </div>

                      <div className="kiosk-choice-body">
                        <div className="kiosk-choice-header-row">
                          <h2 className="kiosk-choice-name">Night Transport</h2>
                          <span className="kiosk-choice-pill night-pill">
                            {isMalay ? "24 Jam On-Call" : "24/7 On-Call"}
                          </span>
                        </div>
                        <span className="kiosk-choice-time">🌙 6:00 PM – 8:00 AM</span>
                        <p className="kiosk-choice-sub">
                          {isMalay 
                            ? "Penghantaran kecemasan malam tanpa jem." 
                            : "Urgent night delivery without traffic congestion."}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ===================================================================
                  STEP 4: CARA BAYARAN (CASH, BANK TRANSFER, QR CODE)
                  =================================================================== */}
              {currentStep === 4 && (
                <section className="kiosk-step-pane" aria-labelledby="kiosk-step-4-title">
                  <header className="kiosk-pane-banner">
                    <div className="kiosk-pane-badge">
                      <CreditCard size={20} strokeWidth={2.4} />
                      <span className="kiosk-pane-step-tag">
                        {isMalay ? "Langkah 4 / 5" : "Step 4 of 5"}
                      </span>
                    </div>
                    <h1 id="kiosk-step-4-title" className="kiosk-pane-heading">
                      {isMalay ? "Kaedah Bayaran" : "Payment Method"}
                    </h1>
                    <p className="kiosk-pane-caption">
                      {isMalay 
                        ? "Pilih cara anda ingin membuat pembayaran semasa barangan tiba." 
                        : "Choose how you would like to pay when supplies arrive at site."}
                    </p>
                  </header>

                  <div className="kiosk-payment-list">
                    {/* Cash */}
                    <div 
                      className={`kiosk-pay-row ${paymentMethod === "cash" ? "is-chosen" : ""}`}
                      onClick={() => setPaymentMethod("cash")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPaymentMethod("cash");
                        }
                      }}
                    >
                      <div className="kiosk-pay-icon pay-cash-theme">
                        <Banknote size={24} strokeWidth={2.2} />
                      </div>
                      <div className="kiosk-pay-info">
                        <div className="kiosk-pay-head">
                          <h2 className="kiosk-pay-title">{isMalay ? "Tunai (COD)" : "Cash on Delivery (COD)"}</h2>
                          <span className="kiosk-pay-badge">{isMalay ? "Paling Lazim" : "Most Common"}</span>
                        </div>
                        <span className="kiosk-pay-desc">
                          {isMalay 
                            ? "Bayar tunai kepada pemandu bila barangan sampai di tapak." 
                            : "Pay cash directly to the driver upon delivery to site."}
                        </span>
                      </div>
                      <span className={`kiosk-radio-circle ${paymentMethod === "cash" ? "is-checked" : ""}`}>
                        {paymentMethod === "cash" && <CheckCircle2 size={20} strokeWidth={2.5} />}
                      </span>
                    </div>

                    {/* Bank Transfer */}
                    <div 
                      className={`kiosk-pay-row ${paymentMethod === "transfer" ? "is-chosen" : ""}`}
                      onClick={() => setPaymentMethod("transfer")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPaymentMethod("transfer");
                        }
                      }}
                    >
                      <div className="kiosk-pay-icon pay-bank-theme">
                        <Building2 size={24} strokeWidth={2.2} />
                      </div>
                      <div className="kiosk-pay-info">
                        <div className="kiosk-pay-head">
                          <h2 className="kiosk-pay-title">{isMalay ? "Pindahan Bank (Online Transfer)" : "Online Bank Transfer"}</h2>
                          <span className="kiosk-pay-badge">{isMalay ? "Syarikat" : "Direct Transfer"}</span>
                        </div>
                        <span className="kiosk-pay-desc">
                          {isMalay 
                            ? "Pindahan atas talian & hantar resit terus melalui WhatsApp." 
                            : "Transfer online and share payment slip directly via WhatsApp."}
                        </span>
                      </div>
                      <span className={`kiosk-radio-circle ${paymentMethod === "transfer" ? "is-checked" : ""}`}>
                        {paymentMethod === "transfer" && <CheckCircle2 size={20} strokeWidth={2.5} />}
                      </span>
                    </div>

                    {/* DuitNow QR */}
                    <div 
                      className={`kiosk-pay-row ${paymentMethod === "qr" ? "is-chosen" : ""}`}
                      onClick={() => setPaymentMethod("qr")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPaymentMethod("qr");
                        }
                      }}
                    >
                      <div className="kiosk-pay-icon pay-qr-theme">
                        <QrCode size={24} strokeWidth={2.2} />
                      </div>
                      <div className="kiosk-pay-info">
                        <div className="kiosk-pay-head">
                          <h2 className="kiosk-pay-title">DuitNow QR</h2>
                          <span className="kiosk-pay-badge">{isMalay ? "Pantas" : "Instant QR"}</span>
                        </div>
                        <span className="kiosk-pay-desc">
                          {isMalay 
                            ? "Imbas kod QR menggunakan MAE, TNG eWallet atau mana-mana aplikasi bank." 
                            : "Scan QR code via MAE, TNG eWallet, or any Malaysian banking app."}
                        </span>
                      </div>
                      <span className={`kiosk-radio-circle ${paymentMethod === "qr" ? "is-checked" : ""}`}>
                        {paymentMethod === "qr" && <CheckCircle2 size={20} strokeWidth={2.5} />}
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* ===================================================================
                  STEP 5: PENGESAHAN & HANTAR KE WHATSAPP (REWARDING KIOSK SUMMARY)
                  =================================================================== */}
              {currentStep === 5 && (
                <section className="kiosk-step-pane" aria-labelledby="kiosk-step-5-title">
                  <header className="kiosk-pane-banner kiosk-banner-celebration">
                    <div className="kiosk-celebrate-badge">
                      <Sparkles size={22} strokeWidth={2.4} />
                    </div>
                    <h1 id="kiosk-step-5-title" className="kiosk-pane-heading">
                      {isMalay ? "Pesanan Sedia Dihantar!" : "Order Ready to Send!"}
                    </h1>
                    <p className="kiosk-pane-caption">
                      {isMalay 
                        ? "Semak ringkasan di bawah dan hantar terus ke talian WhatsApp rasmi SKL Waste." 
                        : "Review your order summary below and forward directly to official SKL Waste WhatsApp."}
                    </p>
                  </header>

                  {/* McDonald's Style Digital Order Ticket Card */}
                  <div className="kiosk-receipt-card">
                    <div className="kiosk-receipt-top">
                      <div className="kiosk-receipt-brand">
                        <strong>SKL WASTE SDN BHD</strong>
                        <span>{isMalay ? "SLIP TEMPAHAN PROJEK" : "PROJECT ORDER SLIP"}</span>
                      </div>
                      <span className="kiosk-receipt-count tabular-nums">
                        {isMalay ? `${totalCount} Item` : `${totalCount} ${totalCount === 1 ? "Item" : "Items"}`}
                      </span>
                    </div>

                    <div className="kiosk-receipt-meta-grid">
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">{isMalay ? "🚚 Waktu Lori:" : "🚚 Delivery Time:"}</span>
                        <strong className="kiosk-receipt-val">{transportLabel}</strong>
                      </div>
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">{isMalay ? "💳 Bayaran:" : "💳 Payment:"}</span>
                        <strong className="kiosk-receipt-val">{paymentLabel}</strong>
                      </div>
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">{isMalay ? "👤 Pemesan:" : "👤 Customer:"}</span>
                        <strong className="kiosk-receipt-val">
                          {customerName.trim() || (isMalay ? "Pelanggan Laman Web" : "Website Customer")}
                        </strong>
                      </div>
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">{isMalay ? "📍 Tapak:" : "📍 Site:"}</span>
                        <strong className="kiosk-receipt-val">{deliveryLocation.trim() || "Bandar Seri Coalfields"}</strong>
                      </div>
                    </div>

                    <div className="kiosk-receipt-items-list">
                      <div className="kiosk-receipt-divider" />
                      <span className="kiosk-receipt-table-header">
                        {isMalay ? "Senarai Barangan & UOM:" : "Order Items & UOM Summary:"}
                      </span>
                      <ul className="kiosk-receipt-ul">
                        {items.map((it) => (
                          <li key={it.id} className="kiosk-receipt-li">
                            <span className="kiosk-receipt-item-title">{it.title}</span>
                            <span className="kiosk-receipt-item-qty tabular-nums">
                              <strong>{it.quantity}</strong> {(it.unit || "UNIT").toUpperCase()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Primary WhatsApp Action Buttons */}
                  <div className="kiosk-final-buttons-stack">
                    <button 
                      type="button" 
                      onClick={handleCheckoutSaravanan}
                      className="kiosk-primary-whatsapp-btn"
                      title={isMalay ? "Hantar Tempahan ke WhatsApp Saravanan" : "Send Order to WhatsApp Saravanan"}
                    >
                      <MessageCircle size={22} strokeWidth={2.4} />
                      <div className="kiosk-wa-btn-labels">
                        <span className="kiosk-wa-main-title">
                          {isMalay ? "Hantar Tempahan ke WhatsApp" : "Send Order via WhatsApp"}
                        </span>
                        <span className="kiosk-wa-sub-title">
                          {isMalay ? "Saravanan (019-914 4743) • Respon Segera" : "Mr. Saravanan (019-914 4743) • Fast Response"}
                        </span>
                      </div>
                      <ArrowRight size={20} strokeWidth={2.4} className="kiosk-wa-arrow" />
                    </button>

                    <button 
                      type="button" 
                      onClick={handleCheckoutHari}
                      className="kiosk-secondary-whatsapp-btn"
                      title={isMalay ? "Hantar ke Syif Malam Hari" : "Send to Night Shift Mr. Hari"}
                    >
                      <Moon size={16} strokeWidth={2.2} />
                      <span>
                        {isMalay ? "Hantar ke En. Hari (Syif Malam: 016-615 9365)" : "Send to Mr. Hari (Night Shift: 016-615 9365)"}
                      </span>
                    </button>
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      {/* =========================================================================
          STICKY BOTTOM KIOSK FOOTER: Item Summary & Large Forward Button
          ========================================================================= */}
      {items.length > 0 && (
        <footer className="kiosk-bottom-bar">
          <div className="kiosk-bar-inner">
            <div className="kiosk-summary-badge">
              <span className="kiosk-summary-sub">
                {isMalay ? "Jumlah Pesanan:" : "Order Total:"}
              </span>
              <strong className="kiosk-summary-count tabular-nums">
                {totalCount} <small>{isMalay ? "Unit/Item" : (totalCount === 1 ? "Unit/Item" : "Units/Items")}</small>
              </strong>
            </div>

            <div className="kiosk-bar-actions">
              {currentStep < 5 ? (
                <button 
                  type="button" 
                  onClick={goNext}
                  className="kiosk-btn-next-action"
                >
                  <span>
                    {currentStep === 1 && (isMalay ? "Maklumat Tapak" : "Site Info")}
                    {currentStep === 2 && (isMalay ? "Pilih Waktu" : "Delivery Schedule")}
                    {currentStep === 3 && (isMalay ? "Kaedah Bayaran" : "Payment Method")}
                    {currentStep === 4 && (isMalay ? "Semak & Hantar" : "Review & Send")}
                  </span>
                  <ChevronRight size={18} strokeWidth={2.6} />
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleCheckoutSaravanan}
                  className="kiosk-btn-next-action is-whatsapp"
                >
                  <Send size={18} strokeWidth={2.4} />
                  <span>{isMalay ? "Hantar Sekarang" : "Send Now"}</span>
                </button>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
