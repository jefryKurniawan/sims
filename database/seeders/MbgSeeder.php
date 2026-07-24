<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use App\Models\Siswa;
use App\Models\Kelas;
use App\Models\SiswaKelas;
use App\Models\MbgSpecialCondition;
use App\Models\MbgMealMenu;
use App\Models\MbgConsent;
use App\Models\MbgStudentCondition;
use App\Models\MbgBast;
use App\Models\MbgOrganoleptik;
use App\Models\MbgAttendance;
use App\Models\MbgIncident;
use App\Models\MbgMeeting;
use App\Models\MbgGallery;

class MbgSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tambah Role PPH jika belum ada
        Role::firstOrCreate(['name' => 'PPH', 'guard_name' => 'web']);

        // 2. Seed kondisi khusus default
        $conditions = [
            ['nama' => 'Alergi Kacang Tanah', 'kategori' => 'lainnya', 'deskripsi' => 'Alergi terhadap kacang tanah dan produk turunannya'],
            ['nama' => 'Alergi Susu Sapi (Laktosa)', 'kategori' => 'intoleransi', 'deskripsi' => 'Intoleransi laktosa, tidak bisa minum susu sapi'],
            ['nama' => 'Alergi Telur', 'kategori' => 'lainnya', 'deskripsi' => 'Alergi terhadap putih/kuning telur'],
            ['nama' => 'Alergi Ikan', 'kategori' => 'lainnya', 'deskripsi' => 'Alergi terhadap ikan dan seafood'],
            ['nama' => 'Alergi Udang', 'kategori' => 'lainnya', 'deskripsi' => 'Alergi terhadap udang dan krustasea'],
            ['nama' => 'Alergi Gluten (Celiac)', 'kategori' => 'intoleransi', 'deskripsi' => 'Intoleransi gluten, tidak bisa mengonsumsi tepung terigu'],
            ['nama' => 'Vegetarian', 'kategori' => 'vegetarian', 'deskripsi' => 'Tidak mengonsumsi daging/ikan/hewani'],
            ['nama' => 'Vegan', 'kategori' => 'vegetarian', 'deskripsi' => 'Tidak mengonsumsi seluruh produk hewani'],
            ['nama' => 'Pantangan Daging Sapi', 'kategori' => 'pantangan', 'deskripsi' => 'Tidak mengonsumsi daging sapi karena alasan agama/kepercayaan'],
            ['nama' => 'Diabetes', 'kategori' => 'pantangan', 'deskripsi' => 'Pantangan gula berlebih'],
        ];

        foreach ($conditions as $cond) {
            MbgSpecialCondition::firstOrCreate(
                ['nama' => $cond['nama']],
                $cond
            );
        }

        // 3. Seed menu MBG (menu harian untuk ~30 hari ke belakang)
        $menuList = [
            'Nasi, Ayam Goreng, Sayur Sop, Pisang, Susu',
            'Nasi, Ikan Bumbu Kuning, Tumis Kangkung, Jeruk, Air Putih',
            'Nasi, Telur Balado, Sayur Bayam, Apel, Susu',
            'Nasi, Rendang Sapi, Urap Sayur, Pisang, Air Putih',
            'Nasi Goreng, Sosis Ayam, Lalapan, Semangka, Susu',
            'Nasi, Ayam Bakar, Sambal Goreng Kentang, Melon, Air Putih',
            'Nasi, Ikan Kembung Goreng, Sayur Asem, Pepaya, Susu',
            'Nasi, Semur Daging, Capcay Sayur, Anggur, Air Putih',
            'Nasi, Tahu Telur, Oseng Tempe, Salak, Susu',
            'Mi Goreng, Bakso Sapi, Acar Timun, Pisang, Air Putih',
            'Nasi, Ayam Pop, Daun Singkong, Jambu, Susu',
            'Nasi, Pepes Ikan Mas, Tumis Labu Siam, Nanas, Air Putih',
            'Nasi, Bistik Sapi, Sayur Bening Bayam, Mangga, Susu',
            'Nasi Goreng Jawa, Telur Dadar, Kerupuk, Pisang, Air Putih',
            'Nasi, Rendang Ayam, Sambal Terasi, Jeruk, Susu',
            'Nasi, Tongseng Sapi, Tahu Goreng, Apel, Air Putih',
            'Nasi, Ikan Nila Goreng, Tumis Kacang Panjang, Pepaya, Susu',
            'Nasi, Kari Ayam, Acar Kuning, Pisang, Air Putih',
            'Nasi, Sate Ayam, Lontong, Semangka, Susu',
            'Nasi, Sop Iga Sapi, Perkedel Kentang, Melon, Air Putih',
            'Nasi, Ayam Geprek, Lalapan, Jeruk, Susu',
            'Nasi, Ikan Patin Bakar, Sambal Mangga, Pisang, Air Putih',
            'Nasi, Daging Bumbu Bali, Tahu Tempe, Anggur, Susu',
            'Nasi Goreng Seafood, Telur Mata Sapi, Kerupuk, Apel, Air Putih',
            'Nasi, Opor Ayam, Sayur Labu, Pepaya, Susu',
            'Nasi, Tongkol Suwir, Tumis Pare, Nanas, Air Putih',
            'Nasi, Cumi Hitam, Tahu Goreng, Pisang, Susu',
            'Nasi, Ayam Tangkap, Sayur Daun Ubi, Jeruk, Air Putih',
            'Nasi, Ikan Kembung Balado, Tumis Buncis, Semangka, Susu',
            'Nasi, Sop Daging, Tempe Goreng, Melon, Air Putih',
        ];

        $admin = User::firstOrCreate(
            ['email' => 'admin@sch.id'],
            [
                'name' => 'Admin MBG',
                'username' => 'adminmbg',
                'role' => 'Admin',
                'password' => bcrypt('password'),
            ]
        );
        $admin->assignRole('Admin');

        // Tambah user PPH
        $pphUser = User::firstOrCreate(
            ['email' => 'pph@sch.id'],
            [
                'name' => 'Petugas PPH',
                'username' => 'pph',
                'role' => 'Staf',
                'password' => bcrypt('password'),
            ]
        );
        $pphUser->assignRole('PPH');

        $createdBy = $admin->id;

        // Buat menu untuk 30 hari ke belakang
        foreach ($menuList as $i => $menu) {
            $tanggal = now()->subDays(29 - $i)->toDateString();
            MbgMealMenu::firstOrCreate(
                ['tanggal' => $tanggal],
                [
                    'menu' => $menu,
                    'deskripsi' => 'Menu MBG hari ' . now()->subDays(29 - $i)->isoFormat('dddd, D MMMM Y'),
                    'sumber' => 'Dapur Sehat SMAK',
                    'porsi_direncanakan' => rand(150, 250),
                ]
            );
        }

        $this->command->info('MBG: Menu berhasil dibuat.');

        // ========== DATA OPERASIONAL ==========

        $siswaIds = Siswa::pluck('id')->toArray();
        $kelasIds = Kelas::pluck('id')->toArray();
        $ConditionIds = MbgSpecialCondition::pluck('id')->toArray();

        if (empty($siswaIds) || empty($kelasIds)) {
            $this->command->warn('MBG: Data siswa atau kelas kosong, lewati seeding operasional.');
            return;
        }

        // --- 4. Consent siswa ---
        $this->command->info('MBG: Membuat consent siswa...');
        foreach ($siswaIds as $sid) {
            MbgConsent::firstOrCreate(
                ['siswa_id' => $sid],
                [
                    'status' => fake()->randomElement(['setuju', 'setuju', 'setuju', 'tolak']),
                    'tanggal_persetujuan' => now()->subDays(rand(1, 60)),
                    'catatan_ortu' => rand(1, 10) > 7 ? fake()->sentence() : null,
                ]
            );
        }

        // --- 5. Student conditions (20% siswa) ---
        $this->command->info('MBG: Membuat kondisi khusus siswa...');
        $conditionSiswa = collect($siswaIds)->shuffle()->take((int) (count($siswaIds) * 0.2));
        foreach ($conditionSiswa as $cid) {
            $condId = $ConditionIds[array_rand($ConditionIds)];
            MbgStudentCondition::firstOrCreate(
                ['siswa_id' => $cid, 'condition_id' => $condId],
                ['catatan' => rand(1, 10) > 6 ? fake()->sentence() : null]
            );
        }

        // --- 6. Ambil relasi siswa_kelas ---
        $siswaKelas = SiswaKelas::with(['kelas', 'siswa'])->where('status', 'aktif')->get()->groupBy('kelas_id');

        if ($siswaKelas->isEmpty()) {
            $this->command->warn('MBG: Tidak ada relasi siswa_kelas aktif.');
            return;
        }

        $bastStatuses = ['diterima', 'diterima', 'diterima', 'diterima', 'diterima', 'diterima', 'diterima', 'diterima', 'diterima', 'pending'];
        $attendanceStatuses = ['hadir_makan', 'hadir_makan', 'hadir_makan', 'hadir_makan', 'hadir_makan', 'hadir_makan', 'dibawa_pulang', 'tidak_hadir', 'tidak_makan'];

        foreach ($siswaKelas as $kelasId => $skList) {
            $kelas = $skList->first()->kelas;
            $kapasitas = $kelas->kapasitas ?? 32;
            $siswaInKelas = $skList->pluck('siswa_id')->toArray();

            // Buat 5 BAST per kelas untuk hari-hari sebelumnya
            for ($hari = 1; $hari <= 5; $hari++) {
                $tanggalBast = now()->subDays($hari * 2 + rand(0, 1))->toDateString();
                $jamDatang = sprintf('%02d:%02d', rand(7, 9), rand(0, 59));
                $jamTerima = sprintf('%02d:%02d', rand(7, 9), rand(10, 45));

                $bast = MbgBast::create([
                    'tanggal' => $tanggalBast,
                    'waktu_datang' => $jamDatang . ':00',
                    'waktu_terima' => $jamTerima . ':00',
                    'porsi_dipesan' => $kapasitas,
                    'porsi_diterima' => $kapasitas - rand(0, 3),
                    'nama_kurir' => fake()->name(),
                    'catatan' => rand(1, 10) > 7 ? fake()->sentence() : null,
                    'status' => $bastStatuses[array_rand($bastStatuses)],
                    'created_by' => $createdBy,
                ]);

                // --- 7. Organoleptik per BAST ---
                $nilai = ['baik', 'baik', 'baik', 'cukup', 'kurang'];
                MbgOrganoleptik::create([
                    'bast_id' => $bast->id,
                    'warna' => $nilai[array_rand($nilai)],
                    'aroma' => $nilai[array_rand($nilai)],
                    'rasa' => $nilai[array_rand($nilai)],
                    'suhu' => $nilai[array_rand($nilai)],
                    'tekstur' => $nilai[array_rand($nilai)],
                    'hasil' => rand(1, 10) > 7 ? 'tidak_layak' : 'layak',
                    'catatan' => rand(1, 10) > 7 ? fake()->sentence() : null,
                    'diuji_oleh' => $createdBy,
                ]);

                // --- 8. Attendance per siswa per BAST ---
                foreach ($siswaInKelas as $sId) {
                    MbgAttendance::create([
                        'bast_id' => $bast->id,
                        'siswa_id' => $sId,
                        'kelas_id' => $kelasId,
                        'status' => $attendanceStatuses[array_rand($attendanceStatuses)],
                        'catatan' => rand(1, 15) > 12 ? fake()->sentence() : null,
                        'diinput_oleh' => $createdBy,
                    ]);
                }
            }
        }

        $this->command->info('MBG: BAST, Organoleptik, dan Absensi berhasil dibuat.');

        // --- 9. Incidents ---
        $this->command->info('MBG: Membuat insiden...');
        $incidentCategories = ['keracunan', 'keterlambatan', 'kerusakan', 'penolakan_massal', 'kerusakan', 'lainnya'];
        $incidentData = [
            ['kategori' => 'kerusakan', 'deskripsi' => 'Beberapa siswa melaporkan bau tidak sedap pada lauk ikan.', 'keterangan' => ''],
            ['kategori' => 'kerusakan', 'deskripsi' => 'Porsi nasi yang diterima tidak sesuai dengan jumlah siswa.', 'keterangan' => ''],
            ['kategori' => 'lainnya', 'deskripsi' => 'Seorang siswa mengalami reaksi alergi setelah mengonsumsi susu.', 'keterangan' => 'Siswa langsung dibawa ke UKS dan diberikan penanganan pertama.'],
            ['kategori' => 'keterlambatan', 'deskripsi' => 'Makanan tiba 30 menit dari jadwal seharusnya.', 'keterangan' => ''],
        ];

        foreach ($incidentData as $inc) {
            MbgIncident::create([
                'tanggal' => now()->subDays(rand(3, 20))->toDateString(),
                'kategori' => $inc['kategori'],
                'deskripsi' => $inc['deskripsi'],
                'severity' => fake()->randomElement(['ringan', 'sedang', 'berat']),
                'status' => rand(1, 10) > 6 ? 'selesai' : 'ditangani',
                'tindak_lanjut' => $inc['keterangan'] ?: fake()->sentence(),
                'dilapor_oleh' => $createdBy,
                'ditangani_oleh' => $createdBy,
            ]);
        }

        // --- 10. Meetings ---
        $this->command->info('MBG: Membuat rapat evaluasi...');
        $meetings = [
            ['agenda' => 'Evaluasi Menu MBG Bulanan', 'tempat' => 'Ruang Rapat Guru', 'notulensi' => fake()->paragraph(3), 'kesimpulan' => 'Menu minggu depan perlu ditambah variasi sayuran.'],
            ['agenda' => 'Koordinasi Distribusi MBG', 'tempat' => 'Aula Sekolah', 'notulensi' => fake()->paragraph(3), 'kesimpulan' => 'Jadwal distribusi disepakati pukul 07.30 WIB setiap hari.'],
        ];

        foreach ($meetings as $m) {
            MbgMeeting::create([
                'tanggal_rapat' => now()->subDays(rand(5, 30))->toDateString(),
                'tempat' => $m['tempat'],
                'agenda' => $m['agenda'],
                'notulensi' => $m['notulensi'],
                'kesimpulan' => $m['kesimpulan'],
                'dibuat_oleh' => $createdBy,
            ]);
        }

        // --- 11. Galleries ---
        $this->command->info('MBG: Membuat galeri dokumentasi...');
        $galleries = [
            ['judul' => 'Kegiatan MBG Hari Senin', 'kategori' => 'suasana_makan', 'tanggal_kegiatan' => now()->subDays(10)->toDateString()],
            ['judul' => 'Uji Organoleptik oleh Guru', 'kategori' => 'uji_kelayakan', 'tanggal_kegiatan' => now()->subDays(8)->toDateString()],
            ['judul' => 'Serah Terima MBG dari Penyedia', 'kategori' => 'serah_terima', 'tanggal_kegiatan' => now()->subDays(7)->toDateString()],
            ['judul' => 'Dokumentasi Menu MBG Sehat', 'kategori' => 'dokumentasi', 'tanggal_kegiatan' => now()->subDays(5)->toDateString()],
        ];

        foreach ($galleries as $g) {
            MbgGallery::create([
                'judul' => $g['judul'],
                'file_path' => '/storage/mbg/placeholder-' . rand(1, 4) . '.jpg',
                'kategori' => $g['kategori'],
                'tanggal_kegiatan' => $g['tanggal_kegiatan'],
                'deskripsi' => fake()->sentence(),
                'diupload_oleh' => $createdBy,
            ]);
        }

        $this->command->info('MBG Seeder SUKSES: role PPH, kondisi khusus, menu, consent, BAST, organoleptik, absensi, insiden, rapat, dan galeri berhasil dibuat.');
    }
}
