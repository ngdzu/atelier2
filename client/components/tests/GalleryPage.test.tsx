import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import GalleryPage from '../GalleryPage';
import { GALLERY_IMAGES } from '../../constants';

describe('GalleryPage', () => {
  it('should render without errors', () => {
    const { container } = customRender(<GalleryPage />);
    expect(container).toBeInTheDocument();
  });

  it('should display page title', () => {
    customRender(<GalleryPage />);
    expect(screen.getByText(/The Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Lookbook/i)).toBeInTheDocument();
  });

  it('should display filter buttons', () => {
    customRender(<GalleryPage />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Manicure')).toBeInTheDocument();
    expect(screen.getByText('Nail Art')).toBeInTheDocument();
    expect(screen.getByText('Pedicure')).toBeInTheDocument();
  });

  it('should have All filter selected by default', () => {
    customRender(<GalleryPage />);
    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('text-black');
  });

  it('should change filter when clicked', () => {
    customRender(<GalleryPage />);
    const manicureButton = screen.getByText('Manicure');
    
    fireEvent.click(manicureButton);
    expect(manicureButton).toHaveClass('text-black');
  });

  it('should display gallery images', () => {
    customRender(<GalleryPage />);
    GALLERY_IMAGES.forEach(img => {
      expect(screen.getByAltText(img.title)).toBeInTheDocument();
    });
  });

  it('should display image titles', () => {
    customRender(<GalleryPage />);
    GALLERY_IMAGES.forEach(img => {
      expect(screen.getByText(img.title)).toBeInTheDocument();
    });
  });
});

