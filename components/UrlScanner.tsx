
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ScanResult } from '../types';
import { Globe, ShieldAlert, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

const UrlScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const res = await geminiService.scanUrl(url);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Nexus URL Guard</h2>
        <p className="text-gray-400">Enter a link below to perform a deep heuristic and AI-powered threat analysis.</p>
      </div>

      <form onSubmit={handleScan} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Globe className="text-gray-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/login"
          className="w-full bg-gray-900 border border-gray-800 text-white pl-12 pr-32 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xl"
        />
        <button
          disabled={loading}
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white px-6 rounded-xl flex items-center gap-2 font-semibold transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><ArrowRight size={20} /> Scan</>}
        </button>
      </form>

      {result && (
        <div className={`p-8 rounded-3xl border ${result.isSafe ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'} space-y-6 shadow-2xl animate-slideUp`}>
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className={`p-3 rounded-2xl ${result.isSafe ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {result.isSafe ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {result.isSafe ? 'This Link Seems Safe' : 'Warning: High Risk Detected'}
                </h3>
                <p className="text-gray-400 text-sm">Security Score: {result.score}/100</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Analysis Highlights</h4>
              <ul className="space-y-2">
                {result.threats.map((threat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${result.isSafe ? 'bg-green-500' : 'bg-red-500'}`} />
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
              <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Nexus AI Verdict</h4>
              <p className="text-gray-400 text-sm italic leading-relaxed">
                "{result.recommendation}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlScanner;
