"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import simulateProduction from "@/lib/simulateProduction";
import { useState } from "react";
import SimulationResults from "@/components/SimulationResults";
import { LoaderCircle } from "lucide-react";

const formSchema = z
  .object({
    productionQuantity: z.coerce.number(),
    unitCost: z.coerce.number(),
    unitPrice: z.coerce.number(),
    salvagePrice: z.coerce.number(),
    fixedCost: z.coerce.number(),
    worstLikelyDemand: z.coerce.number(),
    expectedDemand: z.coerce.number(),
    bestLikelyDemand: z.coerce.number(),
  })
  .refine(
    (data) =>
      data.worstLikelyDemand < data.expectedDemand &&
      data.expectedDemand < data.bestLikelyDemand,
    {
      message:
        "verify that worstLikelyDemand < expectedDemand < bestLikelyDemand",
      path: ["expectedDemand"],
    },
  );

export default function SimulationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productionQuantity: 0,
      unitCost: 0,
      unitPrice: 0,
      salvagePrice: 0,
      fixedCost: 0,
      worstLikelyDemand: 0,
      expectedDemand: 0,
      bestLikelyDemand: 0,
    },
  });
  const [simulationOutput, setSimulationOutput] =
    useState<SimulationOutput | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const results = await simulateProduction(data);
    if (!results) {
      setError("Something went wrong, please try again");
      setIsLoading(false);
      return;
    }
    setSimulationOutput(results);
    setIsLoading(false);
  };

  const fields = [
    "productionQuantity",
    "unitCost",
    "unitPrice",
    "salvagePrice",
    "fixedCost",
    "worstLikelyDemand",
    "expectedDemand",
    "bestLikelyDemand",
  ] as const;

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      {error && (
        <p className="text-destructive mx-auto mt-8 text-center">{error}</p>
      )}
      {isLoading && (
        <section className="flex flex-col items-center gap-4">
          <LoaderCircle className="mx-auto mt-8 animate-spin" />
          <p>Loading...</p>
          <p>The first request may take up to 60 seconds.</p>
        </section>
      )}
      {simulationOutput && <SimulationResults results={simulationOutput} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {fields.map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {field.name.replace(/([A-Z])/g, " $1")}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="any" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="col-span-full">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
