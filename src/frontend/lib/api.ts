import { InvestmentType, InvestmentData, ProjectionResult, CalculationRequest } from "@/types/investment";

const API_BASE_URL = "http://localhost:5052/api"; // Backend URL

export async function fetchRiskData(type: InvestmentType): Promise<InvestmentData> {
    const response = await fetch(`${API_BASE_URL}/investments/${type}/risk`);
    if (!response.ok) {
        throw new Error("Failed to fetch investment data");
    }
    return response.json();
}

export async function calculateProjection(request: CalculationRequest): Promise<ProjectionResult> {
    const response = await fetch(`${API_BASE_URL}/investments/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Failed to calculate projection");
    }
    return response.json();
}
