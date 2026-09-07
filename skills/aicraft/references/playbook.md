# Engineering Playbook

## Purpose

The Playbook provides scenario-specific execution guides.

While the **Workflow** defines the overall lifecycle of a task, the **Playbook** explains how to handle specific engineering situations with precision.

---

## Scenario 1 — Documentation

**Goal:** Create or update documentation.

**Checklist:**
- [ ] Understand the domain and business terminology.
- [ ] Preserve established nomenclature across documents.
- [ ] Keep formatting and tone consistent with repository standards.
- [ ] Link related documentation, specs, and ADRs.
- [ ] Update document metadata (authors, dates, status).
- [ ] Update versioning where applicable.

**Never:**
- Invent architecture that is not implemented or approved.
- Contradict existing documentation without explicit rationale and approval.
- Remove historical architectural decisions without migration context.

---

## Scenario 2 — Feature Development

**Goal:** Implement a new feature cleanly into the existing system.

**Checklist:**
- [ ] Understand business requirements and domain invariants.
- [ ] Validate alignment with layered architecture.
- [ ] Reuse existing patterns, entities, and primitives.
- [ ] Keep changes atomic and bounded to the feature scope.
- [ ] Add unit, integration, and contract tests.
- [ ] Update user/developer documentation and API contracts.

**Never:**
- Skip documentation or test updates.
- Introduce new architectural patterns or frameworks without an ADR.
- Mix refactoring of unrelated legacy code into the feature pull request.

---

## Scenario 3 — Bug Fix

**Goal:** Fix the defect with the smallest possible blast radius.

**Checklist:**
- [ ] Identify and isolate the root cause.
- [ ] Write a failing reproduction test before applying the fix.
- [ ] Implement the minimal correct fix.
- [ ] Verify that all existing tests pass and no regressions occur.
- [ ] Update documentation if behavior or edge-case handling changes.

**Never:**
- Rewrite unrelated code or refactor surrounding modules during a bug fix.
- Suppress errors silently instead of handling root cause.
- Change system architecture or API contracts without explicit approval.

---

## Scenario 4 — Refactoring

**Goal:** Improve code structure, readability, and maintainability without altering external behavior.

**Checklist:**
- [ ] Ensure comprehensive test suite exists before starting.
- [ ] Preserve external behavior and public API contracts exactly.
- [ ] Improve readability, cognitive complexity, and cohesion.
- [ ] Eliminate dead code and duplication.
- [ ] Keep all tests passing green at every step.
- [ ] Update architecture and code documentation if module structure changes.

**Never:**
- Introduce new features or modify business logic during a refactor.
- Change performance characteristics detrimentally.

---

## Scenario 5 — Architecture Modification

**Goal:** Modify or extend system architecture safely.

**Checklist:**
- [ ] Read all related Architectural Decision Records (ADRs).
- [ ] Analyze cross-cutting impact (APIs, persistence, services, consumers).
- [ ] Draft a new ADR detailing context, options, decision, and consequences.
- [ ] Update architectural diagrams and module boundary specs.
- [ ] Implement only after explicit review and approval.

**Never:**
- Change architectural patterns silently.
- Breach domain boundaries or leak infrastructure concerns into domain logic.

---

## Scenario 6 — Technical Research & Spike

**Goal:** Investigate a technical or business problem thoroughly.

**Deliverables:**
- Summary of Findings
- Evaluated Options & Trade-offs
- Concrete Recommendation
- Identified Risks & Failure Modes
- References & Proof-of-Concept benchmarks

**Never:**
- Start direct production implementation under a research task.
- Assume that a research recommendation equals formal implementation approval.

---

## Scenario 7 — Documentation Review

**Goal:** Review documentation quality, accuracy, and clarity.

**Checklist:**
- [ ] Correct and consistent terminology.
- [ ] Internal consistency across related guides and diagrams.
- [ ] Up-to-date code references, URLs, and file paths.
- [ ] Accurate metadata, frontmatter, and headings.
- [ ] Clear, concise, active-voice writing.

---

## Scenario 8 — Code Review

**Goal:** Review implementation quality objectively against engineering standards.

### Review Priority Order:
1. **Architecture & Boundaries:** Does it respect layer boundaries and ADRs?
2. **Domain & Business Logic:** Are invariants protected and logic correct?
3. **Correctness & Edge Cases:** Does it handle nulls, errors, and race conditions?
4. **Security:** Are inputs validated, auth enforced, and queries parameterized?
5. **Performance & Scalability:** Are queries indexed, allocations bounded, and N+1 avoided?
6. **Readability & Simplicity:** Is the intent clear without excessive abstractions?
7. **Testing:** Are tests evidentiary, fast, and covering edge cases?
8. **Documentation:** Are contracts, configs, and changelogs updated?

---

## Escalation Rules

**Stop and ask for clarification immediately if:**
1. Requirements conflict with each other or with the Constitution.
2. Necessary documentation or domain specifications are missing.
3. Architecture boundaries or ownership are ambiguous.
4. Business rules or invariant handling are undefined for an edge case.
5. Multiple valid architectural solutions exist with significant trade-offs.

---

## The Hierarchy of Authority

> **The Playbook provides guidance.**  
> **The Constitution provides authority.**  
> **If they ever conflict, the Constitution ALWAYS wins.**
