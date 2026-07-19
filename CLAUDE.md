# CLAUDE.md

## Stack
Laravel 11 / React 18 + TypeScript / Inertia / Tailwind v4 / shadcn/ui

## Constraints
- DB queue (no Redis)
- pnpm (no npm)
- Shared hosting — `pnpm build` hasil static
- CSS: border pakai `border border-border`, jangan `border-gray-*`
- Auth: Spatie Permission (RBAC), Sanctum (API)
- Form: `useForm()` dari Inertia, bukan React Hook Form / fetch()

## Rules
1. **Ponytail** — solusi paling sederhana, jangan over-engineer
2. **Atomic** — satu fokus per task, jangan buat banyak file sekaligus
3. **Min 1 test** untuk logika baru
4. **WCAG 2.1 AA** — label, role, aria-label di setiap input
5. **No destructive** — migrate:fresh, drop table, rm -rf, force-push, sudo ❌
6. **No commit/push** — dilarang commit atau push dalam kondisi apapun, user yang lakukan manual
7. **No .env commit**

## References (load manual saat butuh)
- `cat TASKS.md` — status modul
- `cat docs/lean-prd.md` — PRD & roadmap
- `cat MEMORY.md` — lessons learned
- `cat RULES.md` — konvensi detail

## Preferences
- Jawab dalam Bahasa Indonesia
- Akurat > cepat — iterasi beberapa prompt gapapa, asal hasil benar
- Tanya user hanya jika: di luar PRD, konflik kebutuhan, butuh keputusan bisnis
- Cari file via Grep/Glob, bukan graphify