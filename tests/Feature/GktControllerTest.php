<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Guru;
use App\Models\User;

class GktControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_list_guru()
    {
        $this->actingAs(User::factory()->create(['role' => 'Admin']));

        Guru::factory()->count(3)->create();

        $response = $this->getJson('/dashboard/gkt');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    /** @test */
    public function admin_can_create_guru()
    {
        $this->actingAs(User::factory()->create(['role' => 'Admin']));

        $data = Guru::factory()->make()->toArray();

        $response = $this->postJson('/dashboard/gkt', $data);

        $response->assertStatus(201);
        $response->assertJsonFragment([
            'nama' => $data['nama'],
        ]);
        $this->assertDatabaseHas('guru', [
            'nama' => $data['nama'],
        ]);
    }

    /** @test */
    public function admin_can_update_guru()
    {
        $this->actingAs(User::factory()->create(['role' => 'Admin']));

        $guru = Guru::factory()->create();
        $newName = 'Updated Name';

        $response = $this->putJson("/dashboard/gkt/{$guru->id}", ['nama' => $newName]);

        $response->assertStatus(200);
        $response->assertJsonFragment(['nama' => $newName]);
        $this->assertDatabaseHas('guru', ['id' => $guru->id, 'nama' => $newName]);
    }

    /** @test */
    public function admin_can_delete_guru()
    {
        $this->actingAs(User::factory()->create(['role' => 'Admin']));

        $guru = Guru::factory()->create();

        $response = $this->deleteJson("/dashboard/gkt/{$guru->id}");

        $response->assertStatus(200);
        $this->assertDeleted($guru);
    }
}