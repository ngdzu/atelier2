import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  it('should render without errors', () => {
    const { container } = customRender(<LandingPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display header with fixed variant', () => {
    customRender(<LandingPage />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed');
  });

  it('should display hero section title', () => {
    customRender(<LandingPage />);
    expect(screen.getByText(/Artistry for the/i)).toBeInTheDocument();
    expect(screen.getByText(/Modern Soul/i)).toBeInTheDocument();
  });

  it('should display call to action link', () => {
    customRender(<LandingPage />);
    const ctaLink = screen.getByText('Begin Your Journey');
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.closest('a')).toHaveAttribute('href', '/book');
  });

  it('should display portfolio section', () => {
    customRender(<LandingPage />);
    expect(screen.getByText('The Portfolio.')).toBeInTheDocument();
  });

  it('should display gallery link', () => {
    customRender(<LandingPage />);
    const galleryLink = screen.getByText('View All Looks');
    expect(galleryLink).toBeInTheDocument();
    expect(galleryLink.closest('a')).toHaveAttribute('href', '/gallery');
  });

  it('should display footer', () => {
    customRender(<LandingPage />);
    // Footer should be present (contains copyright or store name)
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});

