curl -fsSL https://claude.ai/install.sh | bash

sudo apt install gh

gh auth login

claude mcp add context7 -- npx -y @upstash/context7-mcp

#Playwright
claude mcp add Playwright npx @Playwright/mcp@latest

#Serena
#uvxコマンドを使えるようにする
curl -LsSf https://astral.sh/uv/install.sh | sh
#リモートリポジトリを使って実行する場合
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project /workspaces/todo


