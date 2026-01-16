"use client";

import { useState } from "react";
import OptimizationResults from "@/components/OptimizationResults";
import optimizeStaff from "@/lib/optimizeStaff";

export default function OptimizationForm() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [result, setResult] = useState<
    StaffingPlanResponse | ValidationErrorResponse
  >();
  const [inputs, setInputs] = useState<StaffingInputs>({
    wage: 25,
    fixed_overhead: 1000,
    demand_intensity: 500,
    min_service_level: 0.85,
    current_headcount: 30,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(undefined);
    setErrMsg("");
    setLoading(true);

    const data = await optimizeStaff(inputs);
    setResult(data);
    // if error
    if ("detail" in data) {
      setErrMsg("Optimization failed. Please check your inputs and try again.");
    }
    setLoading(false);
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
          disabled={loading}
          className="bg-primary text-primary-foreground rounded-lg py-3 font-bold transition-opacity hover:opacity-90 md:col-span-2"
        >
          {loading
            ? "Calculating Optimal Plan..."
            : "Run Labor Variance Analysis"}
        </button>
      </form>
      {result && "plan" in result && <OptimizationResults data={result} />}
      {result && "detail" in result && (
        <div className="text-red-500">{errMsg}</div>
      )}
    </div>
  );
}
