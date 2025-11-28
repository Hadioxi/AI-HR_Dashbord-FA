import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { LikertData } from '../types';

interface Props {
  data: LikertData[];
}

const LikertChartComponent: React.FC<Props> = ({ data }) => {
  // Processing data to simulate diverging bar chart effect
  // We make disagree negative to push them left, but for simplicity in this stacked demo,
  // we will keep them standard stacked but colored distinctly to show the spread.
  
  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-700 mb-4 pr-2 border-r-4 border-accent">
        نتایج نظرسنجی رضایت (Likert Scale)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="category" 
            type="category" 
            width={100} 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} 
          />
          <Tooltip 
             cursor={{fill: '#f1f5f9'}}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" />
          
          <Bar dataKey="strongDisagree" name="کاملاً مخالف" stackId="a" fill="#ef4444" />
          <Bar dataKey="disagree" name="مخالف" stackId="a" fill="#f87171" />
          <Bar dataKey="neutral" name="ممتنع" stackId="a" fill="#94a3b8" />
          <Bar dataKey="agree" name="موافق" stackId="a" fill="#4ade80" />
          <Bar dataKey="strongAgree" name="کاملاً موافق" stackId="a" fill="#22c55e" radius={[4, 0, 0, 4]} /> {/* Radius on left because RTL */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LikertChartComponent;