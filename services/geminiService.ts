
import { GoogleGenAI } from "@google/genai";
import { STORE_NAME } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generatePromotion(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a marketing expert for a luxury nail salon named ${STORE_NAME}. 
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

  async crawlCompetitorData(query: string): Promise<{ text: string, sources: any[] }> {
    const response = await this.ai.models.generateContent({
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
  }
}

export const gemini = new GeminiService();
