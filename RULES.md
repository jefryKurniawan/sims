<!-- Generated: 2026-07-12 | Updated: 2026-07-16 -->

# Rules & Conventions for Sekolahku

Detail aturan, konvensi, dan panduan teknis untuk semua AI agent yang bekerja pada project ini.

---

## Tech Stack

- **Backend:** Laravel 9, PHP 8.0+, Symfony Components, Inertia.js (SSR nonaktif, Blade-injected)
- **Frontend:** React 18 + TypeScript (TSX), Vite + SWC, Tailwind CSS v4, shadcn/ui
- **Database:** MySQL (no Redis — shared hosting)
- **Auth:** Spatie Permission (role-based), Sanctum (API Orang Tua)
- **Queue/Session/Cache:** database driver

## Backend (Laravel)

### Controllers

- **Inertia controllers**: Kembalikan `Inertia::render('Page', [...])`. JANGAN `view()` untuk halaman Inertia.
- **Admin**: `app/Http/Controllers/Admin/` (subdir: Pengguna/, Spmb/, Website/)
- **Frontend**: `app/Http/Controllers/Frontend/` (PageController, PpdbController, SpmbController, GuruController)
- **Namespace**: RouteServiceProvider set `$namespace = App\Http\Controllers`, jadi string controller relatif otomatis prepend.

### Routing

| File                  | Middleware  | Purpose                                        |
| --------------------- | ----------- | ---------------------------------------------- |
| `routes/web.php`      | web         | Entry point, requires frontend.php + admin.php |
| `routes/admin.php`    | auth, role: | Admin dashboard + settings (role:Admin)        |
| `routes/frontend.php` | web         | Public routes                                  |
| `routes/api.php`      | sanctum     | Orang Tua portal API                           |
| `routes/spmb.php`     | web         | SPMB-specific routes                           |

### Validation

- Gunakan Form Request classes (mis. `KegiatanRequest`). Re-use yang ada; jangan duplikat aturan.

### Flash Messages

- `Session::flash('success', 'pesan')` atau `redirect()->route('...')->with('success', '...')` -> otomatis di-render AppLayout.

### File Upload

- Simpan di `public/images/<module>/` via `$request->storeAs()`; simpan nama file di model.

### Transactions

- Bungkus multi-tabel changes dalam DB transaction.

### Observers & Events

- Manfaatkan Eloquent events untuk side effects otomatis.
- Contoh: auto-create Siswa saat PpdbApplicant status `lulus`.
- Gunakan queued mail jobs untuk email (database queue driver).

### Database & Migrations

- Migrasi HARUS reversible; `down()` konsisten dengan `up()`.
- Foreign key eksplisit: `$table->foreignId('user_id')->constrained('users')`.
- Index pada kolom yang sering di-query (FK, status, tanggal).
- Seed data untuk tabel baru; test `php artisan db:seed`.

---

## Frontend (Inertia + React + TypeScript)

### Core Conventions

- **Form**: WAJIB `useForm` dari `@inertiajs/inertia-react`. DILARANG React Hook Form, Formik, atau `fetch()` langsung.
- **Data fetching**: HANYA via Inertia props. Controller kirim `Inertia::render('Page', [...])`, halaman terima via destructured props. Shared props via `usePage().props`.
- **File upload**: `useState` + `FormData` + `Inertia.post()`.
- **Tables**: WAJIB `@tanstack/react-table`. DILARANG `<table>` manual.
- **Pagination**: WAJIB `Components/Pagination.tsx` (admin) atau `Components/Frontend/Pagination.tsx` (public).
- **Layout resolution**:
    - `Pages/Admin/*` -> otomatis `AppLayout` (sidebar + topbar).
    - `Pages/Frontend/*`, `Pages/Spmb/*`, `Pages/Auth/*` -> TIDAK dibungkus AppLayout (self-contained).
    - Override: export `.layout = GuestLayout` pada halaman.
- **Icons**: WAJIB `lucide-react`, import spesifik untuk tree-shaking `import { User } from 'lucide-react'`. Dinamis: `<Icon name="User" />` dari `@/lib/icons`. DILARANG FontAwesome, Heroicons, @iconify/react, react-icons.
- **Components**: Gunakan shadcn/ui siap pakai (Button, Input, Card, Badge, Checkbox, DropdownMenu, Label, Separator, Avatar, Sheet). Radix primitives (Accordion, Collapsible, Popover, Progress, RadioGroup, Select, Switch, Tabs, Tooltip) tersedia belum di-wrap.
- **State**: Zustand untuk global state -> `resources/js/store/`. Arktype untuk runtime validation (opsional).
- **Flash Messages**: Controller beri `->with('success', '...')` -> otomatis di-render AppLayout. Tidak perlu render manual.

### Accessibility (WCAG 2.1 AA)

- Setiap `<input>` HARUS punya `<label>` dengan `htmlFor`.
- Tombol HARUS punya `type` eksplisit (`button`, `submit`, `reset`).
- Icon-only button HARUS punya `aria-label`.
- Kontras >= 4.5:1 normal, >= 3:1 besar.
- Keyboard navigation logis; jangan trap focus.
- ARIA labels untuk komponen khusus (modal, dropdown).

### Visual & Animasi

| Item               | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme System       | Admin-only. 5 tema (navy, emerald, amber, rose, indigo) via CSS custom properties: `--primary` / `--ring` untuk aksen aktif (tombol, badge, link aktif, sidebar hover, focus ring); `<thead>` background di-tint sesuai tema (`hsl(var(--primary) / 0.08)`). `<select>` element dan `<option>` (`:checked`) di-tint tema. `<input type="checkbox">` dan `<input type="radio">` pakai `accent-color: hsl(var(--primary))`. CI/CD: `[data-tema]` di `<html>`. User pilih via Settings → Konfigurasi Web (role:Admin). Default: navy. **Alert/notifikasi:** flash toast success ikut tema (`bg-primary/10 text-primary`), error tetap semantic red (`bg-destructive/10 text-destructive`). Sonner toast di-import tapi butuh `<Toaster>` — belum aktif. |
| Admin colors       | Navy #003366, Emerald #28A745 (legacy — prefer pakai tema dinamis)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Font               | Inter (Google Fonts, weights 300-800)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Animasi            | framer-motion (whileInView, variants, staggerChildren)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Counter hook       | `useCountUp` custom (requestAnimationFrame + ease-out)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Micro-interactions | Button hover scale(1.02), input focus glow, toast slide-in top-right 5s auto-dismiss                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Build & Deploy

- **Dev**: `pnpm run dev` (Vite HMR)
- **Prod**: `pnpm run build` -> `public/build/` (hash filenames, emptyOutDir: true)
- **Entry points**: `resources/css/app.css` + `resources/js/app.jsx`
- **Vite plugin**: `@vitejs/plugin-react-swc` (SWC compiler, faster than Babel)
- **Tailwind**: v4 via `@tailwindcss/vite` plugin, custom colors via `@theme` in CSS
- **Border**: Selalu pakai `border border-border` — jangan hardcode `border-gray-*` atau `border-slate-*` agar konsisten tema.
- **No Node.js on production server** - static build only

---

## Hosting & Performance (Shared Hosting)

### Laravel Caching (Wajib Production)

```bash
php artisan config:cache    # Gabung semua config jadi 1 file
php artisan route:cache     # Route registration cached
php artisan view:cache      # Blade views compiled
composer install --optimize-autoloader --no-dev  # Classmap optimization
```

### OPcache (.user.ini di root project)

```ini
opcache.enable=1
opcache.memory_consumption=192
opcache.max_accelerated_files=20000
opcache.validate_timestamps=1
opcache.revalidate_freq=60
```

### Database Optimization

- **Index semua FK** (`user_id`, `siswa_id`, `kelas_id`, `jurusan_id`, dll) via migration `$table->index('kolom')`.
- **Ganti `get()` dengan `paginate()`** di semua controller list - jangan load semua record.
- **Eager loading wajib**: `->with('relasi', 'relasi.relasi')` untuk mencegah N+1 queries.
- **Cache query mahal** dengan `Cache::remember('key', $seconds, fn() => ...)` - pakai file/database driver (no Redis).
- **Query logger** hanya aktif di dev; nonaktif di production.

### Queue & Session (No Redis)

| Feature | Driver           | Config                                            |
| ------- | ---------------- | ------------------------------------------------- |
| Queue   | `database`       | `QUEUE_CONNECTION=database`                       |
| Session | `database`       | `SESSION_DRIVER=database`                         |
| Cache   | `file` (default) | `CACHE_DRIVER=file` (swap ke database jika perlu) |

Queue runner di shared hosting via cron:

```bash
* * * * * cd /path/to/project && php artisan queue:work --stop-when-empty --max-time=60 >> /dev/null 2>&1
```

### HTTP Optimization (.htaccess)

- `mod_deflate` - kompres HTML, CSS, JS, JSON
- `mod_expires` - 1 bulan CSS/JS, 1 tahun gambar/font
- Security headers: `X-Content-Type-Options nosniff`, `X-Frame-Options SAMEORIGIN`, `X-XSS-Protection 1; mode=block`

### Frontend Performance

- **Static build**: `pnpm run build` -> hash-based filenames -> long cache possible
- **Lazy loading gambar**: `loading="lazy"` pada semua `<img>` di public pages
- **Code splitting**: manual chunks di `vite.config.js` untuk modul besar (SPP, PPDB, Alumni)
- **Preload critical CSS** via `<link rel="preload">` di Blade layout
- **Avoid heavy libs** di kritikal path - defer non-critical JS

### Deployment Checklist

1. `pnpm run build` (local/CI)
2. Upload semua file + `public/build/`
3. `composer install --optimize-autoloader --no-dev`
4. `php artisan config:cache && php artisan route:cache && php artisan view:cache`
5. Set `.env`: `APP_ENV=production`, `APP_DEBUG=false`
6. Set `QUEUE_CONNECTION=database`, `SESSION_DRIVER=database`
7. Setup cron: `* * * * * php artisan schedule:run`
8. Clear OPcache jika perlu (restart PHP-FPM / reload)

---

## Testing

- Backend: Minimal satu test (unit/feature) untuk logika baru. `php artisan test` sebelum push.
- Frontend: Uji manual tiap fitur; Vitest untuk unit testing komponen jika kompleksitas membutuhkan.
- Migrasi: Uji `php artisan migrate:fresh` sebelum commit.
- Route: `php artisan route:list` setelah perubahan routes.

---

## Code Quality

- Hapus kode dikomentari dan import tidak digunakan.
- Ikuti konvensi penamaan Laravel (model singular, table plural, dst).
- Gunakan type-hinting di metode PHP bila memungkinkan.
- Simpan perubahan fokus dan atomik; setiap PR sebaiknya menyelesaikan satu masalah saja.
- Jalankan linter: `npm run lint` (jika dikonfigurasi) dan `phpcs` (jika dikonfigurasi).

---

## Agile Workflow

### Sprint (1-2 minggu)

1. **Sprint Planning**: Ambil story dari `docs/lean-prd.md` MVP priority #1-9. Prioritaskan berdasarkan prioritas MVP (1=tertinggi).
2. **Daily**: `php artisan test` + `pnpm test` - pastikan pipeline hijau.
3. **Sprint Review**: Demo ke stakeholder (kepala sekolah/tata usaha).
4. **Retrospective**: Catat di `docs/retro-YYYY-MM-DD.md` - what went well, what to improve.

### Story Format

Setiap story di commit message atau PR body:

```
[PRIORITY-#] Module: Judul singkat

Acceptance Criteria:
- [ ] CRUD berfungsi (jika relevan)
- [ ] Flash message sukses/error
- [ ] Test (minimal 1)
- [ ] Aksesibilitas WCAG 2.1 AA
- [ ] Migrasi reversible + seed data
- [ ] `php artisan route:list` verified
```

### Definition of Done (DoD)

- [ ] Code berfungsi sesuai acceptance criteria
- [ ] `php artisan test` lulus (no failing tests)
- [ ] `php artisan route:list` - route baru terdaftar
- [ ] `php artisan migrate:fresh --seed` - migrasi work + seed jalan
- [ ] `pnpm run build` - asset build sukses (no TS errors)
- [ ] No new ESLint errors
- [ ] Tidak ada kode dikomentari / debug `dd()` / `console.log()`
- [ ] Aksesibilitas: label, aria-label, kontras, keyboard nav minimum
- [ ] PR description: screenshots (jika UI change) + link ke bagian PRD

### Branch & PR Convention

| Prefix     | Use case                                             |
| ---------- | ---------------------------------------------------- |
| `feature/` | Fitur baru (mis. `feature/ppdb-auto-sync`)           |
| `fix/`     | Bug fix (mis. `fix/route-404`)                       |
| `chore/`   | Refactor, config, deps (mis. `chore/opcache-config`) |

PR body wajib:

- Satu paragraf deskripsi singkat
- Screenshots/GIF untuk perubahan UI
- Acceptance criteria checklist (DoD)
- Reference ke section `docs/lean-prd.md`

### Priority Reference (MVP)

Dari `docs/lean-prd.md`:

| Priority | Module               | Why                                                        |
| -------- | -------------------- | ---------------------------------------------------------- |
| 1        | Manajemen Siswa      | Foundation - tanpa data siswa, modul lain tidak bisa jalan |
| 2        | SPP                  | Arus kas sekolah                                           |
| 3        | Manajemen Pengguna   | Login/role untuk staf                                      |
| 4        | Import Excel/CSV     | Migrasi data manual                                        |
| 5        | Kelas & Jadwal       | Operasi harian                                             |
| 6        | Manajemen Orang Tua  | Kontak & komunikasi                                        |
| 7        | Nilai Akademik       | Bisa ditunda                                               |
| 8        | Laporan              | Setelah data inti stabil                                   |
| 9        | Estetika & Pelengkap | Setelah fungsi core solid                                  |

---

## Error Pages (Standalone)

Template standalone inline-CSS di `resources/views/errors/` (404, 403, 500, 419) - tanpa dependensi Vite/manifest agar tetap muncul saat error.

---

## PWA & Offline (Modul Perpustakaan)

- Service worker: `public/sw.js`
- Manifest: `public/manifest.json`
- Offline page: `public/offline.html`
- Pastikan aset inti di-cache dan halaman offline ditampilkan saat offline.

<!-- trace-mcp:start -->
## trace-mcp Tool Routing (MANDATORY)

IMPORTANT: For ANY code exploration task, ALWAYS use trace-mcp tools first. NEVER use Read/Grep/Glob/Bash(ls,find) for navigating source code.

| Task | trace-mcp tool | Instead of |
|------|---------------|------------|
| Find a function/class/method | `search` | Grep |
| Understand a file before editing | `get_outline` | Read (full file) |
| Read one symbol's source | `get_symbol` | Read (full file) |
| What breaks if I change X | `get_change_impact` | guessing |
| All usages of a symbol | `find_usages` | Grep |
| All implementations of an interface | `get_type_hierarchy` | ls/find on directories |
| All classes implementing X | `search` with `implements` filter | Grep |
| Project health / coverage gaps | `self_audit` | manual inspection |
| Dead code / dead exports | `get_dead_code` / `get_dead_exports` | Grep for unused |
| Context for a task | `get_feature_context` | reading 15 files |
| Tests for a symbol | `get_tests_for` | Glob + Grep |
| Untested symbols (deep) | `get_untested_symbols` (classifies "unreached" vs "imported_not_called") | manual audit |
| HTTP request flow | `get_request_flow` | reading route files |
| DB model relationships | `get_model_context` | reading model + migrations |
| Component tree | `get_component_tree` | reading component files |
| Circular dependencies | `get_circular_imports` | manual tracing |

Use Read/Grep/Glob ONLY for non-code files (.md, .json, .yaml, config) or before Edit.
Start sessions with `get_project_map` (summary_only=true).
<!-- trace-mcp:end -->
