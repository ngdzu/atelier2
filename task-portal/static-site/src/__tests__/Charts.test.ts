/**
 * Tests for Charts components
 */
import { describe, it, expect } from 'vitest';
import { AreaChart, BarChart, PieChart, PieLegend } from '../components/Charts.js';

describe('AreaChart', () => {
    it('should render area chart with data', () => {
        const data = [
            { week: '2024-01-01', count: 5 },
            { week: '2024-01-08', count: 8 },
            { week: '2024-01-15', count: 3 }
        ];

        const result = AreaChart({ data });

        expect(result).toContain('svg');
        expect(result).toContain('path');
        expect(result).toContain('chart-summary');
        expect(result).toContain('Total:');
        expect(result).toContain('16'); // 5 + 8 + 3
        expect(result).toContain('Weekly Avg:');
        expect(result).toContain('Peak:');
    });

    it('should handle empty data', () => {
        const result = AreaChart({ data: [] });

        expect(result).toContain('chart-empty');
        expect(result).toContain('No data available');
    });

    it('should handle custom dimensions', () => {
        const data = [{ week: '2024-01-01', count: 5 }];
        const result = AreaChart({ data, width: 600, height: 400 });

        expect(result).toContain('width="600"');
        expect(result).toContain('height="400"');
    });

    it('should calculate correct average', () => {
        const data = [
            { week: '2024-01-01', count: 10 },
            { week: '2024-01-08', count: 20 },
            { week: '2024-01-15', count: 30 }
        ];

        const result = AreaChart({ data });

        expect(result).toContain('20.0'); // (10 + 20 + 30) / 3
    });
});

describe('BarChart', () => {
    it('should render bar chart with data', () => {
        const data = { PENDING: 5, IN_PROGRESS: 3, COMPLETED: 10 };
        const colors = { PENDING: '#3B82F6', IN_PROGRESS: '#F59E0B', COMPLETED: '#10B981' };

        const result = BarChart({ data, colors });

        expect(result).toContain('svg');
        expect(result).toContain('rect');
        expect(result).toContain('PENDING');
        expect(result).toContain('IN_PROGRESS');
        expect(result).toContain('COMPLETED');
        expect(result).toContain('#3B82F6');
        expect(result).toContain('#F59E0B');
        expect(result).toContain('#10B981');
    });

    it('should handle empty data', () => {
        const result = BarChart({ data: {}, colors: {} });

        expect(result).toContain('chart-empty');
    });

    it('should use default color for unknown keys', () => {
        const data = { UNKNOWN: 5 };
        const colors = {};

        const result = BarChart({ data, colors });

        expect(result).toContain('#6B7280'); // Default color
    });
});

describe('PieChart', () => {
    it('should render pie chart with data', () => {
        const data: [string, number][] = [
            ['FEAT', 10],
            ['BUG', 5],
            ['DOCS', 3]
        ];
        const colors = ['#8B5CF6', '#3B82F6', '#EC4899'];

        const result = PieChart({ data, colors });

        expect(result).toContain('svg');
        expect(result).toContain('path');
        expect(result).toContain('id="pieChart"');
        expect(result).toContain('data-label="FEAT"');
        expect(result).toContain('data-value="10"');
    });

    it('should handle empty data', () => {
        const result = PieChart({ data: [], colors: [] });

        expect(result).toContain('chart-empty');
    });

    it('should handle single slice', () => {
        const data: [string, number][] = [['FEAT', 100]];
        const colors = ['#8B5CF6'];

        const result = PieChart({ data, colors });

        expect(result).toContain('svg');
        expect(result).toContain('path');
    });
});

describe('PieLegend', () => {
    it('should render legend items', () => {
        const data: [string, number][] = [
            ['FEAT', 10],
            ['BUG', 5]
        ];
        const colors = ['#8B5CF6', '#3B82F6'];

        const result = PieLegend(data, colors);

        expect(result).toContain('chart-legend-item');
        expect(result).toContain('FEAT');
        expect(result).toContain('BUG');
        expect(result).toContain('10');
        expect(result).toContain('5');
        expect(result).toContain('#8B5CF6');
        expect(result).toContain('#3B82F6');
    });

    it('should handle empty data', () => {
        const result = PieLegend([], []);

        expect(result).toBe('');
    });
});
