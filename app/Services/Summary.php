<?php
/**
 * @see docs/lean-prd.md
 *
 * ## Goal
 * - Complete PPDB module layer-by-layer: models done, now DB (seeders) and Service layer
 *
 * ## Constraints & Preferences
 * - Follow existing project patterns (AuditLog, service class structure)
 * - Auto-sync calon_siswa lulus → tabel Siswa + buat User role ortu (CLAUDE.md point 1)
 * - SPP auto-generated when Siswa created (but SPP module not yet implemented)
 *
 * ## Progress
 * ### Done
 * - **Models:** CalonSiswa (PPDB-enhanced), Gelombang, PengumumanPpdb — all written with fillable, casts, boot events (AuditLog), scopes, relationships
 *   - CalonSiswa: jurusan_id, gelombang_id, nilai fields added to fillable + casts; jurusan() & gelombang() relationships added
 *   - Siswa: `jurusan_id` added to fillable + `jurusan()` relationship added
 *   - Berita: `sumber`, `status` added to fillable
 * - **Migrations:** existing PPDB migrations unchanged. 2 new migrations created:
 *   - `add_jurusan_to_siswa_table` — adds jurusan_id FK + index to tabel siswa
 *   - `add_sumber_to_beritas_table` — adds sumber ENUM(manual,ppdb,alumni) and status ENUM(draft,published) to beritas
 * - **Service:** `app/Services/PpdbService.php` — register, verify, prosesSeleksi, syncToSiswa, inputNilai, publishPengumuman, getStatistik, getLaporan, generateBeritaPengumuman, kuotaPenuh
 *   - Fixed: syncToSiswa now uses `tanggal_masuk`, `status => 'aktif'`, `assignRole('ortu')`
 *   - Fixed: generateBeritaPengumuman now uses actual beritas columns (title/slug/content/kategori_id/is_active/created_by/sumber/status)
 *   - Fixed: publishPengumuman no longer references missing Blade partial
 * - **Seeders:** `database/seeders/GelombangSeeder.php` (2 gelombang), `PengumumanPpdbSeeder.php` (1 contoh pengumuman) — registered in DatabaseSeeder
 *
 * ### In Progress
 * - *(none)*
 *
 * ### Blocked
 * - *(none)*
 *
 * ## Key Decisions
 * - Service uses 40% rapor + 60% wawancara for nilai_akhir calculation
 * - Seleksi: ranking berdasarkan nilai_akhir desc, minimal nilai_akhir ≥ 60 untuk lulus
 * - Auto-sync calon_siswa → Siswa happens inside prosesSeleksi when status set to 'lulus'
 * - Sync includes creating User account with `assignRole('ortu')` and random password
 *
 * ## Next Steps
 * 1. Create PPDB Controller with routes (web + API)
 * 2. Create PPDB views (admin dashboard, public registration form)
 * 3. Implement SPP auto-tagihan when Siswa created
 * 4. Create portal orang tua read-only API route
 * 5. Add email notification queue for new user credentials
 *
 * ## Critical Context
 * - Table names: `calon_siswa`, `gelombang`, `pengumuman_ppdb`, `siswa` (not siswas), `beritas` (not berita), `jurusans`
 * - CalonSiswa status ENUM (after migration): submitted, verified, lulus, tidak_lulus, rejected
 * - AuditLog already integrated via CalonSiswa boot events and Siswa boot events
 * - Gelombang migration uses `is_active` (boolean), PengumumanPpdb uses `status` ENUM(draft, published)
 * - Siswa model has `status` ENUM(aktif, lulus, pindah, keluar) with default 'aktif' — good for auto-sync
 * - Beritas model now has `sumber` ENUM(manual, ppdb, alumni) and `status` ENUM(draft, published)
 *
 * ## Relevant Files
 * - `app/Models/CalonSiswa.php`: PPDB-enhanced model with jurusan_id, gelombang_id, nilai fields, scopes, audit trail
 * - `app/Models/Gelombang.php`: Registration wave model with kuota, biaya_pendaftaran
 * - `app/Models/PengumumanPpdb.php`: PPDB announcement model with publish scope
 * - `app/Models/Siswa.php`: Updated fillable with jurusan_id
 * - `app/Models/Berita.php`: Updated fillable with sumber, status
 * - `app/Services/PpdbService.php`: Business logic — registration, verification, selection scoring, auto-sync to Siswa, statistics
 * - `database/seeders/GelombangSeeder.php`: Seeds 2 registration waves
 * - `database/seeders/PengumumanPpdbSeeder.php`: Seeds announcement example
 * - `database/migrations/2026_06_26_050000_add_jurusan_to_siswa_table.php`: Adds jurusan_id FK to siswa
 * - `database/migrations/2026_06_26_051000_add_sumber_to_beritas_table.php`: Adds sumber + status to beritas
 */
class Summary {} // marker only — does nothing
