<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SuratKeluar;
use App\Models\User;

class SuratKeluarSeeder extends Seeder
{
    public function run(): void
    {
        if (SuratKeluar::count() > 0) {
            $this->command->info('SuratKeluar already seeded, skipping.');
            return;
        }

        $users = User::whereHas('roles', function ($q) {
            $q->whereIn('name', ['Admin', 'TU', 'Staf']);
        })->pluck('id')->toArray();

        if (empty($users)) {
            $this->command->warn('No users with Admin/TU/Staf roles found. Using user ID 1.');
            $users = [1];
        }

        $data = [
            [
                'no_agenda' => 1,
                'tanggal_kirim' => '2024-07-01',
                'no_surat' => '420/001/TU/SK/VII/2024',
                'tujuan' => 'Dinas Pendidikan Kota Bandung',
                'perihal' => 'Laporan Realisasi Anggaran Sekolah Semester Ganjil TA 2024/2025',
                'ringkasan' => 'Laporan realisasi anggaran APBS semester ganjil: total anggaran Rp 2.150.000.000, realisasi Rp 1.890.000.000 (87,9%). Sisa dana dialokasikan untuk pembelian buku teks semester genap.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'terkirim',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 2,
                'tanggal_kirim' => '2024-07-03',
                'no_surat' => '420/002/TU/SK/VII/2024',
                'tujuan' => 'Kepala SMAN 5 Bandung',
                'perihal' => 'Permohonan Kerjasama Pertukaran Guru Bidang Mata Pelajaran Matematika',
                'ringkasan' => 'Mohon kerjasama pertukaran guru Matematika untuk program pengayaan siswa berprestasi dan olimpiade. Sekolah kami mengirimkan Bapak Sutrisno, S.Pd dan menerima Ibu Siti Rahayu, S.Pd untuk durasi 1 semester.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'terkirim',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 3,
                'tanggal_kirim' => '2024-07-05',
                'no_surat' => '420/003/TU/SK/VII/2024',
                'tujuan' => 'PT. Penerbit Erlangga - Cabang Bandung',
                'perihal' => 'Pengajuan Pemesanan Buku Teks Pelajaran Kurikulum Merdeka TA 2024/2025',
                'ringkasan' => 'Pemesanan buku teks pelajaran untuk seluruh kelas X, XI, XII sesuai Daftar Buku Teks Pelajaran yang ditetapkan Dinas Pendidikan. Total estimasi 450 eksemplar.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'draf',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 4,
                'tanggal_kirim' => '2024-07-08',
                'no_surat' => '420/004/TU/SK/VII/2024',
                'tujuan' => 'Kementerian Agama Kota Bandung',
                'perihal' => 'Laporan Kegiatan Keagamaan Sekolah (Pembinaan Rohaniah) Semester Ganjil',
                'ringkasan' => 'Laporan pelaksanaan kegiatan keagamaan: sholat berjamaah, tahfidz juz 30, kajian rutin, dan PHBI. Dilaksanakan oleh seluruh siswa Muslim di bawah bimbingan Ustadz sekolah.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'terkirim',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 5,
                'tanggal_kirim' => '2024-07-10',
                'no_surat' => '420/005/TU/SK/VII/2024',
                'tujuan' => 'Kepala Dinas Kesehatan Kota Bandung',
                'perihal' => 'Permohonan Tenaga Kesehatan untuk UKS (Upaya Kesehatan Sekolah)',
                'ringkasan' => 'Permohonan penempatan seorang bidan/perawat untuk mendampingi program UKS sekolah: pemeriksaan kesehatan rutin, imunisasi, dan penanganan kasus kecelakaan/penyakit tiba-tiba siswa.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'draf',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 6,
                'tanggal_kirim' => '2024-07-11',
                'no_surat' => '420/006/TU/SK/VII/2024',
                'tujuan' => 'Bank BRI Cabang Bandung Asia Afrika',
                'perihal' => 'Pembukaan Rekening Tabungan Siswa (Simpel) Bagi Peserta Didik Baru TA 2024/2025',
                'ringkasan' => 'Kerjasama pembukaan rekening Simpel BRI bagi 180 siswa baru kelas X. Diperlukan surat rekomendasi sekolah dan fotokopi KTP/KK orang tua serta akta kelahiran siswa.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'terkirim',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 7,
                'tanggal_kirim' => '2024-07-12',
                'no_surat' => '420/007/TU/SK/VII/2024',
                'tujuan' => 'Kepala SMKN 2 Bandung',
                'perihal' => 'Undangan Lomba Keterampilan Siswa (LKS) Tingkat Kota Bandung Bidang TKJ',
                'ringkasan' => 'Undangan mengirimkan 3 peserta didik kelas XI TKJ mewakili sekolah mengikuti LKS Tingkat Kota Bandung bidang Teknik Komputer Jaringan tanggal 20-21 Juli 2024.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'terkirim',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 8,
                'tanggal_kirim' => '2024-07-15',
                'no_surat' => '420/008/TU/SK/VII/2024',
                'tujuan' => 'Dinas Pendidikan Kota Bandung',
                'perihal' => 'Laporan Hasil Survei Kepuasan Masyarakat (SKM) Pelayanan Publik Sekolah',
                'ringkasan' => 'Hasil survei kepuasan masyarakat (orang tua, alumni, mitra) terhadap pelayanan administrasi, akademik, dan non-akademik sekolah. Skor rata-rata 4,2/5,0 (Sangat Puas).',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'arsip',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 9,
                'tanggal_kirim' => '2024-07-18',
                'no_surat' => '420/009/TU/SK/VII/2024',
                'tujuan' => 'Yayasan Pendidikan Islam Al-Hidayah',
                'perihal' => 'Permohonan Bantuan Dana Renovasi Laboratorium Komputer',
                'ringkasan' => 'Pengajuan dana bantuan sebesar Rp 150.000.000 untuk renovasi lab komputer: penggantian 30 unit PC, perbaikan AC, dan pembelian meja/kursi ergonomis. Mendukung pembelajaran TKJ dan Informatika.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'draf',
                'created_by' => $users[0],
            ],
            [
                'no_agenda' => 10,
                'tanggal_kirim' => '2024-07-22',
                'no_surat' => '420/010/TU/SK/VII/2024',
                'tujuan' => 'Kepala Polres Metro Bandung',
                'perihal' => 'Permohonan Keamanan Acara Ulangan Akhir Semester (UAS) dan Wisuda',
                'ringkasan' => 'Mohon bantuan personel keamanan untuk mengamankan pelaksanaan UAS tanggal 29-31 Juli 2024 dan Wisuda Kelas XII tanggal 5 Agustus 2024. Diperkirakan hadir 500+ orang tua/wali.',
                'file_scan' => null,
                'penandatangan' => 'Drs. H. Ahmad Yani, M.Pd',
                'status' => 'draf',
                'created_by' => $users[0],
            ],
        ];

        foreach ($data as $item) {
            SuratKeluar::create($item);
        }

        $this->command->info('Created ' . count($data) . ' Surat Keluar records with realistic school correspondence.');
    }
}
