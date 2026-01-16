// Uses global types: OptimizationInput and FrontierPoint (or OptimizationOutput)
const DATA_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/optimizations/staffing-plan"
    : "https://simulation-api-rsaw.onrender.com/api/optimizations/staffing-plan";

export default async function optimizeStaff(
  formData: StaffingInputs,
): Promise<StaffingResponse> {
  const res = await fetch(DATA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData: ValidationErrorResponse = await res.json();
    return errorData;
  }

  const data: StaffingPlanResponse = await res.json();
  return data;
}
