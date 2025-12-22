# Task Registry

This file tracks all task IDs and their current numbering to ensure unique, sequential task IDs across the project.

## Task Numbering Reference

Last updated: 2025-01-21

| Category      | Code   | Last Number | Next Available |
| ------------- | ------ | ----------- | -------------- |
| Feature       | FEAT   | 013         | 014            |
| Bug Fix       | BUG    | 000         | 001            |
| Enhancement   | ENH    | 000         | 001            |
| Refactoring   | REF    | 000         | 001            |
| UI/UX         | UI     | 001         | 002            |
| API           | API    | 000         | 001            |
| Database      | DB     | 000         | 001            |
| Testing       | TEST   | 000         | 001            |
| Documentation | DOC    | 000         | 001            |
| DevOps        | OPS    | 003         | 004            |
| Security      | SEC    | 000         | 001            |
| Performance   | PERF   | 001         | 002            |
| Accessibility | A11Y   | 000         | 001            |
| Configuration | CONFIG | 000         | 001            |

## All Tasks Index

### DevOps (OPS)

| Task ID      | Title                                                     | Status      | File       | Created    |
| ------------ | --------------------------------------------------------- | ----------- | ---------- | ---------- |
| TASK-OPS-001 | Set Up Docker Infrastructure for Client and Microservices | IN_PROGRESS | infra.task | 2025-01-20 |
| TASK-OPS-002 | Set Up Testing Infrastructure and Pre-commit Hooks        | COMPLETED   | infra.task | 2025-01-20 |
| TASK-OPS-003 | Set Up Backend Server Microservice and Database Container | PENDING     | infra.task | 2025-12-21 |

### Feature (FEAT)

| Task ID       | Title                              | Status  | File                 | Created    |
| ------------- | ---------------------------------- | ------- | -------------------- | ---------- |
| TASK-FEAT-001 | Design and Plan Task Portal System | PENDING | portal.task          | 2025-12-21 |
| TASK-FEAT-002 | Create Task Parser and JSON Schema | PENDING | portal.task          | 2025-12-21 |
| TASK-FEAT-003 | Migrate Existing Tasks to JSON     | PENDING | portal.task          | 2025-12-21 |
| TASK-FEAT-004 | Build VS Code Extension Foundation | PENDING | portal-phase2.task   | 2025-12-21 |
| TASK-FEAT-005 | Build Task Portal Webview UI       | PENDING | portal-phase2.task   | 2025-12-21 |
| TASK-FEAT-006 | Add Statistics Dashboard           | PENDING | portal-phase2.task   | 2025-12-21 |
| TASK-FEAT-007 | Add Kanban Board View              | PENDING | portal-phase3-5.task | 2025-12-21 |
| TASK-FEAT-008 | Add Quick Actions                  | PENDING | portal-phase3-5.task | 2025-12-21 |
| TASK-FEAT-009 | Add Progress Tracking              | PENDING | portal-phase3-5.task | 2025-12-21 |
| TASK-FEAT-010 | Build Static Site Generator        | PENDING | portal-phase4.task   | 2025-12-21 |
| TASK-FEAT-011 | Add Timeline View                  | PENDING | portal-phase5.task   | 2025-12-21 |
| TASK-FEAT-012 | Add Analytics & Reporting          | PENDING | portal-phase5.task   | 2025-12-21 |
| TASK-FEAT-013 | Generate and Organize Gallery Photo Dataset | PENDING | gallery.task | 2025-01-21 |

### Bug Fix (BUG)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Enhancement (ENH)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Refactoring (REF)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### UI/UX (UI)

| Task ID      | Title                                                    | Status  | File         | Created    |
| ------------ | -------------------------------------------------------- | ------- | ------------ | ---------- |
| TASK-UI-001  | Redesign Gallery Page with Instagram-style Masonry Grid  | PENDING | gallery.task | 2025-01-21 |

### API (API)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Database (DB)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Testing (TEST)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Documentation (DOC)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Security (SEC)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Performance (PERF)

| Task ID      | Title                                          | Status  | File         | Created    |
| ------------ | ---------------------------------------------- | ------- | ------------ | ---------- |
| TASK-PERF-001 | Implement Image Lazy Loading and Pre-loading  | PENDING | gallery.task | 2025-01-21 |

### Accessibility (A11Y)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

### Configuration (CONFIG)

| Task ID | Title | Status | File | Created |
| ------- | ----- | ------ | ---- | ------- |
| -       | -     | -      | -    | -       |

---

## Usage Instructions

### Creating a New Task

1. Find the category for your task in the "Task Numbering Reference" table
2. Use the "Next Available" number for your new task ID
3. Create your task with the format: `TASK-[CATEGORY]-[NUMBER]`
4. Update this registry:
   - Increment "Last Number" in the reference table
   - Update "Next Available" to the next sequential number
   - Add your task to the "All Tasks Index" under the appropriate category
5. Update the "Last updated" date at the top

### Example

Creating a new Feature task:
1. Current state: FEAT Last Number = 000, Next Available = 001
2. New task ID: `TASK-FEAT-001`
3. Update registry:
   - FEAT Last Number = 001
   - FEAT Next Available = 002
   - Add entry to Feature (FEAT) section in index

### Rules

- **Never reuse task numbers**, even if a task is cancelled
- **Always use sequential numbering** within each category
- **Pad numbers with zeros** to 3 digits (001, 002, ..., 042, etc.)
- **Update this registry immediately** when creating a new task
- **Keep the index in sync** with actual .task files

---

## Quick Reference

**Current highest task numbers by category:**
- FEAT: 013 (13 tasks)
- OPS: 003 (3 tasks)
- UI: 001 (1 task)
- PERF: 001 (1 task)
- All other categories: 000 (no tasks)

**Total tasks in project: 18**
