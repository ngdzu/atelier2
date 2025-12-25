import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Filters } from '../components/Filters';
import type { Stats, FilterState } from '../types';

const stats: Stats = {
  total: 10,
  totalCompleted: 5,
  completionRate: 50,
  byStatus: { PENDING: 3, IN_PROGRESS: 2, COMPLETED: 5 },
  byCategory: { FEAT: 6, BUG: 4 },
  byPriority: { HIGH: 2, MEDIUM: 3, LOW: 5 },
  completionsByWeek: []
};

const filters: FilterState = { search: '', categories: [], statuses: [], priorities: [] };

describe('Filters (React)', () => {
  it('renders search input and filter buttons', () => {
    render(<Filters stats={stats} filters={filters} onFilterChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search tasks by title, id...')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
  });
});
