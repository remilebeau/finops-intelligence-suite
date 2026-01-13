"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, ArrowDownRight, Target } from "lucide-react";

// This component uses the same interface as your chart
interface FrontierPoint {
  serviceLevel: number;
  minCost: number;
  currentSpend: number;
}

export default function OptimizationInsights({
  data,
}: {
  data: FrontierPoint[];
}) {
  // Find the point with the largest gap between Actual and Optimal
  const maxSavingsPoint = data.reduce((prev, curr) => {
    const prevGap = prev.currentSpend - prev.minCost;
    const currGap = curr.currentSpend - curr.minCost;
    return currGap > prevGap ? curr : prev;
  });

  const potentialSavings =
    maxSavingsPoint.currentSpend - maxSavingsPoint.minCost;
  const savingsPercent =
    (potentialSavings / maxSavingsPoint.currentSpend) * 100;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Optimal Target Card */}
      <Card className="border-l-chart-1 border-l-4">
        <CardContent className="pt-6">
          <div className="text-muted-foreground mb-1 flex items-center gap-2">
            <Target className="text-chart-1 h-4 w-4" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Optimal Point
            </span>
          </div>
          <div className="text-chart-1 font-mono text-2xl font-bold">
            {maxSavingsPoint.serviceLevel}% SLA
          </div>
        </CardContent>
      </Card>

      {/* Financial Impact Card */}
      <Card className="border-l-destructive border-l-4">
        <CardContent className="pt-6">
          <div className="text-muted-foreground mb-1 flex items-center gap-2">
            <ArrowDownRight className="text-destructive h-4 w-4" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Potential Savings
            </span>
          </div>
          <div className="text-destructive font-mono text-2xl font-bold">
            {formatCurrency(potentialSavings)}
          </div>
        </CardContent>
      </Card>

      {/* Efficiency Percentage Card */}
      <Card className="border-l-chart-2 border-l-4">
        <CardContent className="pt-6">
          <div className="text-muted-foreground mb-1 flex items-center gap-2">
            <TrendingDown className="text-chart-2 h-4 w-4" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Efficiency Gain
            </span>
          </div>
          <div className="text-chart-2 font-mono text-2xl font-bold">
            {savingsPercent.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
