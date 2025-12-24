/**
 * Tests for TaskTable component
 */
import { describe, it, expect } from 'vitest';
import { TaskRow, TaskTable, Task } from '../components/TaskTable.js';

describe('TaskRow', () => {
    const mockTask: Task = {
        id: 'FEAT-001',
        title: 'Implement feature X',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        category: 'FEAT',
        created: '2024-01-01T00:00:00Z',
        updated: '2024-01-15T00:00:00Z'
    };

    it('should render task row with all fields', () => {
        const result = TaskRow(mockTask);

        expect(result).toContain('task-row');
        expect(result).toContain('FEAT-001');
        expect(result).toContain('Implement feature X');
        expect(result).toContain('IN_PROGRESS');
        expect(result).toContain('HIGH');
        expect(result).toContain('FEAT');
    });

    it('should include data attributes', () => {
        const result = TaskRow(mockTask);

        expect(result).toContain('data-id="FEAT-001"');
        expect(result).toContain('data-status="IN_PROGRESS"');
        expect(result).toContain('data-priority="HIGH"');
        expect(result).toContain('data-category="FEAT"');
    });

    it('should handle missing priority', () => {
        const task = { ...mockTask, priority: undefined };
        const result = TaskRow(task);

        expect(result).toContain('N/A');
        expect(result).toContain('data-priority=""');
    });

    it('should handle missing dates', () => {
        const task = { ...mockTask, created: undefined, updated: undefined };
        const result = TaskRow(task);

        expect(result).toContain('N/A');
    });

    it('should format dates correctly', () => {
        const result = TaskRow(mockTask);

        expect(result).toContain('Jan');
        expect(result).toContain('2024');
    });
});

describe('TaskTable', () => {
    const mockTasks: Task[] = [
        {
            id: 'FEAT-001',
            title: 'Feature 1',
            status: 'COMPLETED',
            priority: 'HIGH',
            category: 'FEAT',
            created: '2024-01-01T00:00:00Z'
        },
        {
            id: 'BUG-001',
            title: 'Bug fix',
            status: 'PENDING',
            priority: 'MEDIUM',
            category: 'BUG',
            created: '2024-01-02T00:00:00Z'
        }
    ];

    it('should render table with tasks', () => {
        const result = TaskTable({ tasks: mockTasks });

        expect(result).toContain('task-table');
        expect(result).toContain('taskTableBody');
        expect(result).toContain('FEAT-001');
        expect(result).toContain('BUG-001');
        expect(result).toContain('Feature 1');
        expect(result).toContain('Bug fix');
    });

    it('should render table headers', () => {
        const result = TaskTable({ tasks: mockTasks });

        expect(result).toContain('<th>ID</th>');
        expect(result).toContain('<th>Title</th>');
        expect(result).toContain('<th>Status</th>');
        expect(result).toContain('<th>Priority</th>');
        expect(result).toContain('<th>Category</th>');
        expect(result).toContain('<th>Created</th>');
        expect(result).toContain('<th>Updated</th>');
    });

    it('should handle empty task list', () => {
        const result = TaskTable({ tasks: [] });

        expect(result).toContain('task-table');
        expect(result).toContain('taskTableBody');
        expect(result).not.toContain('task-row');
    });

    it('should render multiple tasks', () => {
        const result = TaskTable({ tasks: mockTasks });

        const rowCount = (result.match(/class="task-row"/g) || []).length;
        expect(rowCount).toBe(2);
    });
});
