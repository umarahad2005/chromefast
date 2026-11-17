#!/usr/bin/env sh
# ChromeFast installer (macOS / Linux / Git Bash).
# Usage:
#   sh install/install.sh claude          # user-level Claude Code skill + agents + commands
#   sh install/install.sh codex  <project> # append rules to <project>/AGENTS.md
#   sh install/install.sh cursor <project> # add .cursor/rules/chromefast.mdc to <project>
# Existing files are backed up to *.bak before being replaced.
set -eu

ROOT=$(cd "$(dirname "$0")/.." && pwd)
TARGET=${1:-claude}
PROJECT=${2:-.}

backup_copy() { # src dst
  if [ -e "$2" ]; then cp -R "$2" "$2.bak"; echo "backup: $2.bak"; fi
  mkdir -p "$(dirname "$2")"
  cp -R "$1" "$2"
  echo "installed: $2"
}

case "$TARGET" in
  claude)
    CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
    backup_copy "$ROOT/skills/chromefast" "$CLAUDE_DIR/skills/chromefast"
    for f in "$ROOT"/agents/*.md; do backup_copy "$f" "$CLAUDE_DIR/agents/$(basename "$f")"; done
    mkdir -p "$CLAUDE_DIR/commands/chromefast"
    for f in "$ROOT"/commands/*.md; do backup_copy "$f" "$CLAUDE_DIR/commands/chromefast/$(basename "$f")"; done
    echo "Done. Restart Claude Code; try: /chromefast:read <url> <what>"
    ;;
  codex|agents|antigravity|windsurf|gemini)
    DST="$PROJECT/AGENTS.md"
    if [ -e "$DST" ] && grep -q "ChromeFast rules" "$DST"; then echo "already present in $DST"; exit 0; fi
    [ -e "$DST" ] && cp "$DST" "$DST.bak"
    { [ -e "$DST" ] && printf '\n\n'; cat "$ROOT/rules/chromefast-rules.md"; } >> "$DST"
    echo "appended rules to $DST"
    ;;
  cursor)
    backup_copy "$ROOT/.cursor/rules/chromefast.mdc" "$PROJECT/.cursor/rules/chromefast.mdc"
    ;;
  *)
    echo "unknown target: $TARGET (use claude | codex | cursor)"; exit 1 ;;
esac
