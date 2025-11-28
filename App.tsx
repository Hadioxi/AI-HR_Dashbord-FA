import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import PsychologyTab from './components/PsychologyTab';
import RiskPreventionTab from './components/RiskPreventionTab';
import ArchitectureTab from './components/ArchitectureTab';
import { TabView } from './types';
import { MOCK_EMPLOYEES } from './constants';
import { Menu, PieChart } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case TabView.OVERVIEW:
        return <OverviewTab employees={MOCK_EMPLOYEES} />;
      case TabView.PSYCHOMETRICS:
        return <PsychologyTab employees={MOCK_EMPLOYEES} />;
      case TabView.RETENTION:
        return <RiskPreventionTab employees={MOCK_EMPLOYEES} />;
      case TabView.ARCHITECTURE:
        return <ArchitectureTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans" dir="rtl">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={{ 
          name: 'هادی موسوی', 
          role: 'تحلیل‌گر و روانشناس', 
          avatar: 'https://i.postimg.cc/hj30kQ4x/Gemini-Generated-Image-fkmqalfkmqalfkmq.png' 
        }} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <PieChart size={18} />
            </div>
            <span className="font-bold text-slate-800">داشبورد تحلیل</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto pb-20">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
