import React, { useState } from 'react';
import { Employee, SimulationState } from '../types';
import { calculateRiskScore } from '../constants';
import { AlertCircle, CheckCircle, ArrowLeft, Sliders, RefreshCcw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

interface Props {
  employees: Employee[];
}

const RiskPreventionTab: React.FC<Props> = ({ employees }) => {
  const [simulation, setSimulation] = useState<SimulationState>({
    justiceImprovement: 0,
    lmxImprovement: 0,
    burnoutReduction: 0,
    commitmentBoost: 0
  });

  const resetSimulation = () => {
    setSimulation({ justiceImprovement: 0, lmxImprovement: 0, burnoutReduction: 0, commitmentBoost: 0 });
  };

  // Calculate stats based on simulation
  const currentAvgRisk = Math.round(employees.reduce((acc, curr) => acc + curr.churnRisk, 0) / employees.length);
  
  const simulatedRisks = employees.map(emp => calculateRiskScore(emp.metrics, simulation));
  const newAvgRisk = Math.round(simulatedRisks.reduce((acc, curr) => acc + curr, 0) / employees.length);
  const riskReduction = currentAvgRisk - newAvgRisk;

  const comparisonData = [
    { name: 'وضعیت فعلی', risk: currentAvgRisk, fill: '#ef4444' },
    { name: 'بعد از اصلاحات', risk: newAvgRisk, fill: '#22c55e' }
  ];

  const atRiskEmployees = employees
    .map((e, idx) => ({ ...e, simulatedRisk: simulatedRisks[idx] }))
    .filter(e => e.churnRisk > 30) // Show anyone who WAS at risk originally
    .sort((a, b) => b.churnRisk - a.churnRisk);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Simulator Control Panel */}
        <div className="w-full lg:w-1/3 space-y-4">
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="flex items-center gap-2 mb-6">
                    <Sliders size={20} className="text-indigo-400" />
                    <h2 className="font-bold text-lg">شبیه‌ساز پیشگیری (What-If)</h2>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs mb-2 text-slate-300">
                            <label>بهبود عدالت سازمانی</label>
                            <span className="text-emerald-400">+{simulation.justiceImprovement}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="50" step="5"
                            value={simulation.justiceImprovement}
                            onChange={(e) => setSimulation({...simulation, justiceImprovement: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs mb-2 text-slate-300">
                            <label>بهبود رابطه با مدیر (LMX)</label>
                            <span className="text-blue-400">+{simulation.lmxImprovement}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="50" step="5"
                            value={simulation.lmxImprovement}
                            onChange={(e) => setSimulation({...simulation, lmxImprovement: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs mb-2 text-slate-300">
                            <label>کاهش فرسودگی (استراحت)</label>
                            <span className="text-orange-400">-{simulation.burnoutReduction}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="50" step="5"
                            value={simulation.burnoutReduction}
                            onChange={(e) => setSimulation({...simulation, burnoutReduction: Number(e.target.value)})}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                    </div>
                </div>

                <button 
                    onClick={resetSimulation}
                    className="mt-8 w-full py-2 flex items-center justify-center gap-2 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300"
                >
                    <RefreshCcw size={14} />
                    بازنشانی تنظیمات
                </button>
            </div>

            {/* Impact Result Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                <h3 className="text-slate-500 text-sm font-medium mb-2">تاثیر استراتژی شما</h3>
                <div className="text-4xl font-black text-emerald-600 mb-1">
                    {riskReduction}%
                </div>
                <p className="text-xs text-slate-400">کاهش میانگین ریسک خروج</p>
                
                {/* Added dir="ltr" to fix Recharts RTL bug */}
                <div className="w-full h-32 mt-4" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                             <Bar dataKey="risk" radius={[4, 4, 0, 0]} barSize={40} label={{ position: 'top', fill: '#64748b', fontSize: 12 }} />
                             {/* Reversed XAxis to simulate RTL */}
                             <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} axisLine={false} tickLine={false} reversed={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Action Table */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm md:text-base">لیست کارمندان پرخطر و پیش‌بینی بهبود</h3>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-right text-sm min-w-[600px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="py-4 px-4 md:px-6 font-semibold text-slate-600">کارمند</th>
                            <th className="py-4 px-4 md:px-6 font-semibold text-slate-600">ریسک فعلی</th>
                            <th className="py-4 px-4 md:px-6 font-semibold text-slate-600">ریسک شبیه‌سازی</th>
                            <th className="py-4 px-4 md:px-6 font-semibold text-slate-600">وضعیت بهبود</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {atRiskEmployees.slice(0, 8).map((emp) => {
                             const improvement = emp.churnRisk - emp.simulatedRisk;
                             return (
                                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-4 md:px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={emp.avatar} className="w-8 h-8 rounded-full" alt="" />
                                            <div>
                                                <div className="font-bold text-slate-800">{emp.name}</div>
                                                <div className="text-xs text-slate-500">{emp.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 md:px-6">
                                        <span className="font-bold text-slate-700">{emp.churnRisk}%</span>
                                    </td>
                                    <td className="py-4 px-4 md:px-6">
                                        <span className={`font-bold ${emp.simulatedRisk < 30 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                            {emp.simulatedRisk}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 md:px-6">
                                        {improvement > 0 ? (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                                {improvement}% بهبود
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400">بدون تغییر</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500">
                نمایش ۸ مورد از {atRiskEmployees.length} مورد پرخطر
            </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPreventionTab;
