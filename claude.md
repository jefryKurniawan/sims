# CLAUDE.md – Petunjuk Khusus untuk Proyek Sekolahku

Referensi utama: [docs/lean-prd.md](/docs/lean-prd.md)

## Tujuan Proyek
Sekolahku adalah sistem manajemen sekolah terintegrasi berbasis Laravel dengan stack modern (React, Inertia.js, Vite, Zustand). Tujuan adalah menyatukan modul PPDB, Siswa, SPP, Perpustakaan, dan Alumni sehingga data mengalir secara otomatis antar-modul, sambil dioptimalkan untuk shared hosting melalui OpCache, eager loading, indexing, dan queue.

## Panduan untuk Laravel-Specialist
- Fokus pada peningkatan modul sesuai urutan dalam PRD: mulai dari PPDB karena keterkaitan erat dengan SPP dan Portal Orang Tua.
- Pastikan penggunaan Eloquent eager loading (`with()`) untuk mengurangi query N+1.
- Terapkan OpCache melalui file `.user.ini` di root projek dengan konfigurasi yang disarankan.
- Gunakan queue untuk proses berat (email, upload, laporan) dengan configurasi di `app/Console/Kernel.php` yang menjalankan `queue:work --stop-when-empty` setiap menit.
- Adopsi Inertia Bersama Zustand untuk manajemen state frontend; pastikan komponen React menerima props melalui Inertia.
- Gunakan template admin Mazer (https://github.com/zuramai/mazer) sebagai dasar UI, sesuaikan warna dengan identitas sekolah (navy dan putih).
- Buat seed data untuk setiap modul baru yang ditambahkan.
- Pastikan penggunaan middleware dan otorisasi sesuai dengan роль (admin, orang tua, siswa, staf, dsb.).
- Selalu tulis migrasi yang dapat di‑rollback dan berikan data contoh (seeder) untuk fitur baru.
- Setelah perubahan kode backend, bersihkan OpCache bila diperlukan (misalnya melalui `service php*-fpm reload` atau menyentuh file `tmp/restart.txt`).

## Panduan untuk Frontend‑Design Specialist
- Ikuti pedoman desain dari skill `frontend-design` dengan memilih arah estetika yang mencerminkan identitas sekolah: profesional, bersih, mudah diakses oleh siswa, orang tua, dan admin.
- Gunakan palet warna: Biru Tua (#003366) sebagai primar, Putih/Abu‑abu sebagai sekunder, Hijau Kekuningan (#28A745) sebagai aksi sukses.
- Tipografi: 
    - Judul: **Poppins Bold** (Google Font) – modern dan ramah.
    - Teks tubuh: **Open Sans Regular** – mudah dibaca untuk formulir dan tabel lengkap.
    - Cadangkan ke font sistem (`-apple-system`, `BlinkSystemFont`, `sans-serif`) jika Google Font tidak tersedia.
- Layout: gunakan template Mazer sebagai dasar; pastikan sidebar navigasi dapat disembunyikan/menampilkan sesuai lebar layar.
- Header: tampilkan logo sekolah di sisi kiri, avatar dan notifikasi di sisi kanan.
- Formulir: gunakan elemen Bootstrap 5 dengan styling kustom:
    - Input: border‑radius 4px, fokus dengan outline biru tua.
    - Tombol: latar biru tua, teks putih; hover → sedikit lebih terang; disabled → abu‑abu tua.
    - Pesan sukses: gunakan accent hijau dengan ikon centang.
- Tabel: gunakan paginasi sisi server melalui Inertia; tampilkan nomor baris, tombol aksi (Edit, Hapus) pada kolom terakhir; gunakan hover‑highlight dan baris bergantian.
- Modal: tengah layar dengan overlay transparan; header biru tua, konten putih.
- Navigasi: tautan aktif ditandai dengan batang kiri tebal biru tua (4px).
- Dasbor: gunakan kartu dengan ikon untuk menampilkan ringkasan (misalnya total siswa, total pembayaran bulan ini); tambahkan sparkline atau progress bar jika relevan.
- Responsivitas: pastikan menu sidenav berubah menjadi hamburger pada lebar < 768px; tabel dapat discrol secara horizontal.
- Aksesibilitas (WCAG 2.1 AA):
    - Setiap input formulir harus memiliki elemen `<label>` yang terkait.
    - Kontras warna minimal 4.5:1 untuk teks normal, 3:1 untuk teks besar.
    - Pastikan navigasi logis melalui keyboard; jangan memaksa fokus terperangkap.
    - Berikan label ARIA pada komponen kustom (modal, dll.).
- Mikro‑interaksi:
    - Hover tombol: skala ringan (1.02) dan bayangan yang lebih kuat.
    - Fokus input: efek bersinar menggunakan `box‑shadow`.
    - Klik baris tabel (untuk baris yang dapat dipilih): ubah latar menjadi biru tua sangat terang.
    - Notifikasi toast: muncul dari atas‑kanan, hilang otomatis setelah 5 detik.
- Khusus PWA:
    - Buat halaman offline sederhana (`offline.html`) yang menampilkan pesan ramah dan tombol untuk mencoba lagi.
    - Manifes: nama “Sekolahku Perpustakaan”, nama singkat “Perpustakaan”, ikon ukuran 192px dan 512px (gunakan logo sekolah).
    - Warna tema: biru tua (#003366), latar belakang: putih.
    - Saat offline, service worker harus menyimpan aset inti (CSS, JS, gambar cadangan) dan menampilkan halaman offline untuk semua permintaan navigasi.
- Langkah Implementasi:
    1. Jalankan `pnpm install` jika belum dilakukan.
    2. Pastikan `resources/js/app.js` (atau `.jsx`) melakukan bootstrapping Inertia, React, dan Zustand.
    3. Impor Font Google di `resources/css/app.css` atau melalui tag `<link>` dalam tata letak utama.
    4. Integrasi tata letak: salin file tata letak dasar Mazer ke `resources/views/layouts/app.blade.php` (atau setara dengan Blade) dan ganti konten statis dengan `@yield('content')` yang dibungkus oleh wadah Inertia.
    5. Sesuaikan item menu sidenap sesuai dengan modul: Dashboard, Siswa, PPDB, SPP, Perpustakaan, Alumni, Laporan, Pengguna, Pengaturan.
    6. Opsional: buat komponen penggunaan umum di `resources/js/components` (mis. `BaseButton.vue`, `BaseInput.vue`, `SelectDropdown.vue`, `DataTable.vue`) dan gunakan konsisten di semua halaman.
    7. Bangun atau perbarui halaman berikut sesuai dengan prioritas PRD:
        - Dasbor: kartu ringkasan dan tautan cepat.
        - PPDB: daftar calon dengan filter (status, tanggal); tampilan detail dengan tombol “Terima”.
        - SPP–SPP: daftar tagihan, formulir pembayaran, manajemen dispensasi.
        - Perpustakaan: katalog buku, formulir peminjaman, QR‑code anggota.
        - Alumni: direktori, profil, formulir donasi, forum thread.
        - Website: daftar berita & detail, galeri prestasi.
        - Pengaturan: profil pengguna, toggle preferensi.
    8. Uji secara manual pada desktop (Chrome/Firefox) dan mobile (Chrome Android, Safari iOS).
    9. Jalankan audit aksesibilitas dengan Lighthouse; skor ≥ 90%.
    10. Verifikasi PWA bekerja offline: aktifkan mode pesawat, reload, pastikan aset inti tetap termuat dan halaman offline muncul saat mencoba membuka halaman lain.
    11. Pertimbangkan deployment: setelah `pnpm run prod`, commit folder `public/assets` atau pastikan pipeline build menangani itu.
    12. Bersihkan OpCache jika perlu setelah perubahan PHP.

## Kolaborasi & Review
- Saat membuat cabang fitur, awali dengan nama `feature/` (mis. `feature/ppdb-auto-sync`).
- Buka Pull Request yang meliputi:
    - Ringkasan singkat yang merujuk ke bagian PRD yang relevan.
    - Cuplik layar atau GIF dari perubahan UI (jika berlaku).
    - Migrasi baru, seeder, dan tes.
- Mintalah review dari satu lagi anggota tim (idealnya satu backend dan satu frontend) sebelum menggabung.
- Pastikan pipeline CI menjalankan uji‑unit (phpunit), uji frontend (npm test), dan linter, lalu lolos.

## Referensi
- Dokumentasi Laravel: https://laravel.com/docs
- Panduan Inertia.js + React: https://inertiajs.com/
- Template Admin Mazer (Bootstrap 5): https://github.com/zuramai/mazer
- Dokumentasi Bootstrap 5: https://getbootstrap.com/docs/5.3/getting-started/introduction/
- Google Fonts – Poppins & Open Sans: https://fonts.google.com/
- Dasar PWA: https://web.dev/progressive-web-apps/