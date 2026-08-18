# AI Prompt Engineering Library

## Purpose

This document defines how reusable prompts are designed and structured.

Prompts are instructions for executing documented engineering work.

> **Prompts do not define engineering behavior. The Constitution does.**  
> Prompts simply activate the documented engineering process.

---

## Standard Prompt Structure

Every structured prompt follows this standardized schema:

```markdown
### [Task / Operation Name]

**Context:** Background information, related files, architecture boundaries, and ADR citations.
**Goal:** Specific, unambiguous objective of this task.
**Inputs:** References to existing code, documentation, tickets, or user requirements.
**Constraints:** Rules from Constitution, prohibited changes, backwards compatibility needs.
**Expected Output:** Exact deliverables (e.g., modified files, tests, documentation, migration).
**Definition of Done:** Objective checklist required before task completion.
```

---

## Prompt Categories

1. **Documentation:** Architecture guides, API specifications, ADR generation, doc reviews.
2. **Architecture:** Module boundary analysis, ADR creation, data modeling, decoupling plans.
3. **Development:** Feature implementations, bug fixes, minimal safe refactors.
4. **Quality:** Evidentiary test suite generation, security auditing, database review, code reviews.
5. **Product & Research:** Technical spikes, trade-off comparisons, feasibility studies.

---

## Prompt Rules

Every prompt must explicitly instruct the AI agent to:
- Read the **Constitution**.
- Follow the standard **Workflow**.
- Respect the **Playbook** scenario guide.
- Read the assigned task and all related documentation.
- Respect **Project Principles** and **Domain Architecture**.
- Never invent requirements or speculate on future needs.
- Never bypass architectural layers.
- Update documentation and tests whenever making code changes.

---

## Prompt Design Principles

- **Reusable:** Parameterized for different modules and codebases.
- **Deterministic:** Minimizes ambiguity to produce consistent, reproducible output.
- **Composable:** Can be chained across phases of the 7-stage workflow.
- **Model Independent:** Works identically on Antigravity, Claude, ChatGPT, Codex, Gemini, etc.
- **Documentation Driven:** Uses repository documentation as ground truth.
- **Architecture Aware:** Enforces layer boundaries and domain invariants.
- **Human Readable:** Clear for developers to review and audit.
- **AI Executable:** Directly actionable with concrete inputs and outputs.

---

## Ready-to-Use Prompt Templates

### 1. Feature Implementation Prompt Template

```markdown
You are an engineering contributor operating under the AICraft AI Constitution.

CONTEXT:
We are adding [Feature Name] to the [Module/Service] subsystem.
Relevant documents: docs/architecture/[spec].md, docs/domain/[domain].md.

GOAL:
Implement [Specific Functionality] satisfying the acceptance criteria below.

CONSTRAINTS:
1. Follow the AI Constitution and Workflow strictly (Understand -> Plan -> Implement -> Validate -> Review).
2. Reuse existing primitives in [src/common/...] — do not invent new abstractions.
3. Keep changes atomic; do not refactor surrounding code.
4. Maintain 100% layer separation (Presentation -> Application -> Domain -> Data).

INPUTS:
- Target files: [paths/to/files]
- Test files: [paths/to/tests]

EXPECTED OUTPUT:
- Smallest correct code implementation.
- Unit/integration tests proving correctness with real assertions.
- Updated documentation in docs/ for any modified behavior or API contracts.

DEFINITION OF DONE:
- [ ] Understand-first check passed.
- [ ] Code matches project style profile.
- [ ] Tests pass green.
- [ ] Documentation updated.
```

### 2. Bug Fix & Root-Cause Prompt Template

```markdown
You are an engineering contributor operating under the AICraft AI Constitution.

CONTEXT:
Defect reported in [Module]: [Brief description of bug].
Reproduction case: [Steps or error log].

GOAL:
Identify root cause, create a failing reproduction test, and apply the minimal correct fix.

CONSTRAINTS:
1. Do not refactor unrelated code.
2. Do not change public API signatures or architectural patterns.
3. Do not suppress errors or add catch-all bypasses.

EXPECTED OUTPUT:
1. Root cause explanation citing exact file and line numbers.
2. Reproduction test demonstrating the failure.
3. Minimal code fix resolving the reproduction.
4. Verification proof that all tests pass.

DEFINITION OF DONE:
- [ ] Root cause verified with evidence.
- [ ] Fix is minimal and atomic.
- [ ] Existing test suite passes with zero regressions.
```

### 3. Objective Code Review Prompt Template

```markdown
You are an engineering reviewer operating under the AICraft AI Constitution.

GOAL:
Perform an objective, evidence-based code review of the following change: [PR/Diff].

REVIEW ORDER:
1. Architecture & Boundaries (ADR alignment, layer leaks)
2. Domain & Business Invariants (correctness of rules)
3. Correctness & Error Handling (edge cases, concurrency)
4. Security (input validation, auth, injection risk)
5. Performance (queries, allocations, N+1)
6. Readability & Simplicity (avoid unnecessary abstractions)
7. Testing (evidentiary quality, assertions)
8. Documentation (updated specs, comments)

CONSTRAINTS:
- No subjective style nitpicks or "I would have written it differently" comments unless violating project conventions.
- Every flagged issue must cite the specific risk, invariant violation, or architectural conflict.
```
