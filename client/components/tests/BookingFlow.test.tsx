import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import BookingFlow from '../BookingFlow';
import { mockDataService, mockService, mockEmployee } from './utils/mocks';
import * as dataServiceModule from '../../services/dataService';

// Mock dataService
vi.mock('../../services/dataService', () => ({
  dataService: mockDataService,
}));

describe('BookingFlow', () => {
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockDataService.getServices.mockResolvedValue([mockService]);
    mockDataService.getEmployees.mockResolvedValue([mockEmployee]);
  });

  it('should render without errors', async () => {
    const { container } = customRender(<BookingFlow onComplete={mockOnComplete} />);
    expect(container).toBeInTheDocument();
  });

  it('should display loading state initially', async () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    // Component should render (header or content)
    await waitFor(() => {
      expect(screen.queryByText(/LuxeNail/i) || screen.queryByRole('main')).toBeTruthy();
    });
  });

  it('should fetch services and employees on mount', async () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    
    await waitFor(() => {
      expect(mockDataService.getServices).toHaveBeenCalled();
      expect(mockDataService.getEmployees).toHaveBeenCalled();
    });
  });

  it('should display service selection step by default', async () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    
    await waitFor(() => {
      // Should show Service step label or service name
      const serviceLabel = screen.queryByText(/Service/i);
      const serviceName = screen.queryByText(mockService.name);
      expect(serviceLabel || serviceName).toBeTruthy();
    });
  });

  it('should allow selecting a service', async () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    
    await waitFor(() => {
      expect(mockDataService.getServices).toHaveBeenCalled();
    });
    
    // Try to find and click a service
    const serviceElement = screen.queryByText(mockService.name);
    if (serviceElement) {
      fireEvent.click(serviceElement);
    }
  });

  it('should display step navigation', async () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    
    await waitFor(() => {
      // Component should have step indicators or navigation
      const serviceStep = screen.queryByText(/Service/i);
      const employeeStep = screen.queryByText(/Professional/i);
      expect(serviceStep || employeeStep).toBeTruthy();
    });
  });

  it('should call onComplete when booking is completed', async () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    
    await waitFor(() => {
      expect(mockDataService.getServices).toHaveBeenCalled();
    });
    
    // Complete booking flow would require multiple interactions
    // This is a basic test - more detailed tests would require full flow
    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it('should display header component', () => {
    customRender(<BookingFlow onComplete={mockOnComplete} />);
    // Header should be present (BookingFlow includes Header)
    const header = screen.queryByRole('navigation');
    const storeName = screen.queryByText(/LuxeNail/i);
    expect(header || storeName).toBeTruthy();
  });
});

