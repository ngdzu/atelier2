# Testing Guide

This guide explains how to run tests, understand test coverage, and contribute to the test suite for the LuxeNail salon website.

## Quick Start

```bash
# Run all tests
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI (interactive)
npm run test:ui
```

## Test Structure

Tests are organized in the `components/tests/` directory:

```
client/
├── components/
│   ├── tests/
│   │   ├── utils/
│   │   │   ├── test-utils.tsx      # Custom render function with providers
│   │   │   └── mocks.ts            # Mock data and services
│   │   ├── setup.ts                # Test setup and global mocks
│   │   ├── AboutPage.test.tsx
│   │   ├── AppointmentCalendar.test.tsx
│   │   ├── BookingFlow.test.tsx
│   │   ├── Footer.test.tsx
│   │   ├── GalleryPage.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── LandingPage.test.tsx
│   │   ├── Layout.test.tsx
│   │   ├── MarketingCenter.test.tsx
│   │   ├── PerformanceDashboard.test.tsx
│   │   └── ScrollToTop.test.tsx
```

## Test Framework

- **Test Runner**: Vitest (fast, Vite-native testing)
- **Testing Library**: React Testing Library (focus on user behavior)
- **Coverage**: @vitest/coverage-v8

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render without errors', () => {
    const { container } = customRender(<MyComponent />);
    expect(container).toBeInTheDocument();
  });

  it('should display expected content', () => {
    customRender(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Testing with User Interactions

```typescript
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should handle button click', async () => {
  const handleClick = vi.fn();
  customRender(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByText('Click me');
  await userEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing with Services

Services are automatically mocked. Use the mock implementations from `utils/mocks.ts`:

```typescript
import { mockDataService } from './utils/mocks';

// Mock is automatically set up
// You can override mock implementations:
mockDataService.getServices.mockResolvedValue([myMockService]);

// Test your component
customRender(<MyComponent />);

// Verify service was called
await waitFor(() => {
  expect(mockDataService.getServices).toHaveBeenCalled();
});
```

## Test Coverage

### Coverage Requirements

- **Minimum Threshold**: 80% for all metrics
  - Lines: 80%
  - Functions: 80%
  - Branches: 80%
  - Statements: 80%

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Exclusions

The following are excluded from coverage:
- Test files (`*.test.tsx`, `*.spec.tsx`)
- Configuration files
- Build artifacts
- Node modules

## Pre-commit Hooks

Pre-commit hooks automatically run before each commit:

1. **Linting**: Runs ESLint on staged files
2. **Formatting**: Formats code with Prettier
3. **Tests**: Runs full test suite
4. **Coverage Check**: Ensures coverage meets 80% threshold

### Bypassing Hooks (Not Recommended)

If you need to bypass hooks (e.g., for WIP commits):

```bash
git commit --no-verify -m "WIP: work in progress"
```

**Note**: Only bypass hooks for work-in-progress commits. All final commits should pass all checks.

## Running Linters

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

## Test Utilities

### Custom Render Function

Use `customRender` from `test-utils.tsx` instead of the default `render`. It includes:
- React Router (BrowserRouter)
- Other providers as needed

```typescript
import { render as customRender } from './utils/test-utils';

// Use customRender instead of render
customRender(<Component />);
```

### Mock Data

Use mock data from `utils/mocks.ts`:

```typescript
import { mockService, mockEmployee, mockCustomer } from './utils/mocks';
```

## Best Practices

1. **Test User Behavior**: Focus on what users see and do, not implementation details
2. **Keep Tests Simple**: One assertion per test when possible
3. **Use Descriptive Names**: Test names should clearly describe what is being tested
4. **Mock External Dependencies**: Mock services, APIs, and external libraries
5. **Test Edge Cases**: Test error states, loading states, and edge cases
6. **Avoid Testing Implementation**: Don't test React internals or component state directly

## Common Patterns

### Testing Async Operations

```typescript
import { waitFor } from '@testing-library/react';

it('should load data', async () => {
  customRender(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded data')).toBeInTheDocument();
  });
});
```

### Testing Forms

```typescript
import userEvent from '@testing-library/user-event';

it('should submit form', async () => {
  const user = userEvent.setup();
  customRender(<Form onSubmit={mockSubmit} />);
  
  await user.type(screen.getByLabelText('Name'), 'John');
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(mockSubmit).toHaveBeenCalledWith({ name: 'John' });
});
```

### Testing Router Navigation

```typescript
import { render as customRender } from './utils/test-utils';
import { screen } from '@testing-library/react';

// Components using useNavigate or Link are automatically wrapped with Router
customRender(<NavComponent />);

const link = screen.getByText('Home');
expect(link).toHaveAttribute('href', '/');
```

## Troubleshooting

### Tests Fail on Coverage

If tests fail due to coverage threshold:

1. Run `npm run test:coverage` to see detailed coverage report
2. Identify components/files below 80% coverage
3. Add tests for missing coverage
4. Focus on uncovered branches and functions

### Pre-commit Hook Fails

If pre-commit hook fails:

1. Check the error message
2. Fix linting errors: `npm run lint:fix`
3. Fix test failures
4. Ensure coverage meets threshold
5. Try committing again

### Tests are Slow

- Use `test:watch` for development (only runs changed tests)
- Use `test:ui` for interactive testing
- Check for unnecessary `waitFor` calls
- Ensure mocks are properly set up

## CI/CD Integration

Tests run automatically in CI/CD pipelines:

```bash
# CI test command
npm run test:ci

# CI lint command
npm run lint:ci
```

Both commands fail on errors and are suitable for CI environments.

## Adding New Tests

When adding a new component:

1. Create test file: `components/tests/ComponentName.test.tsx`
2. Follow existing test patterns
3. Ensure coverage meets 80% threshold
4. Update this documentation if needed

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

