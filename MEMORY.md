# MEMORY — Cross-Session Learning

## 2026-07-14 — Initial Setup

- Fixed global `~/.codex/hooks.json` — changed relative to absolute path
- Created project `.codex/` dir with scripts: verify-with-advisor, execute-task, model-router
- Created `.codex/config.toml` with model defs + timeouts
- Created `run-codex.sh` loop runner
- Created `.claude/skills/prd-driven/SKILL.md` — PRD-first workflow enforcement
- Created `lean-prd.md` — source of truth PRD for Sekolahku project
- Registered pre/post tool hooks in `.codex/hooks.json`
- Created `next-task.sh` — interactive phase selector, generates PROMPT.md per phase
- Updated `run-codex.sh` — now reads PROMPT.md + TASKS_TU_MANAGEMENT.md

## 2026-07-15 — Config Optimization & TU Completion

- **Config changes**:
    - `.codex/config.toml`: `max_concurrency 1→3`, `window_seconds 5→3`, added model comments
    - `.codex/hooks.json`: migrated from .sh scripts to inline commands for hooks
    - PostToolUse: combined auto-format + sync in single inline command
    - Security: relaxed `allow_paths` to include trash, narrowed `deny_commands` pattern
- **Task tracking**:
    - Created `TASKS.md` — global module tracking (replaces TASKS_TU_MANAGEMENT.md scope)
    - All 21+ admin modules mapped with status (✅/🟡/🔴/🆕)
- **TU module status**: 4 controllers + all frontend pages implemented but UNCOMMITTED
- **Known gaps**:
    - `ArsipAkreditasi` filter sub_standar UI verification
    - `NisnManagement` Dapodik sync integration (service exists, controller partial)
    - `SaranaPrasarana` Create page (untracked)
    - `Laporan` module (untracked)

## 2026-07-15 — TU Module Completion + Laporan Fix

- **Features committed (5908cb2)**:
    - TU Management: Surat Masuk/Keluar (CRUD + disposisi/auto-nomor), Arsip Akreditasi (tree view), NISN Management (Dapodik sync integrated)
    - Buku Induk Digital: 4 tabel (profil, rekam_medis, orang_tua, mutasi), CRUD + cetak
    - Laporan module: Added 4 missing report types (perpustakaan, sarana, spmb, erapor), fixed export/print columns
    - Sarana Prasarana: Create page frontend completed
- **NISN Dapodik sync**: Fully implemented (controller + service + frontend)
- **Known gaps resolved**: Arsip Akreditasi sub_standar filter verified working; Laporan module complete

## 2026-07-16 — TU Module Complete + Workflow Migration

- **TU + BukuInduk + Laporan modules committed** (commit `5908cb2`): 21+ admin modules now ✅ Done
- **Workflow shift**: Hook-first (PreToolUse format + skill inject, PostToolUse format + sync) + MEMORY.md/TASKS.md as persistent context
- **Graphify removed** (2026-07-16): Tidak dipakai lagi, dihapus dari semua config
- **Config cleanup pending**: Project-level `opencode.jsonc` (Context7 only), `reasoningEffort: "low"`, disable unused MCP servers
- **Model routing**: Switch default off Nemotron 550B → Sonnet 4 / Opus 4 via fcc-server

## Workflow Notes (Updated 2026-07-16)

- **Small task**: Chat langsung dengan prompt spesifik + PRD reference
- **Big task (multi-phase)**: `/advisor` → design review → `/plan` → implement → `/verify`
- **Context persistence**: `MEMORY.md` (cross-session lessons) + `TASKS.md` (module status)
- **Hook orchestration**: PreToolUse → format + skill inject; PostToolUse → format + sync; Stop → TASKS.md sync
- **Priority P0**: opencode.jsonc cleanup, switch default model off Nemotron 550B, project opencode.jsonc (Context7 only)

## 2026-07-17 — trace-mcp Integration

- **Installed globally**: `npm install -g trace-mcp` + `trace-mcp init` (Max enforcement, all 4 clients)
- **Project registered**: `trace-mcp add` in `/home/fry/Documents/sekolah/sims` — indexed 638 files (PHP + Vue/TS)
- **MCP clients configured**: Codex, Hermes Agent, Antigravity, Claude Code
- **AGENTS.md updated**: Added trace-mcp tool routing table (MANDATORY for code exploration)
- **RULES.md updated**: Added trace-mcp Tool Routing section at end
- **First session with trace-mcp**: Start with `get_project_map` (summary_only=true), then use tools per table

**Benchmark (trace-mcp benchmark .)**:
- ~87% token savings on code exploration
- 641 files / 1,822 symbols indexed
- Best savings: type_hierarchy (99%), call_graph (94%), impact_analysis (95%)
