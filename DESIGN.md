# DESIGN SYSTEM — SPARTA BARBER

## Color Palette
**Color Strategy**: Restrained (tinted neutrals + one accent)

- **Background**: `#0c0c0c` (near-black, slightly warm)
- **Surface**: `#272727` (dark gray)
- **Surface Elevated**: `#313131`
- **Brand Accent**: `#B8B8B8` (warm silver-gray) — primary interactive color
- **Brand Dark**: `#888888` (pressed/hover state)
- **Brand Light**: `#D4D4D4` (highlight/focus)
- **Text Primary**: `#f5f0eb` (off-white, warm undertone)
- **Text Muted**: `#a8a8a8` (medium gray for secondary text)
- **Border**: `rgba(255, 255, 255, 0.08)` (subtle dividers)

**Rationale**: Dark luxury aesthetic. Warm grays (not cold blacks/whites) signal premium craftsmanship. Single #B8B8B8 accent provides focus without visual noise.

## Typography
- **Display Font**: Bebas Neue (`--font-display`) — bold, geometric, for headlines
- **Heading Font**: Cormorant Garamond (`--font-heading`) — serif, elegant, for italicized subheadings
- **Body Font**: DM Sans (`--font-sans`) — modern sans-serif, excellent readability
- **Mono**: Geist Mono (rare, for code/technical content)

**Scale**: Fluid sizing with clamp() for responsive hierarchy (e.g., `clamp(40px, 5vw, 72px)`)

## Elevation & Depth
- **Cards**: `ring-1 ring-white/5` for subtle borders; avoid shadows (maintain flatness)
- **Interactive states**: `hover:ring-[#B8B8B8]/40` for focus indication
- **Overlays**: Subtle gradients (`bg-gradient-to-t from-[#0c0c0c] via-transparent`) to integrate images

## Components & Patterns
- **Buttons**: Full-width color change on hover; no rounded corners (squared aesthetic)
- **Links**: Underline on hover; animated icon translation
- **Sections**: Full-width, spacing via padding (py-28), minimal containers
- **Motion**: Framer Motion with ease-out curves; staggered animations on scroll visibility

## Spacing & Rhythm
- **Section padding**: `py-28` (large breathing room)
- **Interior padding**: `px-6` for horizontal, variable vertical
- **Gap patterns**: `gap-4` (cards), `gap-6` (sections), `gap-12` (major layout)

## Motion & Animation
- **Trigger**: Scroll-based (useInView from Framer Motion)
- **Easings**: `easeOut` curves (exponential) for natural deceleration
- **Durations**: 0.6–0.9s for entrance animations; 0.3–0.5s for hover/interaction
- **Pattern**: Fade + slight Y-translate for content reveals

## Performance Considerations
- Placeholder images should be replaced with real photography
- Grain overlay (SVG filter) is resource-intensive; consider simplifying or removing
- Heavy animation staggering on all sections causes layout thrashing; use transform-only animations
- Images need proper lazy loading for below-fold content
- Masonry layout (CSS columns) can cause performance issues; consider grid alternative
