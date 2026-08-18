---
name: aicraft
description: "AI engineering discipline for coding agents (Antigravity, Claude Code, Cursor, Codex, Gemini, ChatGPT). Defines how AI agents collaborate under strict engineering discipline: Constitution (15 mandatory rules), Standard 7-Phase Workflow (Receive, Understand, Plan, Implement, Validate, Review, Complete), Scenario Playbooks, Prompt Library, and deep subguides for codebase-discovery, architecture, task-planning, implementation, testing, code-review, security, database-review, and ai-behavior."
---

# AICraft — AI Engineering Discipline

## Purpose

The AI layer defines how every AI agent collaborates inside an engineering system. It provides a consistent, deterministic engineering process regardless of the AI model being used (ChatGPT, Codex, Claude, Gemini, Antigravity, Cursor, Windsurf, or future models).

Every agent follows the same rules, workflow, and engineering standards.

---

## Core Reading Order

1. **[Constitution](./constitution.md):** Mandatory engineering rules and violation policy.
2. **[Workflow](./workflow.md):** Standard 7-phase execution lifecycle.
3. **[Playbook](./playbook.md):** Scenario-specific execution guides and checklists.
4. **[Prompt Library](./prompt-library.md):** Deterministic, reusable prompt engineering templates.

---

## Core Responsibilities

- **Understand the project before changing it:** Read code, inspect conventions, identify invariants.
- **Respect the architecture:** Enforce layer boundaries (Presentation -> Application -> Domain -> Data -> Infrastructure).
- **Follow the Constitution:** 15 non-negotiable engineering rules.
- **Improve the documentation:** Keep documentation as the living source of truth.
- **Explain important decisions:** Ground every architectural choice and trade-off in evidence.

---

## The 4 Pillars of AICraft

### 1. Constitution
- Core Principle: **Understand first. Build second.**
- 15 Mandatory Rules: Read before writing, tasks drive development, protect existing decisions, reuse before creating, keep changes atomic, update docs, never break the domain, ask when unsure.
- Violation Policy: Stop immediately if a task conflicts with rules or architecture.
- Final Rule: Pre-implementation check.

### 2. Standard Workflow (7 Phases)
1. **Receive:** Understand scope and requirements.
2. **Understand:** Read docs, ADRs, domain models, and existing code.
3. **Plan:** Bounded task breakdown, boundary impact, reusable primitives.
4. **Implement:** Smallest correct change, match existing code style, no premature abstractions.
5. **Validate:** Evidentiary verification, build checks, unit/integration test suite.
6. **Review:** 8-stage priority review (Architecture, Domain, Correctness, Security, Performance, Readability, Tests, Docs).
7. **Complete:** Update status, docs, ADRs, clean atomic commits.

### 3. Scenario Playbook
Specialized execution checklists and "Never" constraints for:
- Documentation
- Feature Development
- Bug Fixes
- Refactoring
- Architecture Modification
- Technical Research & Spikes
- Documentation Review
- Code Review

### 4. Prompt Engineering Library
Structured schemas and deterministic prompt templates for documentation, architecture, development, quality, and research.

---

## Modular Sub-Guides in `skills/`

For deep domain execution, refer to the focused sub-guides:
- `skills/codebase-discovery.md` — How to profile style, naming, patterns before writing code.
- `skills/architecture.md` — Entity vs capability, layer boundaries, complexity rules.
- `skills/task-planning.md` — Bounded task scoping, dependencies, acceptance criteria.
- `skills/implementation.md` — Smallest correct change, readability, error semantics.
- `skills/testing.md` — Evidentiary verification and boundary-based test selection.
- `skills/code-review.md` — Evidence-based reviews vs subjective preference.
- `skills/security.md` — Auth, authorization, injection, rate-limiting checklists.
- `skills/database-review.md` — Migrations, transactions, index optimization.
- `skills/ai-behavior.md` — Ground truth constraints ("AI must never claim without evidence").
