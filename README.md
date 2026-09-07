# AICraft

> Understand first. Build second.

AICraft is a standalone Agent Skill and Claude Code plugin that enforces disciplined, evidence-based software engineering for coding agents.

## What AICraft Is

AICraft standardizes how agents execute non-trivial engineering work in existing repositories. It emphasizes architecture respect, bounded scope, and verifiable claims.

Canonical skill entrypoint: [skills/aicraft/SKILL.md](skills/aicraft/SKILL.md)

## Why It Exists

Raw code generation often introduces architecture drift, speculative abstractions, and unverifiable claims. AICraft defines deterministic execution rules so implementation quality is consistent across tasks and agents.

## The 4 Pillars

1. Constitution
2. Workflow
3. Playbook
4. Prompt Library

References:

- [skills/aicraft/references/constitution.md](skills/aicraft/references/constitution.md)
- [skills/aicraft/references/workflow.md](skills/aicraft/references/workflow.md)
- [skills/aicraft/references/playbook.md](skills/aicraft/references/playbook.md)
- [skills/aicraft/references/prompt-library.md](skills/aicraft/references/prompt-library.md)

## The 7-Phase Workflow

1. Receive
2. Understand
3. Plan
4. Implement
5. Validate
6. Review
7. Complete

## Ground Truth Rules

AICraft explicitly prohibits agents from claiming:

- tests passed when tests were not run
- integrations work without verification
- requirements exist when they were not supplied
- files changed when they were not changed
- architecture decisions were approved without an ADR
- errors were fixed when they were only suppressed

## Supported AI Coding Agents

Supported packaging and installation paths:

- Claude Code plugin support via [.claude-plugin/plugin.json](.claude-plugin/plugin.json)
- Agent Skills installation via GitHub repository reference

Compatibility guidance:

- Other clients may apply AICraft as instruction content manually, but that is not claimed as native plugin support.

## Installation

Claude Code plugin:

1. Use Claude's plugin installation workflow with this repository.
2. Validate locally with `claude plugin validate . --strict` when CLI is available.

Agent Skills:

```bash
npx skills add bishoy-bishai/AICraft --skill aicraft
```

Manual skill installation:

1. Copy [skills/aicraft](skills/aicraft) into your client skill directory.
2. Ensure [skills/aicraft/SKILL.md](skills/aicraft/SKILL.md) is the selected skill entrypoint.

## Example Prompts

1. Use AICraft to analyze this repository before implementing the requested feature. First understand the architecture, domain, conventions, and relevant ADRs. Do not write code until the pre-implementation gate is satisfied.
2. Use AICraft to review this change. Check architecture, domain invariants, correctness, security, performance, readability, testing, and documentation. Only report findings supported by evidence from the repository and diff.
3. Use AICraft to turn this requirement into a bounded implementation plan. Identify affected boundaries, reusable primitives, acceptance criteria, validation steps, and documentation changes before implementation.
4. Use AICraft to debug a regression. Reproduce the issue, identify root cause with repository evidence, propose the smallest safe fix, and define verification steps.
5. Use AICraft to propose an ADR-ready architecture change with trade-offs, boundary impact, migration strategy, and rollback plan.

## Repository Structure

- [.claude-plugin](.claude-plugin)
- [commands](commands)
- [skills/aicraft](skills/aicraft)
- [tests](tests)
- [validation](validation)
- [.github/workflows/validate.yml](.github/workflows/validate.yml)

## Validation

Run:

```bash
python validation/validate.py
python validation/validate.py --strict
python -m unittest discover -s tests -p "test_*.py" -v
```

See [VALIDATION.md](VALIDATION.md) for full contributor and release gates.

## Security and Privacy

AICraft performs no runtime telemetry, no hidden data collection, and no network execution scripts in this repository. Validation includes basic secret-pattern and suspicious execution checks.

## License

MIT. See [LICENSE](LICENSE).
