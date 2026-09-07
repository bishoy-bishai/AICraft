# Architecture Discipline

## Core Questions

Before adding a concept, ask:
1. Can an existing primitive represent it?
2. Can composition solve it?
3. Is a new entity required by a real business requirement?
4. Does the new abstraction have a concrete responsibility today?

## Entity vs Capability

Entities represent things the system stores or manages.

Capabilities describe things the system does.

Do not create persistence entities for capabilities unless the requirements explicitly require stored state.

## Layer Ownership

Presentation → presentation behavior
Application → orchestration/use cases
Domain → business meaning and invariants
Data → persistence
Infrastructure → external systems

Do not move responsibilities across boundaries without a clear reason.

## Complexity Rule

When two designs satisfy the requirements, choose the simpler design with fewer concepts, boundaries, and moving parts.
