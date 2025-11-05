import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import noDataIcon from '../../assets/noData.png'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// creditng https://ui.shadcn.com/charts/pie
const COLORS = ["#1c1c1c", "#3c3c3c", "#5a5a5a", "#7a7a7a", "#9b9b9b", "#bfbfbf", "#dcdcdc"]

export default function EmojiPieChart({ data }) {
    const emojiCounts = data?.emoji_counts || {}
    const chartData = Object.keys(emojiCounts).map((emoji) => ({
        name: emoji,
        value: emojiCounts[emoji],
    }))


    return (
        <Card className="w-[400px] bg-white/50 shadow-md rounded-lg flex flex-col border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle className="dashboard-widget-title">Month's Mood</CardTitle>
                <CardDescription className="dashboard-widget-desc">Your most frequent moods this month</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center pb-4">
                {chartData.length === 0 ? <div style={{
                    backgroundColor: "#dfdfdf",
                    marginTop: "20px",
                    pading: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: '0.5rem',


                }} >
                    <p style={{ padding: '20px 20px 10px 20px', }}>No emotions entries yet</p>
                    <img src={noDataIcon} width={50} />
                </div>

                    : <div style={{ width: 400, height: 300, margin: "auto" }}>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label={({ name }) => name}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} times`} />
                        </PieChart>
                    </div>
                }



            </CardContent>
        </Card>
    );
}
