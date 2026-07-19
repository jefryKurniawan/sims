# PRD Tracker (integrated with docs/lean-prd.md)

**When:** Start task, need next priority, or update progress.

## Steps:

1. Read `docs/lean-prd.md` → find first unchecked MVP item (`- [ ] #N`)
2. Parse: number, title, description
3. Break down into technical steps (use `writing-plans` + `to-issues` skills)
4. Execute via `executing-plans` skill
5. On completion: update `docs/lean-prd.md` → change `- [ ]` to `- [x] #N — Done YYYY-MM-DD — PR #XX`
6. Commit: `git commit -m "feat: #N title\n\nRefs lean-prd.md"`

## Lean PRD Format Expected:

```markdown
## MVP Priorities

- [x] #1 Auth & Role — Done 2026-07-10
- [ ] #4 Laporan PDF Prestasi per Siswa
```
