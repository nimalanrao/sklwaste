# Product Database, Schema & Catalogue Architecture

This document describes the 1,081-item hardware catalogue data structure, category hierarchies, UOM normalization rules, and pagination system.

---

## 1. Product Data Schema (`MasterProduct`)

```typescript
export interface MasterProduct {
  id: string;               // Unique alphanumeric identifier (e.g. "BM-001")
  title: string;            // Official Malaysian hardware title
  brand: string;            // Manufacturer / Brand (e.g. "YTL", "Hansen", "Sika", "SKL Hardware")
  mainCategory: string;     // One of the 7 official categories
  subCategory: string;      // Specific taxonomy (e.g. "Sand & Aggregates", "PVC Pipes")
  spec: string;             // Physical dimension / grade (e.g. "50kg Bag", "25mm x 100m")
  description: string;      // Concise specifications and trade application
  unit: string;             // Standardized 1-word UOM: "TON" | "BAG" | "UNIT"
  application: string;      // Site usage notes for contractors
  localImage: string;       // Primary local static asset path
  fallbackImage: string;    // Fallback static asset path if primary fails
  inStock: boolean;         // Inventory status (true = ready for delivery/pickup)
}
```

---

## 2. Standardized 1-Word UOM Rules

To eliminate clunky abbreviations and line-wrapping on mobile cards, all products use clean, single-word Units of Measurement:

| UOM Code | Target Products | Examples |
| :--- | :--- | :--- |
| **`TON`** | All sand, soil, and quarry aggregates | Pasir Kasar (Lori), Pasir Halus (Lori), Batu Baur 3/4" (Lori Tipper) |
| **`BAG`** | Cement, premix mortar, skim coat, tile adhesive, bagged aggregates | Simen Portland OPC (50kg), Sika Ceram Tile Gum (25kg), Pasir Siap Guni |
| **`UNIT`** | Tools, poly pipes, fittings, sanitary ware, paint cans, bricks | Bata Merah, Hansen Poly Pipe, Trowel Simen, Nippon Paint 5L |

---

## 3. The 7 Official Categories

Defined in [`src/data/catalogue.ts`](file:///c:/Users/Nithya/sklwaste/src/data/catalogue.ts):

```typescript
export const SIDEBAR_CATEGORIES = [
  "BUILDING MATERIALS",       // Sand, Cement, Bricks, Steel, Aggregates
  "PIPING & PLUMBING",        // Poly pipes, PVC fittings, Hansen connectors, valves
  "TOOLS",                    // Trowels, levels, hammers, tape measures, wheelbarrows
  "CUTTING TOOLS",            // Diamond blades, angle grinder discs, saw blades
  "WATERPROOFING & SEALANT",  // Sika tile gum, waterproofing membrane, silicone
  "KITCHEN & BATH",           // Taps, sanitary fittings, floor traps, hoses
  "PAINT"                     // Undercoats, gloss paint, rollers, brushes, thinners
] as const;
```

---

## 4. Pagination & Performance Discipline

- **Strict Requirement**: Maximum 20 product cards per page (`4 columns × 5 rows` on desktop, `2 columns × 10 rows` on mobile).
- **Pagination Strategy**: Numbered pagination with a sliding window (`1 ... 4 5 6 ... 55`) and instant scroll-to-top on page change.
- **Media Fallback Strategy**:
  ```tsx
  <img 
    src={assetUrl(p.localImage)} 
    alt={p.title} 
    loading="lazy"
    onError={(e) => {
      const fb = assetUrl(p.fallbackImage);
      if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
    }}
  />
  ```
- **Zero Horizontal Leak**: All media containers enforce `box-sizing: border-box`, `max-width: 100%`, and contained aspect ratios.
