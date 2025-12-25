import { describe, it, expect } from 'vitest';
import { calculateStats } from './stats';
import type { Task } from '../types';

describe('stats utils', () => {
  const tasks: Task[] = [
    { id: '1', title: 'A', status: 'COMPLETED', category: 'FEAT', priority: 'HIGH', updated: '2024-01-01T00:00:00Z' },
    { id: '2', title: 'B', status: 'PENDING', category: 'BUG', priority: 'LOW' },
    { id: '3', title: 'C', status: 'COMPLETED', category: 'FEAT', updated: '2024-01-08T00:00:00Z' }
  ];

  it('calculates totals and breakdowns', () => {
    const stats = calculateStats(tasks);
    expect(stats.total).toBe(3);
    expect(stats.totalCompleted).toBe(2);
    expect(stats.completionRate).toBe(67);
    expect(stats.byStatus.COMPLETED).toBe(2);
    expect(stats.byCategory.FEAT).toBe(2);
    expect(stats.byPriority.HIGH).toBe(1);
  });

  it('computes last 8 weeks array', () => {
    const stats = calculateStats(tasks);
    expect(Array.isArray(stats.completionsByWeek)).toBe(true);
    expect(stats.completionsByWeek.length).toBe(8);
  });
});
