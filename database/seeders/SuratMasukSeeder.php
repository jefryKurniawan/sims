<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SuratMasuk;
use App\Models\User;

class SuratMasukSeeder extends Seeder
{
    public function run(): void
    {
        if (SuratMasuk::count() > 0) {
            $this->command->info('SuratMasuk already seeded, skipping.');
            return;
        }

        $users = User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['Admin', 'TU', 'Staf']);
        })->pluck('id')->toArray();

        if (empty($users)) {
            $this->command->warn('No users with Admin/TU/Staf roles found. Using user ID 1.');
            $users = [1];
        }

        $tuUser = $users[0];

        $data = [
            [
                'no_agenda' => 1,
                'tanggal_terima' => '2024-07-01',
                'no_surat' => '001/DPd/VII/2024',
                'tanggal_surat' => '2024-06-28',
                'asal_surat' => 'Dinas Pendidikan Kota Bandung',
                'perihal' => 'Surat Edaran Pelaksanaan Ujian Nasional Berbasis Komputer (UNBK) TA 2024/2025',
                'ringkasan' => 'Surat edaran pelaksanaan UNBK untuk SMA/SMK/MA: jadwal ujian 15-18 April 2025, persiapan infrastruktur TIK minimal 1 komputer per 2 siswa, simulasi UNBK wajib dilaksanakan minimal 2 kali sebelum ujian sesungguhnya.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Koordinasi dengan Kepala Lab Komputer dan Wakil Kepala Kurikulum untuk persiapan infrastruktur dan jadwal simulasi.',
                'disposisi_batas_waktu' => '2024-07-15',
                'status' => 'diproses',
                'status_disposisi' => 'dibaca',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 2,
                'tanggal_terima' => '2024-07-02',
                'no_surat' => '002/KP/VII/2024',
                'tanggal_surat' => '2024-06-30',
                'asal_surat' => 'Kantor Polisi Sektor Cicendo',
                'perihal' => 'Permohonan Data Siswa untuk Investigasi Kasus Kenakalan Remaja',
                'ringkasan' => 'Permohonan data identitas 3 siswa (nama, kelas, alamat, no HP orang tua) terkait investigasi kasus kenakalan remaja yang terjadi di lingkungan sekolah. Data diperlukan untuk proses hukum.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Koordinasi dengan BK dan Wakil Kepala Kesiswaan. Berikan data sesuai prosedur dan catat dalam buku agenda.',
                'disposisi_batas_waktu' => '2024-07-05',
                'status' => 'selesai',
                'status_disposisi' => 'dibalas',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 3,
                'tanggal_terima' => '2024-07-03',
                'no_surat' => '003/UNIV/VII/2024',
                'tanggal_surat' => '2024-07-01',
                'asal_surat' => 'Universitas Pendidikan Indonesia (UPI)',
                'perihal' => 'Undangan Lomba Karya Tulis Ilmiah (LKTI) Tingkat Nasional Bagi Peserta Didik SMA/SMK',
                'ringkasan' => 'Undangan lomba Karya Tulis Ilmiah (LKTI) témakan "Inovasi Pembelajaran di Era Society 5.0". Pendaftaran 1-31 Juli 2024. Hadiah total 50 juta. Maksimal 2 tim per sekolah (3 orang/tim).',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Sebarkan info ke guru BK dan guru Matematika/IPA. Bantu pendaftaran siswa berprestasi akademik.',
                'disposisi_batas_waktu' => '2024-07-20',
                'status' => 'diproses',
                'status_disposisi' => 'dibaca',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 4,
                'tanggal_terima' => '2024-07-04',
                'no_surat' => '004/BANK/VII/2024',
                'tanggal_surat' => '2024-07-02',
                'asal_surat' => 'Bank BPD Jawa Barat Cabang Bandung',
                'perihal' => 'Penawaran Program Simulasi Tabungan dan Edukasi Keuangan untuk Siswa',
                'ringkasan' => 'Penawaran program "Simulasi Tabungan Siswa" dan edukasi literasi keuangan gratis untuk siswa SMA. Program 3 hari: simulasi tabungan, workshop finansial, dan kunjungan bank. Gratis biaya, bank menyediakan fasilitator.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Evaluasi kelayakan program. Koordinasi dengan BK dan OSIS untuk jadwal pelaksanaan.',
                'disposisi_batas_waktu' => '2024-07-18',
                'status' => 'baru',
                'status_disposisi' => 'belum',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 5,
                'tanggal_terima' => '2024-07-05',
                'no_surat' => '005/DINKES/VII/2024',
                'tanggal_surat' => '2024-07-03',
                'asal_surat' => 'Dinas Kesehatan Kota Bandung',
                'perihal' => 'Pelaksanaan Imunisasi MR (Measles Rubella) Bagi Peserta Didik SMA',
                'ringkasan' => 'Imunisasi MR tahap 2 bagi siswa kelas X yang belum mendapat imunisasi lengkap. Pelaksanaan tanggal 20 Juli 2024 pukul 08:00-12:00 di ruang UKS. Mempersiapkan ruang, meja, dan tenaga pendamping dari sekolah.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Koordinasi UKS dan BK. Siapkan ruang UKS, daftar siswa target, dan surat izin orang tua. Pastikan 100% tercapai.',
                'disposisi_batas_waktu' => '2024-07-15',
                'status' => 'diproses',
                'status_disposisi' => 'dibaca',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 6,
                'tanggal_terima' => '2024-07-08',
                'no_surat' => '006/KOMITE/VII/2024',
                'tanggal_surat' => '2024-07-05',
                'asal_surat' => 'Komite Sekolah SMA Negeri 1 Model',
                'perihal' => 'Laporan Hasil Rapat Komite Sekolah Triwulan II TA 2024/2025',
                'ringkasan' => 'Hasil rapat komite: 1) Persetujuan APBS revisi semester genap, 2) Rencana kegiatan OSIS & PMR, 3) Evaluasi kebijakan baru sekolah mengenai seragam, 4) Rencana bantuan sarana prasarana dari komite.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Arsipkan laporan. Tindak lanjuti keputusan APBS revisi ke bendahara sekolah.',
                'disposisi_batas_waktu' => '2024-07-15',
                'status' => 'arsip',
                'status_disposisi' => 'dibalas',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 7,
                'tanggal_terima' => '2024-07-09',
                'no_surat' => '007/YAYASAN/VII/2024',
                'tanggal_surat' => '2024-07-07',
                'asal_surat' => 'Yayasan Pendidikan Bina Bangsa',
                'perihal' => 'Surat Keputusan Penunjukan Pengurus Yayasan Periode 2024-2029',
                'ringkasan' => 'SK pengurus yayasan baru: Ketua Umum Dr. H. Sutrisno, M.Pd; Sekretaris Dra. Siti Aminah; Bendahara Drs. Bambang Widodo. Berlaku 5 tahun. Menggantikan pengurus periode sebelumnya.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Arsipkan. Update data kontak yayasan di sistem administrasi.',
                'disposisi_batas_waktu' => '2024-07-15',
                'status' => 'arsip',
                'status_disposisi' => 'dibalas',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 8,
                'tanggal_terima' => '2024-07-10',
                'no_surat' => '008/ORANG_TUA/VII/2024',
                'tanggal_surat' => '2024-07-08',
                'asal_surat' => 'Orang Tua Siswa: Bapak Andi Susanto (Wali Kelas X MIPA 2)',
                'perihal' => 'Pengaduan Pelanggaran Disiplin Siswa di Lingkungan Sekolah',
                'ringkasan' => 'Pengaduan dari orang tua terkait adanya pelecehan verbal (bullying) terhadap anaknya oleh 2 siswa kelas XI IPS 1. Mohon ditindaklanjuti sesuai peraturan sekolah dan dikabarkan perkembangannya.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'SEGERA: Serahkan ke BK dan Wakil Kepala Kesiswaan. Panggil pelaku & korban. Proses sesuai SOP pelanggaran berat. Laporkan hasil ke orang tua pengadu.',
                'disposisi_batas_waktu' => '2024-07-12',
                'status' => 'diproses',
                'status_disposisi' => 'dibaca',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 9,
                'tanggal_terima' => '2024-07-11',
                'no_surat' => '009/INDUSTRI/VII/2024',
                'tanggal_surat' => '2024-07-09',
                'asal_surat' => 'PT. Telkom Indonesia (Persero) Tbk - Divisi Regional III Jawa Barat',
                'perihal' => 'Program Magang (PKL) dan Kunjungan Industri bagi Siswa Jurusan TKJ',
                'ringkasan' => 'Program magang PKL 3 bulan (Agustus-Oktober 2024) untuk 10 siswa TKJ kelas XI/XII di Telkom Bandung. Bidang: jaringan fiber optik, maintenance perangkat, dan customer service. Sertifikat resmi dari Telkom.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Koordinasi dengan guru TKJ dan BK. Seleksi 10 siswa terbaik. Proses surat rekomendasi dan MOU.',
                'disposisi_batas_waktu' => '2024-07-25',
                'status' => 'baru',
                'status_disposisi' => 'belum',
                'created_by' => $tuUser,
            ],
            [
                'no_agenda' => 10,
                'tanggal_terima' => '2024-07-12',
                'no_surat' => '010/DIKJAR/VII/2024',
                'tanggal_surat' => '2024-07-10',
                'asal_surat' => 'Balai Diklat Keagamaan Bandung',
                'perihal' => 'Undangan Pelatihan Guru PAI: Penguatan Literasi Al-Qur\'an di Sekolah',
                'ringkasan' => 'Pelatihan 3 hari (23-25 Juli 2024) untuk guru PAI se-Kota Bandung. Materi: metodologi tahfidz, pendekatan contextual, dan asesmen hafalan. Biaya gratis, sertifikat 32 JP. Kuota 2 orang/sekolah.',
                'file_scan' => null,
                'disposisi_kepada' => $tuUser,
                'disposisi_instruksi' => 'Kirim 2 guru PAI (pakai prioritas yang belum pernah ikut pelatihan serupa). Proses izin cutter.',
                'disposisi_batas_waktu' => '2024-07-18',
                'status' => 'diproses',
                'status_disposisi' => 'dibaca',
                'created_by' => $tuUser,
            ],
        ];

        foreach ($data as $item) {
            SuratMasuk::create($item);
        }

        $this->command->info('Created ' . count($data) . ' Surat Masuk records with realistic school correspondence.');
    }
}
