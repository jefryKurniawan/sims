# Verification Before Completion

**When:** Task seems done, before declaring complete.

## Mandatory Checks:

- [ ] Build passes: `pnpm run build`
- [ ] Tests pass: `php artisan test` + `pnpm test`
- [ ] Lint clean: `pnpm lint` (if configured)
- [ ] No console errors in browser (if UI change)
- [ ] Feature works end-to-end (manual test)
- [ ] lean-prd.md updated if MVP item completed

## Do NOT skip:

- "It works on my machine" ≠ done
- One-line fix still needs full verification
