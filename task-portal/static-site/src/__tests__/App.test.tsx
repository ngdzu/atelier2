import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

const mockTasks = [
  { id: 'T-1', title: 'Test Task', status: 'COMPLETED', category: 'FEAT', priority: 'HIGH', updated: '2024-01-01T00:00:00Z' },
  { id: 'T-2', title: 'Another Task', status: 'PENDING', category: 'BUG' }
];

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ tasks: mockTasks })
    }) as any));
  });

  it('renders dashboard sections and loads tasks', async () => {
    render(<App />);

    // Header
    expect(screen.getByText('Task Portal')).toBeInTheDocument();

    // StatsCards with total tasks
    await waitFor(() => {
      expect(screen.getByText('Total Tasks')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    // Charts titles present
    expect(screen.getByText('Completions')).toBeInTheDocument();
    expect(screen.getByText('Task Categories')).toBeInTheDocument();

    // Filters controls present (text labels)
    expect(screen.getAllByText('Category').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Status').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Priority').length).toBeGreaterThan(0);

    // TaskTable shows rows
    await waitFor(() => {
      expect(screen.getByText('T-1')).toBeInTheDocument();
      expect(screen.getByText('T-2')).toBeInTheDocument();
    });
  });
});
