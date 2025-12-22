# Task Portal Parser

A TypeScript parser for `.task` Markdown files that generates a structured JSON registry.

## Features

- 📝 Parse `.task` Markdown files
- ✅ Zod schema validation
- 🔍 Detect duplicate IDs and circular dependencies
- 📊 Progress calculation from checklists
- ⚡ Watch mode for auto-sync
- 🎨 Colorful CLI output
- 📈 Statistics reporting

## Installation

```bash
cd task-portal/parser
npm install
npm run build
```

## Usage

### CLI Commands

**Sync all .task files:**

```bash
npm run dev src/cli.ts sync .tasks TASK_REGISTRY.json
```

Or after building:

```bash
task-parser sync [tasks-dir] [output-file]
```

**Watch for changes:**

```bash
task-parser watch .tasks TASK_REGISTRY.json
```

**Validate registry:**

```bash
task-parser validate TASK_REGISTRY.json
```

**Show statistics:**

```bash
task-parser stats TASK_REGISTRY.json
```

### Programmatic Usage

```typescript
import { parseTaskFiles, validateTaskRegistry } from '@task-portal/parser';

// Parse all .task files
const registry = await parseTaskFiles('.tasks');

// Validate
const validation = validateTaskRegistry(registry);
if (!validation.valid) {
  console.error(validation.errors);
}

// Write to file
await fs.writeFile(
  'TASK_REGISTRY.json',
  JSON.stringify(registry, null, 2)
);
```

## Task File Format

Tasks should be formatted as Markdown with specific headers and metadata:

```markdown
## TASK-FEAT-001: Task Title

**Status:** PENDING  
**Priority:** MEDIUM  
**Assignee:** username  
**Created:** 2025-01-15  
**Updated:** 2025-01-15  
**Estimated Time:** 4 hours  
**Dependencies:** TASK-FEAT-002, TASK-FEAT-003  
**Related Tasks:** TASK-DOC-001

Brief description of the task.

### Requirements

- [ ] Requirement 1
- [ ] Requirement 2
- [x] Completed requirement

### Definition of Done

Criteria for completion.

### Technical Details

Implementation details.
```

## Schema

The parser generates a JSON registry with the following structure:

```typescript
interface TaskRegistry {
  metadata: {
    version: string;
    lastUpdated: string;
    totalTasks: number;
    lastSync: string;
  };
  categories: Record<CategoryCode, Category>;
  tasks: Task[];
}
```

### Category Codes

- `FEAT` - New features
- `BUG` - Bug fixes
- `ENH` - Enhancements
- `REF` - Refactoring
- `UI` - UI/UX improvements
- `API` - API changes
- `DB` - Database changes
- `TEST` - Testing
- `DOC` - Documentation
- `OPS` - Operations/DevOps
- `SEC` - Security
- `PERF` - Performance
- `A11Y` - Accessibility
- `CONFIG` - Configuration

### Task Statuses

- `PENDING` - Not started
- `IN_PROGRESS` - Currently working
- `BLOCKED` - Blocked by dependencies
- `COMPLETED` - Finished
- `CANCELLED` - Cancelled

### Task Priorities

- `LOW` - Low priority
- `MEDIUM` - Medium priority
- `HIGH` - High priority
- `CRITICAL` - Critical/urgent

## Example

An example TASK_REGISTRY.json file is provided in [examples/TASK_REGISTRY.example.json](examples/TASK_REGISTRY.example.json) demonstrating the complete schema with sample tasks:

- **TASK-FEAT-001**: Completed feature (100% progress)
- **TASK-FEAT-002**: In-progress feature with dependencies (40% progress)
- **TASK-BUG-001**: Blocked critical bug (0% progress)
- **TASK-DOC-001**: Pending documentation task

**Test with example:**

```bash
# Validate example file
npm run dev src/cli.ts validate examples/TASK_REGISTRY.example.json

# View example stats
npm run dev src/cli.ts stats examples/TASK_REGISTRY.example.json
```

**Example tests verify:**
- Valid JSON parsing and schema compliance
- All 14 category definitions
- Diverse task statuses, priorities, and categories
- Task dependencies and relationships
- Progress tracking calculations
- Metadata consistency
- Date format validation
- And 12 more validation checks

Run: `npm test -- tests/example.test.ts`

## Development

**Build:**

```bash
npm run build
```

**Watch mode:**

```bash
npm run watch
```

**Run tests:**

```bash
npm test
```

**Coverage:**

```bash
npm run test:coverage
```

**Dev mode:**

```bash
npm run dev src/cli.ts sync .tasks
```

## Validation

The parser performs comprehensive validation:

- **Schema validation:** All fields match expected types
- **Duplicate detection:** No duplicate task IDs
- **Dependency checking:** All dependencies exist
- **Circular dependency detection:** No dependency cycles
- **Category consistency:** Last numbers match actual tasks
- **Metadata accuracy:** Total counts match actual data

## Output Format

The generated `TASK_REGISTRY.json` contains:

```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-01-15T10:30:00.000Z",
    "totalTasks": 12,
    "lastSync": "2025-01-15T10:30:00.000Z"
  },
  "categories": {
    "FEAT": {
      "name": "Feature",
      "code": "FEAT",
      "description": "New features and major additions",
      "lastNumber": 12,
      "nextAvailable": 13
    }
  },
  "tasks": [
    {
      "id": "TASK-FEAT-001",
      "category": "FEAT",
      "number": 1,
      "title": "Design and Plan Task Portal System",
      "status": "COMPLETED",
      "priority": "HIGH",
      "assignee": "team",
      "created": "2025-01-10",
      "updated": "2025-01-15",
      "estimatedTime": "8 hours",
      "actualTime": "6 hours",
      "dependencies": [],
      "relatedTasks": [],
      "file": "portal.task",
      "filePath": ".tasks/portal.task",
      "description": "Plan the task portal system...",
      "sections": {
        "requirements": "...",
        "definitionOfDone": "...",
        "technicalDetails": "..."
      },
      "progress": {
        "completed": 8,
        "total": 10,
        "percentage": 80
      }
    }
  ]
}
```

## License

MIT
