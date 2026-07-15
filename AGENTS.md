<!-- Generated: 2026-07-12 | Updated: 2026-07-12 -->

# Sekolahku

Sistem manajemen sekolah (Laravel + Inertia.js React). ERP internal yang migrasi operasi sekolah manual ke digital.

**Tujuan:** Hosting murah (shared hosting), performa maksimal, throughput maksimal.

## Tech Stack

- **Backend:** Laravel 11, PHP 8.2+, Inertia.js (SSR nonaktif, Blade-injected)
- **Frontend:** React 18 + TypeScript (TSX), Vite + SWC, Tailwind CSS v4 (@theme)
- **UI:** shadcn/ui + Radix primitives, @tanstack/react-table, framer-motion, lucide-react
- **State:** Zustand (global), Arktype (runtime validation, opsional)
- **Auth:** Spatie Permission (role-based), Sanctum (API Orang Tua)
- **Queue/Session/Cache:** database driver (no Redis) di shared hosting
- **PWA:** sw.js + manifest.json + offline.html (modul Perpustakaan)
- **Deploy:** Static build `pnpm run build` -> `public/build/` (no Node.js di server)

## Commands

| Task              | Command                                                                         |
| ----------------- | ------------------------------------------------------------------------------- |
| Install PHP deps  | `composer install`                                                              |
| Install JS deps   | `pnpm install`                                                                  |
| Dev server        | `pnpm run dev` (Vite HMR)                                                       |
| Build (prod)      | `pnpm run build` to public/build/                                               |
| Test backend      | `php artisan test`                                                              |
| Test frontend     | `pnpm test` (Vitest)                                                            |
| Migrate           | `php artisan migrate`                                                           |
| Fresh + seed      | `php artisan migrate:fresh --seed`                                              |
| Route check       | `php artisan route:list`                                                        |
| Cache (prod)      | `php artisan config:cache && php artisan route:cache && php artisan view:cache` |
| Optimize autoload | `composer install --optimize-autoloader --no-dev`                               |

## Structure

| Directory       | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| `app/`          | Laravel backend (Models, Controllers, Policies, Observers) |
| `resources/js/` | React/TSX frontend (Inertia pages, components, store)      |
| `routes/`       | Route files per domain (web, admin, frontend, api)         |
| `database/`     | Migrations + seeders (must be reversible)                  |
| `Modules/`      | Legacy nWidart Blade modules coexisting with Inertia       |
| `tests/`        | PHPUnit feature/unit tests                                 |
| `docs/`         | Dokumentasi (lean-prd.md = roadmap MVP)                    |
| `public/`       | Compiled assets, sw.js, manifest.json, offline.html        |

## Key Entry Points

- Admin pages: `resources/js/Pages/Admin/*` -> auto-wrapped AppLayout
- Public pages: `resources/js/Pages/Frontend/*` -> self-contained
- Admin routes: `routes/admin.php` (middleware auth, role:)
- API (Orang Tua): `routes/api.php` (Sanctum)
- Lean PRD: `docs/lean-prd.md` (MVP priorities #1-9, migration phases, success metrics)

## Universal Rules (applies to every task)

1. **Ponytail** -- solusi paling sederhana yang bekerja. Hindari abstraksi yang tidak perlu. Hapus kode dikomentari.
2. **Satu PR = satu masalah** -- atomic, fokus, testable.
3. **Minimal satu test** untuk logika baru (unit/feature).
4. **Migrasi reversible** -- down() konsisten dengan up(). Seed data untuk tabel baru.
5. **Aksesibilitas** -- WCAG 2.1 AA, label/aria/kontras/keyboard.
6. **Jangan commit .env** -- pakai .env.example.
7. **Shared hosting only** -- no Redis/Node.js di server. Lihat RULES.md.

## Referensi

Detail rules & conventions: **RULES.md**  
Project roadmap: **docs/lean-prd.md**  
GitHub summary: **README.md**

<!-- MANUAL: -->

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Codex Skills & Context Boundary (Added 2026-07-15)

### Skill Paths

Codex skills loaded from:

```
.codex-skills/
├── context-boundary/          # DISABLED: terlalu restriktif, ganti explore bebas
├── prd-tracker/               # Reads/writes docs/lean-prd.md progress
├── systematic-debugging/      # Root cause analysis workflow
├── executing-plans/           # Step-by-step plan execution
├── verification-before-completion/ # Quality gate before done
├── writing-plans/             # Break down features into steps
├── to-issues/                 # Track progress via issues/TASKS.md
└── codex-review/              # Self-review checklist
```

### Hooks (when .codex writable)

```
.codex/hooks/pre_task.sh  → Runs `graphify update .` + context reminder
```

### Context Boundary (Flexible — proven faster)

**Reference files (auto-read saat start task):**

1. `docs/lean-prd.md` — Roadmap, MVP priorities, success metrics
2. `AGENTS.md` — Commands, structure, conventions pointer

**Source code — BEBAS explore:**

- ✅ `app/`, `resources/`, `routes/`, `database/`, `Modules/` — baca bebas
- ✅ Migrations, seeders, models, controllers, views — baca bebas
- ✅ `graphify query` — pakai saat perlu orientasi arsitektur cepat
- ✅ `grep` / `find` — gunakan untuk locate file dengan cepat
- ✅ AI yang tentukan kapan perlu baca apa — tidak perlu izin

**Prinsip:** Requirement → PRD. Implementation → explore bebas. Quality → skills auto-trigger.

### File Editing

- **`apply_patch` sering gagal** karena line number mismatch → jangan retry > 1x
- **Fallback:** `sed -i` untuk edit kecil, `cat <<'EOF' > file` untuk rewrite
- `heredoc` (`<<'ENDOFFILE'`) lebih reliable untuk file baru/lengkap

### Workflow

```
User request
    │
    ▼
Baca lean-prd.md + AGENTS.md (orientasi)
    │
    ▼
graphify query / grep / baca source → pahami existing code
    │
    ▼
Skill: prd-tracker → Find next MVP item (jika perlu)
    │
    ▼
Skill: writing-plans + to-issues → Break down (jika fitur besar)
    │
    ▼
Implement → edit dengan sed/heredoc (hindari apply_patch)
    │
    ▼
Skill: systematic-debugging (if error)
    │
    ▼
Skill: verification-before-completion → build + test
    │
    ▼
Skill: codex-review → self-check
    │
    ▼
Update lean-prd.md: - [x] #N — Done DATE — PR #XX
```
