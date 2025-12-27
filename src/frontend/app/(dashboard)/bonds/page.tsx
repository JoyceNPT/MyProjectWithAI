"use client"

import { InvestmentDashboard } from "@/components/dashboard/investment-dashboard"
import { InvestmentType } from "@/types/investment"

export default function BondsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Government Bonds</h2>
                <p className="text-muted-foreground">Low-risk fixed income securities.</p>
            </div>
            <InvestmentDashboard type={InvestmentType.Bonds} />
        </div>
    )
}
