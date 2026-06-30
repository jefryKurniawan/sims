<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Events;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Snippet pendek untuk kolom `content` (varchar 255),
        // deskripsi lengkap masuk ke `full_content` (text).
        $events = [
            [
                'title' => 'Open House Sekolah & Expo Jurusan 2026',
                'slug' => 'open-house-sekolah-expo-jurusan-2026',
                'content' => 'Kunjungan terbuka ke seluruh fasilitas sekolah, ruang kelas, dan program jurusan.',
                'full_content' => '<p>Selamat datang di acara Open House Sekolah tahun ini! Kami membuka seluruh fasilitas dan ruang kelas untuk umum</p><p>Peserta akan diajak mengikuti tur ke berbagai jurusan: IPA, IPS, dan Program Kejuruan. Ada juga sesi tanya jawab langsung dengan kepala sekolah, guru mata pelajaran, serta perwakilan OSIS</p><p>Jangan lewatkan kesempatan untuk mengenal lebih dekat lingkungan belajar dan fasilitas modern kami. Pendaftaran gratis dan terbuka untuk umum 😊</p>',
                'desc' => 'Kunjungan terbuka ke seluruh fasilitas sekolah, ruang kelas, dan jurusan dengan tur keliling dan sesi tanya jawab bersama kepala sekolah.',
                'thumbnail' => 'open-house-2026.jpg',
                'acara' => '2026-03-15 08:00:00',
                'lokasi' => 'Aula Utama SMAS St. Bonaventura',
                'is_active' => 1,
            ],
            [
                'title' => 'Seminar Nasional Pendidikan Karakter',
                'slug' => 'seminar-nasional-pendidikan-karakter',
                'content' => 'Seminar nasional dengan pembicara ahli tentang pembentukan karakter generasi muda.',
                'full_content' => '<p>Seminar ini menghadirkan para ahli pendidikan nasional untuk membahas strategi pembentukan karakter generasi muda</p><p>Topik utama meliputi: penguatan nilai-nilai Pancasila di era digital, manajemen emosi, serta kolaborasi sekolah dengan orang tua dalam pembentukan karakter siswa</p><p>Peserta akan menerima sertifikat nasional. Kuota terbatas, daftar segera</p>',
                'desc' => 'Seminar nasional dengan pembicara ahli tentang pembentukan karakter, nilai Pancasila, dan kolaborasi sekolah-ortu dalam era digital.',
                'thumbnail' => 'seminar-pendidikan-karakter.jpg',
                'acara' => '2026-04-20 09:00:00',
                'lokasi' => 'Auditorium SMAS St. Bonaventura',
                'is_active' => 1,
            ],
            [
                'title' => 'Festival Seni Budaya Sekolah',
                'slug' => 'festival-seni-budaya-sekolah',
                'content' => 'Pertunjukan seni siswa: tari tradisional, musik, teater, lukis, dan fashion show.',
                'full_content' => '<p>Festival tahunan yang menampilkan bakat seni siswa dalam berbagai kategori: tari tradisional, musik, teater, lukis, fotografi, dan fashion show</p><p>Setiap kelas berkompetisi dalam masing-masing kategori untuk memperebutkan tropi juara umum</p><p>Acara ini juga mengundang seniman lokal untuk memberikan workshop singkat kepada siswa. Ayo rayakan keberagaman budaya Indonesia bersama kami</p>',
                'desc' => 'Pertunjukan seni siswa: tari tradisional, musik, teater, lukis, dan fashion show dengan workshop dari seniman lokal.',
                'thumbnail' => 'festival-seni-budaya.jpg',
                'acara' => '2026-05-10 13:00:00',
                'lokasi' => 'Lapangan Sekolah & Aula Utama',
                'is_active' => 1,
            ],
            [
                'title' => 'Workshop Pengembangan Karir & Alumni Sharing',
                'slug' => 'workshop-pengembangan-karir-alumni-sharing',
                'content' => 'Talkshow alumni, simulasi wawancara kerja, CV Clinic, dan bimbingan memilih jurusan.',
                'full_content' => '<p>Workshop ini dimulai dengan talkshow dari alumni sukses yang sudah berkarir di berbagai bidang: kedokteran, teknik, bisnis, dan seni</p><p>Mereka akan berbagi pengalaman dan tips memilih jalur kuliah serta karir</p><p>Dilanjutkan dengan sesi simulasi wawancara kerja, CV Clinic, dan bimbingan memilih jurusan kuliah sesuai minat dan bakat</p>',
                'desc' => 'Talkshow alumni, simulasi wawancara kerja, CV Clinic, dan bimbingan memilih jurusan dengan pembicara alumni sukses.',
                'thumbnail' => 'workshop-karir-alumni.jpg',
                'acara' => '2026-06-05 10:00:00',
                'lokasi' => 'Ruang Seminar SMAS',
                'is_active' => 1,
            ],
            [
                'title' => 'Olimpiade Sains & MIPA Challenge',
                'slug' => 'olimpiade-sains-mipa-challenge',
                'content' => 'Kompetisi sains antar sekolah: Matematika, Fisika, Kimia, Biologi. Beasiswa untuk pemenang.',
                'full_content' => '<p>Kompetisi sains tahunan yang melibatkan siswa dari berbagai sekolah se-Kabupaten</p><p>Cabang lomba meliputi: Matematika, Fisika, Kimia, dan Biologi. Setiap peserta mengikuti babak penyisihan berbasis online, dilanjutkan babak final di lokasi kami</p><p>Pemenang akan mendapatkan beasiswa pendidikan dan sertifikat prestasi nasional. Siapkan dirimu jadi juara</p>',
                'desc' => 'Kompetisi sains antar sekolah: Matematika, Fisika, Kimia, Biologi. Beasiswa dan sertifikat nasional untuk pemenang.',
                'thumbnail' => 'olimpiade-sains-mipa.jpg',
                'acara' => '2026-07-18 08:00:00',
                'lokasi' => 'Gedung Sains & Laboratorium',
                'is_active' => 1,
            ],
        ];

        foreach ($events as $event) {
            Events::create($event);
        }
    }
}
