import { describe, it, expect } from 'vitest';
import {
    CategoryCodeSchema,
    TaskStatusSchema,
    TaskPrioritySchema,
    CategorySchema,
    ProgressSchema,
    TaskSchema,
    MetadataSchema,
    TaskRegistrySchema,
    CATEGORY_INFO,
} from '../src/schema.js';

describe('schema', () => {
    describe('CategoryCodeSchema', () => {
        it('should accept valid category codes', () => {
            const validCodes = ['FEAT', 'BUG', 'ENH', 'REF', 'UI', 'API', 'DB', 'TEST', 'DOC', 'OPS', 'SEC', 'PERF', 'A11Y', 'CONFIG'];

            for (const code of validCodes) {
                expect(() => CategoryCodeSchema.parse(code)).not.toThrow();
            }
        });

        it('should reject invalid category codes', () => {
            expect(() => CategoryCodeSchema.parse('INVALID')).toThrow();
            expect(() => CategoryCodeSchema.parse('feat')).toThrow();
            expect(() => CategoryCodeSchema.parse('')).toThrow();
        });
    });

    describe('TaskStatusSchema', () => {
        it('should accept valid statuses', () => {
            const validStatuses = ['PENDING', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED'];

            for (const status of validStatuses) {
                expect(() => TaskStatusSchema.parse(status)).not.toThrow();
            }
        });

        it('should reject invalid statuses', () => {
            expect(() => TaskStatusSchema.parse('INVALID')).toThrow();
            expect(() => TaskStatusSchema.parse('pending')).toThrow();
        });
    });

    describe('TaskPrioritySchema', () => {
        it('should accept valid priorities', () => {
            const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

            for (const priority of validPriorities) {
                expect(() => TaskPrioritySchema.parse(priority)).not.toThrow();
            }
        });

        it('should reject invalid priorities', () => {
            expect(() => TaskPrioritySchema.parse('INVALID')).toThrow();
            expect(() => TaskPrioritySchema.parse('low')).toThrow();
        });
    });

    describe('ProgressSchema', () => {
        it('should accept valid progress', () => {
            const progress = { completed: 5, total: 10, percentage: 50 };
            expect(() => ProgressSchema.parse(progress)).not.toThrow();
        });

        it('should reject negative values', () => {
            expect(() => ProgressSchema.parse({ completed: -1, total: 10, percentage: 50 })).toThrow();
            expect(() => ProgressSchema.parse({ completed: 5, total: -1, percentage: 50 })).toThrow();
        });

        it('should reject invalid percentage', () => {
            expect(() => ProgressSchema.parse({ completed: 5, total: 10, percentage: -1 })).toThrow();
            expect(() => ProgressSchema.parse({ completed: 5, total: 10, percentage: 101 })).toThrow();
        });
    });

    describe('TaskSchema', () => {
        it('should accept valid task', () => {
            const task = {
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
            };

            expect(() => TaskSchema.parse(task)).not.toThrow();
        });

        it('should reject invalid task ID format', () => {
            const task = {
                id: 'INVALID-ID',
                category: 'FEAT',
                number: 1,
                title: 'Test',
                status: 'PENDING',
                priority: 'MEDIUM',
                assignee: 'test',
                created: '',
                updated: '',
                estimatedTime: '',
                dependencies: [],
                relatedTasks: [],
                file: 'test.task',
                filePath: '/path',
                description: '',
                sections: {},
            };

            expect(() => TaskSchema.parse(task)).toThrow();
        });

        it('should accept task with progress', () => {
            const task = {
                id: 'TASK-FEAT-001',
                category: 'FEAT',
                number: 1,
                title: 'Test',
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                assignee: 'test',
                created: '',
                updated: '',
                estimatedTime: '',
                dependencies: [],
                relatedTasks: [],
                file: 'test.task',
                filePath: '/path',
                description: '',
                sections: {},
                progress: { completed: 3, total: 5, percentage: 60 },
            };

            expect(() => TaskSchema.parse(task)).not.toThrow();
        });

        it('should accept task with all sections', () => {
            const task = {
                id: 'TASK-FEAT-001',
                category: 'FEAT',
                number: 1,
                title: 'Test',
                status: 'PENDING',
                priority: 'MEDIUM',
                assignee: 'test',
                created: '',
                updated: '',
                estimatedTime: '',
                dependencies: [],
                relatedTasks: [],
                file: 'test.task',
                filePath: '/path',
                description: '',
                sections: {
                    requirements: 'Requirements',
                    definitionOfDone: 'DoD',
                    verificationSteps: 'Verification',
                    acceptanceCriteria: 'Acceptance',
                    technicalDetails: 'Technical',
                    testingChecklist: 'Testing',
                    additionalContext: 'Context',
                },
            };

            expect(() => TaskSchema.parse(task)).not.toThrow();
        });

        it('should accept task with actualTime and tags', () => {
            const task = {
                id: 'TASK-FEAT-001',
                category: 'FEAT',
                number: 1,
                title: 'Test',
                status: 'COMPLETED',
                priority: 'HIGH',
                assignee: 'test',
                created: '',
                updated: '',
                estimatedTime: '4 hours',
                actualTime: '3 hours',
                dependencies: [],
                relatedTasks: [],
                file: 'test.task',
                filePath: '/path',
                description: '',
                sections: {},
                tags: ['frontend', 'ui', 'react'],
            };

            expect(() => TaskSchema.parse(task)).not.toThrow();
        });
    });

    describe('MetadataSchema', () => {
        it('should accept valid metadata', () => {
            const metadata = {
                version: '1.0.0',
                lastUpdated: '2025-01-15T10:00:00.000Z',
                totalTasks: 10,
                lastSync: '2025-01-15T10:00:00.000Z',
            };

            expect(() => MetadataSchema.parse(metadata)).not.toThrow();
        });

        it('should reject negative totalTasks', () => {
            const metadata = {
                version: '1.0.0',
                lastUpdated: '2025-01-15T10:00:00.000Z',
                totalTasks: -1,
                lastSync: '2025-01-15T10:00:00.000Z',
            };

            expect(() => MetadataSchema.parse(metadata)).toThrow();
        });
    });

    describe('CATEGORY_INFO', () => {
        it('should have info for all category codes', () => {
            const codes = ['FEAT', 'BUG', 'ENH', 'REF', 'UI', 'API', 'DB', 'TEST', 'DOC', 'OPS', 'SEC', 'PERF', 'A11Y', 'CONFIG'];

            for (const code of codes) {
                expect(CATEGORY_INFO[code as keyof typeof CATEGORY_INFO]).toBeDefined();
                expect(CATEGORY_INFO[code as keyof typeof CATEGORY_INFO].name).toBeTruthy();
                expect(CATEGORY_INFO[code as keyof typeof CATEGORY_INFO].description).toBeTruthy();
            }
        });
    });
});
