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

| Task | Command |
|------|---------|
| Install PHP deps | `composer install` |
| Install JS deps | `pnpm install` |
| Dev server | `pnpm run dev` (Vite HMR) |
| Build (prod) | `pnpm run build` to public/build/ |
| Test backend | `php artisan test` |
| Test frontend | `pnpm test` (Vitest) |
| Migrate | `php artisan migrate` |
| Fresh + seed | `php artisan migrate:fresh --seed` |
| Route check | `php artisan route:list` |
| Cache (prod) | `php artisan config:cache && php artisan route:cache && php artisan view:cache` |
| Optimize autoload | `composer install --optimize-autoloader --no-dev` |

## Structure

| Directory | Purpose |
|-----------|---------|
| `app/` | Laravel backend (Models, Controllers, Policies, Observers) |
| `resources/js/` | React/TSX frontend (Inertia pages, components, store) |
| `routes/` | Route files per domain (web, admin, frontend, api) |
| `database/` | Migrations + seeders (must be reversible) |
| `Modules/` | Legacy nWidart Blade modules coexisting with Inertia |
| `tests/` | PHPUnit feature/unit tests |
| `docs/` | Dokumentasi (lean-prd.md = roadmap MVP) |
| `public/` | Compiled assets, sw.js, manifest.json, offline.html |

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
