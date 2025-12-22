import { describe, it, expect, beforeEach } from 'vitest';
import { MockProvider } from '../src/providers/mock';
import { TaskRepository } from '../src/repository';
import { TaskStatus, CategoryCode } from '../src/types';

describe('MockProvider', () => {
    let provider: MockProvider;

    beforeEach(() => {
        provider = new MockProvider();
    });

    it('should initialize with default categories', async () => {
        const categories = await provider.listCategories();
        expect(categories).toHaveLength(14);
        expect(categories.map(c => c.code)).toContain('FEAT');
        expect(categories.map(c => c.code)).toContain('BUG');
    });

    it('should create a task', async () => {
        const task = await provider.createTask({
            title: 'Test Task',
            description: 'Test Description',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        expect(task.id).toBe('TASK-FEAT-001');
        expect(task.title).toBe('Test Task');
    });

    it('should read a task', async () => {
        const created = await provider.createTask({
            title: 'Test Task',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'BUG',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const read = await provider.readTask(created.id);
        expect(read).not.toBeNull();
        expect(read?.title).toBe('Test Task');
    });

    it('should update a task', async () => {
        const created = await provider.createTask({
            title: 'Original',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const updated = await provider.updateTask(created.id, {
            title: 'Updated',
            status: 'IN_PROGRESS',
        });

        expect(updated.title).toBe('Updated');
        expect(updated.status).toBe('IN_PROGRESS');
    });

    it('should delete a task', async () => {
        const created = await provider.createTask({
            title: 'To Delete',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'BUG',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const deleted = await provider.deleteTask(created.id);
        expect(deleted).toBe(true);

        const read = await provider.readTask(created.id);
        expect(read).toBeNull();
    });

    it('should filter tasks by category', async () => {
        await provider.createTask({
            title: 'Feature',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        await provider.createTask({
            title: 'Bug',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'BUG',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const featTasks = await provider.readTasksByFilter({ categoryCode: 'FEAT' });
        expect(featTasks).toHaveLength(1);
        expect(featTasks[0].title).toBe('Feature');
    });

    it('should filter tasks by status', async () => {
        await provider.createTask({
            title: 'Pending',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        await provider.createTask({
            title: 'In Progress',
            description: 'Test',
            status: 'IN_PROGRESS',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const inProgress = await provider.readTasksByFilter({ status: 'IN_PROGRESS' });
        expect(inProgress).toHaveLength(1);
        expect(inProgress[0].title).toBe('In Progress');
    });

    it('should search tasks', async () => {
        await provider.createTask({
            title: 'Unique Title',
            description: 'Other description',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const results = await provider.search('Unique');
        expect(results).toHaveLength(1);
        expect(results[0].title).toBe('Unique Title');
    });

    it('should validate registry', async () => {
        const result = await provider.validate();
        expect(result.isValid).toBe(true);
    });

    it('should get stats', async () => {
        await provider.createTask({
            title: 'Task 1',
            description: 'Test',
            status: 'COMPLETED',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        await provider.createTask({
            title: 'Task 2',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'BUG',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const stats = await provider.getStats();
        expect(stats.totalTasks).toBe(2);
        expect(stats.completedTasks).toBe(1);
        expect(stats.pendingTasks).toBe(1);
    });
});

describe('TaskRepository', () => {
    let provider: MockProvider;
    let repo: TaskRepository;

    beforeEach(async () => {
        provider = new MockProvider();
        repo = new TaskRepository(provider);
    });

    it('should find all tasks', async () => {
        await provider.createTask({
            title: 'Task 1',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const tasks = await repo.findAll();
        expect(tasks).toHaveLength(1);
    });

    it('should find tasks by category', async () => {
        await provider.createTask({
            title: 'Feature',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        await provider.createTask({
            title: 'Bug',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'BUG',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const bugs = await repo.findByCategory('BUG');
        expect(bugs).toHaveLength(1);
        expect(bugs[0].title).toBe('Bug');
    });

    it('should find blocked tasks', async () => {
        await provider.createTask({
            title: 'Blocked Task',
            description: 'Test',
            status: 'BLOCKED',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        await provider.createTask({
            title: 'Pending Task',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const blocked = await repo.findBlocked();
        expect(blocked).toHaveLength(1);
        expect(blocked[0].status).toBe('BLOCKED');
    });

    it('should update task status', async () => {
        const created = await provider.createTask({
            title: 'Test Task',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const completed = await repo.complete(created.id);
        expect(completed.status).toBe('COMPLETED');
    });

    it('should get completion rate', async () => {
        await provider.createTask({
            title: 'Completed',
            description: 'Test',
            status: 'COMPLETED',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        await provider.createTask({
            title: 'Pending',
            description: 'Test',
            status: 'PENDING',
            priority: 'MEDIUM',
            categoryCode: 'FEAT',
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        });

        const rate = await repo.getCompletionRate();
        expect(rate).toBe(50);
    });
});
