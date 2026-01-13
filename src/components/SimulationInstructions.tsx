import { Info, BarChart3, Calculator, ShieldAlert } from "lucide-react";

export default function SimulationInstructions() {
  const inputs = [
    {
      name: "productionQuantity",
      label: "Production Quantity",
      description: "The specific number of units you decide to manufacture.",
    },
    {
      name: "unitCost",
      label: "Unit Cost",
      description: "The variable cost to produce a single item.",
    },
    {
      name: "unitPrice",
      label: "Unit Price",
      description: "The revenue generated from selling one unit.",
    },
    {
      name: "salvagePrice",
      label: "Salvage Price",
      description: "The value recovered for units produced but not sold.",
    },
    {
      name: "fixedCost",
      label: "Fixed Cost",
      description:
        "Overhead costs (rent, insurance) that don't change with production volume.",
    },
    {
      name: "worstLikelyDemand",
      label: "Worst Case Demand",
      description: "The lower bound of potential customer demand.",
    },
    {
      name: "expectedDemand",
      label: "Expected Demand",
      description: "The most likely or average customer demand.",
    },
    {
      name: "bestLikelyDemand",
      label: "Best Case Demand",
      description: "The upper bound of potential customer demand.",
    },
  ];

  const metrics = [
    {
      title: "Expected Profit",
      icon: <Calculator className="h-4 w-4 text-emerald-500" />,
      desc: "The mathematical average of all 5,000 simulated outcomes.",
    },
    {
      title: "Value at Risk (5%)",
      icon: <ShieldAlert className="text-destructive h-4 w-4" />,
      desc: "The 'pessimistic' threshold; 95% of simulations resulted in a profit higher than this.",
    },
    {
      title: "Probability of Loss",
      icon: <BarChart3 className="h-4 w-4 text-orange-500" />,
      desc: "The percentage of simulated scenarios where total costs exceeded total revenue.",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl space-y-10 py-6">
      {/* Hero Section */}
      <div className="space-y-4 border-b pb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Understanding the Simulation
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Predicting demand is difficult. Instead of guessing a single number,
          this tool uses
          <span className="text-foreground font-semibold">
            {" "}
            Monte Carlo Simulation{" "}
          </span>
          to run your business logic 5,000 times against a distribution of
          random demand scenarios.
        </p>
      </div>

      {/* Inputs Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Info className="text-primary h-6 w-6" />
          <h3 className="text-xl font-semibold">Configuring Parameters</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {inputs.map((input) => (
            <div key={input.name} className="bg-card/50 rounded-lg border p-4">
              <div className="text-primary mb-1 font-mono text-xs font-bold uppercase">
                {input.label}
              </div>
              <p className="text-muted-foreground text-sm">
                {input.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Outputs / Interpretation Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary h-6 w-6" />
          <h3 className="text-xl font-semibold">Interpreting Results</h3>
        </div>
        <p className="text-muted-foreground">
          After execution, the simulation provides a risk profile to help you
          decide if your production quantity is too aggressive or too
          conservative:
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.title} className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                {m.icon}
                <span>{m.title}</span>
              </div>
              <p className="text-muted-foreground text-xs leading-snug">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Note */}
      <div className="bg-muted/50 text-muted-foreground rounded-xl border border-dashed p-6 text-sm italic">
        Note: Demand is sampled using a triangular distribution based on your
        Worst, Expected, and Best case inputs. This ensures the simulation
        favors your expected demand while accounting for rare "tail-end" events.
      </div>
    </section>
  );
}
