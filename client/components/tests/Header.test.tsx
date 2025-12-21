import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import Header from '../Header';
import { STORE_NAME, NAV_LINKS } from '../../constants';

describe('Header', () => {
  it('should render without errors', () => {
    const { container } = customRender(<Header />);
    expect(container).toBeInTheDocument();
  });

  it('should render with default variant (standard)', () => {
    customRender(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-[#FDFCFB]');
    expect(nav).not.toHaveClass('fixed');
  });

  it('should render with fixed variant', () => {
    customRender(<Header variant="fixed" />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed');
    expect(nav).toHaveClass('mix-blend-difference');
  });

  it('should display store name', () => {
    customRender(<Header />);
    expect(screen.getByText(STORE_NAME)).toBeInTheDocument();
  });

  it('should display navigation links', () => {
    customRender(<Header />);
    NAV_LINKS.forEach(link => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it('should display Reserve button', () => {
    customRender(<Header />);
    const reserveButton = screen.getByText('Reserve');
    expect(reserveButton).toBeInTheDocument();
    expect(reserveButton.closest('a')).toHaveAttribute('href', '/book');
  });

  it('should have proper link attributes for navigation', () => {
    customRender(<Header />);
    NAV_LINKS.forEach(link => {
      const linkElement = screen.getByText(link.name).closest('a');
      expect(linkElement).toHaveAttribute('href', link.path);
    });
  });

  it('should display logo image', () => {
    customRender(<Header />);
    const logo = screen.getByAltText('LuxeNail Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });
});

