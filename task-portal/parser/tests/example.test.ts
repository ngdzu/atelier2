import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { TaskRegistrySchema } from '../src/schema.js';

describe('example JSON file', () => {
    let exampleData: unknown;

    beforeAll(async () => {
        // Load the example JSON file
        const examplePath = path.join(
            process.cwd(),
            'examples',
            'TASK_REGISTRY.example.json'
        );
        const content = await fs.readFile(examplePath, 'utf-8');
        exampleData = JSON.parse(content);
    });

    describe('TASK_REGISTRY.example.json', () => {
        it('should be valid JSON', () => {
            expect(exampleData).toBeDefined();
            expect(typeof exampleData).toBe('object');
        });

        it('should parse successfully with schema', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            expect(result.success).toBe(true);
        });

        it('should have valid metadata', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const { metadata } = result.data;
            expect(metadata.version).toBe('1.0.0');
            expect(metadata.lastUpdated).toBeDefined();
            expect(metadata.totalTasks).toBe(4);
            expect(metadata.lastSync).toBeDefined();
        });

        it('should have all 14 categories defined', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const { categories } = result.data;
            const expectedCodes = [
                'FEAT', 'BUG', 'ENH', 'REF', 'UI', 'API',
                'DB', 'TEST', 'DOC', 'OPS', 'SEC', 'PERF',
                'A11Y', 'CONFIG'
            ];

            for (const code of expectedCodes) {
                expect(categories[code as keyof typeof categories]).toBeDefined();
            }

            expect(Object.keys(categories)).toHaveLength(14);
        });

        it('should have 4 tasks', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            expect(result.data.tasks).toHaveLength(4);
        });

        it('should have tasks with all required fields', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            for (const task of result.data.tasks) {
                expect(task.id).toBeDefined();
                expect(task.category).toBeDefined();
                expect(task.number).toBeDefined();
                expect(task.title).toBeDefined();
                expect(task.status).toBeDefined();
                expect(task.priority).toBeDefined();
                expect(task.assignee).toBeDefined();
                expect(task.created).toBeDefined();
                expect(task.updated).toBeDefined();
                expect(task.file).toBeDefined();
                expect(task.filePath).toBeDefined();
                expect(task.description).toBeDefined();
                expect(Array.isArray(task.dependencies)).toBe(true);
                expect(Array.isArray(task.relatedTasks)).toBe(true);
            }
        });

        it('should have correct task IDs', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const expectedIds = [
                'TASK-FEAT-001',
                'TASK-FEAT-002',
                'TASK-BUG-001',
                'TASK-DOC-001'
            ];

            const actualIds = result.data.tasks.map(t => t.id);
            expect(actualIds).toEqual(expectedIds);
        });

        it('should have diverse statuses', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const statuses = new Set(result.data.tasks.map(t => t.status));
            expect(statuses.size).toBeGreaterThan(1);
            expect(statuses.has('COMPLETED')).toBe(true);
            expect(statuses.has('IN_PROGRESS')).toBe(true);
            expect(statuses.has('BLOCKED')).toBe(true);
            expect(statuses.has('PENDING')).toBe(true);
        });

        it('should have diverse priorities', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const priorities = new Set(result.data.tasks.map(t => t.priority));
            expect(priorities.size).toBeGreaterThan(1);
        });

        it('should have tasks from different categories', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const categories = new Set(result.data.tasks.map(t => t.category));
            expect(categories.has('FEAT')).toBe(true);
            expect(categories.has('BUG')).toBe(true);
            expect(categories.has('DOC')).toBe(true);
        });

        it('should have tasks with dependencies', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const tasksWithDeps = result.data.tasks.filter(t => t.dependencies.length > 0);
            expect(tasksWithDeps.length).toBeGreaterThan(0);

            // TASK-FEAT-002 should depend on TASK-FEAT-001
            const feat002 = result.data.tasks.find(t => t.id === 'TASK-FEAT-002');
            expect(feat002?.dependencies).toContain('TASK-FEAT-001');
        });

        it('should have tasks with progress information', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const tasksWithProgress = result.data.tasks.filter(t => t.progress !== undefined);
            expect(tasksWithProgress.length).toBeGreaterThan(0);

            for (const task of tasksWithProgress) {
                expect(task.progress).toBeDefined();
                expect(task.progress?.completed).toBeGreaterThanOrEqual(0);
                expect(task.progress?.total).toBeGreaterThanOrEqual(task.progress?.completed || 0);
                expect(task.progress?.percentage).toBeGreaterThanOrEqual(0);
                expect(task.progress?.percentage).toBeLessThanOrEqual(100);
            }
        });

        it('should have FEAT-001 as completed', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const feat001 = result.data.tasks.find(t => t.id === 'TASK-FEAT-001');
            expect(feat001).toBeDefined();
            expect(feat001?.status).toBe('COMPLETED');
            expect(feat001?.priority).toBe('HIGH');
            expect(feat001?.progress?.percentage).toBe(100);
        });

        it('should have BUG-001 as blocked (critical)', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const bug001 = result.data.tasks.find(t => t.id === 'TASK-BUG-001');
            expect(bug001).toBeDefined();
            expect(bug001?.status).toBe('BLOCKED');
            expect(bug001?.priority).toBe('CRITICAL');
        });

        it('should have category metadata consistent with tasks', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const { tasks, categories } = result.data;

            // Group tasks by category
            const tasksByCategory: Record<string, number[]> = {};
            for (const task of tasks) {
                if (!tasksByCategory[task.category]) {
                    tasksByCategory[task.category] = [];
                }
                tasksByCategory[task.category].push(task.number);
            }

            // Verify category metadata
            for (const [code, taskNumbers] of Object.entries(tasksByCategory)) {
                const category = categories[code as keyof typeof categories];
                const maxNumber = Math.max(...taskNumbers);
                expect(category.lastNumber).toBe(maxNumber);
                expect(category.nextAvailable).toBe(maxNumber + 1);
            }
        });

        it('should have tasks with descriptions', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            for (const task of result.data.tasks) {
                expect(task.description).toBeDefined();
                expect(task.description?.length).toBeGreaterThan(0);
            }
        });

        it('should have tasks with sections', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const tasksWithSections = result.data.tasks.filter(t =>
                Object.keys(t.sections || {}).length > 0
            );
            expect(tasksWithSections.length).toBeGreaterThan(0);

            for (const task of tasksWithSections) {
                if (task.sections && Object.keys(task.sections).length > 0) {
                    // Verify sections have content
                    for (const [key, value] of Object.entries(task.sections)) {
                        if (value !== undefined) {
                            expect(typeof value).toBe('string');
                            expect(value.length).toBeGreaterThanOrEqual(0);
                        }
                    }
                }
            }
        });

        it('should have metadata count matching actual task count', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            expect(result.data.metadata.totalTasks).toBe(result.data.tasks.length);
        });

        it('should have valid file paths for all tasks', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            for (const task of result.data.tasks) {
                expect(task.file).toBeDefined();
                expect(task.file?.length).toBeGreaterThan(0);
                expect(task.filePath).toBeDefined();
                expect(task.filePath?.length).toBeGreaterThan(0);
            }
        });

        it('should have tasks with proper date formats', () => {
            const result = TaskRegistrySchema.safeParse(exampleData);
            if (!result.success) throw new Error('Schema validation failed');

            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

            // Metadata dates should be ISO
            expect(result.data.metadata.lastUpdated).toMatch(isoDateRegex);
            expect(result.data.metadata.lastSync).toMatch(isoDateRegex);

            // Task dates should be YYYY-MM-DD
            for (const task of result.data.tasks) {
                if (task.created) {
                    expect(task.created).toMatch(dateRegex);
                }
                if (task.updated) {
                    expect(task.updated).toMatch(dateRegex);
                }
            }
        });
    });
});
