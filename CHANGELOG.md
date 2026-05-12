# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Versionado [SemVer](https://semver.org/lang/es/).

## [0.1.2] — 2026-05-12

### Removidos (limpieza legal para OSS-friendly)

- **`bundle/assets/` eliminado entero** (9 PNGs propiedad de Apple):
  - `cover-bg.png`
  - `wallpaper-aurora.png`, `wallpaper-sequoia.png`, `wallpaper-ventura.png`, `wallpaper-monterey.png`
  - 4 thumbnails de los wallpapers anteriores
- Removida la atribución a wallpapers Apple en LICENSE (ya no aplica).

### Cambios

- Nueva variable CSS `--demo-backdrop` en `colors_and_type.css` — mesh gradient procedural (CC0) que reemplaza a los wallpapers como backdrop para previsualizar Liquid Glass.
- 4 specimens actualizados para usar `var(--demo-backdrop)` en lugar de imágenes: `materials.html`, `titlebar-window.html`, `inspector-sidebar.html`, `monobar-window.html`.
- `preview/wallpapers.html` reescrito con 4 mesh gradients alternativos (Aurora, Dawn, Ocean, Forest) — todos CC0.
- `showcase.html`: wallpaper picker convertido a gradient picker (mismos nombres, gradientes procedurales).
- `bundle/macOS 26 Showcase.html` renombrado a `bundle/showcase.html` (URL limpia para GitHub Pages).
- README raíz: agregado link al demo interactivo servido vía GitHub Pages.
- CLI install message: removida mención a "4 wallpapers Apple".
- LICENSE simplificado: solo refs textuales a SF Pro y SF Symbols (no bundleados).

### Agregados

- **GitHub Pages habilitado**: el showcase ahora es accesible en `https://juanlara-aidev.github.io/macos-26-design/bundle/showcase.html` para demo interactivo.

## [0.1.1] — 2026-05-12

### Removidos

- Flag `--with-design-system` y `--skill-only`. La skill se instala en una sola ubicación canónica: `<carpeta-agente>/skills/macos-26-design/`.

### Cambios

- README, CHANGELOG, CONTRIBUTING y mensajes del CLI traducidos a español y simplificados.
- `bundle/SKILL.md`: eliminadas las cross-references a otras skills específicas.
- `bundle/evals/evals.json`: terminología neutralizada.

### Agregados

- Screenshots hero en `docs/`.
- `CONTRIBUTING.md`.

## [0.1.0] — 2026-05-11

- Release inicial.
- Bundle: SKILL.md, README.md (con TOC), colors_and_type.css, 53 specimens HTML, `evals/evals.json` (4 escenarios), `macOS 26 Showcase.html`.
- CLI `bin/install.mjs` zero-deps en Node 20+. Auto-detect `.claude/.agents/.gemini/`. Flags `--target`, `--global`, `--force`, `--dry-run`.
- Instalable vía `npx github:juanlara-aidev/macos-26-design`.
- LICENSE MIT con atribución a Apple (SF Pro, SF Symbols, wallpapers) y Lucide.

[0.1.2]: https://github.com/juanlara-aidev/macos-26-design/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/juanlara-aidev/macos-26-design/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/juanlara-aidev/macos-26-design/releases/tag/v0.1.0
