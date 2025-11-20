export default function SimulationInstructions() {
  const inputs = [
    {
      name: "productionQuantity",
      description: "Number of units you plan to produce",
    },
    {
      name: "unitCost",
      description: "Cost to manufacture one unit",
    },
    {
      name: "unitPrice",
      description: "Selling price per unit",
    },
    {
      name: "salvagePrice",
      description: "Recovered value per unsold unit",
    },
    {
      name: "fixedCost",
      description: "Fixed costs (e.g., rent, salaries)",
    },
    {
      name: "worstLikelyDemand",
      description: "The minimum likely demand",
    },
    {
      name: "expectedDemand",
      description: "Average or expected demand",
    },
    {
      name: "bestLikelyDemand",
      description: "The maximum likely demand",
    },
  ];

  const outputs = [
    {
      name: "expectedProfit",
      description: "Average profit across 1,000 simulations",
    },
    {
      name: "valueAtRisk",
      description: "5th percentile profit (pessimistic scenario)",
    },
    {
      name: "bestCase",
      description: "95th percentile profit (optimistic scenario)",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      {/* Intro */}
      <h2 className="text-2xl font-semibold">Production Planning Simulation</h2>
      <div className="space-y-4">
        <p>
          Imagine you run a business that makes and sells a product. You want to
          figure out how many units to produce to maximize profit, but demand is
          uncertain. This simulation uses a method called{" "}
          <span className="text-primary font-semibold">
            Monte Carlo simulation
          </span>{" "}
          — a way to test different demand scenarios using random sampling.
        </p>
        <p>
          It runs your business virtually many times, each with a different
          demand guess, and helps you understand the range of possible outcomes.
        </p>
      </div>

      {/* Inputs Table */}
      <h2 className="text-2xl font-semibold">Explanation of Inputs</h2>
      <p>This simulation expects the following inputs:</p>
      <div className="overflow-auto">
        <table className="border-border w-full border text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b px-4 py-2 text-left">Input</th>
              <th className="border-b px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((input) => (
              <tr key={input.name}>
                <td className="border-b px-4 py-2">
                  <code className="text-primary font-semibold">
                    {input.name}
                  </code>
                </td>
                <td className="border-b px-4 py-2">{input.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Outputs Table */}
      <h2 className="text-2xl font-semibold">Explanation of Outputs</h2>
      <p>The API returns the following fields after simulation:</p>
      <div className="overflow-auto">
        <table className="border-border w-full border text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="border-b px-4 py-2 text-left">Field</th>
              <th className="border-b px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {outputs.map((output) => (
              <tr key={output.name}>
                <td className="border-b px-4 py-2">
                  <code className="font-semibold">{output.name}</code>
                </td>
                <td className="border-b px-4 py-2">{output.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
