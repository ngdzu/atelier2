import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Charts } from '../components/Charts';
import type { Stats, Task } from '../types';

const stats: Stats = {
  total: 2,
  totalCompleted: 1,
  completionRate: 50,
  byStatus: { COMPLETED: 1, PENDING: 1 },
  byCategory: { FEAT: 1, BUG: 1 },
  byPriority: { HIGH: 1 },
  completionsByWeek: []
};

const tasks: Task[] = [
  { id: 'A', title: 'a', status: 'COMPLETED', category: 'FEAT', updated: '2024-01-01T00:00:00Z' },
  { id: 'B', title: 'b', status: 'PENDING', category: 'BUG' }
];

describe('Charts container', () => {
  it('renders chart cards', () => {
    render(<Charts stats={stats} tasks={tasks} />);
    expect(screen.getByText('Completions')).toBeInTheDocument();
    expect(screen.getByText('Task Categories')).toBeInTheDocument();
  });
});
