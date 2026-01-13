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
interface OptimizationInput {
  wage: number;
  fixed_overhead: number;
  demand_intensity: number;
  min_service_level: number;
}

interface FrontierPoint {
  serviceLevel: number; // e.g., 85.0
  minCost: number; // The optimized cost at the frontier
  currentSpend: number; // The "inefficient" baseline for comparison
}

// OptimizationOutput is now essentially an array of FrontierPoints
type OptimizationOutput = FrontierPoint[];
