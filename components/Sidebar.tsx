import React from 'react';
import { LayoutDashboard, BrainCircuit, ShieldAlert, ChevronLeft, PieChart, LogOut, FileText, X } from 'lucide-react';
import { TabView } from '../types';

interface Props {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
  user: { name: string; role: string; avatar: string };
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ activeTab, onTabChange, user, isOpen, onClose }) => {
  const menuItems = [
    { id: TabView.OVERVIEW, label: 'نمای کلی و AI', icon: <LayoutDashboard size={20} /> },
    { id: TabView.PSYCHOMETRICS, label: 'تحلیل روانشناختی', icon: <BrainCircuit size={20} /> },
    { id: TabView.RETENTION, label: 'شبیه‌ساز و پیشگیری', icon: <ShieldAlert size={20} /> },
    { id: TabView.ARCHITECTURE, label: 'معماری و مستندات', icon: <FileText size={20} /> },
  ];

  const sidebarClasses = `
    bg-white border-l border-slate-200 h-screen flex flex-col 
    fixed top-0 right-0 z-50 transition-transform duration-300 ease-in-out w-64 shadow-2xl lg:shadow-none
    ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0'}
  `;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Brand */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg shrink-0">
              <PieChart size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">تحلیل نیروی انسانی</h1>
              <p className="text-xs text-slate-500">نسخه AI-Pilot</p>
            </div>
          </div>
          {/* Close Button Mobile */}
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onClose(); // Close sidebar on mobile when item selected
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
              {activeTab === item.id && <ChevronLeft size={16} className="mr-auto opacity-50" />}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100 mt-auto">
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3 border border-slate-100">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-700 truncate">{user.name}</h4>
              <p className="text-xs text-slate-500 truncate">{user.role}</p>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;