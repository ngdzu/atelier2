
import { GoogleGenAI } from "@google/genai";
import { STORE_NAME } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        this.ai = new GoogleGenAI({ apiKey });
      } catch (error) {
        console.warn('Failed to initialize Gemini AI:', error);
      }
    } else {
      console.warn('Gemini API key not found. AI features will be disabled. Set GEMINI_API_KEY environment variable to enable.');
    }
  }

  private checkApiKey(): boolean {
    if (!this.ai) {
      console.warn('Gemini API key not configured. AI features are disabled.');
      return false;
    }
    return true;
  }

  async generatePromotion(prompt: string): Promise<string> {
    if (!this.checkApiKey()) {
      return `[AI Feature Disabled] Promotional message for: ${prompt}`;
    }
    
    try {
      const response = await this.ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a marketing expert for a luxury nail salon named ${STORE_NAME}. 
        Generate a promotional message (SMS and Email format) based on this request: ${prompt}. 
        Keep the tone sophisticated, modern, and inviting.`,
      });
      return response.text || "Failed to generate promotion.";
    } catch (error) {
      console.error('Error generating promotion:', error);
      return `[Error] Failed to generate promotion: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  async analyzeBusinessPerformance(stats: any): Promise<string> {
    if (!this.checkApiKey()) {
      return `[AI Feature Disabled] Business performance analysis unavailable. Stats: ${JSON.stringify(stats)}`;
    }
    
    try {
      const response = await this.ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these business stats for a nail salon and provide 3 actionable insights: ${JSON.stringify(stats)}. 
        Keep it brief and professional.`,
      });
      return response.text || "No insights available.";
    } catch (error) {
      console.error('Error analyzing business performance:', error);
      return `[Error] Failed to analyze performance: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  async crawlCompetitorData(query: string): Promise<{ text: string, sources: any[] }> {
    if (!this.checkApiKey()) {
      return {
        text: `[AI Feature Disabled] Competitor data unavailable for: ${query}`,
        sources: []
      };
    }
    
    try {
      const response = await this.ai!.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Search for the service menu, prices, and descriptions of the following nail salon: ${query}. 
        Provide a structured summary of their offerings including categories, names, and prices. 
        If a specific URL was provided, focus heavily on that.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return {
        text: response.text || "No data found.",
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error('Error crawling competitor data:', error);
      return {
        text: `[Error] Failed to crawl competitor data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sources: []
      };
    }
  }
}

export const gemini = new GeminiService();
