
import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, CheckCircle2, Circle, Clock, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [strength, setStrength] = useState(0);

  const checks = [
    { label: 'Minimum 12 Bitstream Units', test: (p: string) => p.length >= 12 },
    { label: 'Upper Case Sigma Detected', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Lower Case Delta Detected', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Numeric Integration Active', test: (p: string) => /\d/.test(p) },
    { label: 'Symbolic Encryption Patterns', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  useEffect(() => {
    const passed = checks.filter(c => c.test(password)).length;
    setStrength((passed / checks.length) * 100);
  }, [password]);

  const getStrengthColor = () => {
    if (password.length === 0) return 'bg-gray-800';
    if (strength <= 20) return 'bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)]';
    if (strength <= 60) return 'bg-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.5)]';
    if (strength <= 80) return 'bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.5)]';
    return 'bg-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.5)]';
  };

  const getStrengthLabel = () => {
    if (password.length === 0) return 'Terminal Idle';
    if (strength <= 20) return 'Vulnerable Target';
    if (strength <= 60) return 'Sub-Optimal Matrix';
    if (strength <= 80) return 'Fortified Firewall';
    return 'Quantum Immutable';
  };

  const getCrackTime = () => {
    if (password.length === 0) return 'N/A';
    if (strength <= 20) return 'Sub-Second';
    if (strength <= 40) return 'Hours';
    if (strength <= 60) return 'Eons';
    if (strength <= 80) return 'Eras';
    return 'Universal Lifespan';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-reveal">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className={`p-6 rounded-[2rem] transition-all duration-700 shadow-2xl transform ${strength === 100 ? 'bg-teal-500/20 text-teal-400 scale-110 rotate-12' : 'bg-indigo-500/10 text-indigo-400 rotate-0'}`}>
            {strength === 100 ? <ShieldCheck size={56} /> : <ShieldAlert size={56} />}
          </div>
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Entropy Analyzer</h2>
        <p className="text-gray-500 font-medium max-w-md mx-auto">Neural-net simulation of brute-force and dictionary-based attacks in real-time.</p>
      </div>

      <div className="glass-panel p-10 rounded-[3rem] shadow-2xl space-y-10 relative overflow-hidden transition-all hover:border-white/20">
        {/* Animated dynamic glow background */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 blur-[100px] rounded-full transition-all duration-1000 pointer-events-none opacity-20 ${getStrengthColor()}`} />
        <div className={`absolute -bottom-20 -left-20 w-64 h-64 blur-[100px] rounded-full transition-all duration-1000 pointer-events-none opacity-20 ${getStrengthColor()}`} />
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/50 to-teal-500/50 rounded-3xl blur opacity-20 group-focus-within:opacity-100 transition duration-700"></div>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-white/10 text-white px-8 py-6 rounded-[1.5rem] focus:outline-none focus:ring-0 font-mono text-3xl tracking-[0.3em] placeholder:text-gray-800 transition-all text-center"
              placeholder="••••••••"
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white p-3 transition-all rounded-xl hover:bg-white/5"
            >
              {show ? <EyeOff size={28} /> : <Eye size={28} />}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-2">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Neural Status</span>
              <p className={`font-black text-2xl tracking-tighter italic uppercase transition-all duration-700 ${getStrengthColor().replace('bg-', 'text-')}`}>
                {getStrengthLabel()}
              </p>
            </div>
            <div className="text-center md:text-right space-y-2">
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Mitigation Timeline</span>
              <p className="text-white font-mono text-xl flex items-center justify-center md:justify-end gap-3 italic">
                <Clock size={20} className="text-indigo-400" /> {getCrackTime()}
              </p>
            </div>
          </div>

          {/* Liquid Progress Bar */}
          <div className="relative h-6 w-full bg-white/5 rounded-full p-1 border border-white/5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out relative ${getStrengthColor()}`}
              style={{ width: `${strength}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {checks.map((check, idx) => {
            const passed = check.test(password);
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-4 p-5 rounded-3xl transition-all duration-500 border ${
                  passed 
                    ? 'bg-teal-500/5 border-teal-500/30 text-teal-100 shadow-lg shadow-teal-500/5' 
                    : 'bg-white/5 border-white/5 text-gray-600 opacity-60'
                } animate-reveal opacity-0`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`p-2 rounded-xl transition-all duration-700 ${passed ? 'bg-teal-500 text-black scale-110 shadow-[0_0_15px_rgba(45,212,191,0.5)]' : 'bg-white/5'}`}>
                  {passed ? <ShieldCheck size={18} /> : <Circle size={18} strokeWidth={2} />}
                </div>
                <span className="text-xs font-black uppercase tracking-widest leading-none">{check.label}</span>
                {passed && <Zap size={14} className="ml-auto text-teal-400 animate-pulse" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-panel border-indigo-500/30 bg-indigo-500/5 p-8 rounded-[2.5rem] flex gap-6 items-center transform transition-transform hover:scale-[1.01]">
        <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-2xl">
          <Shield size={32} />
        </div>
        <div className="space-y-1">
          <span className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] block">Defense Protocol</span>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            Entropic diversity is the core of cryptographic resilience. Avoid repeating sequences and dictionary words. Preferred strategy: <span className="text-white italic">Random Hexadecimal Passphrases</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordChecker;
