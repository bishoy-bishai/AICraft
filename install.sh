#!/usr/bin/env bash
# ==============================================================================
# AICraft - AI Engineering Discipline Installer
# Supports: Antigravity, Claude Code, Cursor, Windsurf, OpenAI Codex, and standalone
# ==============================================================================

set -e

REPO_URL="https://github.com/bishoy-bishai/AICraft.git"
RAW_BASE_URL="https://raw.githubusercontent.com/bishoy-bishai/AICraft/main"
TARGET="${1:-auto}"

echo "========================================================="
echo "   AICraft - AI Engineering Discipline Installer"
echo "   Understand first. Build second."
echo "========================================================="

TMP_DIR="$(mktemp -d /tmp/aicraft-install.XXXXXX)"
cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "📥 Fetching latest AICraft skill bundle..."
git clone --depth 1 --filter=blob:none --sparse "$REPO_URL" "$TMP_DIR/aicraft-repo" >/dev/null 2>&1 || {
    echo "⚠️ Git sparse clone failed, attempting full shallow clone..."
    git clone --depth 1 "$REPO_URL" "$TMP_DIR/aicraft-repo" >/dev/null 2>&1
}

if [ -d "$TMP_DIR/aicraft-repo/skill" ]; then
    SKILL_SRC="$TMP_DIR/aicraft-repo/skill"
else
    cd "$TMP_DIR/aicraft-repo"
    git sparse-checkout set skill >/dev/null 2>&1 || true
    SKILL_SRC="$TMP_DIR/aicraft-repo/skill"
fi

install_antigravity() {
    echo "⚡ Installing for Antigravity..."
    # 1. Project workspace location
    if [ -d ".git" ] || [ -f "package.json" ] || [ -d ".agents" ]; then
        mkdir -p .agents/skills/aicraft
        cp -R "$SKILL_SRC/"* .agents/skills/aicraft/
        echo "   ✓ Installed to workspace: .agents/skills/aicraft/"
    fi
    # 2. Global user location
    mkdir -p "$HOME/.gemini/config/skills/aicraft"
    cp -R "$SKILL_SRC/"* "$HOME/.gemini/config/skills/aicraft/"
    echo "   ✓ Installed to global config: ~/.gemini/config/skills/aicraft/"
}

install_claude_code() {
    echo "⚡ Installing for Claude Code..."
    mkdir -p "$HOME/.claude/skills/aicraft"
    cp -R "$SKILL_SRC/"* "$HOME/.claude/skills/aicraft/"
    echo "   ✓ Installed to ~/.claude/skills/aicraft/"
    echo "   👉 Use in Claude Code with: /aicraft"
}

install_codex() {
    echo "⚡ Installing for Codex / AGENTS.md..."
    mkdir -p "$HOME/.codex"
    echo "" >> "$HOME/.codex/AGENTS.md"
    echo "# --- AICraft Discipline ---" >> "$HOME/.codex/AGENTS.md"
    tail -n +5 "$SKILL_SRC/SKILL.md" >> "$HOME/.codex/AGENTS.md"
    [ -f "$SKILL_SRC/constitution.md" ] && cat "$SKILL_SRC/constitution.md" >> "$HOME/.codex/AGENTS.md"
    [ -f "$SKILL_SRC/workflow.md" ] && cat "$SKILL_SRC/workflow.md" >> "$HOME/.codex/AGENTS.md"
    [ -f "$SKILL_SRC/playbook.md" ] && cat "$SKILL_SRC/playbook.md" >> "$HOME/.codex/AGENTS.md"
    [ -d "$SKILL_SRC/skills" ] && cat "$SKILL_SRC/skills/"*.md >> "$HOME/.codex/AGENTS.md"
    echo "   ✓ Appended to ~/.codex/AGENTS.md"
}

install_cursor() {
    echo "⚡ Installing for Cursor..."
    mkdir -p .cursor/rules
    cp "$SKILL_SRC/constitution.md" .cursor/rules/aicraft-constitution.mdc 2>/dev/null || cp "$SKILL_SRC/constitution.md" .cursor/rules/aicraft.md
    cp "$SKILL_SRC/workflow.md" .cursor/rules/aicraft-workflow.md 2>/dev/null || true
    cp "$SKILL_SRC/playbook.md" .cursor/rules/aicraft-playbook.md 2>/dev/null || true
    echo "   ✓ Generated rules in .cursor/rules/"
}

install_windsurf() {
    echo "⚡ Installing for Windsurf..."
    mkdir -p .windsurfrules
    cat "$SKILL_SRC/constitution.md" > .windsurfrules
    echo "" >> .windsurfrules
    cat "$SKILL_SRC/workflow.md" >> .windsurfrules
    echo "   ✓ Configured .windsurfrules"
}

case "$TARGET" in
    antigravity|gemini|agy)
        install_antigravity
        ;;
    claude|claudecode)
        install_claude_code
        ;;
    codex|agents)
        install_codex
        ;;
    cursor)
        install_cursor
        ;;
    windsurf)
        install_windsurf
        ;;
    all)
        install_antigravity
        install_claude_code
        install_codex
        install_cursor
        install_windsurf
        ;;
    auto|*)
        echo "🔍 Auto-detecting environments..."
        installed=0
        if [ -d "$HOME/.claude" ] || command -v claude >/dev/null 2>&1; then
            install_claude_code
            installed=1
        fi
        if [ -d "$HOME/.gemini" ] || [ -d ".agents" ]; then
            install_antigravity
            installed=1
        fi
        if [ -d "$HOME/.codex" ] || [ -f "AGENTS.md" ]; then
            install_codex
            installed=1
        fi
        if [ -d ".cursor" ] || [ -f ".cursorrules" ]; then
            install_cursor
            installed=1
        fi
        if [ -f ".windsurfrules" ]; then
            install_windsurf
            installed=1
        fi

        # If nothing detected, default to Antigravity + Claude Code + Codex
        if [ "$installed" -eq 0 ]; then
            echo "ℹ️ No specific agent directory detected. Installing standard bundle..."
            install_antigravity
            install_claude_code
            install_codex
        fi
        ;;
esac

echo ""
echo "✅ AICraft installation completed successfully!"
echo "📘 Core Principles Active: Understand first. Build second."
