# SKL Waste Sdn Bhd (Kedai Hardware)

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-1.81-orange)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-Proprietary-gray.svg)](#license)

Official web application and digital product catalogue for **SKL Waste Sdn Bhd (Kedai Hardware)**, located in Bandar Seri Coalfields, Sungai Buloh, Selangor.

The platform provides building contractors, plumbers, electricians, and homeowners with instant access to store inventory, technical specifications, direct WhatsApp quotations, and 24/7 emergency hardware dispatch contacts.

---

## Key Highlights

- **24/7 Operating Model**: Walk-in retail shifts from 8:00 AM to 6:00 PM daily, backed by on-call emergency dispatch after 6:00 PM for urgent site requirements.
- **Bilingual Support (EN / MS)**: Native English and Bahasa Melayu translations across all pages, catalogues, and actions with instant language switching.
- **Interactive Materials Catalogue**: Real product listings with dimensions, packaging units, and applications covering precast concrete, masonry bricks, sands and aggregates, piping, sanitary ware, tile adhesives, and power tools.
- **One-Tap WhatsApp Inquiries**: Direct quotation buttons that construct pre-formatted WhatsApp messages with exact product titles and reference codes.
- **Verified Location and Google Maps Integration**: Live Google Business rating (4.5 stars across 9 reviews) with direct turn-by-turn navigation links to the yard in Bandar Seri Coalfields.
- **Light Design System**: Hand-crafted CSS design system built on Apple Human Interface Guidelines and WCAG AA accessibility standards, featuring zero external utility frameworks.

---

## Product Categories in Stock

| Category | Primary Inventory Items | Brands / Standards |
| :--- | :--- | :--- |
| **Concrete & Drainage** | Precast box culverts, U-drains, concrete pipes, half-round drains | SIRIM / JKR compliance specs |
| **Bricks & Masonry** | Red clay bricks, hollow concrete blocks, interlocking pavers | Grade A construction quality |
| **Aggregates & Sands** | Coarse concrete sand, fine plastering sand, aggregate stones, crusher run | Bulk tipper and 50kg bag packaging |
| **Cement & Plaster** | Portland cement, grey skimcoat base, white finishing skimcoat, tile adhesives | YTL, Hume, Weber, SikaCeram |
| **Plumbing & Sanitary** | PVC-U drainage pipes, Class D pressure pipes, brass gate valves, fittings | SIRIM certified |
| **Power Tools** | Cordless rotary hammers, angle grinders, impact wrenches, sanders, circular saws | Milwaukee (M12/M18 FUEL), DongCheng, HiKOKI |
| **Fasteners & Hardware** | Drywall screws, anchor bolts, drill bits, cutting discs, hand tools | Industrial grade |

---

## Technology Stack

- **Frontend**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)
- **Styling**: Vanilla CSS Design System with custom design tokens, responsive typography clamp scales, and light elevation tiers

---

## Project Structure

```text
sklwaste/
├── public/                     # Static assets and media files
│   ├── catalogue/              # Product photography (concrete, piping, tools)
│   ├── chinchunimages/         # Construction material inventory photography
│   ├── favicon.svg             # Brand favicon
│   └── hero-yard.jpg           # Hardware yard photograph
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── About.tsx           # Company background and trust points
│   │   ├── CatalogueModal.tsx  # Detailed product view modal
│   │   ├── CataloguePage.tsx   # Searchable inventory catalogue with category filters
│   │   ├── ContactSection.tsx  # Direct phone, WhatsApp, and email touchpoints
│   │   ├── Footer.tsx          # Store details, sitemap, and copyright
│   │   ├── Gallery.tsx         # Yard and material showcase
│   │   ├── HardwareEnquiries.tsx # Quote submission and special order section
│   │   ├── Header.tsx          # Sticky navigation bar with contact triggers
│   │   ├── Hero.tsx            # Hero section with yard backdrop and CTAs
│   │   ├── LanguageToggle.tsx  # EN / MS language switcher
│   │   ├── LoadingScreen.tsx   # Clean initial state indicator
│   │   ├── LocationSection.tsx # Google Maps embed, directions, and hours
│   │   ├── MobileNav.tsx       # Bottom bar and drawer for mobile viewports
│   │   ├── QuickInfo.tsx       # Key business statistics bar
│   │   ├── ReviewsSummary.tsx  # Google Business Profile review showcase
│   │   └── ShiftsSection.tsx   # Detailed day and night shift explanations
│   ├── context/
│   │   └── useLanguage.tsx     # Language state context provider
│   ├── data/
│   │   ├── business.ts         # Business data, phone numbers, hours, coordinates
│   │   ├── catalogue.ts        # Catalogue helper interfaces and types
│   │   ├── catalogue-products.json # Full product dataset
│   │   └── translations.ts     # Complete EN and MS language dictionaries
│   ├── App.css                 # Core design system and responsive layout rules
│   ├── App.tsx                 # Root application container and view switcher
│   └── main.tsx                # React DOM entry point
├── scripts/                    # Dataset processors and catalogue utilities
├── thirumalvel/                # Alternate brand workspace package
├── index.html                  # HTML5 shell with Open Graph and JSON-LD schema
├── package.json                # Project dependencies and lifecycle scripts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite bundler configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 18.0.0 or higher
- [npm](https://www.npmjs.com/) version 9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nimalanrao/sklwaste.git
   cd sklwaste
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
npm run dev
```

The application will be accessible at:
```text
http://localhost:5173
```

### Production Build

Type-check and compile the production bundle:
```bash
npm run build
```

The compiled assets will be placed into the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

### Linting

Run Oxlint to check code quality:
```bash
npm run lint
```

---

## Deployment

The project produces a standard static single-page application and can be hosted on any modern static hosting service.

### Vercel
1. Import the repository in the Vercel dashboard.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Install Command: `npm install`

### Netlify
1. Connect the repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Cloudflare Pages
1. Connect repository in Cloudflare Pages.
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Build output directory: `dist`

---

## Business Information

- **Company Name**: SKL Waste Sdn Bhd
- **Category**: Hardware Store & Building Material Supplier
- **Physical Address**: Bandar Seri Coalfields, Jln Kuala Selangor, 47000 Selangor, Malaysia
- **Store Hours**: Open 24/7
  - Regular Walk-in Shifts: 8:00 AM - 6:00 PM
  - After-Hours Emergency Supply: 6:00 PM onward (Contact Mr. Hari)
- **Primary Contact (Daytime)**: Mr. Saravanan (+60 19-914 4743)
- **Secondary Contact (Night / Urgent)**: Mr. Hari (+60 16-615 9365)
- **Google Maps Listing**: [View on Google Maps](https://maps.google.com/?cid=11866118426229587650)
- **Google Rating**: 4.5 / 5.0 (9 Verified Reviews)

---

## License

This software and its branding materials are proprietary to **SKL Waste Sdn Bhd**. All rights reserved.
