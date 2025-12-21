import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import Footer from '../Footer';
import { STORE_NAME, PHONE_NUMBER, ADDRESS_STREET, ADDRESS_CITY, NAV_LINKS } from '../../constants';

describe('Footer', () => {
  it('should render without errors', () => {
    const { container } = customRender(<Footer />);
    expect(container).toBeInTheDocument();
  });

  it('should display store name', () => {
    customRender(<Footer />);
    expect(screen.getByText(STORE_NAME.toUpperCase())).toBeInTheDocument();
  });

  it('should display address information', () => {
    customRender(<Footer />);
    expect(screen.getByText(ADDRESS_STREET)).toBeInTheDocument();
    expect(screen.getByText(ADDRESS_CITY)).toBeInTheDocument();
    expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
  });

  it('should display navigation links', () => {
    customRender(<Footer />);
    NAV_LINKS.forEach(link => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it('should display social media links', () => {
    customRender(<Footer />);
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Pinterest')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('should display copyright information', () => {
    customRender(<Footer />);
    expect(screen.getByText(`© 2024 ${STORE_NAME.toUpperCase()} STUDIO`)).toBeInTheDocument();
    expect(screen.getByText('Privacy / Terms')).toBeInTheDocument();
  });

  it('should have proper link attributes', () => {
    customRender(<Footer />);
    NAV_LINKS.forEach(link => {
      const linkElement = screen.getByText(link.name).closest('a');
      expect(linkElement).toHaveAttribute('href', link.path);
    });
  });
});

