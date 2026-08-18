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

## Injection

- Parameterize all SQL/database queries. Never string-concatenate or interpolate user input into a query, shell command, template string, or dynamic code evaluation.
- Validate and allowlist any input used to build a file path, dynamic import, or external command.

## Output Handling / XSS

- Escape or use framework-safe rendering for any user-controlled data rendered as HTML.
- Never pass untrusted input to `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or equivalent raw-render/raw-execute APIs.

## Secrets & Configuration

- Never hardcode credentials, API keys, tokens, or connection strings in source. Read them from environment variables or a secret manager.
- Never log secrets or full request/response bodies that may contain sensitive data.

## AuthN / AuthZ

- Every mutating endpoint or action must verify server-side that the caller owns or is permitted to act on the target resource — client-side or UI-only checks do not count.
- Re-check authorization on every request; never trust a client-supplied user ID, role, or ownership flag.

## Dependencies

- Do not introduce a new dependency unless necessary. Flag unpinned versions or clearly unmaintained/abandoned packages when noticed.

## Cryptography

- Never write custom cryptographic primitives. Use vetted, well-maintained libraries.
- Never use MD5/SHA1 (or plain hashing) for passwords; require bcrypt, argon2, or scrypt.

## Rate Limiting / Abuse

- Flag public-facing endpoints (auth, search, write actions) that lack rate limiting or brute-force protection when the change touches them.

## Approval Policy

A feature or change must not be approved when a required control from any category above is missing — authorization, injection safety, secret handling, cryptography, or rate limiting — even if the happy path and UI work.
