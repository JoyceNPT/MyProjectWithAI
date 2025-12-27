export enum InvestmentType {
    Savings = 0,
    Bonds = 1,
    IndexFund = 2,
    Crypto = 3
}

export interface InvestmentData {
    name: string;
    riskLevel: number;
    volatility: number;
    description: string;
    baseReturn: number;
}

export interface ProjectionPoint {
    year: number;
    totalValue: number;
    totalContributed: number;
    totalInterest: number;
}

export interface ProjectionResult {
    finalValue: number;
    totalContributed: number;
    totalInterest: number;
    yearlyData: ProjectionPoint[];
}

export interface CalculationRequest {
    initialInvestment: number;
    monthlyContribution: number;
    years: number;
    returnRate: number;
    volatility: number;
}
