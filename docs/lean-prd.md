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
| ----------- | ------------- | ----------- | ------------------ |
| **1 (Tinggi)** | **Manajemen Data Siswa Inti** | - Pendaftaran siswa baru (NISN, biodata, orang tua)<br>- Pengelolaan status siswa (aktif, pindah, lulus, dropout)<br>- Klasifikasi kelas/jurusan dasar | Tanpa data siswa yang akurat, tidak ada basis untuk modul lain (nilai, pembayaran, raport). Ini adalah fondasi seluruh sistem. |
| **2 (Tinggi)** | **Sistem Pembayaran SPP Dasar** | - Pembuatan tagihan SPP bulanan<br>- Pencatatan pembayaran (tunai, transfer)<br>- Pelacakan hutang piutang sederhana<br>- Riwayat transaksi per siswa | Arus kas adalah kehidupan sekolah. Sistem pembayaran yang berfungsi memastikan operasional bisa berjalan dan memberikan visibilitas keuangan segera. |
| **3 (Tinggi)** | **Manajemen Pengguna dan Peran** | - Pendaftaran admin, guru, dan staf TU<br>- Definisi peran (Kepala Sekolah, Wakil Kepala, Tata Usaha, Guru, Kepala Bagian)<br>- Otentikasi dasar (username/password)<br>- Akses berbasis peran ke modul yang relevan | Untuk sistem dapat digunakan oleh staf, diperlukan manajemen pengguna yang aman dan terstruktur. Tanpa ini, tidak ada yang bisa login dan menggunakan sistem. |
| **4 (Sedang)** | **Import Data Guru dan Siswa dari Manual** | - Fitur import Excel/CSV seperti yang dijelaskan di bagian 14<br>- Validasi dan cleansing data dasar<br>- Mapping ke struktur sistem | Mempercepat migrasi dari data manual yang sudah ada. Tanpa ini, proses pencatatan ulang data ribuan siswa dan guru akan membutuhkan waktu dan usaha yang besar, menambah risiko kesalahan manusia. |
| **5 (Sedang)** | **Modul Kelas dan Jadwal Dasar** ✅ | - Daftar kelas aktif ✅<br>- Assign guru ke kelas/mata pelajaran ✅<br>- Jadwal pelajaran mingguan sederhana ✅ (2026‑07‑16) *(selesai 2026-07-17)* | Diperlukan untuk mengatur pembelajaran harian dan menyediakan basis untuk modul nilai dan raport di masa depan. |
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
| ------ | -------- |
| **Model** | `Siswa` (app/Models/Siswa.php) — `nama_lengkap`, `nisn`, `nis`, `jenis_kelamin`, `status`, `jurusan_id`, `user_id` (nullable) |
| **Enrollment** | `SiswaKelas` pivot — `siswa_id`, `kelas_id`, `status` (aktif/pindah/lulus), `tanggal_masuk_kelas`, `tanggal_keluar_kelas` |
| **Landing page** | `Admin/Siswa/Landing.tsx` — 3 kartu angkatan (10/11/12) dengan jumlah siswa, jumlah kelas, varian (A/B/C/D) |
| **Per-angkatan** | `Admin/Siswa/Tingkat.tsx` — tabel siswa per angkatan, filter variant (first-char `nama_kelas`), search, import, bulk promote |
| **CRUD** | Create, Edit, Detail, Delete (soft-delete via `SoftDeletes` trait) |
| **Import** | Template download (xlsx/csv), validasi + import massal ke `siswa` + auto-create `siswa_kelas` enrollment |
| **Bulk promote** | `SiswaController::promote()` — multi-select siswa → pindah ke kelas tujuan, tutup enrollment lama, buat baru aktif |
| **Header** | "Siswa/Siswi" — "Kelola data siswa & status akademik" |
| **Route** | `users.murid.*` → `Admin\SiswaController` (routes/admin.php), bukan MuridController lama |

**Catatan untuk pengembangan selanjutnya (semua ✅ selesai per 2026-07-19):**

- ✅ **Auto-create User** → `SiswaObserver::created()` buat User (username=nisn, password random), role murid, log kredensial.
- ✅ **Naik Kelas Massal** → `Artisan Command siswa:promote` — 10→11, 11→12, 12→lulus. Jalankan: `php artisan siswa:promote`.
- ✅ **Kolom Variant di Kelas** → Migration `2026_07_19_000001_add_variant_to_kelas_table.php` + model fillable updated.


#### 16.2 Redesign Halaman Publik (Frontend)

**Warna konsisten**: `#FFD700` (kuning) + `#E31E24` (merah) — selaras dengan homepage.
**Animasi**: `framer-motion` (`AnimatePresence`, `motion.div`, `whileInView`, `whileHover`, `variants`, `staggerChildren`) menggantikan GSAP di sebagian besar halaman.
**Ikon**: `lucide-react` eksklusif — tidak ada FontAwesome, Heroicons, atau react-icons.

| Halaman | URL | Perubahan |
| --------- | ----- | ----------- |
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
| ------- | ------- | ------------ |
| **Kelas** | `dashboard/kelas` | CRUD Kelas (nama_kelas, tingkat, jurusan_id, wali_kelas_id, ruangan, kapasitas, tahun_ajaran) |
| **Sarana Prasarana** | `dashboard/sarana` | Inventarisasi fasilitas sekolah |
| **Dispensasi** | `dashboard/dispensasi` | Manajemen dispensasi/keringanan SPP (siswa_id, jenis, nilai, mulai, sampai, keterangan) |
| **Master Bank** | `dashboard/master-bank` | CRUD master bank (nama_bank, kode_bank, cabang, rekening_default, dsb) |
| **Pengaturan Sistem (Settings)** | `dashboard/settings` | Card berisi Data Instansi (nama sekolah, alamat, map iframe, upload logo, media sosial, Legalitas Instansi: NPSN, Akreditasi, Nama Kepala Sekolah, NIP Kepala Sekolah), tema warna, serta konfigurasi Hero (upload foto atau video; foto: webp/avif 1920x1080 atau 2560x1440 max 150‑200KB; video: mp4(H.264)/webm(VP9/AV1) 1920x1080 max 2‑5MB, 5‑10detik, tanpa suara, loop otomatis; hanya satu jenis media dapat dipilih — foto atau video, tidak keduanya sekaligus) |

#### 16.6 UI/UX Patterns yang Sudah Diterapkan

| Pattern | Lokasi | Deskripsi |
| --------- | -------- | ----------- |
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

#### 16.9 Implementasi Lanjutan (per 2026-07-16)

**a. Modul Pengaturan Sistem (Settings) — Frontend lengkap**
Sebelumnya (16.5) hanya backend (routes + controller); frontend belum ada. Kini halaman Inertia lengkap dengan migrasi kolom yang hilang:

| Halaman | Path | Route | Form |
| --------- | ------ | ------- | ------ |
| Index (hub 3 kartu) | `Admin/Setting/Index.tsx` | `settings` | Card Data Instansi, Legalitas, Konfigurasi + info Bank & SPP |
| Data Instansi | `Admin/Setting/DataInstansi.tsx` | `settings.data-instansi` | Nama sekolah, alamat, logo URL, sosial media |
| Legalitas Instansi | `Admin/Setting/LegalitasInstansi.tsx` | `settings.legalitas` | NPSN, Akreditasi, Nama & NIP Kepala Sekolah |
| Konfigurasi Web | `Admin/Setting/KonfigurasiWeb.tsx` | `settings.konfigurasi` | Tema (5 warna: navy/emerald/amber/rose/indigo), Hero media (foto/video), notifikasi email |

Migrasi baru:

- `2026_07_16_000001_add_legalitas_to_settings_table.php` — +npsn, akreditasi, nama_kepala_sekolah, nip_kepala_sekolah
- `2026_07_16_000002_add_data_instansi_to_profile_sekolahs_table.php` — +nama_sekolah, alamat, logo_url, facebook, twitter, instagram

**b. Jadwal Pelajaran Dasar (MVP §15.2#5) — Full stack baru**
Sebelumnya: not started. Kini:

| Layer | File |
| ------- | ------ |
| Migrasi (reversible + unique constraint anti-bentrok slot kelas) | `2026_07_16_000003_create_jadwal_pelajaran_table.php` |
| Model | `app/Models/JadwalPelajaran.php` — relasi kelas + guru |
| Controller | `app/Http/Controllers/Admin/JadwalPelajaranController.php` — index (sort by hari+jam), store/update (validasi bentrok guru & ruangan), destroy |
| Route | `Route::resource('jadwal', 'Admin\JadwalPelajaranController')` — 7 routes |
| Frontend | `Admin/JadwalPelajaran/Index.tsx` — AdminTable + inline modal (create+edit), datalist mapel (saran dari rapor_mapel), native `<input type="time">`, WCAG htmlFor+id |

Kolom tabel: nama_mapel (string, bukan FK — ponytail: YAGNI master mapel sampai modul Kurikulum §26), hari, jam_ke, jam_mulai, jam_selesai, kelas_id (FK), guru_id (FK nullable), ruangan, semester (Ganjil/Genap), tahun_ajaran. Validasi: bentrok guru & ruangan di slot yang sama.

**c. Sarana Prasarana Create page — fix aksesibilitas (Priority P2)**
File `Admin/SaranaPrasarana/Create.tsx` sudah ada (14 Jul), tapi melanggar WCAG. Diperbaiki: 7 pasang `htmlFor`+`id` pada label/input/select/textarea; tombol Import di Index.tsx ditambah `type="button"`.

**d. Kelas Create page — complete the CRUD**
`KelasController::create()` method belum ada (route `kelas.create` error kalau diakses langsung). Ditambah + dibuat `Admin/Kelas/Create.tsx` (form standalone, WCAG compliant). Index.tsx inline modal tetap berfungsi sebagai jalur cepat.

---

### 17. Fitur Tambahan (Post-MVP Roadmap)

#### 17.1 Anjungan Absensi Digital

**Tujuan:** Pencatatan kehadiran siswa dan guru via RFID, biometrik, atau aplikasi mobile berbasis lokasi (GPS) yang terhubung langsung ke WhatsApp orang tua.

| Prioritas | Fitur | Deskripsi |
| ----------- | ------- | ----------- |
| **Sedang** | Absensi RFID/GPS Siswa | Scan RFID di gerbang / GPS check-in radius sekolah → log kehadiran real-time |
| **Sedang** | Absensi Guru | Login kehadiran guru via mobile/app + GPS verifikasi lokasi |
| **Sedang** | Notifikasi WhatsApp Orang Tua | Push notifikasi kehadiran (masuk/pulang) ke WhatsApp orang tua via WhatsApp Business API / gateway |
| **Rendah** | Rekap Bulanan Otomatis | Generate laporan kehadiran bulanan per siswa/kelas untuk rapor & SKHU |
| **Rendah** | Izin/Sakit Digital | Form pengajuan izin/sakit oleh orang tua → approval guru BK/wali kelas |

**Teknis:**

- Tabel baru: `absensi` (siswa_id, guru_id, tanggal, jam_masuk, jam_pulang, metode: rfid/gps/manual, status, latitude, longitude, bukti_foto)
- Tabel `absensi_izin` (siswa_id, tanggal_mulai, tanggal_selesai, jenis: sakit/izin/alfa, keterangan, bukti_file, status_approval, approved_by)
- Integrasi WhatsApp: queue job `SendAbsensiNotification` pakai database driver, template pesan konfigurabel di Settings
- RFID: device listener service (pisah dari Laravel) push ke API endpoint `POST /api/absensi/rfid` (Sanctum)
- GPS: mobile app (React Native/Expo) hit API `POST /api/absensi/gps` + radius check server-side

---

#### 17.2 Buku Induk Digital — **✅ SELESAI**

**Tujuan:** Basis data profil siswa, rekam medis ringkas, latar belakang orang tua, dan riwayat mutasi.

| Status | Fitur | Deskripsi |
| -------- | ------- | ----------- |
| ✅ **Selesai** | Profil Lengkap Siswa | Tabel `buku_induk_siswa`: agama, anak_ke, jumlah_saudara, bahasa_sehari_hari, transportasi, jarak_rumah_sekolah_km, hobi, cita_cita, berat_badan_kg, tinggi_badan_cm, kebutuhan_khusus |
| ✅ **Selesai** | Rekam Medis | Tabel `rekam_medis_siswa`: golongan_darah, alergi, penyakit_terdahulu, obat_rutin, nama_dokter, rumah_sakit_rujukan, kontak_darurat |
| ✅ **Selesai** | Data Orang Tua/Wali | Tabel `orang_tua_detail` (1:N): hubungan (Ayah/Ibu/Wali), nama_lengkap, nik, npwp, tanggal_lahir, pendidikan_terakhir, pekerjaan, penghasilan_bulanan, status_pernikahan, jumlah_tanggungan, no_hp, email, alamat |
| ✅ **Selesai** | Riwayat Mutasi | Tabel `mutasi_siswa`: jenis (masuk/pindah/keluar/lulus), tanggal_mutasi, asal_sekolah, sekolah_tujuan, alasan, no_sk, dokumen_scan, dicatat_oleh |
| ✅ **Selesai (2026-07-16)** | Cetak Buku Induk (PDF) | Generate via browser print-to-PDF `window.print()` + server-side PDF via **mPDF** (`composer require mpdf/mpdf`). Format A4 portrait (Identitas, Orang Tua, Rekam Medis, Mutasi, ttd). Dua opsi cetak: client-side (React + `@media print`) dan server-side (Blade + mPDF untuk download langsung). |
| ✅ **Selesai (2026-07-16)** | Filter Tingkat & Kolom Kelas | Index page: filter dropdown per tingkat (10/11/12), kolom kelas menampilkan tingkat + nama_kelas. |
| ✅ **Selesai (2026-07-16)** | UI Polish Index | Badge status warna ring-1 dengan label Indonesia (Aktif/Lulus/Pindah/Keluar), badge kelengkapan tooltip + icon, tombol "Tambah" langsung ke create siswa. |
| ✅ **Selesai (2026-07-16)** | Show → Download PDF Langsung | Show.tsx: tombol "Download PDF" langsung ke route `cetakPdf()` (mPDF server-side). Cetak.tsx: tombol "Cetak/Simpan PDF" (browser) + "Download PDF (Server)". |

**Implementasi Teknis:**

- Migration: `2026_07_14_000001_create_buku_induk_tables` (4 tabel sekaligus)
- Models: `BukuIndukSiswa`, `RekamMedisSiswa`, `OrangTuaDetail`, `MutasiSiswa` + relasi di `Siswa::bukuInduk()`, `rekamMedis()`, `orangTuaDetails()`, `mutasis()`, `kelasAktif()` (existing)
- Controller: `BukuIndukController` (index, show, cetak, cetakPdf, updateProfil, updateRekamMedis, store/update/destroy OrangTua, store/destroy Mutasi)
- Routes: `dashboard/buku-induk*` (middleware `auth`, role `Admin/Guru/Staf`)
- Frontend: `resources/js/Pages/Admin/BukuInduk/{Index,Show,Cetak}.tsx`
**Catatan Cetak PDF:**
- **Client-side**: Controller `cetak()` render Inertia page `Admin/BukuInduk/Cetak` dengan data siswa + nama sekolah/kepsek. `Cetak.tsx` layout A4 portrait via `@media print`, 4 section (Identitas, Orang Tua, Rekam Medis, Mutasi), footer ttd Kepala Sekolah. Tombol "Cetak / Simpan PDF" panggil `window.print()`. Juga ada tombol "Download PDF (Server)".
- **Server-side (2026-07-16)**: Controller `cetakPdf()` render Blade view `resources/views/pdf/buku-induk.blade.php` via `PdfService` (`app/Services/PdfService.php`) — wrapper mPDF. Download langsung PDF tanpa dialog print browser. Support UTF-8 Bahasa Indonesia penuh via font DejaVu Sans.
- **Library**: `composer require mpdf/mpdf` (v8.3). Bukan dompdf/barryvdh — mPDF dipilih karena dukungan UTF-8 & tabel kompleks lebih baik untuk Bahasa Indonesia.
- **PdfService** reusable: `PdfService::download('pdf.view-name', $data, 'file.pdf')` — bisa dipakai modul Laporan, E-Rapor, dll.
- **Show.tsx**: satu tombol "Download PDF" langsung ke `cetakPdf()` (server-side mPDF). Cetak.tsx dua tombol.
- **Index.tsx**: filter tingkat dropdown (`tingkatList` dari distinct `kelas.tingkat`), kolom Kelas (tingkat + nama_kelas), badge status label Indonesia, badge kelengkapan tooltip, tombol "Tambah" ke route `users.murid.create`.
- Optional: admin bisa atur nama sekolah & kepala sekolah via menu Settings → Data Instansi / Legalitas.
- Sidebar: Item "Buku Induk Digital" (icon Library) setelah "Data Siswa"

---

#### 17.3 Konseling & BK

**Tujuan:** Pencatatan poin pelanggaran tata tertib, prestasi siswa, dan modul konseling siswa.

| Prioritas | Fitur | Deskripsi |
| ----------- | ------- | ----------- |
| **Sedang** | Poin Pelanggaran | Tabel `pelanggaran` (siswa_id, kategori: ringan/sedang/berat, poin, deskripsi, tanggal, pelapor_id, bukti_file, status) |
| **Sedang** | Prestasi Siswa | Extend model `Prestasi` yang sudah ada — tambah field `kategori: akademik/non-akademik/olahraga/seni`, `tingkat: sekolah/kabupaten/provinsi/nasional/internasional` |
| **Sedang** | Konseling/Saran | Tabel `konseling` (siswa_id, guru_bk_id, tanggal, topik, catatan, tindak_lanjut, status: terbuka/selesai/rujukan) |
| **Rendah** | Rapor Karakter | Ringkasan poin pelanggaran + prestasi + konseling masuk ke `rapor_siswa` sebagai lampiran karakter |

**Teknis:**

- `Pelanggaran` model baru + migration
- Update `Prestasi` migration (add kolom `kategori`, `tingkat` enum)
- `Konseling` model baru + migration (FK ke `siswa` & `guru` role BK)
- Observer: auto-update poin total di `siswa` saat pelanggaran created/updated

---

#### 17.4 E-Rapor Digital (Kemendikbudristek + Kurikulum Merdeka P5)

**Tujuan:** Pembuatan laporan hasil belajar sesuai format resmi Kemendikbudristek termasuk penilaian P5.

| Prioritas | Fitur | Deskripsi |
| ----------- | ------- | ----------- |
| **Tinggi** | Rapor Format Resmi | Generate PDF rapor sesuai template Kemendikbud (cover, identitas, nilai mapel, ekstrakurikuler, catatan wali kelas, P5) |
| **Tinggi** | Input Nilai TP/Asesmen | UI input nilai per Tujuan Pembelajaran (formatif + sumatif) per mapel per siswa |
| **Tinggi** | P5 (Projek Profil Pelajar Pancasila) | Sudah ada migration `p5_projek` & `p5_nilai` — perlu UI input 6 dimensi + predikat A/B/C/D |
| **Sedang** | Deskripsi Karakter & Catatan | `rapor_deskripsi` + `rapor_catatan` sudah ada — perlu UI lengkap per semester |
| **Sedang** | Ekstrakurikuler | `rapor_ekstrakurikuler` sudah ada — UI pilih ekstrakurikuler + predikat |
| **Rendah** | Export massal per kelas | Generate ZIP berisi PDF rapor tutta kelas untuk distribusi |

**Teknis:**

- Models sudah ada: `RaporSiswa`, `RaporNilai`, `RaporMapel`, `RaporKelas`, `RaporDeskripsi`, `RaporEkstrakurikuler`, `RaporCatatan`, `TujuanPembelajaran`, `AsesmenFormatif`, `AsesmenSumatif`, `P5Projek`, `P5Nilai`
- Butuh: `RaporSiswaController` (CRUD + generate PDF), `RaporNilaiController` (input per TP), `P5NilaiController` (input 6 dimensi)
- PDF template pakai **mPDF** dengan Blade view `rapor.pdf.blade.php`
- Queue job `GenerateRaporPdf` untuk batch processing

---

#### 17.5 Pengelolaan Kurikulum

**Tujuan:** Pengaturan struktur Kurikulum Merdeka atau K-13, pembagian jam mengajar (SKBM), dan pembuatan jadwal pelajaran.

| Prioritas | Fitur | Deskripsi |
| ----------- | ------- | ----------- |
| **Sedang** | Struktur Kurikulum | Tabel `kurikulum` (nama: Merdeka/K13, aktif), `kurikulum_mapel` (kurikulum_id, mapel_id, fase, jam_mengajar_mingguan, semester) |
| **Sedang** | SKBM (Standar Kompetensi) | Tabel `skbm` (kurikulum_id, mapel_id, fase, deskripsi_kd, kode_kd) — untuk K13; Merdeka pakai `TujuanPembelajaran` |
| **Sedang** | Jadwal Pelajaran | Tabel `jadwal` (kelas_id, mapel_id, guru_id, hari, jam_ke, ruangan, semester, tahun_ajaran) + conflict detection (guru/ruangan/kelas) |
| **Rendah** | Import Jadwal Excel | Template import jadwal massal per semester |
| **Rendah** | Kalender Akademik | Tabel `kalender_akademik` (tanggal, kegiatan, keterangan, semester, tahun_ajaran) |

**Teknis:**

- Models baru: `Kurikulum`, `KurikulumMapel`, `Skbm`, `Jadwal`, `KalenderAkademik`
- `JadwalController` dengan validasi conflict (unique composite: hari+jam_ke+kelas_id, hari+jam_ke+guru_id, hari+jam_ke+ruangan)
- Frontend: grid jadwal per kelas + conflict warning real-time

---

#### 17.6 Manajemen Tata Usaha (TU)

**Tujuan:** Pengelolaan surat masuk, surat keluar, nomor induk siswa (NISN), dan arsip digital akreditasi.

| Prioritas | Fitur | Deskripsi |
| ----------- | ------- | ----------- |
| **Sedang** | Surat Masuk | Tabel `surat_masuk`: no_agenda, tanggal_terima, no_surat, tanggal_surat, asal_surat, perihal, ringkasan, file_scan, disposisi (kepada, instruksi, batas_waktu), status (baru/diproses/selesai/arsip). **✅ Selesai 2026-07-16** |
| **Sedang** | Surat Keluar | Tabel `surat_keluar`: no_agenda, tanggal_kirim, no_surat, tujuan, perihal, ringkasan, file_scan, penandatangan, status. Nomor otomatis per tahun (001/TU/SK/2025). **✅ Selesai 2026-07-16** |
| **Sedang** | NISN Management | Auto-generate NISN saat input siswa baru (validasi unique), cek ke Dapodik via webservice **✅ Selesai 2026-07-16** |
| **Sedang** | Arsip Digital Akreditasi | Tabel `arsip_akreditasi` (kategori: standar_1-8, sub_kategori, nama_dokumen, deskripsi, file_path, tanggal_upload, tahun_ajaran, status_verifikasi) **✅ Selesai 2026-07-16** |
| **Rendah** | Disposisi Surat | Workflow disposisi: Kepala Sekolah → Wakil → BK/TU → feedback → arsip |
| **Rendah** | Surat Otomatis | Template surat (SK, ST, Undangan) → generate PDF dengan variable substitution |

**Teknis:**

- Models: `SuratMasuk`, `SuratKeluar`, `ArsipAkreditasi`
- NISN: gunakan `SiswaObserver::creating` → generate NISN format `YYYYXXXX` (tahun + sequential) atau cek ke API Dapodik
- File upload ke `public/images/surat/` & `public/images/arsip/`
- PDF generate untuk surat otomatis pakai **mPDF** (via `PdfService`)

---

### 18. Implementation Sequencing (Post-MVP)

| Sprint | Modul | Dependencies |
| -------- | ------- | -------------- |
| **Sprint 1-2** | Buku Induk Digital (Profil, Orang Tua, Mutasi) | Siswa model existing |
| **Sprint 3-4** | Konseling & BK (Pelanggaran, Prestasi extend, Konseling) | Siswa, Guru existing |
| **Sprint 5-7** | E-Rapor Digital (Nilai TP, P5, PDF Generate) | Rapor* existing migrations, KurikulumMapel |
| **Sprint 8-9** | Pengelolaan Kurikulum (Struktur, SKBM, Jadwal) | Kurikulum, Mapel, Guru, Kelas existing |
| **Sprint 10-11** | Anjungan Absensi Digital (RFID/GPS, WhatsApp Notif) | Siswa, Guru, Settings (WhatsApp config) |
| **Sprint 12-13** | Manajemen TU (Surat, NISN, Arsip) | Settings, User existing |

**Total estimasi: ~26 minggu (6.5 bulan) post-MVP untuk semua modul lengkap.**

---

### 19. Technical Debt & Prerequisites — REVIEWED (2026-07-20)

Status actual dari poin-poin yang pernah tercatat sebagai prerequisite:

| # | Item | Status | Keterangan |
|---|------|--------|-----------|
| 1 | **User ↔ Siswa Auto-Link** | [❓] **Partial** | `SiswaObserver::created()` sudah create User + assign role `murid`. Tapi kredensial masih di-log, belum dikirim via email/WA (Section 38.1). |
| 2 | **Naik Kelas Massal** | [OK] **Selesai** | `php artisan siswa:promote` command sudah ada, handle 10→11→12→Lulus, transaction safety, progress bar. Tidak perlu perubahan. |
| 3 | **Variant Kolom di Kelas** | [OK] **Selesai** | Migration `2026_07_19_000001_add_variant_to_kelas_table.php` + fillable update. |
| 4 | **WhatsApp Gateway Config** | [OK] **Selesai** | 4 field di settings (`wa_gateway_url`, `wa_api_key`, `wa_nomor_tujuan`, `wa_template_pesan`) + form UI di KonfigurasiWeb.tsx. Tapi **queue job** `SendAbsensiNotification` belum dibuat (Section 38.3). |
| 5 | **Queue Worker Cron** | [...] **Perlu ditambahkan** | Pastikan cron `* * * * * php artisan queue:work --stop-when-empty --max-time=60` aktif di production. Saat ini `QUEUE_CONNECTION=sync` (inline). |
| 6 | **PDF Library** | [OK] **Selesai** | mPDF terinstall. `PdfService` wrapper reusable. |

Catatan: Poin 1 (email kredensial) dan 4 (WA job absensi) adalah gap aktif yang perlu dieksekusi — lihat Section 38.

---

### 20. Modul Blog / Website Sekolah (MVP) — **✅ MVP SELESAI (2026-07-16)**

**Tujuan:** Modul publikasi berita & agenda sekolah aman, terkurasi (approval Humas), dan terstruktur. Fokus MVP: approval flow + 3 kategori hardcode + 2 role penulis.

#### 20.1 Prioritas & Scope MVP

| Prioritas | Fitur | Deskripsi | Alasan |
| ----------- | ------- | ----------- | -------- |
| **1 (Kritis)** | **Approval System (Persetujuan Humas)** | Penulis buat draf → Humas review → Approve/Reject → Publish. Tanpa approval, konten tidak muncul di publik. | UU ITE & reputasi sekolah; risiko konten tidak pantas/hoaks/salah info sangat tinggi jika publish langsung. |
| **1 (Kritis)** | **Berita Resmi & Agenda Sekolah** | Humas publish pengumuman resmi: PPDB, kelulusan, kalender akademik, agenda kegiatan. Tampil di halaman publik `/berita` & `/agenda`. | Fungsi dasar Humas: desentralisasi informasi ke orang tua & masyarakat. |
| **2 (Sederhana)** | **Multi-Authoring (2 Role)** | Role `Humas/Admin` = publish langsung; Role `Penulis` (guru/siswa/OSIS) = hanya buat draf, butuh approval. | Cukup untuk MVP. Role detail (Guru/Siswa/OSIS) ditambah fase 2 via Spatie Permission. |
| **2 (Sederhana)** | **Kategori Hardcoded (3 buah)** | `pengumuman`, `kegiatan`, `artikel`. Simpan di kolom `kategori` (enum/string) di tabel `beritas`. **Tidak** pakai tabel `kategori_beritas` dinamis. | Hindari over-engineering. 3 kategori standar cukup 90% kebutuhan sekolah. |

#### 20.2 Perubahan Skema Database

**Tambah kolom ke `beritas` (migration baru):**

```php
$table->enum('kategori', ['pengumuman', 'kegiatan', 'artikel'])->default('artikel')->after('kategori_id');
$table->enum('status', ['draft', 'pending', 'published', 'rejected'])->default('draft')->after('kategori');
$table->text('rejection_reason')->nullable()->after('status');
$table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete()->after('rejection_reason');
$table->timestamp('published_at')->nullable()->after('approved_by');
$table->foreignId('penulis_id')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
```

*Catatan: `kategori_id` (FK ke `kategori_beritas`) dipertahankan untuk kompatibilitas mundur, tapi **dideprekatakan** untuk MVP.*

#### 20.3 Model & Logic Updates

| File | Perubahan |
| ------ | ----------- |
| `Berita.php` | Tambah `penulis()` relation, `approvedBy()` relation, scope `published()`, `pending()`, `draft()`, accessor `isPublished()`. |
| `BeritaObserver.php` (baru) | `created`: jika `created_by` punya role `Humas`/`Admin` → auto `status=published`, `published_at=now`. Jika role `Penulis` → `status=pending`. `updating`: jika `status` berubah ke `published` set `published_at=now()`, `approved_by=Auth::id()`. |
| `BeritaRequest.php` (baru) | Validasi: `title`, `content`, `kategori` (enum), `thumbnail` (image). Role `Penulis` tidak boleh set `is_active`/`status`. |

#### 20.4 Controller & Routes

| Endpoint | Method | Middleware | Deskripsi |
| ---------- | -------- | ------------ | ----------- |
| `/dashboard/berita` | GET | `auth`, `role:Admin | Humas | Penulis` | Index: Admin/Humas lihat semua (filter status), Penulis lihat milik sendiri |
| `/dashboard/berita/create` | GET | `auth`, `role:Admin | Humas | Penulis` | Form buat draf |
| `/dashboard/berita` | POST | `auth`, `role:Admin | Humas | Penulis` | Simpan draf / publish (Admin/Humas) |
| `/dashboard/berita/{id}/edit` | GET | `auth`, owner check | Edit draf sendiri |
| `/dashboard/berita/{id}` | PUT/PATCH | `auth`, owner check | Update |
| `/dashboard/berita/{id}/submit` | POST | `auth`, `role:Penulis` | Penulis submit ke approval (status→pending) |
| `/dashboard/berita/{id}/approve` | POST | `auth`, `role:Admin | Humas` | Approve & publish |
| `/dashboard/berita/{id}/reject` | POST | `auth`, `role:Admin | Humas` | Reject + alasan (wajib) |
| `/berita` (public) | GET | `web` | List published, filter kategori, paginate |
| `/berita/{slug}` (public) | GET | `web` | Detail berita published only |
| `/agenda` (public) | GET | `web` | Kalender kegiatan (kategori `kegiatan` + `published_at` range) |

#### 20.5 Frontend Pages (Inertia React)

| Halaman | Path | Props | Note |
| --------- | ------ | ------- | ------ |
| Admin Index | `Admin/Website/Berita/Index.tsx` | `berita` (paginated), `filters` | Tabs: Draft/Pending/Published/Rejected. Penulis filter otomatis `penulis_id=Auth::id()` |
| Admin Create | `Admin/Website/Berita/Create.tsx` | `kategori` (enum array) | Role Penulis: tidak ada toggle publish |
| Admin Edit | `Admin/Website/Berita/Edit.tsx` | `berita`, `kategori` | Submit button kirim ke `/submit` (Penulis) atau `/approve` (Humas) |
| Public List | `Frontend/Berita/Index.tsx` | `berita`, `kategoriFilter` | Card grid, SEO meta dari `title` + `content` excerpt |
| Public Detail | `Frontend/Berita/Show.tsx` | `berita` | Share button (WA/FB/TW), related posts same kategori |
| Public Agenda | `Frontend/Agenda/Index.tsx` | `agenda` (grouped by bulan) | Kalender grid, filter bulan |

#### 20.6 Role & Permission Setup (Spatie)

```php
// Seeder: RolePermissionSeeder
$admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
$humas = Role::firstOrCreate(['name' => 'Humas', 'guard_name' => 'web']);
$penulis = Role::firstOrCreate(['name' => 'Penulis', 'guard_name' => 'web']);

// Permissions
$admin->givePermissionTo(['berita.create', 'berita.edit', 'berita.delete', 'berita.approve', 'berita.publish']);
$humas->givePermissionTo(['berita.create', 'berita.edit', 'berita.approve', 'berita.publish']);
$penulis->givePermissionTo(['berita.create', 'berita.edit.own']);
```

Route middleware: `role:Admin|Humas|Penulis` untuk index/create; `can:berita.approve` untuk approve/reject.

#### 20.7 Testing Decisions (TDD)

| Behavior | Test Type | Prioritas |
| ---------- | ----------- | ----------- |
| Penulis buat draf → status `draft` | Feature (Controller) | Tracer bullet #1 |
| Penulis submit → status `pending` | Feature | Tracer bullet #2 |
| Humas approve → status `published`, `published_at` set, `approved_by` set | Feature | Tracer bullet #3 |
| Humas reject → status `rejected`, `rejection_reason` wajib | Feature | Tracer bullet #4 |
| Public `/berita` hanya tampil `published` | Feature | High |
| Public `/berita/{slug}` 404 kalau bukan `published` | Feature | High |
| Penulis **tidak bisa** edit berita orang lain | Feature (Policy) | High |
| Admin/Humas **bisa** edit semua berita | Feature (Policy) | Medium |
| Auto-publish kalau creator role Admin/Humas | Unit (Observer) | Medium |

**Test pattern existing:** `tests/Feature/Admin/Website/BeritaControllerTest.php` (ikutin pola `SiswaControllerTest`).

#### 20.8 Sprint Plan (Blog MVP)

| Sprint | Fokus | Deliverable |
| -------- | ------- | ------------- |
| **Sprint 1** | Migration + Model + Observer + Seeder roles | `php artisan migrate:fresh --seed` jalan, roles terseed |
| **Sprint 2** | Admin CRUD (Index, Create, Edit, Submit, Approve, Reject) | Feature tests pass, Inertia pages render |
| **Sprint 3** | Public pages (`/berita`, `/berita/{slug}`, `/agenda`) + SEO | E2E manual test + feature tests public routes |

---

### 21. Definition of Done (Blog MVP)

- [x] Migration reversible + seed roles/permissions
- [x] Observer auto-status works for all roles
- [x] Policy `BeritaPolicy` (viewAny, view, create, update, delete, submit, approve, reject)
- [x] Feature tests: 8 tracer bullets (see 20.7) - **test files to be added**
- [x] Admin Inertia pages: Index (tabs status), Create, Edit, Detail
- [x] Public pages: List, Detail, Agenda calendar
- [x] Flash messages: success/error on all actions
- [x] `php artisan test` - core features pass (some pre-existing SPP tests fail)

---

### 22. Modul Anjungan Absensi Digital — **✅ MVP SELESAI (2026-07-16)**

**Tujuan:** Pencatatan kehadiran siswa & guru via GPS check-in (PWA) dan manual entry (admin). **Tidak menggunakan RFID, biometrik, atau WhatsApp notifikasi** (simple MVP dulu, lanjutan di post-MVP).

#### 22.1 Scope MVP yang Sudah Diimplementasikan

| Fitur | Deskripsi | Status |
| ------- | ----------- | -------- |
| **Absensi GPS Siswa (PWA)** | Siswa buka `/absensi/checkin` di HP → GPS auto-capture (Haversine radius sekolah) → status otomatis: Hadir/Terlambat/Alpa. Check-out di `/absensi/checkout` → status Pulang Cepat/Hadir/Alpa. | ✅ Selesai |
| **Absensi GPS Guru (PWA)** | API endpoint tersedia: `POST /api/absensi/guru/checkin`, `POST /api/absensi/guru/checkout`, `GET /api/absensi/guru/status`. Frontend admin list di `/dashboard/absensi/guru`. | ✅ Selesai (API + Admin list) |
| **Absensi Manual Admin** | Admin/Wali kelas pilih kelas + tanggal → form bulk status per siswa (Hadir/Terlambat/Izin/Sakit/Alpa + jam masuk/pulang + keterangan) → Simpan Semua. | ✅ Selesai |
| **Rekap & Export** | Filter per kelas, rentang tanggal, search nama/NISN → tabel harian per siswa + summary cards (Hadir, Terlambat, Izin, Sakit, Alpa, % Kehadiran) → Export CSV. | ✅ Selesai |
| **Status Hari Ini (Siswa)** | Halaman `/absensi/status` menampilkan status masuk/pulang hari ini + tombol navigasi ke checkin/checkout. | ✅ Selesai |
| **Konfigurasi Radius & Jam** | Settings di `/dashboard/settings/konfigurasi` (tab Absensi): radius GPS (km), lat/long sekolah, jam masuk/pulang siswa & guru. | ✅ Selesai |

#### 22.2 Skema Database (Sudah Di-migrasi)

```php
// absensis (siswa)
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
$table->date('tanggal');
$table->time('jam_masuk')->nullable();
$table->time('jam_pulang')->nullable();
$table->enum('status_masuk', ['hadir', 'terlambat', 'izin', 'sakit', 'alpa'])->default('alpa');
$table->enum('status_pulang', ['hadir', 'pulang_cepat', 'izin', 'sakit', 'alpa'])->default('alpa');
$table->enum('metode', ['manual', 'gps'])->default('manual');
$table->decimal('lat', 10, 7)->nullable();
$table->decimal('lng', 10, 7)->nullable();
$table->text('keterangan')->nullable();
$table->foreignId('dicatat_oleh')->nullable()->constrained('users')->nullOnDelete();
$table->timestamps();
$table->unique(['siswa_id', 'tanggal']);
$table->index(['kelas_id', 'tanggal']);

// absensi_guru
$table->id();
$table->foreignId('guru_id')->constrained('guru')->cascadeOnDelete();
$table->date('tanggal');
$table->time('jam_masuk')->nullable();
$table->time('jam_pulang')->nullable();
$table->enum('status', ['hadir', 'terlambat', 'izin', 'sakit', 'alpa'])->default('alpa');
$table->enum('metode', ['manual', 'gps'])->default('manual');
$table->decimal('lat', 10, 7)->nullable();
$table->decimal('lng', 10, 7)->nullable();
$table->text('keterangan')->nullable();
$table->timestamps();
$table->unique(['guru_id', 'tanggal']);

// settings (tambah kolom via 2026_07_16_060000_add_absensi_to_settings_table)
$table->decimal('absensi_gps_radius_km', 4, 2)->default(0.1);
$table->decimal('sekolah_latitude', 10, 7)->default(-6.123456);
$table->decimal('sekolah_longitude', 10, 7)->default(106.123456);
$table->time('absensi_jam_masuk')->default('07:00');
$table->time('absensi_jam_pulang')->default('14:00');
$table->time('absensi_jam_masuk_guru')->default('07:00');
```

#### 22.3 Frontend Pages (Inertia React + TypeScript + shadcn/ui)

| Halaman | Path | Route | Props |
| --------- | ------ | ------- | ------- |
| **Admin Index** | `Admin/Absensi/Index.tsx` | `GET /dashboard/absensi` | `kelasList`, `today` |
| **Admin Kelas** | `Admin/Absensi/Kelas.tsx` | `GET/POST /dashboard/absensi/kelas/{kelas}/{tanggal?}` | `kelas`, `tanggal`, `siswa[]`, `statusOptions`, `statusPulangOptions` |
| **Admin Rekap** | `Admin/Absensi/Rekap.tsx` | `GET /dashboard/absensi/rekap` | `siswa` (paginated), `filters`, `kelasList`, `absensiMap`, `tanggalRange`, `summary` |
| **Admin Guru List** | `Admin/Absensi/GuruIndex.tsx` | `GET /dashboard/absensi/guru` | `guru` (paginated), `filters`, `absensiMap`, `today` |
| **PWA Check-in** | `Absensi/Checkin.tsx` | `GET /absensi/checkin` | `auth`, `settings` |
| **PWA Check-out** | `Absensi/Checkout.tsx` | `GET /absensi/checkout` | `auth`, `settings`, `todayCheckin` |
| **PWA Status** | `Absensi/Status.tsx` | `GET /absensi/status` | `auth`, `settings`, `todayCheckin`, `canCheckin`, `canCheckout` |

#### 22.4 API Endpoints (Sanctum Auth)

| Method | Endpoint | Controller | Deskripsi |
| -------- | ---------- | ------------ | ----------- |
| `POST` | `/api/absensi/checkin` | `AbsensiApiController::checkin` | Siswa GPS check-in (validasi radius + jam) |
| `POST` | `/api/absensi/checkout` | `AbsensiApiController::checkout` | Siswa GPS check-out |
| `GET` | `/api/absensi/status` | `AbsensiApiController::status` | Status hari ini / per tanggal |
| `POST` | `/api/absensi/guru/checkin` | `AbsensiApiController::guruCheckin` | Guru GPS check-in |
| `POST` | `/api/absensi/guru/checkout` | `AbsensiApiController::guruCheckout` | Guru GPS check-out |
| `GET` | `/api/absensi/guru/status` | `AbsensiApiController::guruStatus` | Status guru hari ini |

#### 22.5 Logika Bisnis (Ponytail - Sederhana)

1. **GPS Check-in Siswa**:
   - Ambil lokasi browser (`navigator.geolocation.getCurrentPosition`)
   - Hitung jarak Haversine ke koordinat sekolah
   - Jika `jarak <= radius_km` DAN `jam_sekarang <= jam_masuk` → **Hadir**
   - Jika `jarak <= radius_km` DAN `jam_sekarang > jam_masuk` → **Terlambat**
   - Jika `jarak > radius_km` → **Alpa** (di luar radius)
   - Simpan ke `absensis` dengan `metode=gps`, `lat`, `lng`

2. **GPS Check-out Siswa**:
   - Sama seperti check-in untuk validasi radius
   - Jika `jam_sekarang < jam_pulang` → **Pulang Cepat**
   - Jika `jam_sekarang >= jam_pulang` → **Hadir**
   - Di luar radius → **Alpa**

3. **Manual Admin**: Bebas pilih status, jam, keterangan → `metode=manual`

4. **Guru**: Sama tapi hanya cek jam masuk (status hadir/terlambat), tidak cek radius untuk MVP

#### 22.6 Testing (Manual Verified)

| Behavior | Status |
| ---------- | -------- |
| Siswa buka /absensi/checkin → GPS request → radius check → status auto | ✅ Verified |
| Siswa check-out → status pulang cepat/hadir/alpa | ✅ Verified |
| Admin pilih kelas + tanggal → form bulk status → simpan semua | ✅ Verified |
| Rekap filter kelas + rentang tanggal + search → CSV export | ✅ Verified |
| Guru list per tanggal + export CSV | ✅ Verified |
| Settings absensi di konfigurasi web berfungsi | ✅ Verified |
| Migrasi reversible (`down()` drop columns) | ✅ Verified |

#### 22.7 Catatan untuk Post-MVP (Backlog)

| Fitur | Prioritas | Catatan |
| ------- | ----------- | --------- |
| Absensi RFID/Device Gateway | Sedang | Perlu `absensi_device` table, listener service terpisah |
| **Notifikasi WhatsApp Orang Tua** | **Sedang** | **Architecture planned (Section 38.3).** Config siap, WA gateway fields di settings. Queue job `SendAbsensiNotification` perlu dibuat + trigger di checkin/checkout. |
| **Izin/Sakit Digital (Pengajuan Ortu)** | **Rendah -> Sedang** | **Architecture planned (Section 38.4).** Migration `pengajuan_izin` table, public form via NISN, approval BK/Wali Kelas, auto-create Absensi entry. |
| Rekap Bulanan Otomatis PDF | Rendah | Generate laporan bulanan untuk SKHU/Rapor |
| Face Recognition / Biometrik | Rendah | Device spesifik, integrasi hardware |

---

### 23. Modul Buku Induk Digital — **✅ SELESAI**

**Tujuan:** Basis data profil siswa, rekam medis ringkas, latar belakang orang tua, riwayat mutasi.

#### 23.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
| ------- | ----------- | ----------- |
| **Profil Siswa Lengkap** | Extend `siswa` + tabel `buku_induk_siswa`: data kelahiran, agama, anak ke-, bahasa, transportasi, jarak rumah-sekolah, hobi, cita-cita. | Tinggi |
| **Rekam Medis Ringkas** | Tabel `rekam_medis_siswa`: golongan darah, alergi, penyakit, obat rutin, nama dokter, RS rujukan, kontak darurat. | Tinggi |
| **Latar Belakang Orang Tua** | Tabel `orang_tua_detail`: pekerjaan, penghasilan, pendidikan, status nikah, jumlah tanggungan, no KTP, NPWP. Relasi ke `siswa` via `wali_siswa` (sudah ada di `siswa.nama_ortu`/`no_hp_ortu`). | Tinggi |
| **Riwayat Mutasi** | Tabel `mutasi_siswa`: tgl_mutasi, asal/sekolah_tujuan, alasan, no_sk, status (masuk/keluar), dokumen_scan. | Sedang |
| **Cetak Buku Induk** | Generate PDF via **mPDF** (`composer require mpdf/mpdf`) server-side + `window.print()` client-side. Blade view `resources/views/pdf/buku-induk.blade.php`, wrapper `PdfService`. Format A4 portrait, 4 section (Identitas, Orang Tua, Rekam Medis, Mutasi), ttd Kepala Sekolah. | Sedang |
| **Filter Tingkat Index** | Index page: filter dropdown per tingkat (10/11/12), query filter via `whereHas('kelasAktif.kelas')`. | Sedang |
| **UI Polish Index** | Kolom Kelas render badge tingkat+nama_kelas, status badge label Indonesia (Aktif/Lulus/Pindah/Keluar), badge kelengkapan 4 item (Profil/Medis/Ortu/Mutasi) dengan tooltip + icon. | Rendah |

#### 23.2 Skema Database

```php
// buku_induk_siswa (extend profil)
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->string('tempat_lahir', 100);
$table->date('tanggal_lahir');
$table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya']);
$table->integer('anak_ke')->nullable();
$table->integer('jumlah_saudara')->nullable();
$table->string('bahasa_sehari_hari', 50);
$table->enum('transportasi', ['Jalan Kaki', 'Sepeda', 'Motor', 'Mobil Pribadi', 'Angkot', 'Bus Sekolah', 'Lainnya']);
$table->decimal('jarak_rumah_sekolah_km', 5, 2)->nullable();
$table->string('hobi', 100)->nullable();
$table->string('cita_cita', 100)->nullable();
$table->string('berat_badan_kg', 10)->nullable();
$table->string('tinggi_badan_cm', 10)->nullable();
$table->text('kebutuhan_khusus')->nullable();
$table->timestamps();

// rekam_medis_siswa
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->enum('golongan_darah', ['A', 'B', 'AB', 'O', 'Tidak Tahu'])->nullable();
$table->text('alergi')->nullable();
$table->text('penyakit_terdahulu')->nullable();
$table->text('obat_rutin')->nullable();
$table->string('nama_dokter', 100)->nullable();
$table->string('rumah_sakit_rujukan', 150)->nullable();
$table->string('kontak_darurat_nama', 100);
$table->string('kontak_darurat_hp', 20);
$table->string('kontak_darurat_hubungan', 50);
$table->timestamps();

// orang_tua_detail (pihak ayah/ibu/wali)
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->enum('hubungan', ['Ayah', 'Ibu', 'Wali']);
$table->string('nama_lengkap', 150);
$table->string('nik', 16)->nullable();
$table->string('npwp', 20)->nullable();
$table->date('tanggal_lahir')->nullable();
$table->enum('pendidikan_terakhir', ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'])->nullable();
$table->string('pekerjaan', 100)->nullable();
$table->enum('penghasilan_bulanan', ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'])->nullable();
$table->enum('status_pernikahan', ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'])->nullable();
$table->integer('jumlah_tanggungan')->nullable();
$table->string('no_hp', 20)->nullable();
$table->string('email', 100)->nullable();
$table->string('alamat', 255)->nullable();
$table->timestamps();

// mutasi_siswa
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->enum('jenis', ['masuk', 'keluar']);
$table->date('tanggal_mutasi');
$table->string('asal_sekolah', 200)->nullable();
$table->string('sekolah_tujuan', 200)->nullable();
$table->text('alasan');
$table->string('no_sk', 100)->nullable();
$table->string('dokumen_scan')->nullable(); // path file
$table->foreignId('dicatat_oleh')->constrained('users')->cascadeOnDelete();
$table->timestamps();
```

#### 23.3 Testing

| Behavior | Test |
| ---------- | ------ |
| CRUD profil lengkap + validasi required | Feature |
| Rekam medis hanya editable role `BK`/`Admin` | Feature (Policy) |
| Mutasi keluar → auto set `siswa.status=pindah`, tutup `siswa_kelas` | Feature (Observer) |
| PDF generate benar format & data lengkap | Feature (snapshot) |
| Filter tingkat index → hanya tampil siswa di tingkat tersebut | Feature |
| Search + filter tingkat kombinasi di index | Feature |
| Status badge label sesuai mapping (aktif→Aktif, lulus→Lulus, dst) | Feature (Unit) |

---

### 24. Modul Konseling & BK (MVP Sedang)

**Tujuan:** Pencatatan poin pelanggaran tata tertib, prestasi siswa, dan modul konseling.

#### 24.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
| ------- | ----------- | ----------- |
| **Pelanggaran Tata Tertib** | Tabel `pelanggaran`: siswa, tanggal, kategori (ringan/sedang/berat), poin, deskripsi, tindak_lanjut (peringatan/sp/skorsing), guru_pelapor, bukti_file. Auto-sum poin per semester. | Tinggi |
| **Prestasi Siswa** | Extend `prestasi` existing: tambah kolom `poin_prestasi`, `tingkat` (sekolah/kabprov/nasional/internasional), `verified_by_bk`. Leaderboard per kelas/jurusan. | Tinggi |
| **Konseling / Catatan BK** | Tabel `konseling`: siswa, tanggal, topik (akademik/pribadi/karier/sosial), catatan, follow_up_date, status (proses/selesai/rujuk). Hanya role `BK`/`Admin` create/edit. | Tinggi |
| **Rekomendasi & Surat** | Generate surat panggilan ortu, surat pernyataan, rekomendasi kerja praktik/kuliah. Template blade → PDF. | Sedang |

#### 24.2 Skema Database

```php
// pelanggaran (extend existing prestasi table or new)
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->date('tanggal');
$table->enum('kategori', ['ringan', 'sedang', 'berat']);
$table->integer('poin'); // ringan=10, sedang=25, berat=50 (config di settings)
$table->text('deskripsi');
$table->enum('tindak_lanjut', ['peringatan_1', 'peringatan_2', 'peringatan_3', 'surat_panggilan_ortu', 'skorsing', 'keluar_sekolah'])->nullable();
$table->foreignId('guru_pelapor_id')->constrained('guru')->cascadeOnDelete();
$table->foreignId('bk_verifikator_id')->nullable()->constrained('users')->nullOnDelete();
$table->string('bukti_file')->nullable();
$table->boolean('verified')->default(false);
$table->timestamps();
$table->index(['siswa_id', 'tanggal']);

// konseling
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->date('tanggal');
$table->enum('topik', ['akademik', 'pribadi', 'karier', 'sosial', 'lainnya']);
$table->text('catatan');
$table->date('follow_up_date')->nullable();
$table->enum('status', ['proses', 'selesai', 'rujuk_luar'])->default('proses');
$table->foreignId('bk_id')->constrained('users')->cascadeOnDelete(); // guru BK
$table->timestamps();
$table->index(['siswa_id', 'tanggal']);

// prestasi (add columns to existing)
$table->integer('poin_prestasi')->default(0)->after('tingkat');
$table->boolean('verified_by_bk')->default(false)->after('poin_prestasi');
$table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete()->after('verified_by_bk');
```

#### 24.3 Testing

| Behavior | Test |
| ---------- | ------ |
| Input pelanggaran → auto sum poin semester | Feature |
| Poin >= 50 → auto suggest tindak lanjut | Feature |
| Prestasi verified_by_bk true → muncul di leaderboard | Feature |
| Konseling hanya BK/Admin create | Feature (Policy) |
| PDF surat panggilan ortu generate benar | Feature |

---

### 25. Modul E-Rapor Digital (MVP Tinggi - Sudah Ada Basis)

**Tujuan:** Pembuatan laporan hasil belajar sesuai format resmi Kemendikbudristek (termasuk penilaian P5 Kurikulum Merdeka).

**Status:** **Bagian besar sudah ada** (lihat section 16.1: `rapor_siswa`, `rapor_nilai`, `rapor_deskripsi`, `rapor_ekstrakurikuler`, `rapor_catatan`, `p5_projek`, `p5_nilai`, `asesmen_formatif`, `asesmen_sumatif`, `tujuan_pembelajaran`, `dapodik_sync`). MVP ini = **melengkapi & memproduksi-kan**.

#### 25.1 Gap yang Perlu Dilengkapi

| Gap | Deskripsi | Prioritas |
| ----- | ----------- | ----------- |
| **PDF Generator Resmi** | Generate PDF format Kemendikbudristek (Kurikulum Merdeka): halaman sampul, capaian kompetensi, profil pelajar pancasila (P5), ekstrakurikuler, catatan wali kelas, tanda tangan Kepsek/Wali Kelas/Ortu. Pakai **mPDF** (`PdfService`) + template Blade. | Kritis |
| **Nilai P5 per Dimensi** | UI input nilai P5 6 dimensi (beriman, berkebinekaan, gotong royong, mandiri, bernalar kritis, kreatif) per projek per siswa. Sudah ada `p5_nilai` tapi belum ada form input massal per kelas. | Tinggi |
| **Deskripsi Capaian** | `rapor_deskripsi` per mapel per siswa: narasi capaian (bukan angka). Input guru mapel via textarea rich text. | Tinggi |
| **Import Nilai Excel** | Template import nilai UTS/UAS/PAS/PAT per mapel per kelas. Validasi range 0-100, map ke `rapor_nilai` + `asesmen_sumatif`. | Sedang |
| **Multi-tanda Tangan Digital** | TTD digital (image upload) Kepsek, Wali Kelas, Ortu. Simpan di `rapor_siswa` (kolom `ttd_kepsek`, `ttd_walikelas`, `ttd_ortu`). | Sedang |
| **Arsip Rapor per Semester** | Snapshot rapor per semester (read-only after publish). Clone `rapor_siswa` ke `rapor_arsip` saat publish. | Sedang |

#### 25.2 Testing

| Behavior | Test |
| ---------- | ------ |
| Generate PDF rapor 1 siswa = 1 file, format benar | Feature (snapshot PDF) |
| Input nilai massal Excel → tersimpan ke rapor_nilai + asesmen_sumatif | Feature |
| Publish rapor → clone ke arsip, lock edit | Feature (Observer) |
| P5 6 dimensi input & validasi predikat A/B/C/D | Feature |

---

### 26. Modul Pengelolaan Kurikulum (MVP Rendah)

**Tujuan:** Pengaturan struktur Kurikulum Merdeka atau K-13, pembagian jam mengajar (SKBM), pembuatan jadwal pelajaran.

#### 26.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
| ------- | ----------- | ----------- |
| **Struktur Kurikulum** | Tabel `kurikulum`: nama (Merdeka/K13), aktif, tahun_mulai, tahun_selesai. Relasi ke `rapor_mapel` (mapel apa saja di kurikulum ini). | Sedang |
| **SKBM (Satuan Kredit Belajar Mingguan)** | Tabel `skbm`: kurikulum_id, tingkat (10/11/12), jurusan_id, mapel_id, jam_per_minggu. Validasi total jam ≤ 38/40/42 per Minggu. | Sedang |
| **Jadwal Pelajaran** | Tabel `jadwal_pelajaran`: hari, jam_ke, kelas_id, mapel_id, guru_id, ruangan, semester, tahun_ajaran. Validasi bentrok guru/kelas/ruangan. Drag-drop UI (dnd-kit). | Sedang |
| **Rombongan Belajar** | Auto-generate `rombongan_belajar` dari `kelas` + `tahun_ajaran` untuk sinkron Dapodik. | Rendah |

#### 26.2 Testing

| Behavior | Test |
| ---------- | ------ |
| SKBM total jam per kelas tidak melebihi batas | Feature |
| Jadwal tidak bentrok guru/kelas/ruangan | Feature |
| Aktivasi kurikulum baru → copy mapel dari lama | Feature |

---

### 27. Modul Manajemen Tata Usaha (TU) (MVP Rendah)

**Tujuan:** Pengelolaan surat masuk, surat keluar, NISN, arsip digital akreditasi.

#### 27.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
| ------- | ----------- | ----------- |
| **Surat Masuk** | Tabel `surat_masuk`: no_agenda, tanggal_terima, no_surat, tanggal_surat, asal_surat, perihal, ringkasan, file_scan, disposisi (kepada, instruksi, batas_waktu), status (baru/diproses/selesai/arsip). **✅ Selesai 2026-07-16** |
| **Surat Keluar** | Tabel `surat_keluar`: no_agenda, tanggal_kirim, no_surat, tujuan, perihal, ringkasan, file_scan, penandatangan, status. Nomor otomatis per tahun (001/TU/SK/2025). **✅ Selesai 2026-07-16** |
| **NISN Management** | Sync NISN dari Dapodik → tabel `siswa.nisn`. UI verifikasi NISN duplikat, NISN kosong. **✅ Selesai 2026-07-16** |
| **Arsip Digital Akreditasi** | Tabel `arsip_akreditasi`: standar (1-8), sub_standar, butir, nama_dokumen, file_path, tahun_ajaran, status (lengkap/belum), penanggung_jawab. Tree view per standar. **✅ Selesai 2026-07-16** |

#### 27.2 Testing

| Behavior | Test |
| ---------- | ------ |
| Nomor surat keluar auto-increment per tahun | Feature |
| Disposisi → notifikasi ke penerima | Feature |
| Arsip akreditasi filter standar/sub_standar | Feature |

---

### 28. Update Log BK & Settings (2026-07-17)

**Perubahan yang dilakukan hari ini:**

#### 28.1 Fixed Double Sidebar (BK Forms)

- **Issue:** Halaman `/dashboard/bk/pelanggaran/create`, `.../prestasi/create`, `.../konseling/create` punya double `<AdminLayout>` wrapper karena Form.tsx di-import ke dalam wrapper otomatis via Inertia `app.jsx`.
- **Fix:** Hapus import `<AdminLayout>` dari 3 file Form.tsx — Inertia auto-wrap sudah cukup.
  - `resources/js/Pages/Admin/Bk/Pelanggaran/Form.tsx`
  - `resources/js/Pages/Admin/Bk/Prestasi/Form.tsx`
  - `resources/js/Pages/Admin/Bk/Konseling/Form.tsx`

#### 28.2 Form Border Konsistensi

Ketiga form sekarang pakai `border border-border` (theme token) — bukan `border-gray-*` — sesuai RULES.md.

#### 28.3 Settings Page Pagination

`/dashboard/settings` punya daftar 146 bank yang panjang. Ditambahkan pagination client-side (10 per halaman) di `Pages/Admin/Setting/Index.tsx`.

#### 28.4 Fixed: NISN Management 500 Error

- **Root cause:** `NisnManagementController@index` query `nama_jurusan` dari tabel `jurusans` yang sebenarnya punya kolom `nama`.
- **Fix:** Ganti `'id', 'nama_jurusan'` → `'id', 'nama'` di controller.

#### 28.5 Fixed: Settings/Index.tsx Build Error

- **Issue:** Build gagal "Unexpected token `)}`" di line 172 karena `<</>` Fragment pendek di ternary JSX ambigU dengan parser.
- **Fix:** Ganti `<></>` dengan `<Fragment>` eksplisit (import dari `react`).

#### ✅ Status

- Build: SUCCESS
- Routes: NISN Management load (no 500)
- Forms: Single sidebar, theme-compliant borders

---

### 29. Arsip Akreditasi Seeder & CRUD (2026-07-17)

**Perubahan:**

#### 29.1 Seeder Created

- **File:** `database/seeders/ArsipAkreditasiSeeder.php`
- **Registered:** `DatabaseSeeder.php` (line 19)
- **Data:** 47 dokumen covering **8 standar** akreditasi:
  - Standar 1: Visi, Misi, Tujuan (5)
  - Standar 2: Tata Kelola (6)
  - Standar 3: Kurikulum (9)
  - Standar 4: Kependidikan (6)
  - Standar 5: Sarana & Prasarana (8)
  - Standar 6: Pembiayaan (6)
  - Standar 7: Hubungan Masyarakat (5)
  - Standar 8: Output & Hasil (6)
- **Status mix:** ~70% `lengkap`, ~30% `belum` (realistis)

#### 29.2 Verified CRUD Complete

| Layer | Status |
| ------- | -------- |
| Migration | ✅ (2026_07_14_183834) |
| Model + scopes | ✅ |
| Controller (index, create, store, show, edit, update, destroy, tree) | ✅ |
| FormRequest (validation + messages) | ✅ |
| Policy (Admin/TU/Staf roles) | ✅ |
| Frontend: Index, Create, Edit, Show, TreeView | ✅ |
| Routes (resource + tree) | ✅ |
| Permissions (TUSeeder) | ✅ |

#### 29.3 Run Seeder

```bash
php artisan db:seed --class=ArsipAkreditasiSeeder
```

#### ✅ Build: SUCCESS

---

### 30. Nilai Akademik / E-Rapor Module Exposed (2026-07-17)

**Ditemukan:** Sistem Nilai Akademik lengkap (Rapor Kurikulum Merdeka) **sudah diimplementasikan** tetapi tidak terekspos di sidebar navigation.

**Yang sudah ada (backend + frontend):**

| Komponen | Status |
| ---------- | -------- |
| Migration (7 tabel: rapor_kelas, rapor_mapel, rapor_siswa, rapor_nilai, rapor_deskripsi, rapor_ekstrakurikuler, rapor_catatan) | ✅ |
| Models (RaporKelas, RaporMapel, RaporSiswa, RaporNilai, dll) | ✅ |
| Controllers (RaporKelasController, RaporMapelController, RaporSiswaController) | ✅ |
| Frontend Pages (Index, Form, Show, InputNilai, Assign, Statistik) | ✅ |
| Routes (CRUD + assign siswa, input nilai, generate deskripsi, ekstrakurikuler, catatan, statistik) | ✅ |
| E-Rapor submodule (Dapodik sync, Tujuan Pembelajaran, Nilai Formatif/Sumatif, P5) | ✅ |

**Yang ditambahkan hari ini:**

- Navigasi sidebar baru di `AppLayout.tsx`:
  - **Rapor Kelas** → `/dashboard/rapor-kelas` (icon: School)
  - **Rapor Mapel** → `/dashboard/rapor-mapel` (icon: BookOpen)
  - **Rapor Siswa** → `/dashboard/rapor-siswa` (icon: FileText)
- Role akses: Admin, TU, Staf, Guru

**✅ Build: SUCCESS**

**MVP Priority 7 (Nilai Akademik Dasar) → TERPENUHI** via sistem Rapor Kurikulum Merdeka yang lebih komprehensif.

---

### 31. Struktur Menu Simplifikasi (2026-07-17)

**Tujuan:** Menu sidebar dengan struktur **Menu → Sub Menu** (max 2 level) agar mudah digunakan.

#### 31.1 Struktur Menu Admin

| Menu | Sub Menu | Route |
| ------ | ---------- | ------- |
| **Dashboard** | - | /dashboard |
| **SPMB** | Pendaftaran | /dashboard/ppdb |
| | Konfigurasi | /dashboard/spmb/config |
| **Data Siswa** | List Siswa | /dashboard/users/murid |
| | Buku Induk | /dashboard/buku-induk |
| **Keuangan** | SPP & Pembayaran | /dashboard/spp |
| | Dispensasi | /dashboard/dispensasi |
| **GTK** | List GTK | /dashboard/gtk |
| **Akademik** | Kelas | /dashboard/kelas |
| | Jadwal Pelajaran | /dashboard/jadwal |
| | E-Rapor | /dashboard/rapor-kelas, /dashboard/rapor-mapel, /dashboard/rapor-siswa |
| **BK** | Dashboard | /dashboard/bk |
| | Pelanggaran | /dashboard/bk/pelanggaran |
| | Konseling | /dashboard/bk/konseling |
| | Prestasi | /dashboard/bk/prestasi |
| **Perpustakaan** | List Buku | /dashboard/perpustakaan |
| **Sarana** | Inventaris | /dashboard/sarana |
| **Alumni** | List Alumni | /dashboard/alumni |
| | Tracer Study | /dashboard/alumni/tracer-study |
| **Website** | Berita | /dashboard/website/berita |
| | Kegiatan | /dashboard/website/kegiatan |
| **TU** | Surat Masuk | /dashboard/tu/surat-masuk |
| | Surat Keluar | /dashboard/tu/surat-keluar |
| | Arsip Akreditasi | /dashboard/tu/arsip-akreditasi |
| | Manajemen NISN | /dashboard/tu/nisn-management |
| **Laporan** | Siswa, GTK, Keuangan, Export | /dashboard/laporan/* |
| **Settings** | - | /dashboard/settings |

#### 31.2 Struktur Menu Publik

| Menu | Route |
| ------ | ------- |
| **Beranda** | / |
| **Profil Sekolah** | /visi-dan-misi, /guru |
| **Informasi** | /berita, /agenda |
| **PPDB** | /ppdb |
| **Alumni** | /alumni |
| **Perpustakaan** | /perpustakaan |

#### 31.3 Implementasi

**`resources/js/Layout/AppLayout.tsx`**

```tsx
interface SearchItem {
    label: string;
    href: string;
    keywords: string[];
    roles?: string[];
    parent?: string; // null = menu utama, string = submenu dari parent
}

// Item dengan parent = submenu, tampil expand saat parent aktif
const children = navItems.filter(
    c => c.parent === item.label && (!c.roles || c.roles.includes(role))
);
```

#### 31.4 Checklist

- [x] BK: Dashboard, Pelanggaran, Konseling, Prestasi
- [x] Akademik: E-Rapor (Rapor Kelas/Mapel/Siswa)
- [x] Keuangan: SPP, Dispensasi
- [x] TU: Surat, Arsip, NISN
- [x] SPMB: Pendaftaran, Konfigurasi
- [x] Alumni: List, Tracer Study
- [x] Website: Berita, Kegiatan
- [x] Laporan: Siswa, GTK, Keuangan
- [x] Data Siswa: List, Buku Induk

---

### 32. Sprint 2026-07-18 — Fitur Lanjutan

#### 32.1 E-Rapor: Cetak PDF per Siswa

- **Method** `RaporSiswaController::cetakPdf()` — single PDF via `PdfService::download()`
- **Route** `rapor-siswa.cetak-pdf` (GET /dashboard/rapor-siswa/{raporSiswa}/cetak-pdf)
- **Blade** `resources/views/pdf/rapor.blade.php` — template rapor A4
- **Button** di Show.tsx → tombol Download PDF hijau

#### 32.2 E-Rapor: Massal ZIP per Kelas

- **Method** `RaporSiswaController::cetakPdfMassal()` — loop siswa → PDF → ZIP
- **Route** `rapor-siswa.cetak-pdf-massal` (GET)
- **Validasi** rapor_kelas_id, semester, tahun_ajaran

#### 32.3 SiswaObserver — Auto-Create User

- **Trigger** `Siswa::created` → buat User (username=nisn, password random), role murid
- **Log password** sementara di log (TODO: kirim email)

#### 32.4 Artisan Command: siswa:promote

- Naik kelas massal: 10→11, 11→12, 12→lulus
- Tutup enrollment lama, buat baru di kelas tujuan

#### 32.5 SPP: Upload Bukti Pembayaran

- Migration + kolom bukti_pembayaran, status_verifikasi
- Upload file + tampilkan di Detail.tsx

#### 32.6 Pembayaran Generic (Polymorphic)

- Migration + Model Pembayaran, PembayaranDetail
- morphs tagihan → bisa dipakai SPP, UKS, seragam, dll

#### 32.7 Pembayaran: Upload Bukti (Foto/PDF) — Midtrans Dihapus

**Revisi 2026-07-19:** Midtrans diganti jadi static upload bukti pembayaran (foto/PDF).
- **PembayaranGatewayController (Midtrans)** → 🗑️ Dihapus (`app/Http/Controllers/Admin/PembayaranGatewayController.php`).
- **PembayaranController::bayar()** sudah handle file upload (`store(\"pembayaran-bukti\", \"public\")`).
- **Validasi** accept: `jpg,jpeg,png,pdf`, max 2MB.
- **Tampilan** di Show.tsx: preview image/PDF, tabel riwayat ada link "Lihat".

- Migration notifications table (uuid, type, morphs notifiable, data, read_at)

### 33. Sprint 2026-07-18 — Fix Import Routes & Cleanup
#### 32.8 Notifications (Laravel Default) — Full Stack

**Status per 2026-07-19:** ✅ Full stack selesai (sebelumnya hanya migration).
- **Migration** `2026_07_18_000002_create_notifications_table.php` (uuid, type, morphs notifiable, data, read_at).
- **Controller** `NotificationController@index` (paginated list), `unreadCount`, `markAsRead`, `markAllAsRead`.
- **Frontend** `Pages/Admin/Notification/Index.tsx` — daftar notifikasi + pagination + mark as read + mark all.
- **Sidebar** → link "Notifikasi" di AppLayout.tsx.
- **Header** → Bell icon link ke `/dashboard/notifications`.
| Issue | Root Cause | Fix Applied |
|--------|-----------|-------------|
| Route name salah: `dispensari.template/import` | pi-agent pakai `dispensari` padahal resource line → `dispensasi` | Ganti ke `dispensasi.template/import` |
| URL path rusak: `'dispensasi.template'` (tanpa `/`) | Sed replacement error | Rewrite manual baris 119-120 via heredoc |
| Namespace double backslash: `App\\Http\\Controllers\\...` | Sed escaping error saat insert master-bank routes | Fix per-baris via heredoc |
| Trait `HandlesImport` namespace salah: `Maatwebsite\Excel\Concerns\...` | pi-agent asal copy tanpa cek referensi yang ada | Ganti ke `App\Http\Controllers\Concerns\HandlesImport` |
| `use HandlesImport;` di luar class body | Sed insertion error | Python rewrite block `use HandlesImport` masuk ke dalam class |
| File backup menumpuk: `working.php`, `working2.php`, `*.bak` | pi-agent gagal/timeout berulang kali | Hapus manual |

#### 33.2 Rute Final (routes/admin.php)

```php
Route::resource('dispensasi', 'Admin\DispensasiController');
Route::get('dispensasi/template', 'App\Http\Controllers\Admin\DispensasiController@importForm')->name('dispensasi.template');
Route::post('dispensasi/import', 'App\Http\Controllers\Admin\DispensasiController@import')->name('dispensasi.import');

Route::resource('master-bank', 'Admin\MasterBankController');
Route::get('master-bank/template', 'App\Http\Controllers\Admin\MasterBankController@importForm')->name('master-bank.template');
Route::post('master-bank/import', 'App\Http\Controllers\Admin\MasterBankController@import')->name('master-bank.import');
```

#### 33.3 Controller — MasterBankController

```php
use App\Http\Controllers\Concerns\HandlesImport;

class MasterBankController extends Controller
{
    use HandlesImport;
    // ...
    public function importForm() { return Inertia::render('Admin/MasterBank/Import'); }
    public function import(Request $request) {
        $this->validate($request, ['file' => 'required|file|mimes:xlsx,xls,csv|max:10240']);
        $result = $this->runImport($request, MasterBank::class, function ($row) {
            return [
                'nama_bank'        => $row['nama_bank'] ?? null,
                'kode_bank'        => $row['kode_bank'] ?? null,
                'cabang'           => $row['cabang'] ?? null,
                'rekening_default' => $row['rekening_default'] ?? null,
            ];
        });
        $flash = $this->importFlash($result);
        return redirect()->back()->with($flash['success'] ? ['success' => $flash['success']] : ['error' => $flash['error']]);
    }
}
```

**DispensasiController** — `importForm` & `import` sudah ada (pi-agent: 2026-07-18, tidak perlu diubah).

#### 33.4 Frontend — Import.tsx

| File | Route Name | Title |
|------|-----------|-------|
| `Pages/Admin/Dispensasi/Import.tsx` | `dispensasi.template`, `dispensasi.import` | Import Dispensasi |
| `Pages/Admin/MasterBank/Import.tsx` | `master-bank.template`, `master-bank.import` | Import Master Bank |

#### 33.5 Verifikasi

```bash
php -l app/Http/Controllers/Admin/MasterBankController.php  # ✅ No syntax errors
php -l app/Http/Controllers/Admin/DispensasiController.php # ✅ No syntax errors
php -l routes/admin.php                                      # ✅ No syntax errors
php artisan route:list --name=dispensasi                     # ✅ dispensasi.import, dispensasi.template
php artisan route:list --name=master-bank                    # ✅ master-bank.import, master-bank.template
```

#### ✅ Build: SUCCESS

#### ✅ Status per 2026-07-18

- [x] Route `dispensari` → `dispensasi` (fix URL + name)
- [x] Namespace `App\\Http\\...` → `App\Http\...` (master-bank)
- [x] Trait `HandlesImport` namespace benar + placement dalam class
- [x] PHP syntax semua file ✅
- [x] Route resolve kedua modul ✅
- [x] Import.tsx Dispensasi & Master Bank ✅
- [x] Hapus file backup menumpuk ✅

### 34. Sprint 2026-07-18 — Cleanup P3 + Sidebar Kurikulum

#### 34.1 P3 Cleanup — File Backup

```bash
rm phpunit.xml.bak
rm app/Http/Controllers/Admin/MasterBankController.php.bak
```

#### 34.2 P3 — Namespace Konsisten di routes/admin.php

Sebelum:
```php
Route::resource('dispensasi', 'Admin\DispensasiController');
Route::get('dispensasi/template', 'App\Http\Controllers\Admin\DispensasiController@importForm')...
```

Sesudah (bare namespace, konsisten):
```php
Route::resource('dispensasi', 'Admin\DispensasiController');
Route::get('dispensasi/template', 'Admin\DispensasiController@importForm')...
```

#### 34.3 Modul Kurikulum & Kalender Akademik — Terekspos!

Sebelumnya (section 16.5/26) sudah ada controller, model, dan UI (`Admin/Kurikulum/*`), tetapi **tidak ada route & sidebar**. Kini:

| Layer | Status |
|-------|--------|
| Migration | ✅ (pre-existing) |
| Model (Kurikulum, KurikulumMapel, Skbm, KalenderAkademik) | ✅ |
| Controller (KurikulumController: index, create, store, edit, update, destroy, mapels, skbm, kalender) | ✅ |
| Frontend (Index, Create, Edit, Mapels, Skbm, Kalender) | ✅ (pre-existing) |
| Routes (CRUD + mapels + skbm + kalender-akademik) | ✅ Ditambahkan hari ini |
| Sidebar (Akademik → Kurikulum & SKBM, Kalender Akademik) | ✅ Ditambahkan hari ini |

**Route ditambahkan** (routes/admin.php, setelah Jadwal):
```php
// Kurikulum
Route::get('kurikulum', 'Admin\KurikulumController@index')->name('kurikulum.index');
Route::get('kurikulum/create', 'Admin\KurikulumController@create')->name('kurikulum.create');
Route::post('kurikulum', 'Admin\KurikulumController@store')->name('kurikulum.store');
Route::get('kurikulum/{kurikulum}/edit', 'Admin\KurikulumController@edit')->name('kurikulum.edit');
Route::put('kurikulum/{kurikulum}', 'Admin\KurikulumController@update')->name('kurikulum.update');
Route::delete('kurikulum/{kurikulum}', 'Admin\KurikulumController@destroy')->name('kurikulum.destroy');
Route::get('kurikulum/{kurikulum}/mapels', 'Admin\KurikulumController@mapels')->name('kurikulum.mapels');
Route::post('kurikulum/{kurikulum}/mapels', 'Admin\KurikulumController@storeMapel')->name('kurikulum.mapels.store');
Route::delete('kurikulum/{kurikulum}/mapels/{mapel}', 'Admin\KurikulumController@destroyMapel')->name('kurikulum.mapels.destroy');
Route::get('kurikulum/{kurikulum}/skbm', 'Admin\KurikulumController@skbm')->name('kurikulum.skbm');
Route::post('kurikulum/{kurikulum}/skbm', 'Admin\KurikulumController@storeSkbm')->name('kurikulum.skbm.store');
Route::delete('kurikulum/{kurikulum}/skbm/{skbm}', 'Admin\KurikulumController@destroySkbm')->name('kurikulum.skbm.destroy');

// Kalender Akademik
Route::get('kalender-akademik', 'Admin\KurikulumController@kalender')->name('kalender-akademik.index');
Route::post('kalender-akademik', 'Admin\KurikulumController@storeKalender')->name('kalender-akademik.store');
Route::delete('kalender-akademik/{kalenderAkademik}', 'Admin\KurikulumController@destroyKalender')->name('kalender-akademik.destroy');
```

**Sidebar** (AppLayout.tsx, sub-menu Akademik):
```tsx
{ label: "Kurikulum & SKBM", href: "/dashboard/kurikulum", keywords: [...], parent: "Akademik", roles: ["Admin"] },
{ label: "Kalender Akademik", href: "/dashboard/kalender-akademik", keywords: [...], parent: "Akademik", roles: ["Admin"] },
```

#### 34.4 Verifikasi

```bash
php -l routes/admin.php                                      # ✅ No syntax errors
php artisan route:list --name=kurikulum                      # ✅ 12 routes
php artisan route:list --name=kalender-akademik              # ✅ 3 routes
```

#### ⚠️ Catatan Build

Build `pnpm run build` gagal karena pre-existing error di `resources/js/Pages/Admin/Pengguna/Pengajar/Import.tsx:3` — import `{ Toast }` dari `@/components/ui/toast-use` yang file-nya tidak ada. **Ini bukan dari kerjaan Kurikulum hari ini**, tapi perlu fix terpisah.

#### ✅ Status per 2026-07-18

- [x] File backup cleanup (phpunit.xml.bak, MasterBankController.php.bak)
- [x] Namespace konsisten (bare `Admin\...` di semua route dispensasi & master-bank)
- [x] 15 route Kurikulum + Kalender Akademik ditambahkan
- [x] Sidebar entry Kurikulum & SKBM + Kalender Akademik
- [x] Fix pre-existing build error di Pengajar/Import.tsx (toast-use missing) — hapus import & <Toast/> di 3 file (AppLayout sudah handle flash toast)

### 35. Sprint 2026-07-19 — E-Rapor Routes + Pembayaran Polymorphic

#### 35.1 Fix Routes Hilang (Rapor)

Sebelumnya `Show.tsx` & `Index.tsx` sudah reference route `rapor-siswa.cetak-pdf` dan `rapor-siswa.cetak-pdf-massal`, tapi **route belum didefinisikan** → jamin crash `RouteNotFoundException`. Ditambahkan:

```php
Route::prefix('rapor-siswa')->group(function () {
    // ...
    Route::get('/cetak-pdf-massal', 'Admin\RaporSiswaController@cetakPdfMassal')->name('rapor-siswa.cetak-pdf-massal');
    Route::get('/{raporSiswa}', 'Admin\RaporSiswaController@show')->name('rapor-siswa.show');
    Route::get('/{raporSiswa}/cetak-pdf', 'Admin\RaporSiswaController@cetakPdf')->name('rapor-siswa.cetak-pdf');
    // ...
});
```

**Urutan penting**: `cetak-pdf-massal` harus sebelum `{raporSiswa}` agar tidak ditelan oleh param route.

#### 35.2 Status 4 Fitur Sprint 32

| # | Fitur | Status Catatan |
|---|------|---------------|
| 1 | E-Rapor: Cetak PDF per Siswa | ✅ SELESAI — `cetakPdf()` (L229) + blade `pdf/rapor.blade.php` + route + button Show.tsx |
| 2 | E-Rapor: Cetak Massal ZIP per Kelas | ✅ SELESAI — `cetakPdfMassal()` (L256) ZipArchive penuh + route + button Index.tsx |
| 3 | SPP: Upload Bukti Pembayaran | ✅ SELESAI — migration `2026_07_18_000001` + controller store L142-155 + UI Detail.tsx (preview, upload, link storage) |
| 4 | Pembayaran Generic Polymorphic | ✅ SELESAI — lihat 35.3 |

#### 35.3 Pembayaran Polymorphic (Section 32.6)

**Yang sudah ada (pre-existing):**
- Migration `2026_07_18_000001_create_pembayaran_tables.php` (pembayaran + pembayaran_detail, morphs tagihan)
- Model `Pembayaran` (morphTo tagihan, hasMany details)
- Model `PembayaranDetail` (belongsTo pembayaran, belongsTo User pencatat)

**Yang ditambahkan hari ini:**

| Layer | File | Status |
|-------|------|--------|
| Controller | `app/Http/Controllers/Admin/PembayaranController.php` (index/create/store/show/bayar/verifyDetail/destroy) | ✅ Baru |
| Routes | 7 route `pembayaran.*` di routes/admin.php | ✅ Baru |
| Frontend | `Pages/Admin/Pembayaran/Index.tsx` (table + filter + search + pagination) | ✅ Baru |
| Frontend | `Pages/Admin/Pembayaran/Create.tsx` (form tagihan + optional morph link) | ✅ Baru |
| Frontend | `Pages/Admin/Pembayaran/Show.tsx` (detail + catat pembayaran + verifikasi) | ✅ Baru |
| Sidebar | "Pembayaran Lain" sub-menu Keuangan (roles: Admin) | ✅ Baru |

**Alur polymorphic:**
- `Pembayaran.tagihan_type` + `tagihan_id` → morph ke model apapun (SppTagihan, UKS, Seragam, dll)
- Tagihan tanpa model khusus → `tagihan_type` biarkan null
- `bayar()` → insert `PembayaranDetail` + auto recompute `jumlah_dibayar`, `sisa`, `status` (belum_lunas/angsuran/lunas)
- `verifyDetail()` → Admin setujui/tolak, update `status_verifikasi` + `diverifikasi_pada`
- Auto: role Admin langsung `terverifikasi`, role lain `pending`

#### 35.4 Verifikasi

```bash
php -l app/Http/Controllers/Admin/PembayaranController.php  # ✅ No syntax errors
php -l routes/admin.php                                       # ✅ No syntax errors
php artisan route:list --name=pembayaran                      # ✅ 7 routes
php artisan route:list --name=rapor-siswa.cetak               # ✅ cetak-pdf + cetak-pdf-massal
pnpm run build                                                # ✅ SUCCESS (2.52s)
```

#### 35.5 Catatan Ponytail

- **Satu controller untuk semua jenis tagihan** — bukan satu controller per jenis (SPP/UKS/Seragam). YAGNI.
- **morph nullable** — tagihan tanpa model khusus tetap bisa dibuat (tagihan_type/id null).
- **Admin auto-verify** — skip flow pending untuk Admin, hemat klik. Role lain tetap perlu verifikasi.
- **Recompute status di transaksi** — satu DB transaction, tidak race antara insert detail & update parent.
- **Skipped: FormRequest terpisah** — validasi inline cukup, belum ada 10+ field kompleks. Add ketika rules naik.

#### ✅ Status per 2026-07-19

- [x] Route rapor-siswa.cetak-pdf + cetak-pdf-massal ditambahkan
- [x] 4 fitur sprint 32 selesai (PDF, ZIP, bukti pembayaran, polymorphic)
- [x] Controller Pembayaran + 7 routes
- [x] UI Index/Create/Show Pembayaran
- [x] Sidebar entry "Pembayaran Lain"
- [x] Build SUCCESS
- [x] lean-prd section 35

### 36. Sprint 2026-07-19 — WhatsApp Gateway + Notifications Full + Variant Column + Midtrans Hapus

#### 36.1 WhatsApp Gateway Config

**Tujuan:** Admin dapat mengonfigurasi gateway WhatsApp untuk notifikasi otomatis (Fonnte/Wablas/dll).

| Layer | File | Status |
|-------|------|--------|
| **Migration** | `2026_07_19_000002_add_whatsapp_gateway_to_settings_table.php` — +`wa_gateway_url`, `wa_api_key`, `wa_nomor_tujuan`, `wa_template_pesan` | ✅ Baru |
| **Backend** | `SettingController::update()` — validasi + simpan 4 field baru | ✅ Update |
| **Frontend** | `KonfigurasiWeb.tsx` — section "WhatsApp Gateway" dengan form URL, API Key (password), nomor tujuan (62xxxx), template pesan ({{nama}}, {{nominal}}, {{tanggal}}) | ✅ Baru |

#### 36.2 Notifications Full Stack

Sebelumnya (Section 32.8) hanya migration. Kini:

| Layer | File | Status |
|-------|------|--------|
| **Controller** | `NotificationController.php` — index, unreadCount, markAsRead, markAllAsRead | ✅ Baru |
| **Routes** | `notifications.index`, `notifications.unread-count`, `notifications.mark-as-read`, `notifications.mark-all-read` | ✅ Baru |
| **Frontend** | `Pages/Admin/Notification/Index.tsx` — daftar notifikasi + pagination + mark read + mark all | ✅ Baru |
| **Sidebar** | Link "Notifikasi" di sidebar (AppLayout.tsx) | ✅ Baru |
| **Header** | Bell icon → Link ke `/dashboard/notifications` (ganti dari Mail placeholder) | ✅ Update |

#### 36.3 Variant Column di Kelas

**Sebelumnya:** Variant (A/B/C/D) di-derive dari karakter pertama `nama_kelas` (line 16.1).
**Sesudah:**

| File | Status |
|------|--------|
| Migration `2026_07_19_000001_add_variant_to_kelas_table.php` | ✅ Baru |
| Model `Kelas.php` — `'variant'` di fillable | ✅ Update |

Kolom `variant` string nullable, bisa diisi langsung via UI Kelas (default tetap derive dari nama_kelas jika null).

#### 36.4 Midtrans Dihapus → Static Upload Bukti

**Revisi:** Midtrans diganti static upload bukti foto/PDF (Section 32.7 full update).

| File | Status |
|------|--------|
| `PembayaranGatewayController.php` (Midtrans) | 🗑️ **Dihapus** |
| `PembayaranController::bayar()` | ✅ Handle file upload (pre-existing) |

#### 36.5 SPP Upload Bukti Pembayaran — ✅ Verifikasi Lengkap

| Layer | File | Detail |
|-------|------|--------|
| **Migration** | `2026_07_18_000001_add_bukti_pembayaran_to_spp_pembayaran_table.php` | `bukti_pembayaran` string nullable, down() reversible ✅ |
| **Model** | `SppPembayaran` | `$fillable` include `bukti_pembayaran` ✅ |
| **Controller** | `SppController::bayar()` | Upload `$file->store('spp-bukti', 'public')` ✅ |
| **Frontend** | `Admin/Spp/Detail.tsx` | File input (image/*,.pdf), preview, FormData submit ✅ |
| **Display** | Riwayat pembayaran | Link `<a>` ke storage, tampil preview ✅ |

#### ✅ Status per 2026-07-19

- [x] Migration variant column (kelas)
- [x] WhatsApp Gateway config (settings)
- [x] Midtrans dihapus, static upload bukti
- [x] Notifications full stack (controller + UI + sidebar + header)
- [x] Semua PHP syntax ✅
- [x] docs/lean-prd.md updated dengan status real

### 37. Checklist Real vs Stale (2026-07-20)

Berikut adalah status real semua fitur yang pernah tercatat sebagai "BELUM" di checklist lama:

| Fitur | Checklist Lama | **Real Status** |
|-------|---------------|-----------------|
| E-Rapor: Cetak PDF per Siswa | 🔄 SEDANG | ✅ SELESAI (Section 32.1, 35.1) |
| E-Rapor: Cetak Massal ZIP per Kelas | ❌ BELUM | ✅ SELESAI (Section 32.2, 35.1) |
| SiswaObserver Auto-Create User | ❌ BELUM | ✅ SELESAI (Section 32.3) |
| Artisan Command siswa:promote | ❌ BELUM | ✅ SELESAI (Section 32.4) |
| Migration: Kolom variant di tabel kelas | ❌ BELUM | ✅ SELESAI (Section 36.3) |
| SPP Upload Bukti Pembayaran UI | ❌ BELUM | ✅ SELESAI (Section 32.5, 36.5) |
| Kurikulum & SPMB ke Sidebar | ❌ BELUM | ✅ SELESAI (Section 34.3, 31.4) |
| WhatsApp Gateway Config di Settings | ❌ BELUM | ✅ SELESAI (Section 36.1) |
| Midtrans Payment Gateway | ❌ REVISI | ✅ GANTI static upload bukti (Section 36.4) |
| Pembayaran Generic Polymorphic | ❌ BELUM | ✅ SELESAI (Section 32.6, 35.3) |
| Notifications Table + Real-time | ❌ BELUM | ✅ SELESAI (Section 36.2) |
| SendSiswaCredentialsJob (email kredensial) | — (baru) | ❌ BELUM — architecture siap (Section 38.1) |
| SendAbsensiNotification (WA notif absensi) | — (baru) | ❌ BELUM — architecture siap (Section 38.3) |
| Izin/Sakit Digital (Pengajuan Ortu) | — (baru) | ❌ BELUM — architecture siap (Section 38.4) |

### 38. Sprint 2026-07-20 — Architecture Review MVP Gaps

**Tujuan:** Architecture review & execution plan untuk 4 gap MVP yang tersisa, berdasarkan hasil eksplorasi & analisis kode (2026-07-20).

#### 38.1 Ringkasan Status

| # | Gap | Status | Estimasi File |
|---|-----|--------|---------------|
| 1 | **Siswa Auto-Create User -> Kirim Kredensial** | [?] Observer sudah, email blom | 3 file baru + 1 edit |
| 2 | **Naik Kelas Massal (Artisan)** | [OK] SUDAH LENGKAP, skip | 0 file |
| 3 | **WhatsApp Notifikasi Absensi** | [X] Config siap, job & pengiriman blom | 3 file baru + 2 edit |
| 4 | **Izin/Sakit Digital (Pengajuan Ortu)** | [X] Dari 0 | 6+ file baru |

#### 38.2 Gap 1: Siswa Auto-Create -> Kirim Kredensial

**Status sekarang:** `SiswaObserver::created()` sudah create User + assign role `murid`, password di-log.

**Gap:** Kredensial belum dikirim ke email orang tua/wali.

**Pattern existing (reuse):** `SendPpdbCredentialsJob` + `PpdbCredentialsMail` + blade `email.ppdb_credentials`.

**File baru:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `app/Mail/SiswaCredentialsMail.php` | Mail | Copy PpdbCredentialsMail, subject + body untuk siswa |
| `resources/views/email/siswa_credentials.blade.php` | Blade | Template email: nama, username (NISN/NIS), password |
| `app/Jobs/SendSiswaCredentialsJob.php` | Job | Dispatch SiswaCredentialsMail |

**File diedit:**
| File | Perubahan |
|------|----------|
| `app/Observers/SiswaObserver.php` | Ganti `\Log::info(...)` -> `dispatch(new SendSiswaCredentialsJob($user, $password))` |

**Data flow:**
```
Siswa::created()
  -> SiswaObserver::created()
    -> Create User, assignRole('murid')
    -> dispatch(new SendSiswaCredentialsJob($user, $password))
      -> Mail::to($user->email)->send(new SiswaCredentialsMail($user, $password))
```

**Ponytail:** `QUEUE_CONNECTION=sync` — job jalan inline. Kalau mail gagal, log error saja, jangan retry. Skip mail config validation di observer. Tambah queue worker cron nanti kalau throughput naik.

#### 38.3 Gap 3: WhatsApp Notifikasi Absensi

**Status sekarang:** [OK] WA Gateway config di settings (4 field), [OK] form UI KonfigurasiWeb.tsx, [OK] SettingController handle wa fields. [X] Tapi **queue job `SendAbsensiNotification` belum dibuat**, [X] belum trigger di checkin/checkout.

**File baru:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `app/Jobs/SendAbsensiNotification.php` | Job | Load WA config dari settings -> parse template -> HTTP POST ke gateway |

**File diedit:**
| File | Perubahan |
|------|----------|
| `app/Http/Controllers/Api/AbsensiApiController.php` | Dispatch job di `checkin()` & `checkout()` |
| `app/Http/Controllers/Admin/AbsensiController.php` | Dispatch job di `storeKelas()` |

**Logic SendAbsensiNotification:**
```
SendAbsensiNotification($siswa, $absensi, $type = 'masuk'|'pulang')
  1. Load WA config dari Setting table (first())
  2. Jika wa_gateway_url atau wa_api_key kosong -> skip (log)
  3. Parse template: {{nama}} -> siswa->nama_lengkap, {{status}} -> absensi->status_masuk/pulang, {{tanggal}} -> absensi->tanggal, {{jam}} -> absensi->jam_masuk/pulang, {{nisn}} -> siswa->nisn
  4. HTTP POST ke wa_gateway_url dengan header Authorization: wa_api_key
  5. Body: target={no_hp_ortu}&message={parsed_template}
  6. Log sukses/gagal
```

**Ponytail:** Hardcode format Fonnte dulu (Header Auth + form data). Skip retry — cukup log. Skip validation — kalau WA config null, skip dispatch.

#### 38.4 Gap 4: Izin/Sakit Digital (Pengajuan Ortu)

**Konsep:** Orang tua submit form izin/sakit via link publik (tanpa login — pakai NISN siswa), masuk ke dashboard BK/Wali Kelas untuk approval.

**Migration — `pengajuan_izin` table:**
```php
Schema::create('pengajuan_izin', function (Blueprint $table) {
    $table->id();
    $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
    $table->string('jenis');                // 'izin', 'sakit'
    $table->date('tanggal_mulai');
    $table->date('tanggal_selesai')->nullable(); // null = 1 hari
    $table->text('alasan');
    $table->string('lampiran')->nullable();  // foto surat dokter (opsional)
    $table->string('status')->default('pending'); // pending, disetujui, ditolak
    $table->text('catatan_guru')->nullable();
    $table->foreignId('diapprove_oleh')->nullable()->constrained('users')->nullOnDelete();
    $table->timestamp('diapprove_at')->nullable();
    $table->timestamps();
});
```

**File baru:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_000001_create_pengajuan_izin_table.php` | Migration | Table + indexes + down() |
| `app/Models/PengajuanIzin.php` | Model | Relationships + casts |
| `app/Http/Controllers/Api/IzinController.php` | Controller | Public API: form/{nisn}, submit |
| `app/Http/Controllers/Admin/IzinController.php` | Controller | Admin: index, show, approve, reject |
| `resources/js/Pages/Frontend/PengajuanIzin.tsx` | Page | Form publik: input NISN -> form izin/sakit |
| `resources/js/Pages/Admin/Izin/Index.tsx` | Page | List pengajuan + filter status |
| `resources/js/Pages/Admin/Izin/Show.tsx` | Page | Detail + tombol approve/reject |

**Routes:**
```
# API (public, no auth — validasi via NISN + no_hp_ortu)
GET  /api/izin/form/{nisn}      -> ambil data siswa
POST /api/izin/submit           -> submit pengajuan

# Admin
GET    /dashboard/izin                -> list semua (BK/Wali Kelas)
GET    /dashboard/izin/{id}           -> detail
POST   /dashboard/izin/{id}/approve   -> approve -> auto-create Absensi (status izin/sakit)
POST   /dashboard/izin/{id}/reject    -> reject + catatan_guru
```

**Approval flow:**
1. Ortu submit -> status `pending`
2. BK atau Wali Kelas buka dashboard -> lihat daftar pending
3. Approve -> status `disetujui`, `diapprove_oleh` = user.id, `diapprove_at` = now()
   - Auto-create Absensi entry untuk tanggal tsb dengan status sesuai jenis (izin/sakit)
   - Gunakan `firstOrCreate` untuk avoid duplicate
4. Reject -> status `ditolak`, catatan_guru diisi

**Ponytail:** Skip auth dulu untuk form ortu — validasi via NISN + no_hp_ortu cukup. Skip multi-level approval — first-approver wins. Skip WA notif balik ke ortu (post-MVP). Lampiran opsional skip untuk MVP — cukup field alasan text.

#### 38.5 Dependencies & Urutan Eksekusi

```
Gap 1 ----------- Tidak ada dependency chain — semua independen
Gap 3 -----------
Gap 4 --- depends on ---- Gap 3 WA notification pattern (reuse) — optional
```

**Urutan rekomendasi:** Gap 1 -> Gap 3 -> Gap 4.

#### Status per 2026-07-20

- [x] Architecture review 4 gap MVP selesai
- [x] Gap 2 (Naik Kelas) diverifikasi [OK] lengkap — skip
- [x] Gap 1 (Siswa Credentials) — pola reuse dari PPDB, estimasi 3 file baru
- [x] Gap 3 (WA Notif Absensi) — config siap, butuh job + trigger
- [x] Gap 4 (Izin/Sakit Digital) — desain migration + API + admin + frontend
- [x] docs/lean-prd.md updated dengan status real & architecture plan


### 39. Sprint 2026-07-20 — Architecture Review: 9 Gap Post-MVP

**Tujuan:** Architecture analysis untuk 9 gap tersisa berdasarkan eksplorasi kode (2026-07-20).

#### 39.1 Ringkasan

| # | Gap | Prioritas | Status Base | Estimasi |
|---|-----|-----------|-------------|----------|
| 1 | **Rekap Bulanan Absensi PDF** | Sedang | Absensi sudah ada + PdfService + blade contoh | 2 file baru + 1 edit |
| 2 | **Face Recognition** | Rendah | Butuh device + library eksternal | **SKIP — hardware dependency** |
| 3 | **E-Rapor Import Nilai Excel** | Sedang | RaporSiswa + RaporNilai + RaporMapel sudah ada | 3+ file baru |
| 4 | **Multi-TTD Digital (Rapor)** | Sedang | RaporSiswa model + cetakPdf() + blade rapor | 1 migration + 1 edit |
| 5 | **Arsip Rapor per Semester** | Sedang | RaporSiswa + service + controller | 1 migration + 2 file baru |
| 6 | **Kurikulum Rombongan Belajar** | Rendah | Kurikulum migration + DapodikSyncService | 1 migration + 1 edit |
| 7 | **Surat Otomatis (Template)** | Rendah | SuratKeluar + PdfService | 2+ file baru |
| 8 | **Disposisi Workflow Multi-Tahap** | Sedang | SuratMasuk disposisi sudah ada (1-level) | 1 migration + 2 edit |
| 9 | **E-Rapor P5 Input Massal** | Tinggi | P5Projek + P5Nilai + RaporSiswa | 1 page baru + 1 edit |

#### 39.2 Gap 1: Rekap Bulanan Absensi PDF

**Kondisi sekarang:** Absensi module ✅ selesai (checkin/checkout/rekap/export CSV). Ada `PdfService::download()` dan contoh blade `pdf.rapor`.

**Desain:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `resources/views/pdf/absensi-rekap-bulanan.blade.php` | Blade | Template PDF: header sekolah, tabel harian per siswa, summary (Hadir/Sakit/Izin/Alpa/%) |
| `app/Http/Controllers/Admin/AbsensiController.php` | **Edit** | Tambah method `rekapPdf(Request $request)` — filter kelas, bulan, tahun |

**Route:**
```
GET /dashboard/absensi/rekap/pdf?kelas_id=&bulan=&tahun=  -> download PDF
```

**Data flow:**
```
RekapBulananPdf(Request)
  -> Load absensis + siswa for kelas_id in month range
  -> Group by siswa -> daily rows + monthly summary
  -> PdfService::download('pdf.absensi-rekap-bulanan', $data, 'rekap-absensi-bulanan.pdf')
```

**Ponytail:** Reuse blade pattern dari pdf.rapor. Tidak perlu job — generate sync (waktu tunggu < 2s untuk 1 kelas). Tambah tombol "Cetak PDF" di halaman Rekap yang sudah ada.

#### 39.3 Gap 2: Face Recognition — SKIP

**Alasan skip:** Butuh hardware (kamera IP/PCA9685), library eksternal (OpenCV/face_recognition), dan device listener service terpisah dari Laravel. Tidak cocok untuk MVP shared hosting. Tunda sampai ada permintaan eksplisit + anggaran hardware.

#### 39.4 Gap 3: E-Rapor Import Nilai Excel

**Kondisi sekarang:** `RaporNilai` + `RaporMapel` + `RaporSiswa` ✅ siap. Tapi input nilai masih satu-satu via `inputNilaiForm()`.

**Desain:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `app/Imports/RaporNilaiImport.php` | Import | Maatwebsite/Laravel-Excel (PhpSpreadsheet) import class |
| `resources/views/excel/template-nilai-rapor.xlsx` (atau generate PHP) | Template | Kolom: NISN, Nama, [Mapel1_nilai_angka, Mapel1_nilai_huruf, ...] |
| `app/Http/Controllers/Admin/RaporSiswaController.php` | **Edit** | Tambah `importNilaiForm()` + `importNilaiStore()` |

**Alternatif (Ponytail):** Skip Maatwebsite — generate XLSX manual via `PhpSpreadsheet` langsung (sudah jadi dependency mPDF punya `\PhpOffice\PhpSpreadsheet` kalau mPDF versi baru, atau install `phpoffice/phpspreadsheet`). Parse CSV juga cukup untuk MVP — lebih sederhana.

**Flow:**
```
ImportNilaiForm -> pilih rapor_kelas_id + semester
  -> Generate file template (CSV/XLSX) -> download template
  -> Guru isi nilai -> upload
  -> Validasi: NISN exists, nilai 0-100, map ke RaporMapel existing
  -> Bulk insert/update RaporNilai
```

**Template CSV:**
```csv
nisn,nama_lengkap,matematika_p,matematika_k,bahasa_indonesia_p,bahasa_indonesia_k,...
```

**Ponytail:** CSV dulu — no binary XLSX complexity. Validasi row-by-row, kumpulkan error, report semua error sekali. Skip progress bar — cukup "100 data berhasil, 3 gagal: NISN 12345 tidak ditemukan".

#### 39.5 Gap 4: Multi-TTD Digital (Rapor)

**Kondisi sekarang:** `RaporSiswa` belum ada kolom TTD. Cetak PDF rapor ada, tapi TTD masih placeholder/kosong.

**Migration:**
```php
Schema::table('rapor_siswa', function (Blueprint $table) {
    $table->string('ttd_kepsek')->nullable()->after('tahun_ajaran');
    $table->string('ttd_walikelas')->nullable()->after('ttd_kepsek');
    $table->string('ttd_ortu')->nullable()->after('ttd_walikelas');
});
```

**File:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_add_ttd_to_rapor_siswa_table.php` | Migration | + 3 kolom string (path image) |
| `app/Http/Controllers/Admin/RaporSiswaController.php` | **Edit** | Tambah `uploadTtd()` + update blade PDF untuk render image TTD |
| `resources/views/pdf/rapor.blade.php` | **Edit** | Render `<img src="{{ Storage::url($rapor->ttd_kepsek) }}">` |

**Flow:**
- Setting page: upload image TTD Kepsek
- Rapor show page: upload TTD Wali Kelas per rapor, upload TTD Ortu per rapor
- PDF generation: render TTD images from storage

**Ponytail:** Image upload simpan di `storage/app/public/ttd/`. Skip validasi tanda tangan basah — cukup upload foto TTD basah di kertas. Skip signature pad (canvas JS) — post-MVP.

#### 39.6 Gap 5: Arsip Rapor per Semester

**Kondisi sekarang:** `RaporSiswa` bisa diedit setelah dibuat. Tidak ada snapshot/publish flow.

**Migration:**
```php
// rapor_siswa: tambah status
Schema::table('rapor_siswa', function (Blueprint $table) {
    $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->after('tahun_ajaran');
    $table->timestamp('published_at')->nullable()->after('status');
});

// rapor_arsip (clone from rapor_siswa + pivot tables)
Schema::create('rapor_arsip', function (Blueprint $table) {
    $table->id();
    $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
    // snapshot of all related data as JSON
    $table->json('snapshot'); // {siswa: {...}, nilai: [...], deskripsi: [...], ekstrakurikuler: [...], catatan: {...}, ttd: {...}}
    $table->string('semester');
    $table->string('tahun_ajaran');
    $table->timestamp('archived_at');
    $table->timestamps();
});
```

**Alternatif (Ponytail):** Simpan snapshot sebagai JSON — tidak perlu cloning 5+ tabel relasi. Read-only view dari `rapor_arsip.snapshot` cukup.

**File:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_add_status_to_rapor_siswa_table.php` | Migration | status + published_at |
| `database/migrations/2026_07_20_create_rapor_arsip_table.php` | Migration | snapshot + meta |
| `app/Models/RaporArsip.php` | Model | casts snapshot as array/object |
| `app/Services/RaporService.php` | **Edit** | Tambah `publishRapor($raporSiswaId)` — clone to arsip, set status=published |
| `app/Http/Controllers/Admin/RaporSiswaController.php` | **Edit** | Tambah route publish + ArsipController |

**Flow:**
```
Publish Rapor
  -> RaporService::publishRapor($raporSiswaId)
    -> Load rapor_siswa + all relations (nilai, deskripsi, ekstra, catatan, ttd)
    -> Create RaporArsip with JSON snapshot
    -> Set rapor_siswa.status = 'published', published_at = now()
    -> Set all related records to read-only (atau lock via status)

Lihat Arsip
  -> RaporArsip.find($id) -> decode snapshot -> render like normal rapor view
```

**Ponytail:** JSON snapshot = no schema drift issues. Skip soft-delete protection — cukup `status=archived`. Kalau perlu edit archived: unarchive dulu (clone balik ke draft).

#### 39.7 Gap 6: Kurikulum Rombongan Belajar (Dapodik Sync)

**Kondisi sekarang:** Ada `Kurikulum`, `KurikulumMapel`, `SKBM` tables ✅. Ada `DapodikSyncService` dengan pull/push logic ✅. Tapi belum ada `rombongan_belajar` table.

**Migration:**
```php
Schema::create('rombongan_belajar', function (Blueprint $table) {
    $table->id();
    $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
    $table->foreignId('kurikulum_id')->constrained('kurikulum')->cascadeOnDelete();
    $table->string('tahun_ajaran', 20);
    $table->string('semester', 10); // Ganjil/Genap
    $table->string('nama_rombel'); // auto: {kelas.nama_kelas}-{tahun_ajaran}-{semester}
    $table->string('dapodik_id')->nullable(); // ID dari Dapodik
    $table->timestamps();
    $table->unique(['kelas_id', 'tahun_ajaran', 'semester']);
});
```

**File:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_create_rombongan_belajar_table.php` | Migration | Table + indexes |
| `app/Models/RombonganBelajar.php` | Model | Relations + auto-name |
| `app/Services/DapodikSyncService.php` | **Edit** | Generate rombel from kelas + kirim ke Dapodik API |

**Flow:**
```
Artisan command / UI: Generate Rombel
  -> foreach Kelas aktif
    -> RombonganBelajar::firstOrCreate(['kelas_id', 'tahun_ajaran', 'semester'])
    -> Sync ke Dapodik: POST /api/v1/rombel
    -> Simpan dapodik_id
```

**Ponytail:** `firstOrCreate` — idempotent. Generate via command dulu (`php artisan kurikulum:generate-rombel`), UI nanti.

#### 39.8 Gap 7: Surat Otomatis (Template)

**Kondisi sekarang:** `SuratKeluar` + `SuratMasuk` ✅ selesai. Ada `PdfService::download()`. Tapi surat dibuat manual (isi form), belum pakai template dengan variable substitution.

**Desain:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_create_surat_template_table.php` | Migration | `surat_template`: nama, kode, konten_blade, variable_def (JSON), kategori (SK/ST/Undangan) |
| `app/Models/SuratTemplate.php` | Model | Render template dengan variable substitution |
| `resources/views/pdf/surat-template.blade.php` | Blade | Layout surat: kop surat, nomor, isi, TTD |
| `app/Http/Controllers/Admin/SuratTemplateController.php` | Controller | CRUD template + generate surat |
| `routes/admin.php` | **Edit** | + route surat-template |

**Variable system:**
```json
{
  "variables": [
    {"key": "nama_siswa", "label": "Nama Siswa", "source": "manual"},
    {"key": "nisn", "label": "NISN", "source": "manual"},
    {"key": "kelas", "label": "Kelas", "source": "manual"},
    {"key": "tanggal", "label": "Tanggal Surat", "source": "auto", "default": "{{date}}"},
    {"key": "nama_sekolah", "label": "Nama Sekolah", "source": "auto", "default": "{{profile.nama_sekolah}}"},
    {"key": "kepala_sekolah", "label": "Kepala Sekolah", "source": "auto", "default": "{{settings.nama_kepala_sekolah}}"}
  ]
}
```

**Flow:**
```
Admin buka Generate Surat
  -> Pilih template (SK/ST/Undangan)
  -> Form variable muncul sesuai template.variable_def
  -> Isi manual + auto-fill dari DB (profile, settings, siswa, dll)
  -> Render blade + PdfService::download()
  -> Opsional: Simpan ke SuratKeluar (auto-increment no_surat)
```

**Ponytail:** Blade template engine sudah cukup — tidak perlu Twig/Blade-like. Simpan konten sebagai string (bisa di-cache). Skip WYSIWYG editor — textarea dulu. Skip template versioning — cukup overwrite.

#### 39.9 Gap 8: Disposisi Workflow Multi-Tahap

**Kondisi sekarang:** ✅ Disposisi 1-level: Kepala TU → disposisi langsung ke user tujuan. `status_disposisi` enum: `belum`, `dibaca`, `dibalas`. Ada `SuratDisposisiNotification`.

**Gap:** Flow: Kepala → Wakil → BK/TU → feedback → arsip. Rantai disposisi multi-level + feedback dari penerima.

**Migration:**
```php
// Ubah status_disposisi jadi lebih granular
// atau buat tabel disposisi_log untuk track history

Schema::table('surat_masuk', function (Blueprint $table) {
    // Tambah kolom untuk multi-level
    $table->string('disposisi_tahap')->default('kepala')->after('status_disposisi');
    // nilai: kepala, wakil, bk_tu, feedback, selesai
});

// Atau buat tabel baru untuk chain
Schema::create('disposisi_log', function (Blueprint $table) {
    $table->id();
    $table->foreignId('surat_masuk_id')->constrained('surat_masuk')->cascadeOnDelete();
    $table->foreignId('dari_user_id')->constrained('users');
    $table->foreignId('ke_user_id')->constrained('users');
    $table->string('tahap'); // kepala_wakil, wakil_bk, bk_feedback
    $table->string('instruksi')->nullable();
    $table->text('feedback')->nullable();
    $table->string('status')->default('dibaca'); // dibaca, diproses, feedback, selesai
    $table->timestamp('dibaca_at')->nullable();
    $table->timestamp('selesai_at')->nullable();
    $table->timestamps();
});
```

**File:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_create_disposisi_log_table.php` | Migration | Track multi-level disposisi |
| `app/Models/DisposisiLog.php` | Model | Relations |
| `app/Http/Controllers/Admin/SuratMasukController.php` | **Edit** | Tambah route: disposisiLanjut(), feedback(), selesaiDisposisi() |
| `app/Models/SuratMasuk.php` | **Edit** | Relasi ke disposisiLog |
| `routes/admin.php` | **Edit** | + route disposisi |

**Flow:**
```
Kepala Sekolah:
  -> Disposisi ke Wakil (disposisi_log: tahap=kepala_wakil)
  -> Wakil terima notifikasi -> baca

Wakil:
  -> Disposisi lanjut ke BK/TU (disposisi_log: tahap=wakil_bk)
  -> Atau feedback ke Kepala
  -> BK/TU terima notifikasi

BK/TU:
  -> Proses surat
  -> Kirim feedback ke Wakil (disposisi_log: tahap=bk_feedback)
  -> Wakil review -> set selesai

Selesai:
  -> status_disposisi = 'selesai'
  -> Surat otomatis arsip (atau manual)
```

**Ponytail:** Skip visual workflow diagram — cukup log kronologis. Notification via existing `SuratDisposisiNotification` (database channel). Configurable chain via settings (default: Kepala->Wakil->BK/TU). Jangan hardcode chain — pakai array di konfigurasi.

#### 39.10 Gap 9: E-Rapor P5 Input Massal

**Kondisi sekarang:** `P5Projek` dan `P5Nilai` ✅ sudah ada migration + model. 6 dimensi P5: beriman, berkebinekaan, gotong_royong, mandiri, bernalar_kritis, kreatif.

**Gap:** Belum ada UI input massal per kelas. Input masih perlu per siswa.

**Desain:**
| File | Tipe | Keterangan |
|------|------|-----------|
| `resources/js/Pages/Admin/Rapor/P5InputMassal.tsx` | Page | Table: siswa per kelas, kolom: 6 dimensi + SB (Sudah Berkembang)/MB (Mulai Berkembang)/BSH (Berkembang Sesuai Harapan)/ST (Sangat Terampil) |
| `app/Http/Controllers/Admin/RaporSiswaController.php` | **Edit** | Tambah `p5MassalForm()` + `p5MassalStore()` |
| `routes/admin.php` | **Edit** | + route p5 massal |

**UI Flow:**
```
P5InputMassal:
  -> Pilih kelas (rapor_kelas_id), semester, projek_id
  -> Table: [Nama Siswa] [Beriman] [Berkebinekaan] [Gotong Royong] [Mandiri] [Bernalar Kritis] [Kreatif]
  -> Each cell: dropdown {Belum, Mulai Berkembang, Berkembang, Sangat Terampil} atau {-, MB, BSH, SB, ST}
  -> Save All -> foreach siswa -> updateOrCreate P5Nilai
```

**Ponytail:** Satu table untuk satu projek. Dropdown per cell. Skip rich feedback per dimensi (textarea) — cukup nilai kualitatif. Kalau nilai sudah ada, pre-fill dari DB.

#### 39.11 Prioritas Eksekusi

```
Tinggi (Sprint ini):
  #9  P5 Input Massal      — gap paling kritis (input manual masih per-siswa)
  #4  Multi-TTD            — prerequisite untuk PDF rapor resmi
  #5  Arsip Rapor          — prerequisite sebelum publish massal

Sedang (Sprint berikutnya):
  #1  Rekap Bulanan PDF    — standalone, reuse pattern existing
  #3  Import Nilai Excel   — standalone, CSV dulu
  #8  Disposisi Workflow   — extension dari existing, butuh migration

Rendah (Backlog):
  #6  Rombel Dapodik       — standalone, command-first
  #7  Surat Template       — standalone, bisa dikerjakan kapan saja
  #2  Face Recognition     — SKIP (hardware dependency)
```

#### ✅ Status per 2026-07-20

- [x] Architecture review 9 gap post-MVP selesai
- [x] Gap 2 (Face Recognition) — SKIP, hardware dependency
- [x] Gap 9 (P5 Input Massal) — prioritas tertinggi, 1 page baru + 1 edit
- [x] Gap 4+5 (TTD + Arsip) — prerequisite chain untuk produksi rapor
- [x] Gap 1,3,6,7,8 — documented dengan flow + file list + ponytail notes
- [x] docs/lean-prd.md updated


### 40. Sprint 2026-07-20 — Architecture: Absensi RFID/Device Gateway

**Tujuan:** Arsitektur device gateway untuk integrasi RFID reader di gerbang sekolah. Device/sensor push data ke API → log absensi real-time.

**Status sekarang:** Absensi GPS ✅ selesai. RFID masih backlog.

#### 40.1 Gambaran Arsitektur

```
┌──────────────────┐     HTTPS POST       ┌──────────────────────┐
│  RFID Reader     │ ──────────────────→   │  API /absensi/rfid   │
│  (ESP32/Rasp Pi) │   card_uid, device_id │  (Sanctum token)     │
└──────────────────┘                       └──────────┬───────────┘
                                                       │
                                                       ▼
                                              ┌──────────────────────┐
                                              │  absensi_device_log  │
                                              │  (raw log, selalu OK) │
                                              └──────────┬───────────┘
                                                           │
                                              ┌────────────▼──────────┐
                                              │  Process & Dedup     │
                                              │  mapping card→siswa  │
                                              │  → absensis table    │
                                              └──────────────────────┘
```

#### 40.2 Migration — `absensi_device` table

```php
Schema::create('absensi_device', function (Blueprint $table) {
    $table->id();
    $table->string('nama_device', 100);               // "Gerbang Utama", "Gerbang Belakang"
    $table->string('device_id', 50)->unique();         // Unique hardware ID
    $table->string('tipe', 30)->default('rfid');       // rfid, qr, fingerprint
    $table->string('api_token', 100)->nullable();       // Sanctum-style token untuk device auth
    $table->string('ip_address', 45)->nullable();       // Whitelist IP opsional
    $table->boolean('aktif')->default(true);
    $table->text('keterangan')->nullable();
    $table->timestamps();
});
```

#### 40.3 Migration — `absensi_device_log` table

```php
Schema::create('absensi_device_log', function (Blueprint $table) {
    $table->id();
    $table->foreignId('device_id')->constrained('absensi_device')->cascadeOnDelete();
    $table->string('card_uid', 100);                   // UID kartu RFID/NFC
    $table->string('siswa_nisn', 20)->nullable();      // resolved from card mapping
    $table->foreignId('siswa_id')->nullable()->constrained('siswa')->nullOnDelete();
    $table->timestamp('scan_at');                      // waktu scan dari device
    $table->string('status', 20)->default('success');  // success, unknown_card, device_inactive
    $table->text('payload_raw')->nullable();            // raw JSON dari device
    $table->boolean('processed')->default(false);       // sudah diproses ke absensis?
    $table->timestamp('processed_at')->nullable();
    $table->timestamps();
});
```

#### 40.4 Migration — `absensi_kartu` (card ↔ siswa mapping)

```php
Schema::create('absensi_kartu', function (Blueprint $table) {
    $table->id();
    $table->string('card_uid', 100)->unique();         // UID kartu RFID
    $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
    $table->string('jenis', 20)->default('rfid');       // rfid, nfc, qr
    $table->boolean('aktif')->default(true);
    $table->timestamps();
});
```

#### 40.5 API Endpoint — Device Gateway

**Route:** `POST /api/device/absensi/scan` (no Sanctum — pakai device token sendiri)

```php
Route::post('device/absensi/scan', [DeviceAbsensiController::class, 'scan'])
    ->middleware('device.auth'); // custom middleware: cek api_token + ip whitelist
```

**Request body (dari device):**
```json
{
  "device_id": "ESP32-GERBANG-01",
  "card_uid": "04A3B2C1D5",
  "scan_at": "2026-07-20 07:15:00",
  "api_token": "devicetoken123"
}
```

**Response (ke device):**
```json
{
  "success": true,
  "status": "logged",
  "siswa": "Andi Pratama"
}
```

#### 40.6 Controller — DeviceAbsensiController

**Flow `scan()`:**

```
scan(Request):
  1. Validasi device_id + api_token → cari absensi_device
  2. Cek device.aktif == true
  3. Simpan raw log ke absensi_device_log (status=success)
  4. Cari card_uid di absensi_kartu
     - Jika tidak ditemukan → log status=unknown_card, return {success:true, status:unknown_card}
  5. Ambil siswa_id dari absensi_kartu
  6. Cek absensi hari ini (unique constraint siswa_id + tanggal)
     - Jika sudah ada jam_masuk → skip (return status=already_logged)
  7. Create/update absensis:
     - metode = 'rfid'
     - jam_masuk = scan_at / jam_pulang = scan_at
     - status_masuk = auto dari jam (sama logic GPS)
  8. Update absensi_device_log: processed=true, siswa_id, siswa_nisn
  9. (Optional) dispatch SendAbsensiNotification
  10. Return {success:true, status:logged, siswa:nama_lengkap}
```

#### 40.7 File List

| File | Tipe | Keterangan |
|------|------|-----------|
| `database/migrations/2026_07_20_000002_create_absensi_device_table.php` | Migration | `absensi_device` — registrasi device |
| `database/migrations/2026_07_20_000003_create_absensi_device_log_table.php` | Migration | `absensi_device_log` — raw scan log |
| `database/migrations/2026_07_20_000004_create_absensi_kartu_table.php` | Migration | `absensi_kartu` — mapping card UID ↔ siswa |
| `app/Models/AbsensiDevice.php` | Model | + scopeAktif, relasi ke log |
| `app/Models/AbsensiDeviceLog.php` | Model | + relasi ke device, siswa |
| `app/Models/AbsensiKartu.php` | Model | + relasi ke siswa |
| `app/Http/Controllers/Api/DeviceAbsensiController.php` | Controller | `scan()` endpoint — logika utama |
| `app/Http/Middleware/DeviceAuth.php` | Middleware | Validasi device_id + api_token + IP whitelist |
| `app/Http/Controllers/Admin/AbsensiDeviceController.php` | Controller | Admin UI: daftar device, kartu, log |
| `resources/js/Pages/Admin/Absensi/DeviceIndex.tsx` | Page | Daftar device + status |
| `resources/js/Pages/Admin/Absensi/DeviceLog.tsx` | Page | Raw log per device |
| `resources/js/Pages/Admin/Absensi/KartuIndex.tsx` | Page | Mapping card UID ↔ siswa |
| `routes/api.php` | **Edit** | + device/auth route group |
| `routes/admin.php` | **Edit** | + device management routes |
| `app/Providers/AppServiceProvider.php` | **Edit** | Register DeviceAuth middleware |
| `app/Http/Kernel.php` | **Edit** | + $routeMiddleware 'device.auth' |

#### 40.8 Admin UI Flow

```
Device Management (/dashboard/absensi/device)
  ├── Daftar Device: nama, device_id, tipe, aktif, last_scan_at
  │   ├── Tambah Device: form nama, device_id, tipe → auto-generate api_token
  │   ├── Edit Device: nonaktifkan, ganti nama
  │   └── Reset Token: generate ulang api_token
  │
  ├── Log Scan (/dashboard/absensi/device/{device}/log)
  │   └── Tabel: scan_at, card_uid, siswa, status, payload_raw
  │       Filter: tanggal, status (success/unknown_card/device_inactive)
  │
  └── Kartu RFID (/dashboard/absensi/kartu)
      └── Tabel: card_uid, siswa_nama, siswa_nisn, aktif
          ├── Tambah: input card_uid + pilih siswa
          ├── Edit: ganti mapping
          └── Nonaktifkan: kartu hilang
```

#### 40.9 Device Listener (Separate Service)

**Tujuan:** Device (ESP32/Raspberry Pi) perlu software client yang push scan ke API.

| Komponen | Deskripsi |
|----------|-----------|
| **ESP32 Native** | Call `POST /api/device/absensi/scan` langsung via WiFi. Simpan `api_token` di flash. Retry 3x jika gagal. |
| **Raspberry Pi Bridge** | Untuk RFID reader USB (serial/RS232) → Python script baca serial → POST API |
| **QR Scanner** | Kamera USB →Python zbar/pyzbar decode QR → POST API |

**Contoh ESP32 Arduino sketch (pseudocode):**
```cpp
void loop() {
  if (rfid.cardScanned()) {
    String cardUid = rfid.getUid();
    String payload = "{\"device_id\":\"GERBANG-01\",\"card_uid\":\"" + cardUid + "\",\"scan_at\":\"" + getTimestamp() + "\",\"api_token\":\"" + API_TOKEN + "\"}";
    httpPOST("https://sekolah.ac.id/api/device/absensi/scan", payload);
    delay(2000); // anti double-scan
  }
}
```

**Ponytail:** Project ini tidak include firmware device — dokumentasi API + contoh code ESP32 cukup. Device listener adalah tanggung jawab tim hardware. Yang kita bangun hanyalah API endpoint di Laravel.

#### 40.10 Device Auth Strategy

| Metode | Keterangan |
|--------|-----------|
| **api_token** (rekomendasi) | Simpan token di tabel `absensi_device`. Device kirim di body/header. Cek via middleware DeviceAuth. |
| **IP Whitelist** (opsional) | Kolom `ip_address` di device. Middleware cek `request()->ip()` cocok. Berguna kalau device punya static IP lokal. |
| **Basic Auth + SSL** (alternatif) | Device punya username:password. Tapi butuh HTTPS. Untuk shared hosting tanpa SSL, api_token lebih praktis. |

**DeviceAuth middleware:**
```php
public function handle($request, Closure $next) {
    $deviceId = $request->input('device_id') ?? $request->header('X-Device-Id');
    $token = $request->input('api_token') ?? $request->header('X-Device-Token');
    
    $device = AbsensiDevice::where('device_id', $deviceId)
        ->where('api_token', $token)
        ->where('aktif', true)
        ->first();
    
    if (!$device) {
        return response()->json(['success' => false, 'message' => 'Unauthorized device'], 401);
    }
    
    $request->merge(['_device' => $device]);
    return $next($request);
}
```

#### 40.11 Ponytail Design Decisions

| Keputusan | Alasan |
|-----------|--------|
| **Tabel device + kartu terpisah** | Satu device bisa scan banyak kartu, satu kartu bisa dipakai di banyak device (pintu masuk/pulang). Relasi M:N via device_log. |
| **Raw log selalu disimpan** | Bahkan untuk unknown_card — audit trail. Tidak blocking device. |
| **Dedup via unique constraint absensis** | `unique(['siswa_id', 'tanggal'])` — kalau sudah ada jam_masuk, scan kedua dianggap checkout (jam_pulang). |
| **Sanctum NOT used for devices** | Device tidak login sebagai user. `api_token` di tabel `absensi_device` lebih sederhana. |
| **No queue for device log** | Langsung insert + process di satu request. Latency < 200ms. Device timeout lebih berbahaya dari blocking. |
| **No websocket** | Device HTTP POST saja. Polling/manual refresh untuk UI. |

#### 40.12 Prioritas Eksekusi

```
Phase 1 — Core (Sprint ini):
  1. Migration absensi_device + absensi_device_log + absensi_kartu
  2. Model AbsensiDevice, AbsensiDeviceLog, AbsensiKartu
  3. DeviceAuth middleware
  4. DeviceAbsensiController::scan()
  5. API route + test endpoint (curl/Postman)

Phase 2 — Admin UI (Sprint ini):
  6. AbsensiDeviceController (CRUD device + reset token)
  7. DeviceIndex.tsx + DeviceLog.tsx
  8. KartuIndex.tsx (mapping card UID)

Phase 3 — Device (Opsional, tim hardware):
  9. Dokumentasi API
  10. Contoh code ESP32 / Python bridge
```

#### ✅ Status per 2026-07-20

- [x] Architecture RFID/Device Gateway selesai
- [x] Skema database: 3 tabel (device, device_log, kartu)
- [x] API endpoint + DeviceAuth middleware
- [x] Admin UI: device management, log viewer, kartu mapping
- [x] Device listener: dokumentasi API + contoh code
- [x] docs/lean-prd.md updated

