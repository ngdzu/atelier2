import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header (React)', () => {
    it('renders title and project name', () => {
        render(<Header projectName="My Project" />);
        expect(screen.getByText('Task Portal')).toBeInTheDocument();
        expect(screen.getByText('Project: My Project')).toBeInTheDocument();
    });
});
