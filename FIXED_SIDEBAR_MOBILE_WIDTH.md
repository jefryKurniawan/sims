# Sidebar Mobile Width Fix - TODO

## Issue
In `/home/fry/Documents/sekolah/sims/resources/js/Layout/Sidebar.tsx`, line 252, the mobile sidebar width incorrectly responds to the collapsed state:

```typescript
// CURRENT (INCORRECT FOR MOBILE):
className={`fixed inset-y-0 left-0 w-[${collapsed ? '4rem' : '18rem']} bg-navy-deep z-50 transform transition-transform duration-300 ease-out xl:hidden ${
  isOpen ? 'translate-x-0' : '-translate-x-full'
}`}
```

## Fix Needed
The mobile sidebar should maintain a fixed width when visible (not respond to collapsed state), since the collapsing feature is primarily useful on desktop/tablet where the sidebar is always visible.

```typescript
// CORRECTED:
className={`fixed inset-y-0 left-0 w-72 bg-navy-deep z-50 transform transition-transform duration-300 ease-out xl:hidden ${
  isOpen ? 'translate-x-0' : '-translate-x-full'
}`}
```

## Why This Matters
- **Mobile**: When sidebar is opened via hamburger menu, it should always be full width (w-72 / 18rem) for optimal usability
- **Desktop**: Sidebar is always visible and can be toggled between compact (icon-only) and full width via the topbar button
- **Current Bug**: On mobile, collapsing the sidebar also affects width, making it too narrow when opened