import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  results: SimulationOutput;
};

const locale = "en-US";

const currencyFormat: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
};

export default function SimulationResults({ results }: Props) {
  return (
    <section className="mx-auto max-w-4xl space-y-8">
      {/* SIMULATION RESULTS TABLE */}
      <Table className="mx-auto w-1/2">
        <TableHeader>
          <TableRow>
            <TableHead>Results</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Expected Profit */}
          <TableRow>
            <TableCell>Expected Profit</TableCell>
            <TableCell>
              {results.expectedProfit.toLocaleString(locale, currencyFormat)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Value at Risk</TableCell>
            <TableCell>
              {results.valueAtRisk.toLocaleString(locale, currencyFormat)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Best Case</TableCell>
            <TableCell>
              {results.bestCase.toLocaleString(locale, currencyFormat)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}

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
