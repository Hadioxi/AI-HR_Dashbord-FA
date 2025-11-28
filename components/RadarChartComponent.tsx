import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SkillMetric } from '../types';

interface Props {
  data: SkillMetric[];
}

const RadarChartComponent: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-700 mb-4 pr-2 border-r-4 border-primary">
        تحلیل چندبعدی مهارت‌ها (Radar)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="دوره جاری"
            dataKey="A"
            stroke="#3C4EFE"
            strokeWidth={2}
            fill="#3C4EFE"
            fillOpacity={0.3}
          />
          <Radar
            name="دوره قبل"
            dataKey="B"
            stroke="#EC4899"
            strokeWidth={2}
            fill="#EC4899"
            fillOpacity={0.3}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ direction: 'rtl', textAlign: 'right' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;