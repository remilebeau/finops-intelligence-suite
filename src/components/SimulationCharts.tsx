"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell 
} from "recharts";

interface ChartProps {
  data: { bin: number; count: number }[];
  expectedProfit: number;
  valueAtRisk: number;
}

export default function SimulationCharts({ data, expectedProfit, valueAtRisk }: ChartProps) {
  // Format currency for the X-Axis
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-8">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">Profit Distribution (Monte Carlo)</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="bin" 
              tickFormatter={formatCurrency} 
              fontSize={12} 
              tick={{fill: '#64748b'}}
            />
            <YAxis fontSize={12} tick={{fill: '#64748b'}} label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#64748b'} }} />
            <Tooltip 
              formatter={(value: number) => [value, "Frequency"]}
              labelFormatter={(label) => `Profit Range: ${formatCurrency(label)}`}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            
            {/* The Histogram Bars */}
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                // Color bars red if they are below the Value at Risk
                <Cell key={`cell-${index}`} fill={entry.bin <= valueAtRisk ? "#ef4444" : "#3b82f6"} />
              ))}
            </Bar>

            {/* Strategic FinOps Reference Lines */}
            <ReferenceLine x={expectedProfit} stroke="#10b981" strokeDasharray="5 5" label={{ position: 'top', value: 'Expected Profit', fill: '#10b981', fontSize: 12 }} />
            <ReferenceLine x={valueAtRisk} stroke="#ef4444" strokeDasharray="5 5" label={{ position: 'top', value: 'VaR (5%)', fill: '#ef4444', fontSize: 12 }} />
            <ReferenceLine x={0} stroke="#475569" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500 mt-4 italic">
        * Red bars indicate outcomes at or below the 5th percentile (Value at Risk). Green line represents the mean outcome.
      </p>
    </div>
  );
}