
import React from 'react';
import { View } from '../types';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Globe, 
  Key, 
  MessageSquare, 
  FileSearch, 
  GraduationCap,
  ShieldQuestion,
  LogOut,
  MessageSquareQuote,
  Settings,
  User as UserIcon
} from 'lucide-react';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
  userEmail: string;
  userProvider: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, onLogout, userEmail, userProvider, children }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.URL_SCANNER, label: 'URL Scanner', icon: Globe },
    { id: View.FILE_SCANNER, label: 'File Scanner', icon: FileSearch },
    { id: View.PASSWORD_CHECKER, label: 'Password Safe', icon: Key },
    { id: View.AI_ASSISTANT, label: 'AI Assistant', icon: MessageSquare },
    { id: View.QUIZ, label: 'Skill Quiz', icon: GraduationCap },
    { id: View.PROFILE, label: 'Identity & Settings', icon: Settings },
    { id: View.FAQS, label: 'Intelligence Base', icon: ShieldQuestion },
    { id: View.FEEDBACK, label: 'Feedback', icon: MessageSquareQuote },
  ];

  const getProviderIcon = () => {
    switch (userProvider) {
      case 'google': return <div className="w-2 h-2 rounded-full bg-blue-500" />;
      case 'apple': return <div className="w-2 h-2 rounded-full bg-white" />;
      case 'microsoft': return <div className="w-2 h-2 rounded-full bg-orange-500" />;
      default: return <div className="w-2 h-2 rounded-full bg-indigo-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/5 hidden md:flex flex-col z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 transform transition-transform hover:rotate-6">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">Nexus</span>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group opacity-0 animate-reveal`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-indigo-400'
              }`}>
                <item.icon size={16} />
              </div>
              <span className={`font-semibold text-xs transition-colors ${
                currentView === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-100'
              }`}>
                {item.label}
              </span>
              {currentView === item.id && (
                <div className="ml-auto w-1 h-4 bg-indigo-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <button 
            onClick={() => setView(View.PROFILE)}
            className="w-full bg-white/5 backdrop-blur-sm p-3 rounded-2xl border border-white/10 group cursor-pointer transition-all hover:bg-white/10 text-left flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg">
              <UserIcon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white font-black truncate uppercase tracking-tight">{userEmail.split('@')[0]}</p>
              <div className="flex items-center gap-1.5">
                {getProviderIcon()}
                <p className="text-[9px] text-gray-500 truncate font-bold uppercase">{userProvider}</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={16} />
            <span className="font-bold text-[10px] uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
        <header className="h-16 border-b border-white/5 bg-gray-950/20 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">
              {navItems.find(i => i.id === currentView)?.label || 'Nexus Command'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 bg-indigo-500/5 rounded-full border border-indigo-500/20 shadow-inner">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                </div>
                <span className="text-[10px] font-mono text-indigo-300 font-black uppercase tracking-tighter">ID: {userEmail}</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden glass-panel border-t border-white/5 flex justify-around items-center p-3 z-50 overflow-x-auto">
           {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`p-3 rounded-2xl transition-all duration-300 shrink-0 ${
                currentView === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 bg-white/5'
              }`}
            >
              <item.icon size={18} />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;