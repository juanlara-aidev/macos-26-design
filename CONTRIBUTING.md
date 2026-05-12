# Contribuir

Issues y PRs bienvenidos. Esta skill empaqueta un design-system handoff como Agent Skill drop-in.

## Qué reportar

- **Drift contra macOS 26.** Si Apple actualiza el Figma y un token o specimen ya no coincide, abre un issue con screenshot del Figma + el archivo afectado.
- **Bug del installer.** Pasos para reproducir, SO + versión de Node, output de `--dry-run`.
- **Compatibilidad con tu agente.** Si tu agente no descubre la skill tras instalarla, dinos cuál y a qué carpeta la instalaste.
- **Specimens faltantes.** Algún control o superficie que te haría falta.

## Desarrollo local

```bash
git clone https://github.com/juanlara-aidev/macos-26-design.git
cd macos-26-design

# Probar el installer contra un sandbox
mkdir -p /tmp/sandbox/.claude && cd /tmp/sandbox
node /ruta/a/macos-26-design/bin/install.mjs --dry-run
node /ruta/a/macos-26-design/bin/install.mjs

# Inspeccionar lo instalado
ls .claude/skills/macos-26-design/
```

Sin dependencias en runtime. Node 20+. El installer es puro stdlib (`node:fs`, `node:path`, `node:url`, `node:os`).

## Reglas del bundle

1. **`bundle/SKILL.md` ≤ 500 líneas** — best practice del spec Agent Skills 2.0.
2. **`description` del frontmatter ≤ 1024 caracteres** — requerido por el spec. Triggers concretos y específicos.
3. **Specimens `bundle/preview/*.html` self-contained** — cada uno importa `../colors_and_type.css` + `_card.css` y se renderiza standalone. No agregues dependencias entre specimens.

## Validar antes de PR

```bash
# Estructura del bundle
[ "$(wc -l < bundle/SKILL.md)" -le 500 ] && echo "SKILL.md ≤ 500 ✓"
node -e "const j=require('./bundle/evals/evals.json'); if((j.evals||[]).length<3) process.exit(1); console.log('evals ≥ 3 ✓')"

# CLI
node bin/install.mjs --version
node bin/install.mjs --help

# End-to-end en sandbox
TMP=$(mktemp -d) && cd "$TMP" && mkdir .claude
node /ruta/a/macos-26-design/bin/install.mjs --dry-run
node /ruta/a/macos-26-design/bin/install.mjs
[ -f .claude/skills/macos-26-design/SKILL.md ] && echo "install ✓"
```

## Commit messages

Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`. Imperativa, una línea.

## Licencia

Al contribuir aceptas que tu aporte se licencia bajo MIT (ver `LICENSE`). Los assets de Apple (SF Pro, SF Symbols, wallpapers) conservan sus licencias respectivas — no bundlees nada nuevo de Apple más allá de lo ya incluido.
