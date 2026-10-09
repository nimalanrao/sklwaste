# 5-Step Kiosk Checkout & WhatsApp Dispatch Engine

This document details the architecture and technical implementation of the McDonald's kiosk style ordering system implemented in [`src/components/CheckoutSheet.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CheckoutSheet.tsx).

---

## 1. User Journey & Workflow Steps

```
[Katalog / Catalogue] ➔ User clicks [+ Tambah / + Add] ➔ Item added to Cart
      │
      ▼
[Floating Cart Dock] ➔ Taps "Checkout" pill ➔ Kiosk Opens (Full Screen)
      │
      ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STEP 1: REVIEW ITEMS (Semak Barangan)                                  │
│ - Live steppers with normalized UOMs (TON, BAG, UNIT)                  │
│ - Delete items or clear entire cart                                    │
│ - Real-time total quantity counter                                     │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Taps [Next: Site Info]
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STEP 2: SITE & CUSTOMER INFO (Maklumat & Lokasi Tapak)                 │
│ - Customer / Company name input                                        │
│ - Delivery address input                                               │
│ - 1-Tap Quick Location Chips:                                          │
│   [Bandar Seri Coalfields] [Puncak Alam] [Saujana Utama]               │
│   [Ijok] [Sungai Buloh] [Kundang]                                      │
│ - Optional contractor delivery notes (e.g. back gate entrance)         │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Taps [Next: Delivery Schedule]
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STEP 3: DELIVERY SCHEDULE (Waktu Penghantaran)                         │
│ - Option A: Day Transport (Syif Siang) ➔ 8:00 AM – 6:00 PM             │
│ - Option B: Night Transport (Syif Malam) ➔ 24/7 On-Call Site Delivery  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Taps [Next: Payment Method]
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STEP 4: PAYMENT METHOD (Kaedah Bayaran)                                │
│ - Option A: Cash on Delivery (COD / Tunai kepada Pemandu)              │
│ - Option B: Online Bank Transfer (Pindahan Bank Syarikat)              │
│ - Option C: DuitNow QR Code (Imbas MAE / TNG eWallet / Bank App)       │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Taps [Next: Review & Send]
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STEP 5: DIGITAL ORDER SLIP & WHATSAPP DISPATCH                         │
│ - Authentic Project Order Slip preview card                            │
│ - Primary WhatsApp Button ➔ Boss Saravanan (019-914 4743)              │
│ - Secondary WhatsApp Button ➔ Night Shift Mr. Hari (016-615 9365)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Bilingual WhatsApp Formatting Engine

The WhatsApp message is generated dynamically according to the active language in [`LanguageContext`](file:///c:/Users/Nithya/sklwaste/src/context/LanguageContext.tsx).

### Bahasa Melayu Output:
```text
🏗️ *TEMPAHAN & SEBUT HARGA SKL WASTE*
=========================================
📦 *SENARAI BARANGAN (12 item):*
1. *Simen Portland OPC (50kg)*
   └── Kuantiti: 5 BAG

2. *Pasir Kasar Siap Guni*
   └── Kuantiti: 7 BAG

🚚 *WAKTU PENGHANTARAN:*
☀️ Day Transport (Syif Siang: 8:00 AM - 6:00 PM)

💳 *KAEDAH PEMBAYARAN:*
💵 Tunai / Cash on Delivery (COD)

📍 *MAKLUMAT PENGHANTARAN:*
• Nama / Syarikat: En. Azman (Bina Jaya)
• Lokasi Tapak: Bandar Seri Coalfields
• Catatan: Lori tipper masuk ikut pintu pagar belakang.
=========================================
_Dihantar melalui Sistem Pesanan Web SKL Waste_
```

### English Output:
```text
🏗️ *SKL WASTE HARDWARE ORDER & QUOTATION*
=========================================
📦 *ORDER ITEMS (12 items):*
1. *Simen Portland OPC (50kg)*
   └── Quantity: 5 BAG

2. *Pasir Kasar Siap Guni*
   └── Quantity: 7 BAG

🚚 *DELIVERY SCHEDULE:*
☀️ Day Transport (Day Shift: 8:00 AM - 6:00 PM)

💳 *PAYMENT METHOD:*
💵 Cash on Delivery (COD)

📍 *DELIVERY DETAILS:*
• Customer / Company: Mr. David
• Job Site Location: Bandar Seri Coalfields
• Notes: Tipper lorry enter via rear site gate.
=========================================
_Sent via SKL Waste Web Order System_
```

---

## 3. Direct WhatsApp Contacts & Deep-Link Handlers

- **Day Shift / Store Operations**:
  - Contact: **Mr. Saravanan**
  - Phone: `+60199144743`
  - URL Pattern: `https://wa.me/60199144743?text={URL_ENCODED_MESSAGE}`
- **Night Shift / 24/7 Emergency Logistics**:
  - Contact: **Mr. Hari**
  - Phone: `+60166159365`
  - URL Pattern: `https://wa.me/60166159365?text={URL_ENCODED_MESSAGE}`
