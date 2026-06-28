<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemsSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            // Dashboard
            [
                'label' => 'Dashboard',
                'icon' => 'layout-dashboard',
                'route' => 'home',
                'order' => 1,
                'children' => [],
            ],
            // PPDB & Kesiswaan
            [
                'label' => 'PPDB & Kesiswaan',
                'icon' => 'users',
                'route' => null,
                'order' => 2,
                'children' => [
                    ['label' => 'PPDB (Calon Siswa)', 'icon' => 'user-plus', 'route' => 'admin-calon-siswa.index', 'permission' => 'Admin'],
                    ['label' => 'Data Siswa', 'icon' => 'graduation-cap', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Dispensasi', 'icon' => 'percent', 'route' => 'backend-dispensasi.index', 'permission' => 'Admin'],
                ],
            ],
            // SPP & Keuangan
            [
                'label' => 'SPP & Keuangan',
                'icon' => 'wallet',
                'route' => null,
                'order' => 3,
                'children' => [
                    ['label' => 'Pembayaran SPP', 'icon' => 'credit-card', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Laporan Keuangan', 'icon' => 'file-text', 'route' => '#', 'permission' => 'Admin'],
                ],
            ],
            // Perpustakaan
            [
                'label' => 'Perpustakaan',
                'icon' => 'book-open',
                'route' => null,
                'order' => 4,
                'children' => [
                    ['label' => 'Buku', 'icon' => 'book', 'route' => '#', 'permission' => 'Perpustakaan'],
                    ['label' => 'Peminjaman', 'icon' => 'clipboard-list', 'route' => '#', 'permission' => 'Perpustakaan'],
                    ['label' => 'Anggota', 'icon' => 'user-check', 'route' => '#', 'permission' => 'Perpustakaan'],
                ],
            ],
            // Alumni
            [
                'label' => 'Alumni',
                'icon' => 'graduation-cap',
                'route' => null,
                'order' => 5,
                'children' => [
                    ['label' => 'Data Alumni', 'icon' => 'users', 'route' => 'alumni.index', 'permission' => 'Admin'],
                    ['label' => 'Tracer Study', 'icon' => 'clipboard', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Donasi', 'icon' => 'heart', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Forum', 'icon' => 'comment', 'route' => '#', 'permission' => 'Admin'],
                ],
            ],
            // SPMB 2026
            [
                'label' => 'SPMB 2026',
                'icon' => 'school',
                'route' => null,
                'order' => 6,
                'children' => [
                    ['label' => 'Konfigurasi', 'icon' => 'sliders', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Jalur Afirmasi', 'icon' => 'user-check', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Jalur Prestasi', 'icon' => 'trophy', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Tes Kompetensi Akademik (TKA)', 'icon' => 'brush', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Ranking & Seleksi', 'icon' => 'list-ol', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Pengumuman', 'icon' => 'bell', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Pendaftaran (Public)', 'icon' => 'file-plus', 'route' => '#', 'permission' => null],
                    ['label' => 'Cek Status (Public)', 'icon' => 'search', 'route' => '#', 'permission' => null],
                    ['label' => 'Hasil Seleksi (Public)', 'icon' => 'check-circle', 'route' => '#', 'permission' => null],
                ],
            ],
            // Website / Konten
            [
                'label' => 'Website / Konten',
                'icon' => 'globe',
                'route' => null,
                'order' => 7,
                'children' => [
                    ['label' => 'Berita', 'icon' => 'newspaper', 'route' => 'backend-berita.index', 'permission' => 'Admin'],
                    ['label' => 'Event', 'icon' => 'calendar', 'route' => 'backend-event.index', 'permission' => 'Admin'],
                    ['label' => 'Program Studi', 'icon' => 'book', 'route' => 'program-studi.index', 'permission' => 'Admin'],
                    ['label' => 'Kegiatan', 'icon' => 'activity', 'route' => 'backend-kegiatan.index', 'permission' => 'Admin'],
                    ['label' => 'Profile Sekolah', 'icon' => 'building', 'route' => 'backend-profile-sekolah.index', 'permission' => 'Admin'],
                    ['label' => 'Visi & Misi', 'icon' => 'target', 'route' => 'backend-visimisi.index', 'permission' => 'Admin'],
                    ['label' => 'Image Slider', 'icon' => 'image', 'route' => 'backend-imageslider.index', 'permission' => 'Admin'],
                    ['label' => 'Footer', 'icon' => 'layout', 'route' => 'backend-footer.index', 'permission' => 'Admin'],
                ],
            ],
            // Pengguna
            [
                'label' => 'Pengguna',
                'icon' => 'user-cog',
                'route' => null,
                'order' => 8,
                'children' => [
                    ['label' => 'Pengajar', 'icon' => 'chalkboard-teacher', 'route' => 'backend-pengguna-pengajar.index', 'permission' => 'Admin'],
                    ['label' => 'Staf', 'icon' => 'briefcase', 'route' => 'backend-pengguna-staf.index', 'permission' => 'Admin'],
                    ['label' => 'Murid', 'icon' => 'user-graduate', 'route' => 'backend-pengguna-murid.index', 'permission' => 'Admin'],
                    ['label' => 'PPDB', 'icon' => 'user-plus', 'route' => 'backend-pengguna-ppdb.index', 'permission' => 'Admin'],
                    ['label' => 'Perpustakaan', 'icon' => 'bookmark', 'route' => 'backend-pengguna-perpus.index', 'permission' => 'Admin'],
                    ['label' => 'Bendahara', 'icon' => 'dollar-sign', 'route' => 'backend-pengguna-bendahara.index', 'permission' => 'Admin'],
                ],
            ],
            // Pengaturan
            [
                'label' => 'Pengaturan',
                'icon' => 'settings',
                'route' => null,
                'order' => 9,
                'children' => [
                    ['label' => 'Profile Saya', 'icon' => 'user', 'route' => 'profile-settings.index', 'permission' => null],
                    ['label' => 'Pengaturan', 'icon' => 'sliders', 'route' => 'settings', 'permission' => 'Admin'],
                ],
            ],
            // Laporan
            [
                'label' => 'Laporan',
                'icon' => 'file-bar-chart',
                'route' => null,
                'order' => 10,
                'children' => [
                    ['label' => 'Keuangan', 'icon' => 'trending-up', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'e-Rapor Kemendikdasmen', 'icon' => 'file-text', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'SPMB 2026', 'icon' => 'school', 'route' => '#', 'permission' => 'Admin'],
                ],
            ],
            // e-Rapor Kemendikdasmen
            [
                'label' => 'e-Rapor Kemendikdasmen',
                'icon' => 'file-text',
                'route' => null,
                'order' => 11,
                'children' => [
                    ['label' => 'Sinkronisasi Data Dapodik', 'icon' => 'sync', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Input Nilai', 'icon' => 'edit', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Input P5', 'icon' => 'edit', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Tujuan Pembelajaran', 'icon' => 'book-open', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Export Template Excel', 'icon' => 'file-excel', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Import Nilai Excel', 'icon' => 'file-import', 'route' => '#', 'permission' => 'Admin'],
                    ['label' => 'Generate PDF Rapor', 'icon' => 'file-pdf', 'route' => '#', 'permission' => 'Admin'],
                ],
            ],
        ];

        foreach ($groups as $group) {
            $children = $group['children'] ?? [];
            unset($group['children']);

            $parent = MenuItem::create($group);

            foreach ($children as $child) {
                $child['parent_id'] = $parent->id;
                MenuItem::create($child);
            }
        }
    }
}