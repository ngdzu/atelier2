
import React, { useState } from 'react';
import { Send, Sparkles, Smartphone, Mail, Target, Search, Globe, ExternalLink, RefreshCcw } from 'lucide-react';
import { gemini } from '../services/geminiService';

const MarketingCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaign' | 'intelligence'>('campaign');
  
  // Campaign State
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Intelligence State
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResult, setResearchResult] = useState<{ text: string, sources: any[] } | null>(null);
  const [researchLoading, setResearchLoading] = useState(false);

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

  const handleResearch = async () => {
    if (!researchQuery) return;
    setResearchLoading(true);
    try {
      const response = await gemini.crawlCompetitorData(researchQuery);
      setResearchResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setResearchLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('campaign')}
          className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'campaign' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Campaign Creator
        </button>
        <button 
          onClick={() => setActiveTab('intelligence')}
          className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'intelligence' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Market Intelligence
        </button>
      </div>

      {activeTab === 'campaign' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal">
          {/* Input Side */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Campaign Creator</h3>
              <p className="text-gray-500 text-sm">Tell LuxeAI what you want to promote and let it draft your perfect message.</p>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Campaign Brief</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#C4A484] focus:border-transparent transition-all outline-none resize-none text-sm"
                placeholder="e.g., 20% off all Russian Manicures for the first week of Summer."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#2D2926] text-white rounded-2xl hover:bg-black transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCcw size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">Generate Content</span>
            </button>

            <div className="pt-4 grid grid-cols-3 gap-4">
              {[{ icon: Smartphone, label: 'SMS' }, { icon: Mail, label: 'Email' }, { icon: Target, label: 'Push' }].map((item, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-2xl text-center hover:border-[#C4A484] transition-colors cursor-pointer group">
                  <item.icon size={20} className="mx-auto mb-2 text-gray-400 group-hover:text-[#C4A484]" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Side */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Campaign Preview</h4>
              {result && (
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all">
                  <Send size={14} />
                  <span>Launch</span>
                </button>
              )}
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-inner p-8 overflow-y-auto whitespace-pre-wrap text-gray-800 text-sm leading-relaxed italic border border-black/5">
              {result || (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-30">
                  <Sparkles size={48} strokeWidth={1} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Ready for Generation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal">
          {/* Intelligence Input */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Market Intelligence</h3>
              <p className="text-gray-500 text-sm">Research competitor service menus and pricing using LuxeAI's web crawling capabilities.</p>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Salon Name or URL</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#C4A484] focus:border-transparent transition-all outline-none text-sm"
                  placeholder="e.g., https://competitor-salon.com or 'Bellacures Beverly Hills'"
                />
              </div>
            </div>

            <button
              onClick={handleResearch}
              disabled={researchLoading || !researchQuery}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-2xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {researchLoading ? (
                <RefreshCcw size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">Crawl Market Data</span>
            </button>
          </div>

          {/* Research Results */}
          <div className="bg-[#FDFCFB] p-8 rounded-3xl border border-black/5 flex flex-col min-h-[500px]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Market Research Data</h4>
            
            <div className="flex-1 overflow-y-auto space-y-8">
              {researchLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-2 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : researchResult ? (
                <>
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line font-light">
                    {researchResult.text}
                  </div>
                  
                  {researchResult.sources.length > 0 && (
                    <div className="pt-8 border-t border-black/5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Crawl Sources</p>
                      <div className="flex flex-wrap gap-3">
                        {researchResult.sources.map((source, i) => (
                          <a 
                            key={i} 
                            href={source.web?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/5 rounded-lg text-[10px] text-gray-500 hover:text-black hover:border-black/20 transition-all"
                          >
                            <ExternalLink size={10} />
                            {source.web?.title || 'Source Data'}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-30">
                  <Globe size={48} strokeWidth={1} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em]">No Market Data Yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingCenter;
