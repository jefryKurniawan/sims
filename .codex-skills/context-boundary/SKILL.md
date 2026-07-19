# Context Boundary Enforcer

**MANDATORY - Run at START of every task.**

## Allowed Context (ONLY these 3 files):

1. `docs/lean-prd.md` - Roadmap, MVP priorities, success metrics
2. `RULES.md` - Conventions, coding standards, architecture rules
3. `AGENTS.md` - This instruction file, commands, structure

## FORBIDDEN without explicit user request:

- ❌ Reading source code (`app/`, `resources/`, `routes/`, `database/`, `Modules/`)
- ❌ Reading migrations, seeders, models, controllers, views
- ❌ Running `graphify query` for implementation details
- ❌ Reading test files
- ❌ Any file not in the 3 allowed list

## Exception Protocol:

User MUST say: "Baca file X untuk konteks implementasi"
Only THEN read that specific file.

## Self-Check (ask before ANY action):

"Apakah saya butuh baca file di luar 3 file di atas?"
If YES → STOP, ask user permission.
