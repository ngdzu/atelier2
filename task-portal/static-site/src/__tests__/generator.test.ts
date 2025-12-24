/**
 * Integration tests for generator
 */
import { describe, it, expect } from 'vitest';
import { calculateStats, generateHTML } from '../generator.js';
import type { Task } from '../components/TaskTable.js';

describe('calculateStats', () => {
    const mockTasks: Task[] = [
        { id: 'FEAT-001', title: 'Task 1', status: 'COMPLETED', category: 'FEAT', priority: 'HIGH', updated: '2024-01-01T00:00:00Z' },
        { id: 'FEAT-002', title: 'Task 2', status: 'COMPLETED', category: 'FEAT', priority: 'MEDIUM', updated: '2024-01-02T00:00:00Z' },
        { id: 'BUG-001', title: 'Task 3', status: 'IN_PROGRESS', category: 'BUG', priority: 'HIGH', updated: '2024-01-03T00:00:00Z' },
        { id: 'BUG-002', title: 'Task 4', status: 'PENDING', category: 'BUG' },
    ];

    it('should calculate total tasks', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.total).toBe(4);
    });

    it('should count by status', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.byStatus.COMPLETED).toBe(2);
        expect(stats.byStatus.IN_PROGRESS).toBe(1);
        expect(stats.byStatus.PENDING).toBe(1);
    });

    it('should count by category', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.byCategory.FEAT).toBe(2);
        expect(stats.byCategory.BUG).toBe(2);
    });

    it('should count by priority', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.byPriority.HIGH).toBe(2);
        expect(stats.byPriority.MEDIUM).toBe(1);
    });

    it('should calculate completion rate', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.completionRate).toBe(50); // 2 out of 4 completed
    });

    it('should calculate total completed', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.totalCompleted).toBe(2);
    });

    it('should handle empty tasks', () => {
        const stats = calculateStats([]);
        expect(stats.total).toBe(0);
        expect(stats.completionRate).toBe(0);
        expect(stats.totalCompleted).toBe(0);
    });

    it('should generate completions by week', () => {
        const stats = calculateStats(mockTasks);
        expect(stats.completionsByWeek).toBeInstanceOf(Array);
        expect(stats.completionsByWeek.length).toBeGreaterThan(0);
    });
});

describe('generateHTML', () => {
    const mockTasks: Task[] = [
        { id: 'FEAT-001', title: 'Task 1', status: 'COMPLETED', category: 'FEAT', priority: 'HIGH' }
    ];

    const mockStats = {
        total: 1,
        byStatus: { COMPLETED: 1 },
        byCategory: { FEAT: 1 },
        byPriority: { HIGH: 1 },
        completionRate: 100,
        totalCompleted: 1,
        completionsByWeek: [{ week: '2024-01-01', count: 1 }]
    };

    const mockMetadata = {
        projectName: 'Test Project'
    };

    it('should generate valid HTML structure', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);

        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('<html lang="en">');
        expect(html).toContain('<head>');
        expect(html).toContain('<body>');
        expect(html).toContain('</html>');
    });

    it('should include project name in title', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('<title>Test Project - Dashboard</title>');
    });

    it('should include header component', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('header-navbar');
        expect(html).toContain('Task Portal');
    });

    it('should include stats cards', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('stats');
        expect(html).toContain('Total Tasks');
        expect(html).toContain('Completed');
    });

    it('should include charts', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('charts');
        expect(html).toContain('Completions by Week');
        expect(html).toContain('Status');
        expect(html).toContain('Task Categories');
    });

    it('should include filters', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('filters-section');
        expect(html).toContain('searchInput');
    });

    it('should include task table', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('task-table');
        expect(html).toContain('FEAT-001');
    });

    it('should include styles', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('<style>');
        expect(html).toContain('</style>');
    });

    it('should include scripts', () => {
        const html = generateHTML(mockTasks, mockStats, mockMetadata);
        expect(html).toContain('<script>');
        expect(html).toContain('</script>');
    });

    it('should handle default metadata', () => {
        const html = generateHTML(mockTasks, mockStats, {});
        expect(html).toContain('Task Portal - Dashboard');
    });
});
