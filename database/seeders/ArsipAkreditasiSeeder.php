<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ArsipAkreditasi;
use App\Models\User;

class ArsipAkreditasiSeeder extends Seeder
{
    public function run(): void
    {
        if (ArsipAkreditasi::count() > 0) {
            $this->command->info('ArsipAkreditasi already seeded, skipping.');
            return;
        }

        $users = User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['Admin', 'Staf', 'TU']);
        })->pluck('id')->toArray();

        if (empty($users)) {
            $this->command->warn('No users with Admin/Staf/TU roles found. Skipping seeder.');
            return;
        }

        $tahunAjaran = '2024/2025';
        $penanggungJawab = fake()->randomElement($users);

        $dokumen = [
            // Standar 1: Visi, Misi, Tujuan, Sasaran dan Strategi
            ['standar' => 1, 'sub_standar' => '1.1', 'butir' => '1.1.1', 'nama_dokumen' => 'Dokumen Visi, Misi, Tujuan, Sasaran dan Strategi Sekolah', 'status' => 'lengkap'],
            ['standar' => 1, 'sub_standar' => '1.1', 'butir' => '1.1.2', 'nama_dokumen' => 'Surat Keputusan Penetapan Visi Misi Sekolah', 'status' => 'lengkap'],
            ['standar' => 1, 'sub_standar' => '1.2', 'butir' => '1.2.1', 'nama_dokumen' => 'Rencana Strategis Sekolah (Renstra) 5 Tahun', 'status' => 'lengkap'],
            ['standar' => 1, 'sub_standar' => '1.2', 'butir' => '1.2.2', 'nama_dokumen' => 'Rencana Kerja Sekolah (RKS) Tahunan', 'status' => 'lengkap'],
            ['standar' => 1, 'sub_standar' => '1.3', 'butir' => '1.3.1', 'nama_dokumen' => 'Evaluasi Capaian Visi Misi Sekolah', 'status' => 'belum'],

            // Standar 2: Tata Kelola Sekolah
            ['standar' => 2, 'sub_standar' => '2.1', 'butir' => '2.1.1', 'nama_dokumen' => 'Struktur Organisasi Sekolah', 'status' => 'lengkap'],
            ['standar' => 2, 'sub_standar' => '2.1', 'butir' => '2.1.2', 'nama_dokumen' => 'Tugas dan Fungsi Setiap Unit Organisasi', 'status' => 'lengkap'],
            ['standar' => 2, 'sub_standar' => '2.2', 'butir' => '2.2.1', 'nama_dokumen' => 'Peraturan Sekolah (Pedoman Sekolah)', 'status' => 'lengkap'],
            ['standar' => 2, 'sub_standar' => '2.2', 'butir' => '2.2.2', 'nama_dokumen' => 'Kode Etik Sekolah', 'status' => 'belum'],
            ['standar' => 2, 'sub_standar' => '2.3', 'butir' => '2.3.1', 'nama_dokumen' => 'Laporan Akuntabilitas Kinerja Sekolah (LAKIP)', 'status' => 'lengkap'],
            ['standar' => 2, 'sub_standar' => '2.3', 'butir' => '2.3.2', 'nama_dokumen' => 'Surat Keputusan Rapat Koordinasi Rutin', 'status' => 'belum'],

            // Standar 3: Kurikulum
            ['standar' => 3, 'sub_standar' => '3.1', 'butir' => '3.1.1', 'nama_dokumen' => 'Dokumen Kurikulum Sekolah (KTSP/Kurikulum Merdeka)', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.1', 'butir' => '3.1.2', 'nama_dokumen' => 'Kalender Pendidikan', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.1', 'butir' => '3.1.3', 'nama_dokumen' => 'Jadwal Pelajaran Semester Ganjil', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.1', 'butir' => '3.1.4', 'nama_dokumen' => 'Jadwal Pelajaran Semester Genap', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.2', 'butir' => '3.2.1', 'nama_dokumen' => 'Silabus Semua Mata Pelajaran', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.2', 'butir' => '3.2.2', 'nama_dokumen' => 'RPP Semua Mata Pelajaran', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.3', 'butir' => '3.3.1', 'nama_dokumen' => 'Bahan Ajar/Pembelajaran', 'status' => 'belum'],
            ['standar' => 3, 'sub_standar' => '3.4', 'butir' => '3.4.1', 'nama_dokumen' => 'Penilaian Hasil Belajar', 'status' => 'lengkap'],
            ['standar' => 3, 'sub_standar' => '3.4', 'butir' => '3.4.2', 'nama_dokumen' => 'Laporan Hasil Belajar Peserta Didik', 'status' => 'lengkap'],

            // Standar 4: Kependidikan
            ['standar' => 4, 'sub_standar' => '4.1', 'butir' => '4.1.1', 'nama_dokumen' => 'Data Kependudukan Peserta Didik', 'status' => 'lengkap'],
            ['standar' => 4, 'sub_standar' => '4.1', 'butir' => '4.1.2', 'nama_dokumen' => 'Buku Induk Siswa', 'status' => 'lengkap'],
            ['standar' => 4, 'sub_standar' => '4.2', 'butir' => '4.2.1', 'nama_dokumen' => 'Data Kependudukan Guru dan Tenaga Kependidikan', 'status' => 'lengkap'],
            ['standar' => 4, 'sub_standar' => '4.2', 'butir' => '4.2.2', 'nama_dokumen' => 'Buku Induk Guru/Tendik', 'status' => 'lengkap'],
            ['standar' => 4, 'sub_standar' => '4.3', 'butir' => '4.3.1', 'nama_dokumen' => 'Rekapitulasi Kehadiran Peserta Didik', 'status' => 'lengkap'],
            ['standar' => 4, 'sub_standar' => '4.3', 'butir' => '4.3.2', 'nama_dokumen' => 'Rekapitulasi Kehadiran Guru/Tendik', 'status' => 'lengkap'],

            // Standar 5: Sarana dan Prasarana
            ['standar' => 5, 'sub_standar' => '5.1', 'butir' => '5.1.1', 'nama_dokumen' => 'Inventaris Sarana Prasarana Sekolah', 'status' => 'lengkap'],
            ['standar' => 5, 'sub_standar' => '5.1', 'butir' => '5.1.2', 'nama_dokumen' => 'Peta Lokasi dan Denah Sekolah', 'status' => 'lengkap'],
            ['standar' => 5, 'sub_standar' => '5.2', 'butir' => '5.2.1', 'nama_dokumen' => 'Daftar Ruang Kelas dan Fasilitasnya', 'status' => 'lengkap'],
            ['standar' => 5, 'sub_standar' => '5.2', 'butir' => '5.2.2', 'nama_dokumen' => 'Daftar Laboratorium dan Peralatan', 'status' => 'belum'],
            ['standar' => 5, 'sub_standar' => '5.3', 'butir' => '5.3.1', 'nama_dokumen' => 'Perpustakaan dan Koleksi Buku', 'status' => 'lengkap'],
            ['standar' => 5, 'sub_standar' => '5.3', 'butir' => '5.3.2', 'nama_dokumen' => 'Sarana Olahraga dan Kesenian', 'status' => 'belum'],
            ['standar' => 5, 'sub_standar' => '5.4', 'butir' => '5.4.1', 'nama_dokumen' => 'Pemeliharaan Sarana Prasarana', 'status' => 'lengkap'],
            ['standar' => 5, 'sub_standar' => '5.4', 'butir' => '5.4.2', 'nama_dokumen' => 'Asuransi Bangunan dan Aset Sekolah', 'status' => 'belum'],

            // Standar 6: Pembiayaan
            ['standar' => 6, 'sub_standar' => '6.1', 'butir' => '6.1.1', 'nama_dokumen' => 'Rencana Anggaran Biaya Sekolah (RABS)', 'status' => 'lengkap'],
            ['standar' => 6, 'sub_standar' => '6.1', 'butir' => '6.1.2', 'nama_dokumen' => 'Anggaran Pendapatan dan Belanja Sekolah (APBS)', 'status' => 'lengkap'],
            ['standar' => 6, 'sub_standar' => '6.2', 'butir' => '6.2.1', 'nama_dokumen' => 'Bukti Pembayaran SPP', 'status' => 'lengkap'],
            ['standar' => 6, 'sub_standar' => '6.2', 'butir' => '6.2.2', 'nama_dokumen' => 'Laporan Realisasi Anggaran', 'status' => 'belum'],
            ['standar' => 6, 'sub_standar' => '6.3', 'butir' => '6.3.1', 'nama_dokumen' => 'Laporan Keuangan Akhir Tahun', 'status' => 'lengkap'],
            ['standar' => 6, 'sub_standar' => '6.3', 'butir' => '6.3.2', 'nama_dokumen' => 'Hasil Audit Internal/BPS', 'status' => 'belum'],

            // Standar 7: Hubungan Masyarakat
            ['standar' => 7, 'sub_standar' => '7.1', 'butir' => '7.1.1', 'nama_dokumen' => 'Kepanitiaan Komite Sekolah', 'status' => 'lengkap'],
            ['standar' => 7, 'sub_standar' => '7.1', 'butir' => '7.1.2', 'nama_dokumen' => 'Program Kerja Komite Sekolah', 'status' => 'lengkap'],
            ['standar' => 7, 'sub_standar' => '7.2', 'butir' => '7.2.1', 'nama_dokumen' => 'Kemitraan dengan Dunia Usaha/Dunia Industri', 'status' => 'belum'],
            ['standar' => 7, 'sub_standar' => '7.2', 'butir' => '7.2.2', 'nama_dokumen' => 'Kemitraan dengan Perguruan Tinggi', 'status' => 'belum'],
            ['standar' => 7, 'sub_standar' => '7.3', 'butir' => '7.3.1', 'nama_dokumen' => 'Kegiatan Pengabdian Masyarakat', 'status' => 'belum'],

            // Standar 8: Output dan Hasil
            ['standar' => 8, 'sub_standar' => '8.1', 'butir' => '8.1.1', 'nama_dokumen' => 'Data Kelulusan Peserta Didik', 'status' => 'lengkap'],
            ['standar' => 8, 'sub_standar' => '8.1', 'butir' => '8.1.2', 'nama_dokumen' => 'Data Lanjut Studi Peserta Didik', 'status' => 'lengkap'],
            ['standar' => 8, 'sub_standar' => '8.2', 'butir' => '8.2.1', 'nama_dokumen' => 'Prestasi Akademik Peserta Didik', 'status' => 'lengkap'],
            ['standar' => 8, 'sub_standar' => '8.2', 'butir' => '8.2.2', 'nama_dokumen' => 'Prestasi Non-Akademik Peserta Didik', 'status' => 'lengkap'],
            ['standar' => 8, 'sub_standar' => '8.3', 'butir' => '8.3.1', 'nama_dokumen' => 'Tracer Study Alumni', 'status' => 'belum'],
            ['standar' => 8, 'sub_standar' => '8.3', 'butir' => '8.3.2', 'nama_dokumen' => 'Kepuasan Stakeholder (Orang Tua, Masyarakat)', 'status' => 'belum'],
        ];

        $created = 0;
        foreach ($dokumen as $doc) {
            ArsipAkreditasi::create([
                'standar' => $doc['standar'],
                'sub_standar' => $doc['sub_standar'],
                'butir' => $doc['butir'],
                'nama_dokumen' => $doc['nama_dokumen'],
                'file_path' => 'arsip-akreditasi/placeholder.pdf', // placeholder
                'tahun_ajaran' => $tahunAjaran,
                'status' => $doc['status'],
                'penanggung_jawab' => $penanggungJawab,
            ]);
            $created++;
        }

        $this->command->info("Created {$created} Arsip Akreditasi records for {$tahunAjaran}.");
    }
}
