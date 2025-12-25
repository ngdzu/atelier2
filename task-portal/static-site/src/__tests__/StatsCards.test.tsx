import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsCards } from '../components/StatsCards';
import type { Stats } from '../types';

const stats: Stats = {
  total: 100,
  totalCompleted: 75,
  completionRate: 75,
  byStatus: { PENDING: 10, IN_PROGRESS: 15, COMPLETED: 75 },
  byCategory: { FEAT: 50, BUG: 50 },
  byPriority: { HIGH: 20, MEDIUM: 30, LOW: 50 },
  completionsByWeek: []
};

describe('StatsCards (React)', () => {
  it('renders stat cards with values', () => {
    render(<StatsCards stats={stats} />);
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Completion Rate')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
