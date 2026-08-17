# Security Review

Always check:
- authentication
- authorization
- ownership
- visibility
- input validation
- sensitive data exposure
- IDOR-style access
- private/public resource boundaries
- external resource access

A UI restriction is not authorization.

A feature must not be approved when a required authorization boundary is missing, even if the happy path and UI work.
