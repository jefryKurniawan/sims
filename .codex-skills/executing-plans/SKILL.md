# Executing Plans

**When:** Have a plan, need to implement step by step.

## Rules:

- Follow plan order strictly, no jumping ahead
- Complete each step fully before next
- If step fails → STOP, debug (use systematic-debugging), then retry
- Mark step done only after verification
- If plan needs change → update plan first, then continue

## Verification per step:

- Code compiles/builds
- Relevant tests pass
- No new lint errors
