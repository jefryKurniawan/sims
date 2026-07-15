## Tentang Sekolahku

Sekolahku adalah aplikasi manajemen sekolah berbasis website yang di bangun dan di kembangkan dengan Framework Laravel dan stack modern React + Inertia.js. Fitur-fitur pada aplikasi Sekolahku antara lain :

- Website Sekolah (Done)
- PPDB (Done)
- SPMB 2026 - Sistem Penerimaan Murid Baru dengan 4 jalur seleksi (Done - Migration)
- e-Rapor Kemendikdasmen - Integrasi Dapodik (Done - Migration)
- Perpustakaan (Done)
- Sistem Pembayaran Sekolah SPP (Done)
- Alumni

## Installation

- Install [Composer](https://getcomposer.org/download) and [Pnpm](https://pnpm.io/installation)
- Clone the repository: `git clone https://github.com/andes2912/sekolahku`
- Install dependencies: `composer install ; pnpm install`
- Build assets for development: `pnpm run dev` or for production: `pnpm run build`
- Run `cp .env.example .env` for create .env file
- Run `php artisan migrate --seed` for migration database
- Run `php artisan storage:link` for create folder storage

## Penggunaan

- Login sebagai Admin email: kepsek@sch.id & pw: Bismillah
- Login sebagai PPDB, Perpustakaan, Staf, Pengajar semua dengan password 12345678

## Package

- [IndoBank](https://github.com/andes2912/indobank) package Laravel untuk menyimpan data Nama Bank yang ada di Indonesia

## Teknologi yang Digunakan

- **Backend**: Laravel 9.x dengan PHP 8.1+
- **Frontend**: React 18.x dengan Inertia.js 0.11.x untuk SPA-like experience tanpa perlu membangun API terpisah
- **Build Tool**: Vite 8.x untuk development dan production builds yang cepat
- **State Management**: Zustand untuk state management sederhana yang efisien
- **UI Framework**: Tailwind CSS v4 dengan shadcn/ui untuk tampilan modern dan konsisten
- **Tables**: @tanstack/react-table untuk data tables yang powerful
- **Charts**: ApexCharts untuk visualisasi data dashboard
- **Testing**: Vitest untuk unit testing yang cepat dan modern
- **Optimization**: OPcache untuk memperkini performa pada shared hosting
- **Database**: MySQL dengan indexing yang tepat dan eager loading untuk mencegah N+1 queries

Note: Aplikasi ini akan terus saya update.<br>
Jika ada pertanyaan bisa kontak aku di email ini <b>andridesmana29@outlook.com</b>

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

saran update Fitur :
Untuk memaksimalkan sistem Sekolahku yang sudah berjalan, pengembangan tidak hanya berfokus pada pembuatan modul baru, tetapi juga meningkatkan (upgrade) fitur-fitur yang statusnya sudah selesai (Done). Hal ini penting agar fitur lama dapat terhubung secara otomatis (interconnected) dengan modul E-Rapor, Portal Orang Tua, Manajemen Aset, dan PWA Perpustakaan.
Berikut adalah daftar detail peningkatan fitur dari sistem yang sudah ada beserta fungsi barunya:

## 0. e-Rapor Kemendikdasmen (BARU - Juni 2026)

- **Auto-Pull Data dari Dapodik**: Sinkronisasi profil sekolah, guru, siswa, rombel dari Dapodik via Web Service
- **Input Guru**: Tujuan Pembelajaran (TP), nilai formatif/sumatif, deskripsi kompetensi P5
- **Web Service Export**: Kirim data nilai ke Dapodik untuk sinkronisasi ke Kementerian
- **API Integration/Excel Import-Export**: Support untuk sekolah yang sudah punya sistem rapor lain
- **Database Schema Ready**: 8 tabel baru (dapodik_sync_logs, tujuan_pembelajaran, asesmen_formatif, asesmen_sumatif, p5_projek, p5_nilai, webservice_config, dapodik_id_mapping)

## 1. SPMB 2026 - Sistem Penerimaan Murid Baru (BARU - Juni 2026)

- **Data Lengkap Standar Dapodik**: NISN (10 digit), NIK (16 digit), KK, data orang tua lengkap, alamat detail
- **Jalur Afirmasi**: KIP, PKH, KJP Plus, yayasan, keluarga tidak mampu dengan validasi kartu & penghasilan
- **Jalur Prestasi**: Akademik (nilai rapor, TKA) & non-akademik (olahraga, seni, tahfidz) dengan sistem poin
- **Tes Kompetensi Akademik (TKA)**: Matematika, IPA, IPS, Bahasa Indonesia, Bahasa Inggris, IQ
- **Sistem Ranking Otomatis**: Skor total = 40% nilai rapor + 40% TKA + 20% prestasi + bonus afirmasi
- **Database Schema Ready**: 7 tabel baru (spmb_afirmasi, spmb_prestasi, spmb_nilai_akademik, spmb_tka, spmb_config, spmb_ranking + enhanced spmb_applicants)

## 2. Peningkatan Modul PPDB (Upgrade dari Status: Done)

- Sinkronisasi Otomatis Calon Siswa: Fitur sekali klik untuk memindahkan data calon siswa yang lolos seleksi PPDB langsung menjadi data Siswa Aktif di database utama.
- Pembuat Akun Orang Tua Otomatis: Saat siswa dinyatakan diterima, sistem Laravel otomatis menggenerate akun login untuk Portal Orang Tua dan mengirimkan detail akunnya via email.
- Integrasi Tagihan Awal: Menghubungkan biaya pendaftaran atau uang pangkal PPDB agar langsung tercatat di Sistem Pembayaran SPP.

## 3. Peningkatan Sistem Pembayaran SPP (Upgrade dari Status: Done)

- Integrasi ke Portal Orang Tua: Menghubungkan data transaksi sehingga orang tua bisa melihat invoice, riwayat pembayaran, dan sisa tunggakan SPP anak secara real-time.
- Modul Dispensasi & Beasiswa: Fitur bagi admin keuangan untuk menyetel potongan harga SPP atau penundaan batas waktu bayar bagi siswa tertentu.
- Ekspor Laporan Keuangan: Penambahan fitur unduh laporan tunggakan dan laporan pemasukan kas sekolah per bulan/per tahun dalam format Excel/PDF untuk kepala sekolah.

## 4. Peningkatan Modul Perpustakaan + PWA (Upgrade dari Status: Done)

- Transformasi ke PWA: Mengubah modul perpustakaan web biasa menjadi berbasis PWA agar bisa diinstal di HP siswa, lengkap dengan Kartu Anggota Digital (QR Code) di layar ponsel.
- Penyediaan Katalog E-Book: Menambahkan fitur upload file PDF (modul ajar, buku paket digital) agar siswa bisa membaca buku langsung dari aplikasi perpustakaan di HP mereka.
- Integrasi Bebas Pustaka untuk Alumni: Menghubungkan data perpus dengan modul Alumni. Siswa yang mau lulus harus divalidasi tidak memiliki pinjaman buku tertunggak sebelum statusnya berubah menjadi alumni.

## 5. Peningkatan Modul Alumni (Upgrade dari Status: In Progress)

- Tracer Study & Kuesioner: Fitur kuesioner digital untuk melacak karier alumni (kuliah, kerja, atau wirausaha) guna kebutuhan akreditasi sekolah.
- Forum Bisnis & Lowongan Kerja: Halaman khusus bagi alumni untuk membagikan info lowongan pekerjaan atau mempromosikan usaha mereka ke sesama alumni.
- Donasi & Dana Abadi: Modul bagi alumni yang ingin memberikan kontribusi dana sosial atau bantuan fasilitas ke sekolah.

## 6. Peningkatan Modul Website Sekolah / CMS (Upgrade dari Status: Done)

- Integrasi Berita PPDB & Alumni: Menghubungkan CMS agar pengumuman hasil seleksi PPDB atau agenda reuni alumni otomatis tayang di halaman depan website publik.
- Galeri Prestasi Siswa: Integrasi data nilai terbaik atau prestasi non-akademik siswa dari sistem internal agar bisa dipublikasikan ke website sekolah guna menarik minat calon siswa baru.

---

## Ringkasan Alur Integrasi Sistem Baru

[SPMB 2026] ──> Pendaftaran 4 Jalur ──> TKA ──> Scoring & Ranking ──> Pengumuman
↓
[ PPDB (Diterima) ] ──> Otomatis Membuat Data Siswa & Akun Portal Orang Tua
│
├──> Mengisi Nilai Sumatif/P5 ──> [ E-RAPOR ] ──> Sync Dapodik
│
├──> Cek Riwayat & Tagihan ──> [ SPP & PORTAL ORANG TUA ]
│
└──> Lulus Sekolah ──> [ MODUL ALUMNI ]

Dengan strategi ini, tim developer Laravel Anda tidak hanya menempelkan fitur baru, melainkan menyatukan seluruh fitur lama menjadi satu kesatuan sistem yang utuh dan saling berkomunikasi.

---

## 📦 Deployment Guide — Static Site Deployment

Website ini menggunakan **Server-Side Rendering via Laravel Blade + Inertia.js** dengan **pre-compiled static assets**. Setelah build, semua CSS/JS/images di-compile ke `public/build/` dan siap deploy ke shared hosting TANPA Node.js runtime.

### Build & Deploy Steps

#### 1. Local Development Build

```bash
# Install dependencies
pnpm install

# Development (dengan HMR)
pnpm run dev

# Production Build (sebelum deploy)
pnpm run build
# Output: public/build/ folder dengan hashed assets
```

#### 2. Upload ke Server

```bash
# Upload SEMUA file kecuali:
# - .env (buat di server dari .env.example)
# - node_modules/ (tidak diperlukan di production)
# - .git/
# - storage/framework/cache/* (clear saja)

# Yang HARUS di-upload:
# - public/build/ ← JANGAN SKIP FOLDER INI!
# - vendor/
# - semua file lainnya
```

#### 3. Setup di Server

```bash
# Install composer dependencies
composer install --optimize-autoloader --no-dev

# Generate optimized autoload files
composer dump-optimizer

# Create .env dari example
cp .env.example .env
# Edit .env: APP_ENV=production, APP_DEBUG=false, DB credentials

# Generate application key (jika belum)
php artisan key:generate

# Cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force --optimize-autoloader

# Link storage
php artisan storage:link

# Set permissions
chmod -R 755 storage bootstrap/cache
```

#### 4. Verify Build

```bash
# Cek public/build/ ada
ls -la public/build/

# Cek manifest.json ada
cat public/build/manifest.json | head -20

# Test akses aplikasi
curl http://localhost/
# atau buka di browser
```

### OPcache Configuration (`.user.ini` di root)

```ini
opcache.enable=1
opcache.memory_consumption=192
opcache.max_accelerated_files=20000
opcache.validate_timestamps=1
opcache.revalidate_freq=60
```

**Benefit OPcache:**

- `memory_consumption=192`: 192MB cache (cukup untuk Laravel medium)
- `max_accelerated_files=20000`: Cache sampai 20.000 file PHP
- `validate_timestamps=1`: Auto-detect perubahan file
- `revalidate_freq=60`: Cek perubahan tiap 60 detik (balance performance vs freshness)

### Database Optimization

**Eager Loading (with()):** Bunuh N+1 Query

```php
// ❌ Lazy Loading — 21 queries untuk 20 siswa
$siswa = Siswa::all();
foreach ($siswa as $s) {
    echo $s->ortu->nama;
}

// ✅ Eager Loading — cuma 2 queries
$siswa = Siswa::with('ortu')->get();
foreach ($siswa as $s) {
    echo $s->ortu->nama;
}
```

**Indexing:** Tambah index di kolom yang sering di-query

```php
// Di migration
$table->index('nisn');
$table->index(['status', 'created_at']);
```

**Pagination:** Jangan load semua data sekaligus

```php
// ❌ Load semua
$siswa = Siswa::all();

// ✅ Pagination 20 per page
$siswa = Siswa::paginate(20);
```

### Queue Configuration

Untuk proses berat (email, export Excel, sync Dapodik):

**`.env`:**

```
QUEUE_CONNECTION=database
```

**`app/Console/Kernel.php`:**

```php
protected function schedule(Schedule $schedule)
{
    // Process queue setiap menit
    $schedule->command('queue:work --stop-when-empty')
             ->everyMinute()
             ->withoutOverlapping();
}
```

**Cron di server:**

```bash
# Edit crontab
crontab -e

# Tambah baris ini (ganti path sesuai lokasi project)
* * * * * cd /path/to/sims && php artisan schedule:run >> /dev/null 2>&1
```

### Troubleshooting

**Assets 404 di production:**

```bash
# Verify build folder
ls public/build/

# Re-build jika perlu
pnpm run build

# Upload ulang public/build/
```

**Blank page:**

```bash
# Check error log
tail -f storage/logs/laravel.log

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Check .env
cat .env | grep APP_ENV
# Harus: APP_ENV=production
```

**Changes tidak muncul:**

```bash
# Clear OPcache
sudo service php7.4-fpm reload
# atau
sudo service php8.1-fpm reload

# Clear Laravel cache
php artisan cache:clear
php artisan config:cache
```

---

## Tech Stack Summary

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| **Backend**    | Laravel 9.x, PHP 8.1+                            |
| **Frontend**   | React 18, Inertia.js v0.x                        |
| **Build Tool** | Vite 8, Tailwind CSS v4                          |
| **State**      | Zustand, Arktype                                 |
| **UI**         | shadcn/ui (Radix UI), Lucide Icons               |
| **Charts**     | ApexCharts                                       |
| **Tables**     | @tanstack/react-table                            |
| **Queue**      | Database driver                                  |
| **Cache**      | OPcache, Redis (optional)                        |
| **Deployment** | Static build (`pnpm run build`) → Shared Hosting |

**Key Packages:**

- `lucide-react` — Icons
- `class-variance-authority` + `tailwind-merge` + `clsx` — shadcn/ui foundation
- `apexcharts` + `react-apexcharts` — Dashboard charts
- `@tanstack/react-table` — Data tables
- `simplebar` + `simplebar-react` — Custom scrollbar
- `zustand` — State management
- `arktype` — Runtime validation

**Future Enhancements:**

- GTK (Guru & Tenaga Kependidikan) — TODO
- School Tour Virtual 360° — Library: Lapentor atau Panoee Free
- Seed data untuk setiap fitur baru

**Development Workflow:**
Perancangan → Pengerjaan → Testing hingga no issue
