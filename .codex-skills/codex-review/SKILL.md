# Codex Self-Review

**When:** Before commit/PR, review own changes.

## Checklist:

- [ ] Follows RULES.md conventions (命名, 構造, 型安全)
- [ ] No commented-out code
- [ ] No console.log / dd() / var_dump left
- [ ] Types strict (TS strict, PHP declare strict_types)
- [ ] Accessibility: label, aria, contrast, keyboard
- [ ] Security: validation, sanitization, auth checks
- [ ] Performance: no N+1, no heavy computation in render
- [ ] Migration reversible (down() matches up())

## Run:

```bash
pnpm run build && php artisan test
```
