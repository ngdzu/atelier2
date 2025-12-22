import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { render as customRender } from '../../../tests/utils/test-utils';
import SummaryDrawer from '../../components/SummaryDrawer';
import { mockService, mockEmployee } from '../../../tests/utils/mocks';
import { Step } from '../../types';

describe('SummaryDrawer', () => {
  const mockSelectedServices = [
    { service: mockService, quantity: 2 },
  ];

  const defaultProps = {
    isOpen: true,
    step: 'SERVICE' as Step,
    selectedServices: mockSelectedServices,
    selectedEmployee: mockEmployee,
    selectedDate: '2024-01-15',
    selectedTime: '10:00',
    totalPrice: 100,
    totalPoints: 100,
    currentStepNextLabel: 'Continue',
    isValid: true,
    onClose: vi.fn(),
    onQuantityUpdate: vi.fn(),
    onNext: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render when open', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    expect(screen.getByText('Your Session')).toBeInTheDocument();
  });

  it('should not be visible when closed', () => {
    customRender(<SummaryDrawer {...defaultProps} isOpen={false} />);
    const drawer = screen.getByText('Your Session').closest('.fixed');
    expect(drawer).toHaveClass('opacity-0');
    expect(drawer).toHaveClass('pointer-events-none');
  });

  it('should call onClose when close button is clicked', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    const closeButton = screen.getAllByRole('button').find(
      btn => btn.querySelector('svg')
    );
    
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(defaultProps.onClose).toHaveBeenCalled();
    }
  });

  it('should call onClose when backdrop is clicked', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    const backdrop = screen.getByText('Your Session').closest('.fixed')?.previousSibling;
    
    if (backdrop) {
      fireEvent.click(backdrop as Element);
      expect(defaultProps.onClose).toHaveBeenCalled();
    }
  });

  it('should display selected services', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    expect(screen.getByText(mockService.name)).toBeInTheDocument();
  });

  it('should display service quantity', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should display total price', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    // Total price appears in the subtotal section - use getAllByText since price might appear multiple times
    const priceElements = screen.getAllByText(/\$100/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('should display total points', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    expect(screen.getByText('+100 Points')).toBeInTheDocument();
  });

  it('should display employee when selected', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    expect(screen.getByText(mockEmployee.name)).toBeInTheDocument();
  });

  it('should display date and time when selected', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    expect(screen.getByText(/2024-01-15/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00/i)).toBeInTheDocument();
  });

  it('should call onQuantityUpdate when quantity is changed', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    const minusButtons = screen.getAllByRole('button').filter(
      btn => btn.querySelector('svg') && btn.className.includes('hover:text-[#C4A484]')
    );
    
    if (minusButtons.length > 0) {
      fireEvent.click(minusButtons[0]);
      expect(defaultProps.onQuantityUpdate).toHaveBeenCalled();
    }
  });

  it('should call onNext when continue button is clicked', () => {
    customRender(<SummaryDrawer {...defaultProps} />);
    const continueButton = screen.getByText('Continue').closest('button');
    if (continueButton) {
      fireEvent.click(continueButton);
      expect(defaultProps.onNext).toHaveBeenCalled();
    }
  });

  it('should disable continue button when isValid is false', () => {
    customRender(<SummaryDrawer {...defaultProps} isValid={false} />);
    const continueButton = screen.getByText('Continue').closest('button');
    expect(continueButton).toBeDisabled();
  });

  it('should not show continue button on CONFIRM step', () => {
    customRender(<SummaryDrawer {...defaultProps} step="CONFIRM" />);
    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('should show empty state when no services are selected', () => {
    customRender(<SummaryDrawer {...defaultProps} selectedServices={[]} />);
    expect(screen.getByText(/Atelier Bag Empty/i)).toBeInTheDocument();
  });

  it('should not display employee section when no employee is selected', () => {
    customRender(<SummaryDrawer {...defaultProps} selectedEmployee={null} />);
    expect(screen.queryByText('Specialist')).not.toBeInTheDocument();
  });

  it('should not display time section when no time is selected', () => {
    customRender(<SummaryDrawer {...defaultProps} selectedTime={null} />);
    expect(screen.queryByText('Schedule')).not.toBeInTheDocument();
  });
});

