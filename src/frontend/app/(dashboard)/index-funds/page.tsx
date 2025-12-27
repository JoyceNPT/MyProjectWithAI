"use client"

import { InvestmentDashboard } from "@/components/dashboard/investment-dashboard"
import { InvestmentType } from "@/types/investment"

export default function IndexFundsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Index Funds</h2>
                <p className="text-muted-foreground">Diversified market exposure (e.g., S&P 500).</p>
            </div>
            <InvestmentDashboard type={InvestmentType.IndexFund} />
        </div>
    )
}
