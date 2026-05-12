# macOS 26 Design System

> Drop-in **Agent Skill** for [Claude Code](https://code.claude.com), Cursor, Gemini CLI and any [Anthropic Agent Skills 2.0](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)–compatible tool. The full *Liquid Glass* era of macOS — tokens, 53 component specimens, wallpapers and voice rules — in **one command**.

```bash
npx github:juanlara-aidev/macos-26-design
```

That's it. The skill lands in `.claude/skills/macos-26-design/` (or `.agents/skills/`, `.gemini/skills/`, auto-detected). Restart your agent. Mention *"look macOS"* or *"Liquid Glass"* and watch it pick up the specimens and tokens on its own.

---

## What you get

- **SF Pro typography stack** + opacity-based label hierarchy (no separate gray ramps).
- **Liquid Glass materials** — thin / regular / thick × light / dark. Verified against Apple's official Figma file.
- **System accent palette** (vibrant + opaque) — 8-color rotation, blue default.
- **The 26 pt window radius** — macOS 26's signature silhouette vs. the 10 pt of previous releases.
- **53 self-contained HTML specimens** — one per foundation, control, surface, and pattern.
- **4 Apple wallpapers + cover** to test Liquid Glass against varied backdrops.
- **SF Symbols → Lucide mapping** for non-Apple targets.
- **Voice & copy rules** — Title Case, ellipsis policy, no emoji in chrome.
- **4 eval scenarios** for measuring skill behavior in real tasks.

Everything is **technology-agnostic**: tokens are CSS custom properties, components are plain HTML. Recreate them in React, Vue, Svelte, SwiftUI, vanilla, whatever the target codebase uses.

---

## Install

### One-line install (any project, any agent)

```bash
npx github:juanlara-aidev/macos-26-design
```

Auto-detects `.claude/`, `.agents/`, or `.gemini/` in the current directory and installs to `<that>/skills/macos-26-design/`.

### Pick the target explicitly

```bash
npx github:juanlara-aidev/macos-26-design --target=.claude
npx github:juanlara-aidev/macos-26-design --target=.agents
npx github:juanlara-aidev/macos-26-design --target=.gemini
```

### User-global (available in every project)

```bash
npx github:juanlara-aidev/macos-26-design --global
```

Installs once to `~/.claude/skills/macos-26-design/`. Every Claude Code project on your machine picks it up automatically.

### AIOS / Praxis convention (skill + design-system folders)

```bash
npx github:juanlara-aidev/macos-26-design --with-design-system
```

Also copies the bundle to `.claude/design-systems/macos-26-design-system/`. Useful if your project follows the AIOS convention where `frontend-design` and similar skills consume design-system bundles from there.

### Preview before doing anything

```bash
npx github:juanlara-aidev/macos-26-design --dry-run
```

### Full flag reference

| Flag | Effect |
|---|---|
| `--target=<dir>` | Pick the agent folder explicitly (relative or absolute). |
| `--global`, `-g` | Install user-global at `~/.claude/skills/`. |
| `--with-design-system` | Also copy to `<target>/design-systems/macos-26-design-system/`. |
| `--skill-only` | Override `--with-design-system`. |
| `--force`, `-f` | Overwrite existing install. |
| `--dry-run` | Show what would happen, change nothing. |
| `--version`, `-V` | Print version. |
| `--help`, `-h` | Show all options. |

---

## How it works

The skill follows the [**Anthropic Agent Skills 2.0**](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) spec with **progressive disclosure**:

| Level | When loaded | Cost | Content |
|---|---|---|---|
| 1 — Metadata | Always (at startup) | ~100 tokens | YAML frontmatter (`name` + `description`). Triggers auto-activation. |
| 2 — Instructions | When the skill is triggered | ~3.5 k tokens | `SKILL.md` body: 12 hard rules, navigation recipe, expected output, voice & iconography. |
| 3 — Resources | Only as needed | effectively unlimited | 53 `preview/*.html` specimens, `colors_and_type.css`, `README.md` (deep theory), `evals/evals.json`. |

The skill auto-activates when your agent detects any of these triggers:

> look macOS · Liquid Glass · sidebar Finder · app nativa Mac · ventana con traffic lights · System Settings style · toolbar floating · dock translúcido · chrome de Finder/Mail/Notes · macOS 26 · Apple desktop

Manual invocation in Claude Code: `/macos-26-design`.

---

## Compatibility

| Agent | Status | Install target |
|---|---|---|
| **Claude Code** (CLI + IDE) | Tested | `.claude/skills/macos-26-design/` |
| **claude.ai** (web) | Manual upload | Upload bundle as Custom Skill via Settings → Features |
| **Cursor** | Manual reference | Reference from `.cursorrules` or `.cursor/rules/` |
| **Gemini CLI** | Per Agent Skills open standard | `.gemini/skills/macos-26-design/` |
| **OpenAI Codex CLI / Cline / Aider** | Per open standard | `.agents/skills/macos-26-design/` |
| **Custom agent** | Filesystem bundle | Any path with `SKILL.md` discoverable |

Any agent reading `SKILL.md` with YAML frontmatter from `<skills-folder>/<skill-name>/SKILL.md` will work. That's the **Agent Skills Open Standard** — Anthropic's spec, adopted across 30+ tools as of 2026.

---

## What's inside the bundle

```
bundle/
├── SKILL.md                # Entry point — frontmatter, triggers, 12 hard rules, navigation, output (≤500 lines, Praxis voice)
├── README.md               # Deep design theory — foundations, voice, iconography, caveats (414 lines, with TOC)
├── colors_and_type.css     # Canonical CSS tokens calibrated against the Figma file
├── preview/                # 53 self-contained HTML specimens
│   ├── buttons.html · text-fields.html · segmented-controls.html · …
│   ├── sidebars.html · toolbars.html · window.html · titlebar-window.html · …
│   ├── popovers.html · alerts.html · sheets.html · dialog.html · menu.html · …
│   └── materials.html · shadows.html · motion.html · spacing.html · layout.html · …
├── assets/                 # 4 wallpapers + cover (mocks only — see LICENSE)
├── evals/evals.json        # 4 eval scenarios for measuring skill behavior
└── macOS 26 Showcase.html  # Catalog view of every specimen on one page
```

68 files total. Zero runtime dependencies. The skill is pure markdown + HTML + CSS.

---

## Source

Built from Apple's official **macOS 26 (Community).fig** in the Apple Design Resources Figma Community — 38 pages, 129 frames, ~13 k nodes. Wrapped as an Agent Skill via [**Claude Design**](https://claude.ai/design)'s handoff format.

Where the Figma pseudocode contained resolution artefacts, values were cross-checked against the rendered Figma screenshots and Apple's published system color values. Caveats documented inside `bundle/SKILL.md` and `bundle/README.md`.

---

## Caveats — read before shipping

- **SF Pro and SF Symbols are not redistributable.** The bundle uses the `-apple-system` fallback chain for type and **Lucide** as the icon substitute. On Apple hardware, real SF Pro renders natively. To bundle SF Pro on non-Apple targets, download from [developer.apple.com/fonts](https://developer.apple.com/fonts/) and add `@font-face` declarations to `colors_and_type.css`.
- **The 4 wallpapers in `assets/`** are Apple's. Use them for mocks and design exploration only. For production, ship your own asset matching the design rules in `SKILL.md` § Imagery.
- **macOS 26 ≠ previous macOS releases.** Window radii (26 pt vs. 10 pt), glass density, and motion differ. Don't mix specimens between eras.

---

## License

- **Code** (`bin/`, `package.json`): MIT — see [LICENSE](LICENSE).
- **Tokens** (`bundle/colors_and_type.css`): CC0 — calibrated values from a public Figma file, not copyrightable individually.
- **Specimens** (`bundle/preview/*.html`, `bundle/SKILL.md`, `bundle/README.md`): MIT.
- **Wallpapers** (`bundle/assets/wallpaper-*.png`, `bundle/assets/cover-bg.png`): **Apple Inc.** Used for design preview/mocks under fair use. **Not redistributable in shipped products** — replace before publishing an app.
- **SF Pro / SF Symbols**: Apple Inc. Referenced via fallback chain (SF Pro) and Lucide substitution (SF Symbols). Not bundled.

---

## Contributing

Issues and pull requests welcome. If you find drift between this bundle and a real macOS 26 build (e.g. Apple ships a new specimen via Figma update), open an issue with a screenshot and the affected token.

---

## Built with

- **Claude Design** — [claude.ai/design](https://claude.ai/design)
- **Anthropic Agent Skills 2.0** — [platform.claude.com/docs/en/agents-and-tools/agent-skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- **Praxis (AIOS)** voice conventions — Spanish, third-person, imperative, no decorative emoji
