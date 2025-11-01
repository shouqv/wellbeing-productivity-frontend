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
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE", "#FF6699"];

export default function EmojiPieChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authRequest({
                    method: "get",
                    url: "http://127.0.0.1:8000/api/dashboard/",
                });

                const emojiCounts = response.data.emoji_counts;

                const chartData = Object.keys(emojiCounts).map((emoji) => ({
                    name: emoji,
                    value: emojiCounts[emoji],
                }));

                setData(chartData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (data.length === 0) return <p>Loading chart...</p>;

    return (
        <Card className="flex flex-col border-0">
            <CardHeader className="items-center pb-0">
                <CardTitle>Month's Mood</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div style={{ width: 300, height: 300, margin: "0 auto" }}>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label={({ name }) => name}
                        >
                            {data.map((entry, index) => (
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
