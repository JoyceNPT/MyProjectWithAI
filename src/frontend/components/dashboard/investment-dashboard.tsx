"use client"

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { TimeHorizonSlider } from "@/components/dashboard/time-horizon-slider";
import { ReturnChart } from "@/components/dashboard/return-chart";
import { InvestmentType, InvestmentData, ProjectionResult, ProjectionPoint } from "@/types/investment";
import { fetchRiskData, calculateProjection } from "@/lib/api";
import { useSignalR } from "@/lib/hooks";

interface InvestmentDashboardProps {
    type: InvestmentType;
}

export function InvestmentDashboard({ type }: InvestmentDashboardProps) {
    const [data, setData] = useState<InvestmentData | null>(null);
    const [years, setYears] = useState(10);
    const [projection, setProjection] = useState<ProjectionResult | null>(null);
    const [loading, setLoading] = useState(true);

    const { connection } = useSignalR("http://localhost:5052/hubs/investment");

    // Fetch static data
    useEffect(() => {
        fetchRiskData(type).then(setData).catch(console.error);
    }, [type]);

    // Initial calculation
    useEffect(() => {
        if (data) {
            calculateProjection({
                initialInvestment: 10000, // Default start
                monthlyContribution: 500, // Default monthly
                years: years,
                returnRate: data.baseReturn,
                volatility: data.volatility
            }).then((res) => {
                setProjection(res);
                setLoading(false);
            }).catch(console.error);
        }
    }, [data, years]);

    // SignalR listener
    useEffect(() => {
        if (connection) {
            connection.on("ReceiveProjection", (result: ProjectionResult) => {
                setProjection(result);
            });
        }
        return () => {
            connection?.off("ReceiveProjection");
        }
    }, [connection]);

    // Real-time update handler
    const handleSliderChange = useCallback((newYears: number) => {
        setYears(newYears);
        if (connection && data) {
            // Optimistic update or wait for signalR? 
            // Ideally we invoke Hub method here for "push" style
            connection.invoke("CalculateAndBroadcast", "user-id", 10000, 500, newYears, data.baseReturn)
                .catch(err => console.error(err));
        } else {
            // Fallback to local state update triggers effect above if not connected
        }
    }, [connection, data]);

    if (loading || !data) {
        return <div className="p-8 flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Investment Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.name}</div>
                        <p className="text-xs text-muted-foreground">{data.description}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Risk Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RiskBadge level={data.riskLevel} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Base Return</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{data.baseReturn}%</div>
                        <p className="text-xs text-muted-foreground">Computed Annual Rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projected Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary" role="status" aria-live="polite">
                            ${projection?.finalValue.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Target after {years} years
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                    <CardHeader>
                        <CardTitle>Growth Projection</CardTitle>
                        <CardDescription>
                            Visualizing compounding returns over time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {projection && <ReturnChart data={projection.yearlyData} />}
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Simulation Settings</CardTitle>
                        <CardDescription>
                            Adjust parameters to see real-time updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <TimeHorizonSlider value={years} onChange={handleSliderChange} />

                        <div className="rounded-lg bg-slate-950 p-4 border border-slate-800">
                            <h4 className="text-sm font-semibold mb-2 text-white">Investment Details</h4>
                            <div className="space-y-2 text-sm text-slate-400">
                                <div className="flex justify-between">
                                    <span>Principal</span>
                                    <span>$10,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Monthly Contribution</span>
                                    <span>$500</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-700 pt-2 mt-2">
                                    <span>Total Contributed</span>
                                    <span className="text-white">${projection?.totalContributed.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Interest</span>
                                    <span className="text-green-400">+${projection?.totalInterest.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
