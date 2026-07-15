<?php

namespace Tests\Feature\Admin\BukuInduk;

use App\Models\BukuIndukSiswa;
use App\Models\MutasiSiswa;
use App\Models\OrangTuaDetail;
use App\Models\RekamMedisSiswa;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class BukuIndukControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_view_buku_induk_index()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $response = $this->get(route('buku-induk.index'));

        $response->assertStatus(200);
        $response->assertSee('Buku Induk');
        $response->assertSee($siswa->nama_lengkap);
    }

    /** @test */
    public function admin_can_view_buku_induk_show_contains_cetak_button()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $response = $this->get(route('buku-induk.show', $siswa));

        $response->assertStatus(200);
        $response->assertSee('Cetak Buku Induk');
        $response->assertSee('Profil');
        $response->assertSee('Rekam Medis');
        $response->assertSee('Orang Tua');
        $response->assertSee('Mutasi');
    }

    /** @test */
    public function admin_can_view_cetak_page()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $response = $this->get(route('buku-induk.cetak', $siswa));

        $response->assertStatus(200);
        $response->assertSee('Buku Induk Siswa');
        $response->assertSee($siswa->nama_lengkap);
    }

    /** @test */
    public function admin_can_update_profil_buku_induk()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $payload = [
            'agama' => 'Islam',
            'anak_ke' => 2,
            'jumlah_saudara' => 3,
            'bahasa_sehari_hari' => 'Indonesia',
            'jarak_rumah_sekolah_km' => 5,
            'transportasi' => 'Motor',
            'hobi' => 'Membaca',
            'cita_cita' => 'Dokter',
            'berat_badan_kg' => 45,
            'tinggi_badan_cm' => 160,
        ];

        $response = $this->post(route('buku-induk.update-profil', $siswa), $payload);

        $response->assertStatus(302);
        $this->assertDatabaseHas('buku_induk_siswa', [
            'siswa_id' => $siswa->id,
            'agama' => 'Islam',
            'anak_ke' => 2,
        ]);
    }

    /** @test */
    public function admin_can_update_rekam_medis()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $payload = [
            'golongan_darah' => 'O',
            'alergi' => 'Tidak ada',
            'penyakit_terdahulu' => 'Tidak ada',
            'nama_dokter' => 'Dr. Anonim',
        ];

        $response = $this->post(route('buku-induk.update-rekam-medis', $siswa), $payload);

        $response->assertStatus(302);
        $this->assertDatabaseHas('rekam_medis_siswa', [
            'siswa_id' => $siswa->id,
            'golongan_darah' => 'O',
        ]);
    }

    /** @test */
    public function admin_can_store_orang_tua()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $payload = [
            'hubungan' => 'Ayah',
            'nama_lengkap' => 'Bapak Anonim',
            'pekerjaan' => 'Wiraswasta',
            'no_hp' => '08123456789',
        ];

        $response = $this->post(route('buku-induk.store-orang-tua', $siswa), $payload);

        $response->assertStatus(302);
        $this->assertDatabaseHas('orang_tua_detail', [
            'siswa_id' => $siswa->id,
            'hubungan' => 'Ayah',
            'nama_lengkap' => 'Bapak Anonim',
        ]);
    }

    /** @test */
    public function admin_can_update_orang_tua()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();
        $ortu = OrangTuaDetail::create([
            'siswa_id' => $siswa->id,
            'hubungan' => 'Ayah',
            'nama_lengkap' => 'Old Name',
        ]);

        $payload = [
            'hubungan' => 'Ayah',
            'nama_lengkap' => 'New Name',
            'pekerjaan' => 'PNS',
        ];

        $response = $this->put(route('buku-induk.update-orang-tua', [$siswa, $ortu]), $payload);

        $response->assertStatus(302);
        $this->assertDatabaseHas('orang_tua_detail', [
            'id' => $ortu->id,
            'nama_lengkap' => 'New Name',
            'pekerjaan' => 'PNS',
        ]);
    }

    /** @test */
    public function admin_can_destroy_orang_tua()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();
        $ortu = OrangTuaDetail::create([
            'siswa_id' => $siswa->id,
            'hubungan' => 'Ayah',
            'nama_lengkap' => 'Bapak Test',
        ]);

        $response = $this->delete(route('buku-induk.destroy-orang-tua', [$siswa, $ortu]));

        $response->assertStatus(302);
        $this->assertDatabaseMissing('orang_tua_detail', ['id' => $ortu->id]);
    }

    /** @test */
    public function admin_can_store_mutasi()
    {
        Storage::fake('public');

        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();

        $payload = [
            'jenis' => 'masuk',
            'tanggal_mutasi' => '2025-06-15',
            'asal_sekolah' => 'SMP Negeri 1',
            'alasan' => 'Pindah domisili orang tua',
        ];

        $response = $this->post(route('buku-induk.store-mutasi', $siswa), $payload);

        $response->assertStatus(302);
        $this->assertDatabaseHas('mutasi_siswa', [
            'siswa_id' => $siswa->id,
            'jenis' => 'masuk',
            'asal_sekolah' => 'SMP Negeri 1',
            'dicatat_oleh' => $admin->id,
        ]);
    }

    /** @test */
    public function admin_can_destroy_mutasi()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $siswa = $this->makeSiswa();
        $mutasi = MutasiSiswa::create([
            'siswa_id' => $siswa->id,
            'jenis' => 'keluar',
            'tanggal_mutasi' => '2025-06-15',
            'alasan' => 'Pindah',
            'dicatat_oleh' => $admin->id,
        ]);

        $response = $this->delete(route('buku-induk.destroy-mutasi', [$siswa, $mutasi]));

        $response->assertStatus(302);
        $this->assertDatabaseMissing('mutasi_siswa', ['id' => $mutasi->id]);
    }

    // === Helpers ===

    protected function adminUser(): User
    {
        Role::firstOrCreate(['name' => 'Admin']);
        return User::create([
            'name' => 'Admin Test',
            'email' => 'admin-bukuinduk@test.com',
            'username' => 'adminbukuinduk',
            'password' => Hash::make('password'),
        ]);
    }

    protected function makeSiswa(): Siswa
    {
        return Siswa::create([
            'nis' => '11111',
            'nisn' => '1111111111',
            'nama_lengkap' => 'Siswa Test Buku Induk',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2010-05-15',
            'tempat_lahir' => 'Bandung',
            'alamat' => 'Jl. Test No. 123',
        ]);
    }
}
