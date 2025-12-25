import { describe, it, expect } from 'vitest';
import { getCategoryColor, getStatusColor, getPriorityColor, getAllCategories, getCategoryPalette } from './colors';

describe('colors utils', () => {
  it('returns known category color and default for unknown', () => {
    expect(getCategoryColor('FEAT')).toMatch(/^#/);
    expect(getCategoryColor('UNKNOWN')).toBe('#6B7280');
  });

  it('returns status color and default', () => {
    expect(getStatusColor('COMPLETED')).toBe('#10B981');
    expect(getStatusColor('FOO')).toBe('#6B7280');
  });

  it('returns priority color and default', () => {
    expect(getPriorityColor('HIGH')).toBeTypeOf('string');
    expect(getPriorityColor('FOO')).toBe('#6B7280');
  });

  it('exposes categories and palette', () => {
    expect(getAllCategories().length).toBeGreaterThan(0);
    expect(getCategoryPalette().length).toBeGreaterThan(0);
  });
});
