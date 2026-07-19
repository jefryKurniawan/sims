# Systematic Debugging

**When:** Error, bug, unexpected behavior.

## Steps:

1. **Reproduce** - Minimal repro case, exact steps
2. **Isolate** - Narrow scope: which file/function/line
3. **Root cause** - Why it happens (not symptom)
4. **Fix** - Minimal change at root cause
5. **Verify** - Test reproducer passes, no regression

## Principles:

- Fix once in shared code, not every caller
- Add one assert/test that fails if logic breaks
- Check graphify for related code before changing
