# Panduan Proyek Aider — Sekolahku ERP

## Gambaran Umum Proyek
**Sekolahku** adalah aplikasi manajemen sekolah (ERP) berbasis web yang dibangun dengan **Laravel 9.x + Inertia.js + React 18 (TypeScript)**. Stack modern: Vite, Tailwind CSS v4, shadcn/ui, Zustand, @tanstack/react-table, ApexCharts.

Target deployment: **Shared Hosting (tanpa Node.js runtime)** — build statis ke `public/build/`.

---

## Konvensi Wajib (Harus Diikuti)

### 1. Bahasa & Komunikasi
- **Semua** komentar kode, pesan commit, dokumentasi, dan komunikasi: **Bahasa Indonesia**.
- **Format Git Commit**: `[modul] jenis: deskripsi singkat`
  - Contoh: `[erp-id] refactor: support multi-currency untuk PPN`
  - `modul`: nama modul/area (mis. `erp-id`, `siswa`, `keuangan`, `bk`, dll.)
  - `jenis`: `feat` (fitur baru), `fix` (perbaikan bug), `refactor` (refactoring), `docs` (dokumentasi), `style` (format kode), `test` (test), `chore` (pemeliharaan), dll.
  - `deskripsi`: ringkasan perubahan dalam 1 kalimat, bahasa Indonesia.

### 2. Arsitektur Inertia.js (Server-Driven)
- **Controller → Inertia::render('Page', $data)** → **React Page (TSX)** menerima props.
- **Tidak** ada API terpisah. Data hanya lewat Inertia props (`props.flash`, `usePage().props`).
- **Form**: Wajib pakai `useForm` dari `@inertiajs/inertia-react`. **Dilarang** React Hook Form, Formik, `fetch()` manual.
- **Navigasi**: `Link` untuk tautan, `router.visit({ preserveScroll })` untuk keep scroll.

### 3. Resolusi Layout (Kritis)
| Path | Layout |
|------|--------|
| `Pages/Admin/*` | **Otomatis dibungkus `AppLayout`** (sidebar + topbar) |
| `Pages/Frontend/*`, `Pages/Spmb/*`, `Pages/Auth/*` | **Tidak** pakai `AppLayout` (self-contained) |

### 4. Standar UI & Komponen
- **Ikon**: Hanya `lucide-react` (import spesifik: `import { User } from 'lucide-react'`). **Dilarang** FontAwesome, Heroicons, @iconify, react-icons.
- **Komponen**: Wajib pakai shadcn/ui yang tersedia (Button, Input, Card, Badge, Checkbox, DropdownMenu, Label, Separator, Avatar, Sheet, Table, Pagination).
- **Tabel**: **Wajib** `@tanstack/react-table` + `Components/Pagination.tsx` (admin) / `Components/Frontend/Pagination.tsx` (publik). **Dilarang** `<table>` manual.
- **Form**: Setiap `<input>` wajib punya `<label htmlFor>`. Tombol wajib `type` eksplisit. Icon-only button wajib `aria-label`.
- **Border**: Pakai token theme `border-border` (bukan `border-gray-*`).

### 5. Manajemen State
- **Server state**: Inertia props (source of truth).
- **Client UI state**: `useState` / `useReducer` lokal.
- **Global client state**: Zustand (hanya jika benar-benar lintas halaman).

### 6. Generate PDF
- **Library**: `mpdf/mpdf` (v8.3) via `PdfService` (`app/Services/PdfService.php`).
- **Template**: Blade view di `resources/views/pdf/`.
- **Font**: DejaVu Sans (UTF-8 Bahasa Indonesia).
- **Dilarang** dompdf / barryvdh-laravel-dompdf.

### 7. Prinsip Ponytail (Frontend)
> "Pilih solusi sederhana yang bekerja; hindari abstraksi tidak perlu."
- YAGNI: Jangan buat master table sampai modul butuh.
- Satu controller untuk polymorphic (contoh: `PembayaranController` handle SPP, UKS, Seragam).
- Validasi inline cukup; FormRequest terpisah hanya jika rules > 10 field kompleks.
- Admin auto-verify (skip pending), role lain butuh verifikasi.

---

## Struktur Proyek (Path Penting)

```
app/
├── Http/Controllers/Admin/     # Controller admin (Inertia)
├── Http/Controllers/Frontend/  # Controller publik
├── Http/Controllers/Api/       # Sanctum API (absensi GPS, dll.)
├── Models/                     # Eloquent models
├── Services/                   # PdfService, dll.
├── Observers/                  # SiswaObserver, dll.
└── Console/Commands/           # Artisan commands (siswa:promote, dll.)

resources/js/
├── Pages/
│   ├── Admin/                  # Halaman admin (auto-wrap AppLayout)
│   │   ├── Siswa/              # Landing, Tingkat, CRUD
│   │   ├── BukuInduk/          # Index, Show, Cetak (PDF)
│   │   ├── Rapor*/             # E-Rapor (Kelas, Mapel, Siswa)
│   │   ├── BK/                 # Pelanggaran, Konseling, Prestasi
│   │   ├── Absensi/            # Index, Kelas, Rekap, Guru
│   │   ├── Settings/           # Index, DataInstansi, Legalitas, Konfigurasi
│   │   ├── Kurikulum/          # Index, Create, Edit, Mapels, SKBM, Kalender
│   │   ├── Pembayaran/         # Polymorphic (SPP, UKS, Seragam)
│   │   ├── Notification/       # Index
│   │   └── ... (Website, TU, Alumni, Perpustakaan, Sarana, dll.)
│   ├── Frontend/               # Halaman publik (no AppLayout)
│   │   ├── Berita/, Alumni/, Guru/, ProfileSekolah/, VisiMisi/
│   ├── Spmb/                   # PPDB/SPMB publik
│   └── Auth/                   # Login, Register
├── Components/
│   ├── ui/                     # shadcn/ui components
│   ├── AdminTable.tsx          # Wrapper TanStack Table + Pagination
│   ├── Pagination.tsx          # Admin pagination
│   ├── Frontend/Pagination.tsx # Public pagination
│   └── Layout/
│       ├── AppLayout.tsx       # Sidebar + Topbar (admin)
│       └── FrontendLayout.tsx  # Public layout
├── Layout/Head.tsx             # Named export { Head }
├── hooks/                      # useCountUp, useDebounce, dll.
├── lib/utils.ts                # cn(), dll.
└── types/                      # TypeScript interfaces

routes/
├── web.php                     # Public + Auth routes
├── admin.php                   # Admin routes (middleware auth, role)
└── api.php                     # Sanctum API routes

database/
├── migrations/                 # Semua migrasi (termasuk pivot, polymorphic)
└── seeders/                    # RolePermissionSeeder, ArsipAkreditasiSeeder, dll.
```

---

## Perintah Umum

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
# npm run test        # Vitest (jika dikonfigurasi)

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

## Catatan Penting untuk AI

### JANGAN LAKUKAN
- ❌ Gunakan `fetch()` / `axios` manual untuk Inertia → pakai `router.post/put/delete` atau `useForm`.
- ❌ Buat `<table>` manual → wajib `@tanstack/react-table`.
- ❌ Pakai FontAwesome / Heroicons / react-icons → hanya `lucide-react`.
- ❌ Pakai `border-gray-*` → pakai `border-border`.
- ❌ Pakai dompdf/barryvdh untuk PDF → pakai `mpdf/mpdf` via `PdfService`.
- ❌ Derive kolom `variant` di `kelas` dari `nama_kelas` → kolom `variant` sudah ada (migrasi `2026_07_19_000001`).
- ❌ Bungkus `Pages/Admin/*` dengan `<AppLayout>` manual → Inertia auto-wrap via `app.jsx`.
- ❌ Import `Head` sebagai default → `import { Head } from '@/Layout/Head'` (named export).
- ❌ Buat controller terpisah per jenis tagihan (SPP/UKS/Seragam) → `PembayaranController` polymorphic handle semua.

### BEST PRACTICES
- ✅ Semua form pakai `useForm` + `FormData` untuk file upload.
- ✅ Flash message lewat `props.flash` (Inertia default).
- ✅ Pagination pakai `Components/Pagination.tsx` (admin) / `Frontend/Pagination.tsx` (publik).
- ✅ Validasi file upload: `image/*,.pdf` max 2MB (SPP, Pembayaran, Import Excel).
- ✅ Soft delete pakai trait `SoftDeletes` (Siswa, dll.).
- ✅ Observer untuk side-effect (SiswaObserver → auto-create User, log password).
- ✅ Artisan command untuk batch (siswa:promote naik kelas massal).
- ✅ Migration reversible (semua `down()` drop columns/tables dengan benar).
- ✅ Enum status pakai label Indonesia (Aktif/Lulus/Pindah/Keluar, Hadir/Terlambat/Izin/Sakit/Alpa).
- ✅ Search + filter kombinasi di Index pages (TanStack Table globalFilter + column filters).

---

## Status Modul Saat Ini (2026-07-19)

| Modul | Status | Catatan |
|-------|--------|---------|
| **SPMB 2026** | ✅ Selesai | 4 jalur, TKA, Ranking, 7 tabel baru |
| **PPDB** | ✅ Selesai | Sync calon siswa, auto-create user ortu, tagihan awal |
| **SPP & Keuangan** | ✅ Selesai | Portal ortu, dispensasi/beasiswa, export laporan |
| **Perpustakaan + PWA** | ✅ Selesai | QR digital, e-book, bebas pustaka alumni |
| **Alumni** | 🔄 In Progress | Tracer study, forum bisnis, donasi |
| **Website/CMS** | ✅ Selesai | Integrasi berita PPDB/Alumni, galeri prestasi |
| **E-Rapor Kemendikbud** | ✅ Basis Siap | 8 tabel, butuh PDF generator & UI input nilai P5 |
| **Buku Induk Digital** | ✅ Selesai | Profil, Medis, Ortu, Mutasi, Cetak PDF (mPDF + browser) |
| **Absensi Digital (GPS)** | ✅ MVP Selesai | Siswa/Guru PWA, Manual Admin, Rekap CSV, Settings radius |
| **Konseling & BK** | ✅ MVP Selesai | Pelanggaran, Prestasi, Konseling, Form fix (no double sidebar) |
| **Kurikulum & Jadwal** | ✅ Terekspos | CRUD, Mapels, SKBM, Kalender Akademik, Sidebar |
| **TU (Surat, NISN, Arsip)** | ✅ Selesai | Surat Masuk/Keluar, NISN Management, Arsip Akreditasi (47 docs seeded) |
| **Pembayaran Polymorphic** | ✅ Selesai | SPP, UKS, Seragam via `PembayaranController` |
| **Notifications** | ✅ Full Stack | Table, Controller, UI, Sidebar, Header Bell |
| **WhatsApp Gateway Config** | ✅ Selesai | Settings: URL, API Key, Nomor, Template |
| **Settings (Instansi, Legalitas, Hero)** | ✅ Selesai | Foto/Video Hero, Tema 5 warna, Bank, SPP config |

---

## File Referensi Kunci

| File | Deskripsi |
|------|-----------|
| `docs/lean-prd.md` | PRD lengkap, MVP, roadmap, implementation log |
| `resources/js/Pages/Admin/*/Index.tsx` | Pola AdminTable + inline modal CRUD |
| `resources/js/Pages/Admin/BukuInduk/Cetak.tsx` | Pola cetak PDF (client + server) |
| `app/Services/PdfService.php` | Wrapper mPDF reusable |
| `app/Http/Controllers/Admin/PembayaranController.php` | Pola polymorphic payment |
| `app/Observers/SiswaObserver.php` | Pola auto-create user |
| `routes/admin.php` | Konvensi naming route (bare namespace `Admin\...`) |
| `resources/js/Layout/AppLayout.tsx` | Struktur sidebar (menu → submenu, roles, keywords) |

---

## Checklist Deployment (Shared Hosting)

1. `pnpm run build` → upload `public/build/` **wajib**.
2. `composer install --optimize-autoloader --no-dev`.
3. `cp .env.example .env` → set `APP_ENV=production`, `APP_DEBUG=false`, DB credentials.
4. `php artisan key:generate` (jika belum).
5. `php artisan config:cache && php artisan route:cache && php artisan view:cache`.
6. `php artisan migrate --force --optimize-autoloader`.
7. `php artisan storage:link`.
8. `chmod -R 755 storage bootstrap/cache`.
9. OPcache config (`.user.ini`): `opcache.enable=1`, `memory_consumption=192`, `max_accelerated_files=20000`, `validate_timestamps=1`, `revalidate_freq=60`.
10. Cron: `* * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1`.

---

## Kontak / Dukungan
- Email: **andridesmana29@outlook.com**
- Repo: **github.com/andes2912/sekolahku**
- Package: **IndoBank** (github.com/andes2912/indobank) — data bank Indonesia.

---

**Catatan:** File ini adalah panduan untuk Aider. Selalu rujuk `docs/lean-prd.md` untuk detail terbaru.