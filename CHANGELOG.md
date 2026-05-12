# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Versionado [SemVer](https://semver.org/lang/es/).

## [0.1.1] — 2026-05-12

### Removidos

- Flag `--with-design-system` y `--skill-only`. La skill se instala en una sola ubicación canónica: `<carpeta-agente>/skills/macos-26-design/`.

### Cambios

- README, CHANGELOG, CONTRIBUTING y mensajes del CLI traducidos a español y simplificados.
- `bundle/SKILL.md`: eliminadas las cross-references a otras skills específicas (no aplican fuera del repo origen).
- `bundle/evals/evals.json`: terminología neutralizada (`usuario` en vez de términos específicos del repo origen).

### Agregados

- Screenshots hero en `docs/` (`hero-window-light.png`, `hero-window-dark.png`, `showcase-light.png`).
- `CONTRIBUTING.md`.

## [0.1.0] — 2026-05-11

- Release inicial.
- Bundle de 68 archivos: `SKILL.md`, `README.md` (con TOC), `colors_and_type.css`, 53 specimens HTML, 4 wallpapers Apple + cover, `evals/evals.json` (4 escenarios), `macOS 26 Showcase.html`.
- CLI `bin/install.mjs` zero-deps en Node 20+. Auto-detect `.claude/.agents/.gemini/`. Flags `--target`, `--global`, `--force`, `--dry-run`.
- Instalable vía `npx github:juanlara-aidev/macos-26-design`.
- LICENSE MIT con atribución a Apple (SF Pro, SF Symbols, wallpapers) y Lucide.

[0.1.1]: https://github.com/juanlara-aidev/macos-26-design/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/juanlara-aidev/macos-26-design/releases/tag/v0.1.0
