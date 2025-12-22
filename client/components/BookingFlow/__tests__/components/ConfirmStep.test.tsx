import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from '../../../tests/utils/test-utils';
import ConfirmStep from '../../components/ConfirmStep';
import { mockEmployee } from '../../../tests/utils/mocks';

describe('ConfirmStep', () => {
  const defaultProps = {
    customerName: 'John Doe',
    selectedDate: '2024-01-15',
    selectedTime: '10:00',
    selectedEmployee: mockEmployee,
    totalItemsCount: 2,
  };

  it('should render without errors', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    expect(screen.getByText('Confirmed.')).toBeInTheDocument();
  });

  it('should display customer name in confirmation message', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    expect(screen.getByText(/The sanctuary awaits your arrival, John Doe/i)).toBeInTheDocument();
  });

  it('should display selected date', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('should display selected time', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('should display employee name', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    expect(screen.getByText(mockEmployee.name)).toBeInTheDocument();
  });

  it('should display total items count', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    expect(screen.getByText(/2 Sessions/i)).toBeInTheDocument();
  });

  it('should display return to home link', () => {
    customRender(<ConfirmStep {...defaultProps} />);
    const returnLink = screen.getByText('Return to Home');
    expect(returnLink).toBeInTheDocument();
    expect(returnLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('should handle null employee', () => {
    customRender(<ConfirmStep {...defaultProps} selectedEmployee={null} />);
    expect(screen.getByText('Confirmed.')).toBeInTheDocument();
  });

  it('should handle null time', () => {
    customRender(<ConfirmStep {...defaultProps} selectedTime={null} />);
    expect(screen.getByText('Confirmed.')).toBeInTheDocument();
  });
});

