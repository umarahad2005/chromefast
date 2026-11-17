#!/usr/bin/env node
// ChromeFast installer CLI — copies the skill, agents, commands and rules into your AI agent's config.
// Usage:
//   npx chromefast install claude            # ~/.claude (skill + agents + /chromefast:* commands)
//   npx chromefast install codex [dir]       # appends rules to <dir>/AGENTS.md (also Antigravity, Windsurf, Gemini CLI)
//   npx chromefast install cursor [dir]      # adds <dir>/.cursor/rules/chromefast.mdc
//   npx chromefast rules                     # prints the portable rules to stdout
// Existing files are backed up to *.bak before being replaced. No network access, no dependencies.
import { cpSync, existsSync, mkdirSync, readFileSync, appendFileSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [cmd, target, dirArg] = process.argv.slice(2);
const project = resolve(dirArg || '.');
const log = (m) => console.log(m);

function backupCopy(src, dst) {
  if (existsSync(dst)) { cpSync(dst, dst + '.bak', { recursive: true }); log(`backup:    ${dst}.bak`); }
  mkdirSync(dirname(dst), { recursive: true });
  cpSync(src, dst, { recursive: true });
  log(`installed: ${dst}`);
}

function help() {
  log(`ChromeFast — tree-first browser automation for AI agents
Usage:
  npx chromefast install claude          Claude Code (skill, agents, /chromefast:read and /chromefast:do)
  npx chromefast install codex [dir]     Codex / Antigravity / Windsurf / Gemini CLI (AGENTS.md)
  npx chromefast install cursor [dir]    Cursor (.cursor/rules/chromefast.mdc)
  npx chromefast rules                   print the portable rules
Docs: https://github.com/umarahad2005/chromefast`);
}

if (cmd === 'rules') { process.stdout.write(readFileSync(join(ROOT, 'rules/chromefast-rules.md'), 'utf8')); process.exit(0); }
if (cmd !== 'install' || !target) { help(); process.exit(cmd ? 1 : 0); }

switch (target) {
  case 'claude': {
    const c = process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude');
    backupCopy(join(ROOT, 'skills/chromefast'), join(c, 'skills/chromefast'));
    for (const f of readdirSync(join(ROOT, 'agents'))) backupCopy(join(ROOT, 'agents', f), join(c, 'agents', f));
    for (const f of readdirSync(join(ROOT, 'commands'))) backupCopy(join(ROOT, 'commands', f), join(c, 'commands/chromefast', f));
    log('Done. Restart Claude Code, then try: /chromefast:read <page> <what to read>');
    break;
  }
  case 'codex': case 'agents': case 'antigravity': case 'windsurf': case 'gemini': {
    const dst = join(project, 'AGENTS.md');
    const rules = readFileSync(join(ROOT, 'rules/chromefast-rules.md'), 'utf8');
    if (existsSync(dst)) {
      const cur = readFileSync(dst, 'utf8');
      if (cur.includes('ChromeFast rules')) { log(`already present in ${dst}`); break; }
      copyFileSync(dst, dst + '.bak');
      appendFileSync(dst, '\n\n' + rules);
    } else { mkdirSync(project, { recursive: true }); appendFileSync(dst, rules); }
    log(`appended rules to ${dst}`);
    break;
  }
  case 'cursor':
    backupCopy(join(ROOT, '.cursor/rules/chromefast.mdc'), join(project, '.cursor/rules/chromefast.mdc'));
    break;
  default:
    log(`unknown target: ${target}`); help(); process.exit(1);
}
