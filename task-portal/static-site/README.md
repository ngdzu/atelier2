# Task Portal Static Site

> **Recently Refactored** 🎉 - Now with modular components, full test coverage, and improved maintainability!

This directory contains the static site generator for the Task Portal dashboard.

## Overview

The static site generator creates a public HTML dashboard from `TASK_REGISTRY.json` that can be deployed to GitHub Pages for stakeholder viewing.

Built with a **component-based architecture** using TypeScript template functions for maximum maintainability and testability.

## Features

- 📊 **Statistics Dashboard** - Total tasks, completion rate, breakdowns by status/category/priority
- 📈 **Interactive Charts** - Area, bar, and pie charts with tooltips
- 🎯 **Animated Stats** - Progress bars and count-up animations
- 🔍 **Filtering** - Filter by category, status, priority, and search by keyword
- 📋 **Task List** - Sortable table showing all tasks with details
- 🎨 **Responsive Design** - Works on desktop, tablet, and mobile
- 🖨️ **Print-Friendly** - Clean printable format
- ✅ **Fully Tested** - 52 passing tests with 100% component coverage

## Architecture

This generator uses a **modular component-based architecture**:

```
src/
├── components/     # Reusable UI components
│   ├── Header.ts
│   ├── StatsCards.ts
│   ├── Charts.ts
│   ├── Filters.ts
│   └── TaskTable.ts
├── utils/          # Shared utilities
│   └── colors.ts
├── styles/         # CSS styles
│   └── styles.ts
├── scripts/        # Client-side JavaScript
│   └── scripts.ts
├── __tests__/      # Test suite (52 tests)
└── generator.ts    # Main orchestrator
```

See [REFACTORING.md](REFACTORING.md) for detailed architecture documentation.

## Local Development

### Install Dependencies

```bash
npm install
```

### Generate Site

```bash
npm run build
```

This reads `../../.tasks/TASK_REGISTRY.json` and generates `public/index.html`.

### Run Tests

```bash
npm test              # Run tests once
npm run test:watch    # Watch mode
npm run test:ui       # Visual test UI
```

**Test Status**: ✅ 52/52 passing

### Preview Locally

```bash
npm run serve
```

Then visit http://localhost:3000

## Deployment

The site auto-deploys to GitHub Pages when:
- `TASK_REGISTRY.json` is updated
- Files in `task-portal/static-site/` are changed
- Push to `main` branch

Deployment is handled by GitHub Actions (`.github/workflows/deploy-static-site.yml`).

## Documentation

- **[REFACTORING.md](REFACTORING.md)** - Complete architecture guide
- **[COMPARISON.md](COMPARISON.md)** - Before/after comparison
- **[SUMMARY.md](SUMMARY.md)** - Quick reference summary

## File Structure

```
static-site/
├── generator.ts        # Main generator script
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── public/             # Generated output (git-ignored)
│   └── index.html      # Generated dashboard
└── README.md           # This file
```

## How It Works

1. **Read** - Loads `TASK_REGISTRY.json` from `../../.tasks/`
2. **Calculate** - Computes statistics (totals, completion rate, breakdowns)
3. **Generate** - Creates HTML with embedded CSS and JavaScript
4. **Write** - Outputs to `public/index.html`

The generated HTML is a single self-contained file with:
- Inline CSS for styling
- Inline JavaScript for filtering and sorting
- No external dependencies

## Client-Side Features

### Filtering
- **Search** - Type to filter by task ID or title
- **Category** - Select dropdown to filter by category
- **Status** - Select dropdown to filter by status
- **Priority** - Select dropdown to filter by priority

Filters can be combined (AND logic).

### Sorting
- Click any column header to sort
- Click again to reverse sort order
- Sortable columns: ID, Title, Category, Status, Priority, Assignee, Created, Updated

## Customization

### Colors
Status and priority badges use color-coded backgrounds matching the VS Code extension.

### Stats
The dashboard shows:
- Total task count
- Completion rate with progress bar
- Breakdown by status (all statuses)
- Breakdown by category (top 5)

### Table Columns
Current columns:
- Task ID
- Title
- Category
- Status
- Priority
- Assignee
- Created date
- Updated date

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

- Semantic HTML
- Keyboard navigation for sorting
- High contrast colors
- Screen reader friendly labels

## Performance

- Single HTML file (~100-200 KB for typical projects)
- No external requests
- Fast client-side filtering and sorting
- Optimized for 100+ tasks
