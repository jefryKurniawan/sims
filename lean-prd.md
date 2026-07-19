# Lean PRD — Sekolahku (SIMS)

**Version**: 1.0
**Last Updated**: 2026-07-14
**Owner**: fry

## §1 — Product Overview

Sistem manajemen sekolah berbasis Laravel 9 + Inertia React + Tailwind CSS. Database: MySQL. ERP internal untuk migrasi operasi sekolah manual ke digital. Target hosting murah (shared hosting), performa maksimal.

## §2 — User Personas

- **Admin**: Mengelola data sekolah, user, keuangan, akademik
- **Guru**: Mengelola kelas, nilai, absensi
- **Siswa**: Melihat jadwal, nilai, rapor
- **Orang Tua**: Memantau progres anak via API Sanctum

## §3 — Features

### §3.1 — Autentikasi & RBAC

**Priority**: Must-Have
**User Story**: Sebagai Admin, saya ingin mengelola role dan permission, agar akses sesuai jabatan
**Acceptance Criteria**:

1. Login multi-role (Admin, Guru, Siswa)
2. Spatie Permission untuk RBAC
3. API Sanctum untuk Orang Tua
   **Out of Scope**:

- SSO / OAuth

### §3.2 — Manajemen Akademik

**Priority**: Must-Have
**User Story**: Sebagai Admin/Guru, saya ingin mengelola data akademik, agar operasional sekolah tercatat
**Acceptance Criteria**:

1. CRUD siswa, guru, kelas, mapel
2. Input nilai per siswa per mapel
3. Generate rapor
   **Out of Scope**:

- Integrasi dengan Dapodik

### §3.3 — Manajemen Keuangan

**Priority**: Should-Have
**User Story**: Sebagai Admin, saya ingin mencatat pembayaran SPP, agar laporan keuangan akurat
**Acceptance Criteria**:

1. Tagihan SPP per siswa
2. Pembayaran dicatat
3. Laporan per bulan

### §3.4 — Perpustakaan

**Priority**: Should-Have
**User Story**: Sebagai Admin/Guru, saya ingin mengelola perpustakaan, agar peminjaman tercatat
**Acceptance Criteria**:

1. CRUD buku
2. Peminjaman + pengembalian
3. PWA support (offline)

### §3.5 — Theme System

**Priority**: Must-Have
**User Story**: Sebagai Admin, saya ingin mengubah tema dashboard, agar sesuai branding sekolah
**Acceptance Criteria**:

1. 5 tema (navy, emerald, amber, rose, indigo)
2. Dark mode support
3. Tersimpan di database (settings.tema)

## §4 — Non-Functional Requirements

- Response time < 2s untuk 95% request
- Shared hosting compatible (no Redis, no Node runtime)
- Mobile-first untuk halaman public
- WCAG 2.1 AA

## §5 — Tech Stack

- Backend: Laravel 11, PHP 8.2+, Inertia.js
- Frontend: React 18 + TS, Vite + SWC, Tailwind CSS v4
- UI: shadcn/ui, Radix, TanStack Table
- Auth: Spatie Permission, Sanctum API

## §6 — Out of Scope (Global)

- Aplikasi mobile native
- Real-time chat
- E-learning / LMS
- Integrasi pembayaran online

## §7 — Changelog

- 2026-07-14: Initial PRD created
