<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Spatie\Permission\Models\Role;

class RoleAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed roles
        $this->artisan('db:seed', ['--class' => 'Database\Seeders\RoleSeeder']);
    }

    /** @test */
    public function admin_can_access_dashboard()
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertStatus(200);
    }

    /** @test */
    public function guru_cannot_access_admin_routes()
    {
        $guru = User::factory()->create();
        $guru->assignRole('Guru');
        $response = $this->actingAs($guru)->get('/dashboard/ppdb'); // admin only route
        $response->assertStatus(403);
    }

    /** @test */
    public function orang_tua_can_access_api_spp_route()
    {
        $ortu = User::factory()->create();
        $ortu->assignRole('Orang Tua');
        $token = $ortu->createToken('test-token')->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
            'Accept' => 'application/json',
        ])->getJson('/api/orangtua/spp');
        $response->assertStatus(200);
    }
}
