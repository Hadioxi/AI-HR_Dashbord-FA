import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { KPICardProps } from '../types';

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon, colorClass = "text-indigo-600 bg-indigo-50" }) => {
  const isPositive = trend > 0;
  const isNeutral = trend === 0;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
            {icon}
        </div>
        {!isNeutral && (
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span dir="ltr">{Math.abs(trend)}%</span>
            </div>
        )}
        {isNeutral && (
            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-slate-50 text-slate-500">
                <Minus size={14} />
                <span>بدون تغییر</span>
            </div>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
};

export default KPICard;
