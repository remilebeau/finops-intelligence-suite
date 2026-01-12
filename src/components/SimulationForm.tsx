"use client";

import React, { useState } from "react";
import { AlertCircle, TrendingUp, ShieldAlert, Activity, Loader2 } from "lucide-react";
import SimulationCharts from "./SimulationCharts"; // Import your new shadcn-ready chart
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SimulationInputs {
  productionQuantity: number;
  unitCost: number;
  unitPrice: number;
  salvagePrice: number;
  fixedCost: number;
  worstLikelyDemand: number;
  expectedDemand: number;
  bestLikelyDemand: number;
}

interface SimulationResponse {
  summary: {
    expectedProfit: number;
    valueAtRisk: number;
    bestCase: number;
    probOfLoss: number;
  };
  histogramData: { bin: number; count: number }[];
}

export default function SimulationForm() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SimulationResponse | null>(null);
  const [inputs, setInputs] = useState<SimulationInputs>({
    productionQuantity: 100,
    unitCost: 50,
    unitPrice: 120,
    salvagePrice: 20,
    fixedCost: 1000,
    worstLikelyDemand: 50,
    expectedDemand: 100,
    bestLikelyDemand: 150,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/simulations/production", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      if (!response.ok) throw new Error("Simulation failed");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="space-y-8">
      {/* Input Section using shadcn Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Activity className="w-5 h-5 text-primary" />
            Simulation Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    className="bg-background"
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-8 w-full font-bold py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating 5,000 Scenarios...
                </>
              ) : (
                "Execute Monte Carlo Simulation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="animate-fade-in-scale">
          {/* Top-level Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Expected Profit" 
              value={formatCurrency(results.summary.expectedProfit)} 
              icon={<TrendingUp className="w-4 h-4" />} 
              chartVar="var(--chart-2)" 
            />
            <StatCard 
              title="Value at Risk (5%)" 
              value={formatCurrency(results.summary.valueAtRisk)} 
              icon={<ShieldAlert className="w-4 h-4" />} 
              chartVar="var(--destructive)" 
            />
            <StatCard 
              title="Best Case (95%)" 
              value={formatCurrency(results.summary.bestCase)} 
              icon={<TrendingUp className="w-4 h-4" />} 
              chartVar="var(--chart-1)" 
            />
            <StatCard 
              title="Prob. of Loss" 
              value={`${(results.summary.probOfLoss * 100).toFixed(1)}%`} 
              icon={<AlertCircle className="w-4 h-4" />} 
              chartVar="var(--chart-5)" 
            />
          </div>

          {/* New Chart Component Integration */}
          <SimulationCharts 
            data={results.histogramData} 
            expectedProfit={results.summary.expectedProfit} 
            valueAtRisk={results.summary.valueAtRisk} 
          />
        </div>
      )}
    </div>
  );
}

// Internal StatCard component using shadcn-like structure
function StatCard({ title, value, icon, chartVar }: { title: string; value: string; icon: React.ReactNode, chartVar: string }) {
  return (
    <Card className="border-l-4" style={{ borderLeftColor: chartVar }}>
      <CardContent className="p-5 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div style={{ color: chartVar }}>{icon}</div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{title}</span>
        </div>
        <div className="text-xl font-mono font-medium tracking-tight" style={{ color: chartVar }}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}