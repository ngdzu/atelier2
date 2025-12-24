/**
 * Tests for Filters component
 */
import { describe, it, expect } from 'vitest';
import { Filters } from '../components/Filters.js';

describe('Filters', () => {
    it('should render all filter controls', () => {
        const result = Filters({
            categories: ['FEAT', 'BUG', 'DOCS'],
            statuses: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
            priorities: ['HIGH', 'MEDIUM', 'LOW']
        });

        expect(result).toContain('filters-section');
        expect(result).toContain('searchInput');
        expect(result).toContain('categoryFilter');
        expect(result).toContain('statusFilter');
        expect(result).toContain('priorityFilter');
    });

    it('should render category options', () => {
        const result = Filters({
            categories: ['FEAT', 'BUG'],
            statuses: [],
            priorities: []
        });

        expect(result).toContain('value="FEAT"');
        expect(result).toContain('value="BUG"');
        expect(result).toContain('All Categories');
    });

    it('should render status options', () => {
        const result = Filters({
            categories: [],
            statuses: ['PENDING', 'COMPLETED'],
            priorities: []
        });

        expect(result).toContain('value="PENDING"');
        expect(result).toContain('value="COMPLETED"');
        expect(result).toContain('All Statuses');
    });

    it('should render priority options', () => {
        const result = Filters({
            categories: [],
            statuses: [],
            priorities: ['HIGH', 'LOW']
        });

        expect(result).toContain('value="HIGH"');
        expect(result).toContain('value="LOW"');
        expect(result).toContain('All Priorities');
    });

    it('should handle empty arrays', () => {
        const result = Filters({
            categories: [],
            statuses: [],
            priorities: []
        });

        expect(result).toContain('filters-section');
        expect(result).toContain('All Categories');
        expect(result).toContain('All Statuses');
        expect(result).toContain('All Priorities');
    });
});
