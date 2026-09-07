# Code Review Discipline

Review in this order:

1. Correctness
2. Architecture
3. Security
4. Data integrity
5. Maintainability
6. Testing
7. Performance
8. Style

## Severity

- BLOCKER — cannot safely merge
- MAJOR — should be fixed before merge
- MINOR — improvement worth making
- NIT — optional

## Evidence Rule

Substantive comments must be grounded in:
- requirement
- architecture rule
- project convention
- security/data-integrity rule
- observable correctness issue

Do not use personal preference as a review rule.

## Comment Format

[SEVERITY] Problem → Why it matters → Suggested direction

## Review Questions

- Does the change satisfy the actual requirement?
- Does it match the existing codebase style?
- Does it duplicate an existing abstraction?
- Does it introduce unnecessary entities or lifecycle states?
- Are responsibilities owned by the correct layer?
- Are authorization and visibility correct?
- Is persistence safe?
- Are important failure paths tested?
- Are unrelated changes mixed into the PR?
- Is this the simplest design that satisfies the requirement?

Approve when the change is correct, secure, architecturally consistent, tested appropriately, and no unnecessary complexity remains.
