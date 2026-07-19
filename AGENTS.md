<!-- Generated: 2026-07-12 | Updated: 2026-07-17 | Verified: 2026-07-17 -->

# Sekolahku

Sistem manajemen sekolah (Laravel + Inertia.js React). ERP internal yang migrasi operasi sekolah manual ke digital.

**Tujuan:** Hosting murah (shared hosting), performa maksimal, throughput maksimal.

## Tech Stack

- **Backend:** Laravel 9, PHP 8.0+ + Symfony Components, Inertia.js (SSR nonaktif, Blade-injected)
- **Frontend:** React 18 + TypeScript (TSX), Vite + SWC, Tailwind CSS v4, shadcn/ui
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

## Sandbox Constraints (CRITICAL)

**Environment**: Codex sandbox = **read-only filesystem**, **no systemd**, **no network**, **no sudo**.

### Database Operations
- JANGAN retry DB connection > 2x
- JANGAN coba start service (mariadb/mysqld)
- JANGAN pakai `sudo` untuk DB
- JIKA DB gagal: SKIP migrate/seed/test, LANJUT static checks (`php -l`, `pnpm build`)
- CATAT di summary: "DB not available in sandbox, migrations ready for production"

### Migration Safety
- SEBELUM buat migration: `ls database/migrations/*$(basename slug)*` cek existing
- JIKA similar migration exists: STOP, gunakan yang ada, JANGAN buat baru

### Syntax Validation
- SETIAP write/edit `.php`: auto-run `php -l` via hook
- JIKA error: FIX immediately, JANGAN lanjut

## Key Entry Points

- Admin pages: `resources/js/Pages/Admin/*` -> auto-wrapped AppLayout
- Public pages: `resources/js/Pages/Frontend/*` -> self-contained
- Admin routes: `routes/admin.php` (middleware auth, role:)
- API (Orang Tua): `routes/api.php` (Sanctum)
- Lean PRD: `docs/lean-prd.md` (MVP priorities #1-9, migration phases, success metrics)

## Universal Rules (applies to every task)

1. **Ponytail** -- solusi paling sederhana yang bekerja. Hindari abstraksi yang tidak perlu. Hapus kode dikomentari.
2. **No Over-Fix** -- jangan over-engineer fix. Satu guard di shared function > guard di setiap caller. Fix root cause sekali, bukan symptom di setiap caller. (Ponytail: global lock ceiling, per-account lock jika throughput matter).
3. **Satu PR = satu masalah** -- atomic, fokus, testable.
4. **Minimal satu test** untuk logika baru (unit/feature).
5. **Migrasi reversible** -- down() konsisten dengan up(). Seed data untuk tabel baru.
   - **WAJIB**: Setiap migration WAJIB punya method `down()` yang reversible (drop table, drop column, rename back). Hook akan block jika missing `down()`.
6. **Aksesibilitas** -- WCAG 2.1 AA, label/aria/kontras/keyboard.
7. **Jangan commit .env** -- pakai .env.example.
8. **Shared hosting only** -- no Redis/Node.js di server. Lihat RULES.md.

## Referensi

Detail rules & conventions: **RULES.md**  
Project roadmap: **docs/lean-prd.md**  
GitHub summary: **README.md**

<!-- MANUAL: -->

## Skills (invoke manual)

Pakai `$nama-skill` di chat. Tidak auto-load — kamu tentukan kapan perlu.

| Skill | Kapan dipakai |
|-------|---------------|
| `$laravel-expert` | Backend Laravel, Eloquent, Spatie, migrations |
| `$senior-frontend` | React/TSX, shadcn/ui, Inertia, Tailwind |
| `$systematic-debugging` | Error 500, crash, root cause analysis |
| `$mysql-patterns` | Query复杂, join, performance |
| `$vite-patterns` | Build, HMR, Vite config |
| `$pr-review` | Self-review sebelum commit |
| `$writing-plans` | Fitur baru perlu breakdown |
| `$to-prd` | Konversi request ke PRD |

## Context Files

Auto-read saat start. Jangan dihapus isinya, justru expand kalau perlu.

| File | Fungsi |
|------|--------|
| `docs/lean-prd.md` | Roadmap MVP priorities, migration phases |
| `RULES.md` | Conventions, theme system, hosting deploy |
| `AGENTS.md` | Commands, structure, skill index (ini) |

## Source Code Explore

Bebas — baca file apa aja tanpa izin.

- `app/` — Models, Controllers, Services
- `resources/js/` — React/TSX pages + components
- `routes/` — web, admin, api, frontend
- `database/` — migrations + seeders

**Tools:** `grep`, `find`, `cat` — native, fast.

## Workflow

```
Request → Baca lean-prd.md (orientasi)
       → grep/cat/source (pahami kode)
       → Skill breakdown (jika fitur baru) → $writing-plans
       → Implement (sed/heredoc, bukan apply_patch)
       → systematic-debugging (if error)
       → build → pr-review → done
```

## Ponytail Rules

Default: **lite**

1. Solusi paling sederhana yang работает. No over-engineer.
2. Fix root cause, bukan symptom.
3. Hapus kode nggak butuh.
4. Minimal test untuk logic non-trivial.
