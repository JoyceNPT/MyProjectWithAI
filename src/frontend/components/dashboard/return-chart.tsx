"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ProjectionPoint {
    year: number;
    totalValue: number;
    totalContributed: number;
    totalInterest: number;
}

interface ReturnChartProps {
    data: ProjectionPoint[];
}

export function ReturnChart({ data }: ReturnChartProps) {
    return (
        <Card className="col-span-4 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
                <CardTitle>Projected Growth</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="year"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value: any) => `Year ${value}`}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value: any) => `$${value / 1000}k`}
                            />
                            <Tooltip
                                formatter={(value: any) => [`$${value.toLocaleString()}`, "Amount"]}
                                labelFormatter={(value: any) => `Year ${value}`}
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                            <Area
                                type="monotone"
                                dataKey="totalValue"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                name="Total Value"
                            />
                            <Area
                                type="monotone"
                                dataKey="totalContributed"
                                stroke="#82ca9d"
                                fillOpacity={1}
                                fill="url(#colorInvested)"
                                name="Invested"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
