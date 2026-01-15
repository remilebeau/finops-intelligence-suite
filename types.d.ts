// --- Monte Carlo Simulation Types ---
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

// --- Labor Optimization Types (SciPy Strategic Model) ---
interface StaffingInputs {
  wage: number;
  fixed_overhead: number;
  demand_intensity: number;
  min_service_level: number;
  current_headcount: number;
}

interface StaffingPlanResponse {
  plan: {
    targetSLA: number;
    requiredHeadcount: number;
    totalCost: number;
    headcountDelta: number;
  };
  comparison: {
    actualCost: number;
    potentialSavings: number;
    efficiencyGain: number;
    status: "Overstaffed" | "Understaffed";
  };
}
