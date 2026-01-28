
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Activity, Lock, Search, Zap } from 'lucide-react';

const data = [
  { name: '00:00', threat: 12, safe: 45 },
  { name: '04:00', threat: 8, safe: 52 },
  { name: '08:00', threat: 25, safe: 38 },
  { name: '12:00', threat: 18, safe: 61 },
  { name: '16:00', threat: 14, safe: 55 },
  { name: '20:00', threat: 20, safe: 48 },
  { name: '23:59', threat: 15, safe: 50 },
];

const pieData = [
  { name: 'Clean', value: 85 },
  { name: 'Suspicious', value: 10 },
  { name: 'Malicious', value: 5 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Stats Cards with stagger */}
      <div className="glass-panel p-6 rounded-3xl flex items-center gap-5 transition-all hover:translate-y-[-4px] animate-reveal opacity-0">
        <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center shadow-inner">
          <Search size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Deep Scans</p>
          <p className="text-3xl font-black text-white italic">1,284</p>
        </div>
      </div>
      
      <div className="glass-panel p-6 rounded-3xl flex items-center gap-5 transition-all hover:translate-y-[-4px] animate-reveal opacity-0 animate-stagger-1">
        <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center shadow-inner">
          <Zap size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Threats Mitigated</p>
          <p className="text-3xl font-black text-white italic">42</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl flex items-center gap-5 transition-all hover:translate-y-[-4px] animate-reveal opacity-0 animate-stagger-2">
        <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center shadow-inner">
          <Shield size={28} />
        </div>
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Safety Index</p>
          <p className="text-3xl font-black text-white italic">94%</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="md:col-span-2 glass-panel p-8 rounded-[2rem] animate-reveal opacity-0 animate-stagger-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="text-indigo-400 animate-pulse" size={24} />
            <h3 className="font-black text-white uppercase tracking-widest text-sm italic">Live Neural Activity</h3>
          </div>
          <select className="bg-white/5 text-[10px] font-bold border-none rounded-lg text-gray-400 px-3 py-1.5 focus:ring-0 cursor-pointer hover:bg-white/10 transition-colors uppercase tracking-widest">
            <option>Real-time Matrix</option>
            <option>Historical Log</option>
          </select>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey="safe" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSafe)" />
              <Area type="monotone" dataKey="threat" stroke="#ef4444" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass-panel p-8 rounded-[2rem] animate-reveal opacity-0 animate-stagger-2">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-indigo-400" size={24} />
          <h3 className="font-black text-white uppercase tracking-widest text-sm italic">Heuristic Triage</h3>
        </div>
        <div className="h-72 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={95}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-white italic">85%</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Purity Index</span>
          </div>
        </div>
      </div>

      {/* Advisory Bar */}
      <div className="md:col-span-3 glass-panel p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center border-indigo-500/20 bg-indigo-600/5 animate-reveal opacity-0 animate-stagger-3">
        <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-3xl flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-2xl animate-pulse">
          <Lock size={40} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Critical Intelligence: Biometric Hardening</h4>
          <p className="text-gray-400 leading-relaxed text-sm max-w-3xl">
            A new wave of AI-driven phishing is targeting key executives. Nexus Shield recommends transitioning to Passkeys and Hardware Security Modules (HSM) for all Root-level accesses.
          </p>
        </div>
        <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 shrink-0">
          Uplink Now
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
