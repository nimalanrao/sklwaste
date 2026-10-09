# Internationalization (i18n) & Copywriting Standards

This document establishes the bilingual system guidelines and anti-AI-slop writing standards for the SKL Waste Hardware web application.

---

## 1. Bilingual Architecture & Language Switching

- **Supported Languages**:
  - `en`: English (International trade, contractors, engineering specs)
  - `ms`: Bahasa Melayu (Local Malaysian site workers, foreman, walk-in customers)
- **Language State Provider**:
  [`src/context/LanguageContext.tsx`](file:///c:/Users/Nithya/sklwaste/src/context/LanguageContext.tsx)
- **Key Dictionary**:
  [`src/data/translations.ts`](file:///c:/Users/Nithya/sklwaste/src/data/translations.ts)
- **Persistence**: Saved to `localStorage.getItem("skl_lang")`.
- **Language Switcher (`<LanguageToggle />`)**:
  - Present in Desktop Header, Mobile Navigation Drawer, Catalogue Top Bar, and Checkout Kiosk Top Header.
  - Toggles seamlessly between `EN` and `BM` with instant re-render across the entire interface.

---

## 2. Authentic Malaysian Trade Terminology

Always use authentic, real-world Malaysian hardware terminology:

| English Term | Authentic Bahasa Melayu Term | Context / Notes |
| :--- | :--- | :--- |
| Sand by Lorry | Pasir Kasar / Pasir Halus (Lori) | Direct tipper transport from quarry |
| Bagged Sand | Pasir Siap Guni | Pre-packed in bags for renovations |
| Portland Cement | Simen Portland OPC (50kg) | Standard red/green cement bags |
| Tile Adhesive | Gam Jubin / Sika Ceram | Pre-packed tiling mortar |
| Poly Pipe | Paip Hansen Poly | High-density polyethylene black piping |
| Daytime Shift | Syif Siang (8:00 PG – 6:00 PTG) | Regular walk-in hardware operating hours |
| Night / 24/7 On-Call | Syif Malam / Bersedia 24 Jam | Emergency pipe burst, night construction delivery |
| Cash on Delivery | Tunai (COD) / Bayar kepada Pemandu | Driver receives cash upon arrival |

---

## 3. Anti-AI Slop & Human Writing Rules

Per [`AGENTS.md`](file:///c:/Users/Nithya/sklwaste/AGENTS.md) and the `humanize` design skill:

1. **Absolute Prohibition of AI Vocabulary**:
   - Eliminate filler words: *“delve”, “tapestry”, “seamless”, “vital role”, “game-changer”, “testament”, “pinnacle”*.
2. **No Fabricated Information**:
   - Never invent non-existent phone numbers, fake addresses, or fabricated 5-star customer reviews.
   - All addresses point strictly to: **Jalan Kuala Selangor, Bandar Seri Coalfields, Selangor**.
   - Direct contacts strictly reflect:
     - Boss: **Mr. Saravanan (019-914 4743)**
     - Night Shift: **Mr. Hari (016-615 9365)**
3. **Punctuation & Tone**:
   - No em-dashes (`—`) or en-dashes (`–`) in body text or headings. Use clean hyphens (`-`) or colons.
   - Active voice, sentence case for descriptions, concise labels.
