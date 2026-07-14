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
| **Master Bank** | `dashboard/master-bank` | CRUD master bank (nama_bank, kode_bank, cabang, rekening_default, dsb) |
| **Pengaturan Sistem (Settings)** | `dashboard/settings` | Card berisi Data Instansi (nama sekolah, alamat, map iframe, upload logo, media sosial, Legalitas Instansi: NPSN, Akreditasi, Nama Kepala Sekolah, NIP Kepala Sekolah), tema warna, serta konfigurasi Hero (upload foto atau video; foto: webp/avif 1920x1080 atau 2560x1440 max 150‑200KB; video: mp4(H.264)/webm(VP9/AV1) 1920x1080 max 2‑5MB, 5‑10detik, tanpa suara, loop otomatis; hanya satu jenis media dapat dipilih — foto atau video, tidak keduanya sekaligus) |

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
---

### 17. Fitur Tambahan (Post-MVP Roadmap)

#### 17.1 Anjungan Absensi Digital
**Tujuan:** Pencatatan kehadiran siswa dan guru via RFID, biometrik, atau aplikasi mobile berbasis lokasi (GPS) yang terhubung langsung ke WhatsApp orang tua.

| Prioritas | Fitur | Deskripsi |
|-----------|-------|-----------|
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
|--------|-------|-----------|
| ✅ **Selesai** | Profil Lengkap Siswa | Tabel `buku_induk_siswa`: agama, anak_ke, jumlah_saudara, bahasa_sehari_hari, transportasi, jarak_rumah_sekolah_km, hobi, cita_cita, berat_badan_kg, tinggi_badan_cm, kebutuhan_khusus |
| ✅ **Selesai** | Rekam Medis | Tabel `rekam_medis_siswa`: golongan_darah, alergi, penyakit_terdahulu, obat_rutin, nama_dokter, rumah_sakit_rujukan, kontak_darurat |
| ✅ **Selesai** | Data Orang Tua/Wali | Tabel `orang_tua_detail` (1:N): hubungan (Ayah/Ibu/Wali), nama_lengkap, nik, npwp, tanggal_lahir, pendidikan_terakhir, pekerjaan, penghasilan_bulanan, status_pernikahan, jumlah_tanggungan, no_hp, email, alamat |
| ✅ **Selesai** | Riwayat Mutasi | Tabel `mutasi_siswa`: jenis (masuk/pindah/keluar/lulus), tanggal_mutasi, asal_sekolah, sekolah_tujuan, alasan, no_sk, dokumen_scan, dicatat_oleh |
| 🔄 **Belum** | Cetak Buku Induk (PDF) | Generate PDF per siswa (format Kemendikbud) untuk keperluan pindah/kelulusan |

**Implementasi Teknis:**
- Migration: `2026_07_14_000001_create_buku_induk_tables` (4 tabel sekaligus)
- Models: `BukuIndukSiswa`, `RekamMedisSiswa`, `OrangTuaDetail`, `MutasiSiswa` + relasi di `Siswa::bukuInduk()`, `rekamMedis()`, `orangTuaDetails()`, `mutasis()`
- Controller: `BukuIndukController` (index, show, cetak, updateProfil, updateRekamMedis, store/update/destroy OrangTua, store/destroy Mutasi)
- Routes: `dashboard/buku-induk*` (middleware `auth`, role `Admin/Guru/Staf`)
- Frontend: `resources/js/Pages/Admin/BukuInduk/{Index,Show,Cetak}.tsx`
- Sidebar: Item "Buku Induk Digital" (icon Library) setelah "Data Siswa"

---

#### 17.3 Konseling & BK
**Tujuan:** Pencatatan poin pelanggaran tata tertib, prestasi siswa, dan modul konseling siswa.

| Prioritas | Fitur | Deskripsi |
|-----------|-------|-----------|
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
|-----------|-------|-----------|
| **Tinggi** | Rapor Format Resmi | Generate PDF rapor sesuai template Kemendikbud (cover, identitas, nilai mapel, ekstrakurikuler, catatan wali kelas, P5) |
| **Tinggi** | Input Nilai TP/Asesmen | UI input nilai per Tujuan Pembelajaran (formatif + sumatif) per mapel per siswa |
| **Tinggi** | P5 (Projek Profil Pelajar Pancasila) | Sudah ada migration `p5_projek` & `p5_nilai` — perlu UI input 6 dimensi + predikat A/B/C/D |
| **Sedang** | Deskripsi Karakter & Catatan | `rapor_deskripsi` + `rapor_catatan` sudah ada — perlu UI lengkap per semester |
| **Sedang** | Ekstrakurikuler | `rapor_ekstrakurikuler` sudah ada — UI pilih ekstrakurikuler + predikat |
| **Rendah** | Export massal per kelas | Generate ZIP berisi PDF rapor tutta kelas untuk distribusi |

**Teknis:**
- Models sudah ada: `RaporSiswa`, `RaporNilai`, `RaporMapel`, `RaporKelas`, `RaporDeskripsi`, `RaporEkstrakurikuler`, `RaporCatatan`, `TujuanPembelajaran`, `AsesmenFormatif`, `AsesmenSumatif`, `P5Projek`, `P5Nilai`
- Butuh: `RaporSiswaController` (CRUD + generate PDF), `RaporNilaiController` (input per TP), `P5NilaiController` (input 6 dimensi)
- PDF template pakai `dompdf` dengan Blade view `rapor.pdf.blade.php`
- Queue job `GenerateRaporPdf` untuk batch processing

---

#### 17.5 Pengelolaan Kurikulum
**Tujuan:** Pengaturan struktur Kurikulum Merdeka atau K-13, pembagian jam mengajar (SKBM), dan pembuatan jadwal pelajaran.

| Prioritas | Fitur | Deskripsi |
|-----------|-------|-----------|
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
|-----------|-------|-----------|
| **Sedang** | Surat Masuk | Tabel `surat_masuk` (no_agenda, no_surat, tanggal_surat, tanggal_diterima, asal_surat, perihal, ringkasan, file_scan, disposisi_to, status: diterima/diproses/selesai/arsip) |
| **Sedang** | Surat Keluar | Tabel `surat_keluar` (no_agenda, no_surat, tanggal_surat, tujuan_surat, perihal, ringkasan, file_scan, ditandatangani_oleh, status: draft/dikirim/arsip) |
| **Sedang** | NISN Management | Auto-generate NISN saat input siswa baru (validasiunik), cek ke Dapodik via webservice |
| **Sedang** | Arsip Digital Akreditasi | Tabel `arsip_akreditasi` (kategori: standar_1-8, sub_kategori, nama_dokumen, deskripsi, file_path, tanggal_upload, tahun_ajaran, status_verifikasi) |
| **Rendah** | Disposisi Surat | Workflow disposisi: Kepala Sekolah → Wakil → BK/TU → feedback → arsip |
| **Rendah** | Surat Otomatis | Template surat (SK, ST, Undangan) → generate PDF dengan variable substitution |

**Teknis:**
- Models: `SuratMasuk`, `SuratKeluar`, `ArsipAkreditasi`
- NISN: gunakan `SiswaObserver::creating` → generate NISN format `YYYYXXXX` (tahun + sequential) atau cek ke API Dapodik
- File upload ke `public/images/surat/` & `public/images/arsip/`
- PDF generate untuk surat otomatis pakai `dompdf`

---

### 18. Implementation Sequencing (Post-MVP)

| Sprint | Modul | Dependencies |
|--------|-------|--------------|
| **Sprint 1-2** | Buku Induk Digital (Profil, Orang Tua, Mutasi) | Siswa model existing |
| **Sprint 3-4** | Konseling & BK (Pelanggaran, Prestasi extend, Konseling) | Siswa, Guru existing |
| **Sprint 5-7** | E-Rapor Digital (Nilai TP, P5, PDF Generate) | Rapor* existing migrations, KurikulumMapel |
| **Sprint 8-9** | Pengelolaan Kurikulum (Struktur, SKBM, Jadwal) | Kurikulum, Mapel, Guru, Kelas existing |
| **Sprint 10-11** | Anjungan Absensi Digital (RFID/GPS, WhatsApp Notif) | Siswa, Guru, Settings (WhatsApp config) |
| **Sprint 12-13** | Manajemen TU (Surat, NISN, Arsip) | Settings, User existing |

**Total estimasi: ~26 minggu (6.5 bulan) post-MVP untuk semua modul lengkap.**

---

### 19. Technical Debt & Prerequisites

Sebelum memulai fitur baru di atas, perlu diselesaikan:

1. **User ↔ Siswa Auto-Link**: `Siswa::created` observer → auto-create `User` dengan role `murid`, kirim kredensial via email/WA
2. **Naik Kelas Massal**: Scheduled command `php artisan siswa:promote` end-of-year (10→11, 11→12, 12→Lulus)
3. **Variant Kolom di Kelas**: Tambah kolom `variant` di tabel `kelas` (A/B/C/D) — bukan derive dari nama_kelas
4. **WhatsApp Gateway Config**: Tambah field di `settings` table: `whatsapp_gateway_url`, `whatsapp_token`, `whatsapp_template_absensi_masuk`, `whatsapp_template_absensi_pulang`
5. **Queue Worker Cron**: Pastikan cron `* * * * * php artisan queue:work --stop-when-empty --max-time=60` aktif di production
6. **PDF Library**: `composer require barryvdh/laravel-dompdf` untuk generate rapor/surat PDF


---

### 20. Modul Blog / Website Sekolah (MVP)

**Tujuan:** Modul publikasi berita & agenda sekolah aman, terkurasi (approval Humas), dan terstruktur. Fokus MVP: approval flow + 3 kategori hardcode + 2 role penulis.

#### 20.1 Prioritas & Scope MVP

| Prioritas | Fitur | Deskripsi | Alasan |
|-----------|-------|-----------|--------|
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
|------|-----------|
| `Berita.php` | Tambah `penulis()` relation, `approvedBy()` relation, scope `published()`, `pending()`, `draft()`, accessor `isPublished()`. |
| `BeritaObserver.php` (baru) | `created`: jika `created_by` punya role `Humas`/`Admin` → auto `status=published`, `published_at=now`. Jika role `Penulis` → `status=pending`. `updating`: jika `status` berubah ke `published` set `published_at=now()`, `approved_by=Auth::id()`. |
| `BeritaRequest.php` (baru) | Validasi: `title`, `content`, `kategori` (enum), `thumbnail` (image). Role `Penulis` tidak boleh set `is_active`/`status`. |

#### 20.4 Controller & Routes

| Endpoint | Method | Middleware | Deskripsi |
|----------|--------|------------|-----------|
| `/dashboard/berita` | GET | `auth`, `role:Admin|Humas|Penulis` | Index: Admin/Humas lihat semua (filter status), Penulis lihat milik sendiri |
| `/dashboard/berita/create` | GET | `auth`, `role:Admin|Humas|Penulis` | Form buat draf |
| `/dashboard/berita` | POST | `auth`, `role:Admin|Humas|Penulis` | Simpan draf / publish (Admin/Humas) |
| `/dashboard/berita/{id}/edit` | GET | `auth`, owner check | Edit draf sendiri |
| `/dashboard/berita/{id}` | PUT/PATCH | `auth`, owner check | Update |
| `/dashboard/berita/{id}/submit` | POST | `auth`, `role:Penulis` | Penulis submit ke approval (status→pending) |
| `/dashboard/berita/{id}/approve` | POST | `auth`, `role:Admin|Humas` | Approve & publish |
| `/dashboard/berita/{id}/reject` | POST | `auth`, `role:Admin|Humas` | Reject + alasan (wajib) |
| `/berita` (public) | GET | `web` | List published, filter kategori, paginate |
| `/berita/{slug}` (public) | GET | `web` | Detail berita published only |
| `/agenda` (public) | GET | `web` | Kalender kegiatan (kategori `kegiatan` + `published_at` range) |

#### 20.5 Frontend Pages (Inertia React)

| Halaman | Path | Props | Note |
|---------|------|-------|------|
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
|----------|-----------|-----------|
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
|--------|-------|-------------|
| **Sprint 1** | Migration + Model + Observer + Seeder roles | `php artisan migrate:fresh --seed` jalan, roles terseed |
| **Sprint 2** | Admin CRUD (Index, Create, Edit, Submit, Approve, Reject) | Feature tests pass, Inertia pages render |
| **Sprint 3** | Public pages (`/berita`, `/berita/{slug}`, `/agenda`) + SEO | E2E manual test + feature tests public routes |

---

### 21. Definition of Done (Blog MVP)

- [ ] Migration reversible + seed roles/permissions
- [ ] Observer auto-status works for all roles
- [ ] Policy `BeritaPolicy` (viewAny, view, create, update, delete, submit, approve, reject)
- [ ] Feature tests: 8 tracer bullets (see 20.7) passing
- [ ] Admin Inertia pages: Index (tabs status), Create, Edit, Detail
- [ ] Public pages: List, Detail, Agenda calendar
- [ ] Flash messages: success/error on all actions
- [ ] `php artisan test` green


---

### 22. Modul Anjungan Absensi Digital (MVP Sedang)

**Tujuan:** Pencatatan kehadiran siswa & guru via RFID, biometrik, atau aplikasi mobile berbasis GPS yang terhubung ke WhatsApp orang tua.

#### 22.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Absensi RFID/Biometrik** | Siswa tap kartu RFID / sidik jari di gerbang → record `absensi_siswa` (waktu, device_id, status: hadir/terlambat/izin/sakit/alpa) | Tinggi |
| **Absensi GPS Mobile** | Aplikasi mobile (PWA) guru/siswa absen via GPS radius sekolah (±100m). Simpan lat/long, foto selfie opsional. | Tinggi |
| **Absensi Guru** | Guru absen masuk/pulang via mobile/web. Relasi ke `jadwal_mengajar` untuk validasi jam. | Tinggi |
| **Notifikasi WA Orang Tua** | Kirim notifikasi WA (via WhatsApp Gateway/API) ke orang tua saat siswa: hadir, terlambat, izin, sakit, alpa. Template terstruktur. | Tinggi |
| **Rekap & Laporan** | Rekap harian/mingguan/bulanan per kelas, per siswa, per guru. Export PDF/Excel untuk BK & Orang Tua. | Sedang |
| **Device Management** | CRUD device RFID/biometrik (nama, lokasi, IP, status aktif). Log scan untuk audit. | Sedang |

#### 22.2 Skema Database (Migration Baru)

```php
// absensi_siswa
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
$table->date('tanggal');
$table->time('jam_masuk')->nullable();
$table->time('jam_pulang')->nullable();
$table->enum('status_masuk', ['hadir', 'terlambat', 'izin', 'sakit', 'alpa'])->default('alpa');
$table->enum('status_pulang', ['hadir', 'pulang_cepat', 'izin', 'sakit', 'alpa'])->default('alpa');
$table->string('device_id')->nullable(); // RFID/biometrik device
$table->decimal('lat', 10, 7)->nullable(); // GPS
$table->decimal('lng', 10, 7)->nullable();
$table->string('foto_selfie')->nullable();
$table->text('keterangan')->nullable(); // alasan izin/sakit
$table->foreignId('dicatat_oleh')->nullable()->constrained('users')->nullOnDelete(); // guru/admin yang input manual
$table->timestamps();
$table->unique(['siswa_id', 'tanggal']); // 1 record per hari

// absensi_guru
$table->id();
$table->foreignId('guru_id')->constrained('guru')->cascadeOnDelete();
$table->foreignId('jadwal_id')->nullable()->constrained('jadwal_mengajar')->nullOnDelete();
$table->date('tanggal');
$table->time('jam_masuk')->nullable();
$table->time('jam_pulang')->nullable();
$table->enum('status', ['hadir', 'terlambat', 'izin', 'sakit', 'alpa'])->default('alpa');
$table->decimal('lat', 10, 7)->nullable();
$table->decimal('lng', 10, 7)->nullable();
$table->text('keterangan')->nullable();
$table->timestamps();
$table->unique(['guru_id', 'tanggal']);

// absensi_device
$table->id();
$table->string('nama', 100);
$table->string('lokasi', 100); // Gerbang Utama, Gerbang Samping, Ruang Guru
$table->enum('tipe', ['rfid', 'fingerprint', 'face_recognition']);
$table->string('ip_address', 45)->nullable();
$table->string('mac_address', 17)->nullable();
$table->boolean('aktif')->default(true);
$table->timestamp('last_ping')->nullable();
$table->timestamps();

// wa_notifikasi_log
$table->id();
$table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
$table->foreignId('orang_tua_id')->nullable()->constrained('users')->nullOnDelete();
$table->string('tipe'); // absen_masuk, absen_pulang, terlambat, izin, sakit, alpa
$table->string('nomor_tujuan', 20);
$table->text('pesan');
$table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
$table->text('response')->nullable();
$table->timestamp('sent_at')->nullable();
$table->timestamps();
$table->index(['siswa_id', 'tipe', 'created_at']);
```

#### 22.3 Integrasi WhatsApp Gateway

- Pakai **Wablas** / **Fonnte** / **WATI** / custom WhatsApp Business API.
- Konfigurasi di tabel `settings` (key: `wa_gateway_url`, `wa_api_key`, `wa_template_absen_masuk`, dll).
- Queue job `KirimNotifikasiAbsensi` (database driver) → retry 3x, delay 5s.
- Template WA pakai placeholder: `{{nama_siswa}}`, `{{kelas}}`, `{{waktu}}`, `{{status}}`.

#### 22.4 Testing (TDD)

| Behavior | Test |
|----------|------|
| RFID scan → create absensi_siswa record | Feature |
| GPS absen di luar radius → status `alpa` / tolak | Feature |
| Auto-kirim WA ke ortu saat status bukan `hadir` | Feature (mock HTTP) |
| Rekap harian per kelas benar: count hadir/izin/sakit/alpa per kelas | Feature |
| Device inactive > 5 menit → alert admin | Feature |

---

### 23. Modul Buku Induk Digital (MVP Sedang)

**Tujuan:** Basis data profil siswa, rekam medis ringkas, latar belakang orang tua, riwayat mutasi.

#### 23.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Profil Siswa Lengkap** | Extend `siswa` + tabel `buku_induk_siswa`: data kelahiran, agama, anak ke-, bahasa, transportasi, jarak rumah-sekolah, hobi, cita-cita. | Tinggi |
| **Rekam Medis Ringkas** | Tabel `rekam_medis_siswa`: golongan darah, alergi, penyakit, obat rutin, nama dokter, RS rujukan, kontak darurat. | Tinggi |
| **Latar Belakang Orang Tua** | Tabel `orang_tua_detail`: pekerjaan, penghasilan, pendidikan, status nikah, jumlah tanggungan, no KTP, NPWP. Relasi ke `siswa` via `wali_siswa` (sudah ada di `siswa.nama_ortu`/`no_hp_ortu`). | Tinggi |
| **Riwayat Mutasi** | Tabel `mutasi_siswa`: tgl_mutasi, asal/sekolah_tujuan, alasan, no_sk, status (masuk/keluar), dokumen_scan. | Sedang |
| **Cetak Buku Induk** | Generate PDF (dompdf/snappy) format Depdiknas: halaman identitas, orang tua, kesehatan, mutasi, prestasi. | Sedang |

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
|----------|------|
| CRUD profil lengkap + validasi required | Feature |
| Rekam medis hanya editable role `BK`/`Admin` | Feature (Policy) |
| Mutasi keluar → auto set `siswa.status=pindah`, tutup `siswa_kelas` | Feature (Observer) |
| PDF generate benar format & data lengkap | Feature (snapshot) |

---

### 24. Modul Konseling & BK (MVP Sedang)

**Tujuan:** Pencatatan poin pelanggaran tata tertib, prestasi siswa, dan modul konseling.

#### 24.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
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
|----------|------|
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
|-----|-----------|-----------|
| **PDF Generator Resmi** | Generate PDF format Kemendikbudristek (Kurikulum Merdeka): halaman sampul, capaian kompetensi, profil pelajar pancasila (P5), ekstrakurikuler, catatan wali kelas, tanda tangan Kepsek/Wali Kelas/Ortu. Pakai `barryvdh/laravel-dompdf` + template blade. | Kritis |
| **Nilai P5 per Dimensi** | UI input nilai P5 6 dimensi (beriman, berkebinekaan, gotong royong, mandiri, bernalar kritis, kreatif) per projek per siswa. Sudah ada `p5_nilai` tapi belum ada form input massal per kelas. | Tinggi |
| **Deskripsi Capaian** | `rapor_deskripsi` per mapel per siswa: narasi capaian (bukan angka). Input guru mapel via textarea rich text. | Tinggi |
| **Import Nilai Excel** | Template import nilai UTS/UAS/PAS/PAT per mapel per kelas. Validasi range 0-100, map ke `rapor_nilai` + `asesmen_sumatif`. | Sedang |
| **Multi-tanda Tangan Digital** | TTD digital (image upload) Kepsek, Wali Kelas, Ortu. Simpan di `rapor_siswa` (kolom `ttd_kepsek`, `ttd_walikelas`, `ttd_ortu`). | Sedang |
| **Arsip Rapor per Semester** | Snapshot rapor per semester (read-only after publish). Clone `rapor_siswa` ke `rapor_arsip` saat publish. | Sedang |

#### 25.2 Testing

| Behavior | Test |
|----------|------|
| Generate PDF rapor 1 siswa = 1 file, format benar | Feature (snapshot PDF) |
| Input nilai massal Excel → tersimpan ke rapor_nilai + asesmen_sumatif | Feature |
| Publish rapor → clone ke arsip, lock edit | Feature (Observer) |
| P5 6 dimensi input & validasi predikat A/B/C/D | Feature |

---

### 26. Modul Pengelolaan Kurikulum (MVP Rendah)

**Tujuan:** Pengaturan struktur Kurikulum Merdeka atau K-13, pembagian jam mengajar (SKBM), pembuatan jadwal pelajaran.

#### 26.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Struktur Kurikulum** | Tabel `kurikulum`: nama (Merdeka/K13), aktif, tahun_mulai, tahun_selesai. Relasi ke `rapor_mapel` (mapel apa saja di kurikulum ini). | Sedang |
| **SKBM (Satuan Kredit Belajar Mingguan)** | Tabel `skbm`: kurikulum_id, tingkat (10/11/12), jurusan_id, mapel_id, jam_per_minggu. Validasi total jam ≤ 38/40/42 per Minggu. | Sedang |
| **Jadwal Pelajaran** | Tabel `jadwal_pelajaran`: hari, jam_ke, kelas_id, mapel_id, guru_id, ruangan, semester, tahun_ajaran. Validasi bentrok guru/kelas/ruangan. Drag-drop UI (dnd-kit). | Sedang |
| **Rombongan Belajar** | Auto-generate `rombongan_belajar` dari `kelas` + `tahun_ajaran` untuk sinkron Dapodik. | Rendah |

#### 26.2 Testing

| Behavior | Test |
|----------|------|
| SKBM total jam per kelas tidak melebihi batas | Feature |
| Jadwal tidak bentrok guru/kelas/ruangan | Feature |
| Aktivasi kurikulum baru → copy mapel dari lama | Feature |

---

### 27. Modul Manajemen Tata Usaha (TU) (MVP Rendah)

**Tujuan:** Pengelolaan surat masuk, surat keluar, NISN, arsip digital akreditasi.

#### 27.1 Scope MVP

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Surat Masuk** | Tabel `surat_masuk`: no_agenda, tanggal_terima, no_surat, tanggal_surat, asal_surat, perihal, ringkasan, file_scan, disposisi (kepada, instruksi, batas_waktu), status (baru/diproses/selesai/arsip). | Sedang |
| **Surat Keluar** | Tabel `surat_keluar`: no_agenda, tanggal_kirim, no_surat, tujuan, perihal, ringkasan, file_scan, penandatangan, status. Nomor otomatis per tahun (001/TU/SK/2025). | Sedang |
| **NISN Management** | Sync NISN dari Dapodik → tabel `siswa.nisn`. UI verifikasi NISN duplikat, NISN kosong. | Sedang |
| **Arsip Digital Akreditasi** | Tabel `arsip_akreditasi`: standar (1-8), sub_standar, butir, nama_dokumen, file_path, tahun_ajaran, status (lengkap/belum), penanggung_jawab. Tree view per standar. | Rendah |
| **Disposisi & Tracking** | Surat masuk → disposisi ke pegawai → tracking status baca/balas. Notifikasi WA/email ke penerima disposisi. | Rendah |

#### 27.2 Testing

| Behavior | Test |
|----------|------|
| Nomor surat keluar auto-increment per tahun | Feature |
| Disposisi → notifikasi ke penerima | Feature |
| Arsip akreditasi filter standar/sub_standar | Feature |

