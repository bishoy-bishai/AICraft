# Validation

This repository is a skill-first package. Validation is a release gate.

## Required Structure

The repository must keep a single canonical skill entrypoint at skills/aicraft/SKILL.md and must not include website or frontend application artifacts.

Required directories/files:

- .claude-plugin/plugin.json
- .claude-plugin/marketplace.json
- skills/aicraft/SKILL.md
- skills/aicraft/references/
- validation/validate.py
- tests/
- .github/workflows/validate.yml

## Local Validation

Run:

```bash
python validation/validate.py
```

Checks include:

- Skill metadata/frontmatter
- Skill reference presence
- Plugin and marketplace manifest structure
- Basic metadata consistency
- Broken local markdown links
- Security patterns and suspicious remote execution patterns

## Strict Validation

Run:

```bash
python validation/validate.py --strict
```

Strict mode adds repository-content checks to catch stale website-related wording and forbidden frontend artifacts.

## Deterministic Tests

Run:

```bash
python -m unittest discover -s tests -p "test_*.py" -v
```

Tests verify deterministic AICraft guarantees in repository artifacts, including:

- pre-implementation discipline
- 7-phase workflow order
- ADR requirement for architecture changes
- evidence/truthfulness rules
- scope atomicity rule
- documentation sync rule
- domain-invariant rule
- 8-stage review order

## Claude Plugin Validation

If Claude CLI is available:

```bash
claude plugin validate . --strict
```

If unavailable, validation is skipped and should be run in an environment where the CLI exists.

## CI Behavior

GitHub Actions workflow [.github/workflows/validate.yml](.github/workflows/validate.yml) runs on pull requests and pushes to main and executes:

- python validation/validate.py --strict
- python -m unittest discover -s tests -p "test_*.py" -v
- claude plugin validate . --strict (only when claude CLI is installed)

## Pre-Release Checklist

- Run strict validation locally.
- Run deterministic tests locally.
- Confirm plugin metadata version and repository URL are correct.
- Confirm no frontend/website files exist.
- Confirm README paths and commands are accurate.
- Confirm license and metadata consistency.
- Confirm release notes reflect actual changes.
