import SimulationInstructions from "@/components/SimulationInstructions";
import SimulationForm from "@/components/SimulationForm";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Simulation",
  description: "Simulation model developed by remilebeau",
};

export default function SimulationPage() {
  return (
    <section className="flex flex-col gap-8">
      <BackButton />
      <SimulationInstructions />
      <SimulationForm />
      <BackButton />
    </section>
  );
}
