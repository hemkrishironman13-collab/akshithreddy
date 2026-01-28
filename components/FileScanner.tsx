
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ScanResult } from '../types';
import { FileSearch, ShieldAlert, ShieldCheck, Loader2, Upload, X } from 'lucide-react';

const FileScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);
    try {
      // Simulate reading a small snippet for AI analysis
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = (e.target?.result as string).slice(0, 1000);
        const res = await geminiService.analyzeFile(file.name, content);
        setResult(res);
        setLoading(false);
      };
      reader.readAsText(file.slice(0, 5000));
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Advanced File Inspector</h2>
        <p className="text-gray-400">Analyze document contents and scripts for hidden malicious patterns.</p>
      </div>

      <div className="relative">
        {!file ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-800 rounded-3xl cursor-pointer bg-gray-900/40 hover:bg-gray-900/60 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 text-gray-500 mb-4 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, TXT, JS, JSON (MAX 10MB)</p>
            </div>
            <input type="file" className="hidden" onChange={handleFileChange} accept=".txt,.json,.js,.pdf" />
          </label>
        ) : (
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
                <FileSearch size={24} />
              </div>
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setFile(null)}
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <button
                disabled={loading}
                onClick={handleScan}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all disabled:bg-gray-700"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Analyze File"}
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className={`p-8 rounded-3xl border ${result.isSafe ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'} space-y-6 shadow-2xl animate-slideUp`}>
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className={`p-3 rounded-2xl ${result.isSafe ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {result.isSafe ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {result.isSafe ? 'File Analysis Complete' : 'Malicious Activity Detected'}
                </h3>
                <p className="text-gray-400 text-sm">Integrity Score: {result.score}/100</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-950/50 p-6 rounded-2xl border border-gray-800">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Expert Insights</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              {result.recommendation}
            </p>
            {!result.isSafe && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono uppercase">
                CRITICAL THREATS: {result.threats.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileScanner;
