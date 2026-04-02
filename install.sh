#!/usr/bin/env bash
set -euo pipefail

# Claude Code CLI Installer
# Installs the Claude Code CLI tool globally via npm

MIN_NODE_VERSION=18

check_node() {
    if ! command -v node &>/dev/null; then
        echo "Error: Node.js is not installed. Please install Node.js ${MIN_NODE_VERSION}+ from https://nodejs.org" >&2
        exit 1
    fi

    local version
    version=$(node -e "process.exit(parseInt(process.versions.node.split('.')[0]))" 2>/dev/null; node -e "console.log(parseInt(process.versions.node.split('.')[0]))")
    if [ "$version" -lt "$MIN_NODE_VERSION" ]; then
        echo "Error: Node.js ${MIN_NODE_VERSION}+ is required (found v$(node --version))" >&2
        exit 1
    fi
}

check_npm() {
    if ! command -v npm &>/dev/null; then
        echo "Error: npm is not installed. It should come bundled with Node.js." >&2
        exit 1
    fi
}

install_claude() {
    echo "Installing Claude Code CLI..."
    npm install -g @anthropic-ai/claude-code
    echo "Claude Code CLI installed successfully."
    echo ""
    echo "Run 'claude --version' to verify the installation."
    echo "Run 'claude' to start an interactive session."
}

main() {
    check_node
    check_npm
    install_claude
}

main "$@"
