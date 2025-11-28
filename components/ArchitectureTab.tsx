import React, { useState } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { ChevronDown, ChevronUp, CheckCircle, FolderOpen, Database, BarChart3, MonitorPlay } from 'lucide-react';

// Types for the local demo dashboard
type DemoFilter = 'all' | 'it' | 'sales' | 'hr';

interface DemoData {
  burnout: { label: string; value: number; color: string }[];
  ocean: { subject: string; A: number; fullMark: number }[];
  trend: { month: string; value: number }[];
  kpis: { enps: string; turnover: string; engagement: string; response: string };
}

const ArchitectureTab: React.FC = () => {
  // --- State ---
  const [activeStrategy, setActiveStrategy] = useState<'metabase' | 'superset' | null>(null);
  const [deptFilter, setDeptFilter] = useState<DemoFilter>('all');

  // --- Data Logic (Ported from Script) ---
  const db: Record<DemoFilter, DemoData> = {
    all: {
      burnout: [
        { label: 'خیلی کم', value: 12, color: '#86efac' },
        { label: 'کم', value: 19, color: '#bef264' },
        { label: 'متوسط', value: 3, color: '#fde047' },
        { label: 'زیاد', value: 5, color: '#fdba74' },
        { label: 'بحرانی', value: 2, color: '#fca5a5' },
      ],
      ocean: [
        { subject: 'O', A: 65, fullMark: 100 },
        { subject: 'C', A: 59, fullMark: 100 },
        { subject: 'E', A: 80, fullMark: 100 },
        { subject: 'A', A: 81, fullMark: 100 },
        { subject: 'N', A: 56, fullMark: 100 },
      ],
      trend: [
        { month: 'فروردین', value: 30 }, { month: 'اردیبهشت', value: 45 }, { month: 'خرداد', value: 42 },
        { month: 'تیر', value: 50 }, { month: 'مرداد', value: 55 }, { month: 'شهریور', value: 60 },
      ],
      kpis: { enps: "+۴۲", turnover: "۸٪", engagement: "۳.۸/۵", response: "۷۶٪" }
    },
    it: {
      burnout: [
        { label: 'خیلی کم', value: 5, color: '#86efac' },
        { label: 'کم', value: 10, color: '#bef264' },
        { label: 'متوسط', value: 8, color: '#fde047' },
        { label: 'زیاد', value: 15, color: '#fdba74' },
        { label: 'بحرانی', value: 6, color: '#fca5a5' },
      ],
      ocean: [
        { subject: 'O', A: 85, fullMark: 100 },
        { subject: 'C', A: 70, fullMark: 100 },
        { subject: 'E', A: 40, fullMark: 100 },
        { subject: 'A', A: 60, fullMark: 100 },
        { subject: 'N', A: 45, fullMark: 100 },
      ],
      trend: [
        { month: 'فروردین', value: 40 }, { month: 'اردیبهشت', value: 38 }, { month: 'خرداد', value: 35 },
        { month: 'تیر', value: 42 }, { month: 'مرداد', value: 40 }, { month: 'شهریور', value: 45 },
      ],
      kpis: { enps: "+۱۵", turnover: "۱۲٪", engagement: "۳.۲/۵", response: "۸۵٪" }
    },
    sales: {
      burnout: [
        { label: 'خیلی کم', value: 2, color: '#86efac' },
        { label: 'کم', value: 5, color: '#bef264' },
        { label: 'متوسط', value: 15, color: '#fde047' },
        { label: 'زیاد', value: 5, color: '#fdba74' },
        { label: 'بحرانی', value: 1, color: '#fca5a5' },
      ],
      ocean: [
        { subject: 'O', A: 60, fullMark: 100 },
        { subject: 'C', A: 50, fullMark: 100 },
        { subject: 'E', A: 90, fullMark: 100 },
        { subject: 'A', A: 75, fullMark: 100 },
        { subject: 'N', A: 60, fullMark: 100 },
      ],
      trend: [
        { month: 'فروردین', value: 50 }, { month: 'اردیبهشت', value: 60 }, { month: 'خرداد', value: 65 },
        { month: 'تیر', value: 70 }, { month: 'مرداد', value: 68 }, { month: 'شهریور', value: 75 },
      ],
      kpis: { enps: "+۵۵", turnover: "۱۵٪", engagement: "۴.۱/۵", response: "۶۰٪" }
    },
    hr: {
      burnout: [
        { label: 'خیلی کم', value: 8, color: '#86efac' },
        { label: 'کم', value: 12, color: '#bef264' },
        { label: 'متوسط', value: 5, color: '#fde047' },
        { label: 'زیاد', value: 2, color: '#fdba74' },
        { label: 'بحرانی', value: 1, color: '#fca5a5' },
      ],
      ocean: [
        { subject: 'O', A: 70, fullMark: 100 },
        { subject: 'C', A: 65, fullMark: 100 },
        { subject: 'E', A: 70, fullMark: 100 },
        { subject: 'A', A: 85, fullMark: 100 },
        { subject: 'N', A: 50, fullMark: 100 },
      ],
      trend: [
        { month: 'فروردین', value: 45 }, { month: 'اردیبهشت', value: 50 }, { month: 'خرداد', value: 52 },
        { month: 'تیر', value: 55 }, { month: 'مرداد', value: 58 }, { month: 'شهریور', value: 62 },
      ],
      kpis: { enps: "+۳۸", turnover: "۵٪", engagement: "۴.۰/۵", response: "۹۵٪" }
    }
  };

  const currentData = db[deptFilter];

  const toggleStrategy = (key: 'metabase' | 'superset') => {
    if (activeStrategy === key) setActiveStrategy(null);
    else setActiveStrategy(key);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 md:py-8 space-y-8 md:space-y-12 bg-[#f5f5f4] text-[#44403c] rounded-xl font-sans">
      
      {/* Header Section */}
      <header className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800">داشبورد هوش تجاری و روانشناسی سازمانی</h1>
        <p className="text-sm md:text-lg text-stone-600 max-w-3xl mx-auto">
          یک مطالعه موردی تعاملی برای طراحی سیستم‌های تحلیل داده HR در سازمان‌های ایرانی.
          بررسی معماری Metabase بر بستر Streamlit.
        </p>
      </header>

      {/* SECTION 1: Strategic Selection */}
      <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-stone-200">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-teal-700 flex flex-col md:flex-row items-start md:items-center gap-2">
            <span>۱. انتخاب ابزار: Metabase یا Superset؟</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">
            برای پروژه‌های روانشناسی سازمانی که نیاز به رابط کاربری ساده برای مدیران غیرفنی دارند، انتخاب ابزار مناسب حیاتی است. در اینجا دو گزینه محبوب متن‌باز (Open Source) مقایسه شده‌اند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metabase Card */}
          <div 
            onClick={() => toggleStrategy('metabase')}
            className={`border-2 rounded-xl p-5 cursor-pointer bg-stone-50 transition-all ${activeStrategy === 'metabase' ? 'border-teal-300 ring-2 ring-teal-100' : 'border-teal-100 hover:border-teal-300'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg md:text-xl font-bold text-stone-800">Metabase (پیشنهاد ما)</h3>
              <span className="text-2xl text-yellow-500">★</span>
            </div>
            <p className="text-sm text-stone-600">مناسب برای تیم‌های چابک و داشبوردهای تعاملی سریع.</p>
            
            <div className={`mt-4 text-sm text-stone-700 overflow-hidden transition-all duration-300 ${activeStrategy === 'metabase' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>رابط کاربری:</strong> بسیار بصری و ساده برای کاربران غیر فنی (HR).</li>
                <li><strong>استقرار:</strong> راه‌اندازی بسیار ساده (فایل Jar یا Docker).</li>
                <li><strong>Embedding:</strong> قابلیت جاسازی راحت در Streamlit یا پنل‌های دیگر.</li>
                <li><strong>برای ایران:</strong> پشتیبانی خوب از فونت‌های فارسی و راست‌چین.</li>
              </ul>
            </div>
            <p className="mt-4 text-teal-600 text-xs font-bold text-center flex items-center justify-center gap-1">
               {activeStrategy === 'metabase' ? 'بستن' : 'نمایش جزئیات'} 
               {activeStrategy === 'metabase' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </p>
          </div>

          {/* Superset Card */}
          <div 
            onClick={() => toggleStrategy('superset')}
            className={`border-2 rounded-xl p-5 cursor-pointer bg-white transition-all ${activeStrategy === 'superset' ? 'border-orange-200 ring-2 ring-orange-100' : 'border-stone-100 hover:border-orange-200'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg md:text-xl font-bold text-stone-800">Apache Superset</h3>
            </div>
            <p className="text-sm text-stone-600">قدرتمند برای کلان داده (Big Data) و تیم‌های فنی.</p>
            <div className={`mt-4 text-sm text-stone-700 overflow-hidden transition-all duration-300 ${activeStrategy === 'superset' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>قدرت:</strong> تنوع نموداری بسیار بالا.</li>
                <li><strong>پیچیدگی:</strong> نیاز به دانش فنی بالا برای نگهداری.</li>
                <li><strong>UX:</strong> کمی پیچیده‌تر برای کاربر نهایی (مدیر منابع انسانی).</li>
                <li><strong>نتیجه:</strong> برای شروع یک پروژه نمونه‌کار، ممکن است Overkill (زیاده‌روی) باشد.</li>
              </ul>
            </div>
            <p className="mt-4 text-stone-400 text-xs font-bold text-center flex items-center justify-center gap-1">
               {activeStrategy === 'superset' ? 'بستن' : 'نمایش جزئیات'} 
               {activeStrategy === 'superset' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Architecture Diagram */}
      <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-stone-200">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-teal-700">۲. معماری سیستم در بستر Streamlit</h2>
          <p className="mt-2 text-sm md:text-base text-stone-600">
            چگونه Metabase را در Streamlit ادغام کنیم؟ Streamlit به عنوان "لایه ارائه" (Presentation Layer) عمل می‌کند و Metabase موتور تحلیل داده است.
          </p>
        </div>

        <div className="relative bg-stone-50 rounded-xl p-6 border border-stone-200 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            {/* Nodes */}
            {[
              { icon: <FolderOpen size={32} />, title: "منابع داده", sub: "پرسشنامه‌ها، اکسل، HRIS", color: "stone", border: "border-stone-400" },
              { icon: <Database size={32} />, title: "پایگاه داده", sub: "PostgreSQL (Warehouse)", color: "blue", border: "border-blue-400" },
              { icon: <BarChart3 size={32} />, title: "Metabase Server", sub: "ساخت داشبورد و تحلیل", color: "teal", border: "border-teal-500", ring: "ring-2 ring-teal-100" },
              { icon: <MonitorPlay size={32} />, title: "Streamlit App", sub: "نمایش نهایی (IFrame/API)", color: "orange", border: "border-orange-500", bg: "bg-orange-50" },
            ].map((node, i) => (
              <React.Fragment key={i}>
                <div className={`w-full md:w-1/4 bg-white p-4 rounded-lg border-l-4 shadow-sm text-center transition-transform hover:-translate-y-1 hover:shadow-md ${node.border} ${node.bg || ''} ${node.ring || ''}`}>
                  <div className="mb-2 flex justify-center text-slate-700">{node.icon}</div>
                  <h4 className={`font-bold ${node.color === 'teal' ? 'text-teal-700' : node.color === 'orange' ? 'text-orange-700' : 'text-stone-800'}`}>{node.title}</h4>
                  <p className="text-xs text-stone-500 mt-1">{node.sub}</p>
                </div>
                {i < 3 && (
                   <div className="text-stone-300 text-2xl font-bold rotate-90 md:rotate-0 transform py-2 md:py-0">{`➔`}</div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="mt-6 bg-blue-50 p-3 rounded text-sm text-blue-800 border border-blue-100 text-center">
            <strong>نکته کلیدی:</strong> در این معماری، کاربر نهایی با Streamlit تعامل دارد. Streamlit وظیفه احراز هویت (Authentication) و نمایش محتوا را بر عهده دارد، در حالی که نمودارها از طریق `Iframe` امن از Metabase فراخوانی می‌شوند.
          </div>
        </div>
      </section>

      {/* SECTION 3: The Dashboard (Portfolio Demo) */}
      <section className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border-t-4 border-teal-600">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-800">۳. نمونه کار: داشبورد سلامت روان سازمان</h2>
            <p className="text-xs md:text-sm text-stone-500 mt-1">داده‌های فرضی برای نمایش قابلیت‌های تحلیل روانشناسی صنعتی</p>
          </div>
          
          {/* Filter Control */}
          <div className="w-full md:w-auto">
            <label className="block text-xs font-bold text-stone-500 mb-1">فیلتر واحد سازمانی:</label>
            <div className="relative">
              <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value as DemoFilter)}
                className="w-full md:w-48 p-2 rounded border border-stone-300 bg-stone-50 focus:border-teal-500 focus:outline-none transition appearance-none"
              >
                <option value="all">همه سازمان</option>
                <option value="it">فناوری اطلاعات</option>
                <option value="sales">فروش و بازاریابی</option>
                <option value="hr">منابع انسانی</option>
              </select>
              <ChevronDown className="absolute left-2 top-3 text-stone-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Burnout */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 h-[300px] md:h-[350px]">
            <h3 className="text-base md:text-lg font-bold text-stone-700 mb-2 text-center">ریسک فرسودگی شغلی (Burnout)</h3>
            <p className="text-xs text-stone-500 text-center mb-4">مقایسه میانگین فرسودگی در برابر عملکرد</p>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={currentData.burnout}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e4" />
                <XAxis dataKey="label" tick={{fontSize: 10, fill: '#78716c'}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {currentData.burnout.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: OCEAN Radar */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 h-[300px] md:h-[350px]">
            <h3 className="text-base md:text-lg font-bold text-stone-700 mb-2 text-center">پروفایل شخصیتی تیم (مدل OCEAN)</h3>
            <p className="text-xs text-stone-500 text-center mb-4">میانگین شاخص‌های پنج‌گانه شخصیتی</p>
            <ResponsiveContainer width="100%" height="80%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={currentData.ocean}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="میانگین تیم"
                  dataKey="A"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fill="#0d9488"
                  fillOpacity={0.4}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Trend Line */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 lg:col-span-2 h-[300px] md:h-[350px]">
            <h3 className="text-base md:text-lg font-bold text-stone-700 mb-2 text-center">روند رضایت شغلی (۶ ماه اخیر)</h3>
            <p className="text-xs text-stone-500 text-center mb-4">بر اساس نظرسنجی‌های ماهانه eNPS</p>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={currentData.trend}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e4" />
                <XAxis dataKey="month" tick={{fontSize: 12, fill: '#78716c'}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Area type="monotone" dataKey="value" stroke="#0d9488" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'شاخص eNPS', val: currentData.kpis.enps, color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-100' },
            { label: 'نرخ ریزش', val: currentData.kpis.turnover, color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-100' },
            { label: 'میانگین تعهد', val: currentData.kpis.engagement, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
            { label: 'شرکت در نظرسنجی', val: currentData.kpis.response, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-100' },
          ].map((kpi, i) => (
            <div key={i} className={`p-4 rounded-lg text-center border ${kpi.bg} ${kpi.border}`}>
              <div className="text-xs text-stone-500">{kpi.label}</div>
              <div className={`text-xl md:text-2xl font-bold ${kpi.color}`}>{kpi.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Implementation Strategy */}
      <section className="bg-white rounded-2xl shadow-sm p-4 md:p-8 border border-stone-200">
        <h2 className="text-xl md:text-2xl font-bold text-teal-700 mb-6">۴. نقشه راه پیاده‌سازی (مخصوص سازمان‌های ایرانی)</h2>
        <div className="space-y-4">
          {[
            { title: "آماده‌سازی داده‌ها (ETL)", desc: "تیم‌سازی داده‌های پراکنده اکسل و نرم‌افزارهای حضور و غیاب. استفاده از Python (Pandas) برای تمیزکاری داده‌ها و یکسان‌سازی فرمت تاریخ (تبدیل شمسی به میلادی برای دیتابیس)." },
            { title: "راه‌اندازی Metabase", desc: "نصب نسخه Docker مت‌بیس روی سرور داخلی. اتصال به دیتابیس PostgreSQL. تعریف Questionها و Dashboardهای اولیه." },
            { title: "توسعه اپلیکیشن Streamlit", desc: "ساخت بدنه اصلی اپلیکیشن با پایتون. استفاده از کتابخانه `streamlit.components.v1.iframe` برای نمایش داشبوردهای Metabase داخل محیط اپلیکیشن. افزودن لایه امنیتی." },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm md:text-base">{step.title}</h4>
                <p className="text-xs md:text-sm text-stone-600 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <footer className="text-center text-stone-400 text-sm py-8 border-t border-stone-200">
        <p>طراحی شده برای نمونه‌کار تحلیل داده سازمانی</p>
      </footer>
    </div>
  );
};

export default ArchitectureTab;