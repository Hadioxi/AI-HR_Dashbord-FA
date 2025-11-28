import React from 'react';
import { Employee } from '../types';
import KPICard from './KPICard';
import { Users, AlertTriangle, HeartPulse, Scale, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AI_MODEL_WEIGHTS } from '../constants';

interface Props {
  employees: Employee[];
}

const OverviewTab: React.FC<Props> = ({ employees }) => {
  const highRiskCount = employees.filter(e => e.churnRisk > 60).length;
  const avgEngagement = Math.round(employees.reduce((acc, curr) => acc + curr.metrics.engagement, 0) / employees.length);
  const avgCommitment = Math.round(employees.reduce((acc, curr) => acc + curr.metrics.commitment.affective, 0) / employees.length);
  const avgRisk = Math.round(employees.reduce((acc, curr) => acc + curr.churnRisk, 0) / employees.length);

  // Risk Distribution Data
  const riskDistribution = [
    { name: 'کم‌خطر (۰-۳۰٪)', count: employees.filter(e => e.churnRisk <= 30).length },
    { name: 'متوسط (۳۱-۶۰٪)', count: employees.filter(e => e.churnRisk > 30 && e.churnRisk <= 60).length },
    { name: 'پرخطر (۶۱-۱۰۰٪)', count: employees.filter(e => e.churnRisk > 60).length },
  ];

  // Feature Importance Data (Root Cause Analysis)
  const featureImportance = [
    { name: 'تعهد عاطفی (Love)', impact: AI_MODEL_WEIGHTS.affectiveCommitment * 100 },
    { name: 'رابطه با مدیر (LMX)', impact: AI_MODEL_WEIGHTS.lmx * 100 },
    { name: 'فرسودگی شغلی', impact: AI_MODEL_WEIGHTS.burnout * 100 },
    { name: 'عدالت سازمانی', impact: AI_MODEL_WEIGHTS.justice * 100 },
    { name: 'نقض قرارداد', impact: AI_MODEL_WEIGHTS.contractBreach * 100 },
  ].sort((a, b) => b.impact - a.impact);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">داشبورد هوشمند پیش‌بینی ریزش</h2>
          <p className="text-slate-500 text-xs md:text-sm">پایش ۵۰ پرسنل با استفاده از مدل جنگل تصادفی (Random Forest Simulation)</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-2 self-start md:self-auto w-full md:w-auto justify-center md:justify-start">
            <BrainCircuit size={18} className="text-indigo-600" />
            <span className="text-indigo-700 text-sm font-bold">دقت مدل هوش مصنوعی: ۹۴٪</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
            title="ریسک کلی سازمان" 
            value={`${avgRisk}٪`} 
            trend={avgRisk > 40 ? 15 : -5} 
            icon={<AlertTriangle size={24} />} 
            colorClass={avgRisk > 40 ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"}
        />
        <KPICard 
            title="نفرات در منطقه خطر" 
            value={`${highRiskCount} نفر`} 
            trend={12} 
            icon={<Users size={24} />} 
            colorClass="text-amber-600 bg-amber-50"
        />
        <KPICard 
            title="میانگین دلبستگی" 
            value={`${avgEngagement}٪`} 
            trend={-2} 
            icon={<HeartPulse size={24} />} 
            colorClass="text-pink-600 bg-pink-50"
        />
        <KPICard 
            title="کیفیت مدیریت (LMX)" 
            value="۶۸ / ۱۰۰" 
            trend={5} 
            icon={<Scale size={24} />} 
            colorClass="text-blue-600 bg-blue-50"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-6">توزیع جمعیت بر اساس ریسک</h3>
            {/* Added dir="ltr" to fix Recharts RTL bug */}
            <div className="h-64" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskDistribution} layout="vertical" margin={{ left: 5, right: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        {/* RTL Adjustment: Reversed XAxis so bars grow Right to Left */}
                        <XAxis type="number" hide reversed={true} domain={[0, 'dataMax']} />
                        {/* RTL Adjustment: Orientation Right for YAxis labels */}
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={110} 
                          tick={{fontSize: 12}} 
                          orientation="right"
                        />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{direction: 'rtl'}} />
                        <Bar dataKey="count" radius={[4, 0, 0, 4]} barSize={40}>
                            {riskDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 2 ? '#ef4444' : index === 1 ? '#f59e0b' : '#22c55e'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Feature Importance (Root Cause Analysis) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="font-bold text-slate-700 mb-2">تحلیل ریشه‌ای عوامل خروج (AI Feature Importance)</h3>
            <p className="text-slate-500 text-xs mb-6">این نمودار نشان می‌دهد کدام فاکتور روانشناختی بیشترین تاثیر را بر تصمیم خروج کارکنان در سازمان شما دارد.</p>
            {/* Added dir="ltr" to fix Recharts RTL bug */}
            <div className="h-64" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    {/* Switched to layout="vertical" to fix overlapping labels */}
                    <BarChart data={featureImportance} layout="vertical" margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                         {/* RTL Adjustment: Reversed XAxis (Value Axis) */}
                        <XAxis type="number" hide reversed={true} domain={[0, 'dataMax']} />
                         {/* RTL Adjustment: YAxis on Right with enough width for labels */}
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={150} 
                          tick={{fontSize: 12}} 
                          interval={0}
                          orientation="right"
                        />
                        <Tooltip 
                            formatter={(value: number) => [`${Math.round(value)}%`, 'میزان تاثیر']}
                            contentStyle={{direction: 'rtl', borderRadius: '8px'}}
                            cursor={{fill: 'transparent'}}
                        />
                        <Bar dataKey="impact" radius={[4, 0, 0, 4]} barSize={30}>
                             {featureImportance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`rgba(79, 70, 229, ${1 - index * 0.15})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
       
       {/* High Risk Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <h3 className="font-bold text-slate-700 mb-4">نفرات نیازمند توجه فوری (Top 5 Risk)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm min-w-[600px]">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-200">
                            <th className="pb-3 pr-4">نام</th>
                            <th className="pb-3">واحد</th>
                            <th className="pb-3">ریسک</th>
                            <th className="pb-3">عامل اصلی</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.sort((a,b) => b.churnRisk - a.churnRisk).slice(0, 5).map(emp => (
                            <tr key={emp.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                <td className="py-3 pr-4 font-medium text-slate-700">{emp.name}</td>
                                <td className="py-3 text-slate-500">{emp.department}</td>
                                <td className="py-3">
                                    <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-full text-xs">{emp.churnRisk}%</span>
                                </td>
                                <td className="py-3 text-slate-500 text-xs">{emp.riskFactors[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default OverviewTab;