// Uses global types: OptimizationInput and FrontierPoint (or OptimizationOutput)
const DATA_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/optimizations/frontier"
    : "https://simulation-api-rsaw.onrender.com/api/optimizations/frontier";

export default async function optimizeStaff(
  formData: OptimizationInput,
): Promise<FrontierPoint[] | null> {
  try {
    const res = await fetch(DATA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Optimization API Error:", errorText);
      return null;
    }

    const data: FrontierPoint[] = await res.json();
    return data;
  } catch (error) {
    console.error("Network error during optimization:", error);
    return null;
  }
}
