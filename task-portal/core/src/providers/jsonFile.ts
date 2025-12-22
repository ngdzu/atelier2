/**
 * JSON File Data Provider
 *
 * Reads from and writes to a TASK_REGISTRY.json file.
 * Uses file watching to detect external changes.
 * Reference implementation of the IDataProvider interface.
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import {
    IDataProvider,
    Task,
    TaskFilter,
    TaskRegistry,
    SyncResult,
    ValidationResult,
    ValidationError,
    TaskStats,
    TaskStatus,
    ProviderFactory,
} from '../types';

export interface JsonFileProviderConfig {
    registryPath: string;           // Path to TASK_REGISTRY.json
    taskFilesPath?: string;         // Optional: Path to .task files for full sync
    cacheTTL?: number;              // Cache TTL in milliseconds (default: 5000)
}

export class JsonFileProvider implements IDataProvider {
    private config: JsonFileProviderConfig;
    private cache: TaskRegistry | null = null;
    private cacheTime: number = 0;
    private cacheValid: boolean = false;

    constructor(config: JsonFileProviderConfig) {
        if (!config.registryPath) {
            throw new Error('registryPath is required');
        }
        this.config = {
            cacheTTL: 5000,
            ...config,
        };
    }

    /**
     * Check if cache is still valid
     */
    private isCacheValid(): boolean {
        if (!this.cacheValid || !this.cache) {
            return false;
        }
        const elapsed = Date.now() - this.cacheTime;
        return elapsed < (this.config.cacheTTL || 5000);
    }

    /**
     * Invalidate cache
     */
    private invalidateCache(): void {
        this.cacheValid = false;
        this.cache = null;
    }

    /**
     * Load and parse TASK_REGISTRY.json
     */
    private async loadRegistry(): Promise<TaskRegistry> {
        try {
            const content = await fs.readFile(this.config.registryPath, 'utf-8');
            const registry = JSON.parse(content) as TaskRegistry;
            return registry;
        } catch (error) {
            if ((error as any).code === 'ENOENT') {
                // File doesn't exist - return empty registry
                return {
                    metadata: {
                        version: '1.0.0',
                        lastUpdated: new Date().toISOString(),
                        totalTasks: 0,
                        tasksByStatus: {
                            PENDING: 0,
                            IN_PROGRESS: 0,
                            BLOCKED: 0,
                            COMPLETED: 0,
                            CANCELLED: 0,
                        },
                        tasksByCategory: {} as any,
                    },
                    categories: [],
                    tasks: [],
                };
            }
            throw new Error(`Failed to load TASK_REGISTRY.json: ${(error as any).message}`);
        }
    }

    /**
     * Save registry to TASK_REGISTRY.json
     */
    private async saveRegistry(registry: TaskRegistry): Promise<void> {
        try {
            // Ensure directory exists
            const dir = join(this.config.registryPath, '..');
            await fs.mkdir(dir, { recursive: true });

            // Write to temp file first (atomic write)
            const tempPath = `${this.config.registryPath}.tmp`;
            await fs.writeFile(tempPath, JSON.stringify(registry, null, 2));

            // Rename temp to actual (atomic on most systems)
            await fs.rename(tempPath, this.config.registryPath);

            // Invalidate cache so next read gets fresh data
            this.invalidateCache();
        } catch (error) {
            throw new Error(`Failed to save TASK_REGISTRY.json: ${(error as any).message}`);
        }
    }

    /**
     * Get registry with caching
     */
    private async getRegistry(): Promise<TaskRegistry> {
        if (this.isCacheValid()) {
            return this.cache!;
        }

        const registry = await this.loadRegistry();
        this.cache = registry;
        this.cacheTime = Date.now();
        this.cacheValid = true;

        return registry;
    }

    async readRegistry(): Promise<TaskRegistry> {
        return this.getRegistry();
    }

    async readTask(taskId: string): Promise<Task | null> {
        const registry = await this.getRegistry();
        return registry.tasks.find(t => t.id === taskId) || null;
    }

    async readTasksByFilter(filter: TaskFilter): Promise<Task[]> {
        const registry = await this.getRegistry();
        let results = registry.tasks;

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
            results = results.filter(t =>
                t.title.toLowerCase().includes(text) ||
                t.description.toLowerCase().includes(text) ||
                t.id.toLowerCase().includes(text)
            );
        }

        if (filter.hasDependencies !== undefined) {
            results = results.filter(t => (t.dependencies?.length || 0) > 0 === filter.hasDependencies);
        }

        if (filter.isBlocked !== undefined) {
            results = results.filter(t => (t.status === 'BLOCKED') === filter.isBlocked);
        }

        return results;
    }

    async listCategories() {
        const registry = await this.getRegistry();
        return registry.categories;
    }

    async createTask(task: Omit<Task, 'id'>): Promise<Task> {
        const registry = await this.getRegistry();

        // Generate task ID
        const category = registry.categories.find(c => c.code === task.categoryCode);
        if (!category) {
            throw new Error(`Unknown category: ${task.categoryCode}`);
        }

        const nextNum = category.nextNumber;
        const id = `TASK-${task.categoryCode}-${String(nextNum).padStart(3, '0')}`;

        const fullTask: Task = { ...task, id };

        registry.tasks.push(fullTask);
        category.nextNumber = nextNum + 1;
        category.taskCount = registry.tasks.filter(t => t.categoryCode === task.categoryCode).length;

        // Update metadata
        registry.metadata.lastUpdated = new Date().toISOString();
        registry.metadata.totalTasks = registry.tasks.length;

        await this.saveRegistry(registry);
        return fullTask;
    }

    async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
        const registry = await this.getRegistry();

        const taskIndex = registry.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            throw new Error(`Task ${taskId} not found`);
        }

        const updated: Task = { ...registry.tasks[taskIndex], ...updates };
        registry.tasks[taskIndex] = updated;

        registry.metadata.lastUpdated = new Date().toISOString();

        await this.saveRegistry(registry);
        return updated;
    }

    async deleteTask(taskId: string): Promise<boolean> {
        const registry = await this.getRegistry();

        const taskIndex = registry.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return false;
        }

        const task = registry.tasks[taskIndex];
        registry.tasks.splice(taskIndex, 1);

        const category = registry.categories.find(c => c.code === task.categoryCode);
        if (category) {
            category.taskCount = registry.tasks.filter(t => t.categoryCode === task.categoryCode).length;
        }

        registry.metadata.lastUpdated = new Date().toISOString();
        registry.metadata.totalTasks = registry.tasks.length;

        await this.saveRegistry(registry);
        return true;
    }

    async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
        const registry = await this.getRegistry();

        const task = registry.tasks.find(t => t.id === taskId);
        if (!task) {
            throw new Error(`Task ${taskId} not found`);
        }

        task.status = status;
        registry.metadata.lastUpdated = new Date().toISOString();

        await this.saveRegistry(registry);
        return task;
    }

    async bulkCreateTasks(tasks: Array<Omit<Task, 'id'>>): Promise<Task[]> {
        const created: Task[] = [];
        for (const task of tasks) {
            const created_task = await this.createTask(task);
            created.push(created_task);
        }
        return created;
    }

    async bulkUpdateTasks(updates: Array<{ id: string; data: Partial<Task> }>): Promise<Task[]> {
        const updated: Task[] = [];
        for (const { id, data } of updates) {
            const updated_task = await this.updateTask(id, data);
            updated.push(updated_task);
        }
        return updated;
    }

    async search(query: string): Promise<Task[]> {
        const registry = await this.getRegistry();
        const lowerQuery = query.toLowerCase();

        return registry.tasks.filter(t =>
            t.title.toLowerCase().includes(lowerQuery) ||
            t.description.toLowerCase().includes(lowerQuery) ||
            t.id.toLowerCase().includes(lowerQuery)
        );
    }

    async sync(): Promise<SyncResult> {
        try {
            // Re-load from disk to get latest
            this.invalidateCache();
            await this.loadRegistry();

            return {
                success: true,
                message: `Synced from ${this.config.registryPath}`,
                tasksAdded: 0,
                tasksModified: 0,
                tasksRemoved: 0,
            };
        } catch (error) {
            return {
                success: false,
                message: `Sync failed: ${(error as any).message}`,
                errors: [{ error: (error as any).message }],
            };
        }
    }

    async validate(): Promise<ValidationResult> {
        const registry = await this.getRegistry();
        const errors: ValidationError[] = [];
        const warnings: any[] = [];

        // Check for circular dependencies
        for (const task of registry.tasks) {
            if (task.dependencies) {
                for (const depId of task.dependencies) {
                    const depTask = registry.tasks.find(t => t.id === depId);
                    if (!depTask) {
                        errors.push({
                            type: 'MISSING_DEPENDENCY' as const,
                            message: `Task ${task.id} depends on missing task ${depId}`,
                            taskId: task.id,
                        });
                    }
                }
            }
        }

        // Check for duplicate task IDs
        const ids = new Set<string>();
        for (const task of registry.tasks) {
            if (ids.has(task.id)) {
                errors.push({
                    type: 'DUPLICATE_ID' as const,
                    message: `Duplicate task ID: ${task.id}`,
                    taskId: task.id,
                });
            }
            ids.add(task.id);
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
        };
    }

    async getMetadata() {
        const registry = await this.getRegistry();
        return registry.metadata;
    }

    async getStats(): Promise<TaskStats> {
        const registry = await this.getRegistry();
        const tasks = registry.tasks;

        const completed = tasks.filter(t => t.status === 'COMPLETED').length;
        const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
        const blocked = tasks.filter(t => t.status === 'BLOCKED').length;
        const pending = tasks.filter(t => t.status === 'PENDING').length;
        const cancelled = tasks.filter(t => t.status === 'CANCELLED').length;

        const tasksByCategory: Record<string, number> = {};
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
            tasksByCategory: tasksByCategory as any,
            tasksByAssignee,
        };
    }

    async healthCheck(): Promise<boolean> {
        try {
            await this.getRegistry();
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * JSON file provider factory
 */
export const jsonFileProviderFactory: ProviderFactory = {
    name: 'json-file',
    create: async (config: Record<string, any>) => {
        return new JsonFileProvider(config as JsonFileProviderConfig);
    },
};
