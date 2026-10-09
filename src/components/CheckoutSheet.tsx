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

  // 5-Step Kiosk Workflow: 1 (Pesanan) -> 2 (Maklumat Tapak) -> 3 (Waktu) -> 4 (Bayaran) -> 5 (Hantar)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [customerName, setCustomerName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Lock body scroll when kiosk is open
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
      ? "Tunai (Cash on Delivery)" 
      : paymentMethod === "transfer" 
        ? "Pindahan Bank (Online Transfer)" 
        : "DuitNow QR Code";

  // Build clean formatted message for WhatsApp
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

  const goNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
      // scroll container to top smoothly
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
      closeCheckout();
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
      className="checkout-kiosk-fullscreen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kiosk-step-heading"
    >
      {/* =========================================================================
          TOP KIOSK HEADER: Navigation, 5-Step Segmented Bar, Dismiss
          ========================================================================= */}
      <header className="kiosk-top-header">
        <div className="kiosk-header-inner">
          {/* Back / Exit Button */}
          <button 
            type="button" 
            onClick={goBack} 
            className="kiosk-header-back-btn"
            title={currentStep > 1 ? "Kembali ke langkah sebelumnya" : "Tutup kiosk"}
          >
            {currentStep > 1 ? (
              <>
                <ArrowLeft size={18} strokeWidth={2.4} />
                <span className="kiosk-back-label">Undur</span>
              </>
            ) : (
              <>
                <X size={18} strokeWidth={2.4} />
                <span className="kiosk-back-label">Batal</span>
              </>
            )}
          </button>

          {/* McDonald's Style 5-Step Progress Pills */}
          <nav className="kiosk-steps-nav" aria-label="Langkah Kiosk">
            <button 
              type="button" 
              onClick={() => setCurrentStep(1)} 
              className={`kiosk-step-pill ${currentStep === 1 ? "is-active" : currentStep > 1 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">1</span>
              <span className="kiosk-step-name">Pesanan</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 2 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(2)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 2 ? "is-active" : currentStep > 2 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">2</span>
              <span className="kiosk-step-name">Info Tapak</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 3 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(3)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 3 ? "is-active" : currentStep > 3 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">3</span>
              <span className="kiosk-step-name">Waktu</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 4 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(4)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 4 ? "is-active" : currentStep > 4 ? "is-done" : ""}`}
            >
              <span className="kiosk-step-num">4</span>
              <span className="kiosk-step-name">Bayaran</span>
            </button>

            <span className={`kiosk-step-divider ${currentStep >= 5 ? "is-active" : ""}`} />

            <button 
              type="button" 
              onClick={() => items.length > 0 && setCurrentStep(5)} 
              disabled={items.length === 0}
              className={`kiosk-step-pill ${currentStep === 5 ? "is-active" : ""}`}
            >
              <span className="kiosk-step-num">5</span>
              <span className="kiosk-step-name">Hantar</span>
            </button>
          </nav>

          {/* Right Header: Close Icon Button */}
          <div className="kiosk-header-right">
            {items.length > 0 && currentStep === 1 && (
              <button 
                type="button"
                onClick={clearCart}
                className="kiosk-clear-all-btn"
                title="Kosongkan semua"
              >
                <RotateCcw size={14} />
                <span>Kosongkan</span>
              </button>
            )}
            <button 
              type="button" 
              onClick={closeCheckout}
              className="kiosk-close-btn"
              aria-label="Tutup checkout"
              title="Tutup (Esc)"
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
              <h2 className="kiosk-empty-title">Pesanan Kosong</h2>
              <p className="kiosk-empty-sub">
                Pilih perkakasan atau bahan binaan dari katalog kami untuk memulakan pesanan.
              </p>
              <button 
                type="button" 
                onClick={closeCheckout} 
                className="kiosk-btn-browse"
              >
                <span>Lihat Katalog Produk</span>
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
                      <span className="kiosk-pane-step-tag">Langkah 1 / 5</span>
                    </div>
                    <h1 id="kiosk-step-1-title" className="kiosk-pane-heading">
                      Semak Barangan
                    </h1>
                    <p className="kiosk-pane-caption">
                      Laraskan kuantiti setiap unit mengikut keperluan tapak anda.
                    </p>
                  </header>

                  <div className="kiosk-items-stack">
                    {items.map((item) => {
                      const uomBadge = item.unit ? item.unit : "Unit";

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
                                aria-label={`Kurangkan ${item.title}`}
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
                                aria-label={`Tambah ${item.title}`}
                              >
                                <Plus size={15} strokeWidth={2.8} />
                              </button>
                            </div>

                            <button 
                              type="button" 
                              onClick={() => removeFromCart(item.id)}
                              className="kiosk-item-del-btn"
                              title="Padam barangan"
                              aria-label={`Padam ${item.title}`}
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
                      <span className="kiosk-pane-step-tag">Langkah 2 / 5</span>
                    </div>
                    <h1 id="kiosk-step-2-title" className="kiosk-pane-heading">
                      Maklumat & Lokasi Tapak
                    </h1>
                    <p className="kiosk-pane-caption">
                      Untuk kemudahan pemandu lori menghantar bekalan terus ke tapak binaan anda.
                    </p>
                  </header>

                  <div className="kiosk-card-section">
                    <div className="kiosk-field-block">
                      <label htmlFor="kiosk-name" className="kiosk-field-label">
                        <User size={16} strokeWidth={2.2} />
                        <span>Nama / Nama Syarikat</span>
                      </label>
                      <input 
                        id="kiosk-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Cth: En. Ahmad / Mega Bina Enterprise"
                        className="kiosk-input-large"
                        autoFocus
                      />
                    </div>

                    <div className="kiosk-field-block">
                      <label htmlFor="kiosk-location" className="kiosk-field-label">
                        <MapPin size={16} strokeWidth={2.2} />
                        <span>Lokasi Tapak Binaan / Alamat</span>
                      </label>
                      <input 
                        id="kiosk-location"
                        type="text"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder="Cth: Bandar Seri Coalfields / Puncak Alam"
                        className="kiosk-input-large"
                      />

                      {/* Rewarding 1-tap fast location chips */}
                      <div className="kiosk-quick-chips-row">
                        <span className="kiosk-chips-hint">Pilih Pantas:</span>
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
                        <span>Catatan Tambahan (Pilihan)</span>
                      </label>
                      <input 
                        id="kiosk-notes"
                        type="text"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="Cth: Lori tipper masuk ikut pintu belakang / call mandur"
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
                      <span className="kiosk-pane-step-tag">Langkah 3 / 5</span>
                    </div>
                    <h1 id="kiosk-step-3-title" className="kiosk-pane-heading">
                      Waktu Penghantaran
                    </h1>
                    <p className="kiosk-pane-caption">
                      Pilih waktu yang paling sesuai untuk penerimaan barangan di tapak.
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
                          <span className="kiosk-choice-pill">Syif Siang</span>
                        </div>
                        <span className="kiosk-choice-time">🕒 8:00 AM – 6:00 PM</span>
                        <p className="kiosk-choice-sub">
                          Waktu penghantaran harian biasa.
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
                          <span className="kiosk-choice-pill night-pill">24 Jam On-Call</span>
                        </div>
                        <span className="kiosk-choice-time">🌙 6:00 PM – 8:00 AM</span>
                        <p className="kiosk-choice-sub">
                          Penghantaran kecemasan malam tanpa jem.
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
                      <span className="kiosk-pane-step-tag">Langkah 4 / 5</span>
                    </div>
                    <h1 id="kiosk-step-4-title" className="kiosk-pane-heading">
                      Kaedah Bayaran
                    </h1>
                    <p className="kiosk-pane-caption">
                      Pilih cara anda ingin membuat pembayaran semasa barangan tiba.
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
                          <h2 className="kiosk-pay-title">Tunai (COD)</h2>
                          <span className="kiosk-pay-badge">Paling Lazim</span>
                        </div>
                        <span className="kiosk-pay-desc">Bayar tunai kepada pemandu bila barangan sampai di tapak.</span>
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
                          <h2 className="kiosk-pay-title">Pindahan Bank (Online Transfer)</h2>
                          <span className="kiosk-pay-badge">Syarikat</span>
                        </div>
                        <span className="kiosk-pay-desc">Pindahan atas talian & hantar resit terus melalui WhatsApp.</span>
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
                          <span className="kiosk-pay-badge">Pantas</span>
                        </div>
                        <span className="kiosk-pay-desc">Imbas kod QR menggunakan MAE, TNG eWallet atau mana-mana aplikasi bank.</span>
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
                      Pesanan Sedia Dihantar!
                    </h1>
                    <p className="kiosk-pane-caption">
                      Semak ringkasan di bawah dan hantar terus ke talian WhatsApp rasmi SKL Waste.
                    </p>
                  </header>

                  {/* McDonald's Style Digital Order Ticket Card */}
                  <div className="kiosk-receipt-card">
                    <div className="kiosk-receipt-top">
                      <div className="kiosk-receipt-brand">
                        <strong>SKL WASTE SDN BHD</strong>
                        <span>SLIP TEMPAHAN PROJEK</span>
                      </div>
                      <span className="kiosk-receipt-count tabular-nums">{totalCount} Item</span>
                    </div>

                    <div className="kiosk-receipt-meta-grid">
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">🚚 Waktu Lori:</span>
                        <strong className="kiosk-receipt-val">{transportLabel}</strong>
                      </div>
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">💳 Bayaran:</span>
                        <strong className="kiosk-receipt-val">{paymentLabel}</strong>
                      </div>
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">👤 Pemesan:</span>
                        <strong className="kiosk-receipt-val">{customerName.trim() || "Pelanggan Laman Web"}</strong>
                      </div>
                      <div className="kiosk-receipt-meta-cell">
                        <span className="kiosk-receipt-label">📍 Tapak:</span>
                        <strong className="kiosk-receipt-val">{deliveryLocation.trim() || "Bandar Seri Coalfields"}</strong>
                      </div>
                    </div>

                    <div className="kiosk-receipt-items-list">
                      <div className="kiosk-receipt-divider" />
                      <span className="kiosk-receipt-table-header">Senarai Barangan & UOM:</span>
                      <ul className="kiosk-receipt-ul">
                        {items.map((it) => (
                          <li key={it.id} className="kiosk-receipt-li">
                            <span className="kiosk-receipt-item-title">{it.title}</span>
                            <span className="kiosk-receipt-item-qty tabular-nums">
                              <strong>{it.quantity}</strong> {it.unit || "Unit"}
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
                      title="Hantar Tempahan ke WhatsApp Saravanan"
                    >
                      <MessageCircle size={22} strokeWidth={2.4} />
                      <div className="kiosk-wa-btn-labels">
                        <span className="kiosk-wa-main-title">Hantar Tempahan ke WhatsApp</span>
                        <span className="kiosk-wa-sub-title">Saravanan (019-914 4743) • Respon Segera</span>
                      </div>
                      <ArrowRight size={20} strokeWidth={2.4} className="kiosk-wa-arrow" />
                    </button>

                    <button 
                      type="button" 
                      onClick={handleCheckoutHari}
                      className="kiosk-secondary-whatsapp-btn"
                      title="Hantar ke Syif Malam Hari"
                    >
                      <Moon size={16} strokeWidth={2.2} />
                      <span>Hantar ke En. Hari (Syif Malam: 016-615 9365)</span>
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
              <span className="kiosk-summary-sub">Jumlah Pesanan:</span>
              <strong className="kiosk-summary-count tabular-nums">
                {totalCount} <small>Unit/Item</small>
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
                    {currentStep === 1 && "Maklumat Tapak"}
                    {currentStep === 2 && "Pilih Waktu"}
                    {currentStep === 3 && "Kaedah Bayaran"}
                    {currentStep === 4 && "Semak & Hantar"}
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
                  <span>Hantar Sekarang</span>
                </button>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
