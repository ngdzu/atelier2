/**
 * Tests for StatsCards component
 */
import { describe, it, expect } from 'vitest';
import { StatCard, StatsCards } from '../components/StatsCards.js';

describe('StatCard', () => {
    it('should render basic stat card', () => {
        const result = StatCard({ icon: '🎯', label: 'Total', value: 42 });

        expect(result).toContain('stat-card');
        expect(result).toContain('🎯');
        expect(result).toContain('Total');
        expect(result).toContain('42');
        expect(result).toContain('data-value="42"');
    });

    it('should render progress card with percentage', () => {
        const result = StatCard({
            icon: '📈',
            label: 'Completion',
            value: 75,
            isProgressCard: true,
            progressPercentage: 75
        });

        expect(result).toContain('has-progress');
        expect(result).toContain('75%');
        expect(result).toContain('progress-bar');
        expect(result).toContain('data-progress="75"');
        expect(result).toContain('data-target-width="75"');
    });

    it('should not render progress bar for non-progress cards', () => {
        const result = StatCard({ icon: '✅', label: 'Done', value: 10 });

        expect(result).not.toContain('progress-bar');
        expect(result).not.toContain('has-progress');
    });
});

describe('StatsCards', () => {
    it('should render all stat cards', () => {
        const result = StatsCards({
            total: 100,
            totalCompleted: 75,
            completionRate: 75,
            inProgress: 15,
            pending: 10
        });

        expect(result).toContain('stats');
        expect(result).toContain('Total Tasks');
        expect(result).toContain('Completed');
        expect(result).toContain('Completion Rate');
        expect(result).toContain('In Progress');
        expect(result).toContain('Pending');
        expect(result).toContain('100');
        expect(result).toContain('75');
        expect(result).toContain('15');
        expect(result).toContain('10');
    });

    it('should handle zero values', () => {
        const result = StatsCards({
            total: 0,
            totalCompleted: 0,
            completionRate: 0,
            inProgress: 0,
            pending: 0
        });

        expect(result).toContain('0');
        expect(result).not.toContain('undefined');
        expect(result).not.toContain('NaN');
    });
});
