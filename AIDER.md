# Aider Project Instructions — Sekolahku ERP

## Project Overview
**Sekolahku** is a school management ERP (Enterprise Resource Planning) built with **Laravel 9.x + Inertia.js + React 18 (TypeScript)**. Modern stack: Vite, Tailwind CSS v4, shadcn/ui, Zustand, @tanstack/react-table, ApexCharts.

Target deployment: **Shared Hosting (no Node.js runtime)** — static build to `public/build/`.

---

## Key Conventions (Mandatory)

### 1. Language & Communication
- **All** code comments, commit messages, documentation, and communication: **Bahasa Indonesia**.
- See `CONVENTIONS.md` for commit format: `[modul] type: description`.

### 2. Inertia.js Architecture (Server-Driven)
- **Controller → Inertia::render('Page', $data)** → **React Page (TSX)** receives props.
- **No separate API**. Data only via Inertia props (`props.flash`, `usePage().props`).
- **Forms**: Must use `useForm` from `@inertiajs/inertia-react`. **Forbidden**: React Hook Form, Formik, manual `fetch()`.
- **Navigation**: `Link` for links, `router.visit({ preserveScroll })` for scroll preservation.

### 3. Layout Resolution (Critical)
| Path | Layout |
|------|--------|
| `Pages/Admin/*` | **Auto-wrapped with `AppLayout`** (sidebar + topbar) |
| `Pages/Frontend/*`, `Pages/Spmb/*`, `Pages/Auth/*` | **No `AppLayout`** (self-contained) |

### 4. UI & Component Standards
- **Icons**: Only `lucide-react` (specific imports: `import { User } from 'lucide-react'`). **Forbidden**: FontAwesome, Heroicons, @iconify, react-icons.
- **Components**: Must use available shadcn/ui (Button, Input, Card, Badge, Checkbox, DropdownMenu, Label, Separator, Avatar, Sheet, Table, Pagination).
- **Tables**: **Must** use `@tanstack/react-table` + `Components/Pagination.tsx` (admin) / `Components/Frontend/Pagination.tsx` (public). **Forbidden**: manual `<table>`.
- **Forms**: Every `<input>` must have `<label htmlFor>`. Buttons must have explicit `type`. Icon-only buttons must have `aria-label`.
- **Borders**: Use theme token `border-border` (not `border-gray-*`).

### 5. State Management
- **Server state**: Inertia props (source of truth).
- **Client UI state**: `useState` / `useReducer` local.
- **Global client state**: Zustand (only if truly cross-page).

### 6. PDF Generation
- **Library**: `mpdf/mpdf` (v8.3) via `PdfService` (`app/Services/PdfService.php`).
- **Templates**: Blade views in `resources/views/pdf/`.
- **Font**: DejaVu Sans (UTF-8 Bahasa Indonesia).
- **Forbidden**: dompdf / barryvdh-laravel-dompdf.

### 7. Ponytail Principles (Frontend)
> "Choose simple solutions that work; avoid unnecessary abstractions."
- YAGNI: Don't create master tables until module needs them.
- Single controller for polymorphic (e.g., `PembayaranController` handles SPP, UKS, Uniform).
- Inline validation sufficient; separate FormRequest only if rules > 10 complex fields.
- Admin auto-verify (skip pending), other roles need verification.

---

## Project Structure (Key Paths)

```
app/
├── Http/Controllers/Admin/     # Admin controllers (Inertia)
├── Http/Controllers/Frontend/  # Public controllers
├── Http/Controllers/Api/       # Sanctum API (GPS attendance, etc.)
├── Models/                     # Eloquent models
├── Services/                   # PdfService, etc.
├── Observers/                  # SiswaObserver, etc.
└── Console/Commands/           # Artisan commands (siswa:promote, etc.)

resources/js/
├── Pages/
│   ├── Admin/                  # Admin pages (auto-wrap AppLayout)
│   │   ├── Siswa/              # Landing, Tingkat, CRUD
│   │   ├── BukuInduk/          # Index, Show, Cetak (PDF)
│   │   ├── Rapor*/             # E-Rapor (Kelas, Mapel, Siswa)
│   │   ├── BK/                 # Violations, Counseling, Achievements
│   │   ├── Absensi/            # Index, Kelas, Rekap, Guru
│   │   ├── Settings/           # Index, DataInstansi, Legalitas, Konfigurasi
│   │   ├── Kurikulum/          # Index, Create, Edit, Mapels, SKBM, Calendar
│   │   ├── Pembayaran/         # Polymorphic (SPP, UKS, Uniform)
│   │   ├── Notification/       # Index
│   │   └── ... (Website, TU, Alumni, Library, Facilities, etc.)
│   ├── Frontend/               # Public pages (no AppLayout)
│   │   ├── Berita/, Alumni/, Guru/, ProfileSekolah/, VisiMisi/
│   ├── Spmb/                   # Public PPDB/SPMB
│   └── Auth/                   # Login, Register
├── Components/
│   ├── ui/                     # shadcn/ui components
│   ├── AdminTable.tsx          # TanStack Table + Pagination wrapper
│   ├── Pagination.tsx          # Admin pagination
│   ├── Frontend/Pagination.tsx # Public pagination
│   └── Layout/
│       ├── AppLayout.tsx       # Sidebar + Topbar (admin)
│       └── FrontendLayout.tsx  # Public layout
├── Layout/Head.tsx             # Named export { Head }
├── hooks/                      # useCountUp, useDebounce, etc.
├── lib/utils.ts                # cn(), etc.
└── types/                      # TypeScript interfaces

routes/
├── web.php                     # Public + Auth routes
├── admin.php                   # Admin routes (auth, role middleware)
└── api.php                     # Sanctum API routes

database/
├── migrations/                 # All migrations (pivot, polymorphic)
└── seeders/                    # RolePermissionSeeder, ArsipAkreditasiSeeder, etc.
```

---

## Common Commands

```bash
# Development
composer install
pnpm install
pnpm run dev          # Vite HMR + Laravel server (concurrently)
php artisan serve     # Laravel only (port 8000)

# Production Build
pnpm run build        # Output: public/build/ (hashed assets)

# Database
php artisan migrate --seed
php artisan migrate:fresh --seed

# Testing
php artisan test      # Pest PHP
# npm run test        # Vitest (if configured)

# Code Quality
./vendor/bin/pint     # Laravel Pint (PHP CS Fixer)
# npm run lint        # ESLint (JS/TS)

# Queue & Schedule (Production)
php artisan queue:work --stop-when-empty --max-time=60
php artisan schedule:run

# Storage
php artisan storage:link

# Cache Optimization (Production)
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer dump-optimizer
```

---

## Important Notes for AI

### DO NOT
- ❌ Use manual `fetch()` / `axios` for Inertia → use `router.post/put/delete` or `useForm`.
- ❌ Create manual `<table>` → must use `@tanstack/react-table`.
- ❌ Use FontAwesome / Heroicons / react-icons → only `lucide-react`.
- ❌ Use `border-gray-*` → use `border-border`.
- ❌ Use dompdf/barryvdh for PDF → use `mpdf/mpdf` via `PdfService`.
- ❌ Derive `variant` column in `kelas` from `nama_kelas` → `variant` column exists (migration `2026_07_19_000001`).
- ❌ Manually wrap `Pages/Admin/*` with `<AppLayout>` → Inertia auto-wraps via `app.jsx`.
- ❌ Import `Head` as default → `import { Head } from '@/Layout/Head'` (named export).
- ❌ Create separate controllers per payment type (SPP/UKS/Uniform) → `PembayaranController` polymorphic handles all.

### BEST PRACTICES
- ✅ All forms use `useForm` + `FormData` for file uploads.
- ✅ Flash messages via `props.flash` (Inertia default).
- ✅ Pagination uses `Components/Pagination.tsx` (admin) / `Frontend/Pagination.tsx` (public).
- ✅ File upload validation: `image/*,.pdf` max 2MB (SPP, Payments, Excel Import).
- ✅ Soft delete with `SoftDeletes` trait (Siswa, etc.).
- ✅ Observers for side-effects (SiswaObserver → auto-create User, log password).
- ✅ Artisan commands for batch (siswa:promote mass grade promotion).
- ✅ Reversible migrations (all `down()` drop columns/tables correctly).
- ✅ Enum status with Indonesian labels (Aktif/Lulus/Pindah/Keluar, Hadir/Terlambat/Izin/Sakit/Alpa).
- ✅ Search + filter combination in Index pages (TanStack Table globalFilter + column filters).

---

## Current Module Status (2026-07-19)

| Module | Status | Notes |
|--------|--------|-------|
| **SPMB 2026** | ✅ Done | 4 pathways, TKA, Ranking, 7 new tables |
| **PPDB** | ✅ Done | Sync candidates, auto-create parent users, initial billing |
| **SPP & Finance** | ✅ Done | Parent portal, dispensation/scholarship, export reports |
| **Library + PWA** | ✅ Done | Digital QR, e-books, alumni free library |
| **Alumni** | 🔄 In Progress | Tracer study, business forum, donations |
| **Website/CMS** | ✅ Done | PPDB/Alumni news integration, achievement gallery |
| **E-Rapor Kemendikbud** | ✅ Base Ready | 8 tables, needs PDF generator & P5 input UI |
| **Digital Buku Induk** | ✅ Done | Profile, Medical, Parents, Mutations, PDF Print (mPDF + browser) |
| **Digital Attendance (GPS)** | ✅ MVP Done | Student/Teacher PWA, Manual Admin, CSV Rekap, Radius Settings |
| **Counseling & BK** | ✅ MVP Done | Violations, Achievements, Counseling, Form fixes (no double sidebar) |
| **Curriculum & Schedule** | ✅ Exposed | CRUD, Mapels, SKBM, Academic Calendar, Sidebar |
| **TU (Letters, NISN, Archive)** | ✅ Done | In/Out Letters, NISN Management, Accreditation Archive (47 seeded) |
| **Polymorphic Payments** | ✅ Done | SPP, UKS, Uniform via `PembayaranController` |
| **Notifications** | ✅ Full Stack | Table, Controller, UI, Sidebar, Header Bell |
| **WhatsApp Gateway Config** | ✅ Done | Settings: URL, API Key, Number, Template |
| **Settings (Institute, Legal, Hero)** | ✅ Done | Photo/Video Hero, 5 Themes, Bank, SPP Config |

---

## Key Reference Files

| File | Description |
|------|-------------|
| `CONVENTIONS.md` | Commit message & language rules |
| `docs/lean-prd.md` | Full PRD, MVP, roadmap, implementation log |
| `resources/js/Pages/Admin/*/Index.tsx` | AdminTable + inline modal CRUD pattern |
| `resources/js/Pages/Admin/BukuInduk/Cetak.tsx` | PDF print pattern (client + server) |
| `app/Services/PdfService.php` | Reusable mPDF wrapper |
| `app/Http/Controllers/Admin/PembayaranController.php` | Polymorphic payment pattern |
| `app/Observers/SiswaObserver.php` | Auto-create user pattern |
| `routes/admin.php` | Route naming convention (bare namespace `Admin\...`) |
| `resources/js/Layout/AppLayout.tsx` | Sidebar structure (menu → submenu, roles, keywords) |

---

## Deployment Checklist (Shared Hosting)

1. `pnpm run build` → upload `public/build/` **mandatory**.
2. `composer install --optimize-autoloader --no-dev`.
3. `cp .env.example .env` → set `APP_ENV=production`, `APP_DEBUG=false`, DB credentials.
4. `php artisan key:generate` (if not done).
5. `php artisan config:cache && php artisan route:cache && php artisan view:cache`.
6. `php artisan migrate --force --optimize-autoloader`.
7. `php artisan storage:link`.
8. `chmod -R 755 storage bootstrap/cache`.
9. OPcache config (`.user.ini`): `opcache.enable=1`, `memory_consumption=192`, `max_accelerated_files=20000`, `validate_timestamps=1`, `revalidate_freq=60`.
10. Cron: `* * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1`.

---

## Contact / Support
- Email: **andridesmana29@outlook.com**
- Repo: **github.com/andes2912/sekolahku**
- Package: **IndoBank** (github.com/andes2912/indobank) — Indonesian bank data.

---

**Note:** This file guides Aider. Always reference `CONVENTIONS.md` and `docs/lean-prd.md` for latest details.