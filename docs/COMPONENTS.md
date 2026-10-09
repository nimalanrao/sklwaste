# Component Registry & Lifecycle Reference

This document catalogs every component in `src/components/`, including their props interface, visual styling classes, state hooks, and responsibilities.

---

## 1. Core Component Matrix

| Component | File Path | Props Interface | Primary Visual Classes | Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **`Header`** | [`src/components/Header.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/Header.tsx) | `{ currentView?, onNavigate? }` | `.header`, `.header-main-bar`, `.brand-wordmark-wrap` | Sticky translucent navigation, logo wordmark, call CTA, hamburger button |
| **`LanguageToggle`** | [`src/components/LanguageToggle.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/LanguageToggle.tsx) | `{ className?, compact? }` | `.lang-btn-simple`, `.kiosk-lang-toggle`, `.portal-lang-toggle` | 1-Click language switch between English (`EN`) and Bahasa Melayu (`BM`) |
| **`MobileNav`** | [`src/components/MobileNav.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/MobileNav.tsx) | `{ isOpen, onClose, onNavigate?, currentView? }` | `.mobile-nav-fullscreen-overlay`, `.mobile-nav-closing`, `.mobile-nav-card` | Full-screen mobile navigation drawer with 220ms Apple entrance & exit animation |
| **`MobileFloatingBar`** | [`src/components/MobileFloatingBar.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/MobileFloatingBar.tsx) | `{ currentView, onNavigate }` | `.mobile-floating-bar`, `.mobile-floating-bar-inner`, `.mobile-float-item` | Persistent floating bottom pill (Call Boss, Night 24/7, Catalogue Toggle, Directions) |
| **`CataloguePage`** | [`src/components/CataloguePage.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CataloguePage.tsx) | `{ onBackToHome: () => void }` | `.product-portal-layout`, `.portal-top-bar`, `.portal-card`, `.portal-floating-cart-dock` | Paginated 20-item/page grid, brand filtering, category pills, search scope |
| **`CatalogueModal`** | [`src/components/CatalogueModal.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CatalogueModal.tsx) | `{ product, onClose }` | `.apple-modal-backdrop`, `.apple-modal-sheet`, `.apple-lightbox-backdrop` | Detailed product specs, UOM display, quantity selector, image lightbox zoom |
| **`CheckoutSheet`** | [`src/components/CheckoutSheet.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CheckoutSheet.tsx) | `None (uses CartContext)` | `.checkout-kiosk-fullscreen`, `.kiosk-closing`, `.kiosk-step-pill`, `.kiosk-receipt-card` | 5-Step McDonald's style kiosk checkout with digital slip and WhatsApp dispatch |
| **`Hero`** | [`src/components/Hero.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/Hero.tsx) | `None` | `.hero-section`, `.hero-container`, `.hero-title`, `.hero-badge` | 100vh full-screen mobile hero, business reputation badges, phone CTAs |
| **`ShiftsSection`** | [`src/components/ShiftsSection.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/ShiftsSection.tsx) | `None` | `.shifts-section`, `.shift-card-day`, `.shift-card-night` | Clear dual shift schedule: Day Shift (Mr. Saravanan) & Night On-Call (Mr. Hari) |
| **`QuickInfo`** | [`src/components/QuickInfo.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/QuickInfo.tsx) | `None` | `.quick-info-section`, `.quick-info-card` | High-frequency metadata: Business type, 24/7 coverage, phone, yard location |
| **`About`** | [`src/components/About.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/About.tsx) | `None` | `.about-section`, `.about-grid`, `.about-feature-card` | Company profile established in 2012, trade supplies, delivery capabilities |
| **`LocationSection`** | [`src/components/LocationSection.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/LocationSection.tsx) | `None` | `.location-section`, `.map-embed-container`, `.location-card` | Google Maps iframe, full physical address, Google Reviews summary |
| **`ReviewsSummary`** | [`src/components/ReviewsSummary.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/ReviewsSummary.tsx) | `None` | `.reviews-summary`, `.review-card` | Authentic 4.5-star Google review cards from verified customers |
| **`HardwareEnquiries`**| [`src/components/HardwareEnquiries.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/HardwareEnquiries.tsx) | `None` | `.hardware-enquiries`, `.enquiry-item` | Trade customer notices, bulk order process, direct WhatsApp links |
| **`ContactSection`** | [`src/components/ContactSection.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/ContactSection.tsx) | `None` | `.contact-section`, `.contact-cards-grid` | 3 primary action cards: Direct Call, Night Emergency WhatsApp, Site Visit |
| **`Gallery`** | [`src/components/Gallery.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/Gallery.tsx) | `None` | `.gallery-section`, `.gallery-grid` | Authentic storefront yard photography, sand stockpile, material trucks |
| **`GalleryLightbox`** | [`src/components/GalleryLightbox.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/GalleryLightbox.tsx) | `{ image, onClose }` | `.gallery-lightbox`, `.lightbox-image` | Fullscreen photo viewer for authentic yard imagery |
| **`LoadingScreen`** | [`src/components/LoadingScreen.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/LoadingScreen.tsx) | `{ onComplete: () => void }` | `.loading-screen`, `.loading-spinner` | Elegant first-load splash animation with branding |
| **`Footer`** | [`src/components/Footer.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/Footer.tsx) | `None` | `.footer`, `.footer-container`, `.footer-bottom` | Sitemap links, copyright, business registration info, back-to-top button |

---

## 2. Modal & Drawer Lifecycle Standards

All overlay components (`MobileNav`, `CheckoutSheet`, `CatalogueModal`) adhere to a 3-phase lifecycle:

1. **Mount & Entrance Phase**:
   - Component sets `isRendered = true` and `isClosing = false`.
   - Body scroll locked: `document.body.style.overflow = "hidden"`.
   - Entrance animation triggered via CSS keyframes (e.g. `kioskFadeIn`, `mobileNavFullFadeIn`).
2. **Interactive Phase**:
   - Traps or handles keyboard `Escape` to close.
   - Touch gestures active (e.g. `useDragToDismiss` on `CatalogueModal`).
3. **Smooth Exit Phase (No Instant Unmounting)**:
   - When dismiss is requested (X button, backdrop click, Escape key):
     - Sets `isClosing = true`.
     - Applies exit class (e.g. `.mobile-nav-closing`, `.kiosk-closing`).
     - Waits for transition duration (`210ms - 240ms`).
     - Finally sets `isRendered = false` and unlocks `document.body.style.overflow = ""`.
