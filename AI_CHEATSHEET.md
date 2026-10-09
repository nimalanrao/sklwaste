# SKL Waste — AI Speed-Boost Cheat Sheet & Repository Index

> **Purpose for AI Agents**: Read this document first before inspecting individual source files. It maps the entire codebase, state flow, styling rules, and key workflows, speeding up task execution by 60%+.

---

## 1. Quick Navigation & File Map

| Feature / Area | Primary File | Supporting Files | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **App Shell & Hash Router** | [`src/App.tsx`](file:///c:/Users/Nithya/sklwaste/src/App.tsx) | [`src/main.tsx`](file:///c:/Users/Nithya/sklwaste/src/main.tsx) | View state (`"home"` \| `"catalogue"`), scroll management, layout mounting |
| **Global Styles & Animations** | [`src/App.css`](file:///c:/Users/Nithya/sklwaste/src/App.css) | [`src/index.css`](file:///c:/Users/Nithya/sklwaste/src/index.css) | 7,900+ lines of Apple-grade tokens, animations, responsive breakpoints |
| **Language Context & i18n** | [`src/context/LanguageContext.tsx`](file:///c:/Users/Nithya/sklwaste/src/context/LanguageContext.tsx) | [`src/data/translations.ts`](file:///c:/Users/Nithya/sklwaste/src/data/translations.ts) | Bilingual state (`"en"` \| `"ms"`), `localStorage` persistence, string maps |
| **Cart & Checkout State** | [`src/context/CartContext.tsx`](file:///c:/Users/Nithya/sklwaste/src/context/CartContext.tsx) | [`src/context/cartTypes.ts`](file:///c:/Users/Nithya/sklwaste/src/context/cartTypes.ts) | Cart items, UOMs, transport mode (`day` \| `night`), payment method, open/close |
| **5-Step Kiosk Checkout** | [`src/components/CheckoutSheet.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CheckoutSheet.tsx) | `src/App.css` (line ~6645+) | 1-Items ➔ 2-Site ➔ 3-Time ➔ 4-Pay ➔ 5-Slip & WhatsApp generation |
| **Catalogue Portal** | [`src/components/CataloguePage.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CataloguePage.tsx) | [`src/data/catalogue.ts`](file:///c:/Users/Nithya/sklwaste/src/data/catalogue.ts) | 20 items/page, 7 official categories, brand filters, floating cart dock |
| **Product Lightbox Modal** | [`src/components/CatalogueModal.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/CatalogueModal.tsx) | [`src/hooks/useDragToDismiss.ts`](file:///c:/Users/Nithya/sklwaste/src/hooks/useDragToDismiss.ts) | Image zoom, specs, UOM badges, tactile drag-down dismiss |
| **Desktop Header** | [`src/components/Header.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/Header.tsx) | [`src/components/LanguageToggle.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/LanguageToggle.tsx) | Sticky frosted glass header, wordmark, nav links, quick call & directions |
| **Mobile Navigation Menu** | [`src/components/MobileNav.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/MobileNav.tsx) | `src/App.css` (line ~366+) | Full-screen Apple navigation drawer with exit animation (220ms) |
| **Mobile Floating Action Dock** | [`src/components/MobileFloatingBar.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/MobileFloatingBar.tsx) | `src/App.css` (line ~6070+) | Persistent 4-item pill: Call Boss, Night 24/7, Catalogue Toggle, Directions |
| **Store Shifts & Contacts** | [`src/components/ShiftsSection.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/ShiftsSection.tsx) | [`src/data/business.ts`](file:///c:/Users/Nithya/sklwaste/src/data/business.ts) | Day Shift (Mr. Saravanan) & Night On-Call (Mr. Hari 016-615 9365) |
| **Hero Landing Section** | [`src/components/Hero.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/Hero.tsx) | – | Full mobile viewport height, direct CTAs, rating badge |
| **Location & Reviews** | [`src/components/LocationSection.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/LocationSection.tsx) | [`src/data/business.ts`](file:///c:/Users/Nithya/sklwaste/src/data/business.ts) | Google map embed, address, authentic customer quotes |
| **Hardware Enquiries & FAQ** | [`src/components/HardwareEnquiries.tsx`](file:///c:/Users/Nithya/sklwaste/src/components/HardwareEnquiries.tsx) | – | In-store supply questions, direct quote links |
| **All Products Raw Database** | [`src/data/all-products.json`](file:///c:/Users/Nithya/sklwaste/src/data/all-products.json) | [`src/data/catalogue.ts`](file:///c:/Users/Nithya/sklwaste/src/data/catalogue.ts) | 1,081 products with standardized UOMs, image URLs, categories |

---

## 2. Dual-Tree Synchronization Rule (CRITICAL)

The workspace maintains a mirror directory:
- Primary: `src/`
- Mirror: `thirumalvel/src/`

**Absolute Rule**: Whenever you modify any file in `src/` (CSS, TSX, TS, JSON), you **must synchronize** the exact same changes to `thirumalvel/src/` before building and committing.

```bash
# Synchronization command pattern
cp src/components/Filename.tsx thirumalvel/src/components/Filename.tsx
cp src/App.css thirumalvel/src/App.css
```

---

## 3. Strict Design & Theme Constraints

1. **Light Mode / White Theme Only**:
   - Background canvas: `#FFFFFF` and `#F8FAFC`.
   - Absolutely NO dark mode, dark toggles, or near-black backgrounds.
2. **Real Iconography Only**:
   - Use `lucide-react` SVGs with `currentColor`.
   - Never use emoji icons in the UI (e.g. no 🚀, 🔥, ⚡).
3. **Motion Curves & Exit Animations**:
   - Modals and menus must animate in AND animate out when dismissed.
   - Standard exit timing: `210ms - 240ms` using `cubic-bezier(0.32, 0, 0.67, 0)`.
   - Respect `prefers-reduced-motion` at all times.
4. **Spacing Offset Formula on Mobile**:
   - Bottom floating bar height: ~60px.
   - Floating cart dock offset: `bottom: calc(max(14px, env(safe-area-inset-bottom, 14px)) + 80px) !important;` (ensures a 18px-22px clean gap).

---

## 4. Product Database & UOM Standards

All 1,081 products follow strict 1-word UOM formatting:
- **`TON`**: Sand, aggregates, quarry direct loads (e.g. *Pasir Kasir, Pasir Halus, Batu Baur*).
- **`BAG`**: Cement bags, pre-packed skim coats, tile adhesives, bagged sand/pebbles.
- **`UNIT`**: Hardware tools, plumbing fittings, poly pipes, taps, paint cans, trowels, bricks.

### Official 7 Categories
```ts
export const SIDEBAR_CATEGORIES = [
  "BUILDING MATERIALS",       // Bahan Binaan
  "PIPING & PLUMBING",        // Paip & Paiping
  "TOOLS",                    // Peralatan
  "CUTTING TOOLS",            // Mata Pemotong
  "WATERPROOFING & SEALANT",  // Kalis Air & Gam
  "KITCHEN & BATH",           // Dapur & Bilik Air
  "PAINT"                     // Cat & Kemasan
] as const;
```

---

## 5. Checkout Kiosk Flow & WhatsApp Dispatch

```
[Catalogue Page] ➔ Add items ➔ Floating Cart Dock ➔ Open Kiosk
      ↓
Step 1: Review Items & Stepper Quantities (UOM badge displayed)
      ↓
Step 2: Customer Name + Job Site Location (1-Tap quick selection chips)
      ↓
Step 3: Day Transport (8am-6pm) vs Night Transport (24/7 on-call)
      ↓
Step 4: Payment Method (Cash COD vs Online Transfer vs DuitNow QR)
      ↓
Step 5: Digital Order Slip ➔ Click WhatsApp Button
      ↓
Official WhatsApp:
• Day / Boss: Mr. Saravanan (019-914 4743)
• Night 24/7: Mr. Hari (016-615 9365)
```

---

## 6. Build & Deployment Commands

```bash
# Type check and production bundle
npm run build

# Stage and commit
git add src/ thirumalvel/src/
git commit -m "feat/fix: descriptive message"

# Push to repository
git push origin main
```
