import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import PerformanceDashboard from '../PerformanceDashboard';
import { mockDataService, mockGeminiService } from './utils/mocks';
import * as dataServiceModule from '../../services/dataService';
import * as geminiServiceModule from '../../services/geminiService';

// Mock services
vi.mock('../../services/dataService', () => ({
  dataService: mockDataService,
}));

vi.mock('../../services/geminiService', () => ({
  gemini: mockGeminiService,
}));

describe('PerformanceDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

