import React from 'react';
import { Copy, Terminal, AlertTriangle, CheckCircle2 } from 'lucide-react';

const IntegrationGuide: React.FC = () => {
  const pythonCode = `import streamlit as st
import streamlit.components.v1 as components
import os

# تنظیمات صفحه (راست‌چین)
st.set_page_config(layout="wide", page_title="داشبورد پارس")

# تزریق CSS برای فونت وزیر و راست‌چین کردن کل صفحه
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');
    html, body, [class*="css"] {
        font-family: 'Vazirmatn', sans-serif;
        direction: rtl;
    }
</style>
""", unsafe_allow_html=True)

def render_react_app():
    """
    این تابع کامپوننت React را فراخوانی می‌کند.
    در محیط توسعه (Development) به لوکال‌هاست وصل می‌شود.
    در محیط عملیاتی (Production) از فایل‌های بیلد شده استفاده می‌کند.
    """
    
    # حالت ۱: توسعه (وقتی npm start زده‌اید)
    # components.iframe("http://localhost:3000", height=800, scrolling=True)
    
    # حالت ۲: عملیاتی (ساخت کامپوننت سفارشی)
    # برای استفاده حرفه‌ای باید از components.declare_component استفاده کنید
    # که نیازمند بیلد گرفتن از پروژه React است.
    
    # برای این دمو ساده، ما از iframe استفاده می‌کنیم:
    st.info("در حال نمایش داشبورد React...")
    
    # نکته: در پروژه واقعی، URL اپلیکیشن دیپلوی شده خود را اینجا بگذارید
    components.iframe("https://your-react-app-url.com", height=900, scrolling=True)

st.title("سامانه تحلیل داده ترکیبی (Streamlit + React)")
st.write("این نمونه‌ای از معماری فصل ۳ گزارش است.")

render_react_app()
`;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">چگونه این را در Streamlit اجرا کنیم؟</h2>
            <p className="text-slate-500 text-sm">راهنمای تبدیل این داشبورد React به یک کامپوننت Streamlit</p>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p>
            این اپلیکیشن با تکنولوژی <strong>React</strong> ساخته شده تا محدودیت‌های ظاهری Streamlit (مانند نمودارهای تعاملی خاص و استایل‌های پیچیده RTL) را برطرف کند.
            طبق معماری "کامپوننت‌های سفارشی" (Custom Components)، شما باید این پروژه را بیلد گرفته و درون Streamlit صدا بزنید.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-700 font-medium">
            <li>فریم‌ورک فرانت‌اند: React + Tailwind CSS</li>
            <li>فریم‌ورک بک‌اند: Python Streamlit</li>
            <li>روش اتصال: st.components.v1.iframe یا components.declare_component</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden text-left dir-ltr">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-300">app.py</span>
          </div>
          <button 
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            onClick={() => navigator.clipboard.writeText(pythonCode)}
          >
            <Copy size={14} />
            Copy Code
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-blue-300 leading-relaxed">
            <code>{pythonCode}</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex gap-3">
          <CheckCircle2 className="text-green-500 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-700 text-sm">مزیت اول: آزادی کامل UI</h4>
            <p className="text-xs text-slate-500 mt-1">با این روش می‌توانید از تمام کتابخانه‌های React مثل Recharts و Framer Motion در Streamlit استفاده کنید.</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex gap-3">
          <CheckCircle2 className="text-green-500 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-700 text-sm">مزیت دوم: معماری تمیز</h4>
            <p className="text-xs text-slate-500 mt-1">منطق سنگین پایتون از لاجیک نمایشی جدا می‌شود و کد شما قابل نگهداری‌تر خواهد بود.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationGuide;