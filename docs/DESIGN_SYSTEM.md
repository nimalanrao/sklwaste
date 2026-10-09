# Design System, Tokens & Apple HIG Web Standards

This document specifies the design tokens, visual hierarchy, motion curves, and layout principles governing the SKL Waste Hardware web application.

---

## 1. Strict Theme Constraint

- **Theme Mode**: Strict **Light Mode / White Theme Only**.
- **No Dark Mode**: Absolutely no dark mode overrides, switches, or dark-theme stylesheets.
- **Canvases**:
  - Primary Canvas: `#FFFFFF`
  - Tier 1 Structural Background: `#F8FAFC` (Slate 50)
  - Tier 2 Neutral Accent: `#F1F5F9` (Slate 100)
  - Border Hairline: `#E2E8F0` (Slate 200)

---

## 2. Color Palette & Functional Roles

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--logo-blue` | `#164E84` | Primary brand accent, logos, active indicators |
| `--logo-yellow` | `#F59E0B` | Secondary hardware warm accent |
| `--text-primary` | `#0F172A` | Slate 900, headline text, maximum contrast |
| `--text-secondary` | `#475569` | Slate 600, body copy, descriptions |
| `--text-muted` | `#64748B` | Slate 500, small metadata, timestamps, subtitles |
| `--border-subtle` | `#E2E8F0` | Slate 200, crisp 1px separation lines |
| `--accent-green` | `#22C55E` | WhatsApp buttons, in-stock badges, active confirmations |
| `--accent-night` | `#8B5CF6` / `#7C3AED` | Night shift badges, moon icons, 24/7 on-call |

---

## 3. Typography Hierarchy

- **Font Family**: Modern clean sans-serif stack:
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Segoe UI", Roboto, sans-serif;
  ```
- **Type Scale**:
  - Display / Hero Heading: `2.25rem - 3.25rem` (Weight: 800, tracking: -0.03em)
  - Section Headings: `1.5rem - 2.0rem` (Weight: 750, tracking: -0.02em)
  - Card Titles: `1.0rem - 1.125rem` (Weight: 700)
  - Body Copy: `0.9375rem` (Line height: 1.55, text-wrap: pretty)
  - Micro / Badges: `0.6875rem - 0.75rem` (Weight: 700, uppercase or sentence case)
- **Tabular Figures**:
  - Always apply `font-variant-numeric: tabular-nums` to quantities, phone numbers, prices, and counters.

---

## 4. Spacing & Concentric Border Radius Scale

### 8px Spacing Grid:
- `4px` (micro), `8px` (compact), `12px` (standard), `16px` (comfortable), `24px` (container), `32px` (section inner), `48px` - `64px` (section gap).

### Concentric Radius Rule:
```
outerRadius = innerRadius + padding
```
- Standard Card: `border-radius: 20px; padding: 20px;`
- Inner Element / Image Thumb: `border-radius: 12px;` (20px - 8px = 12px)
- Floating Pills & Badges: `border-radius: 9999px;` (Full capsule)

---

## 5. Purposeful Motion & Animation Curves

### High-Frequency Transitions (Buttons, Steppers, Hover)
- Duration: `140ms - 180ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out rapid spring)
- Active tactile press: `transform: scale(0.96) - scale(0.97)`

### Low-Frequency Entrances & Exits (Modals, Kiosk, Navigation Drawer)
- Entrance:
  ```css
  animation: entrance 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  ```
- Exit:
  ```css
  animation: exit 0.22s cubic-bezier(0.32, 0, 0.67, 0) forwards;
  ```
- **Never animate from `scale(0)`**: Start entrances at `scale(0.98)` or `translateY(12px)` for weightless fluidity.

### Accessibility (`prefers-reduced-motion`):
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Mobile Spacing & Safe-Area Rules

- **Mobile Viewport Target**: 360px – 480px.
- **Safe Area Inset Handling**:
  - Bottom bar: `bottom: max(12px, env(safe-area-inset-bottom, 12px));`
  - Floating cart dock: `bottom: calc(max(14px, env(safe-area-inset-bottom, 14px)) + 80px) !important;`
  - Body padding offset: `padding-bottom: 74px;`
- **Touch Target Size**: Minimum `44px × 44px` for interactive targets.
