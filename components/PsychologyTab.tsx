import React, { useState } from 'react';
import { Employee } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { User } from 'lucide-react';

interface Props {
  employees: Employee[];
}

const PsychologyTab: React.FC<Props> = ({ employees }) => {
  const [selectedEmpId, setSelectedEmpId] = useState<number>(employees[0].id);
  const selectedEmp = employees.find(e => e.id === selectedEmpId) || employees[0];

  // Data for Radar Chart (The Big Three)
  const radarData = [
    { subject: 'تعهد عاطفی (Love)', A: selectedEmp.metrics.commitment.affective, fullMark: 100 },
    { subject: 'تعهد مستمر (Cost)', A: selectedEmp.metrics.commitment.continuance, fullMark: 100 },
    { subject: 'تعهد هنجاری (Duty)', A: selectedEmp.metrics.commitment.normative, fullMark: 100 },
    { subject: 'رضایت شغلی', A: selectedEmp.metrics.jobSatisfaction, fullMark: 100 },
    { subject: 'دلبستگی (Engagement)', A: selectedEmp.metrics.engagement, fullMark: 100 },
  ];

  // Data for Justice Chart
  const justiceData = [
    { name: 'عدالت توزیعی', val: selectedEmp.metrics.justice.distributive },
    { name: 'عدالت رویه‌ای', val: selectedEmp.metrics.justice.procedural },
    { name: 'عدالت تعاملی', val: selectedEmp.metrics.justice.interactional },
    { name: 'حمایت سازمانی (POS)', val: selectedEmp.metrics.pos },
    { name: 'رابطه با مدیر (LMX)', val: selectedEmp.metrics.lmx },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">پروفایل روانشناختی</h2>
          <p className="text-slate-500 text-xs md:text-sm">تحلیل عمیق مولفه‌های ماندگاری (مایر و آلن)</p>
        </div>
        
        {/* Employee Selector */}
        <div className="relative w-full md:w-auto">
            <select 
                className="appearance-none w-full md:w-64 bg-white border border-slate-300 text-slate-700 py-2 pr-10 pl-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm"
                value={selectedEmpId}
                onChange={(e) => setSelectedEmpId(Number(e.target.value))}
            >
                {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
                ))}
            </select>
            <User className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Big Three Radar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700 text-sm md:text-base">سه‌گانه نگرش‌های شغلی</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg whitespace-nowrap">امتیاز از ۱۰۰</span>
            </div>
            <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name={selectedEmp.name}
                            dataKey="A"
                            stroke="#4f46e5"
                            strokeWidth={3}
                            fill="#6366f1"
                            fillOpacity={0.4}
                        />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-100">
                <strong>تحلیل:</strong> تعهد عاطفی (علاقه قلبی) مهمترین فاکتور است. اگر این عدد پایین باشد اما تعهد مستمر بالا باشد، فرد فقط به خاطر "هزینه ترک کار" مانده و بهره‌وری پایینی دارد.
            </div>
        </div>

        {/* Justice & Relations Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700 text-sm md:text-base">شاخص‌های عدالت و روابط</h3>
            </div>
            {/* Added dir="ltr" to fix Recharts RTL bug */}
            <div className="h-[300px] md:h-[350px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={justiceData} layout="vertical" margin={{ left: 5, right: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        {/* RTL Adjustment: Reversed XAxis so bars grow Right to Left */}
                        <XAxis type="number" domain={[0, 100]} hide reversed={true} />
                        {/* RTL Adjustment: YAxis on Right */}
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={120} 
                          tick={{ fontSize: 11, fontWeight: 500 }} 
                          orientation="right"
                        />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{direction: 'rtl'}} />
                        <Bar dataKey="val" radius={[4, 0, 0, 4]} barSize={25}>
                             {justiceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.val < 50 ? '#ef4444' : entry.val < 75 ? '#f59e0b' : '#3b82f6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="mt-4 p-4 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-100">
                <strong>هشدار:</strong> عدد پایین در LMX (رابطه با مدیر) معمولاً سریع‌ترین عامل خروج است. "کارمندان سازمان را ترک نمی‌کنند، مدیران را ترک می‌کنند."
            </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologyTab;