import {
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

export default function OptimizationResults({
  data,
}: {
  data: StaffingPlanResponse;
}) {
  const isOverstaffed = data.comparison.status === "Overstaffed";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* RECOMMENDED PLAN */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="text-muted-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} />
            <h3 className="text-xs font-bold tracking-wider uppercase">
              Optimal Headcount
            </h3>
          </div>
          <p className="text-4xl font-bold">{data.plan.requiredHeadcount}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            FTEs needed for {data.plan.targetSLA}% SLA
          </p>
        </div>

        {/* VARIANCE / SAVINGS */}
        <div
          className={`rounded-xl border p-6 shadow-sm ${isOverstaffed ? "border-green-500/20 bg-green-500/5" : "bg-destructive/5 border-destructive/20"}`}
        >
          <div className="mb-4 flex items-center gap-2">
            {isOverstaffed ? (
              <TrendingDown className="text-green-600" size={18} />
            ) : (
              <AlertTriangle className="text-destructive" size={18} />
            )}
            <h3
              className={`text-xs font-bold tracking-wider uppercase ${isOverstaffed ? "text-green-600" : "text-destructive"}`}
            >
              {isOverstaffed ? "Potential Savings" : "SLA Coverage Gap"}
            </h3>
          </div>
          <p
            className={`text-4xl font-bold ${isOverstaffed ? "text-green-600" : "text-destructive"}`}
          >
            ${Math.abs(data.comparison.potentialSavings).toLocaleString()}
          </p>
          <p className="mt-1 text-sm italic opacity-80">
            {isOverstaffed
              ? "Excess labor cost identified"
              : "Additional budget needed"}
          </p>
        </div>

        {/* EFFICIENCY METRIC */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="text-muted-foreground mb-4 flex items-center gap-2">
            <DollarSign size={18} />
            <h3 className="text-xs font-bold tracking-wider uppercase">
              Efficiency Gain
            </h3>
          </div>
          <p className="text-4xl font-bold">
            {data.comparison.efficiencyGain}%
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Relative to current spend
          </p>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY TABLE */}
      <div className="bg-muted/30 rounded-lg border p-4 text-sm">
        <h4 className="mb-2 font-semibold">Executive Summary</h4>
        <p>
          To achieve a <strong>{data.plan.targetSLA}%</strong> service level,
          the model recommends a staffing level of
          <strong> {data.plan.requiredHeadcount} FTEs</strong>. Your current
          staffing is
          {isOverstaffed ? " above " : " below "} the requirement by{" "}
          <strong>{Math.abs(data.plan.headcountDelta)} FTEs</strong>.
          {isOverstaffed
            ? " Implementing this plan could reduce annual run-rate costs."
            : " Increasing staff is recommended to avoid service level degradation."}
        </p>
      </div>
    </div>
  );
}
