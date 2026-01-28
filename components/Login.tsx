
import React, { useState } from 'react';
import { ShieldCheck, Mail, Loader2, AlertCircle, ArrowRight, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, provider: string) => void;
}

type Provider = 'nexus' | 'google' | 'apple' | 'microsoft';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider>('nexus');

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(`Identity required. Please enter your ${selectedProvider !== 'nexus' ? selectedProvider : ''} email.`);
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid bitstream format. Please enter a valid email.');
      return;
    }

    setIsVerifying(true);
    
    // Simulate a secure handshake/verification
    setTimeout(() => {
      onLogin(email, selectedProvider);
    }, 2000);
  };

  const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const AppleLogo = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.05 20.28c-.96.95-2.18 2.05-3.46 2.05-1.25 0-1.64-.78-3.13-.78-1.51 0-1.95.76-3.11.78-1.28.02-2.58-1.23-3.55-2.2-1.97-1.96-3.48-5.55-3.48-8.66 0-5.11 3.12-7.8 6.08-7.8 1.57 0 3.05.97 4.01.97.94 0 2.76-1.16 4.67-1.16 1.15 0 2.31.39 3.13 1.06-1.87 2.22-1.57 5.61.76 7.64-.79 2.12-2.13 5.09-2.92 6.09l-.01.01zM12.03 3.72c.11-2.45 2.14-4.42 4.49-4.72.31 2.81-2.4 5.39-4.49 4.72z"/>
    </svg>
  );

  const MicrosoftLogo = () => (
    <svg viewBox="0 0 23 23" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path fill="#f3f3f3" d="M0 0h11v11H0z"/>
      <path fill="#f3f3f3" d="M12 0h11v11H12z"/>
      <path fill="#f3f3f3" d="M0 12h11v11H0z"/>
      <path fill="#f3f3f3" d="M12 12h11v11H12z"/>
      <path fill="#f25022" d="M1.5 1.5h8v8h-8z"/>
      <path fill="#7fba00" d="M13.5 1.5h8v8h-8z"/>
      <path fill="#00a4ef" d="M1.5 13.5h8v8h-8z"/>
      <path fill="#ffb900" d="M13.5 13.5h8v8h-8z"/>
    </svg>
  );

  const getProviderColor = () => {
    switch (selectedProvider) {
      case 'google': return 'from-blue-500 to-red-500';
      case 'apple': return 'from-gray-100 to-gray-500';
      case 'microsoft': return 'from-orange-500 to-blue-500';
      default: return 'from-indigo-500 to-teal-500';
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center animate-reveal">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-600/40 rotate-12 transition-transform hover:rotate-0 cursor-default group">
            <ShieldCheck size={48} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2 uppercase italic">Nexus</h1>
          <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em]">Quantum Command Interface</p>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] shadow-2xl space-y-8 animate-reveal animate-stagger-1 border-white/10">
          {isVerifying ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-fadeIn">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />
                <Loader2 className="animate-spin text-indigo-500 relative" size={64} />
              </div>
              <div className="text-center">
                <p className="text-white font-black text-xl italic uppercase tracking-tighter">Establishing Secure Uplink</p>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                  Syncing {selectedProvider} biometric keys for: {email}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-black text-white italic uppercase tracking-tight">Access Gateway</h2>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Select your authorization channel</p>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <button 
                    onClick={() => setSelectedProvider('nexus')}
                    className={`p-4 rounded-2xl flex items-center justify-center transition-all border ${selectedProvider === 'nexus' ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'}`}
                    title="Nexus Internal"
                  >
                    <Shield size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedProvider('google')}
                    className={`p-4 rounded-2xl flex items-center justify-center transition-all border ${selectedProvider === 'google' ? 'bg-white/10 border-blue-500/50 shadow-lg' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100 hover:bg-white/10'}`}
                    title="Google Account"
                  >
                    <GoogleLogo />
                  </button>
                  <button 
                    onClick={() => setSelectedProvider('apple')}
                    className={`p-4 rounded-2xl flex items-center justify-center transition-all border ${selectedProvider === 'apple' ? 'bg-white/10 border-white/50 shadow-lg' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100 hover:bg-white/10'}`}
                    title="Apple ID"
                  >
                    <AppleLogo />
                  </button>
                  <button 
                    onClick={() => setSelectedProvider('microsoft')}
                    className={`p-4 rounded-2xl flex items-center justify-center transition-all border ${selectedProvider === 'microsoft' ? 'bg-white/10 border-orange-500/50 shadow-lg' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100 hover:bg-white/10'}`}
                    title="Microsoft Account"
                  >
                    <MicrosoftLogo />
                  </button>
                </div>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[8px] uppercase">
                  <span className="bg-gray-950/40 px-3 text-gray-600 font-black tracking-[0.4em] backdrop-blur-sm">Verification Required Down Below</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${getProviderColor()} rounded-2xl blur opacity-10 group-focus-within:opacity-40 transition duration-500`}></div>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={`${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)} Email ID`} 
                        className="w-full bg-black/60 border border-white/10 text-white pl-14 pr-6 py-5 rounded-2xl focus:outline-none focus:border-indigo-500/50 transition-all font-mono text-sm tracking-wide placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider animate-slideInRight px-1">
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.97] flex items-center justify-center gap-3 uppercase italic tracking-widest group"
                >
                  Confirm Identity <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </>
          )}
        </div>

        <div className="text-center animate-reveal animate-stagger-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/5 rounded-full border border-indigo-500/10">
            <Shield size={12} className="text-indigo-400" />
            <p className="text-[9px] text-gray-600 font-black tracking-[0.2em] uppercase">
              Secure Channel: {selectedProvider} Uplink Verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;