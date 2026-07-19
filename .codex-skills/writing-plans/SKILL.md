# Writing Plans

**When:** Need to break down feature/task into steps.

## Template:

```markdown
## Plan: [Feature Name]

### Context

- MVP #N from lean-prd.md
- Related files (from graphify query if needed)

### Steps

1. [Migration] Create table X
2. [Model] Add fillable, relationships
3. [Controller] CRUD methods
4. [View] Inertia page + components
5. [Route] Register in admin.php
6. [Test] Feature test for happy path
7. [Verify] Build + test + manual

### Risks

- [ ] Breaking change to API
- [ ] Migration data loss risk
```

## Principles:

- One step = one atomic change
- Include verification in each step
- Max 7 steps (cognitive load)
