import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import PerformanceDashboard from '../PerformanceDashboard';

// Mock services - use hoisted to avoid circular dependency
const mockDataService = vi.hoisted(() => ({
  getServices: vi.fn(),
  getEmployees: vi.fn(),
  getCustomers: vi.fn(),
  getAppointments: vi.fn(),
  addAppointment: vi.fn(),
  getDailyStats: vi.fn(),
}));

const mockGeminiService = vi.hoisted(() => ({
  generatePromotion: vi.fn(),
  crawlCompetitorData: vi.fn(),
  analyzeBusinessPerformance: vi.fn(),
}));

vi.mock('../../services/dataService', () => ({
  dataService: mockDataService,
}));

vi.mock('../../services/geminiService', () => ({
  gemini: mockGeminiService,
}));

describe('PerformanceDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDataService.getDailyStats.mockResolvedValue([
      { name: 'Mon', revenue: 1200, appts: 12 },
      { name: 'Tue', revenue: 1500, appts: 15 },
    ]);
    mockGeminiService.analyzeBusinessPerformance.mockResolvedValue('Mocked analysis');
  });

  it('should render without errors', async () => {
    const { container } = customRender(<PerformanceDashboard />);
    expect(container).toBeInTheDocument();
  });

  it('should fetch daily stats on mount', async () => {
    customRender(<PerformanceDashboard />);
    
    await waitFor(() => {
      expect(mockDataService.getDailyStats).toHaveBeenCalled();
    });
  });

  it('should display stats cards', () => {
    customRender(<PerformanceDashboard />);
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Customers')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Growth Rate')).toBeInTheDocument();
  });

  it('should call Gemini service for insights', async () => {
    customRender(<PerformanceDashboard />);
    
    await waitFor(() => {
      expect(mockDataService.getDailyStats).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(mockGeminiService.analyzeBusinessPerformance).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('should display insights section', () => {
    customRender(<PerformanceDashboard />);
    expect(screen.getByText(/LuxeAI Insights/i)).toBeInTheDocument();
  });
});

