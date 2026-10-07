# AGENTS.md — Project Design & Development Standards

This document establishes the binding design standards, engineering practices, and architectural rules for this project. All work must adhere to the priorities outlined below, synthesized from our installed design skills located in `.agents/skills/`.

---

## 1. Core Priorities & Design Principles

### 1. Human-Designed Visual Quality Over Generic AI Aesthetics
- Reject standard AI visual clichés:
  - Avoid warm cream backgrounds (`#F4F1EA`) with terracotta/warm-clay accents (`#D97757`).
  - Avoid near-black themes with neon green/vermilion accents.
  - Avoid monotone SaaS card kits with uniform border radii, identical soft grey shadows (`rgba(0,0,0,0.1)`), and decorative gradient washes.
  - Avoid template chrome: tracked-out ALL-CAPS eyebrow labels, `WORD — fragment` em-dash headers, and unnecessary `01 / 02 / 03` number markers on non-sequential content.
- Ground visual choices in the subject matter, real domain metaphors, and authentic user tasks.
- *Referenced Skill:* [.agents/skills/frontend-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/frontend-design/SKILL.md)

### 2. Apple-Inspired Interface Principles for the Web
- Ground design in Apple's eight foundational principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, and Delight.
- Emphasize quiet, invisible structure where navigation and controls feel natural and responsive.
- Translate Apple Human Interface Guidelines thoughtfully for web environments (desktop browsers, tablets, mobile browsers).
- *Referenced Skill:* [.agents/skills/apple-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/apple-design/SKILL.md)

### 3. White Theme Only (Strict Constraint)
- The interface is strictly **White Theme / Light Mode**.
- No dark mode, no dark-mode toggles, and no dark-mode overrides.
- Use crisp white canvases (`#FFFFFF`), subtle off-white structural surface tiers (e.g. `#FBFBFC`, `#F5F6F8`), and nuanced neutral borders.

### 4. Cohesive Design Tokens & System Discipline
- **Color Tokens**: Limit the palette to a deliberate neutral scale plus one intentional accent color. Colors communicate status, action, or identity—never decorative clutter.
- **Typography Scale**: Build on a clear geometric ratio (~1.2 - 1.25) using intentional weights (400, 500, 600). Weight and tonal contrast carry hierarchy before font size alone.
  - Apply optical sizing: slightly negative tracking on large headings; line height ~1.5 on body.
  - Apply `text-wrap: balance` on headlines and `text-wrap: pretty` on body copy.
  - Apply `font-variant-numeric: tabular-nums` to dynamic figures, counters, tables, and metrics.
- **Spacing Scale**: Base unit on an 8px grid (4px for micro-adjustments: 4, 8, 12, 16, 24, 32, 48, 64px). Symmetrical padding across related containers.
- **Elevation & Radius Scale**:
  - Concentric border radius formula: `outerRadius = innerRadius + padding`.
  - Shadows for elevation, crisp hairline borders for structural separation.
  - Layered light shadows: combine a 1px ring (`rgba(0,0,0,0.06)`) with subtle soft depths (`0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)`).
- *Referenced Skills:* [.agents/skills/interface-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/interface-design/SKILL.md), [.agents/skills/better-ui/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/better-ui/SKILL.md)

### 5. Restrained Use of Translucency & Glass Effects
- Translucent materials and backdrop blur (`backdrop-filter: blur(...)`) must be confined strictly to floating functional layers: sticky top navigation bars, modal overlays, or dropdown sheets.
- Never use glassmorphism or blur effects over main content cards or reading surfaces.
- *Referenced Skills:* [.agents/skills/apple-design/references/hig/liquid-glass.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/apple-design/references/hig/liquid-glass.md)

### 6. Purposeful Motion & Interaction Feedback
- Motion must be brief, purposeful, and interruptible.
- High-frequency interactions (buttons, tabs, inputs) get instantaneous or rapid feedback:
  - Button press tactile feedback: `transform: scale(0.96)` to `scale(0.97)` on `:active`.
  - Transition duration ≤ 180ms using custom ease-out curves (`cubic-bezier(0.2, 0, 0, 1)` or `cubic-bezier(0.23, 1, 0.32, 1)`).
- Low-frequency entrances (modals, section reveals) keep duration < 300ms. Never animate from `scale(0)`.
- Always name exact CSS properties for transitions; avoid `transition: all`.
- Respect `prefers-reduced-motion` at all times (disable transforms, preserve subtle opacity/color shifts).
- *Referenced Skills:* [.agents/skills/better-ui/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/better-ui/SKILL.md), [.agents/skills/interface-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/interface-design/SKILL.md)

### 7. Responsive Fluidity Across All Breakpoints
- First-class layouts engineered for:
  - Mobile (360px – 480px)
  - Tablet (768px – 1024px)
  - Laptop (1200px – 1440px)
  - Large Desktop (1600px+)
- No content clipping, horizontal scroll leaks, or awkward line breaks.
- Navigation transforms cleanly between mobile bottom/overlay sheets and desktop header bars.

### 8. Accessibility & Semantics
- WCAG AA contrast compliance: minimum 4.5:1 for body copy; 3:1 for large display text and UI components.
- Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<a>`). Never use clickable `<div>` elements.
- Full keyboard operability with visible, aesthetic `:focus-visible` focus rings.
- Minimum interactive touch target of 44 × 44px.

### 9. Real Iconography Only
- Use clean, cohesive vector SVG icons from a single consistent icon set (e.g. Lucide, Heroicons, or SF Symbols inspired SVGs).
- Match icon stroke width to adjacent text optical weight (e.g. 1.5px stroke for 400 weight, 2px stroke for 600 weight).
- Set icons to use `currentColor` for predictable hover, active, and disabled state styling.
- **Absolute Rule:** Never use emoji characters (e.g. 🚀, 🔥, 💡, ⚡) as user interface icons or status indicators.

### 10. Truthful Business Data & Authentic Content
- Use genuine, realistic, and coherent business information.
- **Absolute Rule:** Never fabricate fake customer reviews, non-existent street addresses, invented phone numbers, fictitious prices, or unsubstantiated company claims.
- Copywriting standards:
  - Active voice, sentence case for descriptions, direct CTAs ("Book service", "Download guide").
  - Eliminate AI writing tells: no em-dashes (`—`) or en-dashes (`–`), no empty buzzwords ("tapestry", "seamless", "delve", "vital role", "game-changer").
  - Plain, clear, respectful tone.
- *Referenced Skill:* [.agents/skills/humanize/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/humanize/SKILL.md)

### 11. Modular Architecture & Reusable Components
- Establish single-responsibility, reusable components with explicit props and state variants:
  - Default, Hover, Active, Focus, Disabled, Loading, Empty, and Error states.
- Follow a strict styling hierarchy: Design Tokens → Shared Components → Local Composition.
- Never duplicate long strings of utility classes or hand-roll ad-hoc primitives.

### 12. Performance, Reliability & Production Readiness
- Fast first-contentful paint, minimal cumulative layout shift (CLS), and lean asset payloads.
- Native HTML form validations, progressive enhancement, and error boundaries.
- Clean code architecture ready for immediate production deployment.

---

## 2. Directory Reference for Installed Skills

The project is backed by 7 specialized skills installed in `.agents/skills/`:

| Skill | Path | Primary Purpose |
| :--- | :--- | :--- |
| **frontend-design** | [.agents/skills/frontend-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/frontend-design/SKILL.md) | Creative direction, anti-cliché aesthetics, distinct visual identity |
| **improve-ui** | [.agents/skills/improve-ui/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/improve-ui/SKILL.md) | Evidence-based UI auditing and structured implementation plans |
| **interface-design** | [.agents/skills/interface-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/interface-design/SKILL.md) | Craft foundations, visual hierarchy, tokens, states, layout rhythm |
| **design-lab** | [.agents/skills/design-lab/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/design-lab/SKILL.md) | Design exploration workflows and multi-variant reviews |
| **better-ui** | [.agents/skills/better-ui/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/better-ui/SKILL.md) | Micro-interactions, concentric radii, optical alignment, timing |
| **humanize** | [.agents/skills/humanize/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/humanize/SKILL.md) | Anti-AI copywriting, tone calibration, no-fabrication rule |
| **apple-design** | [.agents/skills/apple-design/SKILL.md](file:///c:/Users/Nithya/sklwaste/.agents/skills/apple-design/SKILL.md) | Apple HIG review lenses, accessibility, Liquid Glass discipline |
