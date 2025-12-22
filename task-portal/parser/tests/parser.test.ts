import { describe, it, expect } from 'vitest';
import { parseTaskFile, parseTaskFiles } from '../src/parser.js';
import type { Task } from '../src/schema.js';

describe('parser', () => {
    describe('parseTaskFile', () => {
        it('should parse a simple task', async () => {
            const content = `
## TASK-FEAT-001: Test Task

**Status:** PENDING
**Priority:** MEDIUM
**Assignee:** test-user
**Created:** 2025-01-15
**Updated:** 2025-01-15
**Estimated Time:** 2 hours
**Dependencies:** None
**Related Tasks:** None

This is a test task description.

### Requirements

- [ ] Requirement 1
- [ ] Requirement 2
- [x] Completed requirement

### Definition of Done

Task is complete when all requirements are met.

### Technical Details

Implementation notes here.
`;

            const tasks = await parseTaskFile(content, 'test.task', '/path/to/test.task');

            expect(tasks).toHaveLength(1);

            const task = tasks[0];
            expect(task.id).toBe('TASK-FEAT-001');
            expect(task.category).toBe('FEAT');
            expect(task.number).toBe(1);
            expect(task.title).toBe('Test Task');
            expect(task.status).toBe('PENDING');
            expect(task.priority).toBe('MEDIUM');
            expect(task.assignee).toBe('test-user');
            expect(task.created).toBe('2025-01-15');
            expect(task.updated).toBe('2025-01-15');
            expect(task.estimatedTime).toBe('2 hours');
            expect(task.dependencies).toEqual([]);
            expect(task.relatedTasks).toEqual([]);
            expect(task.file).toBe('test.task');
            expect(task.filePath).toBe('/path/to/test.task');
            expect(task.description).toBe('This is a test task description.');

            expect(task.sections?.requirements).toContain('Requirement 1');
            expect(task.sections?.definitionOfDone).toContain('all requirements are met');
            expect(task.sections?.technicalDetails).toContain('Implementation notes');
        });

        it('should parse multiple tasks from one file', async () => {
            const content = `
## TASK-FEAT-001: First Task

**Status:** PENDING

First task description.

## TASK-FEAT-002: Second Task

**Status:** IN_PROGRESS

Second task description.

## TASK-BUG-001: Bug Fix

**Status:** COMPLETED

Bug fix description.
`;

            const tasks = await parseTaskFile(content, 'multi.task', '/path/to/multi.task');

            expect(tasks).toHaveLength(3);
            expect(tasks[0].id).toBe('TASK-FEAT-001');
            expect(tasks[1].id).toBe('TASK-FEAT-002');
            expect(tasks[2].id).toBe('TASK-BUG-001');
            expect(tasks[2].category).toBe('BUG');
        });

        it('should parse dependencies correctly', async () => {
            const content = `
## TASK-FEAT-001: Task with Dependencies

**Status:** PENDING
**Dependencies:** TASK-FEAT-002, TASK-FEAT-003
**Related Tasks:** TASK-DOC-001, TASK-TEST-001

Task description.
`;

            const tasks = await parseTaskFile(content, 'deps.task', '/path/to/deps.task');

            expect(tasks[0].dependencies).toEqual(['TASK-FEAT-002', 'TASK-FEAT-003']);
            expect(tasks[0].relatedTasks).toEqual(['TASK-DOC-001', 'TASK-TEST-001']);
        });

        it('should calculate progress from checklists', async () => {
            const content = `
## TASK-FEAT-001: Task with Progress

**Status:** IN_PROGRESS

### Requirements

- [x] Done 1
- [x] Done 2
- [ ] Todo 1
- [ ] Todo 2
- [ ] Todo 3

### Technical Details

- [x] Technical done
- [ ] Technical todo
`;

            const tasks = await parseTaskFile(content, 'progress.task', '/path/to/progress.task');

            expect(tasks[0].progress).toBeDefined();
            expect(tasks[0].progress?.completed).toBe(3);
            expect(tasks[0].progress?.total).toBe(7);
            expect(tasks[0].progress?.percentage).toBe(43); // 3/7 = 42.86% -> 43%
        });

        it('should handle tasks without progress', async () => {
            const content = `
## TASK-FEAT-001: Task without Checklists

**Status:** PENDING

No checklists in this task.
`;

            const tasks = await parseTaskFile(content, 'no-progress.task', '/path/to/no-progress.task');

            expect(tasks[0].progress).toBeUndefined();
        });

        it('should handle various section names', async () => {
            const content = `
## TASK-FEAT-001: Task with Various Sections

### Requirements / What to Do

Requirements content.

### Definition of Done (DoD)

DoD content.

### Verification Steps

Verification content.

### Acceptance Criteria

Acceptance content.

### Testing Checklist

Testing content.

### Additional Context

Context content.
`;

            const tasks = await parseTaskFile(content, 'sections.task', '/path/to/sections.task');

            const sections = tasks[0].sections;
            expect(sections?.requirements).toContain('Requirements content');
            expect(sections?.definitionOfDone).toContain('DoD content');
            expect(sections?.verificationSteps).toContain('Verification content');
            expect(sections?.acceptanceCriteria).toContain('Acceptance content');
            expect(sections?.testingChecklist).toContain('Testing content');
            expect(sections?.additionalContext).toContain('Context content');
        });

        it('should handle all category codes', async () => {
            const categories = ['FEAT', 'BUG', 'ENH', 'REF', 'UI', 'API', 'DB', 'TEST', 'DOC', 'OPS', 'SEC', 'PERF', 'A11Y', 'CONFIG'];

            for (const category of categories) {
                const content = `## TASK-${category}-001: Test Task\n\n**Status:** PENDING`;
                const tasks = await parseTaskFile(content, 'test.task', '/path/to/test.task');

                expect(tasks[0].category).toBe(category);
                expect(tasks[0].id).toBe(`TASK-${category}-001`);
            }
        });

        it('should handle all status values', async () => {
            const statuses = ['PENDING', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED'];

            for (const status of statuses) {
                const content = `## TASK-FEAT-001: Test Task\n\n**Status:** ${status}`;
                const tasks = await parseTaskFile(content, 'test.task', '/path/to/test.task');

                expect(tasks[0].status).toBe(status);
            }
        });

        it('should handle all priority values', async () => {
            const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

            for (const priority of priorities) {
                const content = `## TASK-FEAT-001: Test Task\n\n**Priority:** ${priority}`;
                const tasks = await parseTaskFile(content, 'test.task', '/path/to/test.task');

                expect(tasks[0].priority).toBe(priority);
            }
        });

        it('should handle empty file', async () => {
            const tasks = await parseTaskFile('', 'empty.task', '/path/to/empty.task');
            expect(tasks).toHaveLength(0);
        });

        it('should handle file with no tasks', async () => {
            const content = `
# Just a heading

Some content without tasks.

## Not a task header

More content.
`;
            const tasks = await parseTaskFile(content, 'no-tasks.task', '/path/to/no-tasks.task');
            expect(tasks).toHaveLength(0);
        });
    });
});
