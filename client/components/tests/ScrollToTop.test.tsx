import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
window.scrollTo = mockScrollTo;

// Mock refreshReveals
const mockRefreshReveals = vi.fn();
(window as any).refreshReveals = mockRefreshReveals;

describe('ScrollToTop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render without errors', () => {
    const { container } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should scroll to top on mount', () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should call refreshReveals after a delay', async () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );

    vi.advanceTimersByTime(50);
    
    expect(mockRefreshReveals).toHaveBeenCalled();
  });
});

