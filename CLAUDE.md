# CLAUDE.md – Project‑Specific Instructions for Sekolahku

## Purpose
This file provides guidance to Claude Code agents (especially `laravel-specialist` and `frontend-design`) when working on the Sekolahku school‑management system. It should be read together with the Lean PRD located at `docs/lean-prd.md`.

## Project Overview
Sekolahku is a Laravel‑based web application for school management. Core modules already completed:
- Website Sekolah
- Penerimaan Peserta Didik Baru (PPDB)
- Perpustakaan
- Sistem Pembayaran SPP

The next phase consists of targeted improvements outlined in the PRD. The goal is to create a fully integrated system where data flows smoothly between modules (PPDB → Siswa & Akun Orang Tua → SPP/Portal Orang Tua → Alumni) while adopting a modern stack.

## General Guidelines
- Follow the **Ponytail** principle: prefer the simplest solution that works; avoid unnecessary abstractions.
- Keep changes focused and testable. Write a minimal test (unit or feature) for any new logic.
- Ensure migrations are reversible and seed data is provided for new features.
- Keep the codebase clean: remove commented‑out code, adhere to Laravel naming conventions, and use type‑hinting where possible.
- All new UI components must be accessible (WCAG 2.1 AA) and responsive.

## Reusable Frontend Code Patterns (Inertia React)

Semua kode React baru di `resources/js/` WAJIB mengikuti pola di bawah. Lihat `docs/lean-prd.md` untuk versi lengkap dengan kode contoh.

### Routing & Data
- **Form handling**: WAJIB `useForm` dari `@inertiajs/inertia-react`. Jangan React Hook Form, Formik, atau `fetch()`.
- **Data fetching**: via Inertia props saja. Controller kirim `Inertia::render('Page', [...])`, page terima via destructured props. Shared props via `usePage().props`.
- **File upload**: `useState` + `FormData` + `Inertia.post()`.

### Tables
- **WAJIB** `@tanstack/react-table` untuk semua tabel baru. Jangan `<table>` manual.
- Pagination: package `Components/Pagination.tsx` (admin), `Components/Frontend/Pagination.tsx` (public).

### Layout Resolution
- `Pages/Admin/*` → otomatis dibungkus AppLayout (sidebar + topbar).
- `Pages/Frontend/*`, `Pages/Spmb/*`, `Pages/Auth/*` → TIDAK dibungkus AppLayout (self-contained).
- Override: export `.layout = GuestLayout` pada page.

### Icons
- WAJIB `lucide-react`, import spesifik untuk tree-shaking `import { User } from 'lucide-react'`.
- Dynamic: `<Icon name="User" />` dari `@/lib/icons`.
- Jangan FontAwesome, Heroicons, @iconify/react, react-icons.

### Components
| shadcn/ui siap pakai | Radix tersedia (belum di-wrap) |
|---|---|
| Button, Input, Card, Badge, Checkbox | Accordion, Collapsible, Popover |
| DropdownMenu, Label, Separator | Progress, RadioGroup, Select |
| Avatar, Sheet | Switch, Tabs, Tooltip |

### State & Validation
- **Zustand** untuk global state. Buat store di `resources/js/store/`.
- **Arktype** untuk runtime validation (opsional, belum dipakai di pages).

### Flash Messages
Controller: `->with('success', '...')` → otomatis di-render AppLayout. Tidak perlu render manual.

### Aksesibilitas
- Setiap `<input>` harus punya `<label>` dengan `htmlFor`.
- Tombol harus punya `type` eksplisit (`button`, `submit`, `reset`).
- Icon-only button harus punya `aria-label`.

## Instructions for Laravel‑Specialist

### 1. **PPDB. PPDB Enhancements
1. **Auto‑sync accepted applicants to Siswa**
   - Create an observer or event listener on `PpdbApplicant` model when status changes to `lulus`.
   - Insert a new record into `siswa` table, copying relevant fields (nisn, nama, tanggal_lahir, etc.).
   - Generate a default password and create a related `users` record with role `ortu`.
   - Send email with credentials using Laravel Mail (use a queued mail job).
2. **Integrasi pendaftaran PPDB ke SPP**
   - When creating the initial SPP tagihan for a new siswa, reference the pendaftaran fee from the PPDB record.
   - Store the amount in the `spp_tagihan` table with keterangan “Uang Pendaftaran PPDB".

### 2. SPP Enhancements
1. **Portal Orang Tua Integration**
   - Expose a read‑only API route (`/api/orangtua/spp`) that returns invoices, payment history, and outstanding balance for the authenticated orang tua.
   - Use Laravel Sanctum or Passport for token protection; the frontend will consume this via Inertia.
   - Ensure pagination and proper date formatting.
2. **Dispensasi & Beasiswa**
   - Add `dispensasi` table (siswa_id, jenis, nilai, mulai, sampai, keterangan).
   - Create CRUD interface (admin) for managing dispensasi.
   - Modify the tuition calculation service to subtract dispensasi amount before generating tagihan.
3. **Export Laporan Keuangan**
   - Implement an export controller that builds a query of `spp_pembayaran` (or `spp_tagihan`) filtered by bulanan/tahunan.
   - Use Laravel Excel (or Maatwebsite) to generate .xlsx and .pdf outputs.
   - Queue the export job for large datasets and notify user via email when ready.

### 3. Perpustakaan → PWA
- Add a service worker (`public/sw.js`) and manifest (`manifest.json`) that registers when the user visits `/perpustakaan`.
- Implement QR code generation for Anggota Digital using a library like `bacon/bacon-qr-code`; store the SVG or PNG in storage and display on user profile.
- Provide an endpoint to upload PDF e‑books; validate mime type and size; store in `storage/app/public/ebooks`.
- Create a simple e‑book reader page that streams the PDF via `<iframe>` or uses PDF.js.

### 4. Alumni Module
- Build `alumni` table with fields: `user_id`, `tahun_lulus`, `pekerjaan`, `alamat`, `no_telp`, `linkedin`, etc.
- Create a straightforward CRUD (admin) and a public alumni directory (optional).
- For Tracer Study, create a `tracer_studies` table linking to alumni; generate a Google‑Form‑like questionnaire via Laravel Form Builder or simple Blade form; store responses.
- Forum: basic threads & replies with pagination; integrate with Laravel’s built‑in authentication for posting.
- Donasi: simple donation form that records `donasi` (alumni_id, nominal, tanggal, metode, keterangan) and optionally sends a thank‑you email.

### 5. Website Sekolah / CMS
- Create a `berita` table (judul, isi, tanggal, sumber `ppdb`/`alumni`, status).
- Observer: when a PPDB selection result is marked `lulus`, auto‑create a berita with headline “Pengumuman PPDB [Tanggal] – X Siswa Lulus”.
- Similarly, when an alumni event is created, generate a berita.
- Build a simple CMS (admin) to manage berita; expose a public route `/berita` and `/berita/{slug}` for frontend.
- Galeri prestasi: create `prestasi` siswa table linked to `siswa` with fields: `jenis` (akademik/non‑akademik), `prestasi`, `tingkat`, `tanggal`, `bukti` (file upload). Provide admin CRUD and a public gallery page.

### 6. Technical Stack Requirements
- **OpCache**: add/edit `.user.ini` in project root with:
  ```
  opcache.enable=1
  opcache.memory_consumption=192
  opcache.max_accelerated_files=20000
  opcache.validate_timestamps=1
  opcache.revalidate_freq=60
  ```
- **Query Optimization**: audit all Eloquent queries in controllers and services; replace `get()` with `paginate()` where appropriate; add `with()` for eager relationships; add indexes via migrations.
- **Queue**: ensure `queue:work --stop-when-empty` runs via supervisor or cron; configure `.env` with `QUEUE_CONNECTION=database` (or redis/sqs if available).
- **Session Storage**: use database driver for persisting sessions; run `php artisan session:table` and migrate; set `SESSION_DRIVER=database` in `.env`.
- **Frontend**: Tailwind CSS v4 via `@tailwindcss/vite` plugin + shadcn/ui components. Key packages: `lucide-react` (icons — lightweight, modern, tree-shakable), `class-variance-authority` + `tailwind-merge` + `clsx` (shadcn/ui foundation), `apexcharts` + `react-apexcharts` (dashboard charts), `@tanstack/react-table` (data tables), `simplebar` + `simplebar-react` (custom scrollbar), `tailwind-sidebar` (sidebar layout), `zustand` (state management), `arktype` (runtime validation), `@vitejs/plugin-react-swc` (SWC-based React compiler — replaces `@vitejs/plugin-react` for dev-server stability with laravel-vite-plugin). No Bootstrap or DaisyUI. School colors (navy #003366, emerald #28A745) defined in `resources/css/app.css` using `@theme` directive.

**Icon Policy:** Gunakan **lucide-react** untuk semua icon. Jangan gunakan FontAwesome, Heroicons, atau icon library lain. Lucide lebih ringan (~7KB per icon dengan tree-shaking), modern, dan konsisten dengan design system shadcn/ui.
- **PWA**: run `pnpm build` to ensure assets are compiled; test offline functionality.

### 7. **Development Best Practices to Prevent Common Errors**
   - **Route File Syntax**: When editing `routes/web.php`, always verify that all opening braces `{`, parentheses `(` and brackets `[` have corresponding closing ones. Run `php artisan route:list` after changes to verify routes are registered correctly.
   - **Migration Foreign Keys**: When creating foreign key constraints in migrations, explicitly reference the correct table name when needed (e.g., `$table->foreignId('user_id')->constrained('users')` instead of relying on implicit naming). Always test migrations on a fresh using `php artisan migrate:fresh` before running in development.
   - **Migration Down Methods**: Ensure the `down()` method uses the exact table name as defined in `up()` (e.g., `Schema::dropIfExists('table_name')`).
   - **Blade Syntax**: When editing Blade files, always verify that all `@` directives are properly closed (e.g., `@if` with `@endif`, `@foreach` with `@endforeach`).
   - **Composer Dependencies**: After modifying `composer.json`, run `composer install` and test the application before committing.
   - **Environment Variables**: Never commit `.env` file. Use `.env.example` for sharing structure.
   - **Testing Routes**: After defining routes, test them using `php artisan route:list` or in the browser.
    - **Route Groups**: When nesting route groups (especially with middleware), double-check that all groups are properly closed with matching `});` statements.
    - **Error Pages**: Gunakan template standalone (`resources/views/errors/`) untuk halaman error HTTP (404, 403, 500, 419). Template ini harus inline CSS (tanpa dependensi Vite/manifest) agar tetap muncul saat terjadi error. Tersedia di: `errors/404.blade.php`, `errors/403.blade.php`, `errors/500.blade.php`, `errors/419.blade.php`.

## Instructions for Frontend‑Design Specialist

The UI should reflect a clean, professional, and trustworthy school‑management feel—think “in line‑think of a blend of corporate reliability and educational approachability.

### Visual Direction
- **Primary Colour**: Navy Blue (#003366) – conveys trust and authority.
- **Secondary Colour**: White / Light Gray for backgrounds and cards.
- **Accent Colour**: Emerald Green (#28A745) for success actions (e.g., submit, approve).
- **Typography**: **Inter** (Google Fonts) – Font internasional yang dioptimalkan untuk layar, dipilih karena:
  - Highly readable pada semua ukuran dan resolusi layar
  - Digunakan oleh produk modern seperti Vercel, GitHub, Stripe, dan Figma
  - Variable weights (300-800) untuk hierarki visual yang jelas
  - Mencerminkan identitas sekolah internasional yang profesional dan modern
  - Fallback: system fonts (`-apple-system`, `BlinkMacSystemFont`, `sans-serif`)

### Layout & Components
- **Layout**: Use the tailwind-admin-reactjs-free template as a base; keep the left‑sidebar navigation compact but expandable on hover.
- **Header**: Show school logo on the left, user avatar & notifications on the right.
- **Forms**: Use shadcn/ui form components with custom Tailwind theme:
  - Input fields: subtle border‑radius using shadcn/ui, navy focus ring.
  - Buttons: shadcn/ui Button with variant="default" (navy), hover → lighter navy; disabled → muted.
  - Success messages: use the accent emerald (`#28A745`) with a check‑icon.
- **Tables**: Server‑side pagination via Inertia; show row numbers, action buttons (Edit, Delete) in the last column; use hover‑highlight and striped rows.
- **Modals**: Centered, with a subtle overlay; header in navy, body white.
- **Navigation**: Active link highlighted with a thick navy left border (4px).
- **Dashboard**: Use cards with icons; each card displays a summary (e.g., total siswa, total pembayaran bulan ini). Include a small sparkline or progress bar where relevant.
- **Responsiveness**: Ensure side‑nav collapses to a top‑hamburger menu on < 768 px width; all tables become scroll‑able horizontally.
- **Accessibility**:
  - All form inputs must have associated `<label>` elements.
  - Use sufficient contrast (≥ 4.5:1 for normal text, ≥ 3:1 for large text).
  - Ensure keyboard navigation is logical; avoid trapping focus.
  - Provide ARIA labels for custom components (modals, dropdowns).
- **Micro‑interactions**:
  - Button hover: slight scale (1.02) and shadow increase.
  - Form input focus: glow effect using box‑shadow.
  - Table row click (for selectable rows): change background to a very light navy.
  - Notification toast: slide‑in from top‑right, auto‑dismiss after 5 s.
- **PWA Specifics**:
  - Create a simple offline page (`offline.html`) that shows a friendly message and a button to retry.
  - Manifest: name “Sekolahku Perpustakaan”, short name “Perpustakaan”, icons at 192 px and 512 px (use school logo).
  - Theme color: navy (`#003366`), background color: white.
  - When offline, service worker should cache core assets (CSS, JS, fallback images) and show the offline page for navigation attempts.

### Implementation Steps
1. **Setup**: 
   - Run `pnpm install` if not already done.
   - Ensure `resources/js/app.js` bootstraps Inertia, React, and Zustand.
   - Import the chosen Google Fonts in `resources/css/app.css` (or via `<link>` in the main layout).
2. **Layout Integration**:
   - Copy the Mazer template’s `layouts/app.blade.php` (or equivalent) into `resources/views/layouts/app.blade.php`.
   - Replace placeholder content with the Laravel‑Blade `@yield('content')` wrapper for Inertia.
   - Adjust the sidebar menu items to match the modules: Dashboard, Siswa, PPDB, SPP, Perpustakaan, Alumni, Laporan, Pengguna, Settings.
3. **Pages to Build/Update** (based on PRD):
   - **Dashboard**: show summary cards and quick links.
   - **PPDB**: list applicants with filters (status, tanggal); detail view shows ability to “Terima” (accept) which triggers backend sync.
   - **SPO–SPP**: tagihan list, pembayaran form, dispensasi management.
   - **Perpustakaan**: buku catalog, pinjaman form, QR‑code anggota.
   - **Alumni**: directory, profil, form donation, forum thread list.
   - **Website**: berita list & detail, galeri prestasi.
   - **Settings**: profile edit, preference toggles.
5. **Testing**:
   - Manually test each page on desktop (Chrome/Firefox) and mobile (Chrome Android, Safari iOS).
   - Run accessibility audit via Lighthouse; aim for ≥ 90 % score.
   - Verify PWA works offline: enable airplane mode, reload, ensure core assets load and offline page shows.
6. **Deployment Considerations** — STATIC SITE DEPLOYMENT (Shared Hosting)

**IMPORTANT**: This website uses **Server-Side Rendering via Laravel Blade + Inertia.js** with **static asset compilation**. All frontend assets are pre-built and served statically from `public/build/`.

📦 **For complete deployment guide, see [DEPLOYMENT.md](DEPLOYMENT.md)**

   - **Inertia.js v0.x SSR DISABLED**: Project ini memakai `inertiajs/inertia-laravel` v0.x dengan SSR non-aktif (default). Halaman di-render oleh Laravel Blade yang menginjeksi React components via `@inertia` directive.
   
   - **Static Build Process**:
     ```bash
     # Development
     pnpm run dev          # Vite dev server dengan HMR

     # Production (Static Build)
     pnpm run build        # Compile semua assets ke public/build/
     ```
   
   - **Vite Configuration** (`vite.config.js`):
     - Output: `public/build/` dengan manifest JSON
     - Asset strategy: Hash-based filenames untuk cache busting
     - Entry points: `resources/css/app.css` + `resources/js/app.jsx`
     - `emptyOutDir: true` — bersih sebelum build baru
   
   - **Deployment Checklist**:
     1. Run `pnpm run build` di local/CI sebelum upload
     2. Upload seluruh project TERMASUK `public/build/` folder
     3. Run `composer install --optimize-autoloader --no-dev`
     4. Run `php artisan config:cache` dan `php artisan route:cache`
     5. Set `.env`: `APP_ENV=production`, `APP_DEBUG=false`
     6. Pastikan `storage/` dan `bootstrap/cache/` writable (755)
     7. Clear OPcache jika perlu (`service php7.4-fpm reload`)
   
   - **.htaccess Optimization** (untuk Apache shared hosting):
     ```apache
     # Enable compression (mod_deflate)
     <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
     </IfModule>
     
     # Browser caching for static assets
     <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 month"
       ExpiresByType application/javascript "access plus 1 month"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
       ExpiresByType image/gif "access plus 1 year"
       ExpiresByType image/svg+xml "access plus 1 year"
       ExpiresByType font/woff2 "access plus 1 year"
     </IfModule>
     
     # Security headers
     <IfModule mod_headers.c>
       Header set X-Content-Type-Options "nosniff"
       Header set X-Frame-Options "SAMEORIGIN"
       Header set X-XSS-Protection "1; mode=block"
     </IfModule>
     ```
   
   - **No Node.js Required on Server**: Setelah `pnpm run build`, server hanya serve static files dari `public/build/`. Tidak perlu Node.js, npm, atau pnpm di production server.
   
   - **Laravel Blade Rendering**: Semua halaman di-render server-side oleh Laravel Blade. React components di-hydrate di client menggunakan static assets dari build. Ini adalah **SSR via Blade**, bukan SSR via Node.js.
   
   - **PWA Support** (untuk modul Perpustakaan):
     - Service worker: `public/sw.js`
     - Manifest: `public/manifest.json`
     - Offline page: `public/offline.html`
     - Assets dicache saat first load, berfungsi offline setelahnya

## Controller Structure
- **Admin controllers**: `app/Http/Controllers/Admin/` (includes subdirs `Pengguna/`, `Spmb/`, `Website/`)
- **Frontend controllers**: `app/Http/Controllers/Frontend/` (PageController, PpdbController, SpmbController, GuruController)
- **Route files**: `routes/admin.php` — all admin/dashboard routes; `routes/frontend.php` — all public routes; `routes/web.php` is entry point that requires both
- **Namespace**: RouteServiceProvider sets `$namespace = App\Http\Controllers`, so relative controller strings get prepended automatically
- **Inertia page paths**: remain unchanged (e.g., `Pages/Admin/*`, `Pages/Frontend/*`, `Pages/Spmb/*`)
- **Dual systems**: Old Blade modules (nWidart Modules: PPDB, SPP, Perpustakaan) coexist with new Inertia implementations

## Collaboration & Review
- When creating a new feature branch, prefix it with `feature/` (e.g., `feature/ppdb-auto-sync`).
- Open a Pull Request that includes:
  - A brief summary linking to the relevant PRD section.
  - Screenshots or GIFs of the UI changes (if applicable).
  - Any new migrations, seeders, and tests.
- Request review from at least one other team member (ideally one backend and one frontend) before merging.
- Ensure the CI pipeline runs (phpunit, npm test, linters) and passes.

## Authentication & Authorization
- **Guard**: `web` (session) for frontend, `sanctum` for API (Orang Tua).
- **Roles**: Admin, Guru, Staf, Murid, Orang Tua, Alumni, Guest — created via `RoleSeeder`.
- **Permissions**: Assigned per role in `RoleSeeder` (baseline). Use Spatie middleware `role:<role>` on routes.
- **Policies**: `SiswaPolicy` and `BeritaPolicy` enforce model‑level access.
- **Tests**: Feature test `RoleAuthTest` validates route protection.

## Guidelines for AI Agents (Ponytail & Inertia+React)

When contributing to the Sekolahku codebase, whether you are a human developer or an AI agent (e.g., laravel-specialist, frontend-design, or any other), please adhere to the following guidelines to maintain consistency, simplicity, and adherence to the Ponytail principle.

### Frontend (Inertia + React + TypeScript)
- **Form handling**: WAJIB `useForm` dari `@inertiajs/inertia-react`. Jangan React Hook Form, Formik, atau `fetch()`.
- **Data fetching**: hanya via Inertia props. Controller kirim `Inertia::render('Page', [...])`, halaman terima via destructured props. Shared props via `usePage().props`.
- **File upload**: `useState` + `FormData` + `Inertia.post()`.
- **Tables**: WAJIB `@tanstack/react-table` untuk semua tabel baru. Jangan `<table>` manual.
- **Pagination**: WAJIB menggunakan komponen `Components/Pagination.tsx` (admin) atau `Components/Frontend/Pagination.tsx` (public) untuk semua pagination.
- **Layout resolution**: 
  - `Pages/Admin/*` → otomatis dibungkus `AppLayout` (sidebar + topbar).
  - `Pages/Frontend/*`, `Pages/Spmb/*`, `Pages/Auth/*` → TIDAK dibungkus `AppLayout` (self-contained).
  - Override: export `.layout = GuestLayout` pada halaman.
- **Icons**: WAJIB `lucide-react`, import spesifik untuk tree-shaking `import { User } from 'lucide-react'`. Dinamis: `<Icon name="User" />` dari `@/lib/icons`. Jangan gunakan FontAwesome, Heroicons, @iconify/react, atau react-icons.
- **Components**: gunakan shadcn/ui yang sudah tersedia (Button, Input, Card, Badge, Checkbox, DropdownMenu, Label, Separator, Avatar, Sheet). Radix primitives (Accordion, Collapsible, Popover, Progress, RadioGroup, Select, Switch, Tabs, Tooltip) tersedia tetapi belum di-wrap.
- **State & Validation**: 
  - Zustand untuk global state. Buat store di `resources/js/store/`.
  - Arktype untuk runtime validation (opsional, belum dipakai di halaman).
- **Flash Messages**: Controller beri `->with('success', '...')` atau `->with('error', '...')` → otomatis di-render oleh `AppLayout`. Tidak perlu render manual.
- **Aksesibilitas**:
  - Setiap `<input>` harus punya `<label>`<|`htmlFor`.
  - Tombol harus punya `type` eksplisit (`button`, `submit`, `reset`).
  - Icon-only button harus punya `aria-label`.
  - Pastikan kontras ≥ 4.5:1 untuk teks normal, ≥ 3:1 untuk teks besar.
  - Pastikan navigasi keyboard logis; jangan perforasi fokus.
  - Beri label ARIA untuk komponen khusus (modals, dropdowns).
- **Micro‑interactions** (opsional tetapi disarankan):
  - Hover button: skala ringan (1.02) dan bayangan meningkat.
  - Fokus input: glow menggunakan `box-shadow`.
  - Klik baris tabel (untuk baris yang dapat dipilih): ubah latar belakang menjadi navy sangat terang.
  - Notifikasi toast: geser dari kanan atas, hilang otomatis setelah 5 detik.

### Backend (Laravel)
- **Inertia Controllers**: Untuk halaman Inertia, kembali dengan `Inertia::render('Page', [...])`. Jangan gunakan `view()` untuk halaman yang menggunakan Inertia.
- **Form Request**: Validasi dengan Form Request classes (mis. `KegiatanRequest`). Re‑gunakan yang ada; jangan duplikasikan aturan validasi.
- **Flash Messages**: Gunakan `Session::flash('success', 'pesan')` atau `Session::flash('error', 'pesan')`.
- **Redirects**: Setelah POST/PUT/DELETE sukses, alihkan dengan `redirect()->route('...')->with('success', '...')`.
- **File Upload**: Simpan di `public/images/<module>/` lewat `$request->storeAs()`; simpan nama file di model.
- **Transaksi**: Jika perubahan melibatkan beberapa tabel, bungkus dalam database transaction.
- **Observer/Listener**: Manfaatkan Eloquent events untuk efek samping otomatis (mis. membuat Siswa saat pemohon PPDB dinyatakan lulus).

### Routing & API
- **Web routes**: 
  - `routes/web.php` → publik
  - `routes/admin.php` → admin (middleware `auth`, `role:admin` dst.)
  - `routes/frontend.php` → frontend
  - `routes/spmb.php` → bila diperlukan untuk SPMB
- **API routes** (Orang Tua portal): `routes/api.php` dengan autentikasi Sanctum; kembalikan resource yang dipaginate.
- Selalu periksa route setelah perubahan dengan `php artisan route:list`.

### Database & Migrasi
- Migrasi harus dapat dibalik; sediakan metode `down()` yang sesuai.
- Saat menambah foreign key, riferensikan tabel secara eksplisit: `$table->foreignId('user_id')->constrained('users')`.
- Seed data: sediakan seeder untuk tabel baru; uji dengan `php artisan db:seed`.

### Testing
- Tulis minimal satu test (unit atau fitur) untuk logika backend baru.
- Untuk frontend, lakukan uji manual setiap fitur; pertimbangkan menulis pengujian komponen dengan Vitest jika kompleksitas membutuhkan.
- Jalankan rangkaian test sebelum push: `phpunit` dan `npm test`.

### Kualitas Kode
- Hapus kode yang dikomentari dan impor yang tidak digunakan.
- Ikuti konvensi penamaan Laravel (model tunggal, tabel jamak, dst.).
- Gunakan tipe data (type‑hinting) dalam metode PHP bila memungkinkan.
- Simpan perubahan yang fokus dan atomik; setiap PR sebaiknya menyelesaikan satu masalah saja.
- Jalankan linter: `npm run lint` (jika dikonfigurasikan) dan `phpcs` (jika dikonfigurasikan).

### PWA & Offline (modul Perpustakaan)
- Service worker: `public/sw.js`.
- Manifest: `public/manifest.json`.
- Halaman offline: `public/offline.html`.
- Pastikan aset inti di‑cache dan halaman offline ditampilkan saat offline.

Semua pedoman di atas menjaga agar kode tetap koheren, mudah dipelihara, dan selaras dengan prinsip Ponytail teruwaga dari siapa pun yang berkontribusi—baik manusia maupun agen AI.

*This document is a living guideline; update it as the project evolves or when new decisions are made.*