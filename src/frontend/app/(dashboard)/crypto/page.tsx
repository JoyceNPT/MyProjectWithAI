"use client"

import { InvestmentDashboard } from "@/components/dashboard/investment-dashboard"
import { InvestmentType } from "@/types/investment"

export default function CryptoPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Cryptocurrency</h2>
                <p className="text-muted-foreground">High-volatility digital assets.</p>
            </div>
            <InvestmentDashboard type={InvestmentType.Crypto} />
        </div>
    )
}
