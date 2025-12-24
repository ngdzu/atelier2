/**
 * Tests for Header component
 */
import { describe, it, expect } from 'vitest';
import { Header } from '../components/Header.js';

describe('Header', () => {
    it('should render header with project name', () => {
        const result = Header({ projectName: 'My Project' });

        expect(result).toContain('Task Portal');
        expect(result).toContain('My Project');
        expect(result).toContain('header-navbar');
    });

    it('should render header with default structure', () => {
        const result = Header({ projectName: 'Test' });

        expect(result).toContain('header-left');
        expect(result).toContain('header-right');
        expect(result).toContain('header-logo');
        expect(result).toContain('project-name');
    });

    it('should escape HTML in project name', () => {
        const result = Header({ projectName: 'Test <script>alert("xss")</script>' });

        // Should contain the raw string, not execute script
        expect(result).toContain('Test <script>alert("xss")</script>');
    });
});
