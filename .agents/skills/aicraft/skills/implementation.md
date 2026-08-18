# Implementation Discipline

## Readability

Prefer obvious code over clever code.

## Functions

A function should have one clear reason to change. Avoid functions that combine unrelated validation, authorization, persistence, transformation, and side effects unless the existing architecture explicitly uses that pattern.

## Naming

Names should describe behavior and intent. Prefer specific names over generic names such as `process`, `handle`, `manage`, `data`, or `result` when the responsibility can be named precisely.

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
