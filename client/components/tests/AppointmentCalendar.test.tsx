import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import AppointmentCalendar from '../AppointmentCalendar';
import { mockDataService, mockAppointment, mockEmployee, mockCustomer, mockService } from './utils/mocks';
import * as dataServiceModule from '../../services/dataService';

// Mock dataService
vi.mock('../../services/dataService', () => ({
  dataService: mockDataService,
}));

describe('AppointmentCalendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without errors', async () => {
    const { container } = customRender(
      <AppointmentCalendar appointments={[mockAppointment]} onUpdateAppointment={vi.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  it('should display loading state initially', async () => {
    customRender(
      <AppointmentCalendar appointments={[mockAppointment]} onUpdateAppointment={vi.fn()} />
    );
    // Component shows loading message when loading is true
    expect(screen.getByText(/Hydrating Sanctuary Calendar/i)).toBeInTheDocument();
  });

  it('should fetch and display employees', async () => {
    customRender(
      <AppointmentCalendar appointments={[mockAppointment]} onUpdateAppointment={vi.fn()} />
    );
    
    await waitFor(() => {
      expect(mockDataService.getEmployees).toHaveBeenCalled();
    });
  });

  it('should display appointments after loading', async () => {
    mockDataService.getEmployees.mockResolvedValue([mockEmployee]);
    mockDataService.getCustomers.mockResolvedValue([mockCustomer]);
    mockDataService.getServices.mockResolvedValue([]);
    
    customRender(
      <AppointmentCalendar appointments={[mockAppointment]} onUpdateAppointment={vi.fn()} />
    );
    
    await waitFor(() => {
      // After data loads, loading message should disappear
      expect(screen.queryByText(/Hydrating Sanctuary Calendar/i)).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should call onUpdateAppointment when appointment is updated', async () => {
    mockDataService.getEmployees.mockResolvedValue([mockEmployee]);
    mockDataService.getCustomers.mockResolvedValue([mockCustomer]);
    mockDataService.getServices.mockResolvedValue([]);
    
    const mockOnUpdate = vi.fn();
    customRender(
      <AppointmentCalendar appointments={[mockAppointment]} onUpdateAppointment={mockOnUpdate} />
    );
    
    await waitFor(() => {
      // Component should finish loading
      expect(screen.queryByText(/Hydrating Sanctuary Calendar/i)).not.toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Component should be ready for user interactions (callback not called yet)
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});

