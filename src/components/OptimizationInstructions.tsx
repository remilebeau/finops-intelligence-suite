export default function OptimizationInstructions() {
  return (
    <section className="mx-auto flex flex-col gap-8">
      <h2 className="text-center text-2xl font-semibold">
        Staffing Optimization
      </h2>
      <div className="flex flex-col gap-4">
        <p>
          This tool calculates the optimal number of staff needed to meet
          service level targets based on workload and cost constraints.
        </p>
        <p>
          Enter your wage rate, fixed overhead, demand intensity, minimum
          service level, and current headcount to find the most efficient
          staffing plan.
        </p>
        <p>
          The optimizer balances cost efficiency with performance, showing
          potential savings or staffing gaps compared to your current situation.
        </p>
      </div>
    </section>
  );
}
