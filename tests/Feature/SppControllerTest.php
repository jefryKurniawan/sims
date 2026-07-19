<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Siswa;
use App\Models\SppTagihan;
use App\Models\SppPembayaran;
use App\Models\SppSetting;
use Carbon\Carbon;

class SppControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->actingAs($this->admin, 'web');

        $this->siswa = Siswa::create([
            'nisn' => '1234567890',
            'nama_lengkap' => 'Test Siswa',
            'tempat_lahir' => 'Kota Test',
            'tanggal_lahir' => '2000-01-01',
            'jenis_kelamin' => 'L',
            'alamat' => 'Alamat Test',
            'no_hp' => '08123456789',
            'email' => 'siswa@example.com',
            'nama_ortu' => 'Ortu Test',
            'no_hp_ortu' => '08123456788',
            'asal_sekolah' => 'Sekolah Asal',
            'tanggal_masuk' => now()->subYear(),
        ]);
    }

    /** @test */
    public function admin_can_list_spp_tagihan()
    {
        SppTagihan::factory()->count(3)->create([
            'siswa_id' => $this->siswa->id,
        ]);

        $response = $this->get('/dashboard/spp');

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_can_create_spp_tagihan()
    {
        $data = [
            'siswa_id' => $this->siswa->id,
            'nominal' => 500000,
            'tanggal_jatuh_tempo' => now()->addMonth()->toDateString(),
            'keterangan' => 'SPP Bulanan',
        ];

        $response = $this->post('/dashboard/spp', $data);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('spp_tagihan', $data);
    }

    /** @test */
    public function admin_can_update_spp_tagihan()
    {
        $tagihan = SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'nominal' => 300000,
            'tanggal_jatuh_tempo' => now()->addMonth(),
        ]);

        $updated = [
            'nominal' => 350000,
            'tanggal_jatuh_tempo' => now()->addMonth()->addDay()->toDateString(),
        ];

        $response = $this->put("/dashboard/spp/{$tagihan->id}", $updated);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('spp_tagihan', [
            'id' => $tagihan->id,
            'nominal' => 350000,
        ]);
    }

    /** @test */
    public function admin_can_delete_spp_tagihan()
    {
        $tagihan = SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
        ]);

        $response = $this->delete("/dashboard/spp/{$tagihan->id}");

        $response->assertSessionHas('success');
        $this->assertSoftDeleted($tagihan);
    }

    /** @test */
    public function admin_can_record_payment_and_update_status()
    {
        $tagihan = SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'nominal' => 500000,
            'tanggal_jatuh_tempo' => now()->addMonth(),
            'status' => 'belum_lunas',
        ]);

        $paymentData = [
            'tanggal_pembayaran' => now()->toDateString(),
            'jumlah' => 500000,
            'metode' => 'transfer',
            'status' => 'lunas',
            'keterangan' => 'Pembayaran lunas',
        ];

        $response = $this->post("/dashboard/spp/{$tagihan->id}/bayar", $paymentData);

        $response->assertSessionHas('success');

        $this->assertDatabaseHas('spp_pembayaran', [
            'siswa_id' => $this->siswa->id,
            'spp_tagihan_id' => $tagihan->id,
            'nominal' => 500000,
            'metode' => 'transfer',
            'status' => 'lunas',
        ]);

        $this->assertDatabaseHas('spp_tagihan', [
            'id' => $tagihan->id,
            'status' => 'lunas',
        ]);
    }

    /** @test */
    public function admin_can_get_outstanding_summary()
    {
        SppTagihan::factory()->count(2)->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'belum_lunas',
            'nominal' => 300000,
        ]);
        SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'lunas',
            'nominal' => 500000,
        ]);

        $response = $this->get('/dashboard/spp/outstanding');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'total_nominal' => 600000,
            'total_due_count' => 2,
        ]);
        $this->assertCount(2, $response->json('details'));
    }

    /** @test */
    public function admin_can_generate_bulk_tagihan()
    {
        $siswa2 = Siswa::create([
            'nisn' => '2234567890',
            'nama_lengkap' => 'Siswa Dua',
            'tempat_lahir' => 'Kota',
            'tanggal_lahir' => '2001-01-01',
            'jenis_kelamin' => 'P',
            'alamat' => 'Alamat',
            'no_hp' => '0811111111',
            'email' => 'dua@test.com',
            'nama_ortu' => 'Ortu Dua',
            'no_hp_ortu' => '0811111112',
            'asal_sekolah' => 'Sekolah',
            'tanggal_masuk' => now()->subYear(),
        ]);
        $siswa3 = Siswa::create([
            'nisn' => '3234567890',
            'nama_lengkap' => 'Siswa Tiga',
            'tempat_lahir' => 'Kota',
            'tanggal_lahir' => '2002-01-01',
            'jenis_kelamin' => 'L',
            'alamat' => 'Alamat',
            'no_hp' => '0812222222',
            'email' => 'tiga@test.com',
            'nama_ortu' => 'Ortu Tiga',
            'no_hp_ortu' => '0812222223',
            'asal_sekolah' => 'Sekolah',
            'tanggal_masuk' => now()->subYear(),
        ]);

        $response = $this->post('/dashboard/spp/generate', [
            'bulan' => 7,
            'tahun' => now()->year,
            'nominal' => 300000,
            'tanggal_jatuh_tempo' => now()->addMonth()->format('Y-m-d'),
            'keterangan' => 'SPP Juli',
        ]);

        $response->assertSessionHas('success');

        $this->assertDatabaseHas('spp_tagihan', [
            'siswa_id' => $this->siswa->id,
            'nominal' => 300000,
            'status' => 'belum_lunas',
        ]);
        $this->assertDatabaseHas('spp_tagihan', [
            'siswa_id' => $siswa2->id,
            'nominal' => 300000,
            'status' => 'belum_lunas',
        ]);
        $this->assertDatabaseHas('spp_tagihan', [
            'siswa_id' => $siswa3->id,
            'nominal' => 300000,
            'status' => 'belum_lunas',
        ]);
        $this->assertEquals(3, SppTagihan::where('nominal', 300000)->count());
    }

    /** @test */
    public function admin_can_view_hutang_page()
    {
        SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'belum_lunas',
            'nominal' => 300000,
        ]);
        SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'lunas',
            'nominal' => 500000,
        ]);

        $response = $this->get('/dashboard/spp/hutang');

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_can_view_siswa_history()
    {
        $tagihan = SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'nominal' => 300000,
            'status' => 'lunas',
        ]);

        SppPembayaran::create([
            'siswa_id' => $this->siswa->id,
            'spp_tagihan_id' => $tagihan->id,
            'nominal' => 300000,
            'tanggal_pembayaran' => now()->format('Y-m-d'),
            'metode' => 'transfer',
            'status' => 'lunas',
        ]);

        $response = $this->get("/dashboard/spp/siswa/{$this->siswa->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function overdue_auto_flags_when_listing()
    {
        $tagihan = SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'belum_lunas',
            'tanggal_jatuh_tempo' => now()->subDays(5),
        ]);

        $this->get('/dashboard/spp');

        $this->assertDatabaseHas('spp_tagihan', [
            'id' => $tagihan->id,
            'status' => 'overdue',
        ]);
    }
}
