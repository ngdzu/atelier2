import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import MarketingCenter from '../MarketingCenter';
import { mockGeminiService } from './utils/mocks';
import * as geminiServiceModule from '../../services/geminiService';

// Mock geminiService
vi.mock('../../services/geminiService', () => ({
  gemini: mockGeminiService,
}));

describe('MarketingCenter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without errors', () => {
    const { container } = customRender(<MarketingCenter />);
    expect(container).toBeInTheDocument();
  });

  it('should display tab switcher', () => {
    customRender(<MarketingCenter />);
    // Check for tab buttons - they may be rendered differently
    const tabs = screen.getAllByRole('button');
    expect(tabs.length).toBeGreaterThan(0);
  });

  it('should display campaign creator by default', () => {
    customRender(<MarketingCenter />);
    expect(screen.getByText('Campaign Creator')).toBeInTheDocument();
  });

  it('should switch to market intelligence tab', () => {
    customRender(<MarketingCenter />);
    const intelligenceTab = screen.getByText('Market Intelligence');
    fireEvent.click(intelligenceTab);
    
    // After switching, intelligence content should be visible
    expect(screen.getByText(/Market Intelligence/i)).toBeInTheDocument();
  });

  it('should generate promotion when form is submitted', async () => {
    customRender(<MarketingCenter />);
    const textarea = screen.getByPlaceholderText(/20% off all Russian Manicures/i);
    const generateButton = screen.getByText(/Generate Content/i);
    
    fireEvent.change(textarea, { target: { value: 'Test campaign' } });
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      expect(mockGeminiService.generatePromotion).toHaveBeenCalledWith('Test campaign');
    });
  });

  it('should display loading state during generation', async () => {
    mockGeminiService.generatePromotion.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve('Result'), 100))
    );
    
    customRender(<MarketingCenter />);
    const textarea = screen.getByPlaceholderText(/20% off all Russian Manicures/i);
    const generateButton = screen.getByText(/Generate Content/i);
    
    fireEvent.change(textarea, { target: { value: 'Test' } });
    fireEvent.click(generateButton);
    
    // Button should be disabled during loading (check for disabled state)
    expect(generateButton).toBeDisabled();
  });
});

