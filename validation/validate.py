#!/usr/bin/env python3
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CANONICAL_SKILL = ROOT / "SKILL.md"
REFERENCES_DIR = ROOT / "references"
TEMPLATES_DIR = ROOT / "templates"
COMMAND_DOC = ROOT / "commands" / "aicraft.md"
PLUGIN_JSON = ROOT / ".claude-plugin" / "plugin.json"
MARKETPLACE_JSON = ROOT / ".claude-plugin" / "marketplace.json"

FORBIDDEN_PATHS = [
    "skills",
    "skills/aicraft",
    "src",
    "public",
    "dist",
    "_static-archive",
    "index.html",
    "vite.config.ts",
    "components.json",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "install.sh",
]

FORBIDDEN_HINTS = [
    "React",
    "ReactDOM",
    "Tailwind",
    "Vite",
    "Webpack",
    "GSAP",
    "shadcn",
    "npm run dev",
    "npm install",
    "GitHub Pages",
    "skills/aicraft/",
]

SECRET_PATTERNS = [
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"ghp_[A-Za-z0-9]{30,}"),
    re.compile(r"xox[baprs]-[A-Za-z0-9-]{10,}"),
    re.compile(r"-----BEGIN (RSA|OPENSSH|EC|DSA) PRIVATE KEY-----"),
    re.compile(r"(?i)api[_-]?key\s*[:=]\s*['\"][^'\"]{12,}['\"]"),
    re.compile(r"(?i)token\s*[:=]\s*['\"][^'\"]{12,}['\"]"),
]

LINK_PATTERN = re.compile(r"\[[^\]]+\]\(([^)]+)\)")


def fail(errors, msg):
    errors.append(msg)


def load_text(path, errors):
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        fail(errors, f"Missing file: {path.relative_to(ROOT)}")
    except UnicodeDecodeError:
        fail(errors, f"Non-text or invalid UTF-8 file: {path.relative_to(ROOT)}")
    return ""


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, flags=re.S)
    if not m:
        return None, ""
    fm = {}
    block = m.group(1)
    for line in block.splitlines():
        if not line.strip() or line.strip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        fm[key.strip()] = value.strip().strip('"').strip("'")
    return fm, text[m.end():]


def local_markdown_files():
    return [p for p in ROOT.rglob("*.md") if ".git" not in p.parts]


def check_skill(errors):
    text = load_text(CANONICAL_SKILL, errors)
    if not text:
        return
    fm, body = parse_frontmatter(text)
    if fm is None:
        fail(errors, "SKILL.md missing YAML frontmatter")
        return
    for key in ("name", "description"):
        if key not in fm or not fm[key].strip():
            fail(errors, f"SKILL.md frontmatter missing '{key}'")
    if fm.get("name") != "aicraft":
        fail(errors, "SKILL.md frontmatter name must be 'aicraft'")
    required_body_checks = [
        "Understand first. Build second.",
        "Constitution",
        "Workflow",
        "Playbook",
        "Prompt Library",
        "Receive",
        "Understand",
        "Plan",
        "Implement",
        "Validate",
        "Review",
        "Complete",
    ]
    for token in required_body_checks:
        if token not in body:
            fail(errors, f"SKILL.md missing required content token: {token}")

    required_refs = [
        "ai-behavior.md",
        "architecture.md",
        "code-review.md",
        "codebase-discovery.md",
        "constitution.md",
        "database-review.md",
        "implementation.md",
        "playbook.md",
        "prompt-library.md",
        "security.md",
        "task-planning.md",
        "testing.md",
        "workflow.md",
    ]
    if not REFERENCES_DIR.exists():
        fail(errors, "references directory is missing")
    else:
        for name in required_refs:
            if not (REFERENCES_DIR / name).exists():
                fail(errors, f"Missing required reference: references/{name}")

    if not TEMPLATES_DIR.exists():
        fail(errors, "templates directory is missing")


def check_plugin(errors):
    ptxt = load_text(PLUGIN_JSON, errors)
    mtxt = load_text(MARKETPLACE_JSON, errors)
    if not ptxt or not mtxt:
        return
    try:
        plugin = json.loads(ptxt)
    except json.JSONDecodeError as ex:
        fail(errors, f"Invalid JSON in .claude-plugin/plugin.json: {ex}")
        return
    try:
        market = json.loads(mtxt)
    except json.JSONDecodeError as ex:
        fail(errors, f"Invalid JSON in .claude-plugin/marketplace.json: {ex}")
        return

    if plugin.get("name") != "aicraft":
        fail(errors, ".claude-plugin/plugin.json name must be 'aicraft'")
    if plugin.get("version") != "1.0.0":
        fail(errors, ".claude-plugin/plugin.json version must be 1.0.0")
    if plugin.get("license") != "MIT":
        fail(errors, ".claude-plugin/plugin.json license must be MIT")
    if plugin.get("repository") != "https://github.com/bishoy-bishai/AICraft":
        fail(errors, ".claude-plugin/plugin.json repository URL mismatch")
    if plugin.get("license") != "MIT":
        fail(errors, ".claude-plugin/plugin.json license must be MIT")
    commands = plugin.get("commands")
    if not isinstance(commands, list) or not commands:
        fail(errors, ".claude-plugin/plugin.json commands must be a non-empty list")
    else:
        for cmd in commands:
            if not isinstance(cmd, str):
                fail(errors, ".claude-plugin/plugin.json commands entries must be strings")
                continue
            cmd_path = (ROOT / cmd).resolve() if not cmd.startswith("./") else (ROOT / cmd[2:]).resolve()
            if not cmd_path.exists():
                fail(errors, f"Command path does not exist: {cmd}")

    if not CANONICAL_SKILL.exists():
        fail(errors, "Canonical skill file missing at SKILL.md")

    if not COMMAND_DOC.exists():
        fail(errors, "Command doc missing at commands/aicraft.md")

    if market.get("name") != "aicraft":
        fail(errors, ".claude-plugin/marketplace.json name must be 'aicraft'")
    if not market.get("description"):
        fail(errors, ".claude-plugin/marketplace.json description is required")
    plugins = market.get("plugins", [])
    if len(plugins) != 1:
        fail(errors, ".claude-plugin/marketplace.json must define exactly one plugin")
    else:
        if plugins[0].get("name") != "aicraft":
            fail(errors, "marketplace plugin name must be 'aicraft'")
        if plugins[0].get("source") != "./":
            fail(errors, "marketplace plugin source must be './'")


def check_repository(errors, strict=False):
    for rel in FORBIDDEN_PATHS:
        if (ROOT / rel).exists():
            fail(errors, f"Forbidden website/app artifact exists: {rel}")

    if (ROOT / "LICENSE").exists():
        license_text = load_text(ROOT / "LICENSE", errors)
        if "MIT License" not in license_text:
            fail(errors, "LICENSE is present but does not look like MIT")
    else:
        fail(errors, "Missing LICENSE")

    for p in ROOT.rglob("*"):
        if p.is_file() and ".git" not in p.parts:
            if "__pycache__" in p.parts or p.suffix.lower() in {".pyc", ".pyo"}:
                continue
            text = load_text(p, errors)
            if not text:
                continue
            if p.relative_to(ROOT).as_posix() == "validation/validate.py":
                continue
            if "/Users/" in text or "C:\\" in text:
                fail(errors, f"Hardcoded local machine path found in {p.relative_to(ROOT)}")

    if strict:
        for p in local_markdown_files():
            text = load_text(p, errors)
            for token in FORBIDDEN_HINTS:
                if token in text:
                    fail(errors, f"Strict mode: forbidden website hint '{token}' in {p.relative_to(ROOT)}")


def check_markdown_links(errors):
    for md in local_markdown_files():
        text = load_text(md, errors)
        for link in LINK_PATTERN.findall(text):
            if link.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target = link.split("#", 1)[0]
            if not target:
                continue
            resolved = (md.parent / target).resolve()
            try:
                resolved.relative_to(ROOT.resolve())
            except ValueError:
                fail(errors, f"Link escapes repository root in {md.relative_to(ROOT)}: {link}")
                continue
            if not resolved.exists():
                fail(errors, f"Broken local link in {md.relative_to(ROOT)}: {link}")


def check_security(errors):
    allow_ext = {".md", ".json", ".py", ".yml", ".yaml", ".txt", ""}
    for p in ROOT.rglob("*"):
        if not p.is_file() or ".git" in p.parts:
            continue
        if p.suffix.lower() not in allow_ext:
            continue
        text = load_text(p, errors)
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                fail(errors, f"Potential secret pattern found in {p.relative_to(ROOT)}: {pattern.pattern}")
        if re.search(r"curl\s+.*\|\s*(bash|sh)", text):
            fail(errors, f"Suspicious remote execution pattern found in {p.relative_to(ROOT)}")


def main():
    parser = argparse.ArgumentParser(description="Validate AICraft repository structure and metadata.")
    parser.add_argument("--strict", action="store_true", help="Enable stricter content checks.")
    args = parser.parse_args()

    errors = []
    check_skill(errors)
    check_plugin(errors)
    check_repository(errors, strict=args.strict)
    check_markdown_links(errors)
    check_security(errors)

    if errors:
        print("VALIDATION FAILED")
        for err in errors:
            print(f"- {err}")
        sys.exit(1)

    print("VALIDATION PASSED")


if __name__ == "__main__":
    main()
