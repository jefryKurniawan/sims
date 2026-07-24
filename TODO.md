# TODO.md — Daftar Tugas untuk Auto-Aider (Project Template)

Format: `- [ ] ID | Modul | Deskripsi | Prioritas (P0/P1/P2)`

## Contoh (hapus setelah diisi):

```markdown
- [ ] TU-001 | IzinSakit | Buat migration create_izin_sakit_table sesuai lean-prd.md gap "Izin/Sakit Digital" | P0
- [ ] TU-002 | IzinSakit | Buat model IzinSakit dengan relasi user, rombel, approver | P0
- [ ] TU-003 | IzinSakit | Buat controller Admin/IzinSakitController CRUD + approve/reject | P0
- [ ] TU-004 | IzinSakit | Buat UI Inertia React: Index, Create, Show, Edit | P1
- [ ] TU-005 | IzinSakit | Tambah route web.php & sidebar navigation | P1
- [ ] TU-006 | IzinSakit | Test: unit test approve/reject logic, feature test CRUD | P2
```

## Checklist Persiapan Sebelum Jalankan Auto-Aider:
- [ ] `git status` bersih (no uncommitted changes)
- [ ] `TODO.md` terisi task spesifik (satu task = satu unit kerja kecil)
- [ ] Baca `docs/lean-prd.md` gap yang relevan
- [ ] Jalankan: `aider-auto` (alias di fish config)

---
*Auto-aider akan membaca TODO.md berurutan, tugas yang dicentang = selesai.*