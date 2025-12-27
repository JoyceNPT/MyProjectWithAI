"use client"

import { InvestmentDashboard } from "@/components/dashboard/investment-dashboard"
import { InvestmentType } from "@/types/investment"

export default function SavingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Savings Accounts</h2>
                <p className="text-muted-foreground">High-yield savings and protected cash instruments.</p>
            </div>
            <InvestmentDashboard type={InvestmentType.Savings} />
        </div>
    )
}
