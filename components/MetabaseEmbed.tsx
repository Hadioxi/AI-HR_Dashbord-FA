import React, { useState } from 'react';
import { Lock, RefreshCw, ExternalLink, Filter } from 'lucide-react';

const MetabaseEmbed: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(600);

  const refreshDashboard = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Control Bar - Simulating Chapter 2 Signed Params */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-primary">
            <Lock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-700 text-sm">پارامترهای قفل شده (Locked Params)</h4>
            <p className="text-xs text-slate-500">منطقه: تهران | شناسه مشتری: ۱۰۱</p>
          </div>
        </div>

        <div className="flex gap-2">
           <button 
            onClick={refreshDashboard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            بروزرسانی داده‌ها
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors shadow-lg shadow-blue-500/30">
            <Filter size={16} />
            اعمال فیلتر پیشرفته
          </button>
        </div>
      </div>

      {/* Iframe Container - Chapter 3 Styling */}
      <div className="relative flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
        {loading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-slate-500">در حال دریافت توکن امن...</span>
            </div>
          </div>
        )}
        
        {/* Mocking the Iframe content visually since we don't have a real Metabase instance */}
        <div className="w-full h-full flex flex-col">
            {/* Header Removal Simulation (Chapter 3.2) */}
            <div className="w-full bg-slate-50 border-b border-slate-200 p-2 text-center text-xs text-slate-400">
                قاب (Frame) مت‌بیس با پارامترهای #bordered=false&titled=false
            </div>
            
            {/* Fake Table Content */}
            <div className="p-6 overflow-auto" style={{ height: iframeHeight }}>
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="py-3 px-4 text-slate-500 font-medium text-sm">شماره سفارش</th>
                            <th className="py-3 px-4 text-slate-500 font-medium text-sm">تاریخ (شمسی شده)</th>
                            <th className="py-3 px-4 text-slate-500 font-medium text-sm">مبلغ (تومان)</th>
                            <th className="py-3 px-4 text-slate-500 font-medium text-sm">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                            <tr key={row} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-4 text-slate-700 font-mono">ORD-{1000 + row}</td>
                                <td className="py-3 px-4 text-slate-600">۱۴۰۲/۱۰/۰{row}</td>
                                <td className="py-3 px-4 text-slate-600">{(row * 1500000).toLocaleString()}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {row % 2 === 0 ? 'تکمیل شده' : 'در حال پردازش'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-8 flex justify-center text-slate-400 text-sm">
                    <p>نمایش ۱۰ رکورد از ۱,۲۵۰ رکورد موجود</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MetabaseEmbed;