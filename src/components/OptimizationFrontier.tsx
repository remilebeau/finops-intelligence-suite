"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface FrontierPoint {
  serviceLevel: number;
  minCost: number;
  currentSpend: number;
}

const chartConfig = {
  minCost: {
    label: "Efficient Frontier (Optimal)",
    color: "var(--chart-1)",
  },
  currentSpend: {
    label: "Actual Spend (Inefficient)",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export default function OptimizationFrontier({
  data,
}: {
  data: FrontierPoint[];
}) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="bg-card border-border mt-8 w-full rounded-lg border p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Labor Efficiency Frontier</h3>
        <p className="text-muted-foreground text-sm">
          The blue line represents the lowest possible cost to achieve a
          specific service level.
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--border)"
          />
          <XAxis
            dataKey="serviceLevel"
            tickFormatter={(val) => `${val}%`}
            label={{
              value: "Service Level Target",
              position: "insideBottom",
              offset: -10,
              fontSize: 12,
              fill: "var(--muted-foreground)",
            }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            fontSize={12}
            label={{
              value: "Total Labor Cost",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
              fill: "var(--muted-foreground)",
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend verticalAlign="top" height={36} />

          {/* The Frontier Line */}
          <Line
            type="monotone"
            dataKey="minCost"
            stroke="var(--chart-1)"
            strokeWidth={3}
            dot={{ r: 4, fill: "var(--chart-1)" }}
            activeDot={{ r: 6 }}
          />

          {/* Comparison Line (The "Inefficient" baseline) */}
          <Line
            type="monotone"
            dataKey="currentSpend"
            stroke="var(--destructive)"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
