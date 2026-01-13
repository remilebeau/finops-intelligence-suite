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

import optimizeStaff from "@/lib/optimizeStaff";
import OptimizationFrontier from "./OptimizationFrontier";
import OptimizationInsights from "./OptimizationInsights";

// -------------------------
// Strategic Schema
// -------------------------
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

    // Using the decoupled lib function
    const result = await optimizeStaff(data);

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
          </Form>
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
