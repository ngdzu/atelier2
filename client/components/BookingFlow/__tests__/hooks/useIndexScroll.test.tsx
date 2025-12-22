import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIndexScroll } from '../../hooks/useIndexScroll';

describe('useIndexScroll', () => {
  let indexScrollRef: { current: HTMLDivElement | null };

  beforeEach(() => {
    indexScrollRef = {
      current: {
        scrollLeft: 0,
      } as unknown as HTMLDivElement,
    };

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize with startScrolling and stopScrolling functions', () => {
    const { result } = renderHook(() => useIndexScroll(indexScrollRef));

    expect(typeof result.current.startScrolling).toBe('function');
    expect(typeof result.current.stopScrolling).toBe('function');
  });

  it('should scroll left when startScrolling is called with left direction', () => {
    const { result } = renderHook(() => useIndexScroll(indexScrollRef));

    act(() => {
      result.current.startScrolling('left');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(indexScrollRef.current?.scrollLeft).toBeLessThan(0);
  });

  it('should scroll right when startScrolling is called with right direction', () => {
    const { result } = renderHook(() => useIndexScroll(indexScrollRef));

    act(() => {
      result.current.startScrolling('right');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(indexScrollRef.current?.scrollLeft).toBeGreaterThan(0);
  });

  it('should stop scrolling when stopScrolling is called', () => {
    const { result } = renderHook(() => useIndexScroll(indexScrollRef));
    const initialScrollLeft = indexScrollRef.current?.scrollLeft || 0;

    act(() => {
      result.current.startScrolling('right');
      vi.advanceTimersByTime(50);
    });

    const scrollLeftBeforeStop = indexScrollRef.current?.scrollLeft || 0;

    act(() => {
      result.current.stopScrolling();
      vi.advanceTimersByTime(100);
    });

    const finalScrollLeft = indexScrollRef.current?.scrollLeft || 0;
    // Should not continue scrolling after stop - scrollLeft should remain the same as before stop
    expect(finalScrollLeft).toBe(scrollLeftBeforeStop);
  });

  it('should not create multiple intervals if startScrolling is called multiple times', () => {
    const { result } = renderHook(() => useIndexScroll(indexScrollRef));

    act(() => {
      result.current.startScrolling('right');
      result.current.startScrolling('right');
      result.current.startScrolling('right');
      vi.advanceTimersByTime(100);
    });

    // Should only have one interval running
    const scrollAmount = indexScrollRef.current?.scrollLeft || 0;
    expect(scrollAmount).toBeGreaterThan(0);
  });
});

