import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PieChart } from './PieChart';

// Need to add @testing-library/react and @testing-library/user-event to dev dependencies
describe('PieChart', () => {
    const mockData = {
        'Design': 8,
        'Development': 12,
        'Testing': 5
    };

    it('should render chart with legend', () => {
        const { container } = render(<PieChart data={mockData} />);
        const svg = container.querySelector('svg.chart');
        const legend = container.querySelector('.chart-legend');

        expect(svg).toBeTruthy();
        expect(legend).toBeTruthy();
    });

    it('should render legend items with labels and values', () => {
        const { container } = render(<PieChart data={mockData} />);
        const legend = container.querySelector('.chart-legend');

        expect(legend?.textContent).toContain('Development');
        expect(legend?.textContent).toContain('12');
        expect(legend?.textContent).toContain('Design');
        expect(legend?.textContent).toContain('8');
        expect(legend?.textContent).toContain('Testing');
        expect(legend?.textContent).toContain('5');
    });

    it('should render pie segments', () => {
        const { container } = render(<PieChart data={mockData} />);
        const paths = container.querySelectorAll('svg.chart path');

        expect(paths.length).toBe(3);
        expect(paths[0].getAttribute('data-label')).toBe('Development');
        expect(paths[1].getAttribute('data-label')).toBe('Design');
        expect(paths[2].getAttribute('data-label')).toBe('Testing');
    });

    it('should show tooltip on mouseenter over segment', async () => {
        const { container } = render(<PieChart data={mockData} />);
        const paths = container.querySelectorAll('svg.chart path');
        const firstPath = paths[0] as SVGPathElement;

        // Simulate mouseenter
        const mouseEnterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            clientX: 100,
            clientY: 150
        });
        firstPath.dispatchEvent(mouseEnterEvent);

        await waitFor(() => {
            const tooltip = container.querySelector('.chart-tooltip.visible');
            expect(tooltip).toBeTruthy();
            expect(tooltip?.textContent).toContain('Development');
            expect(tooltip?.textContent).toContain('12');
        }, { timeout: 1000 });
    });

    it('should hide tooltip on mouseleave', async () => {
        const { container } = render(<PieChart data={mockData} />);
        const paths = container.querySelectorAll('svg.chart path');
        const firstPath = paths[0] as SVGPathElement;

        // Mouseenter to show tooltip
        const mouseEnterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            clientX: 100,
            clientY: 150
        });
        firstPath.dispatchEvent(mouseEnterEvent);

        await waitFor(() => {
            expect(container.querySelector('.chart-tooltip.visible')).toBeTruthy();
        });

        // Mouseleave to hide tooltip
        const mouseLeaveEvent = new MouseEvent('mouseleave', {
            bubbles: true
        });
        firstPath.dispatchEvent(mouseLeaveEvent);

        await waitFor(() => {
            expect(container.querySelector('.chart-tooltip.visible')).toBeFalsy();
        }, { timeout: 1000 });
    });

    it('should update tooltip position on mousemove', async () => {
        const { container } = render(<PieChart data={mockData} />);
        const paths = container.querySelectorAll('svg.chart path');
        const firstPath = paths[0] as SVGPathElement;

        // Mouseenter
        const mouseEnterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            clientX: 100,
            clientY: 150
        });
        firstPath.dispatchEvent(mouseEnterEvent);

        await waitFor(() => {
            expect(container.querySelector('.chart-tooltip.visible')).toBeTruthy();
        });

        let tooltip = container.querySelector('.chart-tooltip') as HTMLDivElement;
        const initialLeft = tooltip?.style.left;

        // Mousemove to new position
        const mouseMoveEvent = new MouseEvent('mousemove', {
            bubbles: true,
            clientX: 200,
            clientY: 250
        });
        firstPath.dispatchEvent(mouseMoveEvent);

        await waitFor(() => {
            tooltip = container.querySelector('.chart-tooltip') as HTMLDivElement;
            expect(tooltip?.style.left).toBe('200px');
        }, { timeout: 1000 });
    });

    it('should have correct tooltip styling', async () => {
        const { container } = render(<PieChart data={mockData} />);
        const paths = container.querySelectorAll('svg.chart path');
        const firstPath = paths[0] as SVGPathElement;

        const mouseEnterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            clientX: 100,
            clientY: 150
        });
        firstPath.dispatchEvent(mouseEnterEvent);

        await waitFor(() => {
            const tooltip = container.querySelector('.chart-tooltip') as HTMLDivElement;
            expect(tooltip).toBeTruthy();
            expect(tooltip.style.position).toBe('fixed');
            expect(tooltip.style.pointerEvents).toBe('none');
        }, { timeout: 1000 });
    });
});
