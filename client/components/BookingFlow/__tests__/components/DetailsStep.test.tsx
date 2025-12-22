import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { render as customRender } from '../../../tests/utils/test-utils';
import DetailsStep from '../../components/DetailsStep';

describe('DetailsStep', () => {
  const mockCustomerInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
  };

  const mockOnCustomerInfoChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without errors', () => {
    customRender(
      <DetailsStep customerInfo={mockCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    expect(screen.getByText('Final Details.')).toBeInTheDocument();
  });

  it('should display all form fields', () => {
    customRender(
      <DetailsStep customerInfo={mockCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    expect(screen.getByPlaceholderText(/E.G. JULIA ROBERTS/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/NAME@ATELIER.COM/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i)).toBeInTheDocument();
  });

  it('should display current customer info values', () => {
    customRender(
      <DetailsStep customerInfo={mockCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('555-1234')).toBeInTheDocument();
  });

  it('should call onCustomerInfoChange when name is changed', () => {
    customRender(
      <DetailsStep customerInfo={mockCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    const nameInput = screen.getByPlaceholderText(/E.G. JULIA ROBERTS/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    
    expect(mockOnCustomerInfoChange).toHaveBeenCalledWith({
      ...mockCustomerInfo,
      name: 'Jane Doe',
    });
  });

  it('should call onCustomerInfoChange when email is changed', () => {
    customRender(
      <DetailsStep customerInfo={mockCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    const emailInput = screen.getByPlaceholderText(/NAME@ATELIER.COM/i);
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    
    expect(mockOnCustomerInfoChange).toHaveBeenCalledWith({
      ...mockCustomerInfo,
      email: 'jane@example.com',
    });
  });

  it('should call onCustomerInfoChange when phone is changed', () => {
    customRender(
      <DetailsStep customerInfo={mockCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    const phoneInput = screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i);
    fireEvent.change(phoneInput, { target: { value: '555-5678' } });
    
    expect(mockOnCustomerInfoChange).toHaveBeenCalledWith({
      ...mockCustomerInfo,
      phone: '555-5678',
    });
  });

  it('should display placeholder text', () => {
    const emptyCustomerInfo = { name: '', email: '', phone: '' };
    customRender(
      <DetailsStep customerInfo={emptyCustomerInfo} onCustomerInfoChange={mockOnCustomerInfoChange} />
    );
    expect(screen.getByPlaceholderText(/E.G. JULIA ROBERTS/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/NAME@ATELIER.COM/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i)).toBeInTheDocument();
  });
});

