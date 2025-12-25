import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskModal } from '../components/TaskModal';
import type { Task } from '../types';

const task: Task = {
  id: 'FEAT-001',
  title: 'Implement feature',
  status: 'IN_PROGRESS',
  category: 'FEAT',
  priority: 'HIGH',
  description: 'Details',
  progress: { percentage: 50, completed: 1, total: 2 }
};

describe('TaskModal', () => {
  it('renders task details', () => {
    render(<TaskModal task={task} onClose={() => { }} />);
    expect(screen.getByText('Implement feature')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('FEAT-001')).toBeInTheDocument();
  });
});
