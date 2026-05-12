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
  else if (arg.startsWith('--target=')) flags.target = arg.slice('--target='.length);
  else if (arg === '--target' && args[i + 1]) flags.target = args[++i];
  else if (arg === 'install' || arg === 'init' || arg === 'i') {
    /* default action */
  } else {
    console.error(c('red', `✗ Argumento desconocido: ${arg}`));
    console.error(`  Corre ${c('cyan', 'npx macos-26-design --help')} para ver las opciones.`);
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

// ──────────────────────────────────────────────────────────────────────────
// Validate
// ──────────────────────────────────────────────────────────────────────────

if (!existsSync(BUNDLE_SRC)) {
  console.error(c('red', `✗ No encontré el bundle en ${BUNDLE_SRC}.`));
  console.error('  Es un bug del paquete. Por favor abre un issue.');
  process.exit(1);
}

const targetExisted = existsSync(targetBase);
const skillExists = existsSync(skillDir);

if (skillExists && !flags.force) {
  console.error(c('red', `✗ ${skillDir} ya existe.`));
  console.error(`  Usa ${c('cyan', '--force')} para sobrescribir, o ${c('cyan', '--dry-run')} para ver primero qué pasaría.`);
  process.exit(1);
}

// ──────────────────────────────────────────────────────────────────────────
// Install
// ──────────────────────────────────────────────────────────────────────────

console.log();
console.log(c('bold', '  macOS 26 Design System') + c('dim', ' — installer'));
console.log();

if (!targetExisted) {
  console.log(`  ${c('yellow', '⚠')}  ${targetBase} no existía — lo creo.`);
  console.log(`     Si esta no es la raíz correcta del proyecto, aborta con Ctrl-C y corre de nuevo con ${c('cyan', '--target=<dir>')}.`);
  console.log();
}

console.log(`  Origen:  ${c('dim', BUNDLE_SRC)}`);
console.log(`  Destino: ${c('cyan', skillDir)}`);
console.log();

if (flags.dryRun) {
  console.log(c('yellow', '  (dry-run) no se hicieron cambios.'));
  console.log();
  console.log(`  Copiaría ${countFiles(BUNDLE_SRC)} archivos.`);
  process.exit(0);
}

try {
  mkdirSync(join(targetBase, 'skills'), { recursive: true });
  cpSync(BUNDLE_SRC, skillDir, { recursive: true, force: flags.force });
} catch (err) {
  console.error(c('red', `\n✗ Falló la instalación: ${err.message}`));
  if (err.code === 'EACCES' || err.code === 'EPERM') {
    console.error('  Permiso denegado. Revisa permisos de la carpeta o usa otra ruta con --target.');
  }
  process.exit(1);
}

const fileCount = countFiles(skillDir);

// ──────────────────────────────────────────────────────────────────────────
// Success
// ──────────────────────────────────────────────────────────────────────────

console.log(c('green', `  ✓ Instalados ${fileCount} archivos.`));
console.log();
console.log(c('bold', '  Qué incluye'));
console.log(`    • SKILL.md + README (tokens, reglas y navegación del bundle)`);
console.log(`    • colors_and_type.css — tokens calibrados contra el Figma oficial`);
console.log(`    • 53 specimens HTML (foundations · controls · surfaces · patterns)`);
console.log(`    • Mesh gradient procedural como demo backdrop (sin assets de Apple)`);
console.log(`    • 4 escenarios de eval para medir el comportamiento de la skill`);
console.log();
console.log(c('bold', '  Cómo usarla'));
console.log(`    Auto-trigger: menciona ${c('cyan', '"look macOS"')}, ${c('cyan', '"Liquid Glass"')}, ${c('cyan', '"sidebar Finder"')},`);
console.log(`                  ${c('cyan', '"app nativa Mac"')}, ${c('cyan', '"traffic lights"')}, ${c('cyan', '"System Settings style"')}.`);
console.log(`    Manual:       ${c('cyan', '/macos-26-design')}`);
console.log();
console.log(c('bold', '  Siguiente'));
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

${c('bold', 'Uso')}
  ${c('cyan', 'npx github:juanlara-aidev/macos-26-design')} [install] [opciones]
  ${c('cyan', 'npx macos-26-design')} [install] [opciones]   ${c('dim', '(tras npm publish)')}

${c('bold', 'Qué hace')}
  Copia el bundle del design system a ${c('cyan', '<carpeta-agente>/skills/macos-26-design/')}.
  Auto-detecta ${c('cyan', '.claude/')}, ${c('cyan', '.agents/')} o ${c('cyan', '.gemini/')} en el proyecto actual.
  Si no encuentra ninguna, crea ${c('cyan', '.claude/')} por defecto.

${c('bold', 'Opciones')}
  ${c('cyan', '--target=<dir>')}    Carpeta del agente explícita (.claude, .agents, .gemini o ruta custom).
  ${c('cyan', '--global, -g')}      Instala user-global en ~/.claude/skills/ (todos los proyectos).
  ${c('cyan', '--force, -f')}       Sobrescribe si ya existe.
  ${c('cyan', '--dry-run')}         Solo muestra qué pasaría, sin tocar nada.
  ${c('cyan', '--version, -V')}     Imprime la versión.
  ${c('cyan', '--help, -h')}        Muestra esta ayuda.

${c('bold', 'Ejemplos')}
  ${c('dim', '# Default — auto-detect, instala en el proyecto')}
  npx github:juanlara-aidev/macos-26-design

  ${c('dim', '# Forzar carpeta explícita')}
  npx github:juanlara-aidev/macos-26-design --target=.agents

  ${c('dim', '# Instalación global (disponible en todos los proyectos)')}
  npx github:juanlara-aidev/macos-26-design --global

  ${c('dim', '# Preview sin hacer nada')}
  npx github:juanlara-aidev/macos-26-design --dry-run

${c('bold', 'Repo')}      https://github.com/juanlara-aidev/macos-26-design
${c('bold', 'Licencia')}  MIT (ver LICENSE para atribución de Apple IP)
`);
}
