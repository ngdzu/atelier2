import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, BrainCircuit } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { dataService } from '../services/dataService';

const PerformanceDashboard: React.FC = () => {
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getDailyStats();
      setChartData(data);
      
      setLoadingInsights(true);
      try {
        const text = await gemini.analyzeBusinessPerformance(data);
        setInsights(text);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInsights(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '$13,700', trend: '+12%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Customers', value: '248', trend: '+5%', icon: Users, color: 'text-blue-600' },
    { label: 'Appointments', value: '127', trend: '+8%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Growth Rate', value: '15.4%', trend: '+2%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4A484" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#C4A484" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C4A484" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-[#2D2926] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit size={120} />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <BrainCircuit size={20} className="text-[#E6D5C3]" />
              </div>
              <h3 className="text-xl font-serif font-bold">LuxeAI Insights</h3>
            </div>
            
            <div className="flex-1 space-y-4">
              {loadingInsights ? (
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/5 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded animate-pulse w-5/6"></div>
                </div>
              ) : (
                <div className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                  {insights || "Click to generate performance optimization tips."}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-[#E6D5C3] transition-colors text-sm"
            >
              Refresh Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;