#!/usr/bin/env node
/**
 * macOS 26 Design System — installer
 *
 * Drops the bundle into <agent-folder>/skills/macos-26-design/
 * Auto-detects .claude/, .agents/, .gemini/ — or accepts --target=<dir>.
 *
 * Zero runtime deps. Node 20+.
 */

import { existsSync, mkdirSync, readdirSync, cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, isAbsolute } from 'node:path';
import { homedir } from 'node:os';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGE_ROOT = resolve(__dirname, '..');
const BUNDLE_SRC = join(PACKAGE_ROOT, 'bundle');
const SKILL_NAME = 'macos-26-design';
const DESIGN_SYSTEM_NAME = 'macos-26-design-system';

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};
const stdoutIsTTY = process.stdout.isTTY;
const c = (color, str) => (stdoutIsTTY ? `${C[color]}${str}${C.reset}` : str);

// ──────────────────────────────────────────────────────────────────────────
// Args
// ──────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const flags = {
  target: null,
  global: false,
  force: false,
  dryRun: false,
  withDesignSystem: false,
  skillOnly: false,
  help: false,
  version: false,
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--help' || arg === '-h') flags.help = true;
  else if (arg === '--version' || arg === '-V') flags.version = true;
  else if (arg === '--global' || arg === '-g') flags.global = true;
  else if (arg === '--force' || arg === '-f') flags.force = true;
  else if (arg === '--dry-run') flags.dryRun = true;
  else if (arg === '--with-design-system') flags.withDesignSystem = true;
  else if (arg === '--skill-only') flags.skillOnly = true;
  else if (arg.startsWith('--target=')) flags.target = arg.slice('--target='.length);
  else if (arg === '--target' && args[i + 1]) flags.target = args[++i];
  else if (arg === 'install' || arg === 'init' || arg === 'i') {
    /* default action */
  } else {
    console.error(c('red', `✗ Unknown argument: ${arg}`));
    console.error(`  Run ${c('cyan', 'npx macos-26-design --help')} for usage.`);
    process.exit(1);
  }
}

if (flags.version) {
  const pkg = JSON.parse(
    await import('node:fs').then((m) => m.promises.readFile(join(PACKAGE_ROOT, 'package.json'), 'utf8')),
  );
  console.log(pkg.version);
  process.exit(0);
}

if (flags.help) {
  printHelp();
  process.exit(0);
}

// ──────────────────────────────────────────────────────────────────────────
// Resolve target
// ──────────────────────────────────────────────────────────────────────────

function detectTarget() {
  if (flags.global) return join(homedir(), '.claude');
  const cwd = process.cwd();
  for (const candidate of ['.claude', '.agents', '.gemini']) {
    if (existsSync(join(cwd, candidate))) return join(cwd, candidate);
  }
  return join(cwd, '.claude');
}

let targetBase;
if (flags.target) {
  targetBase = isAbsolute(flags.target) ? flags.target : resolve(process.cwd(), flags.target);
} else {
  targetBase = detectTarget();
}

const skillDir = join(targetBase, 'skills', SKILL_NAME);
const designSystemDir = join(targetBase, 'design-systems', DESIGN_SYSTEM_NAME);

// ──────────────────────────────────────────────────────────────────────────
// Validate
// ──────────────────────────────────────────────────────────────────────────

if (!existsSync(BUNDLE_SRC)) {
  console.error(c('red', `✗ Bundle source not found at ${BUNDLE_SRC}.`));
  console.error('  This is a packaging bug. Please file an issue.');
  process.exit(1);
}

const targetExisted = existsSync(targetBase);
const skillExists = existsSync(skillDir);
const dsExists = existsSync(designSystemDir);

if (skillExists && !flags.force) {
  console.error(c('red', `✗ ${skillDir} already exists.`));
  console.error(`  Use ${c('cyan', '--force')} to overwrite, or ${c('cyan', '--dry-run')} to inspect first.`);
  process.exit(1);
}

// ──────────────────────────────────────────────────────────────────────────
// Install
// ──────────────────────────────────────────────────────────────────────────

console.log();
console.log(c('bold', '  macOS 26 Design System') + c('dim', ' — installer'));
console.log();

if (!targetExisted) {
  console.log(`  ${c('yellow', '⚠')}  ${targetBase} did not exist — creating it.`);
  console.log(`     If this is not the right project root, abort with Ctrl-C and re-run with ${c('cyan', '--target=<dir>')}.`);
  console.log();
}

const willInstallDS = flags.withDesignSystem && !flags.skillOnly;

console.log(`  Source:   ${c('dim', BUNDLE_SRC)}`);
console.log(`  Target:   ${c('cyan', skillDir)}`);
if (willInstallDS) {
  console.log(`  +bundle:  ${c('cyan', designSystemDir)} ${c('dim', '(--with-design-system)')}`);
}
console.log();

if (flags.dryRun) {
  console.log(c('yellow', '  (dry-run) no changes made.'));
  console.log();
  console.log(`  Would copy ${countFiles(BUNDLE_SRC)} files.`);
  process.exit(0);
}

try {
  mkdirSync(join(targetBase, 'skills'), { recursive: true });
  cpSync(BUNDLE_SRC, skillDir, { recursive: true, force: flags.force });

  if (willInstallDS) {
    if (dsExists && !flags.force) {
      console.log(c('yellow', `  ⚠  ${designSystemDir} already exists; skipping (use --force to overwrite).`));
    } else {
      mkdirSync(join(targetBase, 'design-systems'), { recursive: true });
      cpSync(BUNDLE_SRC, designSystemDir, { recursive: true, force: flags.force });
    }
  }
} catch (err) {
  console.error(c('red', `\n✗ Install failed: ${err.message}`));
  if (err.code === 'EACCES' || err.code === 'EPERM') {
    console.error('  Permission denied. Check folder permissions or try a different --target.');
  }
  process.exit(1);
}

const fileCount = countFiles(skillDir);

// ──────────────────────────────────────────────────────────────────────────
// Success
// ──────────────────────────────────────────────────────────────────────────

console.log(c('green', `  ✓ Installed ${fileCount} files.`));
console.log();
console.log(c('bold', '  What you got'));
console.log(`    • SKILL.md + README (≤500 lines, voz Praxis + 7 triggers)`);
console.log(`    • colors_and_type.css — tokens calibrados contra Figma`);
console.log(`    • 53 HTML specimens (foundations · controls · surfaces · patterns)`);
console.log(`    • 4 Apple wallpapers + cover (mocks only — see LICENSE)`);
console.log(`    • 4 eval scenarios para medir skill behavior`);
console.log();
console.log(c('bold', '  How to use'));
console.log(`    Auto-trigger: menciona ${c('cyan', '"look macOS"')}, ${c('cyan', '"Liquid Glass"')}, ${c('cyan', '"sidebar Finder"')},`);
console.log(`                  ${c('cyan', '"app nativa Mac"')}, ${c('cyan', '"traffic lights"')}, ${c('cyan', '"System Settings style"')}.`);
console.log(`    Manual:       ${c('cyan', '/macos-26-design')}`);
console.log();
console.log(c('bold', '  Next'));
console.log(`    1. Reinicia tu agente (Claude Code, Cursor, Gemini CLI) para que descubra la skill.`);
console.log(`    2. Pide: ${c('cyan', '"Quiero un sidebar Liquid Glass para mi app, estilo macOS 26."')}`);
console.log();
console.log(c('dim', '  Repo: https://github.com/juanlara-aidev/macos-26-design'));
console.log();

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

function countFiles(dir) {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) n += countFiles(join(dir, entry.name));
    else n++;
  }
  return n;
}

function printHelp() {
  console.log(`
${c('bold', 'macOS 26 Design System')} — installer

${c('bold', 'Usage')}
  ${c('cyan', 'npx github:juanlara-aidev/macos-26-design')} [install] [options]
  ${c('cyan', 'npx macos-26-design')} [install] [options]   ${c('dim', '(after npm publish)')}

${c('bold', 'What it does')}
  Copies the design-system bundle into ${c('cyan', '<agent-folder>/skills/macos-26-design/')}.
  Auto-detects ${c('cyan', '.claude/')}, ${c('cyan', '.agents/')}, ${c('cyan', '.gemini/')} in the current project.
  Falls back to creating ${c('cyan', '.claude/')} if no agent folder exists.

${c('bold', 'Options')}
  ${c('cyan', '--target=<dir>')}          Pick the agent folder explicitly (e.g. .claude, .agents, .gemini).
  ${c('cyan', '--global, -g')}            Install user-global at ~/.claude/skills/ (every project gets it).
  ${c('cyan', '--with-design-system')}    Also copy the bundle to <target>/design-systems/macos-26-design-system/
                          (AIOS / Praxis convention; default is skill-only).
  ${c('cyan', '--skill-only')}            Force skill-only even if --with-design-system is set.
  ${c('cyan', '--force, -f')}             Overwrite existing install.
  ${c('cyan', '--dry-run')}               Show what would happen, change nothing.
  ${c('cyan', '--version, -V')}           Print version.
  ${c('cyan', '--help, -h')}              Show this help.

${c('bold', 'Examples')}
  ${c('dim', '# Default — auto-detect, install to project')}
  npx github:juanlara-aidev/macos-26-design

  ${c('dim', '# Pick the agent folder explicitly')}
  npx github:juanlara-aidev/macos-26-design --target=.agents

  ${c('dim', '# Install user-global (available everywhere)')}
  npx github:juanlara-aidev/macos-26-design --global

  ${c('dim', '# AIOS / Praxis convention — skill + design-system folders')}
  npx github:juanlara-aidev/macos-26-design --with-design-system

  ${c('dim', '# Preview before doing anything')}
  npx github:juanlara-aidev/macos-26-design --dry-run

${c('bold', 'Repo')}      https://github.com/juanlara-aidev/macos-26-design
${c('bold', 'License')}   MIT (see LICENSE for Apple IP attribution caveats)
`);
}
