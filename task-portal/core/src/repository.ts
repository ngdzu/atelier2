/**
 * Task Repository
 *
 * Higher-level API for common task operations.
 * Wraps the data provider to provide convenient methods.
 */

import { IDataProvider, Task, TaskFilter, TaskStatus, CategoryCode, TaskPriority } from './types';

export class TaskRepository {
    constructor(private provider: IDataProvider) { }

    /**
     * Find a task by ID
     */
    async findById(id: string): Promise<Task | null> {
        return this.provider.readTask(id);
    }

    /**
     * Find all tasks with optional filtering
     */
    async findAll(filter?: TaskFilter): Promise<Task[]> {
        if (!filter) {
            const registry = await this.provider.readRegistry();
            return registry.tasks;
        }
        return this.provider.readTasksByFilter(filter);
    }

    /**
     * Save a new task
     */
    async save(task: Omit<Task, 'id'>): Promise<Task> {
        return this.provider.createTask(task);
    }

    /**
     * Update an existing task
     */
    async update(id: string, updates: Partial<Task>): Promise<Task> {
        return this.provider.updateTask(id, updates);
    }

    /**
     * Delete a task
     */
    async delete(id: string): Promise<boolean> {
        return this.provider.deleteTask(id);
    }

    /**
     * Find all tasks by category
     */
    async findByCategory(categoryCode: CategoryCode): Promise<Task[]> {
        return this.provider.readTasksByFilter({ categoryCode });
    }

    /**
     * Find all tasks by status
     */
    async findByStatus(status: TaskStatus): Promise<Task[]> {
        return this.provider.readTasksByFilter({ status });
    }

    /**
     * Find all tasks by priority
     */
    async findByPriority(priority: TaskPriority): Promise<Task[]> {
        return this.provider.readTasksByFilter({ priority });
    }

    /**
     * Find all tasks assigned to a person
     */
    async findByAssignee(assignee: string): Promise<Task[]> {
        return this.provider.readTasksByFilter({ assignee });
    }

    /**
     * Find all blocked tasks
     */
    async findBlocked(): Promise<Task[]> {
        return this.provider.readTasksByFilter({ isBlocked: true });
    }

    /**
     * Find all tasks with dependencies
     */
    async findWithDependencies(): Promise<Task[]> {
        return this.provider.readTasksByFilter({ hasDependencies: true });
    }

    /**
     * Find all tasks that depend on a given task
     */
    async findDependents(taskId: string): Promise<Task[]> {
        const all = await this.findAll();
        return all.filter(t => t.dependencies?.includes(taskId));
    }

    /**
     * Get task's dependencies
     */
    async getDependencies(taskId: string): Promise<Task[]> {
        const task = await this.findById(taskId);
        if (!task || !task.dependencies || task.dependencies.length === 0) {
            return [];
        }

        const deps: Task[] = [];
        for (const depId of task.dependencies) {
            const depTask = await this.findById(depId);
            if (depTask) {
                deps.push(depTask);
            }
        }
        return deps;
    }

    /**
     * Search for tasks
     */
    async search(query: string): Promise<Task[]> {
        return this.provider.search(query);
    }

    /**
     * Update task status
     */
    async updateStatus(taskId: string, status: TaskStatus): Promise<Task> {
        return this.provider.updateTaskStatus(taskId, status);
    }

    /**
     * Mark task as completed
     */
    async complete(taskId: string): Promise<Task> {
        return this.provider.updateTaskStatus(taskId, 'COMPLETED');
    }

    /**
     * Mark task as in progress
     */
    async start(taskId: string): Promise<Task> {
        return this.provider.updateTaskStatus(taskId, 'IN_PROGRESS');
    }

    /**
     * Mark task as blocked
     */
    async block(taskId: string): Promise<Task> {
        return this.provider.updateTaskStatus(taskId, 'BLOCKED');
    }

    /**
     * Get count of tasks by status
     */
    async countByStatus(status: TaskStatus): Promise<number> {
        const tasks = await this.findByStatus(status);
        return tasks.length;
    }

    /**
     * Get completion rate (0-100)
     */
    async getCompletionRate(): Promise<number> {
        const stats = await this.provider.getStats();
        return stats.completionRate;
    }

    /**
     * Get all statistics
     */
    async getStats() {
        return this.provider.getStats();
    }
}
