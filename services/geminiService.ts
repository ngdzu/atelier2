
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generatePromotion(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a marketing expert for a luxury nail salon named LuxeNail. 
      Generate a promotional message (SMS and Email format) based on this request: ${prompt}. 
      Keep the tone sophisticated, modern, and inviting.`,
    });
    return response.text || "Failed to generate promotion.";
  }

  async analyzeBusinessPerformance(stats: any): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these business stats for a nail salon and provide 3 actionable insights: ${JSON.stringify(stats)}. 
      Keep it brief and professional.`,
    });
    return response.text || "No insights available.";
  }
}

export const gemini = new GeminiService();
