"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoaderCircle, Calculator, TrendingUp } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import OptimizationFrontier from "@/components/OptimizationFrontier";

// 1. Define the interface for the frontier points to clear 'any' errors
interface FrontierPoint {
  serviceLevel: number;
  minCost: number;
  currentSpend: number;
}

const formSchema = z.object({
  wage: z.coerce.number().min(1, "Wage must be at least 1"),
  fixed_overhead: z.coerce.number().min(0),
  demand_intensity: z.coerce
    .number()
    .min(1, "Intensity must reflect some workload"),
  min_service_level: z.coerce.number().min(0.1).max(0.99).default(0.85),
});

type FormValues = z.infer<typeof formSchema>;

export default function OptimizationForm() {
  // Use the interface here instead of 'any[]'
  const [frontierData, setFrontierData] = useState<FrontierPoint[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wage: 25,
      fixed_overhead: 1000,
      demand_intensity: 500,
      min_service_level: 0.85,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setIsLoading(true);
    setFrontierData(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/optimizations/frontier",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) throw new Error("Optimization failed");

      const result: FrontierPoint[] = await response.json();
      setFrontierData(result);
    } catch (err) {
      setError(
        "Failed to generate frontier. Please check if the API is running.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="wage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Wage ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fixed_overhead"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fixed Overhead ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="demand_intensity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demand Intensity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Volume of work units per period.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="min_service_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Level Target (0.1 - 0.99)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>
                        The SLA percentage goal (e.g. 0.85 = 85%).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Calculating Frontier...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate Efficient Frontier
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <p className="text-destructive text-center font-medium">{error}</p>
      )}

      {frontierData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <OptimizationFrontier data={frontierData} />
        </div>
      )}
    </section>
  );
}
