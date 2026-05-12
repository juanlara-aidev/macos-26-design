---
name: macos-26-design
description: "Bundle del design system macOS 26 (era Liquid Glass) basado en Apple Design Resources oficiales. Provee tokens (SF Pro + paleta sistema + materiales Liquid Glass + radii 26pt window + spacing 4/8/12/16/22/24/28 + motion curves + shadows), 53 specimens HTML por foundation/control/superficie, 4 wallpapers, mapa SF Symbols → Lucide y convenciones de voz Apple. Activar cuando el usuario menciona look macOS, Liquid Glass, sidebar Finder, app nativa Mac, ventana con traffic lights, System Settings style, toolbar floating, dock translúcido, chrome de Finder/Mail/Notes, o pide replicar interfaces con sensibilidad Apple desktop."
allowed-tools: Read, Write, Edit, Bash
user-invocable: true
effort: max
---

# macOS 26 Design System — era Liquid Glass

> Bundle handoff de **Claude Design** (claude.ai/design) sobre el archivo Figma oficial *"macOS 26 (Community).fig"* de Apple Design Resources. Provee tokens, specimens HTML, wallpapers y reglas para reproducir el look macOS 26 pixel-perfect en cualquier app web, desktop wrapper o PWA. Tecnología-agnóstico: los specimens son HTML/CSS plain, los tokens son CSS custom properties portables a Tailwind / styled-components / vanilla CSS / módulos CSS.

---

## Cuándo activar

- "Quiero que mi app se vea como macOS 26 / Liquid Glass / nativa Mac."
- "Hazme un sidebar estilo Finder con superficie de cristal."
- "Replica el chrome de System Settings (titlebar + toolbar fusionados)."
- "Diseña esto con sensibilidad Apple desktop, no genérica."
- "Necesito ventanas con traffic lights y radius redondo."
- "Agrega Liquid Glass al toolbar / popover / dock."
- "Tipografía SF Pro + jerarquía de Apple."

## Cuándo NO activar

- El usuario pide look mobile puro (iOS, iPadOS) — falta `ios-design` flavor; no usar este bundle para Home Screen iOS.
- El usuario pide landing marketing genérica sin heritage Apple — usar `frontend-design` u otra skill de diseño.
- El usuario quiere un look "vintage Mac" (Aqua, Carbon, Yosemite) — esto es macOS 26 específicamente, las versiones previas tienen lenguaje visual distinto.

---

## Instalación en cualquier proyecto

El folder `project/` es un **bundle Skills 2.0 portable**. Para hacerlo descubrible por Claude Code:

```bash
# Opción A: copiar como skill nativa de Claude Code
cp -r .claude/design-systems/macos-26-design-system/project .claude/skills/macos-26-design

# Opción B: dejarlo en design-systems/ y consumirlo desde otra skill (e.g. frontend-design)
# — referencia el path completo en el body del consumidor
```

Tras instalar, Claude Code descubre la skill por el frontmatter al iniciar la sesión. Activación automática cuando el usuario menciona uno de los triggers del campo `description`, o invocación manual con `/macos-26-design`.

---

## Quick start (3 pasos para usar el bundle)

1. **Importa los tokens en el target** — copia `colors_and_type.css` al proyecto y enlázalo en el HTML root (`<link rel="stylesheet">`) o pórtalo a `tailwind.config.ts` (mapeo en `references/foundations.md`).
2. **Para cualquier componente**, lee `preview/<componente>.html` byte-exact y recréalo en el framework del target (React/Vue/Svelte/HTML estático). El specimen es la fuente de verdad pixel-perfect; el código interno del prototipo es desechable.
3. **Para reglas de voz, copy y casing**, lee `README.md` sección "Content fundamentals" antes de redactar labels, alerts, menús o body copy.

---

## TOC del bundle (qué hay y dónde)

| Recurso | Path | Contenido |
|---|---|---|
| Tokens canónicos | `colors_and_type.css` | Variables CSS verificadas contra Figma: tipografía, jerarquía de labels por opacidad, system accent colors, materiales Liquid Glass (thin/regular/thick × light/dark), radii, shadows, easing, durations. **Importar este archivo es el primer paso de cualquier integración.** |
| Doc comprehensivo | `README.md` | 414 líneas. Background, foundations, voz, iconografía, caveats. Lectura recomendada para empaparse del lenguaje visual antes de implementar. TOC al inicio del archivo. |
| Specimens (53) | `preview/*.html` | Una recipe por foundation/control/superficie. Cada specimen es self-contained y se renderiza directo en el navegador. **Índice categorizado abajo.** |
| Assets | `assets/` | `cover-bg.png` + 4 wallpapers oficiales (Aurora, Sequoia, Ventura, Monterey). Solo para mocks/preview — no redistribuibles en producción. |
| Showcase | `macOS 26 Showcase.html` | Vista catálogo con todos los specimens montados en una sola página. Útil para inspección rápida. |

### Specimens categorizados — lectura on-demand

Anthropic recomienda Pattern 2 (organización por dominio) para minimizar tokens cargados. Lee solo el specimen que necesitas:

**Foundations** (15) — leer cuando se diseñan tokens o se arranca el theme.
- `type-ramp.html` `vibrant-text.html` `accent-colors.html` `labels-fills.html` `materials.html` `radii.html` `shadows.html` `spacing.html` `motion.html` `layout.html` `iconography.html` `focus-rings.html` `wallpapers.html` `dark-mode.html` `app-icons.html`

**Controls** (20) — leer cuando se construye un input/botón/control específico.
- `buttons.html` `text-fields.html` `search-fields.html` `combo-boxes.html` `popup-buttons.html` `pull-down-buttons.html` `steppers.html` `color-wells.html` `sliders-dials.html` `segmented-controls.html` `tabs.html` `toggles.html` `progress.html` `disclosure.html` `group-boxes.html` `boxes.html` `image-wells.html` `lists-tables.html` `scrollbars.html` `date-picker.html`

**Surfaces y navigation** (17) — leer cuando se construye chrome de ventana, overlay, panel.
- `popovers.html` `tooltips.html` `menu.html` `menu-bar-dock.html` `sidebars.html` `inspector-sidebar.html` `toolbars.html` `notifications.html` `alerts.html` `dialog.html` `sheets.html` `window-controls.html` `window.html` `titlebar-window.html` `utility-window.html` `monobar-window.html` `forms.html`

**Patterns** (1) — leer cuando se diseña un form/settings page.
- `form-pattern.html` — layout canónico (110 pt label column, secciones, footer).

---

## Reglas duras del look macOS 26 (no negociables)

Estas 12 reglas definen "se ve a macOS 26" vs. "se ve genérico". Romperlas degrada inmediatamente la sensación premium.

1. **Liquid Glass solo en superficies flotantes** — sidebar, toolbar, menu bar, dock, popover, alert, sheet, tooltip, Control Center. El contenido principal de la ventana es **opaco** (blanco light / casi-negro dark) para que el texto sea legible. Glass en zonas densas de texto es anti-patrón.
2. **Tres densidades de glass**: Small UI ~57% (chips, tooltips), Medium UI ~67% (popover, segmented, sidebar), Thick UI ~85% (sheets, Control Center, dock). Tokens `--material-thin/regular/thick-{light,dark}` en `colors_and_type.css`.
3. **Receta Liquid Glass canónica**: `background: var(--material-regular-light); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px); box-shadow: var(--shadow-glass);`. El `-webkit-` prefix sigue siendo necesario para Safari.
4. **Opacidad, no tintes grises**, para jerarquía de labels y fills. Secondary text es `black @ 50%`, no `gray-600`. Esto permite que la misma paleta funcione sobre cualquier material/wallpaper.
5. **SF Pro para todo el chrome**. Fallback chain en `--font-system: -apple-system, "SF Pro", "SF Pro Text", BlinkMacSystemFont, "Helvetica Neue", …`. En hardware Apple renderiza SF Pro nativo; en otros OS cae al system font.
6. **No emojis en chrome**. Apple no usa `🎉 ✅ ❌` en dialogs, alerts ni menús. Status se comunica con SF Symbols, color y copy. Emoji solo aparece en contenido del usuario (Messages, Mail subject), nunca en el OS.
7. **Window radius**: estándar 26pt outer (`--r-window`), titlebar-only 16pt (`--r-window-sm`), sheet 34pt (`--r-sheet`). El 26pt es la signatura visual macOS 26 vs. el 10pt de versiones previas.
8. **Control radii**: push buttons 6pt (`--r-control`), text fields 5pt (`--r-field`), capsule buttons full radius, app icon squircle 22% del lado (`--r-tile`).
9. **Spacing scale 4 / 8 / 12 / 16 / 22 / 24 / 28 pt** — fija. Window edge padding 24pt, section padding 22pt, gap entre controles 8pt, gap label↔control 12pt. Valores fuera de esta escala se sienten "off" aunque no se pueda explicar por qué.
10. **Hover / press / focus**:
    - Hover en row/menu item: fill `rgba(0,0,0,0.05)` light o `rgba(255,255,255,0.08)` dark. Sin outline, sin shape change.
    - Press: fill oscurece ~8% (light) o aclara ~12% (dark). Push buttons NO se encojen.
    - Focus visible: usar `:focus-visible` (nunca `:focus`). Halo accent al 40% opacity ringing the control + accent al 100% como inner border 0.5px. Tres tokens: `--focus-ring`, `--focus-ring-tight`, `--focus-ring-key`.
11. **Shadows con hairline**: window `0 16px 48px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.23)`. Siempre 1px hairline pegado al shadow para que la ventana se separe del wallpaper aún cuando el shadow se funda con un fondo oscuro. Tokens `--shadow-window/glass/popover/tooltip/control`.
12. **Motion curves**: estándar `cubic-bezier(0.4, 0, 0.2, 1)` para fades/transforms/colors. Durations: popovers/tooltips 150ms, sheet/window 250ms, transiciones grandes (Mission Control) 400ms. Hover transitions snap (~80ms cross-fade). Respetar `prefers-reduced-motion` y dropear transform, mantener opacity.

---

## Voz y copy (qué decir y cómo)

Apple chrome habla **calmo, directo, ligeramente formal**. Reglas no negociables:

- **Imperative en botones**: "Save", "Cancel", "Move to Trash", "Eject Disk". Nunca "Click here to save".
- **Title Case** en botones, menús, títulos de ventana, headers de sección: "Move to Trash", "New Smart Folder", "Show Path Bar". **Sentence case** en body copy, alerts, help text.
- **Ellipsis (`…`) en menús que abren follow-up dialog**: "Save As…", "Print…", "Delete…". Sin ellipsis si la acción ocurre inmediato ("Save", "Delete Now").
- **Toggles como sustantivo, no verbo**: "Show Tab Bar" ✓, "Toggle Tabs" ✗.
- **Alerts**: primary message es oración completa terminada en `.` o `?`; secondary añade detalle en una sola oración corta.
- **Punctuación tipográfica**: ellipsis `…`, em-dash `—`, curly quotes `"" ''`.
- **Numerales desde 0**: "3 items selected", "12 MB" (con NBSP entre valor y unidad).
- **Fechas**: locale del usuario; default mockups usan "Mon Jun 10 9:41 AM" (la "9:41" demo time de Apple es canónica en mocks).

Detalle completo + ejemplos del Figma en `README.md` sección "Content fundamentals".

---

## Iconography (qué iconos usar)

macOS 26 usa **SF Symbols** (~6,900 glyphs, alineados con SF Pro x-height, 9 weights, 3 scales, symbol effects baked-in).

**SF Symbols NO es redistribuible.** Cadena de substitución, en orden de preferencia:

1. **(Best)** Si el usuario tiene SF Symbols instalado en Mac y la app corre en Apple hardware, usar los Unicode glyphs directos vía la fuente SF Pro. Los private-use codepoints renderizan correctos.
2. **(Substitute canónico de este bundle)** **Lucide** icons (monoline 2px stroke, geométrico, visualmente adjacent a SF Symbols Regular weight). CDN: `https://unpkg.com/lucide-static@latest/icons/<name>.svg`. Mapping específico SF→Lucide en `preview/iconography.html`.
3. **(Avoid)** Emoji o icon fonts genéricos (FontAwesome, Heroicons). Anti-brand inmediato.

**Window controls** (rojo/amarillo/verde traffic lights de close/minimize/zoom): recreados con CSS plain en `preview/window-controls.html`. NO usar SF Symbols para esto — el círculo de color con gradient interno es la receta.

**App icons**: squircle a 22% corner radius en un 1024pt square, iluminado desde arriba, con inner-shadow lip sutil. Escala canónica 16→32→64→128pt. Specimen en `preview/app-icons.html`.

---

## Wallpapers y composición

`assets/` contiene `cover-bg.png` + 4 wallpapers Apple oficiales (Aurora, Sequoia, Ventura, Monterey). Uso recomendado:

- **Mocks/preview**: ponerlos detrás de cualquier ventana mockup para testear Liquid Glass surfaces contra backdrops varied. `preview/wallpapers.html` muestra cada uno con glass overlay.
- **NO redistribuir en producción** — son assets propiedad de Apple, usables para diseño pero no para shipping en una app distribuida.
- Para producción, usar wallpaper propio que cumpla: photographic (no flat color), warm-cool balanced (no single-hue), abstract gradient o landscape. La granularidad sutil (subtle film grain) es deseable.

---

## Cómo navegar el bundle (recipe canónica)

Cuando el usuario pide implementar un componente, el flujo del agente es:

```bash
# 1. Identificar el specimen exacto (50+ files, usar grep si no es obvio)
ls preview/*.html | grep -i <keyword>

# 2. Leer el specimen byte-exact
# (vía Read tool — preview/<component>.html)

# 3. Identificar tokens usados — grep en colors_and_type.css
grep -E 'var\(--[a-z-]+\)' preview/<component>.html | sort -u

# 4. Verificar receta de hover/focus en el specimen — todos los previews incluyen los estados

# 5. (Opcional) ver el componente en contexto compuesto
open preview/window.html  # ventana sample con sidebar + toolbar + content
```

Para preguntas de teoría (¿por qué este radius?, ¿cuándo usar thick glass?), leer `README.md` sección "Visual foundations".

---

## Output esperado del agente

Cuando se invoca con "implementa X componente de macOS 26":

1. **Identifica el specimen**: lee `preview/<componente>.html` byte-exact.
2. **Identifica tokens**: extrae las variables CSS usadas y mapéalas al sistema del target (Tailwind tokens, styled-components theme, vanilla CSS imports).
3. **Recrea pixel-perfect en el framework del target**: HTML semántico + clases del DS. Si el target usa React/Vue/Svelte, transcribe la estructura del specimen al component model nativo (no copiar el HTML prototipo verbatim — es desechable).
4. **Aplica estados completos**: idle, hover, press, focus-visible, disabled. El specimen los incluye todos.
5. **Verifica accessibility**: contraste WCAG AA, focus ring visible con `:focus-visible`, labels asociados a inputs, role/aria donde aplique.
6. **Valida visual (si disponible)**: dev server + screenshot vs. el specimen. Mismatch ≥ 4px en spacing o color diff > 2% requiere ajuste.
7. **Anuncia al operador**: qué componente quedó listo, qué tokens se importaron, qué diferencias intencionales hay vs. el specimen (e.g., "el target usa Inter en vez de SF Pro porque está en Linux").

---

## Caveats documentados

- **SF Pro y SF Symbols no se redistribuyen**. El bundle usa fallback chain `-apple-system` para tipo y Lucide CDN para iconografía. Para mocks pixel-perfect en hardware no-Apple, el usuario debe descargar SF Pro desde <https://developer.apple.com/fonts/> y dropear los `.otf`/`.woff2` en una carpeta `fonts/` del target, con `@font-face` matching en `colors_and_type.css`.
- **Wallpapers de `assets/`**: solo para mocks/preview. Producción requiere asset propio.
- **El Figma pseudocode tenía artefactos de resolución** (algunos accent slots mostraban red repetido). Donde el pseudocode se contradecía, este bundle cross-checkeó contra screenshots Figma renderizados + valores publicados de Apple System Colors y eligió los valores publicados. Caveat documentado en `README.md` sección "Caveats".
- **macOS 12 vs macOS 26**: este bundle es **macOS 26 específicamente**. macOS 12 (Monterey) tiene radius más cuadrado (10pt window), glass menos pronunciado, paleta similar pero materials con menos blur. No mezclar specimens entre eras.

---

## Cross-references con skills hermanas

- `frontend-design` (Praxis canónica) — consume este bundle como input cuando el brief del proyecto pide "look macOS". El agente combina: jerarquía visual + microinteracciones de `frontend-design` + tokens y specimens de este DS.
- `pwa-mobile` (Praxis canónica) — los iconos PWA generados deben respetar el squircle 22% del DS si el target apunta a sensación Apple desktop-PWA híbrida.
- `image-kit` / `image-generation` — pueden generar wallpapers propios siguiendo las reglas de "Imagery" del README.md sección "Visual foundations".

---

## Aprendizajes propagables

Sección append-only. Cuando se descubra un drift entre el bundle y un target real, anotar el fix aquí con formato `[YYYY-MM-DD]: contexto → fix → aplicar en`.

*Vacío hasta primer uso productivo.*

---

*Bundle versión: macOS 26 (Community).fig — 38 pages, 129 frames, ~13k nodes. Fuente: Apple Design Resources Figma Community.*
