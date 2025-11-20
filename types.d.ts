type SimulationInput = {
  productionQuantity: number;
  unitCost: number;
  unitPrice: number;
  salvagePrice: number;
  fixedCost: number;
  worstLikelyDemand: number;
  expectedDemand: number;
  bestLikelyDemand: number;
};

type SimulationOutput = {
  productionQuantity: number;
  unitCost: number;
  unitPrice: number;
  salvagePrice: number;
  fixedCost: number;
  worstLikelyDemand: number;
  expectedDemand: number;
  bestLikelyDemand: number;
  expectedProfit: number;
  valueAtRisk: number;
  bestCase: number;
};

type OptimizationInput = {
  monReq: number;
  tueReq: number;
  wedReq: number;
  thuReq: number;
  friReq: number;
  satReq: number;
  sunReq: number;
};

type OptimizationOutput = {
  minStaff: number;
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  x5: number;
  x6: number;
  x7: number;
  monAva: number;
  tueAva: number;
  wedAva: number;
  thuAva: number;
  friAva: number;
  satAva: number;
  sunAva: number;
  monReq: number;
  tueReq: number;
  wedReq: number;
  thuReq: number;
  friReq: number;
  satReq: number;
  sunReq: number;
  monSlack: number;
  tueSlack: number;
  wedSlack: number;
  thuSlack: number;
  friSlack: number;
  satSlack: number;
  sunSlack: number;
  totalSlack: number;
};
