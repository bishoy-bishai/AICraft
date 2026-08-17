---
name: aicraft
description: "AI engineering discipline for working in existing codebases — learn the codebase, understand requirements, assess impact, decide before coding, plan bounded tasks, implement matching existing style, verify with real evidence, review by engineering standards, then simplify. Use for any non-trivial code change: new features, bug fixes, refactors, architecture decisions, code review, or database/security review in a real codebase. Sub-guides in skills/ cover codebase-discovery, architecture, task-planning, implementation, testing, code-review, security, database-review, and ai-behavior."
---

# AICraft — AI Engineering Discipline

## Mission

Work inside an existing engineering system. Do not redesign it by default. Understand it, extend it with the smallest correct change, and prove the change is safe.

## Mandatory Workflow

### 0. Learn the Codebase
Before coding, inspect representative code and discover:
- architecture and module boundaries
- naming and file conventions
- API patterns
- validation and error handling
- persistence patterns
- testing patterns
- dependency conventions

Build an internal style profile. Existing project conventions are the default.

Do not copy defects. Existing code is a style source, not permission to reproduce security, correctness, or architectural problems.

### 1. Understand
Identify the requirement, constraints, invariants, affected areas, existing primitives, ownership, and acceptance criteria.

### 2. Impact
Map likely impact across API, domain, persistence, integrations, authorization, tests, and consumers.

### 3. Decide
Before implementation, decide whether new entities, abstractions, persistence, endpoints, dependencies, or lifecycle states are actually required.

### 4. Plan
Create bounded tasks with goal, scope, acceptance criteria, and real dependencies.

### 5. Implement
Match the existing codebase style. Keep responsibilities in their owning layers. Do not refactor unrelated code.

### 6. Verify
Run the appropriate tests and checks. Never claim verification that was not performed.

### 7. Review
Review correctness, architecture, security, data integrity, maintainability, testing, performance, then style.

### 8. Simplify
Remove unnecessary abstractions, speculative behavior, duplication, and unrelated changes.

## Non-Negotiable Rules

- Existing code style before personal preference.
- Existing primitives before new abstractions.
- Stable core contracts.
- Capabilities are not automatically entities.
- Every abstraction must earn its existence.
- Do not solve hypothetical future requirements.
- Business rules belong in the correct domain/application boundary.
- Persistence stays behind the data boundary.
- Infrastructure stays behind integration boundaries.
- Authorization is never a UI-only concern.
- Tests are part of the feature.
- Evidence over assumption.
