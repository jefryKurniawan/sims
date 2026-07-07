### 15. Prioritas MVP untuk Migrasi Sistem Sekolah Manual ke ERP Internal

**Tujuan:** Menentukan modul dan fitur yang harus diprioritaskan dalam Minimum Viable Product (MVP) untuk memigrasi dari sistem sekolah manual (buku, spreadsheet, berbasis kertas) ke sistem ERP internal sekolah ini, sehingga operasi sekolah dasar dapat berjalan segera sementara fitur lanjutan ditambahkan secara bertahap.

#### 15.1 Prinsip MVP untuk Migrasi Sekolah
MVP harus fokus pada:
1. **Operasi Hari-hari yang Esensial**: Apa yang diperlukan untuk membuka sekolah besok pagi
2. **Data Inti yang Tidak Boleh Hilang**: Informasi yang kritis untuk kejelasan administratif dan hukum
3. **Proses yang Memengaruhi Arus Kas**: Aktivitas yang langsung berhubungan dengan penerimaan dan pengeluaran uang
4. **Kemudahan Melibatkan Stakeholder**: Minimalkan hambatan bagi guru, staf TU, dan orang tua dalam beradopsi sistem baru
5. **Kapasitas untuk Diperluas**: Fondasi yang kuat untuk menambahkan modul kompleks nantinya

#### 15.2 Modul dan Fitur yang Harus Di-prioritaskan dalam MVP Migrasi

| Prioritas | Modul/Fitur | Deskripsi | Alasan Prioritas |
|-----------|-------------|-----------|------------------|
| **1 (Tinggi)** | **Manajemen Data Siswa Inti** | - Pendaftaran siswa baru (NISN, biodata, orang tua)<br>- Pengelolaan status siswa (aktif, pindah, lulus, dropout)<br>- Klasifikasi kelas/jurusan dasar | Tanpa data siswa yang akurat, tidak ada basis untuk modul lain (nilai, pembayaran, raport). Ini adalah fondasi seluruh sistem. |
| **2 (Tinggi)** | **Sistem Pembayaran SPP Dasar** | - Pembuatan tagihan SPP bulanan<br>- Pencatatan pembayaran (tunai, transfer)<br>- Pelacakan hutang piutang sederhana<br>- Riwayat transaksi per siswa | Arus kas adalah kehidupan sekolah. Sistem pembayaran yang berfungsi memastikan operasional bisa berjalan dan memberikan visibilitas keuangan segera. |
| **3 (Tinggi)** | **Manajemen Pengguna dan Peran** | - Pendaftaran admin, guru, dan staf TU<br>- Definisi peran (Kepala Sekolah, Wakil Kepala, Tata Usaha, Guru, Kepala Bagian)<br>- Otentikasi dasar (username/password)<br>- Akses berbasis peran ke modul yang relevan | Untuk sistem dapat digunakan oleh staf, diperlukan manajemen pengguna yang aman dan terstruktur. Tanpa ini, tidak ada yang bisa login dan menggunakan sistem. |
| **4 (Sedang)** | **Import Data Guru dan Siswa dari Manual** | - Fitur import Excel/CSV seperti yang dijelaskan di bagian 14<br>- Validasi dan cleansing data dasar<br>- Mapping ke struktur sistem | Mempercepat migrasi dari data manual yang sudah ada. Tanpa ini, proses pencatatan ulang data ribuan siswa dan guru akan membutuhkan waktu dan usaha yang besar, menambah risiko kesalahan manusia. |
| **5 (Sedang)** | **Modul Kelas dan Jadwal Dasar** | - Daftar kelas aktif<br>- Assign guru ke kelas/mata pelajaran<br>- Jadwal pelajaran mingguan sederhana | Diperlukan untuk mengatur pembelajaran harian dan menyediakan basis untuk modul nilai dan raport di masa depan. |
| **6 (Sedang)** | **Manajemen Orang Tua dan Kontak Dasar** | - Data orang tua/wali siswa<br>- Nomor telepon dan informasi kontak<br>- Hubungan dengan anak siswa | Diperlukan untuk komunikasi sehari-hari (pengumuman, surat, panggilan darurat) dan sebagai fondasi untuk modul Portal Orang Tua di masa depan. |
| **7 (Rendah)** | **Modul Nilai Akademik Dasar** | - Input nilai tugas, UTS, UAS<br>- Perhitungan nilai akhir sederhana<br>- Kelulusan berdasarkan kriteria minimum | Meskipun penting untuk akademik, nilai bisa ditangani secara manual sementara sistem nilai siap, terutama jika fokus awal adalah administrasi dan keuangan. |
| **8 (Rendah)** | **Laporan Operasional Dasar** | - Laporan siswa aktif/pindah/lulus<br>- Laporan pembayaran SPP bulanan<br>- Laporan hutang piutang<br>- Laporan guru dan kehadiran | Laporan bisa dikembangkan setelah data inti terkelola dengan baik. Fokus awal adalah pada transaksi dan entri data, bukan analisis. |
| **9 (Rendah)** | **Fitur Pelengkap dan Estetika** | - Tampilan yang menarik<br>- Notifikasi otomatis<br>- Integrasi dengan aplikasi lain<br>- Fitur canggah seperti grafik atau dashboard | Ini menyenangkan tetapi tidak kritis untuk operasi sekolah dasar. Bisa ditambahkan setelah inti berjalan stabil. |

#### 15.3 Alur Kerja Migrasi MVP yang Direkomendasikan

**Fase 1: Persiapan dan Inisialisasi (1-2 Minggu)**
1. Set up sistem dasar (instalasi, konfigurasi awal)
2. Buat struktur data inti (siswa, guru, orang tua, kelas, SPP)
3. Siapkan template import Excel/CSV untuk data guru dan siswa
4. Lakukan pelatihan dasar untuk administrator sistem

**Fase 2: Migrasi Data Inti (2-4 Minggu)**
1. Export data siswa dan guru dari sistem manual (buku/spreadsheet)
2. Isi template import yang telah disediakan
3. Lakukan import ke sistem ERP (mulai dengan data guru, lalu siswa)
4. Validasi hasil import dan lakukan koreksi bila diperlukan
5. Buat akun pengguna untuk staf kunci (Kepala Sekolah, Tata Usaha)

**Fase 3: Peluncuran Operasional Dasar (Ongoing)**
1. Mulai menggunakan sistem untuk:
   - Pendaftaran siswa baru
   - Pembuatan dan pencatatan tagihan SPP
   - Manajemen status siswa aktif/pindah/lulus
   - Operasi keuangan harian (penerimaan SPP, pengeluaran operasional)
2. Biarkan sistem manual berjalan secara paralel selama 1 bulan untuk validasi
3. Setelah 1 bulan tanpa masalah signifikan, beralih secara penuh ke sistem ERP
4. Arsipkan data manual sebagai cadangan dan referensi historis

#### 15.4 Metrik Kesuksesan MVP Migrasi

MVP dianggap berhasil ketika:
- **≥ 95%** data siswa aktif berhasil diimport tanpa duplikasi atau kehilangan kolom wajib
- **≥ 90%** transaksi SPP harian dapat dicatat melalui sistem ERP (bukan manual)
- Administrator sekolah dapat melakukan **operasi core** (tambah siswa, buat tagihan, catat pembayaran) tanpa bantuan teknis setelah 2 minggu pelatihan
- Waktu yang diperlukan untuk mencatat pembayaran SPP per siswa **berkurang ≥ 50%** dibanding sistem manual
- Tidak ada kehilangan data kritis selama proses migrasi (tervalidasi melalui reconciliasi)

#### 15.5 Catatan Implementasi untuk Tim Pengembang

Untuk mendukung fokus pada MVP ini:
1. **Prioritaskan fungsi dasar**: pastikan fitur CRUD untuk siswa, SPP, dan pengguna bekerja sempurna sebelum menambahkan fitur kompleks
   - **SPP CRUD lengkap**: tambahkan tampilan detail (`Detail`), edit (`Edit`), create (`Create`), dan hapus (soft‑delete) dengan flash‑message serta tampilan riwayat pembayaran.
   - **Siswa menu lengkap**: pastikan sidebar menampilkannya dengan sub‑menu **Data Siswa → List, Detail, Tambah, Edit, Hapus** (soft‑delete) sehingga tim dapat mengelola data inti secara penuh.
2. **Sederhanakan antarmuka**: untuk tampilan awal, fokus pada kegunaan bukan estetika
3. **Minimalkan dependensi eksternal**: hindari integrasi dengan sistem pihak ketiga dalam fase MVP kecuali mutlak diperlukan
4. **Bangkitkan dasar yang kuat**: pastikan struktur database, API, dan autentikasi solide sebagai fondasi untuk fitur masa depan
5. **Dokumentasikan alur kerja**: buat SOP sederhana untuk staf sekolah mengenai cara menggunakan setiap core fitur
6. **Rencanakan perangkaan ke fitur lanjutan**: desain modul dan API sedemikian rupa sehingga menambahkan modul seperti nilai, raport, atau kelas/jadwal di masa depan tidak memerlukan perubahan besar pada fondasi

Dengan fokus pada daerah-danah ini, sekolah dapat mulai digitalisasi operasi inti mereka dengan cepat, mengurangi beban administratif manual, dan membangun fondasi untuk transformasi digital yang lebih komprehensif di masa depan.

---

### 16. Implementasi Selesai (per 2026-07-05)

#### 16.1 Transformasi Manajemen Siswa/Siswi

**`/dashboard/users/murid` → `/dashboard/murid` (SiswaController)**

| Item | Detail |
|------|--------|
| **Model** | `Siswa` (app/Models/Siswa.php) — `nama_lengkap`, `nisn`, `nis`, `jenis_kelamin`, `status`, `jurusan_id`, `user_id` (nullable) |
| **Enrollment** | `SiswaKelas` pivot — `siswa_id`, `kelas_id`, `status` (aktif/pindah/lulus), `tanggal_masuk_kelas`, `tanggal_keluar_kelas` |
| **Landing page** | `Admin/Siswa/Landing.tsx` — 3 kartu angkatan (10/11/12) dengan jumlah siswa, jumlah kelas, varian (A/B/C/D) |
| **Per-angkatan** | `Admin/Siswa/Tingkat.tsx` — tabel siswa per angkatan, filter variant (first-char `nama_kelas`), search, import, bulk promote |
| **CRUD** | Create, Edit, Detail, Delete (soft-delete via `SoftDeletes` trait) |
| **Import** | Template download (xlsx/csv), validasi + import massal ke `siswa` + auto-create `siswa_kelas` enrollment |
| **Bulk promote** | `SiswaController::promote()` — multi-select siswa → pindah ke kelas tujuan, tutup enrollment lama, buat baru aktif |
| **Header** | "Siswa/Siswi" — "Kelola data siswa & status akademik" |
| **Route** | `users.murid.*` → `Admin\SiswaController` (routes/admin.php), bukan MuridController lama |

**Catatan untuk pengembangan selanjutnya:**
- **Relasi User ↔ Siswa**: Kolom `user_id` di tabel `siswa` masih nullable. Belum ada mekanisme auto-create user akun untuk siswa baru. Perlu observer/listener saat siswa dibuat → auto-create `users` record dengan role `murid`, generate password, kirim email kredensial.
- **Naik Kelas Massal**: `promote()` sudah implementasi bulk pindah kelas, tapi belum ada mekanisme otomatis akhir tahun ajaran (kenaikan massal seluruh siswa kelas 10→11, 11→12, 12→lulus). Perlu scheduled job atau tombol admin "Proses Kenaikan Kelas" yang: (a) iterasi semua siswa aktif, (b) tutup enrollment lama, (c) buat enrollment baru di kelas tingkat+1, (d) siswa kelas 12 status jadi `Lulus`.
- **Kolom Variant di Kelas**: Saat ini variant (A/B/C/D) di-derive dari karakter pertama `nama_kelas` via `strtoupper(substr($k->nama_kelas, 0, 1))`. Jika variant tidak selalu sama dengan karakter pertama, perlu tambah kolom `variant` di tabel `kelas`.

#### 16.2 Redesign Halaman Publik (Frontend)

**Warna konsisten**: `#FFD700` (kuning) + `#E31E24` (merah) — selaras dengan homepage.
**Animasi**: `framer-motion` (`AnimatePresence`, `motion.div`, `whileInView`, `whileHover`, `variants`, `staggerChildren`) menggantikan GSAP di sebagian besar halaman.
**Ikon**: `lucide-react` eksklusif — tidak ada FontAwesome, Heroicons, atau react-icons.

| Halaman | URL | Perubahan |
|---------|-----|-----------|
| **ProfileSekolah** | `/profile-sekolah` | Hero gradient merah→kuning, `useCountUp` hook untuk NPSN, 4 info cards (tahun berdiri, akreditasi, NPSN, kepala sekolah), kontak 2-kolom (email+telepon kiri, alamat+sosmed kanan), social media SVG inline (Facebook, YouTube, Instagram, TikTok), Visi & Misi section, GSAP ScrollTrigger |
| **Berita** | `/berita` | Hero gradient + decorative circles, `useCountUp` total artikel, card grid 3-kolom dengan `staggerChildren`, hover lift (`y: -6`), category badge merah, author avatar merah+kuning, empty state animasi floating |
| **DetailBerita** | `/berita/{slug}` | Full-width header gradient, glass-morphism back button, estimasi "X menit baca", thumbnail border putih + shadow, article card putih, related posts dengan stagger entrance + hover lift |
| **Alumni** | `/alumni` | Stats merah+kuning, navigation pills tanpa emoji (lucide icons), LinkedIn SVG inline (hapus dependensi `react-icons/fa`), avatar gradient merah→kuning, card stagger + hover lift, CTA section gradient merah |
| **VisiMisi** | `/visi-dan-misi` | Ganti GSAP+CSS animation → framer-motion `whileInView`+`variants`, Visi card merah, Misi check circles merah, Moto card gradient merah+kuning text, core values kuning, **controller fix**: fetch `ProfileSekolah::first()` → kirim `visimisi` prop (sebelumnya hanya `commonData()`) |
| **Guru** | `/guru` | Stats counter `useCountUp` ×3 (total, guru, tendik), filter bar dengan focus ring merah, badge jenis: merah (Guru) / kuning (Staf), avatar gradient merah→kuning, email button merah, empty state animasi |

#### 16.3 Fix Sinkronisasi Data `/guru` ↔ `/dashboard/gtk`

**Masalah**: Frontend GuruController filter `jenis` pakai lowercase (`'guru'`, `'tenaga_kependidikan'`) tidak match DB yang menyimpan `'Guru'`, `'Tenaga Kependidikan'`. Plus `whereNotNull('user_id')` gate tidak ada di admin controller.

**Fix** (3 file):
- `Frontend/GuruController.php`: hapus `whereNotNull('user_id')`, fix `in_array` → `['Guru', 'Tenaga Kependidikan']`, fix stats query values
- `Frontend/Guru.tsx`: option values → `"Guru"` / `"Tenaga Kependidikan"`, badge check → `guru.jenis === 'Guru'`

#### 16.4 Fix Import Head (Named Export)

**Masalah**: 5 file import `Head` sebagai default export dari `@/Layout/Head`, padahal `Head.tsx` hanya mengekspor named `{ Head }`. Rolldown (Vite 8) strict — build gagal.

**Fix** (5 file): `FrontendLayout.tsx`, `Auth/Register.tsx`, `Auth/Login.tsx`, `Layout/App.tsx`, `Frontend/Visimisi.tsx` — `import Head from` → `import { Head } from`.

#### 16.5 Modul Tambahan (Admin)

| Modul | Route | Keterangan |
|-------|-------|------------|
| **Kelas** | `dashboard/kelas` | CRUD Kelas (nama_kelas, tingkat, jurusan_id, wali_kelas_id, ruangan, kapasitas, tahun_ajaran) |
| **Sarana Prasarana** | `dashboard/sarana` | Inventarisasi fasilitas sekolah |
| **Dispensasi** | `dashboard/dispensasi` | Manajemen dispensasi/keringanan SPP (siswa_id, jenis, nilai, mulai, sampai, keterangan) |

#### 16.6 UI/UX Patterns yang Sudah Diterapkan

| Pattern | Lokasi | Deskripsi |
|---------|--------|-----------|
| `useCountUp` hook | ProfileSekolah, Berita, Alumni, Guru | Custom counter dengan `requestAnimationFrame` + ease-out cubic, trigger via IntersectionObserver (opsional `inView` param) |
| `getField(value, fallback)` | ProfileSekolah | Null-safe field rendering — pakai data DB jika ada, fallback ke defaultProfile jika null |
| `socialLinks` SVG inline | ProfileSekolah | Brand icon (FB, YT, IG, TT) tanpa dependensi eksternal — ~800 bytes total |
| `cardContainerVariants` + `cardVariants` | Berita, Alumni, Guru | StaggerChildren animation pattern — `hidden`/`visible` dengan delay cascade |
| Hero dengan decorative circles | Semua halaman publik | Gradient merah→kuning + radial gradient circles untuk depth |
| Bottom fade `from-gray-50 to-transparent` | Semua hero section | Transisi mulus dari hero berwarna ke konten abu-abu |
| Glass-morphism badge | Semua hero | `bg-white/10 backdrop-blur-sm border border-white/20` — badge di hero |
| Empty state animasi | Berita, Alumni, Guru | `motion.div` dengan `animate: { rotate: [...] }` infinite gentle wobble |

#### 16.7 Modernisasi Frontend Panel Admin dengan Inertia.js + React (TSX)

Semua kontroler admin yang terkait dengan modul website (Kegiatan, Events, Video, KategoriBerita, VisidanMisi, Program, About, ImageSlider, Footer), serta HomeController, ProfileController, dan SettingController telah berhasil di-migrasi ke stack Inertia.js dengan React dan TypeScript, mengikuti prinsip Ponytail dan panduan frontend yang tercantum dalam CLAUDE.md. Implementasi mencakup:

- Penggunaan `Inertia::render('Admin/Modul/Page', [data...])` di semua controllere.
- Penggantian semua permintaan AJAX/fetch/jQuery dengan `useForm`, `router.post/put/delete`, dan `Inertia.post()` untuk upload file.
- Penggunaan `useState` + `FormData` untuk handling file upload.
- Pagination menggunakan `@tanstack/react-table` dengan komponen `Components/Pagination.tsx`.
- Flash message otomatis disediakan oleh Inertia melalui `props.flash`.
- Navigasi menggunakan `Link` untuk tautan dan `router.visit` dengan `preserveScroll` untuk mempertahankan scroll.
- Penggunaan komponen shadcn/ui (Button, Input, Card, Badge, dll.) dan ikon lucide-react.
- Semua form menggunakan validasi melalui Form Request yang sudah ada (mis. `KegiatanRequest`, `FooterRequest` dll.).
- Penggunaan Zustand untuk state global bila diperlukan (belum diperlukan di modul-modul ini).
- Pastikan semua halaman admin otomatis dibungkus oleh `AppLayout` (sidebar + topbar) sesuai konvensi `Pages/Admin/*`.

Dengan ini, seluruh panel admin sekarang menggunakan stack teknologi yang sama dengan frontend publik, meminimalkan konteks switching dan meningkatkan konsistensi kode.

#### 16.8 Prinsip Ponytail dan Standar Pengembangan untuk Agen AI
Semua pengembangan frontend baru WAJIB mengikuti Prinsip Ponytail: pilihlah solusi sederhana yang bekerja; hindari abstraksi yang tidak diperlukan. Khususnya untuk agen AI (termasuk laravel-specialist dan frontend-design), pastikan:

- **WAJIB** menggunakan `useForm` dari `@inertiajs/inertia-react` untuk semua penanganan form. DILARANG menggunakan React Hook Form, Formik, atau `fetch()` langsung.
- **WAJIB** mengambil data hanya melalui Inertia props. Kontroller harus mengirim `Inertia::render('Page', [...])`, halaman terima melalui destructured props. Props bersama melalui `usePage().props`.
- **WAJIB** menggunakan `@tanstack/react-table` untuk semua tabel baru. DILARANG menggunakan `<table>` manual.
- **WAJIB** menggunakan komponen `Components/Pagination.tsx` (admin) atau `Components/Frontend/Pagination.tsx` (public) untuk semua pagination.
- **WAJIG** menggunakan `lucide-react` untuk semua ikon, dengan impor spesifik untuk tree-shaking (Contoh: `import { User } from 'lucide-react'`). DILARANG menggunakan FontAwesome, Heroicons, @iconify/react, atau react-icons.
- **WAJIB** menggunakan komponen shadcn/ui yang tersedia (Button, Input, Card, Badge, Checkbox, DropdownMenu, Label, Separator, Avatar, Sheet).
- **WAJIB** mengikuti resolusi layout: `Pages/Admin/*` otomatis dibungkus `AppLayout` (sidebar + topbar); `Pages/Frontend/*`, `Pages/Spmb/*`, `Pages/Auth/*` TIDAK dibungkus `AppLayout` (self-contained).
- **WAJIB** setiap `<input>` harus memiliki `<label>` dengan `htmlFor`.
- **WAJIB** tombol harus memiliki `type` eksplisit (`button`, `submit`, `reset`).
- **WAJIB** icon-only button harus memiliki `aria-label`.

Prastawa ini memastikan konsistensi, kesederhanaan, dan kepatuhan terhadap arsitektur Inertia.js + React yang telah diadopsi secara penuh sejak Juli 2026.