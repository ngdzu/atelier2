
import React, { useState } from 'react';
import { Send, Sparkles, Smartphone, Mail, Target } from 'lucide-react';
import { gemini } from '../services/geminiService';

const MarketingCenter: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await gemini.generatePromotion(prompt);
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Side */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Campaign Creator</h3>
          <p className="text-gray-500">Tell LuxeAI what you want to promote and let it draft your perfect message.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">What's the occasion?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#C4A484] focus:border-transparent transition-all outline-none resize-none"
            placeholder="e.g., 20% off all gel manicures for the first week of Summer, available for existing customers only."
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#2D2926] text-white rounded-2xl hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Sparkles size={18} />
            )}
            <span>Generate Content</span>
          </button>
        </div>

        <div className="pt-4 grid grid-cols-3 gap-4">
          <div className="p-4 border border-gray-100 rounded-2xl text-center hover:border-[#C4A484] transition-colors cursor-pointer group">
            <Smartphone size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-[#C4A484]" />
            <span className="text-xs font-medium text-gray-500">SMS</span>
          </div>
          <div className="p-4 border border-gray-100 rounded-2xl text-center hover:border-[#C4A484] transition-colors cursor-pointer group">
            <Mail size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-[#C4A484]" />
            <span className="text-xs font-medium text-gray-500">Email</span>
          </div>
          <div className="p-4 border border-gray-100 rounded-2xl text-center hover:border-[#C4A484] transition-colors cursor-pointer group">
            <Target size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-[#C4A484]" />
            <span className="text-xs font-medium text-gray-500">Push</span>
          </div>
        </div>
      </div>

      {/* Preview Side */}
      <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-gray-700">Preview</h4>
          {result && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700 transition-colors">
              <Send size={14} />
              <span>Launch Campaign</span>
            </button>
          )}
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-inner p-6 overflow-y-auto whitespace-pre-wrap text-gray-800 leading-relaxed italic">
          {result || (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-50">
              <Sparkles size={48} />
              <p>Your generated campaign will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingCenter;
