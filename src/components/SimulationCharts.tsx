"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ReferenceLine, 
  Cell 
} from "recharts";
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface ChartProps {
  data: { bin: number; count: number }[];
  expectedProfit: number;
  valueAtRisk: number;
}

// 1. Define the config - this maps data keys to your theme variables
const chartConfig = {
  count: {
    label: "Frequency",
    color: "var(--chart-1)", // Default blue/cyan
  },
  risk: {
    label: "Tail Risk",
    color: "var(--destructive)", // Red
  }
} satisfies ChartConfig;

export default function SimulationCharts({ data, expectedProfit, valueAtRisk }: ChartProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(value);

  return (
    <div className="w-full bg-card p-6 rounded-lg border border-border shadow-sm mt-8">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">
        Profit Distribution (Monte Carlo)
      </h3>
      
      {/* 2. shadcn ChartContainer handles responsiveness and theme variable mapping */}
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          accessibilityLayer
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          
          <XAxis 
            dataKey="bin" 
            tickFormatter={formatCurrency} 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tick={{fill: 'var(--muted-foreground)'}}
          />
          
          <YAxis 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            tick={{fill: 'var(--muted-foreground)'}} 
          />

          {/* 3. shadcn Tooltip - handles type safety and styling automatically */}
          <ChartTooltip 
            cursor={false} 
            content={
              <ChartTooltipContent 
                labelFormatter={(label) => `Profit Range: ${formatCurrency(label as number)}`} 
              />
            } 
          />
          
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.bin <= valueAtRisk ? "var(--destructive)" : "var(--chart-1)"} 
                fillOpacity={entry.bin <= valueAtRisk ? 1 : 0.7}
              />
            ))}
          </Bar>

          <ReferenceLine 
            x={expectedProfit} 
            stroke="var(--chart-2)" 
            strokeDasharray="5 5" 
            label={{ position: 'top', value: 'Mean', fill: 'var(--chart-2)', fontSize: 12 }} 
          />
          
          <ReferenceLine 
            x={valueAtRisk} 
            stroke="var(--destructive)" 
            strokeDasharray="5 5" 
            label={{ position: 'top', value: 'VaR', fill: 'var(--destructive)', fontSize: 12 }} 
          />

          <ReferenceLine x={0} stroke="var(--foreground)" strokeWidth={1} strokeOpacity={0.4} />
        </BarChart>
      </ChartContainer>

      <p className="text-[11px] text-muted-foreground mt-6 italic text-center">
        * Red bars indicate outcomes at or below the 5th percentile (Value at Risk).
      </p>
    </div>
  );
}