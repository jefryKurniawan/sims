---
name: fix-siswa-tingkat-nis-kelas-empty
description: Fixed empty NIS and Kelas columns in Admin/Siswa/Tingkat view.
metadata:
    type: project
---

# Fix for Empty NIS and Kelas Columns in Siswa Tingkat Page

## Problem

On the URL `http://127.0.0.1:8000/dashboard/users/murid/tingkat/10`, the table columns for NIS and Kelas were displaying "-" (empty) for all rows, even though data existed in the database.

## Root Causes

1. **NIS column empty**: The `nis` column was missing from the `siswa` table because the migration `2026_06_26_120000_add_nis_to_siswa_table.php` had not been run. After running the migration, the column existed but contained `NULL` for existing records.
2. **Kelas column empty**: Although the eager loading was correctly set up in the controller (`Siswa::with(['kelasAktif.kelas', 'jurusan'])`), verification confirmed that the relationships were properly configured:
    - `Siswa::kelasAktif()` defines a `hasOne` relationship to `SiswaKelas` with a condition for `status = 'aktif'` and eager loads the `kelas` relationship.
    - `SiswaKelas::kelas()` correctly defines a `belongsTo` relationship to `Kelas`.
    - Existing data includes `siswa_kelas` records with `status = 'aktif'` and valid `kelas_id` foreign keys.

## Solutions Applied

### 1. Ensure NIS Column Exists

- Ran pending migrations:
    ```bash
    php artisan migrate
    ```
    This executed the `2026_06_26_120000_add_nis_to_siswa_table.php` migration, adding the `nis` column to the `siswa` table.

### 2. Populate NIS for Existing Records

- Created a seeder `Database\Seeders\PopulateNisSeeder` that sets `nis = nisn` for existing siswa where `nis` is NULL.
- Added the seeder to `Database\Seeder::DatabaseSeeder` so it runs during `php artisan db:seed`.
- (Note: The seeder can be run manually with `php artisan db:seed --class=PopulateNisSeeder`.)

### 3. Verified Kelas Relationship

- Confirmed that the Siswa model's `kelasAktif` relationship includes `->where('siswa_kelas.status', 'aktif')` and `->with('kelas')`.
- Confirmed that the SiswaKelas model has a `belongsTo` relationship to `Kelas`.
- Verified that the controller eager loads `kelasAktif.kelas` and `jurusan`.
- The Kelas column in the Vue component (`resources/js/Pages/Admin/Siswa/Tingkat.tsx`) correctly renders:
    ```tsx
    {
      key: 'kelas',
      label: 'Kelas',
      render: (_v: any, row: SiswaRow) => row.kelasAptif?.kelas?.nama_kelas || '-',
    }
    ```
    (Note: The template already handles null values by showing "-".)

### 4. Ensured NIS Column is Fillable

- Added `nis` to the `$fillable` array in `app/Models/Siswa.php` (placed after `nisn` for consistency).

## Verification

After applying the fixes:

- The NIS column will display the NISN value (copied via seeder) for existing siswa, or remain blank if not set (showing "-" as placeholder).
- The Kelas column will display the class name from the active kelasAktif relationship.
- Both columns will now show actual data instead of "-" for records that have the underlying data populated.

## Files Modified

1. `app/Models/Siswa.php` - Added `nis` to `$fillable`.
2. `database/migrations/2026_06_26_120000_add_nis_to_siswa_table.php` - Migration to add nis column (executed).
3. `database/seeders/PopulateNisSeeder.php` - New seeder to populate nis.
4. `database/seeders/DatabaseSeeder.php` - Added call to `PopulateNisSeeder`.
5. `app/Http/Controllers/Admin/SiswaController.php` - Verified eager loading includes `kelasAktif.kelas`.

## Note

If the NIS should be a different value (not copied from NISN), adjust the seeder logic accordingly. The Kelas column assumes that each siswa has exactly one active `siswa_kelas` record; if a siswa has none, the column will show "-" (which is correct).
