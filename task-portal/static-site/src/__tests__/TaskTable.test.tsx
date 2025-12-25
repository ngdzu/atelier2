import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskTable } from '../components/TaskTable';
import type { Task } from '../types';

describe('TaskTable (React)', () => {
  const mockTasks: Task[] = [
    {
      id: 'FEAT-001',
      title: 'Feature 1',
      status: 'COMPLETED',
      priority: 'HIGH',
      category: 'FEAT',
      created: '2024-01-01T00:00:00Z'
    },
    {
      id: 'BUG-001',
      title: 'Bug fix',
      status: 'PENDING',
      priority: 'MEDIUM',
      category: 'BUG',
      created: '2024-01-02T00:00:00Z'
    }
  ];

  it('renders table with tasks', () => {
    const onTaskClick = vi.fn();
    render(<TaskTable tasks={mockTasks} onTaskClick={onTaskClick} />);
    expect(screen.getByText('FEAT-001')).toBeInTheDocument();
    expect(screen.getByText('BUG-001')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Bug fix')).toBeInTheDocument();
  });

  it('renders empty state when no tasks', () => {
    render(<TaskTable tasks={[]} onTaskClick={() => {}} />);
    expect(screen.getByText('No tasks match your filters.')).toBeInTheDocument();
  });
});
