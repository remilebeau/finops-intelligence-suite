"use client";

import { useState } from "react";
import { LoaderCircle, Calculator, TrendingUp } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import optimizeStaff from "@/lib/optimizeStaff";
import OptimizationFrontier from "./OptimizationFrontier";
import OptimizationInsights from "./OptimizationInsights";

export default function OptimizationForm() {
  const [formData, setFormData] = useState<OptimizationInput>({
    wage: 25,
    fixed_overhead: 1000,
    demand_intensity: 500,
    min_service_level: 0.85,
  });

  const [frontierData, setFrontierData] = useState<FrontierPoint[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Handle standard form submission
    setError(null);
    setIsLoading(true);
    setFrontierData(null);

    // Using your original decoupled lib function logic
    const result = await optimizeStaff(formData);

    if (result) {
      setFrontierData(result);
    } else {
      setError(
        "Failed to generate frontier. Please check if the API is running.",
      );
    }

    setIsLoading(false);
  };

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="text-primary h-5 w-5" />
            Strategic Capacity Inputs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="wage">Hourly Wage ($)</Label>
                <Input
                  id="wage"
                  name="wage"
                  type="number"
                  value={formData.wage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fixed_overhead">Fixed Overhead ($)</Label>
                <Input
                  id="fixed_overhead"
                  name="fixed_overhead"
                  type="number"
                  value={formData.fixed_overhead}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demand_intensity">Demand Intensity</Label>
                <Input
                  id="demand_intensity"
                  name="demand_intensity"
                  type="number"
                  value={formData.demand_intensity}
                  onChange={handleChange}
                  required
                />
                <p className="text-muted-foreground text-sm">
                  Volume of work units per period.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min_service_level">
                  Service Level Target (0.1 - 0.99)
                </Label>
                <Input
                  id="min_service_level"
                  name="min_service_level"
                  type="number"
                  step="0.01"
                  value={formData.min_service_level}
                  onChange={handleChange}
                  required
                />
                <p className="text-muted-foreground text-sm">
                  The SLA percentage goal (e.g. 0.85 = 85%).
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Calculating Optimal Frontier...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Efficient Frontier
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <p className="text-destructive animate-pulse text-center font-medium">
          {error}
        </p>
      )}

      {frontierData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <OptimizationFrontier data={frontierData} />
          <OptimizationInsights data={frontierData} />
        </div>
      )}
    </section>
  );
}
