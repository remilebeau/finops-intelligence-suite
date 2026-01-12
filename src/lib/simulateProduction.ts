// No need to import SimulationInputs/Response if they are in a global types.d.ts
// but ensure the naming matches exactly.

const DATA_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/simulations/production"
    : "https://simulation-api-rsaw.onrender.com/api/simulations/production";

export default async function simulateProduction(
  formData: SimulationInputs,
): Promise<SimulationResponse | null> {
  try {
    const res = await fetch(DATA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      // Log the error for debugging
      const errorText = await res.text();
      console.error("API Error:", errorText);
      return null;
    }

    const data: SimulationResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Network or parsing error:", error);
    return null;
  }
}