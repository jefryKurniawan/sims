<?php

namespace Tests\Feature\Admin\Erapor;

use App\Models\RaporKelas;
use App\Models\RaporSiswa;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RaporSiswaCetakTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_view_rapor_show_contains_cetak_button()
    {
        $admin = $this->adminUser();
        $admin->assignRole('Admin');
        $this->actingAs($admin);

        $kelas = RaporKelas::create([
            'nama_kelas' => 'X IPA 1',
            'tingkat' => '10',
            'tahun_ajaran' => '2025/2026',
        ]);
        $siswa = Siswa::create([
            'nis' => '12345',
            'nisn' => '1234567890',
            'nama_lengkap' => 'Test Siswa',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2010-01-01',
            'tempat_lahir' => 'Jakarta',
        ]);
        $rapor = RaporSiswa::create([
            'siswa_id' => $siswa->id,
            'rapor_kelas_id' => $kelas->id,
            'semester' => 'Ganjil',
            'tahun_ajaran' => '2025/2026',
        ]);

        $response = $this->get(route('rapor-siswa.show', $rapor));

        $response->assertStatus(200);
        $response->assertSee('Cetak Rapor');
    }

    protected function adminUser(): User
    {
        Role::firstOrCreate(['name' => 'Admin']);
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'username' => 'admin',
            'password' => Hash::make('password'),
        ]);
        return $user;
    }
}
