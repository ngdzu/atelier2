# Quick Start Guide

## What Changed?

The static site generator has been **refactored** from a single 1,729-line file into a modular, testable architecture with 52 passing tests.

## Key Benefits

✅ **Modular** - Easy to find and modify code
✅ **Tested** - 52 tests ensure quality
✅ **Type-Safe** - TypeScript interfaces throughout
✅ **Maintainable** - Clear component structure
✅ **Same Output** - 100% backward compatible

## Commands

```bash
# Build the dashboard
npm run build

# Run tests
npm test

# Watch tests
npm run test:watch

# Preview locally
npm run serve
```

## Architecture at a Glance

```
src/
├── components/     # UI components (Header, Charts, Table, etc.)
├── utils/          # Utilities (colors, formatters)
├── styles/         # CSS
├── scripts/        # Client-side JS
├── __tests__/      # 52 tests
└── generator.ts    # Main file (178 lines, was 1729)
```

## Adding a New Component

1. Create file: `src/components/MyComponent.ts`
2. Define interface:
```typescript
export interface MyComponentProps {
  title: string;
}
```
3. Implement function:
```typescript
export function MyComponent({ title }: MyComponentProps): string {
  return `<div>${title}</div>`;
}
```
4. Add tests: `src/__tests__/MyComponent.test.ts`
5. Use in generator.ts

## Testing

All components are pure functions that return HTML strings:

```typescript
// Component
export function Header({ projectName }: HeaderProps): string {
  return `<header>${projectName}</header>`;
}

// Test
it('should render header', () => {
  const result = Header({ projectName: 'Test' });
  expect(result).toContain('Test');
});
```

## Debugging

Components are isolated, making debugging easy:
- **Error in Header** → Check `src/components/Header.ts`
- **Error in Chart** → Check `src/components/Charts.ts`
- **Error in Styles** → Check `src/styles/styles.ts`

## Documentation

- **README.md** - This guide
- **REFACTORING.md** - Full architecture docs
- **COMPARISON.md** - Before/after comparison
- **SUMMARY.md** - Executive summary

## Status

✅ **52/52 tests passing**
✅ **Build successful**
✅ **100% backward compatible**
✅ **Production ready**

---

**Need help?** Check [REFACTORING.md](REFACTORING.md) for detailed docs.
