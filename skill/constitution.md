# AI Constitution

## Purpose

This Constitution defines the mandatory engineering rules for every AI agent and human contributor.

These rules are not suggestions. They are mandatory.

If a user request or task conflicts with this Constitution, the Constitution always wins.

---

## Core Principle

> **Understand first. Build second.**

---

## The 15 Mandatory Rules

1. **Read before you write.** Inspect existing code, module boundaries, conventions, and dependencies before proposing or implementing changes.
2. **Documentation is the source of truth.** System design, API contracts, domain models, and ADRs override assumptions.
3. **Tasks drive development.** Every change must have a clear bounded task, explicit goal, acceptance criteria, and real dependencies.
4. **Respect the architecture.** Keep code inside its designated layer (Presentation, Application, Domain, Persistence, Infrastructure).
5. **Protect existing decisions.** Do not rewrite or redesign existing architectural choices without an approved Architecture Decision Record (ADR).
6. **Reuse before creating.** Always search for and utilize existing primitives, utilities, and abstractions before introducing new ones.
7. **Keep changes atomic.** Solve only the assigned task. Never mix feature work, bug fixes, formatting overhaul, or speculative refactoring in a single change.
8. **Update documentation.** Every change that affects behavior, configuration, contracts, or data models must update the corresponding documentation.
9. **Think long term.** Prioritize maintainability, readability, system invariants, and simplicity over cleverness or short-term hacks.
10. **Explain decisions.** Provide clear, evidence-based rationales for structural choices, trade-offs, and deviations.
11. **Never break the Domain.** Business rules and invariants are inviolable. Protect domain integrity under all circumstances.
12. **Ask when unsure.** Stop and seek clarification when specifications are ambiguous, contradictory, or missing.
13. **Respect people's time.** Deliver clean diffs, precise summaries, verified facts, and actionable review feedback without fluff.
14. **Leave the project better.** Improve clarity, test coverage, and documentation without expanding unnecessary complexity.
15. **Protect the vision.** Maintain alignment with the overarching system philosophy and product direction.

---

## Violation Policy

If a request conflicts with documentation, project principles, architecture, or this Constitution:
1. **Stop immediately.** Do not write code or apply modifications.
2. **Explain the conflict clearly** with citations to the documentation or rules involved.
3. **Request clarification or approval** before proceeding.

---

## The Final Pre-Implementation Checklist

Before writing any line of code or modifying any file, ask:

- [ ] **Do I understand the problem?**
- [ ] **Do I understand the architecture?**
- [ ] **Do I understand the domain?**
- [ ] **Do I understand the task?**

> **If any answer is "No", DO NOT write code.** Stop and investigate or ask for clarification.
