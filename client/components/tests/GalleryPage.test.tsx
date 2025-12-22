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
    // Use getAllByText and check that filter buttons exist in header
    expect(screen.getByText('All')).toBeInTheDocument();
    const manicureTexts = screen.getAllByText('Manicure');
    expect(manicureTexts.length).toBeGreaterThan(0); // At least one (the filter button)
    const nailArtTexts = screen.getAllByText('Nail Art');
    expect(nailArtTexts.length).toBeGreaterThan(0);
    const pedicureTexts = screen.getAllByText('Pedicure');
    expect(pedicureTexts.length).toBeGreaterThan(0);
  });

  it('should have All filter selected by default', () => {
    customRender(<GalleryPage />);
    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('text-black');
  });

  it('should change filter when clicked', () => {
    customRender(<GalleryPage />);
    // Get all buttons and find the filter button (not the category label in images)
    const buttons = screen.getAllByRole('button');
    const manicureButton = buttons.find(btn => 
      btn.textContent === 'Manicure' && btn.closest('header')
    );
    
    expect(manicureButton).toBeDefined();
    if (manicureButton) {
      fireEvent.click(manicureButton);
      expect(manicureButton).toHaveClass('text-black');
    }
  });

  it('should display gallery images', () => {
    customRender(<GalleryPage />);
    // Test first 5 images to avoid performance issues with 500 images
    // Use getAllByAltText since some alt texts might be similar
    GALLERY_IMAGES.slice(0, 5).forEach(img => {
      const images = screen.getAllByAltText(new RegExp(img.alt.split(' - ')[0], 'i'));
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('should display gallery images in masonry grid', () => {
    customRender(<GalleryPage />);
    // Verify that images are rendered (Instagram-style layout doesn't show titles)
    const allImages = screen.getAllByRole('img');
    expect(allImages.length).toBeGreaterThan(0);
    // Verify images have alt text
    allImages.slice(0, 5).forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });

  it('should have 500 gallery images', () => {
    expect(GALLERY_IMAGES.length).toBe(500);
  });

  it('should have all required fields for gallery images', () => {
    GALLERY_IMAGES.forEach(img => {
      expect(img.id).toBeDefined();
      expect(img.url).toBeDefined();
      expect(img.category).toBeDefined();
      expect(img.title).toBeDefined();
      expect(img.uploadedAt).toBeDefined();
      expect(img.alt).toBeDefined();
    });
  });

  it('should be sorted by newest first', () => {
    for (let i = 0; i < GALLERY_IMAGES.length - 1; i++) {
      const current = new Date(GALLERY_IMAGES[i].uploadedAt).getTime();
      const next = new Date(GALLERY_IMAGES[i + 1].uploadedAt).getTime();
      expect(current).toBeGreaterThanOrEqual(next);
    }
  });
});

