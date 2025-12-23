# Task Portal System

A comprehensive task management system for VS Code that parses Markdown task files, provides a rich webview UI, and generates static HTML dashboards.

![Task Portal](https://img.shields.io/badge/status-production-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![VS Code](https://img.shields.io/badge/VS%20Code-Extension-blue)

## 📋 Overview

The Task Portal System is a complete solution for managing development tasks directly within your project repository. It consists of four integrated components:

1. **Parser** - Converts `.task` Markdown files into structured JSON
2. **Extension** - VS Code extension with webview UI for task management
3. **Core** - Shared utilities and type definitions
4. **Static Site** - Generates public HTML dashboards for stakeholders

## ✨ Features

### 📊 Statistics Dashboard
- Total task count, completion rate, and category breakdown
- Visual progress indicators and status distribution
- Time-based analytics (velocity, burnup charts)

### 📝 Task List View
- Filter by status, category, priority, and assignee
- Full-text search across task IDs and titles
- Sortable columns with multi-level sorting
- Pagination for large task sets

### 🎯 Kanban Board
- Drag-and-drop task cards between status columns
- Visual swimlanes by category or assignee
- Color-coded priorities and status indicators
- Responsive design with horizontal scrolling

### 📈 Analytics & Reporting
- Velocity charts (8-week task completion trends)
- Burnup charts (cumulative progress tracking)
- Workload distribution by assignee
- Bottleneck identification
- CSV/JSON data export

### 📅 Timeline View
- Gantt chart visualization of tasks over time
- Dependency arrows showing task relationships
- Zoom controls (day/week/month views)
- Status-based color coding

### 🌐 Static Site Generator
- Public HTML dashboard generated from task data
- Client-side filtering and sorting
- Responsive design for all devices
- Auto-deploys to GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- VS Code 1.85+
- A project with `.task` files in a `.tasks/` directory

### Installation

1. **Clone and install dependencies:**

```bash
# From the project root
cd task-portal

# Install all packages
npm install --workspaces
```

2. **Build all components:**

```bash
# Build parser
cd parser
npm run build

# Build extension webview
cd ../extension/webview
npm run build

# Build extension
cd ..
npm run build

# Build static site generator
cd ../static-site
npm run build
```

### Usage

#### 1. Parse Tasks and Generate Registry

```bash
cd task-portal/parser
node dist/cli.js sync ../../.tasks ../../.tasks/TASK_REGISTRY.json
```

Or use watch mode for auto-sync:

```bash
node dist/cli.js watch ../../.tasks ../../.tasks/TASK_REGISTRY.json
```

#### 2. Run VS Code Extension

1. Open the project in VS Code
2. Press `F5` to launch Extension Development Host
3. In the new window, run **Task Portal: Open Portal** from Command Palette (`Cmd+Shift+P`)

#### 3. Generate Static Site

```bash
cd task-portal/static-site
npm run build  # Generates public/index.html
```

Deploy to GitHub Pages (see [static-site/README.md](static-site/README.md) for GitHub Actions setup).

## 📁 Project Structure

```
task-portal/
├── core/               # Shared utilities and types
│   ├── src/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── registry.ts
│   │   └── providers/
│   └── package.json
│
├── parser/             # Markdown → JSON parser
│   ├── src/
│   │   ├── cli.ts      # CLI entry point
│   │   ├── parser.ts   # Main parser logic
│   │   ├── schema.ts   # Zod validation schemas
│   │   └── validator.ts
│   ├── tests/
│   └── package.json
│
├── extension/          # VS Code extension
│   ├── src/
│   │   ├── extension.ts       # Extension entry point
│   │   ├── webviewProvider.ts # Webview management
│   │   ├── taskProvider.ts    # Task data provider
│   │   └── fileWatcher.ts     # File change detection
│   ├── webview/        # React UI
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── TimelineView.tsx
│   │   │   │   └── AnalyticsDashboard.tsx
│   │   │   └── utils/
│   │   └── package.json
│   └── package.json
│
└── static-site/        # Static HTML generator
    ├── generator.ts    # HTML generation script
    ├── public/         # Output directory
    └── package.json
```

## 📝 Task File Format

Tasks are written in Markdown with YAML-like frontmatter:

```markdown
## TASK-FEAT-001: Implement User Authentication

**Status:** IN_PROGRESS
**Priority:** HIGH
**Assignee:** developer@example.com
**Created:** 2025-01-15
**Updated:** 2025-01-20
**Estimated Time:** 8 hours
**Dependencies:** TASK-FEAT-002
**Related Tasks:** TASK-FEAT-003, TASK-FEAT-004

### Description

Implement JWT-based user authentication with email/password login.

### Requirements / What to Do

#### Step 1: Set Up Authentication Middleware
- [ ] Install passport.js
- [ ] Configure JWT strategy
- [ ] Create authentication middleware

#### Step 2: Create Login Endpoint
- [ ] Design login API endpoint
- [ ] Implement password hashing
- [ ] Return JWT tokens

### Definition of Done (DoD)

- [ ] Users can log in with email/password
- [ ] JWT tokens are generated correctly
- [ ] Tests written and passing
- [ ] Documentation updated

---
```

## 🔧 Configuration

### Extension Settings

The extension reads `TASK_REGISTRY.json` from your workspace's `.tasks/` directory. Configure file watching behavior in `.vscode/settings.json`:

```json
{
  "taskPortal.autoSync": true,
  "taskPortal.syncOnSave": true,
  "taskPortal.registryPath": ".tasks/TASK_REGISTRY.json"
}
```

### Parser Options

Configure parsing behavior via CLI flags:

```bash
# Sync with verbose output
node dist/cli.js sync .tasks TASK_REGISTRY.json --verbose

# Watch mode with custom debounce
node dist/cli.js watch .tasks TASK_REGISTRY.json --debounce 3000
```

## 🧪 Testing

Each component has its own test suite:

```bash
# Test parser
cd parser
npm test

# Test extension
cd extension/webview
npm test

# Run all tests
npm test --workspaces
```

## 🛠️ Development

### Parser Development

```bash
cd parser
npm run watch  # Auto-rebuild on changes
npm run dev src/cli.ts sync ../../.tasks ../../.tasks/TASK_REGISTRY.json
```

### Extension Development

```bash
# Terminal 1: Watch webview
cd extension/webview
npm run dev

# Terminal 2: Watch extension
cd extension
npm run watch

# Terminal 3 (VS Code): Press F5 to launch Extension Development Host
```

### Static Site Development

```bash
cd static-site
npm run watch  # Auto-rebuild on changes
npx serve public  # Preview in browser
```

## 📚 Documentation

Each component has detailed documentation:

- [Parser Documentation](parser/README.md)
- [Extension Documentation](extension/README.md)
- [Static Site Documentation](static-site/README.md)
- [Core Library Documentation](core/README.md)

## 🤝 Contributing

### Adding a New Task

1. Create a `.task` file in `.tasks/` directory
2. Use the task template format (see above)
3. Assign a unique task ID following the pattern `TASK-<CATEGORY>-<NUMBER>`
4. Run parser to sync: `node task-portal/parser/dist/cli.js sync`
5. Update `TASK_REGISTRY.md` with new task entry

### Adding Features to the Portal

1. Identify which component needs changes (parser/extension/static-site)
2. Update TypeScript types in `core/src/types.ts` if needed
3. Implement changes in respective component
4. Add tests for new functionality
5. Update documentation
6. Build and test all components

## 🐛 Troubleshooting

### Extension doesn't show tasks

1. Ensure `TASK_REGISTRY.json` exists in `.tasks/` directory
2. Validate JSON structure: `node parser/dist/cli.js validate .tasks/TASK_REGISTRY.json`
3. Check VS Code Output panel for error messages
4. Rebuild webview: `cd extension/webview && npm run build`

### Parser fails to sync

1. Check `.task` file syntax (proper headers, metadata format)
2. Run with verbose flag: `node dist/cli.js sync .tasks TASK_REGISTRY.json --verbose`
3. Validate individual `.task` files for formatting errors
4. Check for duplicate task IDs

### Static site shows no data

1. Ensure `TASK_REGISTRY.json` is up to date
2. Rebuild: `cd static-site && npm run build`
3. Check browser console for JavaScript errors
4. Verify JSON is accessible at runtime

## 📊 Statistics

Current project status (as of December 2025):

- **Total Tasks:** 19
- **Completed:** 12 (63%)
- **In Progress:** 1
- **Pending:** 6
- **Categories:** 14 (FEAT, BUG, OPS, UI, PERF, etc.)

## 📄 License

This project is part of the Atelier2 workspace and follows the same license.

## 🙏 Acknowledgments

Built with:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Zod](https://zod.dev/)
- [Recharts](https://recharts.org/)
- [@dnd-kit](https://dndkit.com/)
- [VS Code Extension API](https://code.visualstudio.com/api)

---

**Last Updated:** December 22, 2025
