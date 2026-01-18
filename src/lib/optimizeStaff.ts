const DATA_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/optimizations/staffing-plan"
    : "https://simulation-api-rsaw.onrender.com/api/optimizations/staffing-plan";

export default async function optimizeStaff(
  formData: StaffingInputs,
): Promise<StaffingPlanResponse> {
  const res = await fetch(DATA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Optimization failed. Please try again.");
  }

  const data: StaffingPlanResponse = await res.json();
  return data;
}
