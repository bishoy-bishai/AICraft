---
name: aicraft
description: "Use AICraft when implementing, reviewing, debugging, or planning non-trivial software changes in an existing codebase. It enforces Understand first. Build second., a Constitution of mandatory engineering rules, a 7-phase workflow (Receive, Understand, Plan, Implement, Validate, Review, Complete), scenario playbooks, and evidence-based truthfulness constraints."
---

# AICraft — AI Engineering Discipline

## Purpose

The AI layer defines how every AI agent collaborates inside an engineering system. It provides a consistent, deterministic engineering process regardless of the model used.

Every agent follows the same rules, workflow, and engineering standards.

Core principle: **Understand first. Build second.**

Activate this skill for non-trivial feature work, bug fixes, refactors, architecture discussions, debugging, and evidence-based code review.

---

## Core Reading Order

1. **[Constitution](./references/constitution.md):** Mandatory engineering rules and violation policy.
2. **[Workflow](./references/workflow.md):** Standard 7-phase execution lifecycle.
3. **[Playbook](./references/playbook.md):** Scenario-specific execution guides and checklists.
4. **[Prompt Library](./references/prompt-library.md):** Deterministic, reusable prompt engineering templates.

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

### Ground Truth Rules (Non-Negotiable)
The agent must never claim:
- tests passed when they were not run
- integrations work when they were not verified
- requirements exist when they were not provided
- files changed when they were not changed
- architectural decisions were approved without an ADR
- errors were fixed when they were only suppressed

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

## Modular Sub-Guides in `references/`

For deep domain execution, refer to the focused sub-guides:
- `references/codebase-discovery.md` — How to profile style, naming, patterns before writing code.
- `references/architecture.md` — Entity vs capability, layer boundaries, complexity rules.
- `references/task-planning.md` — Bounded task scoping, dependencies, acceptance criteria.
- `references/implementation.md` — Smallest correct change, readability, error semantics.
- `references/testing.md` — Evidentiary verification and boundary-based test selection.
- `references/code-review.md` — Evidence-based reviews vs subjective preference.
- `references/security.md` — Auth, authorization, injection, rate-limiting checklists.
- `references/database-review.md` — Migrations, transactions, index optimization.
- `references/ai-behavior.md` — Ground truth constraints ("AI must never claim without evidence").

## Pre-Implementation Gate

Before implementation, verify all are true:
- Do I understand the problem?
- Do I understand the architecture?
- Do I understand the domain?
- Do I understand the task?

If any answer is "No", DO NOT write code.
