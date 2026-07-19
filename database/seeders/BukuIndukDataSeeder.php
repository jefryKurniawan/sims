<?php

namespace Database\Seeders;

use App\Models\BukuIndukSiswa;
use App\Models\MutasiSiswa;
use App\Models\OrangTuaDetail;
use App\Models\RekamMedisSiswa;
use App\Models\Siswa;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BukuIndukDataSeeder extends Seeder
{
    private array $agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu'];
    private array $pendidikanOptions = ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'];
    private array $pekerjaanOptions = [
        'PNS/TNI/POLRI', 'Pegawai Swasta', 'Wiraswasta', 'Petani/Nelayan', 'Buruh',
        'Karyawan Swasta', 'Dokter', 'Guru/Dosen', 'Pengusaha', 'Tidak Bekerja',
        'Pensiunan', 'Lainnya'
    ];
    private array $penghasilanOptions = ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'];
    private array $statusPernikahanOptions = ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'];
    private array $hubunganOptions = ['Ayah', 'Ibu', 'Wali'];
    private array $transportasiOptions = ['Jalan Kaki', 'Sepeda', 'Motor', 'Mobil Pribadi', 'Angkot', 'Bus Sekolah', 'Lainnya'];
    private array $golonganDarahOptions = ['A', 'B', 'AB', 'O', 'Tidak Tahu'];
    private array $jenisMutasiOptions = ['masuk', 'keluar'];
    private array $alasanMutasiMasuk = ['Pindahan Orang Tua', 'Mutasi Sekolah', 'Kembali dari Luar Negeri', 'Lainnya'];
    private array $alasanMutasiKeluar = ['Pindahan Orang Tua', 'Mutasi Sekolah', 'Ke Luar Negeri', 'Meninggal Dunia', 'Lainnya'];

    public function run(): void
    {
        $siswaList = Siswa::all();

        if ($siswaList->isEmpty()) {
            $this->command->warn('Tidak ada data siswa. Jalankan SiswaSeeder terlebih dahulu.');
            return;
        }

        $this->command->info("Seeding buku induk untuk {$siswaList->count()} siswa...");

        foreach ($siswaList as $siswa) {
            $this->seedBukuInduk($siswa);
            $this->seedRekamMedis($siswa);
            $this->seedOrangTua($siswa);
            $this->seedMutasi($siswa);
        }

        $this->command->info('Buku Induk seeding selesai.');
    }

    private function seedBukuInduk(Siswa $siswa): void
    {
        BukuIndukSiswa::updateOrCreate(
            ['siswa_id' => $siswa->id],
            [
                'agama' => $this->randomElement($this->agamaOptions),
                'anak_ke' => fake()->numberBetween(1, 5),
                'jumlah_saudara' => fake()->numberBetween(0, 4),
                'bahasa_sehari_hari' => $this->randomElement(['Indonesia', 'Jawa', 'Sunda', 'Inggris', 'Campuran']),
                'transportasi' => $this->randomElement($this->transportasiOptions),
                'jarak_rumah_sekolah_km' => fake()->randomFloat(1, 0.5, 25.0),
                'hobi' => $this->randomElement(['Membaca', 'Olahraga', 'Menggambar', 'Musik', 'Coding', 'Masak', 'Travelling', 'Fotografi']),
                'cita_cita' => $this->randomElement(['Dokter', 'Guru', 'Pilot', 'Polisi', 'Programmer', 'Pengusaha', 'Dokter Hewan', 'Arsitek', 'Atlet', 'Seniman']),
                'berat_badan_kg' => fake()->randomFloat(1, 30, 80),
                'tinggi_badan_cm' => fake()->randomFloat(1, 120, 185),
                'kebutuhan_khusus' => fake()->optional(0.85)->randomElement([
                    'Tidak ada',
                    'Kacamata',
                    'Alat bantu dengar',
                    'Rampangan fisik ringan',
                    'Gangguan belajar (disleksia)',
                    'Alergi berat (kacang/seafood)',
                    'Asma',
                ]),
            ]
        );
    }

    private function seedRekamMedis(Siswa $siswa): void
    {
        $golonganDarah = $this->randomElement($this->golonganDarahOptions);

        RekamMedisSiswa::updateOrCreate(
            ['siswa_id' => $siswa->id],
            [
                'golongan_darah' => $golonganDarah,
                'alergi' => fake()->optional(0.3)->randomElement([
                    'Tidak ada',
                    'Debu/dapur',
                    'Kacang ketan/kelapa',
                    'Seafood (udang/kepiting)',
                    'Penicillin/obat antibiotik',
                    'Kucing/anjing',
                    'Lateks/getah karet',
                    'Debu serbuk',
                ]),
                'penyakit_terdahulu' => fake()->optional(0.4)->randomElement([
                    'Tidak ada',
                    'Demam berdarah (DHF)',
                    'Tipes',
                    'Campak',
                    'Kencing manis (diabetes tipe 1)',
                    'Asma bronkial',
                    'Gangguan jantung kongenital',
                    'Kejang demam',
                    'Infeksi saluran napas berulang',
                ]),
                'obat_rutin' => fake()->optional(0.85)->sentence(3),
                'nama_dokter' => fake()->optional(0.7)->name('male'),
                'rumah_sakit_rujukan' => fake()->optional(0.7)->randomElement([
                    'RSUD Kota',
                    'RS Hermina',
                    'RS Mitra Keluarga',
                    'RS Siloam',
                    'RS Premier Bintaro',
                    'Puskesmas Kecamatan',
                    'Klinik Pratama',
                ]),
                'kontak_darurat_nama' => fake()->name(),
                'kontak_darurat_hp' => fake()->phoneNumber(),
                'kontak_darurat_hubungan' => $this->randomElement($this->hubunganOptions),
            ]
        );
    }

    private function seedOrangTua(Siswa $siswa): void
    {
        // Hapus data lama biar fresh
        OrangTuaDetail::where('siswa_id', $siswa->id)->delete();

        // Wajib: Ayah
        OrangTuaDetail::create([
            'siswa_id' => $siswa->id,
            'hubungan' => 'Ayah',
            'nama_lengkap' => fake()->name('male'),
            'nik' => fake()->unique()->numerify('################'), // 16 digit
            'npwp' => fake()->optional(0.6)->numerify('##.###.###.#-###.###'),
            'tanggal_lahir' => fake()->dateTimeBetween('-60 years', '-35 years')->format('Y-m-d'),
            'pendidikan_terakhir' => $this->randomElement($this->pendidikanOptions),
            'pekerjaan' => $this->randomElement($this->pekerjaanOptions),
            'penghasilan_bulanan' => $this->randomElement($this->penghasilanOptions),
            'status_pernikahan' => 'Menikah',
            'jumlah_tanggungan' => fake()->numberBetween(1, 5),
            'no_hp' => fake()->phoneNumber(),
            'email' => fake()->optional(0.7)->safeEmail(),
            'alamat' => $siswa->alamat, // sama dengan alamat siswa
        ]);

        // Wajib: Ibu
        OrangTuaDetail::create([
            'siswa_id' => $siswa->id,
            'hubungan' => 'Ibu',
            'nama_lengkap' => fake()->name('female'),
            'nik' => fake()->unique()->numerify('################'),
            'npwp' => fake()->optional(0.4)->numerify('##.###.###.#-###.###'),
            'tanggal_lahir' => fake()->dateTimeBetween('-55 years', '-30 years')->format('Y-m-d'),
            'pendidikan_terakhir' => $this->randomElement($this->pendidikanOptions),
            'pekerjaan' => $this->randomElement($this->pekerjaanOptions),
            'penghasilan_bulanan' => $this->randomElement($this->penghasilanOptions),
            'status_pernikahan' => 'Menikah',
            'jumlah_tanggungan' => fake()->numberBetween(1, 5),
            'no_hp' => fake()->phoneNumber(),
            'email' => fake()->optional(0.6)->safeEmail(),
            'alamat' => $siswa->alamat,
        ]);

        // Opsional: Wali (10% chance)
        if (fake()->boolean(10)) {
            OrangTuaDetail::create([
                'siswa_id' => $siswa->id,
                'hubungan' => 'Wali',
                'nama_lengkap' => fake()->name(),
                'nik' => fake()->unique()->numerify('################'),
                'npwp' => fake()->optional(0.3)->numerify('##.###.###.#-###.###'),
                'tanggal_lahir' => fake()->dateTimeBetween('-65 years', '-40 years')->format('Y-m-d'),
                'pendidikan_terakhir' => $this->randomElement($this->pendidikanOptions),
                'pekerjaan' => $this->randomElement($this->pekerjaanOptions),
                'penghasilan_bulanan' => $this->randomElement($this->penghasilanOptions),
                'status_pernikahan' => $this->randomElement($this->statusPernikahanOptions),
                'jumlah_tanggungan' => fake()->numberBetween(1, 3),
                'no_hp' => fake()->phoneNumber(),
                'email' => fake()->optional(0.5)->safeEmail(),
                'alamat' => fake()->address(),
            ]);
        }
    }

    private function seedMutasi(Siswa $siswa): void
    {
        // 30% siswa punya riwayat mutasi
        if (!fake()->boolean(30)) {
            return;
        }

        $count = fake()->numberBetween(1, 2); // 1-2 riwayat mutasi

        for ($i = 0; $i < $count; $i++) {
            $jenis = $this->randomElement($this->jenisMutasiOptions);

            MutasiSiswa::create([
                'siswa_id' => $siswa->id,
                'jenis' => $jenis,
                'tanggal_mutasi' => fake()->dateTimeBetween('-3 years', 'now')->format('Y-m-d'),
                'asal_sekolah' => $jenis === 'masuk' ? fake()->company() . ' ' . $this->randomElement(['SD', 'SMP', 'SMA']) : null,
                'sekolah_tujuan' => $jenis === 'keluar' ? fake()->company() . ' ' . $this->randomElement(['SD', 'SMP', 'SMA']) : null,
                'alasan' => $jenis === 'masuk'
                    ? $this->randomElement($this->alasanMutasiMasuk)
                    : $this->randomElement($this->alasanMutasiKeluar),
                'no_sk' => fake()->optional(0.7)->bothify('SK-###/##/####'),
                'dicatat_oleh' => $siswa->user_id ?? 1,
            ]);
        }
    }

    private function randomElement(array $array): mixed
    {
        return $array[array_rand($array)];
    }
}