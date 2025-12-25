import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { AreaChart } from '../components/charts/AreaChart';
import { BarChart } from '../components/charts/BarChart';
import { PieChart } from '../components/charts/PieChart';

describe('AreaChart (React)', () => {
    it('renders SVG and path for data', async () => {
        const data = [
            { label: 'W1', count: 5 },
            { label: 'W2', count: 8 },
            { label: 'W3', count: 3 },
        ];
        const { container } = render(<AreaChart data={data} />);
        expect(container.querySelector('svg.chart')).toBeTruthy();
        await waitFor(() => {
            expect(container.querySelectorAll('svg.chart path').length).toBeGreaterThan(0);
        });
    });
});

describe('BarChart (React)', () => {
    it('renders bars for categories', async () => {
        const data = { PENDING: 5, IN_PROGRESS: 3, COMPLETED: 10 };
        const { container } = render(<BarChart data={data} />);
        expect(container.querySelector('svg.chart')).toBeTruthy();
        await waitFor(() => {
            expect(container.querySelectorAll('svg.chart rect').length).toBeGreaterThan(0);
        });
    });
});

describe('PieChart (React)', () => {
    it('renders pie segments and legend', async () => {
        const data = { FEAT: 10, BUG: 5, DOC: 3 };
        const { container } = render(<PieChart data={data} />);
        expect(container.querySelector('svg.chart')).toBeTruthy();
        await waitFor(() => {
            expect(container.querySelectorAll('svg.chart path').length).toBe(3);
            expect(container.querySelector('.chart-legend')).toBeTruthy();
        });
    });
});
