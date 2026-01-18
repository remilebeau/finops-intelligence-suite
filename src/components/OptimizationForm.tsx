"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import OptimizationResults from "@/components/OptimizationResults";
import optimizeStaff from "@/lib/optimizeStaff";

export default function OptimizationForm() {
  const [inputs, setInputs] = useState<StaffingInputs>({
    wage: 25,
    fixed_overhead: 1000,
    demand_intensity: 500,
    min_service_level: 0.85,
    current_headcount: 120,
  });

  const [result, setResult] = useState<StaffingPlanResponse | null>(null);

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (variables: StaffingInputs) => optimizeStaff(variables),

    onSuccess: (data) => {
      setResult(data);
    },

    onMutate: () => {
      setResult(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(inputs);
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-card grid grid-cols-1 gap-6 rounded-xl border p-6 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Hourly Wage ($)
          </label>
          <input
            type="number"
            value={inputs.wage}
            onChange={(e) =>
              setInputs({ ...inputs, wage: Number(e.target.value) })
            }
            className="bg-background w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Current Staffing (FTEs)
          </label>
          <input
            type="number"
            value={inputs.current_headcount}
            onChange={(e) =>
              setInputs({
                ...inputs,
                current_headcount: Number(e.target.value),
              })
            }
            className="bg-background border-primary/40 w-full rounded border p-2"
          />
          <p className="text-muted-foreground mt-1 text-[10px]">
            Your current total headcount
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Demand Intensity
          </label>
          <input
            type="number"
            value={inputs.demand_intensity}
            onChange={(e) =>
              setInputs({ ...inputs, demand_intensity: Number(e.target.value) })
            }
            className="bg-background w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Target Service Level (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={inputs.min_service_level}
            onChange={(e) =>
              setInputs({
                ...inputs,
                min_service_level: Number(e.target.value),
              })
            }
            className="bg-background w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-primary-foreground rounded-lg py-3 font-bold transition-opacity hover:opacity-90 disabled:bg-gray-400 md:col-span-2"
        >
          {isPending
            ? "Calculating Optimal Plan..."
            : "Run Labor Variance Analysis"}
        </button>
      </form>

      {isSuccess && result && (
        <div className="animate-in fade-in duration-500">
          <OptimizationResults data={result} />
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          <p className="text-sm">{error.message}</p>
        </div>
      )}
    </div>
  );
}
