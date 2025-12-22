import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { render as customRender } from '../../tests/utils/test-utils';
import CustomCalendar from '../CustomCalendar';

describe('CustomCalendar', () => {
  const mockOnSelectDate = vi.fn();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without errors', () => {
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    expect(screen.getByText(today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))).toBeInTheDocument();
  });

  it('should display current month and year', () => {
    const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    expect(screen.getByText(monthName)).toBeInTheDocument();
  });

  it('should call onSelectDate when a date is clicked', () => {
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    const firstDayButton = screen.getAllByRole('button').find(
      button => button.textContent && /^\d+$/.test(button.textContent.trim())
    );
    
    if (firstDayButton) {
      fireEvent.click(firstDayButton);
      expect(mockOnSelectDate).toHaveBeenCalled();
    }
  });

  it('should navigate to previous month when left arrow is clicked', () => {
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    const prevMonth = new Date(today);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const prevMonthName = prevMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const buttons = screen.getAllByRole('button');
    const leftArrow = buttons.find(btn => btn.querySelector('svg'));
    
    if (leftArrow) {
      fireEvent.click(leftArrow);
      expect(screen.getByText(prevMonthName)).toBeInTheDocument();
    }
  });

  it('should navigate to next month when right arrow is clicked', () => {
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthName = nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const buttons = screen.getAllByRole('button');
    const arrowButtons = buttons.filter(btn => btn.querySelector('svg'));
    
    if (arrowButtons.length >= 2) {
      fireEvent.click(arrowButtons[1]); // Right arrow is typically the second arrow button
      expect(screen.getByText(nextMonthName)).toBeInTheDocument();
    }
  });

  it('should highlight selected date', () => {
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    const selectedButton = screen.getAllByRole('button').find(
      button => button.textContent && button.className.includes('bg-black')
    );
    expect(selectedButton).toBeTruthy();
  });

  it('should display day labels', () => {
    customRender(<CustomCalendar selectedDate={todayStr} onSelectDate={mockOnSelectDate} />);
    // There are two 'S' and two 'T' labels, so we use getAllByText
    expect(screen.getAllByText('S').length).toBeGreaterThan(0);
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getAllByText('T').length).toBeGreaterThan(0);
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });
});

