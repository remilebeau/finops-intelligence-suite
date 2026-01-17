import OptimizationInstructions from "@/components/OptimizationInstructions";
import OptimizationForm from "@/components/OptimizationForm";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Optimization",
  description: "Optimization model developed by remilebeau",
};
export default function OptimizationPage() {
  return (
    <section className="flex flex-col gap-8">
      <BackButton />
      <OptimizationInstructions />
      <OptimizationForm />
      <BackButton />
    </section>
  );
}
