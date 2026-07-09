<?php

namespace Tests\Feature\Admin;

use App\Models\MasterBank;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class MasterBankTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_view_master_bank_index()
    {
        $this->actingAs($this->adminUser());

        $response = $this->get(route('master-bank.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_can_create_master_bank()
    {
        $this->actingAs($this->adminUser());

        $response = $this->get(route('master-bank.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_can_store_master_bank()
    {
        $this->actingAs($this->adminUser());

        $response = $this->post(route('master-bank.store'), [
            'nama_bank' => 'Bank Test',
            'kode_bank' => '001',
            'cabang' => 'Cabang Utama',
            'rekening_default' => '1234567890',
        ]);

        $response->assertRedirect(route('master-bank.index'));
        $this->assertDatabaseHas('master_banks', [
            'nama_bank' => 'Bank Test',
            'kode_bank' => '001',
        ]);
    }

    /** @test */
    public function admin_can_edit_master_bank()
    {
        $this->actingAs($this->adminUser());

        $bank = MasterBank::create([
            'nama_bank' => 'Bank Test',
            'kode_bank' => '001',
            'cabang' => 'Cabang Pusat',
            'rekening_default' => '1234567890',
        ]);

        $response = $this->get(route('master-bank.edit', $bank));

        $response->assertStatus(200);
    }

    /** @test */
    public function admin_can_update_master_bank()
    {
        $this->actingAs($this->adminUser());

        $bank = MasterBank::create([
            'nama_bank' => 'Bank Test',
            'kode_bank' => '001',
            'cabang' => 'Cabang Pusat',
            'rekening_default' => '1234567890',
        ]);

        $response = $this->put(route('master-bank.update', $bank), [
            'nama_bank' => 'Bank Updated',
            'kode_bank' => '002',
            'cabang' => 'Cabang Update',
            'rekening_default' => '0987654321',
        ]);

        $response->assertRedirect(route('master-bank.index'));
        $this->assertDatabaseHas('master_banks', [
            'id' => $bank->id,
            'nama_bank' => 'Bank Updated',
            'kode_bank' => '002',
        ]);
    }

    /** @test */
    public function admin_can_delete_master_bank()
    {
        $this->actingAs($this->adminUser());

        $bank = MasterBank::create([
            'nama_bank' => 'Bank Test',
            'kode_bank' => '001',
            'cabang' => 'Cabang Pusat',
            'rekening_default' => '1234567890',
        ]);

        $response = $this->delete(route('master-bank.destroy', $bank));

        $response->assertRedirect(route('master-bank.index'));
        $this->assertSoftDeleted('master_banks', ['id' => $bank->id]);
    }

    protected function adminUser()
    {
        // Ensure the Admin role exists
        $role = Role::firstOrCreate(['name' => 'Admin']);

        $user = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'username' => 'adminuser',
            'password' => Hash::make('password'),
        ]);

        $user->assignRole($role);

        return $user;
    }
}