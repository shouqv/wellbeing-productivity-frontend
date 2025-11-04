import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { authRequest } from "@/services/auth";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// creditng https://ui.shadcn.com/charts/pie
const COLORS = ["#1c1c1c","#3c3c3c", "#5a5a5a", "#7a7a7a", "#9b9b9b", "#bfbfbf", "#dcdcdc"];

export default function EmojiPieChart({ data }) {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await authRequest({
    //                 method: "get",
    //                 url: "http://127.0.0.1:8000/api/dashboard/",
    //             });

    //             const emojiCounts = response.data.emoji_counts;

    //             const chartData = Object.keys(emojiCounts).map((emoji) => ({
    //                 name: emoji,
    //                 value: emojiCounts[emoji],
    //             }));

    //             setData(chartData);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (data.length === 0) return <p>Loading chart...</p>;

    const emojiCounts = data?.emoji_counts || {};
    const chartData = Object.keys(emojiCounts).map((emoji) => ({
        name: emoji,
        value: emojiCounts[emoji],
    }));
    if (chartData.length === 0) return <p>Loading chart...</p>;

    return (
        <Card className="w-[400px] bg-white/50 shadow-md rounded-lg flex flex-col border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle  className="dashboard-widget-title">Month's Mood</CardTitle>
                <CardDescription className="dashboard-widget-desc">Your most frequent moods this month</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center pb-4">
                <div style={{ width: 400, height: 300, margin: "auto" }}>
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
            </CardContent>
        </Card>
    );
}
