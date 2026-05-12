# macOS 26 Design System

> **For AI Agents**: this is the comprehensive reference companion to [`SKILL.md`](SKILL.md). The skill body in `SKILL.md` covers the entry point (frontmatter, triggers, quick start, hard rules, navigation recipe, expected output). This file covers the **deep theory** — visual foundations, content fundamentals, iconography, sources, caveats. Read this when you need the *why* behind a rule, not just the *what*.

## Contents

- [What's in here](#whats-in-here)
- [Preview index](#preview-index) — categorized list of all 53 specimens
- [The product, in one paragraph](#the-product-in-one-paragraph)
- [Sources](#sources)
- [Fonts (substitution note)](#fonts-substitution-note)
- [Content fundamentals](#content-fundamentals) — voice, tense, casing, punctuation, numbers, emoji policy, examples
- [Visual foundations](#visual-foundations) — Liquid Glass, color, type, corners, shadows, borders, hover/press/focus, spacing, motion, layout, focus rings, animation, imagery, transparency
- [Iconography](#iconography) — SF Symbols, Lucide substitution, window controls, app icons, assets inventory
- [Caveats](#caveats)

---

A design system for **macOS 26** ("Liquid Glass" era), sourced from Apple's
official *Apple Design Resources — macOS* Figma community file. This system
captures the foundations a designer needs to mock up a macOS app or
prototype a system experience: type ramp, color tokens, material recipes,
window chrome, and the full set of native controls.

> Source file (attached as a virtual filesystem during creation): **macOS 26
> (Community).fig** — 38 pages, 129 frames, ~13k nodes. Anyone reproducing
> this can grab the same file from the Apple Design Resources page in the
> Figma Community.

## What's in here

| Path | What it is |
|---|---|
| `colors_and_type.css` | All design tokens — fonts, type ramp, colors, materials, radii, shadows, spacing, motion. Import this into anything you build. |
| `assets/` | Wallpapers and other raw assets copied from the Figma (`cover-bg.png` + 4 system wallpapers: Aurora, Sequoia, Ventura, Monterey). |
| `preview/` | **53 specimen cards** — one per foundation or component family. Populate the Design System tab and double as ready-to-copy recipes. |
| `SKILL.md` | Agent-Skills frontmatter so this folder is portable into Claude Code. |

## Preview index

Every file under `preview/` is a self-contained HTML specimen. Grouped by purpose:

**Foundations**
- `type-ramp.html` — the 11 HIG text styles.
- `vibrant-text.html` — 4 vibrant text sets (light/dark × opaque/vibrant) layered on Liquid Glass.
- `accent-colors.html` — the 8 system accent colors (opaque + vibrant).
- `labels-fills.html` — opacity-based label & fill hierarchy.
- `materials.html` — Liquid Glass recipes (Small / Medium / Large, light + dark).
- `radii.html` — corner radius scale.
- `shadows.html` — control / popover / window shadow recipes.
- `spacing.html` — the 4 / 8 / 12 / 16 / 22 / 24 / 28 pt scale + applied examples.
- `motion.html` — easing curves, durations, and symbol-effect rules.
- `layout.html` — sidebar / inspector / content widths, breakpoints, wireframes.
- `iconography.html` — SF Symbol → Lucide substitution map.
- `focus-rings.html` — keyboard focus tokens (default, tight, key) across every control.
- `wallpapers.html` — the 4 bundled system wallpapers with glass-overlay previews.
- `dark-mode.html` — full set rendered on a dark canvas.
- `app-icons.html` — 12 squircles at 22% radius + 16→128 pt scale.

**Controls**
- `buttons.html` — push, prominent, destructive, icon, capsule, plain.
- `text-fields.html` — input variants, sizes, validation states.
- `search-fields.html` — scoped, tokenised, with recent searches.
- `combo-boxes.html` — combo box with attached menu.
- `popup-buttons.html` — value-displaying dropdown (vs. action-only pull-down).
- `pull-down-buttons.html` — action menu button.
- `steppers.html` — number steppers (compact, with field, +/-).
- `color-wells.html` — color well variants.
- `sliders-dials.html` — sliders + rotary dials.
- `segmented-controls.html` — pill segmented selectors.
- `tabs.html` — tab bars (windowed + inline).
- `toggles.html` — switches and large toggle controls.
- `progress.html` — bars, spinners, gauges.
- `disclosure.html` — disclosure triangles & disclosure buttons.
- `group-boxes.html` / `boxes.html` — grouped settings & inline box treatments.
- `image-wells.html` — drag-target image wells.
- `lists-tables.html` — list rows, table headers, selection states.
- `scrollbars.html` — overlay scrollbars.
- `date-picker.html` — compact textual, popover calendar, graphical, time wheel.

**Surfaces & navigation**
- `popovers.html` — anchored popovers (arrows on all four sides).
- `tooltips.html` — light, dark, and anchored tooltips.
- `menu.html` — context menus & menu items.
- `menu-bar-dock.html` — system menu bar and Dock.
- `sidebars.html` — Liquid Glass split-view sidebars.
- `inspector-sidebar.html` — right-pane inspector with tabs, sections, steppers.
- `toolbars.html` — floating capsule toolbars.
- `notifications.html` — banner notifications.
- `alerts.html` — single- and side-by-side alerts.
- `dialog.html` — save / confirm dialogs.
- `sheets.html` — modal sheets attached to a window.
- `window-controls.html` — traffic-light states (idle, hover, disabled).
- `window.html` — sample window: sidebar + floating toolbar + content.
- `titlebar-window.html` — titlebar-only chrome (About, sign-in) + chromeless variant.
- `utility-window.html` — compact inspector/panel chrome.
- `monobar-window.html` — titlebar + toolbar fused (System Settings, modern Finder).

**Patterns**
- `form-pattern.html` — canonical form layout (110 pt label column, sections, footer).

## The product, in one paragraph

macOS 26 is Apple's desktop OS for Mac. Visually it is defined by **Liquid
Glass** — a translucent, layered material language where windows, sidebars,
toolbars, menu bars, and the Dock are all crafted out of frosted, slightly
specular surfaces that pick up the wallpaper underneath. Type is **SF Pro**
across the board. Color is restrained: a near-monochrome chrome (whites,
near-blacks, opacity-based label hierarchy) accented by a system color
(default blue) and the user's wallpaper bleeding through. Corners are
generously rounded — windows now sit at a **26 pt** outer radius — and
shadows are deep, soft, and quiet rather than punchy.

## Sources

- **Figma file:** "macOS 26 (Community).fig" — mounted virtually during
  creation. Pages of note when reading the spec directly:
  - `/Colors` — accent + label + fill swatches, both opaque and vibrant.
  - `/Materials` — Liquid Glass (Small / Medium / Large) in light + dark.
  - `/Text-Styles` — the eleven HIG text styles (LargeTitle → Caption2).
  - `/Windows`, `/Toolbars-and-Titlebars`, `/Sidebars`, `/Menus`, `/Dialogs`
  - `/Examples` — fully composed windows showing how everything fits.
- **Apple Human Interface Guidelines — Designing for macOS** is the
  authoritative companion reference.

## Fonts (substitution note)

SF Pro is not redistributable, so this kit relies on the **system font
fallback chain** (`-apple-system, BlinkMacSystemFont, …`). On Apple
hardware the real SF Pro renders natively; everywhere else, the system
falls back through Helvetica Neue / Segoe UI / Roboto. For production
mockups you should download SF Pro from
<https://developer.apple.com/fonts/> and drop the files into a `fonts/`
folder, then add a matching `@font-face` block to `colors_and_type.css`.

⚠️ **Substitution flagged for the user:** real SF Pro is not bundled. If
you want pixel-perfect mocks, please attach the SF Pro `.otf`/`.woff2`
files via Import.

---

## Content fundamentals

**Voice.** Calm, direct, slightly formal. Apple's macOS chrome speaks to
the user but never *at* them. Sentences are short, statements are
matter-of-fact, and humor is absent from system-level UI. Marketing copy
("Designed for Apple silicon. Built for Apple Intelligence.") is the
exception — it does use rhythm, parallel construction, and a touch of
swagger, but you'll only see that in About windows and product pages,
not in everyday controls.

**Tense & person.** Buttons are in the imperative ("Save", "Cancel",
"Move to Trash", "Eject Disk"). System messages address the user as
*you* sparingly and rarely use *we* / *I*. Confirmations describe the
state, not the actor: "*5 items will be moved to the Trash.*" — not
"*We'll move 5 items.*"

**Casing.** Use **Title Case** for buttons, menu items, window titles,
and section headers ("Move to Trash", "New Smart Folder", "Show Path
Bar"). Sentence case for body copy, alerts, and help text. Toggles are
always labelled as nouns ("Show Tab Bar"), not verbs ("Toggle Tabs").

**Punctuation.**
- Menu items leading to a follow-up dialog end with an ellipsis: "Save
  As…", "Print…", "Delete…". No ellipsis if the action happens
  immediately.
- Alert primary messages are full sentences ending with a period or
  question mark. Secondary text adds detail in one short sentence.
- Use the typographic ellipsis (`…`), em-dash (`—`), and curly quotes
  (`"" ''`).

**Numbers, dates, units.** Numerals from 0 upward in UI ("3 items
selected", "12 MB"). Use a non-breaking space between value and unit
("12 MB", not "12MB"). Dates follow the user's locale; default to "Mon
Jun 10  9:41 AM" style in mockups (Apple's traditional "9:41" demo
time appears throughout the design file).

**Emoji & decorative icons.** Apple does **not** use emoji in system
chrome. Status is communicated through SF Symbols, color, and copy —
never 🎉 or ✅ in a dialog. Emoji *do* appear in Messages, Mail
subjects, etc., because they're user content, but the OS itself
abstains.

**Examples (from the Figma).**
- *Dialog primary:* "Do you want to save the changes you made to the
  document **Untitled**?"
- *Dialog secondary:* "Your changes will be lost if you don't save
  them."
- *Buttons:* `Save`, `Don't Save`, `Cancel`
- *Menu items:* `New Window`, `New Tab`, `Save As…`, `Move to Trash`
- *Footer copy:* "Copyright © 2026 Apple Inc. All rights reserved."

---

## Visual foundations

### The big idea — Liquid Glass

Every floating surface in macOS 26 is a **material**, not a flat fill.
Sidebars, toolbars, the menu bar, the Dock, popovers, alerts, sheets,
tooltips, and Control Center are translucent panes that pick up the
wallpaper, content, and accent color underneath. Practically:

```css
.liquid-glass {
  background: var(--material-regular-light);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-glass);
}
```

Three thicknesses exist in the Figma: **Small UI** (chips, tooltips —
thin, ~60% opacity), **Medium UI** (popovers, segmented controls —
72%), and **Large UI** (sidebars, sheets — 85%). The *primary* content
area is always opaque white/near-black — clarity beats prettiness for
text-dense surfaces.

### Color

- **Restraint.** Apps are mostly white-and-black-with-opacity. A
  single accent color (default *Blue*) does almost all the highlighting.
- **Opacity, not tints.** Secondary/tertiary text and fills are not
  separate grays — they're black or white at 50% / 25% / 10%
  opacity. This makes one palette work over any material.
- **System colors come in two flavors** — *opaque* (use on solid
  backgrounds) and *vibrant* (use over materials; slightly desaturated
  + lighter so they read through blur).

### Type

- One family, **SF Pro**. Display optical size kicks in at ~20 px.
- The HIG ramp has eleven styles. The two most common in the Figma are
  **Body** (13/16 Regular) and **Headline** (13/16 Bold) — note that
  Headline is the same size as Body, just bolder. Apple uses *weight*
  for emphasis far more than size jumps.
- Tracking: tighten Display sizes (`letter-spacing: -0.01em` at 22 px,
  `-0.02em` at 26+ px). Text sizes stay at default tracking.

### Corners

- **Windows: 26 pt outer radius.** This is the signature macOS 26
  silhouette — noticeably rounder than the 10 pt of previous releases.
- Toolbar/titlebar-only windows: 16 pt.
- Controls (push buttons, segmented controls): 6 pt.
- Text fields, search fields: 5 pt.
- Pills and capsule buttons: full radius.

### Shadows

- Window: `0 16px 48px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.23)`. Deep,
  soft, and always paired with a 1 px hairline key-line so the window
  separates from the wallpaper even when shadows blend.
- Popovers, tooltips, sheets: shorter, lower-opacity drops + the same
  hairline.
- Controls: a 0.5 px **bright inner top edge** + a 0.5–1 px **dark
  drop**. Reads as a tiny lit ridge.

### Borders

- Almost everything uses a translucent 0.5 px hairline instead of a
  hard line. Common values: `rgba(0,0,0,0.10)` on light, `rgba(255,
  255,255,0.15)` on dark.
- Separators between rows are full-bleed `rgba(0,0,0,0.10)`.

### Hover / press / focus

- **Hover** on a list row or menu item: fill becomes
  `rgba(0,0,0,0.05)` (light) or `rgba(255,255,255,0.08)` (dark). No
  outlines, no shape change.
- **Press** on a control: the control's fill darkens ~8% (light) or
  lightens ~12% (dark). Push buttons do *not* shrink. SF Symbols
  briefly bounce ("symbol effect") on tap in real builds; static
  mockups ignore this.
- **Focus ring:** a 3 px halo of the accent color at ~40% opacity
  ringing the control, plus the accent at full saturation as a 0.5 px
  inner border.

### Spacing scale

The Figma uses a consistent **4 / 8 / 12 / 16 / 22 / 24 / 28 pt**
scale. Use these tokens (also exposed as CSS custom properties in
`colors_and_type.css`):

| Token | Use |
|---|---|
| `4 pt` | Inner padding of compact controls (chip icon-to-label, micro gaps). |
| `8 pt` | Default gap between adjacent controls in a row. |
| `12 pt` | Spacing between a label and its control; row gap in forms. |
| `16 pt` | Margin between groups within a section. |
| `22 pt` | Section header → first row; settings card padding. |
| `24 pt` | Window edge padding (content area). |
| `28 pt` | Major section separation; toolbar-to-content. |

See `preview/spacing.html` for the visual scale and applied examples.

### Motion

- **Standard ease:** `cubic-bezier(0.4, 0, 0.2, 1)` — default for
  fades, transforms, color changes.
- **Decelerate:** `cubic-bezier(0, 0, 0.2, 1)` — elements entering
  the scene.
- **Accelerate:** `cubic-bezier(0.4, 0, 1, 1)` — elements leaving.
- **Spring (Apple-style):** `cubic-bezier(0.5, 1.5, 0.5, 1)` —
  reserved for symbol effects and the occasional toggle thumb.

**Durations:** popovers / tooltips ~**150 ms**, sheet & window
state changes ~**250 ms**, large transitions (Mission Control,
Launchpad) ~**400 ms**. Hover state transitions snap (no easing,
~80 ms cross-fade). Respect `prefers-reduced-motion` and drop the
transform component while keeping opacity. See `preview/motion.html`.

### Layout rules

- The **menu bar** is fixed at the top of the screen, full-bleed,
  liquid-glass material. Height ~24 px at 1× (the design file uses
  ~28 px at 100% zoom in 1920×1080 mocks).
- The **Dock** floats at the bottom-center, also liquid glass, with
  ~16 px margin from the screen edge.
- **Windows** can use one of four chrome variants:
  1. *Titlebar only* — small utility windows (About, sign-in).
  2. *Toolbar + titlebar* — default app windows.
  3. *Monobar* — titlebar and toolbar fused into a single bar
     (System Settings, modern Finder).
  4. *Sidebar split* — Finder, Mail, Notes; sidebar is a separate
     liquid-glass surface that bleeds the wallpaper.
- **Sidebar:** 180–240 pt wide (left).
- **Inspector:** 260–320 pt wide (right).
- **Content min-width:** 400 pt.
- **Window edge padding:** 24 pt; section padding 22 pt.
- See `preview/layout.html` for breakpoints and wireframes.

### Focus rings

Keyboard focus is signalled by a soft accent halo. Three tokens:

| Token | Use |
|---|---|
| `--focus-ring` | `0 0 0 3px rgba(0,122,255,0.40)` — default (fields, secondary buttons). |
| `--focus-ring-tight` | `0 0 0 2px rgba(0,122,255,0.45)` — small controls (checkboxes, swatches). |
| `--focus-ring-key` | `0 0 0 4px rgba(0,122,255,0.30)` — the default (key-equivalent) button. |

Rules: use `:focus-visible`, never `:focus`. Pointer clicks don't
paint a ring. Rings inherit the user's accent color. See
`preview/focus-rings.html`.

### Animation

- Apple's curves are slow-in / fast-out (`cubic-bezier(0.4, 0, 0.2, 1)`
  is a fine substitute). Window open/close uses a gentle scale (0.95 →
  1) over ~250 ms paired with opacity.
- Popovers and tooltips fade + scale from their anchor (~150 ms).
- Symbol effects (bounce, pulse, scale) are reserved for SF Symbols
  reacting to user input — quick, ~200 ms, ease-out.
- **No bouncy springs**, no parallax wallpaper shifts, no celebration
  micro-animations.

### Imagery

- macOS ships **photographic** wallpapers — sweeping landscapes,
  abstract organic gradients, "aerial" satellite views. Always
  warm-cool balanced (never single-hue), often with subtle film grain.
- **Icons** in Finder/Dock are **squircles** with a 22% corner radius
  on a 1024 pt square, lit from above, with a tiny inner-shadow lip.
- App marketing imagery skews bright, clean, high contrast; product
  photography never has visible grunge or texture.

### Transparency & blur

- Use liquid-glass materials only on **floating** surfaces. The main
  content of a window is opaque white (light) or near-black (dark) so
  text stays readable.
- Backdrop-filter values used here: `saturate(180%) blur(20px)` for
  regular materials, `saturate(200%) blur(40px)` for "thick" Dock /
  sheet surfaces.

---

## Iconography

macOS 26 uses **SF Symbols** for nearly every glyph in chrome and
content — there are ~6,900 of them in the official SF Symbols 7 app.
They are designed to align with the SF Pro x-height, ship in nine
weights (Ultralight → Black), three scales (S/M/L), and have *symbol
effects* (bounce, pulse, scale, variable color) baked in.

**They are not redistributable.** This kit cannot ship the SF Symbols
font. Workarounds, in order of preference:

1. **(Best)** If the user has installed SF Symbols on their Mac, use
   the Unicode glyphs directly via the bundled "SF Pro" font — the
   private-use codepoints will render correctly.
2. **(Substitute, used in this kit)** **Lucide** icons from CDN. Lucide
   is monoline at a 2 px stroke, geometric, and reads as visually
   adjacent to SF Symbols Regular weight. Loaded from
   `https://unpkg.com/lucide-static@latest/icons/<name>.svg`. ⚠️
   **Flagged substitution** — this is the closest free option but is
   not pixel-equivalent.
3. **(Avoid)** Emoji. Apple does not use emoji as chrome icons; doing
   so will immediately look off-brand.

**Window controls** (close / minimize / zoom — the red/yellow/green
"traffic lights") are recreated as plain CSS circles. See
`preview/window-controls.html` for the recipe.

**Asset inventory in `assets/`:**
- `cover-bg.png` — the macOS 26 default wallpaper (1920×1080), pulled
  straight from the Figma cover frame.
- `wallpaper-aurora.png`, `wallpaper-sequoia.png`,
  `wallpaper-ventura.png`, `wallpaper-monterey.png` — four additional
  1920×1080 system wallpapers. Use behind any window mockup to test
  Liquid Glass surfaces against varied backdrops. See
  `preview/wallpapers.html` for previews with glass overlay.

**App icons.** Apple ships every app icon as a **squircle** at the
shared **22% corner radius**. `preview/app-icons.html` documents
twelve placeholder squircles (Finder, Safari, Mail, Messages, Photos,
App Store, TV, Maps, Calendar, Music, Notes, Settings) and the
16→32→64→128 pt scale at which they're typically rendered.

---

## Caveats

- The Figma pseudocode had several color values that looked like
  resolution artefacts (e.g. accent slots showing the same red over
  and over). Where the pseudocode contradicted itself, I cross-checked
  against the rendered Figma screenshots and against Apple's published
  system color values, and chose the published values.
- SF Pro and SF Symbols are not bundled. See substitution notes above.
