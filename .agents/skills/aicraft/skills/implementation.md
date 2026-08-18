# Implementation Discipline

## Pragmatic Clean Code

Follow Clean Code best practices **without over-engineering**.

- Write code that is readable, predictable, and easy to maintain.
- Use clear and meaningful names. Prefer specific names over generic names such as `process`, `handle`, `manage`, `data`, or `result` when the responsibility can be named precisely.
- Keep functions and components focused on a single responsibility when it improves clarity.
- Separate concerns when there is a real boundary between them.
- Prefer simple, straightforward solutions over clever ones.
- Avoid unnecessary abstractions, design patterns, wrappers, helpers, or layers.
- Do not introduce complexity for hypothetical future requirements.
- Avoid premature optimization.
- Don't split code into smaller pieces just for the sake of making functions "small."
- Don't create abstractions until there is a clear reason to reuse or isolate behavior.
- Follow the existing project's conventions before introducing new patterns.
- Prefer consistency with the surrounding codebase over theoretical perfection.
- Every abstraction should have a clear purpose and provide meaningful value.

## The Golden Rule

**Choose the simplest design that is clean, testable, maintainable, and appropriate for the current problem.**

When choosing between two valid solutions, prefer the one with:

**Less complexity → Less code → Fewer abstractions → Easier maintenance**

Do not optimize for architectural elegance. Optimize for **clarity and long-term maintainability without unnecessary complexity.**

## Control Flow

Prefer guard clauses, early returns, and shallow branching when consistent with the project style.

## Errors

Do not swallow errors. Preserve useful context. Follow the project's error contract. Do not leak sensitive infrastructure details.

## Side Effects

Make side effects explicit. A read-like function should not secretly mutate state unless that behavior is part of an established contract.

## Interfaces and Abstractions

Do not add interfaces, factories, adapters, managers, wrappers, or generic base classes solely for future flexibility.

## DRY

Do not abstract two pieces of code merely because they look similar. Abstract when the shared behavior and ownership are real and stable.

## Comments

Comments should explain why, constraints, or non-obvious decisions. Do not narrate obvious code.
