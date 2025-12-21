import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import AboutPage from '../AboutPage';
import { STORE_NAME } from '../../constants';

describe('AboutPage', () => {
  it('should render without errors', () => {
    const { container } = customRender(<AboutPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display header component', () => {
    customRender(<AboutPage />);
    // Header contains store name
    expect(screen.getByText(STORE_NAME)).toBeInTheDocument();
  });

  it('should display hero section title', () => {
    customRender(<AboutPage />);
    expect(screen.getByText(/Beyond the/i)).toBeInTheDocument();
    expect(screen.getByText(/Surface/i)).toBeInTheDocument();
  });

  it('should display store description', () => {
    customRender(<AboutPage />);
    expect(screen.getByText(new RegExp(`${STORE_NAME}.*collective of artisans`, 'i'))).toBeInTheDocument();
  });

  it('should display values section', () => {
    customRender(<AboutPage />);
    expect(screen.getByText('Uncompromising Purity.')).toBeInTheDocument();
    expect(screen.getByText('Architectural Design.')).toBeInTheDocument();
  });

  it('should display contact information', () => {
    customRender(<AboutPage />);
    // Contact section should be present with Location
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
  });

  it('should display footer component', () => {
    customRender(<AboutPage />);
    // Footer contains store name
    const footers = screen.getAllByText(new RegExp(STORE_NAME.toUpperCase()));
    expect(footers.length).toBeGreaterThan(0);
  });
});

