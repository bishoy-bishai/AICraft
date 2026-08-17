# Testing Discipline

Choose tests based on the boundary being verified.

- Pure business rule → unit
- Persistence behavior → integration
- API contract → API/integration
- Complete flow → E2E
- External provider → integration with a controlled test/fake provider where appropriate
- Critical authorization → end-to-end coverage

Tests should be isolated, deterministic, CI-ready, and focused on behavior.

Cover happy paths and important failure paths, especially authorization, validation, not-found, conflict, and data-integrity behavior.
