import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import MarketingCenter from '../MarketingCenter';

// Mock geminiService - use hoisted to avoid circular dependency
const mockGeminiService = vi.hoisted(() => ({
  generatePromotion: vi.fn(),
  crawlCompetitorData: vi.fn(),
  analyzeBusinessPerformance: vi.fn(),
}));

vi.mock('../../services/geminiService', () => ({
  gemini: mockGeminiService,
}));

describe('MarketingCenter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGeminiService.generatePromotion.mockResolvedValue('Mocked promotion text');
    mockGeminiService.crawlCompetitorData.mockResolvedValue({ text: 'Mocked research', sources: [] });
    mockGeminiService.analyzeBusinessPerformance.mockResolvedValue('Mocked analysis');
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
    // Check for the heading (h3) which is more specific than the button
    expect(screen.getByRole('heading', { name: /Campaign Creator/i })).toBeInTheDocument();
  });

  it('should switch to market intelligence tab', () => {
    customRender(<MarketingCenter />);
    // Find the button by role and name
    const intelligenceTab = screen.getByRole('button', { name: 'Market Intelligence' });
    fireEvent.click(intelligenceTab);
    
    // After switching, intelligence content should be visible (check for heading or specific content)
    expect(screen.getByText(/Market Research Data/i)).toBeInTheDocument();
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
    // Find button by role, not by text (text is in a span inside)
    const generateButton = screen.getByRole('button', { name: /Generate Content/i });
    
    fireEvent.change(textarea, { target: { value: 'Test' } });
    fireEvent.click(generateButton);
    
    // Button should be disabled during loading
    await waitFor(() => {
      expect(generateButton).toBeDisabled();
    });
  });

  it('should handle research query submission', async () => {
    customRender(<MarketingCenter />);
    
    // Switch to intelligence tab
    const intelligenceTab = screen.getByRole('button', { name: 'Market Intelligence' });
    fireEvent.click(intelligenceTab);
    
    // Find research input and button
    const researchInput = screen.getByPlaceholderText(/competitor-salon.com/i);
    const researchButton = screen.getByRole('button', { name: /Crawl Market Data/i });
    
    fireEvent.change(researchInput, { target: { value: 'Test Salon' } });
    fireEvent.click(researchButton);
    
    await waitFor(() => {
      expect(mockGeminiService.crawlCompetitorData).toHaveBeenCalledWith('Test Salon');
    });
  });

  it('should display research results', async () => {
    mockGeminiService.crawlCompetitorData.mockResolvedValue({
      text: 'Research results text',
      sources: [{ url: 'https://example.com' }]
    });
    
    customRender(<MarketingCenter />);
    
    // Switch to intelligence tab
    const intelligenceTab = screen.getByRole('button', { name: 'Market Intelligence' });
    fireEvent.click(intelligenceTab);
    
    // Submit research
    const researchInput = screen.getByPlaceholderText(/competitor-salon.com/i);
    const researchButton = screen.getByRole('button', { name: /Crawl Market Data/i });
    
    fireEvent.change(researchInput, { target: { value: 'Test' } });
    fireEvent.click(researchButton);
    
    await waitFor(() => {
      expect(screen.getByText('Research results text')).toBeInTheDocument();
    });
  });
});

