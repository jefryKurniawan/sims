<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Siswa;
use App\Models\SppTagihan;
use App\Models\SppPembayaran;
use Carbon\Carbon;

class SppControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->actingAs($this->admin, 'web');

        // Create a siswa for use in tests
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
        // Create a few tagihan
        SppTagihan::factory()->count(3)->create([
            'siswa_id' => $this->siswa->id,
        ]);

        $response = $this->getJson('/dashboard/spp');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
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

        $response = $this->postJson('/dashboard/spp', $data);

        $response->assertStatus(201);
        $response->assertJsonFragment([
            'nominal' => $data['nominal'],
            'keterangan' => $data['keterangan'],
        ]);
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

        $response = $this->putJson("/dashboard/spp/{$tagihan->id}", $updated);

        $response->assertStatus(200);
        $response->assertJsonFragment($updated);
        $this->assertDatabaseHas('spp_tagihan', array_merge($tagihan->getAttributes(), $updated));
    }

    /** @test */
    public function admin_can_delete_spp_tagihan()
    {
        $tagihan = SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
        ]);

        $response = $this->deleteJson("/dashboard/spp/{$tagihan->id}");

        $response->assertStatus(200);
        $this->assertDeleted($tagihan);
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
            'tanggal_bayar' => now()->toDateString(),
            'jumlah' => 500000,
            'metode' => 'transfer',
            'status' => 'lunas',
            'keterangan' => 'Pembayaran lunas',
        ];

        $response = $this->postJson("/dashboard/spp/{$tagihan->id}/bayar", $paymentData);

        $response->assertStatus(201);
        $response->assertJsonFragment([
            'nominal' => $paymentData['jumlah'],
            'metode' => $paymentData['metode'],
            'status' => $paymentData['status'],
        ]);

        // Check that payment record exists
        $this->assertDatabaseHas('spp_pembayaran', [
            'siswa_id' => $this->siswa->id,
            'spp_tagihan_id' => $tagihan->id,
            'nominal' => $paymentData['jumlah'],
            'metode' => $paymentData['metode'],
            'status' => $paymentData['status'],
        ]);

        // Check tagihan status updated to lunas
        $this->assertDatabaseHas('spp_tagihan', [
            'id' => $tagihan->id,
            'status' => 'lunas',
        ]);
    }

    /** @test */
    public function admin_can_get_outstanding_summary()
    {
        // Create some unpaid tagihan
        SppTagihan::factory()->count(2)->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'belum_lunas',
            'nominal' => 300000,
        ]);
        // Create a paid tagihan
        SppTagihan::factory()->create([
            'siswa_id' => $this->siswa->id,
            'status' => 'lunas',
            'nominal' => 500000,
        ]);

        $response = $this->getJson('/dashboard/spp/outstanding');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'total_nominal' => 600000, // 2 * 300000
            'total_due_count' => 2,
        ]);
        $this->assertCount(2, $response->json('details'));
    }
}