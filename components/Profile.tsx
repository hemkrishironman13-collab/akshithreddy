
import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Cpu, 
  Globe, 
  Activity, 
  Shield, 
  Lock, 
  Smartphone,
  Fingerprint
} from 'lucide-react';

interface ProfileProps {
  email: string;
  provider: string;
}

const Profile: React.FC<ProfileProps> = ({ email, provider }) => {
  const accountStats = [
    { label: 'Security Level', value: 'Level 4 (High)', icon: Shield, color: 'text-indigo-400' },
    { label: 'Session Status', value: 'Active / Encrypted', icon: Activity, color: 'text-green-400' },
    { label: 'Uplink Node', value: 'Nexus Central', icon: Globe, color: 'text-blue-400' },
    { label: 'Account Integrity', value: '99.9%', icon: ShieldCheck, color: 'text-teal-400' },
  ];

  const getProviderBrand = () => {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-reveal">
      <div className="text-center space-y-6">
        <div className="relative inline-block group">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative w-32 h-32 bg-gray-900 rounded-[2.5rem] border border-white/10 flex items-center justify-center text-indigo-400 shadow-2xl">
            <User size={64} className="group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-950 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">{email.split('@')[0]}</h2>
          <div className="flex items-center justify-center gap-3">
             <span className="bg-indigo-600/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-indigo-500/20">
               Nexus Architect
             </span>
             <span className="w-1 h-1 bg-gray-700 rounded-full" />
             <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">UID: NX-{(email.length * 7).toString(16).toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Identity Information */}
        <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-6">
           <div className="flex items-center gap-3 mb-2">
              <Fingerprint className="text-indigo-400" size={24} />
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Identity Matrix</h3>
           </div>
           
           <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Authenticated Email</p>
                    <p className="text-white font-mono text-sm">{email}</p>
                 </div>
                 <Mail size={18} className="text-gray-600" />
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Authorization Provider</p>
                    <p className="text-white font-bold text-sm uppercase">{getProviderBrand()}</p>
                 </div>
                 <Cpu size={18} className="text-gray-600" />
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">MFA Hardware Key</p>
                    <p className="text-white font-bold text-sm">Nexus Internal (Biometric)</p>
                 </div>
                 <Smartphone size={18} className="text-gray-600" />
              </div>
           </div>
        </div>

        {/* Security Summary */}
        <div className="grid grid-cols-1 gap-4">
           {accountStats.map((stat, idx) => (
             <div 
              key={idx} 
              className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-5 group hover:border-indigo-500/30 transition-all animate-reveal opacity-0"
              style={{ animationDelay: `${idx * 0.1}s` }}
             >
                <div className={`w-12 h-12 bg-white/5 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                   <stat.icon size={24} />
                </div>
                <div>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">{stat.label}</p>
                   <p className="text-white font-black uppercase italic tracking-tighter">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="glass-panel p-10 rounded-[3rem] border-indigo-500/20 bg-indigo-600/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock size={120} />
         </div>
         <div className="relative z-10 space-y-4 max-w-xl">
            <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Advanced Security Configuration</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
               Your Nexus account is currently running on the <span className="text-white italic">Titan-X</span> security protocol. All session data is ephemeral and encrypted at rest using decentralized key clusters. 
            </p>
            <div className="flex gap-4 pt-2">
               <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                  Update Keys
               </button>
               <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/10">
                  Privacy Log
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;