#!/usr/bin/env bash
set -euo pipefail

export PATH="$HOME/.local/bin:$PATH"
LOG="$HOME/.cache/mcp-setup.log"
mkdir -p "$(dirname "$LOG")"

add_if_missing () {
  local name="$1"; shift
  if claude mcp list 2>/dev/null | grep -qi "^${name}:"; then
    echo "[$(date -Is)] ${name}: already added" >>"$LOG"
  else
    echo "[$(date -Is)] ${name}: adding..." >>"$LOG"
    (claude mcp add "$name" -- "$@") >>"$LOG" 2>&1 || echo "[$(date -Is)] ${name}: failed (see log)" >>"$LOG"
  fi
}

add_if_missing "context7"   npx -y @upstash/context7-mcp
add_if_missing "playwright" npx @playwright/mcp@latest
add_if_missing "serena"     uvx --from git+https://github.com/oraios/serena serena-mcp-server --context claude-code --project /workspaces/todo
