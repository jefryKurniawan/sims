# CLAUDE.md — Entry Point (Executor: fcc-claude)

> **Baca ini SETIAP sesi.** Pointer ke referensi utama — load on-demand.

---

## 📋 Referensi Utama (Load Saat Butuh)

| File | Fungsi | Command |
|------|--------|---------|
| `TASKS.md` | Status module (✅/🟡/🆕), priority | `cat TASKS.md` |
| `docs/lean-prd.md` | MVP roadmap, PRD, acceptance criteria | `cat docs/lean-prd.md` |
| `MEMORY.md` | Cross-session lessons, best practices | `cat MEMORY.md` |
| `RULES.md` | Konvensi coding, git, naming, constraints | `cat RULES.md` |

---

## 🔄 Workflow Standar (Fase 0 → 3)

### Fase 0: Orientasi (Wajib setiap task)
```bash
graphify query "<domain-task>"     # Pahami arsitektur & file terkait
```

### Fase 1: Design Review (Jika >2 file / PRD-related)
```bash
/advisor "<deskripsi task>"        # Review approach → tunggu APPROVED
```

### Fase 2: Eksekusi
```bash
skill <nama-skill>                 # Load skill (spec-first, prd-driven, sql-review, owasp-review, verify)
# Coding + MCP verifikasi (database-mcp, php-mcp via Bash)
graphify update .                   # Sync knowledge graph setelah edit
```

### Fase 3: Verifikasi
```bash
/verify                            # Adversarial check + PRD compliance
# Jika passes: true → selesai / commit manual
```

---

## 🤖 Autonomy Rules

- **JANGAN tanya** izin baca/cek file → langsung eksekusi
- **HANYA tanya user** jika: task ∉ `lean-prd.md`, konflik req, butuh keputusan bisnis, mau commit/push

---

## ⚙️ Stack & Constraints

- **Backend:** Laravel 11, PHP 8.2+, Inertia.js (SSR off)
- **Frontend:** React 18 + TypeScript + Vite/SWC + Tailwind CSS v4
- **UI:** shadcn/ui + Radix, @tanstack/react-table, lucide-react
- **Auth:** Spatie Permission (RBAC), Sanctum (API)
- **Queue/Session/Cache:** Database driver (shared hosting, no Redis)
- **Deploy:** `pnpm run build` → `public/build/` (no Node.js on server)

---

## 🚫 Hard Rules (Non-Negotiable)

1. **Ponytail** — solusi paling sederhana yang bekerja
2. **Atomic task** — satu fokus per task
3. **Min 1 test** untuk logika baru
4. **Migrasi reversible** — `down()` konsisten dengan `up()`
5. **Aksesibilitas** — WCAG 2.1 AA
6. **Shared hosting** — no Redis/Node.js server
7. **LoopKit skills WAJIB** — load skill sebelum coding
8. **Graphify WAJIB** — query graph sebelum baca file
9. **MCP via Bash** — `php artisan`, `mysql`, `grep` untuk verifikasi
10. **No .env commit** — pakai `.env.example`
11. **No auto commit/push/add** — user commit manual
12. **No `migrate:fresh`, `drop table`, `rm -rf`, `force-push`, `sudo`**
13. **`/clear` tiap 30 menit** — baca `MEMORY.md` awal sesi

---

## 🔧 MCP & Skills

- **MCP:** Hanya Context7 aktif (`.mcp.json`) — gunakan Bash untuk DB/PHP verification
- **Skills:** 49 LoopKit skills auto-trigger via YAML — load manual via `skill <name>` saat perlu
- **Graphify:** Manual on-demand (`graphify query "X"`), auto-sync via Stop hook