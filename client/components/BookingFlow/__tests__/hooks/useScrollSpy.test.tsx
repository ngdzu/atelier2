import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Step } from '../../types';

describe('useScrollSpy', () => {
  let categoryRefs: { current: Record<string, HTMLDivElement | null> };
  let indexScrollRef: { current: HTMLDivElement | null };

  beforeEach(() => {
    categoryRefs = { current: {} };
    indexScrollRef = { current: null };
    
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    // Mock querySelector and scrollIntoView
    const mockButton = {
      scrollIntoView: vi.fn(),
    };
    
    indexScrollRef.current = {
      querySelector: vi.fn().mockReturnValue(mockButton),
    } as unknown as HTMLDivElement;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty activeCategory', () => {
    const { result } = renderHook(() =>
      useScrollSpy({
        step: 'SERVICE',
        loading: false,
        categoryRefs,
        indexScrollRef,
      })
    );

    expect(result.current.activeCategory).toBe('');
  });

  it('should not set up observer when step is not SERVICE', () => {
    renderHook(() =>
      useScrollSpy({
        step: 'EMPLOYEE',
        loading: false,
        categoryRefs,
        indexScrollRef,
      })
    );

    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should not set up observer when loading', () => {
    renderHook(() =>
      useScrollSpy({
        step: 'SERVICE',
        loading: true,
        categoryRefs,
        indexScrollRef,
      })
    );

    // Observer should not be set up when loading
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should scroll to category when scrollToCategory is called', () => {
    const mockElement = {
      getBoundingClientRect: vi.fn().mockReturnValue({ top: 100 }),
    };
    categoryRefs.current['TestCategory'] = mockElement as unknown as HTMLDivElement;
    
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    window.pageYOffset = 0;

    const { result } = renderHook(() =>
      useScrollSpy({
        step: 'SERVICE',
        loading: false,
        categoryRefs,
        indexScrollRef,
      })
    );

    act(() => {
      result.current.scrollToCategory('TestCategory');
    });

    expect(scrollToMock).toHaveBeenCalled();
  });

  it('should not scroll if category element is not found', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    const { result } = renderHook(() =>
      useScrollSpy({
        step: 'SERVICE',
        loading: false,
        categoryRefs,
        indexScrollRef,
      })
    );

    act(() => {
      result.current.scrollToCategory('NonExistentCategory');
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });
});

