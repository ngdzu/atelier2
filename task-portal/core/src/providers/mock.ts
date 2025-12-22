/**
 * Mock Data Provider
 *
 * In-memory implementation for testing and development.
 * Does not persist data between sessions.
 */

import {
    IDataProvider,
    Task,
    TaskFilter,
    TaskStatus,
    Category,
    TaskRegistry,
    RegistryMetadata,
    SyncResult,
    ValidationResult,
    ValidationError,
    ValidationWarning,
    TaskStats,
    CategoryCode,
    ProviderFactory,
} from '../types';

export class MockProvider implements IDataProvider {
    private tasks: Map<string, Task> = new Map();
    private categories: Map<CategoryCode, Category> = new Map();
    private operations: Array<{ operation: string; timestamp: Date; data: any }> = [];
    private shouldFailValidation: boolean = false;
    private shouldFailSync: boolean = false;
    private simulatedDelay: number = 0; // milliseconds
    private lastSyncTime: Date | null = null;

    /**
     * Constructor with optional configuration
     */
    constructor(config?: {
        simulatedDelay?: number;
        shouldFailValidation?: boolean;
        shouldFailSync?: boolean;
    }) {
        this.simulatedDelay = config?.simulatedDelay || 0;
        this.shouldFailValidation = config?.shouldFailValidation || false;
        this.shouldFailSync = config?.shouldFailSync || false;
        this.initializeDefaultData();
    }

    /**
     * Initialize with default categories
     */
    private initializeDefaultData(): void {
        const categoryDefs: Array<[CategoryCode, string, string]> = [
            ['FEAT', 'Feature', 'New feature or enhancement'],
            ['BUG', 'Bug', 'Bug fix'],
            ['ENH', 'Enhancement', 'Improvement to existing feature'],
            ['REF', 'Refactor', 'Code refactoring'],
            ['UI', 'UI', 'User interface changes'],
            ['API', 'API', 'API changes'],
            ['DB', 'Database', 'Database changes'],
            ['TEST', 'Test', 'Testing and QA'],
            ['DOC', 'Documentation', 'Documentation'],
            ['OPS', 'Operations', 'Operational tasks'],
            ['SEC', 'Security', 'Security improvements'],
            ['PERF', 'Performance', 'Performance optimization'],
            ['A11Y', 'Accessibility', 'Accessibility improvements'],
            ['CONFIG', 'Configuration', 'Configuration changes'],
        ];

        for (const [code, name, description] of categoryDefs) {
            this.categories.set(code, {
                code,
                name,
                description,
                nextNumber: 1,
                taskCount: 0,
            });
        }
    }

    /**
     * Helper to add simulated delay
     */
    private async delay(): Promise<void> {
        if (this.simulatedDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, this.simulatedDelay));
        }
    }

    /**
     * Helper to record operation for testing
     */
    private recordOperation(operation: string, data: any): void {
        this.operations.push({ operation, timestamp: new Date(), data });
    }

    async readRegistry(): Promise<TaskRegistry> {
        await this.delay();

        const tasksByStatus: Record<TaskStatus, number> = {
            PENDING: 0,
            IN_PROGRESS: 0,
            BLOCKED: 0,
            COMPLETED: 0,
            CANCELLED: 0,
        };

        const tasksByCategory: Record<CategoryCode, number> = {} as any;
        Array.from(this.categories.keys()).forEach(code => {
            tasksByCategory[code] = 0;
        });

        const tasks = Array.from(this.tasks.values());
        tasks.forEach(task => {
            tasksByStatus[task.status]++;
            tasksByCategory[task.categoryCode]++;
        });

        return {
            metadata: {
                version: '1.0.0',
                lastUpdated: new Date().toISOString(),
                totalTasks: tasks.length,
                tasksByStatus,
                tasksByCategory,
                lastSync: this.lastSyncTime?.toISOString(),
            },
            categories: Array.from(this.categories.values()),
            tasks,
        };
    }

    async readTask(taskId: string): Promise<Task | null> {
        await this.delay();
        return this.tasks.get(taskId) || null;
    }

    async readTasksByFilter(filter: TaskFilter): Promise<Task[]> {
        await this.delay();

        let results = Array.from(this.tasks.values());

        // Apply filters
        if (filter.categoryCode) {
            const categories = Array.isArray(filter.categoryCode) ? filter.categoryCode : [filter.categoryCode];
            results = results.filter(t => categories.includes(t.categoryCode));
        }

        if (filter.status) {
            const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
            results = results.filter(t => statuses.includes(t.status));
        }

        if (filter.priority) {
            const priorities = Array.isArray(filter.priority) ? filter.priority : [filter.priority];
            results = results.filter(t => priorities.includes(t.priority));
        }

        if (filter.assignee) {
            const assignees = Array.isArray(filter.assignee) ? filter.assignee : [filter.assignee];
            results = results.filter(t => t.assignee && assignees.includes(t.assignee));
        }

        if (filter.searchText) {
            const text = filter.searchText.toLowerCase();
            results = results.filter(t => t.title.toLowerCase().includes(text) || t.description.toLowerCase().includes(text));
        }

        if (filter.hasDependencies !== undefined) {
            results = results.filter(t => (t.dependencies?.length || 0) > 0 === filter.hasDependencies);
        }

        if (filter.isBlocked !== undefined) {
            results = results.filter(t => (t.status === 'BLOCKED') === filter.isBlocked);
        }

        return results;
    }

    async listCategories(): Promise<Category[]> {
        await this.delay();
        return Array.from(this.categories.values());
    }

    async createTask(task: Omit<Task, 'id'>): Promise<Task> {
        await this.delay();

        const id = `TASK-${task.categoryCode}-${String(this.getNextCategoryNumber(task.categoryCode)).padStart(3, '0')}`;
        const fullTask: Task = { ...task, id };

        this.tasks.set(id, fullTask);
        this.recordOperation('CREATE', fullTask);

        return fullTask;
    }

    async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
        await this.delay();

        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error(`Task ${taskId} not found`);
        }

        const updated: Task = { ...task, ...updates };
        this.tasks.set(taskId, updated);
        this.recordOperation('UPDATE', updated);

        return updated;
    }

    async deleteTask(taskId: string): Promise<boolean> {
        await this.delay();

        const deleted = this.tasks.delete(taskId);
        if (deleted) {
            this.recordOperation('DELETE', { taskId });
        }
        return deleted;
    }

    async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
        await this.delay();

        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error(`Task ${taskId} not found`);
        }

        const updated: Task = { ...task, status };
        this.tasks.set(taskId, updated);
        this.recordOperation('UPDATE_STATUS', { taskId, status });

        return updated;
    }

    async bulkCreateTasks(tasks: Array<Omit<Task, 'id'>>): Promise<Task[]> {
        await this.delay();

        const created: Task[] = [];
        for (const task of tasks) {
            const created_task = await this.createTask(task);
            created.push(created_task);
        }

        return created;
    }

    async bulkUpdateTasks(updates: Array<{ id: string; data: Partial<Task> }>): Promise<Task[]> {
        await this.delay();

        const updated: Task[] = [];
        for (const { id, data } of updates) {
            const updated_task = await this.updateTask(id, data);
            updated.push(updated_task);
        }

        return updated;
    }

    async search(query: string): Promise<Task[]> {
        await this.delay();

        const lowerQuery = query.toLowerCase();
        return Array.from(this.tasks.values()).filter(
            task => task.title.toLowerCase().includes(lowerQuery) ||
                task.description.toLowerCase().includes(lowerQuery) ||
                task.id.toLowerCase().includes(lowerQuery)
        );
    }

    async sync(): Promise<SyncResult> {
        await this.delay();

        if (this.shouldFailSync) {
            return {
                success: false,
                message: 'Simulated sync failure',
                errors: [{ error: 'Intentional test failure' }],
            };
        }

        this.lastSyncTime = new Date();
        const taskCount = this.tasks.size;

        return {
            success: true,
            message: `Synced ${taskCount} tasks`,
            tasksAdded: 0,
            tasksModified: 0,
            tasksRemoved: 0,
        };
    }

    async validate(): Promise<ValidationResult> {
        await this.delay();

        if (this.shouldFailValidation) {
            return {
                isValid: false,
                errors: [
                    {
                        type: 'OTHER',
                        message: 'Simulated validation failure',
                    },
                ],
                warnings: [],
            };
        }

        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        // Check for circular dependencies
        for (const task of this.tasks.values()) {
            if (task.dependencies) {
                for (const depId of task.dependencies) {
                    const depTask = this.tasks.get(depId);
                    if (!depTask) {
                        errors.push({
                            type: 'MISSING_DEPENDENCY',
                            message: `Task ${task.id} depends on missing task ${depId}`,
                            taskId: task.id,
                        });
                    }
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
        };
    }

    async getMetadata(): Promise<RegistryMetadata> {
        await this.delay();

        const registry = await this.readRegistry();
        return registry.metadata;
    }

    async getStats(): Promise<TaskStats> {
        await this.delay();

        const tasks = Array.from(this.tasks.values());
        const completed = tasks.filter(t => t.status === 'COMPLETED').length;
        const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
        const blocked = tasks.filter(t => t.status === 'BLOCKED').length;
        const pending = tasks.filter(t => t.status === 'PENDING').length;
        const cancelled = tasks.filter(t => t.status === 'CANCELLED').length;

        const tasksByCategory: Record<CategoryCode, number> = {} as any;
        const tasksByAssignee: Record<string, number> = {};

        tasks.forEach(t => {
            tasksByCategory[t.categoryCode] = (tasksByCategory[t.categoryCode] || 0) + 1;
            if (t.assignee) {
                tasksByAssignee[t.assignee] = (tasksByAssignee[t.assignee] || 0) + 1;
            }
        });

        return {
            totalTasks: tasks.length,
            completedTasks: completed,
            inProgressTasks: inProgress,
            blockedTasks: blocked,
            pendingTasks: pending,
            cancelledTasks: cancelled,
            completionRate: tasks.length > 0 ? (completed / tasks.length) * 100 : 0,
            averagePriority: 'MEDIUM',
            tasksByCategory,
            tasksByAssignee,
        };
    }

    async healthCheck(): Promise<boolean> {
        await this.delay();
        return true;
    }

    /**
     * Helper: Get next task number for a category
     */
    private getNextCategoryNumber(code: CategoryCode): number {
        const category = this.categories.get(code);
        if (!category) {
            throw new Error(`Unknown category: ${code}`);
        }

        // Count tasks in this category
        const count = Array.from(this.tasks.values()).filter(t => t.categoryCode === code).length;
        return count + 1;
    }

    /**
     * Test helper: Get all recorded operations
     */
    getOperations() {
        return [...this.operations];
    }

    /**
     * Test helper: Clear operations log
     */
    clearOperations() {
        this.operations = [];
    }

    /**
     * Test helper: Seed with sample data
     */
    async seedSampleData(): Promise<void> {
        const sampleTasks = [
            {
                title: 'Implement user authentication',
                description: 'Add JWT-based authentication system',
                status: 'COMPLETED' as TaskStatus,
                priority: 'HIGH' as any,
                categoryCode: 'FEAT' as CategoryCode,
                createdDate: '2025-01-01T00:00:00Z',
                updatedDate: '2025-01-05T00:00:00Z',
                estimatedHours: 8,
            },
            {
                title: 'Fix memory leak in WebSocket handler',
                description: 'WebSocket connections not being properly closed',
                status: 'IN_PROGRESS' as TaskStatus,
                priority: 'CRITICAL' as any,
                categoryCode: 'BUG' as CategoryCode,
                createdDate: '2025-01-03T00:00:00Z',
                updatedDate: '2025-01-05T00:00:00Z',
                estimatedHours: 4,
            },
            {
                title: 'Add TypeScript support',
                description: 'Migrate JavaScript codebase to TypeScript',
                status: 'PENDING' as TaskStatus,
                priority: 'MEDIUM' as any,
                categoryCode: 'REF' as CategoryCode,
                createdDate: '2025-01-04T00:00:00Z',
                updatedDate: '2025-01-04T00:00:00Z',
                estimatedHours: 16,
            },
        ];

        for (const task of sampleTasks) {
            await this.createTask(task);
        }
    }
}

/**
 * Mock provider factory
 */
export const mockProviderFactory: ProviderFactory = {
    name: 'mock',
    create: async (config: Record<string, any>) => {
        return new MockProvider(config);
    },
};
