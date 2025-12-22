import { describe, it, expect } from 'vitest';
import { validateTaskRegistry, formatValidationResults } from '../src/validator.js';
import type { TaskRegistry } from '../src/schema.js';

describe('validator', () => {
    describe('validateTaskRegistry', () => {
        it('should validate a correct registry', () => {
            const registry: TaskRegistry = {
                metadata: {
                    version: '1.0.0',
                    lastUpdated: '2025-01-15T10:00:00.000Z',
                    totalTasks: 1,
                    lastSync: '2025-01-15T10:00:00.000Z',
                },
                categories: {
                    FEAT: {
                        name: 'Feature',
                        code: 'FEAT',
                        description: 'New features',
                        lastNumber: 1,
                        nextAvailable: 2,
                    },
                    BUG: {
                        name: 'Bug Fix',
                        code: 'BUG',
                        description: 'Bug fixes',
                        lastNumber: 0,
                        nextAvailable: 1,
                    },
                    ENH: { name: 'Enhancement', code: 'ENH', description: 'Enhancements', lastNumber: 0, nextAvailable: 1 },
                    REF: { name: 'Refactoring', code: 'REF', description: 'Code refactoring', lastNumber: 0, nextAvailable: 1 },
                    UI: { name: 'UI/UX', code: 'UI', description: 'UI/UX improvements', lastNumber: 0, nextAvailable: 1 },
                    API: { name: 'API', code: 'API', description: 'API changes', lastNumber: 0, nextAvailable: 1 },
                    DB: { name: 'Database', code: 'DB', description: 'Database changes', lastNumber: 0, nextAvailable: 1 },
                    TEST: { name: 'Testing', code: 'TEST', description: 'Testing improvements', lastNumber: 0, nextAvailable: 1 },
                    DOC: { name: 'Documentation', code: 'DOC', description: 'Documentation', lastNumber: 0, nextAvailable: 1 },
                    OPS: { name: 'Operations', code: 'OPS', description: 'DevOps and operations', lastNumber: 0, nextAvailable: 1 },
                    SEC: { name: 'Security', code: 'SEC', description: 'Security improvements', lastNumber: 0, nextAvailable: 1 },
                    PERF: { name: 'Performance', code: 'PERF', description: 'Performance optimization', lastNumber: 0, nextAvailable: 1 },
                    A11Y: { name: 'Accessibility', code: 'A11Y', description: 'Accessibility improvements', lastNumber: 0, nextAvailable: 1 },
                    CONFIG: { name: 'Configuration', code: 'CONFIG', description: 'Configuration changes', lastNumber: 0, nextAvailable: 1 },
                },
                tasks: [
                    {
                        id: 'TASK-FEAT-001',
                        category: 'FEAT',
                        number: 1,
                        title: 'Test Task',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: [],
                        relatedTasks: [],
                        file: 'test.task',
                        filePath: '/path/to/test.task',
                        description: 'Test description',
                        sections: {},
                    },
                ],
            };

            const result = validateTaskRegistry(registry);

            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should detect duplicate task IDs', () => {
            const registry: TaskRegistry = {
                metadata: {
                    version: '1.0.0',
                    lastUpdated: '2025-01-15T10:00:00.000Z',
                    totalTasks: 2,
                    lastSync: '2025-01-15T10:00:00.000Z',
                },
                categories: {
                    FEAT: {
                        name: 'Feature',
                        code: 'FEAT',
                        description: 'New features',
                        lastNumber: 1,
                        nextAvailable: 2,
                    },
                    BUG: { name: 'Bug Fix', code: 'BUG', description: 'Bug fixes', lastNumber: 0, nextAvailable: 1 },
                    ENH: { name: 'Enhancement', code: 'ENH', description: 'Enhancements', lastNumber: 0, nextAvailable: 1 },
                    REF: { name: 'Refactoring', code: 'REF', description: 'Code refactoring', lastNumber: 0, nextAvailable: 1 },
                    UI: { name: 'UI/UX', code: 'UI', description: 'UI/UX improvements', lastNumber: 0, nextAvailable: 1 },
                    API: { name: 'API', code: 'API', description: 'API changes', lastNumber: 0, nextAvailable: 1 },
                    DB: { name: 'Database', code: 'DB', description: 'Database changes', lastNumber: 0, nextAvailable: 1 },
                    TEST: { name: 'Testing', code: 'TEST', description: 'Testing improvements', lastNumber: 0, nextAvailable: 1 },
                    DOC: { name: 'Documentation', code: 'DOC', description: 'Documentation', lastNumber: 0, nextAvailable: 1 },
                    OPS: { name: 'Operations', code: 'OPS', description: 'DevOps and operations', lastNumber: 0, nextAvailable: 1 },
                    SEC: { name: 'Security', code: 'SEC', description: 'Security improvements', lastNumber: 0, nextAvailable: 1 },
                    PERF: { name: 'Performance', code: 'PERF', description: 'Performance optimization', lastNumber: 0, nextAvailable: 1 },
                    A11Y: { name: 'Accessibility', code: 'A11Y', description: 'Accessibility improvements', lastNumber: 0, nextAvailable: 1 },
                    CONFIG: { name: 'Configuration', code: 'CONFIG', description: 'Configuration changes', lastNumber: 0, nextAvailable: 1 },
                },
                tasks: [
                    {
                        id: 'TASK-FEAT-001',
                        category: 'FEAT',
                        number: 1,
                        title: 'First Task',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: [],
                        relatedTasks: [],
                        file: 'test.task',
                        filePath: '/path/to/test.task',
                        description: 'First',
                        sections: {},
                    },
                    {
                        id: 'TASK-FEAT-001',
                        category: 'FEAT',
                        number: 1,
                        title: 'Duplicate Task',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: [],
                        relatedTasks: [],
                        file: 'test2.task',
                        filePath: '/path/to/test2.task',
                        description: 'Duplicate',
                        sections: {},
                    },
                ],
            };

            const result = validateTaskRegistry(registry);

            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].message).toContain('Duplicate task ID');
        });

        it('should detect missing dependencies', () => {
            const registry: TaskRegistry = {
                metadata: {
                    version: '1.0.0',
                    lastUpdated: '2025-01-15T10:00:00.000Z',
                    totalTasks: 1,
                    lastSync: '2025-01-15T10:00:00.000Z',
                },
                categories: {
                    FEAT: {
                        name: 'Feature',
                        code: 'FEAT',
                        description: 'New features',
                        lastNumber: 1,
                        nextAvailable: 2,
                    },
                    BUG: { name: 'Bug Fix', code: 'BUG', description: 'Bug fixes', lastNumber: 0, nextAvailable: 1 },
                    ENH: { name: 'Enhancement', code: 'ENH', description: 'Enhancements', lastNumber: 0, nextAvailable: 1 },
                    REF: { name: 'Refactoring', code: 'REF', description: 'Code refactoring', lastNumber: 0, nextAvailable: 1 },
                    UI: { name: 'UI/UX', code: 'UI', description: 'UI/UX improvements', lastNumber: 0, nextAvailable: 1 },
                    API: { name: 'API', code: 'API', description: 'API changes', lastNumber: 0, nextAvailable: 1 },
                    DB: { name: 'Database', code: 'DB', description: 'Database changes', lastNumber: 0, nextAvailable: 1 },
                    TEST: { name: 'Testing', code: 'TEST', description: 'Testing improvements', lastNumber: 0, nextAvailable: 1 },
                    DOC: { name: 'Documentation', code: 'DOC', description: 'Documentation', lastNumber: 0, nextAvailable: 1 },
                    OPS: { name: 'Operations', code: 'OPS', description: 'DevOps and operations', lastNumber: 0, nextAvailable: 1 },
                    SEC: { name: 'Security', code: 'SEC', description: 'Security improvements', lastNumber: 0, nextAvailable: 1 },
                    PERF: { name: 'Performance', code: 'PERF', description: 'Performance optimization', lastNumber: 0, nextAvailable: 1 },
                    A11Y: { name: 'Accessibility', code: 'A11Y', description: 'Accessibility improvements', lastNumber: 0, nextAvailable: 1 },
                    CONFIG: { name: 'Configuration', code: 'CONFIG', description: 'Configuration changes', lastNumber: 0, nextAvailable: 1 },
                },
                tasks: [
                    {
                        id: 'TASK-FEAT-001',
                        category: 'FEAT',
                        number: 1,
                        title: 'Task with Missing Dep',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: ['TASK-FEAT-002'],
                        relatedTasks: [],
                        file: 'test.task',
                        filePath: '/path/to/test.task',
                        description: 'Test',
                        sections: {},
                    },
                ],
            };

            const result = validateTaskRegistry(registry);

            expect(result.valid).toBe(true); // Still valid, just warnings
            expect(result.warnings.length).toBeGreaterThan(0);
            expect(result.warnings.some(w => w.message.includes('Dependency not found'))).toBe(true);
        });

        it('should detect circular dependencies', () => {
            const registry: TaskRegistry = {
                metadata: {
                    version: '1.0.0',
                    lastUpdated: '2025-01-15T10:00:00.000Z',
                    totalTasks: 3,
                    lastSync: '2025-01-15T10:00:00.000Z',
                },
                categories: {
                    FEAT: {
                        name: 'Feature',
                        code: 'FEAT',
                        description: 'New features',
                        lastNumber: 3,
                        nextAvailable: 4,
                    },
                    BUG: { name: 'Bug Fix', code: 'BUG', description: 'Bug fixes', lastNumber: 0, nextAvailable: 1 },
                    ENH: { name: 'Enhancement', code: 'ENH', description: 'Enhancements', lastNumber: 0, nextAvailable: 1 },
                    REF: { name: 'Refactoring', code: 'REF', description: 'Code refactoring', lastNumber: 0, nextAvailable: 1 },
                    UI: { name: 'UI/UX', code: 'UI', description: 'UI/UX improvements', lastNumber: 0, nextAvailable: 1 },
                    API: { name: 'API', code: 'API', description: 'API changes', lastNumber: 0, nextAvailable: 1 },
                    DB: { name: 'Database', code: 'DB', description: 'Database changes', lastNumber: 0, nextAvailable: 1 },
                    TEST: { name: 'Testing', code: 'TEST', description: 'Testing improvements', lastNumber: 0, nextAvailable: 1 },
                    DOC: { name: 'Documentation', code: 'DOC', description: 'Documentation', lastNumber: 0, nextAvailable: 1 },
                    OPS: { name: 'Operations', code: 'OPS', description: 'DevOps and operations', lastNumber: 0, nextAvailable: 1 },
                    SEC: { name: 'Security', code: 'SEC', description: 'Security improvements', lastNumber: 0, nextAvailable: 1 },
                    PERF: { name: 'Performance', code: 'PERF', description: 'Performance optimization', lastNumber: 0, nextAvailable: 1 },
                    A11Y: { name: 'Accessibility', code: 'A11Y', description: 'Accessibility improvements', lastNumber: 0, nextAvailable: 1 },
                    CONFIG: { name: 'Configuration', code: 'CONFIG', description: 'Configuration changes', lastNumber: 0, nextAvailable: 1 },
                },
                tasks: [
                    {
                        id: 'TASK-FEAT-001',
                        category: 'FEAT',
                        number: 1,
                        title: 'Task 1',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: ['TASK-FEAT-002'],
                        relatedTasks: [],
                        file: 'test.task',
                        filePath: '/path/to/test.task',
                        description: 'Test',
                        sections: {},
                    },
                    {
                        id: 'TASK-FEAT-002',
                        category: 'FEAT',
                        number: 2,
                        title: 'Task 2',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: ['TASK-FEAT-003'],
                        relatedTasks: [],
                        file: 'test.task',
                        filePath: '/path/to/test.task',
                        description: 'Test',
                        sections: {},
                    },
                    {
                        id: 'TASK-FEAT-003',
                        category: 'FEAT',
                        number: 3,
                        title: 'Task 3',
                        status: 'PENDING',
                        priority: 'MEDIUM',
                        assignee: 'test-user',
                        created: '2025-01-15',
                        updated: '2025-01-15',
                        estimatedTime: '2 hours',
                        dependencies: ['TASK-FEAT-001'],
                        relatedTasks: [],
                        file: 'test.task',
                        filePath: '/path/to/test.task',
                        description: 'Test',
                        sections: {},
                    },
                ],
            };

            const result = validateTaskRegistry(registry);

            expect(result.valid).toBe(false);
            expect(result.errors.some(e => e.message.includes('Circular dependency'))).toBe(true);
        });
    });

    describe('formatValidationResults', () => {
        it('should format valid result', () => {
            const result = {
                valid: true,
                errors: [],
                warnings: [],
            };

            const formatted = formatValidationResults(result);

            expect(formatted).toContain('✅ Validation passed');
        });

        it('should format errors and warnings', () => {
            const result = {
                valid: false,
                errors: [
                    { path: 'tasks[0].id', message: 'Invalid ID format', severity: 'error' as const },
                ],
                warnings: [
                    { path: 'metadata.totalTasks', message: 'Count mismatch', severity: 'warning' as const },
                ],
            };

            const formatted = formatValidationResults(result);

            expect(formatted).toContain('❌ Validation failed');
            expect(formatted).toContain('Errors (1)');
            expect(formatted).toContain('Invalid ID format');
            expect(formatted).toContain('Warnings (1)');
            expect(formatted).toContain('Count mismatch');
        });
    });
});
