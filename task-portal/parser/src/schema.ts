import { z } from 'zod';

/**
 * Task category codes
 */
export const CategoryCodes = [
    'FEAT', 'BUG', 'ENH', 'REF', 'UI', 'API',
    'DB', 'TEST', 'DOC', 'OPS', 'SEC', 'PERF',
    'A11Y', 'CONFIG', 'ARCH', 'MIG'
] as const;

export type CategoryCode = typeof CategoryCodes[number];

export const CategoryCodeSchema = z.enum(CategoryCodes);

/**
 * Task status values
 */
export const TaskStatuses = [
    'PENDING',
    'IN_PROGRESS',
    'BLOCKED',
    'COMPLETED',
    'CANCELLED'
] as const;

export type TaskStatus = typeof TaskStatuses[number];

export const TaskStatusSchema = z.enum(TaskStatuses);

/**
 * Task priority values
 */
export const TaskPriorities = [
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
] as const;

export type TaskPriority = typeof TaskPriorities[number];

export const TaskPrioritySchema = z.enum(TaskPriorities);

/**
 * Category metadata
 */
export const CategorySchema = z.object({
    name: z.string(),
    code: z.enum(CategoryCodes),
    description: z.string(),
    lastNumber: z.number().int().min(0),
    nextAvailable: z.number().int().min(1),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Task progress information
 */
export const ProgressSchema = z.object({
    completed: z.number().int().min(0),
    total: z.number().int().min(0),
    percentage: z.number().min(0).max(100),
});

export type Progress = z.infer<typeof ProgressSchema>;

/**
 * Task sections
 */
export const TaskSectionsSchema = z.object({
    description: z.string().optional(),
    requirements: z.string().optional(),
    definitionOfDone: z.string().optional(),
    verificationSteps: z.string().optional(),
    acceptanceCriteria: z.string().optional(),
    technicalDetails: z.string().optional(),
    testingChecklist: z.string().optional(),
    additionalContext: z.string().optional(),
}).optional();

export type TaskSections = z.infer<typeof TaskSectionsSchema>;

/**
 * Individual task
 */
export const TaskSchema = z.object({
    id: z.string().regex(/^TASK-[A-Z0-9]+-\d{3}$/),
    category: z.enum(CategoryCodes),
    number: z.number().int().min(1),
    title: z.string().min(1),
    status: z.enum(TaskStatuses),
    priority: z.enum(TaskPriorities),
    assignee: z.string(),
    created: z.string(),
    updated: z.string(),
    estimatedTime: z.string(),
    actualTime: z.string().optional(),
    dependencies: z.array(z.string()),
    relatedTasks: z.array(z.string()),
    file: z.string(),
    filePath: z.string(),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    progress: ProgressSchema.optional(),
    sections: TaskSectionsSchema,
});

export type Task = z.infer<typeof TaskSchema>;

/**
 * Registry metadata
 */
export const MetadataSchema = z.object({
    version: z.string(),
    lastUpdated: z.string(),
    totalTasks: z.number().int().min(0),
    lastSync: z.string(),
});

export type Metadata = z.infer<typeof MetadataSchema>;

/**
 * Complete task registry
 */
export const TaskRegistrySchema = z.object({
    metadata: MetadataSchema,
    categories: z.record(z.enum(CategoryCodes), CategorySchema),
    tasks: z.array(TaskSchema),
});

export type TaskRegistry = z.infer<typeof TaskRegistrySchema>;

/**
 * Category information map
 */
export const CATEGORY_INFO: Record<CategoryCode, { name: string; description: string }> = {
    FEAT: { name: 'Feature', description: 'New features or major functionality' },
    BUG: { name: 'Bug Fix', description: 'Bug fixes and defect resolution' },
    ENH: { name: 'Enhancement', description: 'Improvements to existing features' },
    REF: { name: 'Refactoring', description: 'Code improvement without changing functionality' },
    UI: { name: 'UI/UX', description: 'User interface and user experience work' },
    API: { name: 'API', description: 'Backend API development' },
    DB: { name: 'Database', description: 'Database schema, migrations, queries' },
    TEST: { name: 'Testing', description: 'Unit, integration, or E2E tests' },
    DOC: { name: 'Documentation', description: 'Documentation updates' },
    OPS: { name: 'DevOps', description: 'Deployment, CI/CD, infrastructure' },
    SEC: { name: 'Security', description: 'Security-related tasks' },
    PERF: { name: 'Performance', description: 'Performance optimization' },
    A11Y: { name: 'Accessibility', description: 'Accessibility improvements' },
    CONFIG: { name: 'Configuration', description: 'Configuration and setup' },
    ARCH: { name: 'Architecture', description: 'System architecture and design' },
    MIG: { name: 'Migration', description: 'Data or system migration tasks' },
};
